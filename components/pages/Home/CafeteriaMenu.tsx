/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import MenuCard from "../CafeteriaMenu/MenuCard";
import SectionTitle from "@/components/shared/SectionTitle/SectionTitle";
import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/firebase/firebaseConfig";
import Loading from "@/components/shared/Loading/Loading";

const CafeteriaMenu = () => {
  // const products = [
  //   {
  //     id: 1,
  //     name: "Orthopedic Insoles",
  //     description: "Arch Support & Comfort",
  //     price: 29.99,
  //     quantity: 15,
  //     image:
  //       "https://images.unsplash.com/photo-1646753522408-077ef9839300?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwcm9maWxlLXBhZ2V8NjZ8fHxlbnwwfHx8fA%3D%3D&auto=format&fit=crop&w=500&q=60",
  //   },
  //   {
  //     id: 2,
  //     quantity: 18,
  //     name: "Compression Socks",
  //     description: "Improves Circulation",
  //     price: 19.99,
  //     image:
  //       "https://images.unsplash.com/photo-1651950519238-15835722f8bb?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwcm9maWxlLXBhZ2V8Mjh8fHxlbnwwfHx8fA%3D%3D&auto=format&fit=crop&w=500&q=60",
  //   },
  //   {
  //     id: 3,
  //     name: "Foot Massager",
  //     quantity: 17,
  //     description: "Relieves Pain & Stress",
  //     price: 89.99,
  //     image:
  //       "https://images.unsplash.com/photo-1646753522408-077ef9839300?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwcm9maWxlLXBhZ2V8NjZ8fHxlbnwwfHx8fA%3D%3D&auto=format&fit=crop&w=500&q=60",
  //   },
  //   {
  //     id: 4,
  //     name: "Gel Heel Cups",
  //     quantity: 12,
  //     description: "Shock Absorbing",
  //     price: 14.99,
  //     image:
  //       "https://images.unsplash.com/photo-1651950519238-15835722f8bb?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwcm9maWxlLXBhZ2V8Mjh8fHxlbnwwfHx8fA%3D%3D&auto=format&fit=crop&w=500&q=60",
  //   },
  //   {
  //     id: 5,
  //     name: "Toe Separators",
  //     quantity: 13,
  //     description: "Bunion Relief",
  //     price: 12.99,
  //     image:
  //       "https://images.unsplash.com/photo-1646753522408-077ef9839300?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwcm9maWxlLXBhZ2V8NjZ8fHxlbnwwfHx8fA%3D%3D&auto=format&fit=crop&w=500&q=60",
  //   },
  //   {
  //     id: 6,
  //     name: "Anti-Fatigue Mat",
  //     quantity: 17,
  //     description: "For Standing Comfort",
  //     price: 49.99,
  //     image:
  //       "https://images.unsplash.com/photo-1651950519238-15835722f8bb?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwcm9maWxlLXBhZ2V8Mjh8fHxlbnwwfHx8fA%3D%3D&auto=format&fit=crop&w=500&q=60",
  //   },
  //   {
  //     id: 7,
  //     name: "Moisturizing Foot Mask",
  //     quantity: 13,
  //     description: "Deep Hydration",
  //     price: 15.99,
  //     image:
  //       "https://images.unsplash.com/photo-1646753522408-077ef9839300?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwcm9maWxlLXBhZ2V8NjZ8fHxlbnwwfHx8fA%3D%3D&auto=format&fit=crop&w=500&q=60",
  //   },
  //   {
  //     id: 8,
  //     name: "Plantar Fasciitis Night Splint",
  //     quantity: 18,
  //     description: "Pain Relief & Recovery",
  //     price: 39.99,
  //     image:
  //       "https://images.unsplash.com/photo-1651950519238-15835722f8bb?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwcm9maWxlLXBhZ2V8Mjh8fHxlbnwwfHx8fA%3D%3D&auto=format&fit=crop&w=500&q=60",
  //   },
  //   {
  //     id: 9,
  //     name: "Foot Scrubber",
  //     quantity: 19,
  //     description: "Exfoliates & Cleans",
  //     price: 9.99,
  //     image:
  //       "https://images.unsplash.com/photo-1646753522408-077ef9839300?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwcm9maWxlLXBhZ2V8NjZ8fHxlbnwwfHx8fA%3D%3D&auto=format&fit=crop&w=500&q=60",
  //   },
  //   {
  //     id: 10,
  //     name: "Electric Callus Remover",
  //     quantity: 187,
  //     description: "Soft & Smooth Feet",
  //     price: 24.99,
  //     image:
  //       "https://images.unsplash.com/photo-1651950519238-15835722f8bb?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwcm9maWxlLXBhZ2V8Mjh8fHxlbnwwfHx8fA%3D%3D&auto=format&fit=crop&w=500&q=60",
  //   },
  //   {
  //     id: 11,
  //     name: "Foot Warmer",
  //     quantity: 17,
  //     description: "Keeps Feet Cozy",
  //     price: 59.99,
  //     image:
  //       "https://images.unsplash.com/photo-1646753522408-077ef9839300?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwcm9maWxlLXBhZ2V8NjZ8fHxlbnwwfHx8fA%3D%3D&auto=format&fit=crop&w=500&q=60",
  //   },
  //   {
  //     id: 12,
  //     name: "Detox Foot Pads",
  //     quantity: 17,
  //     description: "Removes Toxins Overnight",
  //     price: 22.99,
  //     image:
  //       "https://images.unsplash.com/photo-1651950519238-15835722f8bb?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwcm9maWxlLXBhZ2V8Mjh8fHxlbnwwfHx8fA%3D%3D&auto=format&fit=crop&w=500&q=60",
  //   },
  // ];

  const [loading, setLoading] = useState(false);
  const [cafeteria, setCafeteria] = useState<any>([]);

  const fetchCafeteria = async () => {
    setLoading(true);
    try {
      const querySnapshot = await getDocs(collection(db, "cafeteria"));
      const cafeteriaData = querySnapshot.docs.map((doc) => ({
        id: doc.id, // ✅ Include document ID
        ...doc.data(),
      }));

      setCafeteria(cafeteriaData);
    } catch (error) {
      setLoading(false);
      console.error("Error fetching cafeteria data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCafeteria();
  }, []);

  return (
    <div className="bg-[#F9F8FF] pt-16 pb-20">
      <div className="max-w-7xl mx-auto px-4">
        {/* Section Title */}
        <SectionTitle title="Satisfy Your Hunger" description="Taste the best of our daily specials, packed with nutrition and flavor, crafted to fuel you for the day" />

        <div className="relative px-4">
          {
            loading ? <Loading /> : <Carousel >
              {/* Next & Previous Buttons */}
              <CarouselPrevious className="absolute left-[-15px] md:left-[-20px] top-1/2 transform -translate-y-1/2 z-10" />
              <CarouselNext className="absolute right-[-15px] md:right-[-20px] top-1/2 transform -translate-y-1/2 z-10" />

              {/* Carousel Content */}
              <CarouselContent>
                {cafeteria.map((item: any) => (
                  <CarouselItem

                    key={item.id}
                    className="sm:basis-full md:basis-1/2 lg:basis-1/3"
                  >
                    <MenuCard product={item} />
                  </CarouselItem>
                ))}
              </CarouselContent>
            </Carousel>
          }


        </div>
      </div>
    </div>
  );
};

export default CafeteriaMenu;
