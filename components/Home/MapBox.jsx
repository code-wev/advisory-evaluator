"use client";

import dynamic from "next/dynamic";
import "leaflet/dist/leaflet.css";
import { useEffect } from "react";

// Fully client-side Leaflet map
const MapWithNoSSR = dynamic(
  () =>
    import("react-leaflet").then((L) => {
      const { MapContainer, TileLayer, useMapEvents } = L;

      function MapClickHandler({ onLocationSelect }) {
        useMapEvents({
          click: async (e) => {
            const { lat, lng } = e.latlng;

            try {
              const res = await fetch(
                `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`
              );
              const data = await res.json();

              if (!data?.address) return;

              const address = data.address || {};

              const location =
                address.city ||
                address.town ||
                address.village ||
                address.state_code ||
                address.state ||
                address.postcode;

              if (location && onLocationSelect) {
                onLocationSelect(location);
              }
            } catch (err) {
              console.error("Reverse geocoding failed", err);
            }
          },
        });

        return null;
      }

      return function MapBoxInner({ onLocationSelect }) {
        return (
          <div className="w-full h-full">
            <MapContainer
              center={[40.7128, -74.006]}
              zoom={12}
              scrollWheelZoom={true}
              attributionControl={false}
              className="w-full h-full"
            >
              <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

              {/* 🔥 CLICK HANDLER */}
              <MapClickHandler onLocationSelect={onLocationSelect} />
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

export default function MapBox({ onLocationSelect }) {
  return (
    <div className="w-full h-full">
      <MapWithNoSSR onLocationSelect={onLocationSelect} />
    </div>
  );
}
