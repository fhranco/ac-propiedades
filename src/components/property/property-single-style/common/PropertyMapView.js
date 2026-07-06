"use client";
import React, { useEffect, useRef } from "react";
import "leaflet/dist/leaflet.css";

const PropertyMapView = ({ latitude, longitude, address }) => {
  const mapContainerRef = useRef(null);
  const mapInstanceRef = useRef(null);

  // Coordenadas por defecto: Punta Arenas
  const lat = latitude ? parseFloat(latitude) : -53.1626;
  const lng = longitude ? parseFloat(longitude) : -70.9078;

  useEffect(() => {
    if (typeof window === "undefined" || !mapContainerRef.current) return;

    let observer = null;

    const initMap = async () => {
      const L = (await import("leaflet")).default;

      // Fix rutas de iconos webpack
      delete L.Icon.Default.prototype._getIconUrl;
      L.Icon.Default.mergeOptions({
        iconUrl: "/images/icon/ac-map-pin.svg",
        iconRetinaUrl: "/images/icon/ac-map-pin.svg",
        shadowUrl: "",
      });

      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }

      const map = L.map(mapContainerRef.current, {
        center: [lat, lng],
        zoom: 15,
        zoomControl: true,
        scrollWheelZoom: false, // No hacer zoom con scroll en la página
      });
      mapInstanceRef.current = map;

      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        maxZoom: 19,
      }).addTo(map);

      // Ícono AC Propiedades
      const customIcon = L.icon({
        iconUrl: "/images/icon/ac-map-pin.svg",
        iconSize: [56, 68],
        iconAnchor: [28, 68],
        popupAnchor: [0, -68],
        shadowUrl: "",
        shadowSize: [0, 0],
      });

      // Marcador con popup de dirección
      const marker = L.marker([lat, lng], { icon: customIcon }).addTo(map);
      if (address) {
        marker
          .bindPopup(
            `<div style="font-family: sans-serif; font-size: 13px; font-weight: 600; color: #1d293f; max-width: 200px;">
              <i style="color:#eb6753;" class="fas fa-map-marker-alt"></i>
              ${address}
            </div>`,
            { maxWidth: 220 }
          )
          .openPopup();
      }

      // ResizeObserver para invalidar cuando el contenedor sea visible
      observer = new ResizeObserver((entries) => {
        for (const entry of entries) {
          const { width, height } = entry.contentRect;
          if (width > 0 && height > 0) {
            map.invalidateSize();
          }
        }
      });
      observer.observe(mapContainerRef.current);
      map.invalidateSize();
    };

    initMap();

    return () => {
      if (observer) observer.disconnect();
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, [lat, lng]);

  return (
    <div
      ref={mapContainerRef}
      style={{
        width: "100%",
        height: "340px",
        borderRadius: "12px",
        border: "1px solid #e2e8f0",
        boxShadow: "0 4px 6px -1px rgba(0,0,0,0.05)",
        overflow: "hidden",
      }}
    />
  );
};

export default PropertyMapView;
