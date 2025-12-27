import React, { useEffect, useState } from "react";
import ProductImageUploader from "../../components/ProductImageUploader";

export const AddBrand = ({ mode, onClose, brand, onSubmit }) => {
  const [name, setName] = useState("");
  const [slug, setSlug] = useState("");
  const [description, setDescription] = useState("");
  const [logo_url , setLogoUrl] = useState([]);
  const [banner_url, setBannerUrl] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    if (brand) {
      setName(brand?.name || "");
      setSlug(brand?.slug || "");
      setDescription(brand?.description || "");
      setLogoUrl(brand?.logo_url ? [brand?.logo_url] : []);
      setBannerUrl(brand?.banner_url ? [brand?.banner_url] : [])
    }
  }, [brand]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!name || !slug) {
      setError("Name and slug are required");
      return;
    }

    onSubmit({ name, slug, description , logo_url: logo_url[0],banner_url: banner_url[0] });
  };

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/30 z-40"
        onClick={onClose}
      />

      {/* Drawer */}
      <div className="fixed top-0 right-0 h-full w-95 bg-white z-50 shadow-2xl flex flex-col">
        <div className="p-6 border-b">
          <h3 className="text-lg font-semibold text-slate-800">
            {mode === "add" ? "Add Brand" : "Edit Brand"}
          </h3>
        </div>

        <form onSubmit={handleSubmit} className="p-6 flex-1">
          {error && (
            <p className="mb-4 text-sm text-red-500">{error}</p>
          )}

          <div className="space-y-4">
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Brand name"
              className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-yellow-400 outline-none"
            />

            <input
              type="text"
              value={slug}
              onChange={(e) => setSlug(e.target.value)}
              placeholder="Brand slug"
              className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-yellow-400 outline-none"
            />

            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Brand description"
              className="w-full px-3 py-2 border rounded-md resize-none h-24 focus:ring-2 focus:ring-yellow-400 outline-none"
            />
          </div>

          <div>
            Add Logo
            <ProductImageUploader images={logo_url} setImages={setLogoUrl} numberOfimage={1}/>
          </div>
           <div>
            Add Banner
            <ProductImageUploader images={banner_url} setImages={setBannerUrl} numberOfimage={1}/>
          </div>

          <div className="flex gap-3 mt-6">
            <button
              type="submit"
              className="bg-yellow-400 hover:bg-yellow-500 text-slate-800 font-medium px-4 py-2 rounded-md shadow"
            >
              {mode === "add" ? "Create Brand" : "Update Brand"}
            </button>

            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-md border text-slate-600 hover:bg-slate-100"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </>
  );
};
