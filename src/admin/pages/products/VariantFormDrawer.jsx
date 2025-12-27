import React, { useEffect, useState } from "react";
import { createVariant, getVariantById } from "../../api/variant.api";
import { getAttributes } from "../../api/attribute.api";
import { getAttributeValues } from "../../api/attributeValue.api";

const VariantFormDrawer = ({ product, variant, onClose, onSaved }) => {
  const isEdit = !!variant?.id;

  const [attributes, setAttributes] = useState([]);
  const [valuesMap, setValuesMap] = useState({});
  const [variantAttributes, setVariantAttributes] = useState([]);

  const [sku, setSku] = useState("");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("");
  const [enabled, setEnabled] = useState(true);

  const [selectedAttributeId, setSelectedAttributeId] = useState("");
  const [selectedValueId, setSelectedValueId] = useState("");

  // ---------------- Load attributes ----------------
  useEffect(() => {
    getAttributes().then((res) => setAttributes(res.data));
  }, []);

  // ---------------- Load variant if editing ----------------
  useEffect(() => {
    const fetchVariant = async () => {
      if (!isEdit) return;

      const response = await getVariantById(variant.id);
      const data = response?.data;

      setSku(data?.sku || "");
      setPrice(data?.price || "");
      setStock(data?.stock || "");
      setEnabled(data?.enabled ?? true);
      setVariantAttributes(data?.attributes || []);

      // load attribute values
      data?.attributes?.forEach((attr) => loadValues(attr.attributeId));
    };

    fetchVariant();
  }, [variant]);

  // ---------------- Load attribute values ----------------
  const loadValues = async (attrId) => {
    if (!attrId || valuesMap[attrId]) return;

    const res = await getAttributeValues(attrId);
    setValuesMap((prev) => ({
      ...prev,
      [attrId]: res.data,
    }));
  };

  // ---------------- Check duplicate pair ----------------
  const isPairUsed = (attrId, valueId) => {
    return variantAttributes?.some(
      (a) => a.attributeId === Number(attrId) && a.attributeValueId === Number(valueId)
    );
  };

  // ---------------- Add attribute-value ----------------
  const handleAddAttribute = () => {
    if (!selectedAttributeId || !selectedValueId) return;
    if (isPairUsed(selectedAttributeId, selectedValueId)) return;

    setVariantAttributes((prev) => [
      ...prev,
      {
        attributeId: Number(selectedAttributeId),
        attributeValueId: Number(selectedValueId),
      },
    ]);

    setSelectedValueId("");
  };

  // ---------------- Remove attribute-value ----------------
  const removeAttribute = (attrId, valueId) => {
    setVariantAttributes((prev) =>
      prev.filter(
        (a) => !(a.attributeId === attrId && a.attributeValueId === valueId)
      )
    );
  };

  // ---------------- Submit ----------------
  const submit = async (e) => {
    e.preventDefault();

    const payload = {
      productId: product.id,
      sku,
      price: Number(price),
      stock: Number(stock),
      enabled,
      value_text: variantAttributes.map((a) => `${a.attributeId}:${a.attributeValueId}`).join(","),
      attributes: variantAttributes,
    };

    await createVariant(product.id, payload);
    onSaved();
    onClose();
  };

  return (
    <>
      {/* overlay */}
      <div className="fixed inset-0 bg-black/40 z-70" onClick={onClose} />

      {/* drawer */}
      <div className="fixed right-0 top-0 h-full w-[420px] bg-white z-80 p-6 shadow-xl overflow-y-auto">
        <h3 className="text-lg font-semibold mb-4">{isEdit ? "Edit Variant" : "Add Variant"}</h3>

        <form onSubmit={submit} className="space-y-4">
          <input
            placeholder="SKU"
            value={sku}
            onChange={(e) => setSku(e.target.value)}
            className="w-full border px-3 py-2 rounded-md"
            required
          />

          <input
            type="number"
            placeholder="Price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="w-full border px-3 py-2 rounded-md"
            required
          />

          <input
            type="number"
            placeholder="Stock"
            value={stock}
            onChange={(e) => setStock(e.target.value)}
            className="w-full border px-3 py-2 rounded-md"
            required
          />

          <label className="flex items-center gap-2 text-sm">
            <input type="checkbox" checked={enabled} onChange={() => setEnabled(!enabled)} />
            Enabled
          </label>

          {/* ATTRIBUTE PICKER */}
          <div className="border rounded-md p-3 space-y-3">
            <h4 className="text-sm font-medium">Attributes</h4>

            <div className="flex gap-2">
              {/* Attribute */}
              <select
                value={selectedAttributeId}
                onChange={(e) => {
                  setSelectedAttributeId(e.target.value);
                  loadValues(e.target.value);
                }}
                className="border px-2 py-2 rounded-md w-1/2"
              >
                <option value="">Select Attribute</option>
                {attributes.map((attr) => (
                  <option key={attr.id} value={attr.id}>
                    {attr.name}
                  </option>
                ))}
              </select>

              {/* Value */}
              <select
                value={selectedValueId}
                onChange={(e) => setSelectedValueId(e.target.value)}
                className="border px-2 py-2 rounded-md w-1/2"
                disabled={!selectedAttributeId}
              >
                <option value="">Select Value</option>
                {(valuesMap[selectedAttributeId] || []).map((v) => {
                  const used = isPairUsed(selectedAttributeId, v.id);
                  return (
                    <option key={v.id} value={v.id} disabled={used}>
                      {v.value} {used ? "(added)" : ""}
                    </option>
                  );
                })}
              </select>
            </div>

            <button
              type="button"
              onClick={handleAddAttribute}
              disabled={!selectedAttributeId || !selectedValueId}
              className="bg-yellow-400 hover:bg-yellow-500 px-3 py-1 rounded-md text-sm font-medium disabled:opacity-50"
            >
              Add Attribute
            </button>

            {/* Added list */}
            <div className="space-y-2">
              {variantAttributes?.map((item) => {
                const attr = attributes.find((a) => a.id === item.attributeId);
                const val = valuesMap[item.attributeId]?.find((v) => v.id === item.attributeValueId);

                return (
                  <div
                    key={`${item.attributeId}-${item.attributeValueId}`}
                    className="flex justify-between items-center bg-slate-100 px-3 py-2 rounded"
                  >
                    <span className="text-sm">
                      {attr?.name} : {val?.value}
                    </span>

                    <button
                      type="button"
                      onClick={() => removeAttribute(item.attributeId, item.attributeValueId)}
                      className="text-red-500 text-xs"
                    >
                      Remove
                    </button>
                  </div>
                );
              })}
            </div>
          </div>

          {/* actions */}
          <div className="flex gap-3 pt-3">
            <button className="bg-yellow-400 px-4 py-2 rounded-md font-medium">
              Save Variant
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

export default VariantFormDrawer;
