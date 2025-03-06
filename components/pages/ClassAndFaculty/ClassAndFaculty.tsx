
"use client";


import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

interface ClassSchedule {
  day: string;
  time: string;
  courseCode: string;
  courseName: string;
  faculty: string;
  roomNo: string;
  notification: string;
}

const classRoutine: ClassSchedule[] = [
  {
    day: "Monday",
    time: "9:00 AM - 10:30 AM",
    courseCode: "CSE 101",
    courseName: "Introduction to Programming",
    faculty: "Dr. John Doe",
    roomNo: "Room 302",
    notification: "✅ Reminder 10 min before",
  },
  {
    day: "Monday",
    time: "11:00 AM - 12:30 PM",
    courseCode: "MAT 201",
    courseName: "Calculus & Linear Algebra",
    faculty: "Prof. Alice Smith",
    roomNo: "Room 210",
    notification: "✅ Reminder 10 min before",
  },
  {
    day: "Tuesday",
    time: "10:00 AM - 11:30 AM",
    courseCode: "PHY 101",
    courseName: "General Physics",
    faculty: "Dr. Robert Brown",
    roomNo: "Room 105",
    notification: "✅ Reminder 10 min before",
  },
  {
    day: "Wednesday",
    time: "9:00 AM - 10:30 AM",
    courseCode: "ENG 103",
    courseName: "English Composition",
    faculty: "Prof. Sarah Lee",
    roomNo: "Room 501",
    notification: "✅ Reminder 10 min before",
  },
  {
    day: "Thursday",
    time: "2:00 PM - 3:30 PM",
    courseCode: "CSE 102",
    courseName: "Data Structures",
    faculty: "Dr. William Clark",
    roomNo: "Room 320",
    notification: "✅ Reminder 10 min before",
  },
  {
    day: "Friday",
    time: "3:00 PM - 4:30 PM",
    courseCode: "CSE 105",
    courseName: "Web Development",
    faculty: "Prof. Jane Miller",
    roomNo: "Lab 112",
    notification: "✅ Reminder 10 min before",
  },
];

const ClassAndFaculty = () => {
  return (
    <div className="max-w-5xl mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h1 className="text-2xl font-bold mb-4">Class Routine</h1>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Day</TableHead>
            <TableHead>Time</TableHead>
            <TableHead>Course Code</TableHead>
            <TableHead>Course Name</TableHead>
            <TableHead>Faculty</TableHead>
            <TableHead>Room</TableHead>
            <TableHead>Notification</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {classRoutine.map((schedule, index) => (
            <TableRow key={index} className="hover:bg-gray-100">
              <TableCell>{schedule.day}</TableCell>
              <TableCell>{schedule.time}</TableCell>
              <TableCell>{schedule.courseCode}</TableCell>
              <TableCell>{schedule.courseName}</TableCell>
              <TableCell>{schedule.faculty}</TableCell>
              <TableCell>{schedule.roomNo}</TableCell>
              <TableCell className="text-green-600">{schedule.notification}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default ClassAndFaculty;
