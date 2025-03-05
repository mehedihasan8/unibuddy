import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

import Image from "next/image";

const HeroSection = () => {
  return (
    <div className="bg-[#F9F8FF]">
      <div className="max-w-7xl mx-auto flex-col lg:flex-row flex items-center justify-center pt-32 lg:pt-24 xl:pt-28 pb-24 gap-14 px-4">
        <div className="lg:w-1/2">
          <div className="text-[#221859] text-xl flex items-center gap-2 mb-4">
            <Image src={"/bulb.png"} alt="image" width={20} height={20} />
            Gateway to Lifelong Learning
          </div>
          <div className="text-5xl font-extrabold text-[#221859] leading-[60px]">
            <h1 className="inline">Unlock Your Potential with UniBuddy </h1>
            <div className="inline relative">
              Learning
              <Image
                src={"/image2.png"}
                alt="image"
                width={160}
                height={500}
                className="absolute bottom-0 left-0"
              />
            </div>
          </div>

          <p className="text-[#334155] leading-[30px] mt-4 mb-6 font-light">
            Discover a world of knowledge and opportunities with our UniBuddy
            education platform pursue a new career. Learn from industry experts
          </p>
          <Button className="primary-bg hover:!bg-[#3b83f6df] cursor-pointer py-6 !px-6 text-base transition-transform transform ">
            Start your instructor journey <ArrowRight size={25} />
          </Button>
        </div>
        <div className="lg:w-1/2">
          <Image
            className="w-full object-center"
            src="/hero.png"
            alt="Hero Image"
            width={1200}
            height={1000}
          />
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
