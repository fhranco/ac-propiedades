"use client";
import Image from "next/image";
import React, { useState, useEffect } from "react";

const ContactWithAgent = ({ propiedadId, propiedadTitulo, agentId }) => {
  const [agent, setAgent] = useState(null);
  const [loading, setLoading] = useState(true);

  // Teléfono fallback si no se obtiene de la base de datos
  const fallbackPhone = "56984152100";

  useEffect(() => {
    if (agentId) {
      // Buscar información del agente desde la API
      fetch("/api/agentes")
        .then((r) => r.json())
        .then((agents) => {
          const matched = agents.find((a) => String(a.id) === String(agentId));
          if (matched) {
            setAgent(matched);
          }
          setLoading(false);
        })
        .catch(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, [agentId]);

  const agentPhone = agent?.phone_number 
    ? agent.phone_number.replace(/[^0-9]/g, "") 
    : fallbackPhone;

  const agentName = agent 
    ? `${agent.first_name || ""} ${agent.last_name || ""}` 
    : "Soporte AC Propiedades";

  const agentPosition = agent?.position || "Corredor de Propiedades";
  let agentImage = agent?.image || "/images/Logo.png";
  if (
    !agent?.image ||
    agentImage.includes("210") ||
    agentImage.includes("placeholder") ||
    agentImage.includes("user.png")
  ) {
    agentImage = "/images/Logo.png";
  }

  const handleWhatsAppClick = async (e) => {
    e.preventDefault();
    if (propiedadId) {
      try {
        await fetch("/api/mensajes", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ propiedadId }),
        });
      } catch (err) {
        console.error("Error al registrar contacto:", err);
      }
    }

    const mensaje = encodeURIComponent(
      `Hola ${agentName}, me interesa recibir más detalles de la propiedad "${propiedadTitulo || "Sin título"}" (ID: ${propiedadId || "N/A"}).`
    );
    const waUrl = `https://wa.me/${agentPhone}?text=${mensaje}`;
    
    if (typeof window !== "undefined") {
      window.open(waUrl, "_blank");
    }
  };

  return (
    <>
      <div className="agent-single d-sm-flex align-items-center pb25">
        <div className="single-img mb30-sm" style={{ position: "relative", width: "90px", height: "90px" }}>
          <Image
            width={90}
            height={90}
            className="w90 bdrs12 cover"
            src={agentImage}
            alt={agentName}
            style={{ width: "100%", height: "100%" }}
          />
        </div>
        <div className="single-contant ml20 ml0-xs">
          <h6 className="title mb-1 fz16" style={{ fontWeight: "600" }}>{agentName}</h6>
          <p className="text mb-2 fz14 text-muted">{agentPosition}</p>
          <div className="agent-meta d-flex align-items-center">
            <a 
              className="text fz13" 
              href={`https://wa.me/${agentPhone}`}
              style={{ color: "#25D366", fontWeight: "500" }}
            >
              <i className="fab fa-whatsapp pe-1 fz15" />
              En línea
            </a>
          </div>
        </div>
      </div>
      {/* End agent-single */}

      <div className="d-grid mt10">
        <button 
          onClick={handleWhatsAppClick} 
          className="ud-btn btn-white2 w-100"
          style={{ 
            backgroundColor: "#25D366", 
            color: "#fff", 
            borderColor: "#25D366",
            borderRadius: "10px",
            fontSize: "14px",
            fontWeight: "600",
            padding: "12px 0",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: "0 4px 6px -1px rgba(37, 211, 102, 0.2)"
          }}
        >
          <i className="fab fa-whatsapp me-2 fz18" />
          Contactar por WhatsApp
        </button>
      </div>
    </>
  );
};

export default ContactWithAgent;
