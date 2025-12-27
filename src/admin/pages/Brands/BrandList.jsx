import React from "react";

function BrandList({ brands, onEdit, onViewModels, onAddModel }) {
  if (!brands || brands.length === 0) {
    return (
      <div className="text-center text-slate-500 py-10">
        No Brand Found
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {brands.map((brand) => (
        <div
          key={brand.id}
          className="bg-white rounded-lg shadow-sm p-4 flex justify-between items-center"
        >
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-1 sm:gap-4 w-full">
             <span className="w-16 h-10 ">
                {brand?.logo_url ? (
                  <img
                    src={brand?.logo_url}
                    alt={brand?.name}
                    className="w-full h-full object-cover rounded"
                  />
                ) : (
                  <div className="w-full h-full bg-slate-200 flex items-center justify-center text-slate-500 text-xs rounded">
                    No Image
                  </div>
                )}
              </span>
            <h4 className="font-medium text-slate-800 truncate">
              {brand.name}
            </h4>
            <p className="text-sm text-slate-500 truncate">{brand.slug}</p>
            
          </div>

          <div className="flex gap-2 ml-4 shrink-0">
            <button
              onClick={() => onViewModels(brand)}
              className="bg-green-100 hover:bg-green-200 px-3 py-1.5 rounded-md text-sm"
            >
              See Models
            </button>

            <button
              onClick={() => onAddModel(brand)}
              className="bg-purple-100 hover:bg-purple-200 px-3 py-1.5 rounded-md text-sm"
            >
              Add Model
            </button>

            <button
              onClick={() => onEdit(brand)}
              className="bg-yellow-100 hover:bg-yellow-200 px-3 py-1.5 rounded-md text-sm"
            >
              Edit
            </button>

            <button
              className="bg-red-300 hover:bg-red-200 px-3 py-1.5 rounded-md text-sm"
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default BrandList;
