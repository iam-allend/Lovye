// PATH: src/templates/romantic-pink/scenes/GalleryScene.tsx

import type { SceneProps } from "@/templates/_base/types";
import { getField } from "@/templates/_base/types";
import Image from "next/image";

export function GalleryScene({ data, sceneId }: SceneProps) {
  const photos  = getField<string[]>(data, sceneId, "photos", []);
  const caption = getField(data, sceneId, "caption", "momen-momen kita bersama");
  const hasPhotos = Array.isArray(photos) && photos.length > 0;

  return (
    <section className="min-h-screen flex flex-col items-center justify-center px-6 py-20"
      style={{ background: "#fffcf8" }}>
      <div className="w-full max-w-sm mx-auto">
        <p className="text-center text-xs tracking-[0.25em] uppercase mb-3"
          style={{ color: "var(--color-muted)" }}>kenangan</p>
        <h2 className="text-center text-3xl font-light mb-10"
          style={{ fontFamily: "var(--font-display)", color: "var(--color-text)" }}>
          {caption}
        </h2>

        {hasPhotos ? (
          <div className={`grid gap-3 ${photos.length === 1 ? "grid-cols-1" : "grid-cols-2"}`}>
            {photos.slice(0, 5).map((url, i) => (
              <div key={i}
                className={`relative overflow-hidden rounded-2xl ${
                  i === 0 && photos.length >= 3 ? "col-span-2" : ""
                }`}
                style={{
                  aspectRatio: i === 0 && photos.length >= 3 ? "16/9" : "1/1",
                  boxShadow: "var(--shadow-card)",
                }}>
                {/* sizes prop ditambahkan untuk performa */}
                <Image
                  src={url}
                  alt={`foto ${i + 1}`}
                  fill
                  sizes={
                    i === 0 && photos.length >= 3
                      ? "100vw"
                      : "(max-width: 640px) 50vw, 200px"
                  }
                  className="object-cover"
                />
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-3">
            {[0, 1, 2, 3].map((i) => (
              <div key={i}
                className="aspect-square rounded-2xl flex items-center justify-center"
                style={{
                  background: "rgba(240,65,90,0.05)",
                  border: "1.5px dashed rgba(240,65,90,0.15)",
                }}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <rect x="3" y="3" width="18" height="18" rx="4" stroke="#f7a8b8" strokeWidth="1.5"/>
                  <circle cx="8.5" cy="8.5" r="1.5" fill="#f7a8b8"/>
                  <path d="M3 16l5-5 4 4 3-3 6 6" stroke="#f7a8b8" strokeWidth="1.5" strokeLinecap="round"/>
                </svg>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}