import CafeteriaMenu from "@/components/pages/Home/CafeteriaMenu";
import EventCart from "@/components/pages/Home/EventCart";
import Gallery from "@/components/pages/Home/GallerySection";
import HeroSection from "@/components/pages/Home/HeroSection";
import JoinClub from "@/components/pages/Home/JoinClub";
import OurPartners from "@/components/pages/Home/OurPartners";
import WhyChoose from "@/components/pages/Home/WhyChoose";

const HomePage = () => {
  return (
    <>
      <HeroSection />
      <OurPartners />
      <CafeteriaMenu />
      <JoinClub />
      <EventCart />
      <Gallery />
      <WhyChoose />
    </>
  );
};

export default HomePage;
