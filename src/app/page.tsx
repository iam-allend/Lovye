import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

import {
  HeroSection,
  CategorySection,
  FeaturedTemplates,
  ShowcaseSection,
  CTASection,
  FloatingElements,
} from "@/components/home";

export default function HomePage() {
  return (
    <main className="lovye-homepage">
      <FloatingElements />

      <Navbar />

      <HeroSection />

      <CategorySection />

      <FeaturedTemplates />

      <ShowcaseSection />

      <CTASection />

      <Footer />
    </main>
  );
}