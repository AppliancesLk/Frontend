import React, { useEffect, useMemo, useState } from "react";
import useAdminGuard from "../../hooks/useAdminGuard";
import {
  getAttributes,
  createAttribute,
  updateAttribute,
} from "../../api/attribute.api";
import SearchInput from "../../components/SearchInput";
import AttributeList from "./AttributeList";
import AttributeFormDrawer from "./AttributeFormDrawer";
import AttributeValuesDrawer from "./AttributeValuesDrawer";

export const Attributes = () => {
  useAdminGuard();

  const [attributes, setAttributes] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  const [attributeDrawerOpen, setAttributeDrawerOpen] = useState(false);
  const [valuesDrawerOpen, setValuesDrawerOpen] = useState(false);
  const [mode, setMode] = useState("add");
  const [editingAttribute, setEditingAttribute] = useState(null);

  const fetchAttributes = async () => {
    const res = await getAttributes();
    setAttributes(res.data);
    setLoading(false);
  };

  useEffect(() => {
    fetchAttributes();
  }, []);

  const filteredAttributes = useMemo(() => {
    if (!search) return attributes;
    const term = search.toLowerCase();
    return attributes.filter((a) =>
      [a.name, a.slug].some((v) => v.toLowerCase().includes(term))
    );
  }, [attributes, search]);

  const openAdd = () => {
    setMode("add");
    setEditingAttribute(null);
    setAttributeDrawerOpen(true);
  };

  const openEdit = (attr) => {
    setMode("edit");
    setEditingAttribute(attr);
    setAttributeDrawerOpen(true);
  };

  const openValues = (attr) => {
    setEditingAttribute(attr);
    setValuesDrawerOpen(true);
  };

  const handleSubmit = async (data) => {
    if (mode === "add") {
      await createAttribute(data);
    } else {
      await updateAttribute(editingAttribute.id, data);
    }
    setAttributeDrawerOpen(false);
    fetchAttributes();
  };

  if (loading) return <p className="p-6">Loading...</p>;

  return (
    <div className="min-h-screen bg-slate-50 p-6">
      <div className="flex justify-between mb-6">
        <h2 className="text-xl font-semibold">Attributes</h2>
        <div className="flex gap-3">
          <SearchInput
            value={search}
            onChange={setSearch}
            placeholder="Search attributes..."
          />
          <button
            onClick={openAdd}
            className="bg-yellow-400 px-4 py-2 rounded-md font-medium"
          >
            + Add Attribute
          </button>
        </div>
      </div>

      <AttributeList
        attributes={filteredAttributes}
        onEdit={openEdit}
        onViewValues={openValues}
      />

      {attributeDrawerOpen && (
        <AttributeFormDrawer
          mode={mode}
          attribute={editingAttribute}
          onClose={() => setAttributeDrawerOpen(false)}
          onSubmit={handleSubmit}
        />
      )}

      {valuesDrawerOpen && editingAttribute && (
        <AttributeValuesDrawer
          attribute={editingAttribute}
          onClose={() => setValuesDrawerOpen(false)}
        />
      )}
    </div>
  );
};
