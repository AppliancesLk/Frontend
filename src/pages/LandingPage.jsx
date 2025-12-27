import Navbar from "../components/layout/Navbar";
import HeroSection from "../components/home/HeroSection";
import CategoryGrid from "../components/home/CategoryGrid";
import ProductListSection from "../components/home/ProductListSection";
import BrandGrid from "../components/home/BrandGrid";
import AdvantagesSection from "../components/home/AdvantagesSection";
import NewsletterSection from "../components/home/NewsletterSection";
import Footer from "../components/layout/Footer";

export default function LandingPage() {
  return (
    <>
      <Navbar />

      {/* Hero Section */}
      <section className="bg-white  text-center">
        <HeroSection />
      </section>

      {/* Categories */}
      <h2 className="text-2xl md:text-3xl font-bold mb-6 text-left px-6">
        Shop by Categories
      </h2>

      <section className="bg-gray-50 py-1">
        <CategoryGrid />
      </section>

      {/* Featured Products */}
    
      <section className="bg-white py-16">
        <ProductListSection title="Top Selling Products" />
      </section>

      {/* Brands */}
      <h2 className="text-2xl md:text-3xl font-bold mb-6 text-left px-6">
        Our Brands
      </h2>

      <section className="bg-gray-50 py-10">
        <BrandGrid />
      </section>

      <section className="bg-white py-16">
        <ProductListSection title="New Arrivals" />
      </section>

      {/* Advantages */}
      <h2 className="text-3xl md:text-4xl font-bold mb-1 mt-5 text-center">Why Shop With Us</h2>
      <section className="bg-white py-10 text-center mb-5">
        <AdvantagesSection />
      </section>

      {/* Newsletter */}
      
      <section className="bg-yellow-50 py-10 text-center">
        <NewsletterSection />
      </section>

       <Footer />
    </>
  );
}
