import { useEffect, useState } from "react";
import useAdminGuard from "../../hooks/useAdminGuard";
import { getAttributes } from "../../api/attribute.api";
import {
  getAttributeValues,
} from "../../api/attributeValue.api";
import AttributeValueForm from "./AttributeValueForm";

export default function AttributeValueList() {
 

  const [attributes, setAttributes] = useState([]);
  const [selectedAttribute, setSelectedAttribute] = useState(null);
  const [values, setValues] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getAttributes().then((res) => setAttributes(res.data));
  }, []);

  const loadValues = async (attributeId) => {
    setLoading(true);
    try {
      const res = await getAttributeValues(attributeId);
      setValues(res.data);
    } finally {
      setLoading(false);
    }
  };

  const handleAttributeChange = (e) => {
    const id = Number(e.target.value);
    const attr = attributes.find((a) => a.id === id);
    setSelectedAttribute(attr);
    loadValues(id);
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Attribute Values</h1>

      <select
        className="border p-2 mb-4"
        onChange={handleAttributeChange}
        defaultValue=""
      >
        <option value="" disabled>
          Select Attribute
        </option>
        {attributes.map((attr) => (
          <option key={attr.id} value={attr.id}>
            {attr.name}
          </option>
        ))}
      </select>

      {selectedAttribute && (
        <>
          <AttributeValueForm
            attribute={selectedAttribute}
            onSuccess={() => loadValues(selectedAttribute.id)}
          />

          <table className="w-full border mt-4">
            <thead className="bg-gray-100">
              <tr>
                <th className="p-3 text-left">Value</th>
                <th className="p-3 text-left">Order</th>
              </tr>
            </thead>
            <tbody>
              {values.map((val) => (
                <tr key={val.id} className="border-t">
                  <td className="p-3">{val.value}</td>
                  <td className="p-3">{val.display_order}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}
    </div>
  );
}
