"use client";

import React from "react";

const VirtualTour360 = ({ data }) => {
  const tourUrl = data?.tour_360_url;

  // Si no hay un recorrido virtual 360° en la base de datos, no mostramos nada
  if (!tourUrl) return null;

  return (
    <div className="col-md-12 mt10">
      <div 
        style={{
          position: "relative",
          width: "100%",
          paddingTop: "56.25%", // Proporción de aspecto 16:9 widescreen
          borderRadius: "16px",
          overflow: "hidden",
          border: "1px solid #e5e7eb",
          boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.05), 0 4px 6px -4px rgba(0, 0, 0, 0.05)",
          backgroundColor: "#f3f4f6"
        }}
      >
        <iframe
          src={tourUrl}
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            border: "none"
          }}
          allowFullScreen
          allow="xr-spatial-tracking; gyroscope; accelerometer"
          loading="lazy"
          title="Recorrido Virtual 360° Interactivo"
        />
      </div>

      <div style={{ marginTop: "12px", textAlign: "right" }}>
        <a
          href={tourUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn-sm btn-outline-secondary"
          style={{
            fontSize: "13px",
            borderRadius: "8px",
            padding: "6px 14px",
            border: "1px solid #d1d5db",
            color: "#374151",
            backgroundColor: "#fff",
            fontWeight: "500",
            transition: "all 0.2s"
          }}
          onMouseOver={(e) => {
            e.currentTarget.style.backgroundColor = "#f9fafb";
            e.currentTarget.style.borderColor = "#9ca3af";
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.backgroundColor = "#fff";
            e.currentTarget.style.borderColor = "#d1d5db";
          }}
        >
          <i className="fas fa-expand me-2" />
          Pantalla Completa
        </a>
      </div>
    </div>
  );
};

export default VirtualTour360;
