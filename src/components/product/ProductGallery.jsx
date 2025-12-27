import { useState } from "react";

export default function ProductGallery({ images }) {
  const [active, setActive] = useState(0);

  if (!images?.length) return null;

  return (
    <div className="space-y-4">
      <img
        src={images[active]?.image_url}
        className="w-full h-96 object-contain rounded-lg bg-gray-50"
      />

      {images.length > 1 && (
        <div className="flex gap-3 overflow-x-auto">
          {images.map((img, i) => (
            <img
              key={i}
              src={img.image_url}
              onClick={() => setActive(i)}
              className={`w-20 h-20 object-contain rounded cursor-pointer border
                ${active === i ? "border-black" : "border-gray-200"}
              `}
            />
          ))}
        </div>
      )}
    </div>
  );
}
