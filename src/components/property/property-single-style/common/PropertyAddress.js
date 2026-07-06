"use client";

import React from "react";
import dynamic from "next/dynamic";

// Carga dinámica del mapa para evitar SSR issues con Leaflet
const PropertyMapView = dynamic(() => import("./PropertyMapView"), {
  ssr: false,
  loading: () => (
    <div
      style={{
        width: "100%",
        height: "340px",
        borderRadius: "12px",
        border: "1px solid #e2e8f0",
        background: "#f8fafc",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: "#9ca3af",
        fontSize: "14px",
      }}
    >
      Cargando mapa...
    </div>
  ),
});

const PropertyAddress = ({ data }) => {
  if (!data) return null;

  const address = data.address || "Dirección no especificada";
  const city = data.city || "Punta Arenas";
  const region = data.region || "Magallanes y la Antártica Chilena";
  const country = "Chile";

  const openStreetMapUrl = data.lat && data.lng
    ? `https://www.openstreetmap.org/?mlat=${data.lat}&mlon=${data.lng}#map=16/${data.lat}/${data.lng}`
    : `https://www.openstreetmap.org/search?query=${encodeURIComponent(`${address}, ${city}, ${region}`)}`;

  const addressDetails = [
    { label: "Dirección", value: address },
    { label: "Ciudad", value: city },
    { label: "Región", value: region },
  ];

  return (
    <div className="col-12 mt10">
      {/* Grid de Direcciones */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
          gap: "15px 30px",
          marginBottom: "25px",
        }}
      >
        {addressDetails.map((item, index) => (
          <div
            key={index}
            className="d-flex justify-content-between align-items-center"
            style={{
              borderBottom: "1px solid #f1f1f1",
              paddingBottom: "8px",
            }}
          >
            <span
              className="ff-heading dark-color"
              style={{
                fontWeight: "600",
                fontSize: "14px",
                color: "#1d293f",
              }}
            >
              {item.label}
            </span>
            <span
              style={{
                fontSize: "14px",
                color: "#6b7280",
                textAlign: "right",
                paddingLeft: "15px",
              }}
            >
              {item.value}
            </span>
          </div>
        ))}
      </div>

      {/* Mapa interactivo Leaflet con ícono AC Propiedades */}
      <PropertyMapView
        latitude={data.lat}
        longitude={data.lng}
        address={address}
      />

      {/* Enlace a Google Maps */}
      <div style={{ marginTop: "12px", textAlign: "right" }}>
        <a
          href={openStreetMapUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn-sm btn-outline-secondary"
          style={{
            fontSize: "13px",
            borderRadius: "8px",
            padding: "6px 12px",
            border: "1px solid #d1d5db",
            color: "#4b5563",
            backgroundColor: "#f9fafb",
            transition: "all 0.2s",
          }}
        >
          <i className="fas fa-map-marked-alt me-2" />
          Abrir en Mapa
        </a>
      </div>
    </div>
  );
};

export default PropertyAddress;
