"use client";
import React, { useEffect, useState } from "react";
import DashboardHeader from "@/components/common/DashboardHeader";
import MobileMenu from "@/components/common/mobile-menu";
import DboardMobileNavigation from "@/components/property/dashboard/DboardMobileNavigation";
import Footer from "@/components/property/dashboard/Footer";
import SidebarDashboard from "@/components/property/dashboard/SidebarDashboard";

const DashboardMessage = () => {
  const [rankingData, setRankingData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRanking = async () => {
      try {
        const res = await fetch("/api/mensajes?agrupado=true");
        if (res.ok) {
          const data = await res.json();
          setRankingData(data);
        }
      } catch (err) {
        console.error("Error al obtener ranking de mensajes:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchRanking();
  }, []);

  const totalClicks = rankingData.reduce((acc, curr) => acc + curr.clics, 0);

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

                <div className="col-lg-12">
                  <div className="dashboard_title_area">
                    <h2>Monitor de Contactos (WhatsApp)</h2>
                    <p className="text">Análisis de interés y clics de contacto sin almacenamiento de datos personales.</p>
                  </div>
                </div>
              </div>

              <div className="row mb40">
                {/* Indicador General */}
                <div className="col-md-4 mb30">
                  <div className="d-flex justify-content-between statistics_funfact bgc-white p30 bdrs12 default-box-shadow2">
                    <div className="details">
                      <div className="text fz15 text-muted">Total Clics WhatsApp</div>
                      <div className="title fz25 fw600">{totalClicks}</div>
                    </div>
                    <div className="icon text-center" style={{ backgroundColor: "#25D366", color: "#fff" }}>
                      <i className="fab fa-whatsapp" />
                    </div>
                  </div>
                </div>

                {/* Tabla de Clics por Propiedad */}
                <div className="col-lg-12">
                  <div className="ps-widget bgc-white bdrs12 default-box-shadow2 p30 mb30">
                    <h4 className="title fz17 mb20">Interés de Contacto por Propiedad</h4>
                    {loading ? (
                      <div className="text-center py-5">Cargando métricas de contacto...</div>
                    ) : rankingData.length === 0 ? (
                      <div className="text-center py-5 text-muted">
                        No hay registros de contacto aún.
                      </div>
                    ) : (
                      <div className="table-responsive">
                        <table className="table table-hover">
                          <thead className="table-light">
                            <tr>
                              <th>Propiedad</th>
                              <th className="text-center" style={{ width: "150px" }}>Clics de WhatsApp</th>
                            </tr>
                          </thead>
                          <tbody>
                            {rankingData.map((item) => (
                              <tr key={item.id}>
                                <td>{item.title}</td>
                                <td className="text-center fw600 text-thm">{item.clics}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    )}
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

export default DashboardMessage;
