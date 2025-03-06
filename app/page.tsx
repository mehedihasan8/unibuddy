import CafeteriaMenu from "@/components/pages/Home/CafeteriaMenu";
import EventCart from "@/components/pages/Home/EventCart";
import Gallery from "@/components/pages/Home/GallerySection";
import HeroSection from "@/components/pages/Home/HeroSection";
import OurPartners from "@/components/pages/Home/OurPartners";
import WhyChoose from "@/components/pages/Home/WhyChoose";

const HomePage = () => {
  return (
    <>
      <HeroSection />
      <OurPartners />
      <CafeteriaMenu />
      <EventCart />
      <WhyChoose />
      <Gallery />
    </>
  );
};

export default HomePage;
