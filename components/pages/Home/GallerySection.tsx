import SectionTitle from "@/components/shared/SectionTitle/SectionTitle";
import Image from "next/image";

const images = [
    "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    "https://images.unsplash.com/photo-1501854140801-50d01698950b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    "https://images.unsplash.com/photo-1469474968028-56623f02e42e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    "https://images.unsplash.com/photo-1505765050516-f72dcac9c60e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    "https://images.unsplash.com/photo-1475924156734-496f6cac6ec1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    "https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    "https://images.unsplash.com/photo-1426604966848-d7adac402bff?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
];

const Gallery = () => {
    return (
        <div className="p-4 my-16 max-w-7xl mx-auto pb-16">
            <SectionTitle title="A Peek Into Our World" description="Our gallery brings together the beauty of life’s most cherished moments. Enjoy the visual experience and get inspired!" />
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {images.map((src, index) => (
                    <div key={index} className="group cursor-pointer relative">
                        <Image
                            src={src}
                            alt={`Gallery Image ${index + 1}`}
                            width={500}
                            height={500}
                            className="w-full h-48 object-cover rounded-lg transition-transform transform scale-100 group-hover:scale-105"
                        />

                    </div>
                ))}
            </div>
        </div>
    );
};

export default Gallery;
