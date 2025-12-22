import React, { useEffect, useState } from "react";
import {
  createAttributeValue,
  updateAttributeValue,
} from "../../api/attributeValue.api";

const AttributeValueFormDrawer = ({ attributeId, value, onClose, onSaved }) => {
  const [val, setVal] = useState("");

  useEffect(() => {
    if (value?.value) setVal(value.value);
  }, [value]);

  const submit = async (e) => {
    e.preventDefault();

    if (value?.id) {
      await updateAttributeValue(value.id, { value: val });
    } else {
      await createAttributeValue(attributeId, { value: val });
    }

    onSaved();
    onClose();
  };

  return (
    <>
      <div className="fixed inset-0 bg-black/30 z-50" onClick={onClose} />
      <div className="fixed right-0 top-0 h-full w-[360px] bg-white z-60 p-5 shadow-xl">
        <h3 className="font-semibold mb-4">
          {value?.id ? "Edit Value" : "Add Value"}
        </h3>

        <form onSubmit={submit} className="space-y-4">
          <input
            value={val}
            onChange={(e) => setVal(e.target.value)}
            placeholder="Value"
            className="w-full border px-3 py-2 rounded-md"
          />

          <div className="flex gap-3">
            <button className="bg-yellow-400 px-4 py-2 rounded-md">
              Save
            </button>
            <button type="button" onClick={onClose} className="border px-4 py-2 rounded-md">
              Cancel
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default AttributeValueFormDrawer;
