const MenuItems = () => {
  const menuItems = [
    { id: 1, title: "Departamentos" },
    { id: 2, title: "Bungalow" },
    { id: 3, title: "Casas" },
    { id: 4, title: "Loft" },
    { id: 5, title: "Oficinas" },
    { id: 6, title: "Casas adosadas" },
    { id: 7, title: "Cabañas" },
  ];

  return (
    <ul className="navbar-nav">
      {menuItems.map((item) => (
        <li className="nav-item" key={item.id}>
          <a className="nav-link" href="#" role="button">
            {item.title}
          </a>
        </li>
      ))}
    </ul>
  );
};

export default MenuItems;
