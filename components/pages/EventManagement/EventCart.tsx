
import Image from "next/image";

// types/event.ts
export type Event = {
    name: string;
    date: string;
    time: string;
    location: string;
    description: string;
    organizer: {
        name: string;
        contact: string;
    };
    targetAudience: string[];
    registrationDeadline: string;
    image: string;
    speakers: { name: string; topic: string }[];
    status: "active" | "upcoming" | "completed";
};

type EventCardProps = {
    event: Event;
};

const EventCard: React.FC<EventCardProps> = ({ event }) => {
    return (
        <div className="bg-[#1E293B] shadow rounded overflow-hidden flex flex-col lg:flex-row mb-10">
            {/* Image Section */}
            <div className="w-full lg:w-[30%] h-[370px] overflow-hidden">
                <Image
                    src={event.image}
                    alt={event.name}
                    width={1000}
                    height={1000}
                    className="w-full h-full object-cover hover:scale-110 transition"
                />
            </div>

            {/* Content Section */}
            <div className="w-full lg:w-[70%] p-6">
                <h2 className="text-2xl font-bold text-white">{event.name}</h2>
                <p className="text-sm text-gray-400 mt-2">{event.description}</p>

                <div className="flex flex-col lg:flex-row justify-between mt-4">
                    <div className="w-full lg:w-[50%]">
                        {/* Event Date and Time */}
                        <div className="mt-4 text-gray-300/90">
                            <p><strong>Date:</strong> {event.date}</p>
                            <p><strong>Time:</strong> {event.time}</p>
                        </div>

                        {/* Event Location */}
                        <div className="mt-4 text-gray-300/90">
                            <p><strong>Location:</strong> {event.location}</p>
                        </div>

                        {/* Registration Deadline */}
                        <div className="mt-4 text-gray-300/90">
                            <p><strong>Registration Deadline:</strong> {event.registrationDeadline}</p>
                        </div>

                        {/* Target Audience */}
                        <div className="mt-4 text-gray-300/90">
                            <strong>Target Audience:</strong>
                            <ul>
                                {event.targetAudience.map((audience, index) => (
                                    <li key={index}>{audience}</li>
                                ))}
                            </ul>
                        </div>
                    </div>

                    <div className="w-full lg:w-[50%] mt-4 lg:mt-0">
                        {/* Organizer Details */}
                        <div className="mt-4 text-gray-300/90">
                            <strong>Organizer:</strong>
                            <p>{event.organizer.name}</p>
                            <p>Contact: {event.organizer.contact}</p>
                        </div>

                        {/* Speakers List */}
                        <div className="mt-4 text-gray-300/90">
                            <strong>Speakers:</strong>
                            <ul>
                                {event.speakers.map((speaker, index) => (
                                    <li key={index}>
                                        {speaker.name} - {speaker.topic}
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Event Status */}
                        <div className="mt-4">
                            <p className={`font-semibold ${event.status === 'active' ? 'text-teal-300' : 'text-gray-400'}`}>
                                Status: {event.status}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EventCard;
