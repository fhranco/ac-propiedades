import React from "react";

const MenuWidget = () => {
  const menuSections = [
    {
      title: "Búsquedas Populares",
      links: [
        { label: "Departamentos en Venta", href: "/propiedades?category=Departamento&status=Buy" },
        { label: "Parcelas y Lotes en Venta", href: "/propiedades?category=Lote&status=Buy" },
        { label: "Casas en Venta", href: "/propiedades?category=Casa&status=Buy" },
        { label: "Oficinas en Venta", href: "/propiedades?category=Comercial&status=Buy" },
      ],
    },
    {
      title: "Enlaces Rápidos",
      links: [
        { label: "Términos de Uso", href: "#" },
        { label: "Política de Privacidad", href: "#" },
        { label: "Planes de Precios", href: "#" },
        { label: "Nuestros Servicios", href: "#" },
        { label: "Soporte de Contacto", href: "#" },
        { label: "Preguntas Frecuentes", href: "#" },
      ],
    },
    {
      title: "Comunas",
      links: [
        { label: "Punta Arenas", href: "/propiedades?location=Punta+Arenas" },
        { label: "Puerto Natales", href: "/propiedades?location=Puerto+Natales" },
        { label: "Porvenir", href: "/propiedades?location=Porvenir" },
        { label: "Cabo de Hornos", href: "/propiedades?location=Cabo+de+Hornos" },
      ],
    },
  ];

  return (
    <>
      {/* Vista Desktop */}
      <div className="d-none d-md-flex w-100 justify-content-between">
        {menuSections.map((section, index) => (
          <div className="col-auto" key={index}>
            <div className="link-style1 mb-3">
              <h6 className="text-white mb25">{section.title}</h6>
              <ul className="ps-0">
                {section.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <a href={link.href} style={{ color: "rgba(255, 255, 255, 0.85)" }}>{link.label}</a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>

      {/* Vista Mobile (Acordeón contraído) */}
      <div className="d-block d-md-none w-100 accordion accordion-flush" id="footerMenuAccordion">
        {menuSections.map((section, index) => (
          <div className="accordion-item bg-transparent border-0" key={index}>
            <h2 className="accordion-header" id={`heading${index}`}>
              <button
                className="accordion-button collapsed bg-transparent text-white px-0 shadow-none fw-bold"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target={`#collapse${index}`}
                aria-expanded="false"
                aria-controls={`collapse${index}`}
                style={{ borderBottom: "1px solid rgba(255,255,255,0.1)", fontSize: "16px" }}
              >
                {section.title}
              </button>
            </h2>
            <div
              id={`collapse${index}`}
              className="accordion-collapse collapse"
              aria-labelledby={`heading${index}`}
              data-bs-parent="#footerMenuAccordion"
            >
              <div className="accordion-body px-0 pt-2 pb-4">
                <div className="link-style1">
                  <ul className="ps-0 mb-0">
                    {section.links.map((link, linkIndex) => (
                      <li key={linkIndex}>
                        <a href={link.href} style={{ color: "rgba(255, 255, 255, 0.85)", display: "block", padding: "5px 0" }}>
                          {link.label}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default MenuWidget;
