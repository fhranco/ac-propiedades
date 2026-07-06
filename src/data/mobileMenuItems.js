module.exports = [
  {
    label: "Inicio",
    path: "/"
  },
  {
    label: "Propiedades",
    subMenu: [
      { label: "Ver Todas", path: "/propiedades" },
      { label: "Vista en Mapa", path: "/mapa" }
    ]
  },
  {
    label: "Noticias",
    path: "/noticias"
  },
  {
    label: "Páginas",
    subMenu: [
      { path: "/nosotros", label: "Nosotros" },
      { path: "/servicios", label: "Servicios" },
      { path: "/contacto", label: "Contacto" },
      { path: "/preguntas-frecuentes", label: "Preguntas Frecuentes" }
    ]
  }
];
