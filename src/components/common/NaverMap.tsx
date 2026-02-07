import { useEffect, useRef, useState } from "react";

const NAVER_MAP_KEY = import.meta.env.VITE_NAVER_MAPS_KEY_ID as string | undefined;
const SCRIPT_ID = "naver-maps-sdk";

export default function NaverMap() {
  const mapRef = useRef<HTMLDivElement | null>(null);
  const mapInstance = useRef<any>(null);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (!NAVER_MAP_KEY) {
      setLoadError("NAVER 지도 키가 설정되지 않았습니다.");
      return;
    }

    let cancelled = false;

    const initMap = () => {
      if (!mapRef.current || mapInstance.current) return;
      if (!window.naver?.maps) return;

      const center = new window.naver.maps.LatLng(37.285376133312, 126.86157093699);
      mapInstance.current = new window.naver.maps.Map(mapRef.current, {
        center,
        zoom: 15,
        zoomControl: true,
        zoomControlOptions: {
          position: window.naver.maps.Position.TOP_RIGHT,
        },
      });

      new window.naver.maps.Marker({
        position: center,
        map: mapInstance.current,
      });
    };

    if (window.naver?.maps) {
      initMap();
      setLoaded(true);
      return;
    }

    let script = document.getElementById(SCRIPT_ID) as HTMLScriptElement | null;

    const handleLoad = () => {
      if (cancelled) return;
      if (!window.naver?.maps) {
        setLoadError(
          "NAVER 지도 초기화 실패: 키/도메인 권한 또는 Maps Web 권한을 확인하세요.",
        );
        return;
      }
      setLoaded(true);
      initMap();
    };

    const handleError = () => {
      if (cancelled) return;
      setLoadError("NAVER 지도 스크립트를 불러오지 못했습니다.");
    };

    if (!script) {
      script = document.createElement("script");
      script.id = SCRIPT_ID;
      script.async = true;
      script.defer = true;
      script.src = `https://oapi.map.naver.com/openapi/v3/maps.js?ncpKeyId=${NAVER_MAP_KEY}`;
      script.onload = handleLoad;
      script.onerror = handleError;
      document.head.appendChild(script);
    } else {
      script.addEventListener("load", handleLoad, { once: true });
      script.addEventListener("error", handleError, { once: true });
    }

    return () => {
      cancelled = true;
      if (script) {
        script.removeEventListener("load", handleLoad);
        script.removeEventListener("error", handleError);
      }
    };
  }, []);

  return (
    <>
      <div ref={mapRef} className="absolute w-full h-full" />
      {!loaded && !loadError && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100 text-gray-500">
          지도를 불러오는 중...
        </div>
      )}
      {loadError && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100 text-gray-500">
          {loadError}
        </div>
      )}
    </>
  );
}
