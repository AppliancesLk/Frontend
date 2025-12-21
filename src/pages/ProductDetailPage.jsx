import { useParams } from "react-router-dom";
import { products } from "../data/products";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import ProductGallery from "../components/product/ProductGallery";
import ProductSummary from "../components/product/ProductSummary";

export default function ProductDetailPage() {
  const { id } = useParams();

  const product = products.find((p) => p.id === Number(id));

  if (!product) {
    return <div className="p-6 text-center text-red-600">Product not found</div>;
  }

  return (
    <>
      <Navbar />

      <div className="flex flex-col md:flex-row gap-10 p-6">
        <ProductGallery product={product} />
        <ProductSummary product={product} />
      </div>

      <Footer />
    </>
  );
}
