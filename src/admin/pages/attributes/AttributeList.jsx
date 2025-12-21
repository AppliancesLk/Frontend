import { useEffect, useState } from "react";
import useAdminGuard from "../../hooks/useAdminGuard";
import { getAttributes } from "../../api/attribute.api";
import AttributeForm from "./AttributeForm";

export default function AttributeList() {
 

  const [attributes, setAttributes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingAttribute, setEditingAttribute] = useState(null);

  const loadAttributes = async () => {
    try {
      const res = await getAttributes();
      setAttributes(res.data);
    } catch (err) {
      console.error("Failed to load attributes", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadAttributes();
  }, []);

  if (loading) return <p>Loading...</p>;

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Attributes</h1>
        <AttributeForm onSuccess={loadAttributes} />
      </div>

      <table className="w-full border">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-3 text-left">Name</th>
            <th className="p-3 text-left">Type</th>
            <th className="p-3 text-left">Scope</th>
            <th className="p-3 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {attributes.map((attr) => (
            <tr key={attr.id} className="border-t">
              <td className="p-3">{attr.name}</td>
              <td className="p-3">{attr.data_type}</td>
              <td className="p-3">{attr.scope}</td>
              <td className="p-3">
                <button
                  className="text-yellow-600 mr-3"
                  onClick={() => setEditingAttribute(attr)}
                >
                  Edit
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {editingAttribute && (
        <AttributeForm
          attribute={editingAttribute}
          onClose={() => setEditingAttribute(null)}
          onSuccess={() => {
            setEditingAttribute(null);
            loadAttributes();
          }}
        />
      )}
    </div>
  );
}
