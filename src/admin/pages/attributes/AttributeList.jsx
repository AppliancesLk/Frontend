import React from "react";

const AttributeList = ({ attributes, onEdit, onViewValues }) => {
  if (!attributes?.length) {
    return (
      <div className="text-center text-slate-500 py-10">
        No attributes found
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {attributes.map((attr) => (
        <div
          key={attr.id}
          className="bg-white p-4 rounded-lg shadow-sm flex justify-between"
        >
          <div className="grid grid-cols-4 gap-4 w-full">
            <span className="font-medium truncate">{attr.name}</span>
            <span className="text-sm text-slate-500 truncate">{attr.slug}</span>
            <span className="text-sm text-slate-500">{attr.dataType}</span>
            <span className="text-sm text-slate-400">{attr.scope}</span>
          </div>

          <div className="flex gap-2 ml-4">
            <button
              onClick={() => onViewValues(attr)}
              className="bg-green-100 px-3 py-1.5 rounded-md text-sm"
            >
              Values
            </button>

            <button
              onClick={() => onEdit(attr)}
              className="bg-yellow-100 px-3 py-1.5 rounded-md text-sm"
            >
              Edit
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AttributeList;
