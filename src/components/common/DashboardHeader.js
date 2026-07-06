"use client";

import MainMenu from "@/components/common/MainMenu";
import SidebarPanel from "@/components/common/sidebar-panel";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

const DashboardHeader = () => {
  const pathname = usePathname();
  const [isAdmin, setIsAdmin] = useState(false);
  const [isSuperadmin, setIsSuperadmin] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    if (typeof window !== "undefined") {
      const session = localStorage.getItem("userSession");
      if (session) {
        const user = JSON.parse(session);
        if (user.role === "superadmin") {
          setIsSuperadmin(true);
          setIsAdmin(true);
        } else if (
          user.id === 1 ||
          user.email === "contacto@acpropiedades.cl" ||
          user.username === "patagoniacoach"
        ) {
          setIsSuperadmin(true);
          setIsAdmin(true);
        } else if (user.role === "admin") {
          setIsAdmin(true);
        }
      }
    }
  }, []);

  const menuItems = [
    {
      title: "PRINCIPAL",
      items: [
        {
          icon: "flaticon-discovery",
          text: "Panel de control",
          href: "/dashboard-home",
        },
        {
          icon: "flaticon-chat-1",
          text: "Mensajes",
          href: "/dashboard-message",
        },
      ],
    },
    {
      title: "GESTIONAR PROPIEDADES",
      items: [
        {
          icon: "flaticon-new-tab",
          text: "Agregar propiedad",
          href: "/dashboard-add-property",
        },
        {
          icon: "flaticon-home",
          text: "Mis propiedades",
          href: "/dashboard-my-properties",
        },
        {
          icon: "flaticon-like",
          text: "Mis favoritos",
          href: "/dashboard-my-favourites",
        },
      ],
    },
    {
      title: "GESTIONAR CUENTA",
      items: [
        {
          icon: "flaticon-user",
          text: "Mi perfil",
          href: "/dashboard-my-profile",
        },
        ...(isSuperadmin ? [{
          icon: "flaticon-discovery",
          text: "Consola Superadmin",
          href: "/dashboard-superadmin",
        }] : []),
        { icon: "flaticon-exit", text: "Cerrar sesión", href: "/login" },
      ],
    },
  ];

  return (
    <>
      <header className="header-nav nav-homepage-style light-header position-fixed menu-home4 main-menu">
        <nav className="posr">
          <div className="container-fluid pr30 pr15-xs pl30 posr menu_bdrt1">
            <div className="row align-items-center justify-content-between">
              <div className="col-6 col-lg-auto">
                <div className="text-center text-lg-start d-flex align-items-center">
                  <div className="dashboard_header_logo position-relative me-2 me-xl-5">
                    <Link className="logo" href="/">
                      <Image style={{ objectFit: "contain" }}
                        width={80}
                        height={80}
                        src="/images/Logo.png"
                        alt="Header Logo"
                      />
                    </Link>
                  </div>
                  {/* End Logo */}

                  <a
                    className="dashboard_sidebar_toggle_icon text-thm1 vam"
                    href="#"
                    data-bs-toggle="offcanvas"
                    data-bs-target="#SidebarPanel"
                    aria-controls="SidebarPanelLabel"
                  >
                    <Image
                      width={25}
                      height={9}
                      className="img-1"
                      src="/images/dark-nav-icon.svg"
                      alt="humberger menu"
                    />
                  </a>
                </div>
              </div>
              {/* End .col-auto */}

              <div className="d-none d-lg-block col-lg-auto">
                <MainMenu />
                {/* End Main Menu */}
              </div>
              {/* End d-none d-lg-block */}

              <div className="col-6 col-lg-auto">
                <div className="text-center text-lg-end header_right_widgets">
                  <ul className="mb0 d-flex align-items-center justify-content-center justify-content-sm-end p-0" style={{ gap: "10px" }}>
                    {mounted && isAdmin && (
                      <li className="d-none d-sm-block">
                        <Link 
                          className="ud-btn btn-white2" 
                          href="/dashboard-agents"
                          style={{ padding: "6px 14px", fontSize: "12px", border: "1px dashed #e87722", borderRadius: "30px", color: "#e87722" }}
                          title="Crear un nuevo agente en el sistema"
                        >
                          <i className="fas fa-user-plus me-1" /> Gestionar Agentes
                        </Link>
                      </li>
                    )}

                    <li className="d-none d-sm-block">
                      <a 
                        href="#" 
                        onClick={() => {
                          localStorage.removeItem("userSession");
                          document.cookie = "userSession=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC; SameSite=Lax";
                          window.location.reload();
                        }}
                        className="text-center mr10 text-danger" 
                        title="Cerrar sesión"
                        style={{ fontSize: "16px" }}
                      >
                        <span className="flaticon-logout" />
                      </a>
                    </li>
                    {/* End logout box */}

                    <li className=" user_setting">
                      <div className="dropdown">
                        <a className="btn" href="#" data-bs-toggle="dropdown">
                          <Image
                            width={44}
                            height={44}
                            src="/images/resource/user.png"
                            alt="user.png"
                          />
                        </a>
                        <div className="dropdown-menu">
                          <div className="user_setting_content">
                            {menuItems.map((section, sectionIndex) => (
                              <div key={sectionIndex}>
                                <p
                                  className={`fz15 fw400 ff-heading ${
                                    sectionIndex === 0 ? "mb20" : "mt30"
                                  }`}
                                >
                                  {section.title}
                                </p>
                                {section.items.map((item, itemIndex) => {
                                  return (
                                    <Link
                                      key={itemIndex}
                                      className={`dropdown-item ${
                                        pathname == item.href ? "-is-active" : ""
                                      } `}
                                      href={item.href}
                                      onClick={item.href === "/login" ? () => {
                                        localStorage.removeItem("userSession");
                                        document.cookie = "userSession=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC; SameSite=Lax";
                                      } : undefined}
                                    >
                                      <i className={`${item.icon} mr10`} />
                                      {item.text}
                                    </Link>
                                  );
                                })}
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </li>
                    {/* End avatar dropdown */}
                  </ul>
                </div>
              </div>
              {/* End .col-6 */}
            </div>
            {/* End .row */}
          </div>
        </nav>
      </header>
      {/* End Header */}

      {/* DesktopSidebarMenu */}
      <div
        className="offcanvas offcanvas-end"
        tabIndex="-1"
        id="SidebarPanel"
        aria-labelledby="SidebarPanelLabel"
      >
        <SidebarPanel />
      </div>
      {/* Sidebar Panel End */}
    </>
  );
};

export default DashboardHeader;
