"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";



const ApartmentType = () => {
  const [counts, setCounts] = useState({
    "Casa": 0,
    "Departamento": 0,
    "Terreno / Parcela": 0,
    "Comercial": 0
  });

  useEffect(() => {
    supabase
      .from("properties")
      .select("category")
      .then(({ data, error }) => {
        if (error) {
          console.error("Error obteniendo propiedades de Supabase:", error);
          return;
        }
        if (Array.isArray(data)) {
          const countsObj = {
            "Casa": 0,
            "Departamento": 0,
            "Terreno / Parcela": 0,
            "Comercial": 0
          };
          data.forEach((prop) => {
            const cat = (prop.category || "").toLowerCase();
            if (cat.includes("casa") || cat.includes("house")) {
              countsObj["Casa"]++;
            } else if (cat.includes("depto") || cat.includes("departamento") || cat.includes("apartment")) {
              countsObj["Departamento"]++;
            } else if (cat.includes("terreno") || cat.includes("parcela") || cat.includes("sitio") || cat.includes("lote") || cat.includes("land")) {
              countsObj["Terreno / Parcela"]++;
            } else if (cat.includes("comercial") || cat.includes("local") || cat.includes("oficina") || cat.includes("office")) {
              countsObj["Comercial"]++;
            }
          });
          setCounts(countsObj);
        }
      });
  }, []);

  const categories = [
    { id: 1, icon: "flaticon-home", title: "Casas", dbName: "Casa", count: counts["Casa"] },
    { id: 2, icon: "flaticon-corporation", title: "Departamentos", dbName: "Departamento", count: counts["Departamento"] },
    { id: 3, icon: "flaticon-chat", title: "Terrenos / Parcelas", dbName: "Terreno / Parcela", count: counts["Terreno / Parcela"] },
    { id: 4, icon: "flaticon-bird-house", title: "Comerciales / Locales", dbName: "Comercial", count: counts["Comercial"] }
  ];

  return (
    <div className="apt-marquee-container mb-4">
      <style dangerouslySetInnerHTML={{__html: `
        .apt-marquee-container {
          overflow: hidden;
          width: 100%;
          position: relative;
          padding: 15px 0;
          display: block !important;
        }
        .apt-marquee-track {
          display: flex !important;
          flex-direction: row !important;
          width: max-content !important;
          animation: marqueeScroll 25s linear infinite;
        }
        .apt-marquee-track:hover {
          animation-play-state: paused;
        }
        .apt-marquee-item {
          flex-shrink: 0 !important;
          padding: 0 12px !important;
          display: block !important;
          width: 284px !important; /* 260px width + 24px padding total */
          opacity: 1 !important;
        }
        .marquee-card {
          border: 1px solid #e9e9e9 !important;
          background-color: #fff !important;
          border-radius: 12px !important;
          padding: 16px 20px !important;
          display: flex !important;
          flex-direction: row !important;
          align-items: center !important;
          justify-content: flex-start !important;
          gap: 15px !important;
          width: 260px !important;
          height: 80px !important;
          position: relative !important;
          transition: all 0.3s ease;
          box-shadow: 0 4px 10px rgba(0,0,0,0.02) !important;
          cursor: pointer;
        }
        .marquee-card:hover {
          transform: translateY(-2px) !important;
          box-shadow: 0 8px 20px rgba(0,0,0,0.06) !important;
          border-color: #eb6753 !important;
        }
        .marquee-card-icon {
          font-size: 28px !important;
          color: #eb6753 !important;
          position: relative !important;
          left: auto !important;
          top: auto !important;
          transform: none !important;
          display: inline-block !important;
          width: auto !important;
          height: auto !important;
          line-height: 1 !important;
          margin: 0 !important;
        }
        .marquee-card-content {
          position: relative !important;
          display: block !important;
          left: auto !important;
          top: auto !important;
          margin: 0 !important;
          padding: 0 !important;
        }
        .marquee-card-title {
          font-size: 14px !important;
          font-weight: 600 !important;
          color: #1d293f !important;
          position: relative !important;
          display: block !important;
          margin: 0 0 4px 0 !important;
          line-height: 1.2 !important;
        }
        .marquee-card-text {
          font-size: 12px !important;
          color: #6b7280 !important;
          margin: 0 !important;
          display: block !important;
          position: relative !important;
        }
        @keyframes marqueeScroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(calc(-1 * 284px * 4)); /* Mueve exactamente las 4 categorías */
          }
        }
      `}} />
      <div className="apt-marquee-track">
        {/* Renderizamos las categorías duplicadas consecutivamente para un loop infinito fluido */}
        {[...categories, ...categories, ...categories, ...categories].map((type, idx) => (
          <div className="apt-marquee-item" key={idx}>
            <Link href={`/propiedades?category=${encodeURIComponent(type.dbName)}`}>
              <div className="marquee-card">
                <span className={`marquee-card-icon ${type.icon}`} />
                <div className="marquee-card-content">
                  <h6 className="marquee-card-title">{type.title}</h6>
                  <p className="marquee-card-text">{`${type.count} Propiedades`}</p>
                </div>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ApartmentType;
