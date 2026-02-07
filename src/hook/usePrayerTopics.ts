import { useEffect, useState } from "react";
import { db } from "@/firbase";
import { collection, getDocs } from "firebase/firestore";

export type PrayerTopics = {
  id: string;
  title?: string;
  description?: string;
  personalTitle?: string;
  blessingTitle?: string;
  blessingContent?: string;
  account?: string;
  account2?: string;
};

export function usePrayerTopics() {
  const [data, setData] = useState<PrayerTopics | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    const fetchPrayerTopics = async () => {
      try {
        const snapshot = await getDocs(collection(db, "prayerTopics"));
        if (!snapshot.empty) {
          const docData = snapshot.docs[0];
          const nextData: PrayerTopics = { id: docData.id, ...docData.data() };
          if (isMounted) {
            setData(nextData);
          }
        } else if (isMounted) {
          setData(null);
        }
      } catch (error) {
        console.error("Error fetching prayer topics:", error);
        if (isMounted) {
          setData(null);
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchPrayerTopics();

    return () => {
      isMounted = false;
    };
  }, []);

  return { data, loading };
}
