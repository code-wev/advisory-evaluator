"use client";

import dynamic from "next/dynamic";
import "leaflet/dist/leaflet.css";

// Fully client-side, no attribution
const MapWithNoSSR = dynamic(
  () =>
    import("react-leaflet").then((L) => {
      const { MapContainer, TileLayer } = L;

      return function MapBoxInner() {
        return (
          <div className="w-full h-full">
            <MapContainer
              center={[40.7128, -74.0060]}   
              zoom={12}
              scrollWheelZoom={true}
              attributionControl={false}       
              className="w-full h-full"
            >
              <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              
              />
            </MapContainer>
          </div>
        );
      };
    }),
  {
    ssr: false,
    loading: () => (
      <div className="w-full h-full bg-gray-200 animate-pulse rounded-md"></div>
    ),
  }
);

export default function MapBox() {
  return (
    <div className="w-full h-full">
      <MapWithNoSSR />
    </div>
  );
}
