import Link from "next/link";

const MenuItems = () => {
  const menuItems = [
    { id: 1, title: "Inicio", href: "/" },
    { id: 2, title: "Propiedades", href: "/propiedades" },
    { id: 3, title: "Nosotros", href: "/nosotros" },
    { id: 4, title: "Servicios", href: "/servicios" },
    { id: 5, title: "Noticias", href: "/noticias" },
    { id: 6, title: "Contacto", href: "/contacto" },
    { id: 7, title: "Preguntas Frecuentes", href: "/preguntas-frecuentes" },
  ];

  return (
    <ul className="navbar-nav">
      {menuItems.map((item) => (
        <li className="nav-item" key={item.id}>
          <Link className="nav-link" href={item.href}>
            {item.title}
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default MenuItems;
