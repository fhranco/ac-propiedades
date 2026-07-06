"use client";
import React, { useEffect, useState } from "react";

const WhatsAppFloating = () => {
  const agentPhone = "56984152100";
  const message = encodeURIComponent("Hola AC Propiedades, necesito asesoría con un experto.");
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 150) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: `
        .whatsapp-floating {
          position: fixed;
          bottom: 115px;
          right: 40px;
          background-color: #25d366;
          color: white;
          width: 60px;
          height: 60px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 4px 15px rgba(0, 0, 0, 0.25);
          z-index: 9999;
          transition: transform 0.3s ease, box-shadow 0.3s ease, opacity 0.3s ease;
          text-decoration: none;
          opacity: 0;
          pointer-events: none;
        }
        .whatsapp-floating.show {
          opacity: 1;
          pointer-events: auto;
        }
        .whatsapp-floating:hover {
          transform: scale(1.1);
          box-shadow: 0 6px 20px rgba(37, 211, 102, 0.4);
          color: white;
        }
        .whatsapp-floating i {
          font-size: 32px;
        }
        /* Ajuste para que no tape al botón de volver arriba (ScrollToTop) */
        @media (max-width: 767px) {
          .whatsapp-floating {
            bottom: 178px; /* Apilado frente a Búsquedas Populares cuando se hace scroll al final */
            right: 15px;
            left: auto;
            width: 45px;
            height: 45px;
          }
          .whatsapp-floating i {
            font-size: 26px;
          }
        }
      `}} />
      <a
        href={`https://api.whatsapp.com/send?phone=${agentPhone}&text=${message}`}
        className={`whatsapp-floating ${isVisible ? "show" : ""}`}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Contactar por WhatsApp"
      >
        <i className="fab fa-whatsapp" />
      </a>
    </>
  );
};

export default WhatsAppFloating;
