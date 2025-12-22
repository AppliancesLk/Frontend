import React, { useEffect, useState } from "react";
import { createModel } from "../../api/model.api";

const ModelFormDrawer = ({ mode, brandId, model, onClose, onSubmit }) => {
  const [name, setName] = useState("");
  const [slug, setSlug] = useState("");

  useEffect(() => {
    if (model) setName(model.name);
  }, [model]);

  const submit = async (e) => {
    e.preventDefault();
    const payload = { brand_id: brandId, name , slug};

    if (mode === "add") {
      await createModel(payload);
    } else {
      await onSubmit(payload);
    }
    onClose();
  };

  return (
    <>
      <div className="fixed inset-0 bg-black/30 z-50" onClick={onClose} />
      <div className="fixed right-0 top-0 h-full w-90 bg-white z-60 shadow-xl p-5">
        <h3 className="font-semibold mb-4">
          {mode === "add" ? "Add Model" : "Edit Model"}
        </h3>

        <form onSubmit={submit}>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Model name"
           className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-yellow-400 outline-none mb-3.5"
          />
          <input
            value={slug}
            onChange={(e) => setSlug(e.target.value)}
            placeholder="slug"
            className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-yellow-400 outline-none"
          />

          <div className="flex gap-3 mt-6">
            <button className="bg-yellow-400 px-4 py-2 rounded-md">
              Save
            </button>
            <button
              type="button"
              onClick={onClose}
              className="border px-4 py-2 rounded-md"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default ModelFormDrawer;
