import { useEffect, useState } from "react";
import { createAttribute, updateAttribute } from "../../api/attribute.api";

const DATA_TYPES = ["string", "number", "boolean", "enum"];
const SCOPES = ["global", "category"];

export default function AttributeForm({ attribute, onSuccess, onClose }) {
  const isEdit = !!attribute;

  const [name, setName] = useState("");
  const [slug, setSlug] = useState("");
  const [dataType, setDataType] = useState("enum");
  const [scope, setScope] = useState("category");
  const [error, setError] = useState("");

  useEffect(() => {
    if (attribute) {
      setName(attribute.name);
      setSlug(attribute.slug);
      setDataType(attribute.data_type);
      setScope(attribute.scope);
    }
  }, [attribute]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!name.trim()) {
      setError("Attribute name is required");
      return;
    }

    try {
      const payload = {
        name,
        slug,
        dataType: dataType,
        scope,
      };

      if (isEdit) {
        await updateAttribute(attribute.id, payload);
      } else {
        await createAttribute(payload);
      }

      onSuccess();
    } catch (err) {
      setError(err.response?.data?.message || "Failed to save attribute");
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-lg w-105"
      >
        <h2 className="text-xl font-semibold mb-4">
          {isEdit ? "Edit Attribute" : "Add Attribute"}
        </h2>

        {error && <p className="text-red-500 mb-3">{error}</p>}

        <input
          className="w-full border p-2 mb-3"
          placeholder="Attribute name (e.g. Color)"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          className="w-full border p-2 mb-3"
          placeholder="Slug (e.g. color)"
          value={slug}
          onChange={(e) => setSlug(e.target.value)}
        />

        <select
          className="w-full border p-2 mb-3"
          value={dataType}
          onChange={(e) => setDataType(e.target.value)}
        >
          {DATA_TYPES.map((t) => (
            <option key={t} value={t}>
              {t}
            </option>
          ))}
        </select>

        <select
          className="w-full border p-2 mb-4"
          value={scope}
          onChange={(e) => setScope(e.target.value)}
        >
          {SCOPES.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>

        <div className="flex justify-end gap-3">
          {onClose && (
            <button type="button" onClick={onClose}>
              Cancel
            </button>
          )}
          <button
            type="submit"
            className="bg-yellow-400 px-4 py-2 rounded font-semibold"
          >
            {isEdit ? "Update" : "Create"}
          </button>
        </div>
      </form>
    </div>
  );
}
