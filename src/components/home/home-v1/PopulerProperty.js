'use client'

import Link from 'next/link';
import React, { useEffect, useState } from 'react'
import PopularListings from './PopularListings'

export default function PopulerProperty() {
    const [pageData, setPageData] = useState([])
    
    useEffect(() => {
        fetch("/api/propiedades?fields=card&limit=6", { next: { revalidate: 10 } })
          .then((r) => r.json())
          .then((data) => {
            if (Array.isArray(data)) {
              // Filtrar para mostrar únicamente parcelas, lotes, terrenos, sitios
              const filtered = data.filter((elm) => {
                const cat = (elm.category || "").toLowerCase();
                return cat.includes('parcela') || cat.includes('lote') || cat.includes('terreno') || cat.includes('sitio');
              });
              filtered.sort((a, b) => {
                const dateA = a.created_at ? new Date(a.created_at).getTime() : 0;
                const dateB = b.created_at ? new Date(b.created_at).getTime() : 0;
                if (dateA !== dateB) {
                  return dateB - dateA;
                }
                return Number(b.id || 0) - Number(a.id || 0);
              });
              setPageData(filtered);
            }
          })
          .catch((err) => console.error("Error loading parcelas", err));
    }, [])
    
  return (
    <section className="position-relative" style={{ padding: "100px 0 80px 0", overflow: "hidden" }}>
      
      {/* Background Image (Optimized instead of heavy video) */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          backgroundImage: "url('/images/entrega de llave en el campo.webp')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          zIndex: 0,
        }}
      />

      {/* Overlay Gradient */}
      <div 
        style={{ 
          position: "absolute", 
          top: 0, 
          left: 0, 
          width: "100%", 
          height: "100%", 
          backgroundImage: "linear-gradient(to bottom, rgba(29, 41, 63, 0.95) 0%, rgba(29, 41, 63, 0.6) 40%, rgba(255, 255, 255, 1) 100%)", 
          zIndex: 1 
        }} 
      />

      <div className="container" style={{ position: "relative", zIndex: 2 }}>
          
          {/* Encabezado e Info de lo que Conlleva */}
          <div className="row mb40 align-items-center" data-aos="fade-up">
            <div className="col-lg-6">
              <div className="main-title2">
                <span className="text-thm fw-semibold uppercase mb15 d-block" style={{ color: "#eb6753", letterSpacing: "2px", fontSize: "14px" }}>
                  INVERSIÓN TIERRA Y RURAL
                </span>
                <h2 className="title" style={{ color: "#ffffff", fontWeight: "850", fontSize: "36px" }}>
                  Parcelas y Lotes Rurales Destacados
                </h2>
                <p className="paragraph" style={{ color: "#e2e8f0", fontSize: "15.5px", lineHeight: "1.7" }}>
                  Selección exclusiva de terrenos en la Patagonia con alto potencial de plusvalía y proyectos listos para escriturar.
                </p>
              </div>
            </div>
            
            {/* Columna de Garantías Translucida con Fondo Integrado */}
            <div className="col-lg-6">
              <div style={{ 
                background: "rgba(255, 255, 255, 0.08)", 
                backdropFilter: "blur(10px)",
                padding: "30px", 
                borderRadius: "16px", 
                border: "1px solid rgba(255, 255, 255, 0.15)",
                boxShadow: "0 15px 35px rgba(0, 0, 0, 0.2)",
              }}>
                <h5 style={{ color: "#ffffff", fontWeight: "800", marginBottom: "15px", fontSize: "17px", letterSpacing: "0.5px" }}>
                  Garantías de Respaldo Técnico y Legal
                </h5>
                <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
                  <li style={{ fontSize: "13.5px", color: "#f1f5f9", marginBottom: "8px" }}>
                    • <strong>Rol Propio Autorizado:</strong> Inscripción y subdivisión SAG aprobada.
                  </li>
                  <li style={{ fontSize: "13.5px", color: "#f1f5f9", marginBottom: "8px" }}>
                    • <strong>Estudio de Títulos Completo:</strong> Listo para firma, sin sorpresas.
                  </li>
                  <li style={{ fontSize: "13.5px", color: "#f1f5f9" }}>
                    • <strong>Factibilidad Certificada:</strong> Acceso, límites y servicios evaluados.
                  </li>
                </ul>
              </div>
            </div>
          </div>
          {/* End .row */}

          <div className="row" data-aos="fade-up" data-aos-delay="300">
            <div className="col-lg-12">
              <PopularListings data={pageData} />
              
              <div className="d-grid d-md-block text-center mt30 mt0-md">
                <Link href="/propiedades?category=Terreno" className="ud-btn btn-thm">
                  Ver Todas las Parcelas y Lotes<i className="fal fa-arrow-right-long"></i>
                </Link>
              </div>
            </div>
          </div>
          {/* End .row */}
        </div>
      </section>
  )
}
