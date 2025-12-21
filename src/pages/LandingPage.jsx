import Navbar from "../components/layout/Navbar";
import HeroSection from "../components/home/HeroSection";
import CategoryGrid from "../components/home/CategoryGrid";
import ProductListSection from "../components/home/ProductListSection";
import Footer from "../components/layout/Footer";

export default function LandingPage() {
  return (
    <>
      <Navbar />
      <HeroSection />
      <CategoryGrid />
      <ProductListSection />
      <Footer />
    </>
  );
}
