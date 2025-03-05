import CountDownSection from "@/components/pages/Home/CountDownSection";
import HeroSection from "@/components/pages/Home/HeroSection";

const HomePage = () => {
  return (
    <div className="text-3xl font-bold text-center">
      <HeroSection />
      <CountDownSection />
    </div>
  );
};

export default HomePage;
