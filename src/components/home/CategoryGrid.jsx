import Feather from "feather-icons-react";
import { useNavigate } from "react-router-dom";
import { useCategories } from "../../hooks/useCategories";

const  CategoryGrid = () => {
  const { categories, loading } = useCategories();
  const navigate = useNavigate();
  
  if (loading) return <>Loading categories</>;

  return (
    <section className="px-6 py-10">
 

      <div className="flex gap-10 overflow-x-auto scrollbar-hide pb-4 justify-center">
        {categories.map((cat) => (
          <div
            key={cat.id}
            onClick={() => navigate(`/products?category=${cat.id}`)}
            className="flex flex-col items-center cursor-pointer"
          >
            <div
              className="
                my-5 mx-2
                w-28 h-28
                rounded-full
                bg-gray-100
                flex items-center justify-center
                overflow-hidden
                shadow-md
                hover:scale-110
                transition
              "
            >
              <img
                src={cat.image_url}
                alt={cat.name}
                className="
              max-h-full
              max-w-full
              object-contain
              transition-transform
              duration-300
              group-hover:scale-105
            "
              />
            </div>

            <p className="mt-3 text-center font-semibold text-gray-900 text-sm">
              {cat.name}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
 export default CategoryGrid