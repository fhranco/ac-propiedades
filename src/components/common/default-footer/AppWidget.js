import React from "react";

const AppWidget = () => {
  return (
    <div className="app-widget mt20 text-center text-md-start">
      <h6 className="text-white mb15">Nuestra Ubicación</h6>
      <div className="d-flex align-items-center align-items-md-start justify-content-center justify-content-md-start mb20 text-white flex-column flex-md-row">
        <i className="fal fa-map-marker-alt fz20 me-0 me-md-3 mb-2 mb-md-0 mt-1" style={{ color: "#eb6753" }} />
        <div>
          <p className="mb-0 fz14 font-semibold" style={{ color: "#ffffff" }}>Punta Arenas, Chile</p>
          <p className="mb-0 fz13" style={{ color: "rgba(255, 255, 255, 0.7)" }}>Región de Magallanes y de la Antártica Chilena</p>
        </div>
      </div>
      <h6 className="text-white mb15">Horario de Atención</h6>
      <div className="d-flex align-items-center align-items-md-start justify-content-center justify-content-md-start text-white flex-column flex-md-row">
        <i className="fal fa-clock fz20 me-0 me-md-3 mb-2 mb-md-0 mt-1" style={{ color: "#eb6753" }} />
        <div>
          <p className="mb-0 fz14" style={{ color: "#ffffff" }}>Lunes a Viernes: 09:00 - 18:30</p>
          <p className="mb-0 fz13" style={{ color: "rgba(255, 255, 255, 0.7)" }}>Sábados: Coordinación previa de visitas</p>
        </div>
      </div>
    </div>
  );
};

export default AppWidget;
