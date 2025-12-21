export default function ProductGallery({ product }) {
  return (
    <div className="w-full md:w-1/2">
      <img
        src={product.image}
        className="w-full h-80 object-cover rounded-lg shadow"
        alt={product.title}
      />
    </div>
  );
}
