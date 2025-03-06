import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import MenuCard from "../CafeteriaMenu/MenuCard";
import SectionTitle from "@/components/shared/SectionTitle/SectionTitle";

const CafeteriaMenu = () => {
  const products = [
    {
      id: 1,
      name: "Orthopedic Insoles",
      description: "Arch Support & Comfort",
      price: 29.99,
      quantity: 15,
      image:
        "https://images.unsplash.com/photo-1646753522408-077ef9839300?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwcm9maWxlLXBhZ2V8NjZ8fHxlbnwwfHx8fA%3D%3D&auto=format&fit=crop&w=500&q=60",
    },
    {
      id: 2,
      quantity: 18,
      name: "Compression Socks",
      description: "Improves Circulation",
      price: 19.99,
      image:
        "https://images.unsplash.com/photo-1651950519238-15835722f8bb?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwcm9maWxlLXBhZ2V8Mjh8fHxlbnwwfHx8fA%3D%3D&auto=format&fit=crop&w=500&q=60",
    },
    {
      id: 3,
      name: "Foot Massager",
      quantity: 17,
      description: "Relieves Pain & Stress",
      price: 89.99,
      image:
        "https://images.unsplash.com/photo-1646753522408-077ef9839300?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwcm9maWxlLXBhZ2V8NjZ8fHxlbnwwfHx8fA%3D%3D&auto=format&fit=crop&w=500&q=60",
    },
    {
      id: 4,
      name: "Gel Heel Cups",
      quantity: 12,
      description: "Shock Absorbing",
      price: 14.99,
      image:
        "https://images.unsplash.com/photo-1651950519238-15835722f8bb?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwcm9maWxlLXBhZ2V8Mjh8fHxlbnwwfHx8fA%3D%3D&auto=format&fit=crop&w=500&q=60",
    },
    {
      id: 5,
      name: "Toe Separators",
      quantity: 13,
      description: "Bunion Relief",
      price: 12.99,
      image:
        "https://images.unsplash.com/photo-1646753522408-077ef9839300?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwcm9maWxlLXBhZ2V8NjZ8fHxlbnwwfHx8fA%3D%3D&auto=format&fit=crop&w=500&q=60",
    },
    {
      id: 6,
      name: "Anti-Fatigue Mat",
      quantity: 17,
      description: "For Standing Comfort",
      price: 49.99,
      image:
        "https://images.unsplash.com/photo-1651950519238-15835722f8bb?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwcm9maWxlLXBhZ2V8Mjh8fHxlbnwwfHx8fA%3D%3D&auto=format&fit=crop&w=500&q=60",
    },
    {
      id: 7,
      name: "Moisturizing Foot Mask",
      quantity: 13,
      description: "Deep Hydration",
      price: 15.99,
      image:
        "https://images.unsplash.com/photo-1646753522408-077ef9839300?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwcm9maWxlLXBhZ2V8NjZ8fHxlbnwwfHx8fA%3D%3D&auto=format&fit=crop&w=500&q=60",
    },
    {
      id: 8,
      name: "Plantar Fasciitis Night Splint",
      quantity: 18,
      description: "Pain Relief & Recovery",
      price: 39.99,
      image:
        "https://images.unsplash.com/photo-1651950519238-15835722f8bb?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwcm9maWxlLXBhZ2V8Mjh8fHxlbnwwfHx8fA%3D%3D&auto=format&fit=crop&w=500&q=60",
    },
    {
      id: 9,
      name: "Foot Scrubber",
      quantity: 19,
      description: "Exfoliates & Cleans",
      price: 9.99,
      image:
        "https://images.unsplash.com/photo-1646753522408-077ef9839300?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwcm9maWxlLXBhZ2V8NjZ8fHxlbnwwfHx8fA%3D%3D&auto=format&fit=crop&w=500&q=60",
    },
    {
      id: 10,
      name: "Electric Callus Remover",
      quantity: 187,
      description: "Soft & Smooth Feet",
      price: 24.99,
      image:
        "https://images.unsplash.com/photo-1651950519238-15835722f8bb?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwcm9maWxlLXBhZ2V8Mjh8fHxlbnwwfHx8fA%3D%3D&auto=format&fit=crop&w=500&q=60",
    },
    {
      id: 11,
      name: "Foot Warmer",
      quantity: 17,
      description: "Keeps Feet Cozy",
      price: 59.99,
      image:
        "https://images.unsplash.com/photo-1646753522408-077ef9839300?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwcm9maWxlLXBhZ2V8NjZ8fHxlbnwwfHx8fA%3D%3D&auto=format&fit=crop&w=500&q=60",
    },
    {
      id: 12,
      name: "Detox Foot Pads",
      quantity: 17,
      description: "Removes Toxins Overnight",
      price: 22.99,
      image:
        "https://images.unsplash.com/photo-1651950519238-15835722f8bb?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwcm9maWxlLXBhZ2V8Mjh8fHxlbnwwfHx8fA%3D%3D&auto=format&fit=crop&w=500&q=60",
    },
  ];
  return (
    <div className="max-w-7xl mx-auto px-4">
      {/* Section Title */}
      <SectionTitle title="Menu" description="Explore our delicious cafeteria menu" />

      <div className="relative px-4">
        {/* Carousel */}
        <Carousel>
          {/* Next & Previous Buttons */}
          <CarouselPrevious className="absolute left-[-15px] md:left-[-20px] top-1/2 transform -translate-y-1/2 z-10" />
          <CarouselNext className="absolute right-[-15px] md:right-[-20px] top-1/2 transform -translate-y-1/2 z-10" />

          {/* Carousel Content */}
          <CarouselContent>
            {products.map((item) => (
              <CarouselItem
                key={item.id}
                className="sm:basis-full md:basis-1/2 lg:basis-1/3"
              >
                <MenuCard product={item} />
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </div>
    </div>
  );
};

export default CafeteriaMenu;
