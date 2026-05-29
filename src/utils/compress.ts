// PATH: src/utils/compress.ts
// Kompres gambar di browser sebelum upload, max 100KB

export async function compressImage(file: File, maxKB = 100): Promise<File> {
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement("canvas");
        let { width, height } = img;

        // Scale down jika terlalu besar
        const MAX_DIM = 1200;
        if (width > MAX_DIM || height > MAX_DIM) {
          const ratio = Math.min(MAX_DIM / width, MAX_DIM / height);
          width = Math.round(width * ratio);
          height = Math.round(height * ratio);
        }

        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext("2d")!;
        ctx.drawImage(img, 0, 0, width, height);

        // Binary search quality untuk mencapai target size
        let quality = 0.8;
        let lo = 0.1, hi = 0.9;
        const targetBytes = maxKB * 1024;

        const tryQuality = (q: number): Promise<Blob | null> =>
          new Promise((res) => canvas.toBlob((b) => res(b), "image/webp", q));

        const iterate = async () => {
          for (let i = 0; i < 6; i++) {
            const blob = await tryQuality(quality);
            if (!blob) break;
            if (blob.size <= targetBytes) { lo = quality; }
            else { hi = quality; }
            quality = (lo + hi) / 2;
          }
          const finalBlob = await tryQuality(lo);
          if (!finalBlob) { resolve(file); return; }
          const compressed = new File(
            [finalBlob],
            file.name.replace(/\.[^.]+$/, ".webp"),
            { type: "image/webp" }
          );
          resolve(compressed);
        };
        iterate();
      };
      img.src = e.target?.result as string;
    };
    reader.readAsDataURL(file);
  });
}