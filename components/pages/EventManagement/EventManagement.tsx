import React from 'react'
import EventCard from './EventCart';


// Define the types for speaker and organizer
type Speaker = {
  name: string;
  topic: string;
};

type Organizer = {
  name: string;
  contact: string;
};

// Define the main Event type
type Event = {
  name: string;
  date: string; // Format YYYY-MM-DD
  time: string; // Format HH:MM AM/PM
  location: string;
  description: string;
  organizer: Organizer;
  targetAudience: string[]; // Array of strings (e.g., ["Students", "Faculty"])
  registrationDeadline: string; // Format YYYY-MM-DD
  image: string; // Image URL
  speakers: Speaker[]; // Array of speaker objects
  status: "active" | "upcoming"; // Event status type (can only be "active" or "upcoming")
};

// Define the array of events
const events: Event[] = [
  {
    name: "Tech Conference 2025",
    date: "2025-04-15",
    time: "10:00 AM",
    location: "University Auditorium",
    description: "A conference on emerging tech trends and innovations.",
    organizer: {
      name: "John Doe",
      contact: "+1234567890",
    },
    targetAudience: ["Students", "Faculty"],
    registrationDeadline: "2025-04-10",
    image: "https://plus.unsplash.com/premium_photo-1683120966127-14162cdd0935?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8dGVjaG5vbG9neXxlbnwwfHwwfHx8MA%3D%3D",
    speakers: [
      { name: "Dr. Jane Smith", topic: "Artificial Intelligence" },
      { name: "Dr. John Lee", topic: "Blockchain Technology" },
    ],
    status: "active",
  },
  {
    name: "Sports Day 2025",
    date: "2025-05-10",
    time: "09:00 AM",
    location: "University Playground",
    description: "The annual sports competition for students.",
    organizer: {
      name: "Sports Committee",
      contact: "+9876543210",
    },
    targetAudience: ["Students"],
    registrationDeadline: "2025-05-05",
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8dGVjaG5vbG9neXxlbnwwfHwwfHx8MA%3D%3D",
    speakers: [],
    status: "active",
  },
  {
    name: "Annual Art Exhibition",
    date: "2025-06-20",
    time: "5:00 PM",
    location: "University Art Gallery",
    description: "A showcase of artwork created by students and faculty.",
    organizer: {
      name: "Art Department",
      contact: "+1122334455",
    },
    targetAudience: ["Students", "Faculty", "Art Enthusiasts"],
    registrationDeadline: "2025-06-15",
    image: "https://plus.unsplash.com/premium_photo-1681426687411-21986b0626a8?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8dGVjaG5vbG9neXxlbnwwfHwwfHx8MA%3D%3D",
    speakers: [],
    status: "active",
  },
  {
    name: "University Talent Show",
    date: "2025-07-05",
    time: "7:00 PM",
    location: "University Auditorium",
    description: "An exciting showcase of student talent, from music to drama.",
    organizer: {
      name: "Student Union",
      contact: "+2233445566",
    },
    targetAudience: ["Students"],
    registrationDeadline: "2025-06-30",
    image: "https://images.unsplash.com/photo-1496171367470-9ed9a91ea931?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjB8fHRlY2hub2xvZ3l8ZW58MHx8MHx8fDA%3D",
    speakers: [],
    status: "upcoming",
  },
];


const EventManagement = () => {


  return (
    <>

      {events.map((event, index) => (
        <EventCard key={index} event={event} />
      ))}

    </>
  )
}

export default EventManagement