import { useState } from "react";
import { createAttributeValue } from "../../api/attributeValue.api";

export default function AttributeValueForm({ attribute, onSuccess }) {
  const [value, setValue] = useState("");
  const [order, setOrder] = useState(0);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!value.trim()) {
      setError("Value is required");
      return;
    }

    try {
      await createAttributeValue(attribute.id, {
        value,
        display_order: order,
      });
      setValue("");
      setOrder(0);
      onSuccess();
    } catch (err) {
      setError(err.response?.data?.message || "Failed to add value");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-3 items-end">
      <div>
        <label className="block text-sm">Value</label>
        <input
          className="border p-2"
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
      </div>

      <div>
        <label className="block text-sm">Order</label>
        <input
          type="number"
          className="border p-2"
          value={order}
          onChange={(e) => setOrder(Number(e.target.value))}
        />
      </div>

      <button className="bg-yellow-400 px-4 py-2 rounded font-semibold">
        Add
      </button>

      {error && <p className="text-red-500">{error}</p>}
    </form>
  );
}
