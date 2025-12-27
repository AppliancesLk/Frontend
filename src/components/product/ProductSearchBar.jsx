const ProductSearchBar = ({ filters, updateFilter, removeFilter, filtersWithName , setFiltersWithName }) => {
  const activeFilters = Object.entries(filtersWithName).filter(
    ([_, v]) => v !== ""
  );

  const removeAllFilter = (key)=>{
    console.log("call this")
    setFiltersWithName(prev => ({...prev , [key]:""}))
    removeFilter(key);
  }

  return (
    <div className="mb-6 space-y-4">
      {/* Search */}
      <input
        placeholder="Search products..."
        value={filters.q}
        onChange={(e) => updateFilter("q", e.target.value)}
        className="w-full border px-4 py-3 rounded-xl focus:ring-2 focus:ring-yellow-400"
      />

      {/* Active Filters */}
      {activeFilters.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {activeFilters.map(([key, value]) => (
            <span
              key={key}
              className="flex items-center bg-gray-100 px-3 py-1 rounded-full text-sm"
            >
              {key}: {value}
              <button
                onClick={() => removeAllFilter(key)}
                className="ml-2 text-gray-500 hover:text-red-500"
              >
                ✕
              </button>
            </span>
          ))}
        </div>
      )}
    </div>
  );
};


// const mapFiltersForDisplay = (filters, filtersWithName) => {
//   return Object.keys(filters).reduce((acc, key) => {
//     const id = filters[key];
//     const name = filtersWithName?.[key];

//     if (id !== "" && id != null) {
//       acc[key] = {
//         key,
//         id,
//         name: name || id, // fallback safety
//       };
//     }

//     return acc;
//   }, {});
// };


export default ProductSearchBar