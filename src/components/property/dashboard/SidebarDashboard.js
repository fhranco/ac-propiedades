"use client";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import { usePathname } from "next/navigation";

const SidebarDashboard = () => {
  const pathname = usePathname();
  const [visits, setVisits] = useState(0);

  useEffect(() => {
    // Cargar cantidad de visitas de propiedades para administradores
    fetch("/api/visitas")
      .then(res => res.json())
      .then(data => setVisits(data.length || 0))
      .catch(e => console.error(e));
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
      title: "GESTIONAR BLOG",
      items: [
        {
          href: "/dashboard-add-blog",
          icon: "flaticon-document",
          text: "Redactar Noticia",
        },
        {
          href: "/dashboard-my-blogs",
          icon: "flaticon-book",
          text: "Mis Noticias",
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
        {
          href: "/dashboard-agents",
          icon: "flaticon-user-1",
          text: "Gestionar agentes",
        },
        {
          href: "/dashboard-superadmin",
          icon: "flaticon-discovery",
          text: "Consola Superadmin",
        },
        {
          href: "/login",
          icon: "flaticon-logout",
          text: "Cerrar sesión",
        },
      ],
    },
  ];

  return (
    <div className="dashboard__sidebar d-none d-lg-block">
      <div className="dashboard_sidebar_list">
        {sidebarItems.map((section, sectionIndex) => (
          <div key={sectionIndex}>
            <p
              className={`fz15 fw400 ff-heading ${
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
        
        {/* Widget del contador de visitas universal */}
        <div className="mt40 p-3 bdrs12 text-center" style={{ background: "#f8f9fa", border: "1px dashed #e87722" }}>
          <span className="text-muted fz12 ff-heading fw500 d-block mb-1">Visitas Totales</span>
          <span className="fw600 text-thm fz20 d-block">{visits}</span>
        </div>
      </div>
    </div>
  );
};

export default SidebarDashboard;
