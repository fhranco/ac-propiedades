"use client";
import React, { useState } from "react";

const ProperytyDescriptions = ({ data }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const fullDescription = data?.description || "";
  
  if (!fullDescription) return null;

  // Límite de caracteres para colapsar (aproximadamente 3-4 líneas)
  const textLimit = 350;
  const isLongDescription = fullDescription.length > textLimit;

  // Formatear saltos de línea para renderizar párrafos correctamente
  const formattedText = fullDescription.split("\n").map((paragraph, index) => (
    <p key={index} className="text mb15" style={{ fontSize: "15px", lineHeight: "1.7", color: "#4b5563" }}>
      {paragraph}
    </p>
  ));

  return (
    <div className="col-12 mt10">
      <div 
        style={{
          position: "relative",
          maxHeight: isExpanded ? "none" : (isLongDescription ? "140px" : "none"),
          overflow: "hidden",
          transition: "max-height 0.3s ease"
        }}
      >
        {formattedText}

        {/* Efecto de desvanecimiento cobrizo/translúcido si está colapsado */}
        {isLongDescription && !isExpanded && (
          <div 
            style={{
              position: "absolute",
              bottom: 0,
              left: 0,
              width: "100%",
              height: "60px",
              background: "linear-gradient(to top, rgba(255,255,255,1), rgba(255,255,255,0))"
            }}
          />
        )}
      </div>

      {/* Botón interactivo de expansión */}
      {isLongDescription && (
        <div style={{ marginTop: "10px" }}>
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            style={{
              background: "none",
              border: "none",
              color: "#eb6753",
              fontWeight: "600",
              fontSize: "14px",
              padding: "0",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              gap: "6px",
              transition: "color 0.2s"
            }}
            onMouseOver={(e) => e.currentTarget.style.color = "#d9533f"}
            onMouseOut={(e) => e.currentTarget.style.color = "#eb6753"}
          >
            {isExpanded ? (
              <>
                Mostrar menos <i className="fas fa-chevron-up fz11" />
              </>
            ) : (
              <>
                Mostrar más <i className="fas fa-chevron-down fz11" />
              </>
            )}
          </button>
        </div>
      )}
    </div>
  );
};

export default ProperytyDescriptions;
