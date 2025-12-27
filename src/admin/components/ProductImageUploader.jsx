import React, { useState, useEffect } from "react";
import axios from "axios";

const CLOUDINARY_URL = "https://api.cloudinary.com/v1_1/dqguy6ae8/upload";
const UPLOAD_PRESET = "product_images_unsigned";

const ProductImageUploader = ({ images = [], setImages , numberOfimage}) => {
  const [uploading, setUploading] = useState(false);

  console.log("images",images)

  /* -------------------- NORMALIZE IMAGES -------------------- */
  const normalizedImages = images.map((img) =>
    typeof img === "string" ? img : img.url
  );



  const [limitexceed, setLimitExceed] = useState(numberOfimage <= images.length);
  console.log("limitexceed",numberOfimage <= images.length)
  /* -------------------- UPLOAD -------------------- */
  const handleFiles = async (e) => {
    console.log("call this ")
    const files = Array.from(e.target.files || []);
    if (!files.length) return;

    setUploading(true);

    for (const file of files) {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", UPLOAD_PRESET);

      try {
        const res = await axios.post(CLOUDINARY_URL, formData);
        setImages((prev) => [...prev, res.data.secure_url]);
       
      } catch (err) {
        console.error("Upload failed:", err);
      }
    }
    setLimitExceed(numberOfimage <= images.length)
    setUploading(false);
  };

  /* -------------------- REMOVE (UI ONLY) -------------------- */
  const removeImage = (url) => {
    setImages((prev) =>
      prev.filter((img) =>
        (typeof img === "string" ? img : img.url) !== url
      )
    );
     setLimitExceed(numberOfimage <= images.length)
  };

  return (
    <div className="space-y-2">
      {/* Upload Button */}
      <label className="block bg-yellow-400 text-slate-800 px-4 py-2 rounded cursor-pointer hover:bg-yellow-500">
        {uploading ? "Uploading..." : "Select Images"}
        <input
          type="file"
          multiple
          accept="image/*"
          className="hidden"
          onChange={handleFiles}
          disabled={uploading || limitexceed}
        />
      </label>

      {/* Preview */}
      {normalizedImages.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {normalizedImages.map((url) => (
            <div key={url} className="relative">
              <img
                src={url}
                alt="preview"
                className="w-24 h-24 object-cover rounded border"
              />
              <button
                type="button"
                onClick={() => removeImage(url)}
                className="absolute top-0 right-0 bg-red-500 text-white rounded-full w-5 h-5 text-xs flex items-center justify-center"
              >
                &times;
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductImageUploader;
