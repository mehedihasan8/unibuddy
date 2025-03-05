"use client";

import Marquee from "react-fast-marquee";
import Image from "next/image";
import SectionTitle from "@/components/shared/SectionTitle/SectionTitle";

type Partner = {
  _id: number;
  pic: string;
};

const partners: Partner[] = [
  { _id: 1000001, pic: "/svg1.svg" },
  { _id: 1000002, pic: "/svg2.svg" },
  { _id: 1000003, pic: "/svg3.svg" },
  { _id: 1000004, pic: "/svg4.svg" },
  { _id: 1000005, pic: "/svg2.svg" },
  { _id: 1000006, pic: "/svg3.svg" },
  { _id: 1000007, pic: "/svg4.svg" },
  { _id: 1000008, pic: "/svg1.svg" },
  { _id: 1000009, pic: "/svg3.svg" },
  { _id: 1000010, pic: "/svg2.svg" },
  { _id: 1000011, pic: "/svg1.svg" },
  { _id: 1000012, pic: "/svg4.svg" },
];

const OurPartners = () => {
  return (
    <div className="mx-auto max-w-7xl px-4 py-10 md:my-10 lg:my-16">
      <SectionTitle
        title="Our Partners"
        description="Powerful Partnerships: Achieving Excellence Together with Industry Leaders."
      />
      {/* First Marquee */}
      <Marquee
        pauseOnClick={true}
        speed={80}
        gradient={true}
        gradientColor="#FFFFFF"
        className="grayscale"
      >
        {partners?.map((partner) => (
          <div key={partner._id} className="mx-8">
            <Image
              src={partner.pic}
              alt="Partner Logo"
              width={200}
              height={200}
              className="w-auto h-16 animate-colorize object-center"
            />
          </div>
        ))}
      </Marquee>

      {/* Second Marquee */}
      <Marquee
        pauseOnClick
        speed={60}
        gradient={true}
        gradientColor="#FFFFFF"
        className="grayscale mt-5 md:mt-16"
        direction="right"
      >
        {partners?.map((partner, index) => (
          <div key={index} className="mx-8">
            <Image
              src={partner.pic}
              alt="Partner Logo"
              width={150}
              height={150}
              className="w-auto h-16 animate-colorize"
            />
          </div>
        ))}
      </Marquee>
    </div>
  );
};

export default OurPartners;
