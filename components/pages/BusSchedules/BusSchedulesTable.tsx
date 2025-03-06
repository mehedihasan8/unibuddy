
"use client";

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

interface BusSchedule {
  route: string;
  departureTime: string;
  arrivalTime: string;
  busStop: string;
  status: string;
}

const busSchedules: BusSchedule[] = [
  {
    route: "Route 1",
    departureTime: "7:30 AM",
    arrivalTime: "8:00 AM",
    busStop: "Main Gate",
    status: "On Time",
  },
  {
    route: "Route 2",
    departureTime: "8:15 AM",
    arrivalTime: "8:45 AM",
    busStop: "Library Stop",
    status: "Delayed",
  },
  {
    route: "Route 3",
    departureTime: "9:00 AM",
    arrivalTime: "9:30 AM",
    busStop: "Engineering Block",
    status: "On Time",
  },
  {
    route: "Route 4",
    departureTime: "10:00 AM",
    arrivalTime: "10:30 AM",
    busStop: "Science Block",
    status: "Delayed",
  },
];

const BusSchedulesTable = () => {
  return (
    <div className="max-w-5xl mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h1 className="text-2xl font-bold mb-4">University Bus Schedules</h1>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Route</TableHead>
            <TableHead>Departure</TableHead>
            <TableHead>Arrival</TableHead>
            <TableHead>Bus Stop</TableHead>
            <TableHead>Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {busSchedules.map((bus, index) => (
            <TableRow key={index} className="hover:bg-gray-100">
              <TableCell>{bus.route}</TableCell>
              <TableCell>{bus.departureTime}</TableCell>
              <TableCell>{bus.arrivalTime}</TableCell>
              <TableCell>{bus.busStop}</TableCell>
              <TableCell className={bus.status === "Delayed" ? "text-red-600" : "text-green-600"}>
                {bus.status}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default BusSchedulesTable;
