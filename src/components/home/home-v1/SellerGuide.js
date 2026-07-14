"use client";
import React, { useState } from "react";

const SellerGuide = () => {
  const [activeTab, setActiveTab] = useState("proceso");

  const pasos = [
    { num: "01", title: "Plan de Marketing en Redes Oficiales", desc: "Diseñamos una campaña estratégica en nuestras redes sociales y canales oficiales utilizando herramientas de alto impacto: fotografía profesional, videos detallados y tours virtuales interactivos." },
    { num: "02", title: "Publicación en Nuestra Página Web", desc: "Destacamos tu propiedad en nuestra plataforma web oficial con prioridad visual y fichas técnicas interactivas completas para compradores calificados." },
    { num: "03", title: "Acompañamiento y Asesoría al Comprador", desc: "Acompañamos de cerca a los potenciales interesados, facilitando y asesorándolos en su proceso de financiamiento y compra para asegurar el precio acordado y optimizar los tiempos de la operación." },
    { num: "04", title: "Gestión y Coordinación de Visitas", desc: "Nos preocupamos de que tu propiedad esté perfectamente preparada para cada visita. Si la propiedad está habitada, coordinamos visitas planificadas sin invadir tu privacidad y tranquilidad." },
    { num: "05", title: "Cierre Legal y Escrituración Final", desc: "Redacción de la promesa de compraventa, recopilación de certificados y acompañamiento constante en notaría y bancos hasta la inscripción y el cierre final de la operación." }
  ];

  const errores = [
    { num: "01", title: "Fijar precio por especulación", desc: "Poner un precio sobre la media 'quema' la propiedad. El 80% de los interesados busca activamente en las primeras 4 semanas." },
    { num: "02", title: "Fotografías deficientes u oscuras", desc: "La primera impresión de un comprador es digital. Fotos de baja calidad ahuyentan visitas y bajan el valor percibido." },
    { num: "03", title: "No preparar la propiedad", desc: "Detalles menores (limpieza, desorden o pequeñas reparaciones) restan valor y disminuyen las ofertas de compra." },
    { num: "04", title: "Poca difusión comercial", desc: "Publicar solo en portales gratuitos o redes sociales personales limita drásticamente el alcance e interesados del inmueble." },
    { num: "05", title: "Falta de estudio de títulos previo", desc: "No tener listos los certificados de dominio o gravámenes vigentes puede retrasar o hacer caer la venta a mitad del proceso." }
  ];

  return (
    <section className="pt20 pb80" style={{ background: "#1d293f", color: "#ffffff", padding: "20px 0 80px 0" }}>
      <style dangerouslySetInnerHTML={{__html: `
        .guide-tab-btn {
          background: transparent;
          border: none;
          color: #94a3b8;
          font-weight: 700;
          font-size: 18px;
          padding: 12px 24px;
          position: relative;
          transition: all 0.3s ease;
          cursor: pointer;
        }
        .guide-tab-btn.active {
          color: #eb6753;
        }
        .guide-tab-btn.active::after {
          content: "";
          position: absolute;
          bottom: 0;
          left: 24px;
          right: 24px;
          height: 3px;
          background-color: #eb6753;
          border-radius: 2px;
        }
        .guide-step-card {
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 12px;
          padding: 30px 24px;
          transition: all 0.3s cubic-bezier(0.165, 0.84, 0.44, 1);
          height: 100%;
          position: relative;
          overflow: hidden;
        }
        .guide-step-card::before {
          content: "";
          position: absolute;
          top: 0;
          left: 0;
          width: 4px;
          height: 0%;
          background: #eb6753;
          transition: all 0.3s ease;
        }
        .guide-step-card:hover {
          background: rgba(255, 255, 255, 0.05);
          border-color: rgba(235, 103, 83, 0.4);
          transform: translateY(-5px);
          box-shadow: 0 12px 24px rgba(0, 0, 0, 0.15);
        }
        .guide-step-card:hover::before {
          height: 100%;
        }
        .guide-num {
          font-size: 14px;
          font-weight: 800;
          color: #eb6753;
          background: rgba(235, 103, 83, 0.15);
          border-radius: 6px;
          width: 36px;
          height: 24px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 20px;
          letter-spacing: 0.5px;
        }
      `}} />

      <style dangerouslySetInnerHTML={{__html: `
        .vertical-text-vender {
          writing-mode: vertical-lr;
          color: #ffffff;
          font-size: 85px;
          font-weight: 900;
          letter-spacing: 6px;
          text-align: center;
          line-height: 1;
          margin: 0 auto;
          display: flex;
          align-items: center;
          justify-content: center;
          height: 100%;
          user-select: none;
          pointer-events: none;
        }
        @media (max-width: 991.98px) {
          .vertical-text-vender {
            display: none !important;
          }
        }
      `}} />

      <div className="container" style={{ position: "relative", zIndex: "2" }}>
        <div className="row align-items-center">
          {/* Columna de Contenido a la izquierda */}
          <div className="col-lg-10 col-12">
            
            {/* Encabezado */}
            <div className="row mb50 text-center text-lg-start">
              <div className="col-lg-12" data-aos="fade-up">
                <span className="text-thm fw-semibold uppercase mb15 d-block" style={{ color: "#eb6753", letterSpacing: "2px", fontSize: "14px" }}>
                  GUÍA DE VENTA AC PROPIEDADES
                </span>
                <h2 className="title mb20" style={{ fontWeight: "850", fontSize: "38px", lineHeight: "1.2", color: "#ffffff" }}>
                  ¿Cómo asegurar una venta exitosa en Magallanes?
                </h2>
                <p style={{ color: "#94a3b8", fontSize: "16px", lineHeight: "1.7" }}>
                  Vender un inmueble requiere una estrategia clara. Conoce los pasos fundamentales de nuestro plan comercial o descubre cuáles son los errores más costosos que debes evitar.
                </p>
              </div>
            </div>

            {/* Tabs de Selección */}
            <div className="row mb40 justify-content-center justify-content-lg-start">
              <div className="col-auto d-flex gap-2" style={{ borderBottom: "1px solid rgba(255, 255, 255, 0.1)", paddingBottom: "10px" }}>
                <button
                  className={`guide-tab-btn ${activeTab === "proceso" ? "active" : ""}`}
                  onClick={() => setActiveTab("proceso")}
                >
                  Nuestro Plan de Venta de 6 Pasos
                </button>
                <button
                  className={`guide-tab-btn ${activeTab === "errores" ? "active" : ""}`}
                  onClick={() => setActiveTab("errores")}
                >
                  5 Errores Críticos a Evitar
                </button>
              </div>
            </div>

            {/* Grilla de Pasos o Errores (Toma los 12 Elementos) */}
            <div className="row g-4">
              {activeTab === "proceso" ? (
                pasos.map((item, index) => (
                  <div className="col-lg-4 col-md-6" key={index} data-aos="fade-up" data-aos-delay={index * 100}>
                    <div className="guide-step-card">
                      <div className="guide-num">{item.num}</div>
                      <h5 className="mb15" style={{ fontSize: "16px", fontWeight: "700", color: "#ffffff" }}>{item.title}</h5>
                      <p style={{ color: "#94a3b8", fontSize: "13px", margin: 0, lineHeight: "1.6" }}>{item.desc}</p>
                    </div>
                  </div>
                ))
              ) : (
                errores.map((item, index) => (
                  <div className="col-lg-4 col-md-6" key={index} data-aos="fade-up" data-aos-delay={index * 100}>
                    <div className="guide-step-card" style={{ borderLeft: "4px solid #ef4444" }}>
                      <div className="guide-num" style={{ color: "#ef4444", background: "rgba(239, 68, 68, 0.15)" }}>{item.num}</div>
                      <h5 className="mb15" style={{ fontSize: "16px", fontWeight: "700", color: "#ffffff" }}>{item.title}</h5>
                      <p style={{ color: "#94a3b8", fontSize: "13px", margin: 0, lineHeight: "1.6" }}>{item.desc}</p>
                    </div>
                  </div>
                ))
              )}

              {/* Caja de recomendación al final de la grilla */}
              <div className="col-12 mt40" data-aos="fade-up">
                <div className="p-4 bdrs16 text-center" style={{ background: "rgba(235, 103, 83, 0.08)", border: "1px dashed rgba(235, 103, 83, 0.25)" }}>
                  <p className="mb-0" style={{ fontSize: "14px", color: "#cbd5e1" }}>
                    💡 <strong>Consejo Experto:</strong> Un precio adecuado durante los primeros 30 días de publicación capta hasta un 300% más de interés de compradores con crédito pre-aprobado. ¿Quieres saber cuánto vale tu propiedad? <a href="#seller-form-section" style={{ color: "#eb6753", fontWeight: "700", textDecoration: "underline" }}>Solicita una tasación aquí abajo</a>.
                  </p>
                </div>
              </div>
            </div>

          </div>

          {/* Columna del Título VENDER a la derecha (Oculto en móvil) */}
          <div className="col-lg-2 d-none d-lg-block">
            <div className="vertical-text-vender">
              VENDER
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SellerGuide;
