import { useState } from "react";

export default function VariantSelector({ variants, onSelect }) {
  const [selected, setSelected] = useState(null);

  const handleSelect = (variant) => {
    setSelected(variant.id);
    onSelect(variant);
  };

  return (
    <div className="mt-4">
      <h3 className="font-semibold mb-2">Choose Variant</h3>

      <div className="flex flex-wrap gap-3">
        {variants.map((v) => {
          // Auto detect attribute
          const attr =
            v.ram || v.storage || v.color || v.cpu || v.title || "Option";

          return (
            <button
              key={v.id}
              onClick={() => handleSelect(v)}
              className={`px-4 py-2 border rounded-md ${
                selected === v.id
                  ? "bg-blue-600 text-white"
                  : "bg-white text-black"
              }`}
            >
              {attr}
            </button>
          );
        })}
      </div>
    </div>
  );
}
