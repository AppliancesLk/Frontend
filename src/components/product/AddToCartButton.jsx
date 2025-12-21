export default function AddToCartButton({ product, variant }) {
  const handleAdd = () => {
    console.log("Add to cart:", {
      product_id: product.id,
      variant_id: variant.id,
      qty: 1,
    });
  };

  return (
    <button
      onClick={handleAdd}
      className="mt-6 px-6 py-3 bg-green-600 text-white rounded-lg text-lg"
    >
      Add to Cart
    </button>
  );
}
