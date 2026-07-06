"use client";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import { usePathname } from "next/navigation";

const DboardMobileNavigation = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const pathname = usePathname();

  const [isAdmin, setIsAdmin] = useState(false);
  const [isSuperadmin, setIsSuperadmin] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const session = localStorage.getItem("userSession");
      if (session) {
        const user = JSON.parse(session);
        if (user.role === "superadmin") {
          setIsSuperadmin(true);
          setIsAdmin(true);
        } else if (user.id === 1 || user.email === "contacto@acpropiedades.cl" || user.username === "patagoniacoach") {
          setIsSuperadmin(true);
          setIsAdmin(true);
        } else if (user.role === "admin") {
          setIsAdmin(true);
        }
      }
    }
  }, []);

  const sidebarItems = [
    {
      title: "PRINCIPAL",
      items: [
        {
          href: "/dashboard-home",
          icon: "flaticon-discovery",
          text: "Panel de control",
        },
        {
          href: "/dashboard-message",
          icon: "flaticon-chat-1",
          text: "Mensajes",
        },
      ],
    },
    {
      title: "GESTIONAR PROPIEDADES",
      items: [
        {
          href: "/dashboard-add-property",
          icon: "flaticon-new-tab",
          text: "Agregar propiedad",
        },
        {
          href: "/dashboard-my-properties",
          icon: "flaticon-home",
          text: "Mis propiedades",
        },
        {
          href: "/dashboard-my-favourites",
          icon: "flaticon-like",
          text: "Mis favoritos",
        },
      ],
    },
    {
      title: "GESTIONAR CUENTA",
      items: [
        {
          href: "/dashboard-my-profile",
          icon: "flaticon-user",
          text: "Mi perfil",
        },
        ...(isAdmin ? [{
          href: "/dashboard-agents",
          icon: "flaticon-user-1",
          text: "Gestionar agentes",
        }] : []),
        ...(isSuperadmin ? [{
          href: "/dashboard-superadmin",
          icon: "flaticon-discovery",
          text: "Consola Superadmin",
        }] : []),
        {
          href: "/login",
          icon: "flaticon-logout",
          text: "Cerrar sesión",
        },
      ],
    },
  ];

  return (
    <div className="dashboard_navigationbar d-block d-lg-none">
      <div className="dropdown">
        <button
          className="dropbtn"
          onClick={() => setIsDropdownOpen((prevOpen) => !prevOpen)}
        >
          <i className="fa fa-bars pr10" /> Menú del panel
        </button>
        <ul className={`dropdown-content ${isDropdownOpen ? "show" : ""}`}>
          {sidebarItems.map((section, sectionIndex) => (
            <div key={sectionIndex}>
              <p
                className={`fz15 fw400 ff-heading mt30 pl30 ${
                  sectionIndex === 0 ? "mt-0" : "mt30"
                }`}
              >
                {section.title}
              </p>
              {section.items.map((item, itemIndex) => (
                <div key={itemIndex} className="sidebar_list_item">
                  <Link
                    href={item.href}
                    className={`items-center   ${
                      pathname == item.href ? "-is-active" : ""
                    } `}
                  >
                    <i className={`${item.icon} mr15`} />
                    {item.text}
                  </Link>
                </div>
              ))}
            </div>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default DboardMobileNavigation;
