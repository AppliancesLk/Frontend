import { useNavigate } from "react-router-dom";
import { useBrands } from "../../hooks/useBrands";

const BrandGrid = () => {
  const { brands, loading } = useBrands();
  const navigate = useNavigate();

  if (loading) return <>Loading brands...</>;
  if (!brands?.length) return null;

  // duplicate list for infinite effect
  const loopBrands = [...brands, ...brands];

  return (
    <section className="px-6 py-10 overflow-hidden">
     

      <div className="relative w-full overflow-hidden">
        <div
          className="
            flex gap-20
            animate-brand-scroll
            hover:[animation-play-state:paused]
          "
        >
          {loopBrands?.map((brand, index) => (
            <div
              key={`${brand.id}-${index}`}
              onClick={() => navigate(`/products?brand=${brand.id}`)}
              className="flex flex-col items-center cursor-pointer shrink-0"
            >
              <div
                className="
                  w-28 h-28
                  rounded-full
                  bg-gray-100
                  flex items-center justify-center
                  shadow-md
                  transition
                  hover:scale-110
                "
              >
                <img
                  src={brand?.logo_url}
                  alt={brand?.name}
                  loading="lazy"
                  className="max-w-full max-h-full object-fit"
                />
              </div>

              <p className="mt-3 text-sm font-semibold text-gray-900 text-center">
                {brand?.name}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BrandGrid;
