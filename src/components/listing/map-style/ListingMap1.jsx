"use client";
import React, { useEffect, useState, useRef } from "react";

const ListingMap1 = ({ properties: propList }) => {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const mapContainerRef = useRef(null);
  const mapInstanceRef = useRef(null);

  // 1. Cargar las propiedades (desde props o fallback API de Supabase)
  useEffect(() => {
    if (propList) {
      setProperties(propList);
      setLoading(false);
      return;
    }

    const fetchProperties = async () => {
      try {
        const res = await fetch("/api/propiedades");
        if (res.ok) {
          const data = await res.json();
          setProperties(data);
        }
      } catch (err) {
        console.error("Error al cargar propiedades para el mapa:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchProperties();
  }, [propList]);

  // 2. Inicializar el Mapa de Leaflet con todos los marcadores
  useEffect(() => {
    if (loading || properties.length === 0) return;
    if (typeof window === "undefined") return;

    // Cargar estilos CSS de Leaflet si no están presentes
    if (!document.getElementById("leaflet-css")) {
      const link = document.createElement("link");
      link.id = "leaflet-css";
      link.rel = "stylesheet";
      link.href = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.css";
      document.head.appendChild(link);
    }

    const initMap = async () => {
      const L = (await import("leaflet")).default;

      // Centro por defecto: Punta Arenas
      const defaultCenter = [-53.1626, -70.9078];

      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
      }

      // Crear el mapa principal
      const map = L.map(mapContainerRef.current).setView(defaultCenter, 13, { animate: false });
      mapInstanceRef.current = map;

      // Capa premium minimalista de CartoDB (ligera y moderna)
      L.tileLayer("https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png", {
        attribution: '&copy; OpenStreetMap contributors &copy; CARTO',
        subdomains: 'abcd',
        maxZoom: 20
      }).addTo(map);

      // Pin personalizado con el ícono oficial de AC Propiedades
      const customIcon = L.icon({
        iconUrl: "/images/pin.AC.png",
        iconSize: [60, 60],
        iconAnchor: [30, 60],
        popupAnchor: [0, -62],
      });

      const bounds = [];

      // Colocar marcadores por cada propiedad de Supabase
      properties.forEach((property) => {
        const lat = parseFloat(property.latitude || property.lat);
        const lng = parseFloat(property.longitude || property.lng);

        if (!isNaN(lat) && !isNaN(lng)) {
          bounds.push([lat, lng]);

          // Extraer la primera imagen de la propiedad
          let coverImg = "/images/listings/list-1.jpg";
          if (property.images) {
            if (Array.isArray(property.images) && property.images.length > 0) {
              coverImg = property.images[0];
            } else if (typeof property.images === "string") {
              try {
                const arr = JSON.parse(property.images);
                if (arr.length > 0) coverImg = arr[0];
              } catch (e) {}
            }
          }

          // Crear marcador interactivo
          const marker = L.marker([lat, lng], { icon: customIcon }).addTo(map);

          // Formateo de precio modo Chile
          let formattedPrice = 'Precio a consultar';
          if (property.price) {
            const priceStr = String(property.price).trim().toUpperCase();
            if (priceStr.includes('UF')) {
              formattedPrice = priceStr; // Ej: "3.500 UF"
            } else {
              // Limpiamos todo lo que no sea número para convertir y formatear
              const numericPrice = Number(priceStr.replace(/[^0-9]/g, ''));
              if (!isNaN(numericPrice) && numericPrice > 0) {
                formattedPrice = '$' + numericPrice.toLocaleString('es-CL');
              } else {
                formattedPrice = '$' + priceStr; // Fallback
              }
            }
          }

          // Crear popup HTML interactivo de alta gama para el pin
          const popupHtml = `
            <div style="width: 260px; font-family: 'Inter', sans-serif;">
              <a href="/propiedades/${property.id}" style="text-decoration: none; color: inherit;">
                <div style="width: 100%; height: 140px; overflow: hidden; border-radius: 8px; position: relative;">
                  <img src="${coverImg}" style="width: 100%; height: 100%; object-fit: cover;" alt="${property.title}"/>
                  <span style="position: absolute; top: 8px; left: 8px; background: #eb6753; color: white; padding: 4px 10px; font-size: 11px; font-weight: 500; border-radius: 4px;">
                    ${property.category || "Casa"}
                  </span>
                </div>
                <div style="padding: 12px 2px 2px 2px;">
                  <h6 style="margin: 0 0 6px 0; font-size: 14px; font-weight: 500; line-height: 1.4; color: #1d293f;">
                    ${property.title}
                  </h6>
                  <p style="margin: 0 0 10px 0; font-size: 12px; color: #6b7280; font-weight: 400;">
                    <i class="fas fa-map-marker-alt" style="color: #eb6753; margin-right: 6px;"></i>${property.city || "Punta Arenas"}
                  </p>
                  <div style="display: flex; justify-content: space-between; align-items: center; border-top: 1px solid #f1f1f1; padding-top: 10px;">
                    <span style="font-size: 14px; font-weight: 500; color: #eb6753;">
                      ${formattedPrice}
                    </span>
                    <span style="font-size: 11px; color: #fff; background: #1d293f; padding: 4px 8px; border-radius: 4px; font-weight: 400;">
                      Ver ficha
                    </span>
                  </div>
                </div>
              </a>
            </div>
          `;

          marker.bindPopup(popupHtml);

          // Abrir popup automáticamente al pasar el ratón (hover)
          marker.on('mouseover', function (e) {
            this.openPopup();
          });
        }
      });

      // Se desactiva el auto-zoom para respetar la vista predeterminada
      // if (bounds.length > 0) {
      //   map.fitBounds(bounds, { padding: [50, 50], animate: false });
      // }
    };

    initMap();

    return () => {
      if (mapInstanceRef.current) {
        try {
          mapInstanceRef.current.remove();
        } catch (e) {}
        mapInstanceRef.current = null;
      }
    };
  }, [loading, properties]);

  if (loading) {
    return (
      <div className="d-flex flex-column align-items-center justify-content-center" style={{ height: "100%", minHeight: "500px", background: "#f7f7f7" }}>
        <div className="spinner-border text-thm" role="status">
          <span className="visually-hidden">Cargando mapa...</span>
        </div>
        <p className="text mt15">Cargando mapa de propiedades...</p>
      </div>
    );
  }

  if (properties.length === 0) {
    return (
      <div className="d-flex flex-column align-items-center justify-content-center text-center p50" style={{ height: "100%", minHeight: "500px", background: "#f7f7f7" }}>
        <h5 className="title">No hay propiedades geolocalizadas aún</h5>
        <p className="text">Registra propiedades con latitud y longitud en el panel para visualizarlas en el mapa.</p>
      </div>
    );
  }

  return (
    <div 
      ref={mapContainerRef} 
      className="w-100 h-100" 
      style={{ 
        minHeight: "500px", 
        borderLeft: "1px solid #e9e9e9",
        zIndex: 1
      }} 
    />
  );
};

export default ListingMap1;
