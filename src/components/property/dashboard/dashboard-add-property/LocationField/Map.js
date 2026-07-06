"use client";
import "leaflet/dist/leaflet.css";
import React, { useEffect, useRef } from "react";

const Map = ({ lat, lng }) => {
  const mapContainerRef = useRef(null);
  const mapInstanceRef = useRef(null);

  useEffect(() => {
    if (typeof window === "undefined") return;

    let observer = null;

    const initMap = async () => {
      const L = (await import("leaflet")).default;

      // Corregir rutas de iconos (problema con webpack/Next.js)
      delete L.Icon.Default.prototype._getIconUrl;
      L.Icon.Default.mergeOptions({
        iconUrl: "/images/icon/ac-map-pin.svg",
        iconRetinaUrl: "/images/icon/ac-map-pin.svg",
        shadowUrl: "",
      });

      const defaultLat = -53.1626;
      const defaultLng = -70.9078;

      const latInput = document.querySelector('input[name="lat"]');
      const lngInput = document.querySelector('input[name="lng"]');

      const initialLat =
        lat !== undefined && lat !== null && !isNaN(parseFloat(lat))
          ? parseFloat(lat)
          : (latInput && latInput.value ? parseFloat(latInput.value) : defaultLat);
      const initialLng =
        lng !== undefined && lng !== null && !isNaN(parseFloat(lng))
          ? parseFloat(lng)
          : (lngInput && lngInput.value ? parseFloat(lngInput.value) : defaultLng);

      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }

      const map = L.map(mapContainerRef.current, {
        center: [initialLat, initialLng],
        zoom: 14,
        zoomControl: true,
      });
      mapInstanceRef.current = map;

      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        maxZoom: 19,
      }).addTo(map);

      // ResizeObserver: detecta cuando el contenedor pasa de 0 a tener dimensiones reales
      // Esto resuelve el "área gris" cuando el mapa está dentro de un tab oculto
      observer = new ResizeObserver((entries) => {
        for (const entry of entries) {
          const { width, height } = entry.contentRect;
          if (width > 0 && height > 0 && mapInstanceRef.current) {
            try {
              map.invalidateSize();
            } catch (e) {
              console.warn("ResizeObserver map.invalidateSize error:", e);
            }
          }
        }
      });
      observer.observe(mapContainerRef.current);

      // También llamar una vez directamente
      map.invalidateSize();

      // Icono personalizado AC Propiedades
      const customIcon = L.icon({
        iconUrl: "/images/icon/ac-map-pin.svg",
        iconSize: [48, 58],
        iconAnchor: [24, 58],
        popupAnchor: [0, -58],
        shadowUrl: "",
        shadowSize: [0, 0],
      });

      const marker = L.marker([initialLat, initialLng], {
        icon: customIcon,
        draggable: true,
      }).addTo(map);

      // Helper: actualiza inputs de forma que FormData y React lo detecten
      const setInputValue = (input, value) => {
        if (!input) return;
        const nativeInputValueSetter = Object.getOwnPropertyDescriptor(
          window.HTMLInputElement.prototype,
          "value"
        ).set;
        nativeInputValueSetter.call(input, String(value));
        input.dispatchEvent(new Event("input", { bubbles: true }));
        input.dispatchEvent(new Event("change", { bubbles: true }));
      };

      const updateInputs = (lat, lng) => {
        // Buscar inputs en el momento del evento (no en el init)
        const currentLatInput = document.querySelector('input[name="lat"]');
        const currentLngInput = document.querySelector('input[name="lng"]');
        setInputValue(currentLatInput, lat.toFixed(6));
        setInputValue(currentLngInput, lng.toFixed(6));
      };

      // Inicializar con coordenadas por defecto si los campos están vacíos
      const currentLatInput = document.querySelector('input[name="lat"]');
      if (!currentLatInput || !currentLatInput.value) {
        updateInputs(initialLat, initialLng);
      }

      marker.on("dragend", () => {
        const position = marker.getLatLng();
        updateInputs(position.lat, position.lng);
      });

      map.on("click", (e) => {
        const { lat, lng } = e.latlng;
        marker.setLatLng([lat, lng]);
        updateInputs(lat, lng);
      });

      // Geocodificación automática al escribir dirección
      const addressInput = document.querySelector('input[name="address"]');
      let searchTimeout;

      if (addressInput) {
        const geocodeAddress = async () => {
          const address = addressInput.value;
          if (!address || address.length < 5) return;
          try {
            const query = encodeURIComponent(
              `${address}, Punta Arenas, Chile`
            );
            const res = await fetch(
              `https://nominatim.openstreetmap.org/search?format=json&q=${query}&limit=1`
            );
            const results = await res.json();
            if (results && results.length > 0) {
              const { lat, lon } = results[0];
              const parsedLat = parseFloat(lat);
              const parsedLng = parseFloat(lon);
              map.setView([parsedLat, parsedLng], 15);
              marker.setLatLng([parsedLat, parsedLng]);
              updateInputs(parsedLat, parsedLng);
            }
          } catch (err) {
            console.warn("Geocodificación fallida:", err);
          }
        };

        addressInput.addEventListener("input", () => {
          clearTimeout(searchTimeout);
          searchTimeout = setTimeout(geocodeAddress, 1500);
        });
      }
    };

    initMap();

    return () => {
      if (observer) {
        observer.disconnect();
        observer = null;
      }
      if (mapInstanceRef.current) {
        try {
          mapInstanceRef.current.remove();
        } catch (e) {
          console.warn("Map remove error:", e);
        }
        mapInstanceRef.current = null;
      }
    };
  }, [lat, lng]);

  return (
    <div
      ref={mapContainerRef}
      style={{
        width: "100%",
        height: "400px",
        borderRadius: "12px",
        border: "1px solid #e9e9e9",
        boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
        zIndex: 1,
        overflow: "hidden",
      }}
    />
  );
};

export default Map;
