"use client";

import dynamic from "next/dynamic";
import "leaflet/dist/leaflet.css";
import BusSchedulesTable from "./BusSchedulesTable";
import { LatLngExpression } from "leaflet";


// ✅ Dynamically import MapContainer and related Leaflet components (to fix SSR issue)
const MapContainer = dynamic(() => import("react-leaflet").then((mod) => mod.MapContainer), { ssr: false });
const TileLayer = dynamic(() => import("react-leaflet").then((mod) => mod.TileLayer), { ssr: false });
const Marker = dynamic(() => import("react-leaflet").then((mod) => mod.Marker), { ssr: false });
const Popup = dynamic(() => import("react-leaflet").then((mod) => mod.Popup), { ssr: false });

const busLocations = [
  { id: 1, name: "Bus 1", lat: 40.712776, lng: -74.005974 },
  { id: 2, name: "Bus 2", lat: 40.715, lng: -74.002 },
];

// ✅ Define center using LatLngExpression type
const center: LatLngExpression = [40.712776, -74.005974];

const BusSchedules = () => {
  return (
    <div className="max-w-5xl mx-auto p-6 bg-white shadow-lg rounded-lg mt-6">
      <h2 className="text-xl font-bold mb-4">Real-Time Bus Tracking</h2>

      {/* ✅ Fixes the Next.js SSR issue */}
      <MapContainer 
       center={center} 
        zoom={13} 
        style={{ height: "400px", width: "100%" }} // ✅ Ensures the map renders correctly
        className="rounded-md"
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        {busLocations.map((bus) => (
          <Marker key={bus.id} position={[bus.lat, bus.lng]}>
            <Popup>{bus.name}</Popup>
          </Marker>
        ))}
      </MapContainer>

      <BusSchedulesTable />
    </div>
  );
};

export default BusSchedules;
