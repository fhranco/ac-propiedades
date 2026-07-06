import React from "react";

const getCurrentYear = () => {
  return new Date().getFullYear();
};

const Footer = () => {
  const footerMenuItems = [
    {
      label: "Privacidad",
      link: "#",
    },
    {
      label: "Términos",
      link: "#",
    },
    {
      label: "Mapa del sitio",
      link: "#",
    },
  ];

  return (
    <div className="container white-bdrt1 py-4">
      <div className="row justify-content-center text-center">
        <div className="col-12">
          <p className="copyright-text ff-heading mb-0" style={{ color: "rgba(255, 255, 255, 0.6)", fontSize: "14px", lineHeight: "1.8" }}>
            © {getCurrentYear()}{" "}
            <a href="/" className="text-white fw-semibold">
              AC Propiedades
            </a>{" "}
            - Todos los derechos reservados. Desarrollo web a medida por{" "}
            <a
              href="https://agenciapatagoniacoach.cl"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white fw-semibold"
              style={{ textDecoration: "underline" }}
            >
              Agencia PatagoniaCoach
            </a>
            <span style={{ margin: "0 12px", color: "rgba(255, 255, 255, 0.3)" }}>|</span>
            {footerMenuItems.map((item, index) => (
              <React.Fragment key={index}>
                <a className="text-white-50" href={item.link} style={{ color: "rgba(255, 255, 255, 0.6)" }}>
                  {item.label}
                </a>
                {index !== footerMenuItems.length - 1 && " · "}
              </React.Fragment>
            ))}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Footer;
