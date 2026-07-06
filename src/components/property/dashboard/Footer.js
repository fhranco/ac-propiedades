import React from "react";

const Footer = () => {
  return (
    <footer className="dashboard_footer pt30 pb10">
      <div className="container">
        <div className="row items-center justify-content-center justify-content-md-between">
          <div className="col-12 text-center">
            <div className="copyright-widget">
              <p className="text mb-0" style={{ fontSize: "13px", color: "#666" }}>
                © 2026 <strong>AC Propiedades</strong> - Todos los derechos reservados. Desarrollo web a medida por{" "}
                <a
                  href="https://patagoniacoach.cl"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ color: "#eb6753", fontWeight: "600" }}
                >
                  Agencia PatagoniaCoach
                </a>{" "}
                | Privacidad · Términos · Mapa del sitio
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
