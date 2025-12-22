import React, { useEffect, useMemo, useState } from "react";
import { getModels, updateModel } from "../../api/model.api";
import SearchInput from "../../components/SearchInput";
import ModelFormDrawer from "./ModelFormDrawer";

const ModelListDrawer = ({ brand, onClose }) => {
  const [models, setModels] = useState([]);
  const [search, setSearch] = useState("");
  const [editingModel, setEditingModel] = useState(null);

  const fetchModels = async () => {
    const res = await getModels(brand.id);
    setModels(res.data);
  };

  useEffect(() => {
    fetchModels();
  }, [brand.id]);

  const filteredModels = useMemo(() => {
    if (!search) return models;
    return models.filter((m) =>
      m.name.toLowerCase().includes(search.toLowerCase())
    );
  }, [models, search]);

  return (
    <>
      <div className="fixed inset-0 bg-black/30 z-40" onClick={onClose} />

      <div className="fixed right-0 top-0 h-full w-105 bg-white z-50 shadow-xl p-5">
        <div className="flex justify-between mb-4">
          <h3 className="font-semibold">Models · {brand.name}</h3>
          <button onClick={onClose}>✕</button>
        </div>

        <SearchInput
          value={search}
          onChange={setSearch}
          placeholder="Search models..."
        />

        <div className="mt-4 space-y-2">
          {filteredModels.map((model) => (
            <div
              key={model.id}
              className="border rounded-md p-3 flex justify-between"
            >
              <span>{model.name}</span>
              <button
                onClick={() => setEditingModel(model)}
                className="text-yellow-600 text-sm"
              >
                Edit
              </button>
            </div>
          ))}
        </div>
      </div>

      {editingModel && (
        <ModelFormDrawer
          mode="edit"
          brandId={brand.id}
          model={editingModel}
          onClose={() => setEditingModel(null)}
          onSubmit={async (data) => {
            await updateModel(editingModel.id, data);
            setEditingModel(null);
            fetchModels();
          }}
        />
      )}
    </>
  );
};

export default ModelListDrawer;
