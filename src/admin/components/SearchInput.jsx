import React from "react";

const SearchInput = ({
  value,
  onChange,
  placeholder = "Search...",
}) => {
  return (
    <div className="relative w-full max-w-sm">
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="
          w-full px-4 py-2 pr-10
          border rounded-md
          focus:ring-2 focus:ring-yellow-400
          outline-none
          text-sm
        "
      />

 
    </div>
  );
};

export default SearchInput;
