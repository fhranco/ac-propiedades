"use client";
import React, { useState, useEffect } from "react";
import DashboardHeader from "@/components/common/DashboardHeader";
import MobileMenu from "@/components/common/mobile-menu";
import DboardMobileNavigation from "@/components/property/dashboard/DboardMobileNavigation";
import Footer from "@/components/property/dashboard/Footer";
import SidebarDashboard from "@/components/property/dashboard/SidebarDashboard";

const DashboardSuperadmin = () => {
  const [role, setRole] = useState(null);
  const [mounted, setMounted] = useState(false);
  const [logs, setLogs] = useState([]);
  const [newLogMsg, setNewLogMsg] = useState("");
  const [newLogType, setNewLogType] = useState("info");
  const [newLogDetails, setNewLogDetails] = useState("");
  const [loading, setLoading] = useState(true);
  const [visitsCount, setVisitsCount] = useState(0);
  const [visitsRanking, setVisitsRanking] = useState([]);

  const fetchLogs = async () => {
    try {
      const res = await fetch("/api/logs-desarrollo");
      if (res.ok) {
        const data = await res.json();
        setLogs(data);
      }
    } catch (e) {
      console.error(e);
    }
  };

  const fetchVisits = async () => {
    try {
      const res = await fetch("/api/visitas");
      if (res.ok) {
        const data = await res.json();
        setVisitsCount(data.length || 0);
      }
      
      const resRank = await fetch("/api/visitas?agrupado=true");
      if (resRank.ok) {
        const dataRank = await resRank.json();
        setVisitsRanking(dataRank);
      }
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    setMounted(true);
    Promise.all([fetchLogs(), fetchVisits()]).finally(() => setLoading(false));
  }, []);

  const handleAddLog = async (e) => {
    e.preventDefault();
    if (!newLogMsg.trim()) return;

    try {
      const res = await fetch("/api/logs-desarrollo", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: newLogType,
          message: newLogMsg,
          details: newLogDetails,
        }),
      });

      if (res.ok) {
        setNewLogMsg("");
        setNewLogDetails("");
        fetchLogs();
      }
    } catch (e) {
      console.error(e);
    }
  };

  if (!mounted || loading) {
    return (
      <div className="text-center py-5">
        <div className="spinner-border text-thm" role="status" />
        <p className="mt-2 text-muted">Cargando herramientas del sistema...</p>
      </div>
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
                    <h2>Herramientas de Superadministrador</h2>
                    <p className="text">Monitoreo de logs de desarrollo, diagnóstico de errores del sistema y métricas globales.</p>
                  </div>
                </div>
              </div>

              {/* Estadísticas de Visitas */}
              <div className="row mb30">
                <div className="col-sm-6 col-xxl-4">
                  <div className="d-flex align-items-center justify-content-between p-4 bgc-white bdrs12 default-box-shadow2">
                    <div>
                      <h4 className="title mb5">{visitsCount}</h4>
                      <p className="text mb0">Visitas Totales en Propiedades</p>
                    </div>
                    <div className="icon"><i className="flaticon-discovery text-thm fz35" /></div>
                  </div>
                </div>
              </div>

              <div className="row">
                {/* Registrador de Logs de Desarrollo */}
                <div className="col-xl-4 mb30">
                  <div className="ps-widget bgc-white bdrs12 default-box-shadow2 p30 h-100">
                    <h4 className="title fz17 mb30">Registrar Evento / Log de Desarrollo</h4>
                    <form onSubmit={handleAddLog} className="form-style1">
                      <div className="mb20">
                        <label className="heading-color ff-heading fw600 mb10">Tipo de Evento</label>
                        <select
                          className="form-select"
                          value={newLogType}
                          onChange={(e) => setNewLogType(e.target.value)}
                        >
                          <option value="info">Info / Sistema</option>
                          <option value="dev">Desarrollo / Task</option>
                          <option value="error">Error / Bug</option>
                        </select>
                      </div>
                      <div className="mb20">
                        <label className="heading-color ff-heading fw600 mb10">Mensaje</label>
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Ej: Servidor de base de datos migrado"
                          value={newLogMsg}
                          onChange={(e) => setNewLogMsg(e.target.value)}
                          required
                        />
                      </div>
                      <div className="mb25">
                        <label className="heading-color ff-heading fw600 mb10">Detalles adicionales</label>
                        <textarea
                          className="form-control"
                          rows={4}
                          placeholder="Detalles técnicos, stack traces o configuraciones..."
                          value={newLogDetails}
                          onChange={(e) => setNewLogDetails(e.target.value)}
                        />
                      </div>
                      <button type="submit" className="ud-btn btn-dark w-100">
                        Añadir a Consola de Logs
                      </button>
                    </form>
                  </div>
                </div>

                {/* Consola de logs en tiempo real */}
                <div className="col-xl-8 mb30">
                  <div className="ps-widget bgc-white bdrs12 default-box-shadow2 p30 h-100">
                    <div className="d-flex align-items-center justify-content-between mb30">
                      <h4 className="title fz17 mb0">Logs del Sistema y Desarrollo</h4>
                      <button className="btn btn-sm btn-light" onClick={fetchLogs}>
                        <i className="fas fa-arrows-rotate me-1" /> Refrescar
                      </button>
                    </div>

                    <div style={{ maxHeight: "400px", overflowY: "auto", fontFamily: "monospace", fontSize: "13px" }}>
                      {logs.length === 0 ? (
                        <p className="text-muted italic">No hay logs registrados en el sistema.</p>
                      ) : (
                        logs.map((log) => {
                          let badgeBg = "#18a0fb";
                          if (log.type === "error") badgeBg = "#eb4132";
                          if (log.type === "dev") badgeBg = "#e87722";

                          return (
                            <div key={log.id} className="p-3 mb2 border bdrs8" style={{ background: "#fafafa" }}>
                              <div className="d-flex align-items-center justify-content-between mb-2">
                                <span className="badge" style={{ background: badgeBg, color: "#fff" }}>
                                  {log.type.toUpperCase()}
                                </span>
                                <span className="text-muted fz11">{new Date(log.timestamp).toLocaleString()}</span>
                              </div>
                              <div className="fw600 heading-color mb-1">{log.message}</div>
                              {log.details && (
                                <pre className="p-2 bg-dark text-white rounded mb-0 mt-2" style={{ whiteSpace: "pre-wrap", fontSize: "11px" }}>
                                  {log.details}
                                </pre>
                              )}
                            </div>
                          );
                        })
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Ranking de Visitas por Propiedad */}
              <div className="row">
                <div className="col-12">
                  <div className="ps-widget bgc-white bdrs12 default-box-shadow2 p30">
                    <h4 className="title fz17 mb30">Métricas de Visitas por Propiedad</h4>
                    <div className="table-responsive">
                      <table className="table">
                        <thead>
                          <tr>
                            <th>Propiedad</th>
                            <th className="text-center">Vistas</th>
                            <th>ID</th>
                          </tr>
                        </thead>
                        <tbody>
                          {visitsRanking.length === 0 ? (
                            <tr>
                              <td colSpan={3} className="text-center text-muted">No se registran visitas aún.</td>
                            </tr>
                          ) : (
                            visitsRanking.map((p) => (
                              <tr key={p.id}>
                                <td>{p.title}</td>
                                <td className="text-center fw600 text-thm">{p.visitas}</td>
                                <td>{p.id}</td>
                              </tr>
                            ))
                          )}
                        </tbody>
                      </table>
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

export default DashboardSuperadmin;
