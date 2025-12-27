const ProductFiltersSidebar = ({
  filters,
  updateFilter,
  resetFilters,
  categories,
  brands,
  models,
  setFiltersWithName
}) => {


  return (
    <aside className="w-64 shrink-0 border-r pr-6 space-y-6">
      <h3 className="font-semibold text-lg">Filters</h3>

      {/* Category */}
      <select
        value={filters.category}
        onChange={(e) => {
            const selected = categories?.find(c => c.id == e.target.value);
          updateFilter("category", e.target.value);
          setFiltersWithName((prev) => ({
            ...prev,
            category: selected?.name || "",
          }));
        }}
        className="w-full border rounded-lg px-3 py-2"
      >
        <option value="">All Categories</option>
        {categories.map((c) => (
          <option key={c.id} value={c.id}>
            {c.name}
          </option>
        ))}
      </select>

      {/* Brand */}
      <select
        value={filters.brand}
        onChange={(e) => {
         const selected = brands?.find(b => b.id == e.target.value);
          updateFilter("brand", e.target.value);
          setFiltersWithName((prev) => ({
            ...prev,
            brand: selected?.name || ""
          }));
        }}
        className="w-full border rounded-lg px-3 py-2"
      >
        <option value="">All Brands</option>
        {brands.map((b) => (
          <option key={b.id} value={b.id}>
            {b.name}
          </option>
        ))}
      </select>

      {/* Model (depends on brand) */}
      {filters.brand && (
        <select
          value={filters.model}
          onChange={(e) => {
            const selected = models?.find(m => m.id == e.target.value);
            updateFilter("model", e.target.value);
            setFiltersWithName((prev) => ({
              ...prev,
              model:selected?.name || ""
            }));
          }}
          className="w-full border rounded-lg px-3 py-2"
        >
          <option value="">All Models</option>
          {models.map((m) => (
            <option key={m.id} value={m.id}>
              {m.name}
            </option>
          ))}
        </select>
      )}

      {/* Price */}
      <div className="flex gap-2">
        <input
          placeholder="Min"
          value={filters.price_min}
          onChange={(e) => updateFilter("price_min", e.target.value)}
          className="w-1/2 border px-2 py-2 rounded-lg"
        />
        <input
          placeholder="Max"
          value={filters.price_max}
          onChange={(e) => updateFilter("price_max", e.target.value)}
          className="w-1/2 border px-2 py-2 rounded-lg"
        />
      </div>

      <button
        onClick={resetFilters}
        className="text-sm text-red-500 hover:underline"
      >
        Clear all filters
      </button>
    </aside>
  );
};

export default ProductFiltersSidebar;