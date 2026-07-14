"use client";
import React, { useState } from "react";

const SellWithUs = () => {
  const agentPhone = "56984152100";
  const [selectedAction, setSelectedAction] = useState("vender");

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const name = formData.get("name");
    const phone = formData.get("phone");
    const category = formData.get("category");
    const address = formData.get("address");
    const message = formData.get("message");

    const actionText = selectedAction === "vender" ? "VENDER / TASACIÓN" : "COMPRAR / BÚSQUEDA";
    const text = `Hola AC Propiedades, solicito asesoría para ${actionText} de terreno o parcela:
- *Nombre:* ${name}
- *Teléfono:* ${phone}
- *Ubicación/Sector:* ${address}
- *Tipo de Proyecto:* ${category}
- *Comentario/Requerimientos:* ${message || "Sin comentarios"}`;

    const encodedText = encodeURIComponent(text);
    const whatsappUrl = `https://api.whatsapp.com/send?phone=${agentPhone}&text=${encodedText}`;

    if (typeof window !== "undefined") {
      window.open(whatsappUrl, "_blank");
    }
  };

  return (
    <section id="seller-form-section" className="pt80 pb80" style={{ background: "#ffffff", color: "#1e293b", padding: "80px 0" }}>
      <div className="container">
        <div className="row align-items-center">
          
          <div className="col-lg-5 mb30-md" data-aos="fade-right">
            <span className="text-thm fw-semibold uppercase mb10 d-block" style={{ color: "#eb6753", letterSpacing: "1px", fontSize: "13px" }}>
              ¿TIENES UN PROYECTO EN MENTE EN LA PATAGONIA?
            </span>
            <h3 className="mb20" style={{ fontWeight: "800", fontSize: "32px", lineHeight: "1.2", color: "#1d293f" }}>
              {selectedAction === "vender" 
                ? "Tasación y Venta de Terrenos Rurales" 
                : "Encuentra tu Parcela o Lote en Magallanes"
              }
            </h3>
            <p style={{ color: "#5f718a", fontSize: "15px", lineHeight: "1.6" }}>
              {selectedAction === "vender"
                ? "Completa el formulario con los detalles básicos de tu terreno. Nos pondremos en contacto contigo vía WhatsApp para coordinar un análisis técnico de tasación, evaluar el plano de subdivisión SAG o asesorarte en la comercialización de tu parcela."
                : "Cuéntanos qué tipo de loteo o terreno buscas. Te ayudaremos a encontrar la parcela ideal en Magallanes que cuente con rol propio, factibilidad técnica real y toda su documentación al día."
              }
            </p>
          </div>

          <div className="col-lg-7" data-aos="fade-left">
            <form onSubmit={handleSubmit} className="p-4 bdrs16" style={{ background: "#ffffff", border: "1px solid #e2e8f0", boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.05), 0 4px 6px -2px rgba(0, 0, 0, 0.02)" }}>
              
              {/* Selector de Acción: Vender o Comprar */}
              <div className="d-flex mb-4 p-1" style={{ background: "#f1f5f9", borderRadius: "10px" }}>
                <button
                  type="button"
                  className="flex-fill py-2 text-center"
                  style={{
                    border: "none",
                    borderRadius: "8px",
                    fontWeight: "700",
                    fontSize: "14px",
                    background: selectedAction === "vender" ? "#1d293f" : "transparent",
                    color: selectedAction === "vender" ? "#ffffff" : "#64748b",
                    transition: "all 0.2s ease"
                  }}
                  onClick={() => setSelectedAction("vender")}
                >
                  Quiero Vender
                </button>
                <button
                  type="button"
                  className="flex-fill py-2 text-center"
                  style={{
                    border: "none",
                    borderRadius: "8px",
                    fontWeight: "700",
                    fontSize: "14px",
                    background: selectedAction === "comprar" ? "#1d293f" : "transparent",
                    color: selectedAction === "comprar" ? "#ffffff" : "#64748b",
                    transition: "all 0.2s ease"
                  }}
                  onClick={() => setSelectedAction("comprar")}
                >
                  Quiero Comprar / Invertir
                </button>
              </div>

              <div className="row">
                <div className="col-md-6 mb-3">
                  <label className="form-label mb-1" style={{ fontSize: "12px", color: "#5f718a", fontWeight: "600" }}>Nombre Completo</label>
                  <input
                    type="text"
                    name="name"
                    className="form-control"
                    placeholder="Ej: Carolina Muñoz"
                    required
                    style={{ background: "#f8fafc", border: "1px solid #cbd5e1", color: "#1e293b", borderRadius: "10px", padding: "10px 15px", fontSize: "14px" }}
                  />
                </div>
                <div className="col-md-6 mb-3">
                  <label className="form-label mb-1" style={{ fontSize: "12px", color: "#5f718a", fontWeight: "600" }}>WhatsApp / Teléfono</label>
                  <input
                    type="text"
                    name="phone"
                    className="form-control"
                    placeholder="Ej: +56 9 8765 4321"
                    required
                    style={{ background: "#f8fafc", border: "1px solid #cbd5e1", color: "#1e293b", borderRadius: "10px", padding: "10px 15px", fontSize: "14px" }}
                  />
                </div>
              </div>

              <div className="row">
                <div className="col-md-6 mb-3">
                  <label className="form-label mb-1" style={{ fontSize: "12px", color: "#5f718a", fontWeight: "600" }}>Tipo de Terreno</label>
                  <select
                    name="category"
                    className="form-select"
                    required
                    style={{ background: "#f8fafc", border: "1px solid #cbd5e1", color: "#1e293b", borderRadius: "10px", padding: "10px 15px", fontSize: "14px" }}
                  >
                    <option value="Parcela Agrícola (5.000 m²)" style={{ background: "#ffffff", color: "#1e293b" }}>Parcela Agrícola (5.000 m²)</option>
                    <option value="Terreno Comercial / Industrial" style={{ background: "#ffffff", color: "#1e293b" }}>Terreno Comercial / Industrial</option>
                    <option value="Macrolote / Predio Forestal" style={{ background: "#ffffff", color: "#1e293b" }}>Macrolote / Predio Forestal</option>
                    <option value="Loteo Consolidado" style={{ background: "#ffffff", color: "#1e293b" }}>Loteo Consolidado</option>
                  </select>
                </div>
                <div className="col-md-6 mb-3">
                  <label className="form-label mb-1" style={{ fontSize: "12px", color: "#5f718a", fontWeight: "600" }}>
                    {selectedAction === "vender" ? "Comuna / Sector Rural" : "Ubicación o Sector de Interés"}
                  </label>
                  <input
                    type="text"
                    name="address"
                    className="form-control"
                    placeholder="Ej: Agua Fresca, San Juan, Sector Norte"
                    required
                    style={{ background: "#f8fafc", border: "1px solid #cbd5e1", color: "#1e293b", borderRadius: "10px", padding: "10px 15px", fontSize: "14px" }}
                  />
                </div>
              </div>

              <div className="mb-4">
                <label className="form-label mb-1" style={{ fontSize: "12px", color: "#5f718a", fontWeight: "600" }}>
                  {selectedAction === "vender" 
                    ? "Mensaje / Detalles técnicos (Opcional)" 
                    : "Cuéntanos sobre tu proyecto o requerimientos especiales"
                  }
                </label>
                <textarea
                  name="message"
                  rows={2}
                  className="form-control"
                  placeholder={selectedAction === "vender"
                    ? "Menciona si tiene rol propio, factibilidad de agua/luz, topografía o hectáreas totales."
                    : "Menciona presupuesto estimado, requerimientos de orilla de río, bosque nativo, factibilidades, etc."
                  }
                  style={{ background: "#f8fafc", border: "1px solid #cbd5e1", color: "#1e293b", borderRadius: "10px", padding: "10px 15px", fontSize: "14px" }}
                />
              </div>

              <button
                type="submit"
                className="ud-btn btn-thm w-100 py-3"
                style={{
                  backgroundColor: "#eb6753",
                  color: "#fff",
                  borderRadius: "10px",
                  fontWeight: "700",
                  border: "none",
                  boxShadow: "0 10px 20px rgba(235, 103, 83, 0.25)",
                  transition: "all 0.3s ease",
                  fontSize: "15px"
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.backgroundColor = "#d65946";
                  e.currentTarget.style.transform = "translateY(-1px)";
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.backgroundColor = "#eb6753";
                  e.currentTarget.style.transform = "translateY(0)";
                }}
              >
                {selectedAction === "vender" 
                  ? "Enviar Solicitud de Tasación" 
                  : "Solicitar Asesoría de Búsqueda"
                }
                <i className="fab fa-whatsapp ms-2 fz16" />
              </button>
            </form>
          </div>

        </div>
      </div>
    </section>
  );
};

export default SellWithUs;
