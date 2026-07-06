"use client";
import React, { useState } from "react";
import DashboardHeader from "@/components/common/DashboardHeader";
import MobileMenu from "@/components/common/mobile-menu";
import Footer from "@/components/property/dashboard/Footer";
import SidebarDashboard from "@/components/property/dashboard/SidebarDashboard";

export default function ImportPropertiesPage() {
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) {
      setMessage("Por favor seleccione un archivo CSV o XLSX.");
      return;
    }
    setLoading(true);
    setMessage("");
    const formData = new FormData();
    formData.append("file", file);
    try {
      const res = await fetch("/api/propiedades/import", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      if (res.ok) {
        setMessage(`Importación exitosa: ${data.imported} propiedades importadas.`);
      } else {
        setMessage(`Error: ${data.error || "Error inesperado"}`);
      }
    } catch (err) {
      console.error(err);
      setMessage("Error al conectar con el servidor.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="dashboard">
      <DashboardHeader />
      <MobileMenu />
      <section className="dashboard__area pt-130 pb-130">
        <div className="container-fluid">
          <div className="row">
            <div className="col-lg-3 col-xl-2">
              <SidebarDashboard />
            </div>
            <div className="col-lg-9 col-xl-10">
              <h2 className="heading-color ff-heading fw600 mb30">Importar propiedades</h2>
              <form onSubmit={handleSubmit} className="upload-form">
                <div className="mb-3">
                  <label htmlFor="file" className="form-label">
                    Seleccione archivo CSV o XLSX:
                  </label>
                  <input
                    type="file"
                    id="file"
                    accept=".csv,.xlsx"
                    className="form-control"
                    onChange={(e) => setFile(e.target.files[0])}
                  />
                </div>
                <button type="submit" className="btn btn-primary" disabled={loading}>
                  {loading ? "Importando..." : "Importar"}
                </button>
                {message && <p className="mt-3">{message}</p>}
              </form>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}
