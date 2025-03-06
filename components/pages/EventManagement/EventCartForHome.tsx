import Image from "next/image";
import Link from "next/link";

type AdventureCardProps = {
    image: string;
    date: string;
    title: string;
    description: string;
    link?: string;
};

const EventCartForHome: React.FC<AdventureCardProps> = ({ image, date, title, description }) => {
    return (
        <div className="relative shadow-md rounded-lg overflow-hidden">
            <div className="block overflow-hidden group shadow-lg">
                <Image
                    src={image}
                    alt={title}
                    width={1000}
                    height={1000}
                    className="object-cover w-full h-56 transition-all duration-300 ease-out sm:h-64 group-hover:scale-110"
                />
            </div>
            <div className="relative mt-5 px-4 pb-4">
                <p className="capitalize font-semibold text-xs mb-2.5">Event Date: {date}</p>
                <div className="block mb-3 hover:underline">
                    <h2 className="text-2xl font-bold primary-color leading-5 text-black dark:text-white transition-colors duration-200 ">
                        {title}
                    </h2>
                </div>
                <p className="mb-4 text-gray-700 dark:text-gray-300">{description}</p>
                <Link href={'/event'} className="font-medium underline hover:no-underline ">
                    Read More
                </Link>
            </div>
        </div>
    );
};

export default EventCartForHome;
