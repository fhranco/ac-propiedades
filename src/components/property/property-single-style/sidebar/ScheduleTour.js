"use client";
import React, { useState, useEffect } from "react";

const ScheduleTour = ({ data }) => {
  const [agentPhone, setAgentPhone] = useState("56984152100"); // Número por defecto de AC Propiedades

  useEffect(() => {
    if (data?.agent_id) {
      // Intentar obtener el teléfono real del agente asignado a la propiedad
      fetch("/api/agentes")
        .then((r) => r.json())
        .then((agents) => {
          const matched = agents.find((a) => String(a.id) === String(data.agent_id));
          if (matched && matched.phone_number) {
            setAgentPhone(matched.phone_number.replace(/[^0-9]/g, ""));
          }
        })
        .catch((err) => console.warn("No se pudo obtener el teléfono del agente:", err));
    }
  }, [data]);

  const tabs = [
    {
      id: "inperson",
      label: "Presencial",
    },
    {
      id: "videochat",
      label: "Videollamada",
    },
  ];

  const handleSubmit = (e, tabType) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const time = formData.get("time");
    const name = formData.get("name");
    const phone = formData.get("phone");
    const email = formData.get("email");
    const message = formData.get("message");
    
    // Obtener la URL de la propiedad actual de forma segura en cliente
    const currentUrl = typeof window !== "undefined" ? window.location.href : "";

    const text = `Hola AC Propiedades, me gustaría programar una visita:
- *Propiedad:* ${data?.title || "Sin título"} (ID: ${data?.id_ingreso_manual || data?.id || ""})
- *Enlace:* ${currentUrl}
- *Tipo de Visita:* ${tabType === "inperson" ? "Presencial" : "Videollamada"}
- *Día y Hora de preferencia:* ${time}
- *Nombre:* ${name}
- *Teléfono:* ${phone}
- *Email:* ${email}
- *Mensaje:* ${message || "Sin comentarios adicionales"}`;

    const encodedText = encodeURIComponent(text);
    const whatsappUrl = `https://api.whatsapp.com/send?phone=${agentPhone}&text=${encodedText}`;

    if (typeof window !== "undefined") {
      window.open(whatsappUrl, "_blank");
    }
  };

  return (
    <div className="ps-navtab">
      <ul className="nav nav-pills mb-3 d-flex flex-row flex-nowrap" id="pills-tab" role="tablist" style={{ gap: "10px" }}>
        {tabs.map((tab) => (
          <li className="nav-item" key={tab.id} role="presentation" style={{ flex: 1 }}>
            <button
              className={`nav-link w-100 ${
                tab.id === "inperson" ? " active" : ""
              }`}
              id={`pills-${tab.id}-tab`}
              data-bs-toggle="pill"
              data-bs-target={`#pills-${tab.id}`}
              type="button"
              role="tab"
              aria-controls={`pills-${tab.id}`}
              aria-selected={tab.id === "inperson" ? "true" : "false"}
              style={{
                textAlign: "center",
                padding: "10px 0",
                fontSize: "14px",
                fontWeight: "600"
              }}
            >
              {tab.label}
            </button>
          </li>
        ))}
      </ul>
      {/* End nav-pills */}

      <div className="tab-content" id="pills-tabContent">
        {tabs.map((tab) => (
          <div
            className={`tab-pane fade${
              tab.id === "inperson" ? " show active" : ""
            }`}
            id={`pills-${tab.id}`}
            role="tabpanel"
            aria-labelledby={`pills-${tab.id}-tab`}
            key={tab.id}
          >
            <form className="form-style1" onSubmit={(e) => handleSubmit(e, tab.id)}>
              <div className="row">
                <div className="col-md-12">
                  <div className="mb20">
                    <input
                      type="text"
                      name="time"
                      className="form-control"
                      placeholder="Día y Hora de preferencia"
                      required
                    />
                  </div>
                </div>
                {/* End .col-12 */}

                <div className="col-lg-12">
                  <div className="mb20">
                    <input
                      type="text"
                      name="name"
                      className="form-control"
                      placeholder="Nombre completo"
                      required
                    />
                  </div>
                </div>
                {/* End .col-12 */}

                <div className="col-lg-12">
                  <div className="mb20">
                    <input
                      type="text"
                      name="phone"
                      className="form-control"
                      placeholder="Teléfono de contacto"
                      required
                    />
                  </div>
                </div>
                {/* End .col-12 */}

                <div className="col-md-12">
                  <div className="mb20">
                    <input
                      type="email"
                      name="email"
                      className="form-control"
                      placeholder="Correo electrónico"
                      required
                    />
                  </div>
                </div>
                {/* End .col-12 */}

                <div className="col-md-12">
                  <div className="mb10">
                    <textarea
                      name="message"
                      cols={30}
                      rows={4}
                      placeholder="Escribe tu consulta o comentarios adicionales..."
                      defaultValue={""}
                    />
                  </div>
                </div>
                {/* End .col-12 */}

                <div className="col-md-12">
                  <div className="d-grid">
                    <button type="submit" className="ud-btn btn-thm">
                      Agendar visita por WhatsApp
                      <i className="fab fa-whatsapp ms-2 fz16" />
                    </button>
                  </div>
                </div>
                {/* End .col-12 */}
              </div>
            </form>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ScheduleTour;
