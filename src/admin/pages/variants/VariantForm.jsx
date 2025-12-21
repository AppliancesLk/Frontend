import { useEffect, useState } from "react";
import { createVariant } from "../../api/variant.api";
import { getAttributes, getAttributeValues } from "../../api/attribute.api";

export default function VariantForm({ productId, onSuccess }) {
  const [attributes, setAttributes] = useState([]);
  const [selections, setSelections] = useState([]);
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    getAttributes().then((res) => setAttributes(res.data));
  }, []);

  const addAttribute = () => {
    setSelections([...selections, { attributeId: "", valueId: "", values: [] }]);
  };

  const onAttributeChange = async (index, attributeId) => {
    const valuesRes = await getAttributeValues(attributeId);

    const updated = [...selections];
    updated[index] = {
      attributeId,
      valueId: "",
      values: valuesRes.data,
    };
    setSelections(updated);
  };

  const onValueChange = (index, valueId) => {
    const updated = [...selections];
    updated[index].valueId = valueId;
    setSelections(updated);
  };

  const handleSubmit = async () => {
    setError("");

    if (!price || !stock || selections.length === 0) {
      setError("All fields are required");
      return;
    }

    try {
      await createVariant(productId, {
        price: Number(price),
        stock: Number(stock),
        attributes: selections.map((s) => ({
          attributeId: Number(s.attributeId),
          valueId: Number(s.valueId),
        })),
      });

      setSelections([]);
      setPrice("");
      setStock("");
      onSuccess();
    } catch (err) {
      setError(err.response?.data?.message || "Variant creation failed");
    }
  };

  return (
    <div className="border p-4 rounded bg-white">
      <h2 className="text-lg font-semibold mb-4">Create Variant</h2>

      {error && <p className="text-red-500 mb-3">{error}</p>}

      {selections.map((sel, i) => (
        <div key={i} className="flex gap-3 mb-3">
          <select
            className="border p-2 w-1/2"
            value={sel.attributeId}
            onChange={(e) => onAttributeChange(i, e.target.value)}
          >
            <option value="">Attribute</option>
            {attributes.map((a) => (
              <option key={a.id} value={a.id}>
                {a.name}
              </option>
            ))}
          </select>

          <select
            className="border p-2 w-1/2"
            value={sel.valueId}
            onChange={(e) => onValueChange(i, e.target.value)}
          >
            <option value="">Value</option>
            {sel.values.map((v) => (
              <option key={v.id} value={v.id}>
                {v.value}
              </option>
            ))}
          </select>
        </div>
      ))}

      <button
        className="text-blue-600 mb-4"
        onClick={addAttribute}
      >
        + Add Attribute
      </button>

      <input
        className="w-full border p-2 mb-3"
        placeholder="Price"
        type="number"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
      />

      <input
        className="w-full border p-2 mb-4"
        placeholder="Stock"
        type="number"
        value={stock}
        onChange={(e) => setStock(e.target.value)}
      />

      <button
        className="bg-yellow-400 px-4 py-2 rounded font-semibold"
        onClick={handleSubmit}
      >
        Create Variant
      </button>
    </div>
  );
}
