export default function ProductPriceStock({ variant, defaultPrice }) {
  return (
    <>
      <p className="text-2xl font-semibold text-yellow-600">
        Rs {variant?.price || defaultPrice}
      </p>

      <p
        className={`font-medium ${
          variant?.stock > 0 ? "text-green-600" : "text-red-500"
        }`}
      >
        {variant
          ? `${variant.stock} in stock`
          : "Select options"}
      </p>
    </>
  );
}
