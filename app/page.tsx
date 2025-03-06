import CafeteriaMenu from "@/components/pages/Home/CafeteriaMenu";
import Gallery from "@/components/pages/Home/GallerySection";
import HeroSection from "@/components/pages/Home/HeroSection";
import OurPartners from "@/components/pages/Home/OurPartners";

const HomePage = () => {
  return (
    <>
      <HeroSection />
      <OurPartners />
      <CafeteriaMenu />
      <Gallery />
    </>
  );
};

export default HomePage;
