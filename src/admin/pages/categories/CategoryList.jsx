import { useEffect, useState } from "react";
import useAdminGuard from "../../hooks/useAdminGuard";
import { getCategories } from "../../api/category.api";
import CategoryForm from "./CategoryForm";

export default function CategoryList() {
 

  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingCategory, setEditingCategory] = useState(null);

  const loadCategories = async () => {
    try {
      const res = await getCategories();
      setCategories(res.data);
    } catch (err) {
      console.error("Failed to load categories", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadCategories();
  }, []);

  if (loading) return <p>Loading...</p>;

  return (
    <div className="p-6">
      

      <table className="w-full border">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-3 text-left">Name</th>
            <th className="p-3 text-left">Slug</th>
            <th className="p-3 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {categories.map((cat) => (
            <tr key={cat.id} className="border-t">
              <td className="p-3">{cat.name}</td>
              <td className="p-3">{cat.slug}</td>
              <td className="p-3">
                <button
                  className="text-yellow-600 mr-3"
                  onClick={() => setEditingCategory(cat)}
                >
                  Edit
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {editingCategory && (
        <CategoryForm
          category={editingCategory}
          onClose={() => setEditingCategory(null)}
          onSuccess={() => {
            setEditingCategory(null);
            loadCategories();
          }}
        />
      )}
    </div>
  );
}
