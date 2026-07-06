"use client";
import React, { useEffect } from "react";

export default function Error({ error, reset }) {
  useEffect(() => {
    console.error("Next.js App Error:", error);
  }, [error]);

  return (
    <div className="d-flex flex-column align-items-center justify-content-center vh-100 bgc-f7">
      <div className="text-center p-5 bgc-white bdrs12 default-box-shadow1">
        <h2 className="title fz25 mb20 text-thm">¡Algo salió mal!</h2>
        <p className="text mb30">Ha ocurrido un error inesperado al cargar esta sección.</p>
        <button
          onClick={() => reset()}
          className="ud-btn btn-thm"
        >
          Reintentar cargar
          <i className="fal fa-sync ms-2" />
        </button>
      </div>
    </div>
  );
}
