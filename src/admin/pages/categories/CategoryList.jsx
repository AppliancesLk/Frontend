import React from "react";

const CategoryList = ({ categories, onEdit }) => {
  if (!categories || categories.length === 0) {
    return (
      <div className="text-center text-slate-500 py-10">
        No categories found
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {categories.map((category) => (
        <div
          key={category.id}
          className="bg-white rounded-lg shadow-sm p-4 flex items-center justify-between hover:shadow-md transition"
        >
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-4 w-full">
            <h4 className="font-medium text-slate-800 truncate">
              {category.name}
            </h4>

            <p className="text-sm text-slate-500 truncate">
              {category.slug || "-"}
            </p>

            <p className="text-sm text-slate-400 truncate">
              {category.description || "-"}
            </p>
          </div>

          <div className="ml-4">
            <button
              onClick={() => onEdit(category)}
              className="bg-yellow-100 hover:bg-yellow-200 text-slate-700 px-3 py-1.5 rounded-md text-sm font-medium"
            >
              Edit
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CategoryList;
