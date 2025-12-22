import React, { useEffect, useMemo, useState } from "react";
import {
  getAttributeValues,
  createAttributeValue,
  updateAttributeValue,
} from "../../api/attributeValue.api";
import SearchInput from "../../components/SearchInput";
import AttributeValueFormDrawer from "./AttributeValueFormDrawer";

const AttributeValuesDrawer = ({ attribute, onClose }) => {
  const [values, setValues] = useState([]);
  const [search, setSearch] = useState("");
  const [editingValue, setEditingValue] = useState(null);

  const fetchValues = async () => {
    const res = await getAttributeValues(attribute.id);
    setValues(res.data);
  };

  useEffect(() => {
    fetchValues();
  }, [attribute.id]);

  const filteredValues = useMemo(() => {
    if (!search) return values;
    return values.filter((v) =>
      v.value.toLowerCase().includes(search.toLowerCase())
    );
  }, [values, search]);

  return (
    <>
      <div className="fixed inset-0 bg-black/30 z-40" onClick={onClose} />
      <div className="fixed right-0 top-0 h-full w-[420px] bg-white z-50 p-5 shadow-xl">
        <div className="flex justify-between mb-4">
          <h3 className="font-semibold">
            Values · {attribute.name}
          </h3>
          <button onClick={onClose}>✕</button>
        </div>

        <div className="flex gap-3 mb-4">
          <SearchInput
            value={search}
            onChange={setSearch}
            placeholder="Search values..."
          />
          <button
            onClick={() => setEditingValue({})}
            className="bg-yellow-400 px-3 py-2 rounded-md"
          >
            + Add
          </button>
        </div>

        <div className="space-y-2">
          {filteredValues.map((val) => (
            <div
              key={val.id}
              className="border rounded-md p-3 flex justify-between"
            >
              <span>{val.value}</span>
              <button
                onClick={() => setEditingValue(val)}
                className="text-yellow-600 text-sm"
              >
                Edit
              </button>
            </div>
          ))}
        </div>
      </div>

      {editingValue !== null && (
        <AttributeValueFormDrawer
          attributeId={attribute.id}
          value={editingValue}
          onClose={() => setEditingValue(null)}
          onSaved={fetchValues}
        />
      )}
    </>
  );
};

export default AttributeValuesDrawer;
