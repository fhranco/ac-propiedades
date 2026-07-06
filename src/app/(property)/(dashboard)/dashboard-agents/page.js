"use client";
import React, { useState, useEffect, useCallback } from "react";
import DashboardHeader from "@/components/common/DashboardHeader";
import MobileMenu from "@/components/common/mobile-menu";
import DboardMobileNavigation from "@/components/property/dashboard/DboardMobileNavigation";
import Footer from "@/components/property/dashboard/Footer";
import SidebarDashboard from "@/components/property/dashboard/SidebarDashboard";

const DashboardAgents = () => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [agents, setAgents] = useState([]);
  const [loading, setLoading] = useState(true);

  // Formulario nuevo agente
  const [form, setForm] = useState({
    username: "",
    password: "",
    email: "",
    phoneNumber: "",
    firstName: "",
    lastName: "",
    rut: "",
    position: "Agente Inmobiliario",
    language: "Español",
    companyName: "AC Propiedades Magallanes",
    address: "",
    aboutMe: "",
    facebook: "",
    instagram: "",
    linkedin: "",
    website: ""
  });
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  const loadAgents = useCallback(async () => {
    try {
      const res = await fetch("/api/agentes");
      if (res.ok) {
        const data = await res.json();
        setAgents(data);
      }
    } catch (err) {
      console.error("Error al cargar agentes", err);
    }
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined") {
      import("@/utils/supabase/client").then(({ createClient }) => {
        const supabase = createClient();
        supabase.auth.getUser().then(({ data: { user } }) => {
          if (user) {
            setCurrentUser(user);
            if (user.email === "contacto@acpropiedades.cl" || user.email === "acpropiedades@protonmail.com") {
              setIsAdmin(true);
            }
          }
        });
      });
    }
    loadAgents().finally(() => setLoading(false));
  }, [loadAgents]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setMessage("");

    try {
      const res = await fetch("/api/agentes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          id: Date.now(),
          image: "/images/listings/profile-1.jpg"
        })
      });

      if (res.ok) {
        setMessage("Agente creado exitosamente.");
        setForm({
          username: "",
          password: "",
          email: "",
          phoneNumber: "",
          firstName: "",
          lastName: "",
          rut: "",
          position: "Agente Inmobiliario",
          language: "Español",
          companyName: "AC Propiedades Magallanes",
          address: "",
          aboutMe: "",
          facebook: "",
          instagram: "",
          linkedin: "",
          website: ""
        });
        loadAgents();
      } else {
        setMessage("Error al intentar crear el agente.");
      }
    } catch (err) {
      setMessage("Error de conexión.");
    } finally {
      setSaving(false);
    }
  };

  const handleDeleteAgent = async (id) => {
    if (id === 1) {
      alert("No se puede eliminar el administrador principal.");
      return;
    }
    if (!confirm("¿Estás seguro de que deseas eliminar este agente?")) return;

    try {
      const res = await fetch("/api/agentes", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id })
      });
      if (res.ok) {
        loadAgents();
      } else {
        alert("Error al eliminar el agente.");
      }
    } catch (err) {
      alert("Error de conexión.");
    }
  };

  if (loading) {
    return (
      <div className="text-center py-5">
        <div className="spinner-border text-thm" role="status" />
        <p className="mt-2 text-muted">Cargando...</p>
      </div>
    );
  }

  // Si no es admin
  if (!isAdmin) {
    return (
      <>
        <DashboardHeader />
        <MobileMenu />
        <div className="dashboard_content_wrapper">
          <div className="dashboard dashboard_wrapper pr30 pr0-xl">
            <SidebarDashboard />
            <div className="dashboard__main pl0-md">
              <div className="dashboard__content bgc-f7 text-center py-5">
                <div className="alert alert-warning d-inline-block p-4 mt-5 bdrs12">
                  <h4>⚠️ Acceso Restringido</h4>
                  <p className="mb-0">Esta sección es de uso exclusivo para el Administrador de la plataforma.</p>
                </div>
              </div>
              <Footer />
            </div>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <DashboardHeader />
      <MobileMenu />

      <div className="dashboard_content_wrapper">
        <div className="dashboard dashboard_wrapper pr30 pr0-xl">
          <SidebarDashboard />

          <div className="dashboard__main pl0-md">
            <div className="dashboard__content bgc-f7">
              <div className="row pb40">
                <div className="col-lg-12">
                  <DboardMobileNavigation />
                </div>
              </div>

              <div className="row align-items-center pb40">
                <div className="col-lg-12">
                  <div className="dashboard_title_area">
                    <h2>Gestión de Agentes</h2>
                    <p className="text">Crea y administra las cuentas de tus agentes locales.</p>
                  </div>
                </div>
              </div>

              {message && (
                <div className="alert alert-success bdrs12 mb30" role="alert">
                  {message}
                </div>
              )}

              <div className="row">
                {/* Formulario de creación (lado izquierdo) */}
                <div className="col-xl-5">
                  <div className="ps-widget bgc-white bdrs12 default-box-shadow2 p30 mb30">
                    <h4 className="title fz17 mb30">Crear Nuevo Agente</h4>
                    <form onSubmit={handleSubmit} className="form-style1">
                      <div className="row">
                        <div className="col-sm-6 mb15">
                          <label className="heading-color ff-heading fw600 mb10">Usuario (Login)</label>
                          <input type="text" name="username" value={form.username} onChange={handleChange} className="form-control" placeholder="Ej: juan.perez" required />
                        </div>
                        <div className="col-sm-6 mb15">
                          <label className="heading-color ff-heading fw600 mb10">Contraseña</label>
                          <input type="password" name="password" value={form.password} onChange={handleChange} className="form-control" placeholder="Contraseña de acceso" required />
                        </div>
                        <div className="col-sm-6 mb15">
                          <label className="heading-color ff-heading fw600 mb10">Nombre</label>
                          <input type="text" name="firstName" value={form.firstName} onChange={handleChange} className="form-control" placeholder="Juan" required />
                        </div>
                        <div className="col-sm-6 mb15">
                          <label className="heading-color ff-heading fw600 mb10">Apellido</label>
                          <input type="text" name="lastName" value={form.lastName} onChange={handleChange} className="form-control" placeholder="Pérez" required />
                        </div>
                        <div className="col-sm-12 mb15">
                          <label className="heading-color ff-heading fw600 mb10">Correo electrónico</label>
                          <input type="email" name="email" value={form.email} onChange={handleChange} className="form-control" placeholder="juan@acpropiedades.cl" required />
                        </div>
                        <div className="col-sm-6 mb15">
                          <label className="heading-color ff-heading fw600 mb10">Teléfono</label>
                          <input type="text" name="phoneNumber" value={form.phoneNumber} onChange={handleChange} className="form-control" placeholder="+56 9 ..." required />
                        </div>
                        <div className="col-sm-6 mb15">
                          <label className="heading-color ff-heading fw600 mb10">RUT</label>
                          <input type="text" name="rut" value={form.rut} onChange={handleChange} className="form-control" placeholder="12.345.678-9" required />
                        </div>
                        <div className="col-sm-6 mb15">
                          <label className="heading-color ff-heading fw600 mb10">Cargo</label>
                          <input type="text" name="position" value={form.position} onChange={handleChange} className="form-control" required />
                        </div>
                        <div className="col-sm-6 mb15">
                          <label className="heading-color ff-heading fw600 mb10">Idioma</label>
                          <input type="text" name="language" value={form.language} onChange={handleChange} className="form-control" required />
                        </div>
                        <div className="col-12 mb15">
                          <label className="heading-color ff-heading fw600 mb10">Dirección</label>
                          <input type="text" name="address" value={form.address} onChange={handleChange} className="form-control" placeholder="Punta Arenas" required />
                        </div>

                        {/* Redes Sociales */}
                        <div className="col-12 mb15">
                          <h6 className="heading-color ff-heading fw600 mb10 border-bottom pb-1 fz14">Redes sociales</h6>
                          <div className="row g-2">
                            <div className="col-6">
                              <input type="text" name="facebook" value={form.facebook} onChange={handleChange} className="form-control form-control-sm" placeholder="Facebook URL" />
                            </div>
                            <div className="col-6">
                              <input type="text" name="instagram" value={form.instagram} onChange={handleChange} className="form-control form-control-sm" placeholder="Instagram URL" />
                            </div>
                            <div className="col-6">
                              <input type="text" name="linkedin" value={form.linkedin} onChange={handleChange} className="form-control form-control-sm" placeholder="LinkedIn URL" />
                            </div>
                            <div className="col-6">
                              <input type="text" name="website" value={form.website} onChange={handleChange} className="form-control form-control-sm" placeholder="Sitio Web" />
                            </div>
                          </div>
                        </div>

                        <div className="col-12 mb20">
                          <label className="heading-color ff-heading fw600 mb10">Sobre el agente</label>
                          <textarea name="aboutMe" value={form.aboutMe} onChange={handleChange} className="form-control" rows={3} placeholder="Breve reseña profesional..." />
                        </div>
                        <div className="col-12 text-end">
                          <button type="submit" className="ud-btn btn-dark w-100" disabled={saving}>
                            {saving ? "Guardando..." : "Crear Agente"}
                          </button>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>

                {/* Listado de Agentes (lado derecho) */}
                <div className="col-xl-7">
                  <div className="ps-widget bgc-white bdrs12 default-box-shadow2 p30 mb30">
                    <h4 className="title fz17 mb30">Agentes Registrados</h4>
                    <div className="row">
                      {agents.map((agent) => (
                        <div key={agent.id} className="col-md-6 mb20">
                          <div className="p-3 border bdrs12 h-100 d-flex flex-column justify-content-between" style={{ background: "#fafafa" }}>
                            <div>
                              <div className="d-flex align-items-center gap-2 mb-2">
                                <span className="badge" style={{ background: agent.id === 1 ? "#e87722" : "#444", color: "#fff" }}>
                                  {agent.id === 1 ? "Administrador" : "Agente"}
                                </span>
                                <span className="fz12 text-muted">ID: {agent.id}</span>
                              </div>
                              <h6 className="title fz15 mb5">{agent.firstName} {agent.lastName}</h6>
                              <p className="text mb5 fz13"><i className="far fa-envelope me-1" /> {agent.email}</p>
                              <p className="text mb5 fz13"><i className="fas fa-phone me-1" /> {agent.phoneNumber}</p>
                              <p className="text mb5 fz13"><i className="far fa-id-card me-1" /> RUT: {agent.rut}</p>
                              <p className="text mb10 fz13"><i className="fas fa-briefcase me-1" /> {agent.position}</p>
                            </div>
                            
                            {agent.id !== 1 && (
                              <div className="text-end pt-2 border-top">
                                <button
                                  type="button"
                                  onClick={() => handleDeleteAgent(agent.id)}
                                  className="btn btn-sm btn-outline-danger bdrs30 py-1"
                                >
                                  <i className="far fa-trash-can me-1" /> Eliminar
                                </button>
                              </div>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <Footer />
          </div>
        </div>
      </div>
    </>
  );
};

export default DashboardAgents;
