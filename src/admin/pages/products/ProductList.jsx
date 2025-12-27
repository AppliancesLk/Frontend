import React from "react";

const ProductList = ({ products, onEdit, onViewVariants , onDelete}) => {
  if (!products.length) {
    return (
      <div className="text-center text-slate-500 py-10">
        No products found
      </div>
    );
  }


  return (
    <div className="space-y-3">
      {products.map((p) => {
         const firstImage = p.images && p.images.length > 0 ? p.images[0] : null;
         return(
      
        <div
          key={p.id}
          className="bg-white p-4 rounded-lg shadow-sm flex justify-between"
        >
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-2 w-full">
            <span className="w-16 h-10 ">
                {firstImage ? (
                  <img
                    src={firstImage}
                    alt={p.title}
                    className="w-full h-full object-cover rounded"
                  />
                ) : (
                  <div className="w-full h-full bg-slate-200 flex items-center justify-center text-slate-500 text-xs rounded">
                    No Image
                  </div>
                )}
              </span>
              
            <span className="font-medium truncate">{p.title}</span>
             <span className="text-sm text-slate-400">
              {p.active ? "Active" : "Inactive"}
            </span>
            <span className="text-sm text-slate-500">{p.default_price || "-"}</span>
            
           
          </div>

          <div className="flex gap-2 ml-4">
            <button
              onClick={() => onViewVariants(p)}
              className="bg-green-100 px-3 py-1.5 rounded-md text-sm"
            >
              Variants
            </button>
            <button
              onClick={() => onEdit(p)}
              className="bg-yellow-100 px-3 py-1.5 rounded-md text-sm"
            >
              Edit
            </button>
             <button
              onClick={() => onDelete(p)}
              className="bg-red-100 px-3 py-1.5 rounded-md text-sm"
            >
              Delete
            </button>
          </div>
        </div>
         );
      })}
    </div>
  );
};

export default ProductList;
