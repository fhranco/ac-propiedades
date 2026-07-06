import {
  homeItems,
  blogItems,
  listingItems,
  propertyItems,
  pageItems,
} from "@/data/navItems";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const MainMenu = () => {
  const pathname = usePathname();
  const [topMenu, setTopMenu] = useState("");
  const [submenu, setSubmenu] = useState("");
  const [activeLink, setActiveLink] = useState("");

  useEffect(() => {
    homeItems.forEach((elm) => {
      if (elm.href.split("/")[1] == pathname.split("/")[1]) {
        setTopMenu("home");
      }
    });
    blogItems.forEach((elm) => {
      if (elm.href.split("/")[1] == pathname.split("/")[1]) {
        setTopMenu("blog");
      }
    });
    pageItems.forEach((elm) => {
      if (elm.href.split("/")[1] == pathname.split("/")[1]) {
        setTopMenu("pages");
      }
    });
    propertyItems.forEach((item) =>
      item.subMenuItems.forEach((elm) => {
        if (elm.href.split("/")[1] == pathname.split("/")[1]) {
          setTopMenu("property");
          setSubmenu(item.label);
        }
      })
    );
    listingItems.forEach((item) =>
      item.submenu.forEach((elm) => {
        if (elm.href.split("/")[1] == pathname.split("/")[1]) {
          setTopMenu("listing");
          setSubmenu(item.title);
        }
      })
    );
  }, [pathname]);

  const handleActive = (link) => {
    if (link.split("/")[1] == pathname.split("/")[1]) {
      return "menuActive";
    }
  };
  return (
    <ul className="ace-responsive-menu">
      <li className="visible_list">
        <Link className="list-item" href="/">
          <span className={pathname === "/" ? "title menuActive" : "title"}>
            Inicio
          </span>
        </Link>
      </li>

      <li className="megamenu_style dropitem">
        <a className="list-item" href="#">
          <span className={pathname.startsWith("/propiedades") || pathname === "/mapa" ? "title menuActive" : "title"}>
            Propiedades
          </span>
          <span className="arrow"></span>
        </a>
        <ul className="row dropdown-megamenu sub-menu">
          <li className="col mega_menu_list">
            <h4 className="title">Propiedades</h4>
            <ul className="sub-menu">
              <li>
                <Link className={pathname === "/propiedades" ? "menuActive" : ""} href="/propiedades">
                  Ver Todas
                </Link>
              </li>
              <li>
                <Link className={pathname === "/mapa" ? "menuActive" : ""} href="/mapa">
                  Vista en Mapa
                </Link>
              </li>
            </ul>
          </li>
        </ul>
      </li>

      <li className="visible_list">
        <Link className="list-item" href="/nosotros">
          <span className={pathname === "/nosotros" ? "title menuActive" : "title"}>
            Nosotros
          </span>
        </Link>
      </li>

      <li className="visible_list">
        <Link className="list-item" href="/servicios">
          <span className={pathname === "/servicios" ? "title menuActive" : "title"}>
            Servicios
          </span>
        </Link>
      </li>

      <li className="visible_list">
        <Link className="list-item" href="/noticias">
          <span className={pathname.startsWith("/noticias") ? "title menuActive" : "title"}>
            Noticias
          </span>
        </Link>
      </li>

      <li className="visible_list">
        <Link className="list-item" href="/contacto">
          <span className={pathname === "/contacto" ? "title menuActive" : "title"}>
            Contacto
          </span>
        </Link>
      </li>

      <li className="visible_list">
        <Link className="list-item" href="/preguntas-frecuentes">
          <span className={pathname === "/preguntas-frecuentes" ? "title menuActive" : "title"}>
            Preguntas Frecuentes
          </span>
        </Link>
      </li>
    </ul>
  );
};

export default MainMenu;
