import { Heart, Send } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import React, { useState } from "react";
import { usePrayerTopics } from "@/hook/usePrayerTopics";

export function PrayerRequest() {
  const { data: prayerTopics } = usePrayerTopics();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    prayer: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    alert("기도 제목이 전달되었습니다. 함께 기도하겠습니다.");
    setFormData({ name: "", email: "", prayer: "" });
  };

  return (
    <section className="py-20 px-4 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-red-100 text-red-600 px-4 py-2 rounded-full text-sm font-medium mb-4">
            <Heart className="w-4 h-4" />
            기도요청
          </div>
          <h2 className="text-4xl md:text-5xl mb-4">{prayerTopics?.title ?? "함께 기도합니다"}</h2>
          <p className="text-xl text-gray-600">
            {prayerTopics?.description ?? "여러분의 기도 제목을 나누어 주세요"}
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Image */}
          <div className="relative rounded-3xl overflow-hidden shadow-2xl">
            <ImageWithFallback
              src="https://images.unsplash.com/photo-1520187044487-b2efb58f0cba?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcmF5ZXIlMjBoYW5kc3xlbnwxfHx8fDE3Njg3MjU0NTJ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
              alt="Prayer hands"
              className="w-full aspect-[4/3] object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-8">
              {(prayerTopics?.blessingTitle || prayerTopics?.blessingContent) && (
                <div className="mt-6 rounded-2xl border border-gray-200 bg-gray-50 p-5">
                  {prayerTopics?.blessingTitle && (
                    <p className="text-sm font-semibold text-gray-800 mb-2">
                      {prayerTopics.blessingTitle}
                    </p>
                  )}
                  {prayerTopics?.blessingContent && (
                    <p className="text-sm text-gray-600 whitespace-pre-wrap">
                      {prayerTopics.blessingContent}
                    </p>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
