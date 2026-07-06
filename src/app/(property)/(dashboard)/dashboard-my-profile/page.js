"use client";
import DashboardHeader from "@/components/common/DashboardHeader";
import MobileMenu from "@/components/common/mobile-menu";
import DboardMobileNavigation from "@/components/property/dashboard/DboardMobileNavigation";
import Footer from "@/components/property/dashboard/Footer";
import SidebarDashboard from "@/components/property/dashboard/SidebarDashboard";
import ChangePasswordForm from "@/components/property/dashboard/dashboard-profile/ChangePasswordForm";
import PersonalInfo from "@/components/property/dashboard/dashboard-profile/PersonalInfo";
import ProfileBox from "@/components/property/dashboard/dashboard-profile/ProfileBox";
import SocialField from "@/components/property/dashboard/dashboard-profile/SocialField";
import React, { useState, useEffect } from "react";

const DashboardMyProfile = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetch("/api/agentes")
      .then((r) => r.json())
      .then((data) => {
        if (Array.isArray(data)) {
          // Obtener usuario activo del localStorage
          const session = localStorage.getItem("userSession");
          if (session) {
            const userObj = JSON.parse(session);
            const found = data.find((a) => a.id === userObj.id || a.email === userObj.email);
            if (found) {
              setProfile(found);
              return;
            }
          }
          // Fallback al primer agente si no hay sesión
          if (data.length > 0) {
            setProfile(data[0]);
          }
        }
      })
      .catch((err) => console.error("Error loading agent info", err))
      .finally(() => setLoading(false));
  }, []);

  const handleUpdate = async (updates) => {
    if (!profile) return;
    setSaving(true);
    setMessage("");
    try {
      const res = await fetch("/api/agentes", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: profile.id, updates }),
      });
      if (res.ok) {
        const updated = await res.json();
        setProfile(updated);
        setMessage("Perfil guardado con éxito.");
        setTimeout(() => setMessage(""), 4000);
      } else {
        setMessage("Error al intentar guardar los cambios.");
      }
    } catch (e) {
      setMessage("Error al conectar con el servidor.");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="text-center py-5">
        <div className="spinner-border text-thm" role="status" />
        <p className="mt-2 text-muted">Cargando perfil...</p>
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
                    <h2>Mi perfil</h2>
                    <p className="text">¡Nos alegra verte de nuevo!</p>
                  </div>
                </div>
              </div>

              {message && (
                <div className="row mb-3">
                  <div className="col-12">
                    <div className={`alert ${message.includes("éxito") ? "alert-success" : "alert-danger"}`}>
                      {message}
                    </div>
                  </div>
                </div>
              )}

              <div className="row">
                <div className="col-xl-12">
                  <div className="ps-widget bgc-white bdrs12 default-box-shadow2 p30 mb30 overflow-hidden position-relative">
                    <div className="col-xl-7">
                      <ProfileBox
                        imageUrl={profile?.image}
                        onUpload={(base64) => handleUpdate({ image: base64 })}
                        onDelete={() => handleUpdate({ image: null })}
                      />
                    </div>

                    <div className="col-lg-12">
                      <PersonalInfo
                        data={profile}
                        onSave={handleUpdate}
                        saving={saving}
                      />
                    </div>
                  </div>

                  <div className="ps-widget bgc-white bdrs12 default-box-shadow2 p30 mb30 overflow-hidden position-relative">
                    <h4 className="title fz17 mb30">Redes sociales</h4>
                    <SocialField
                      data={profile}
                      onSave={handleUpdate}
                      saving={saving}
                    />
                  </div>

                  <div className="ps-widget bgc-white bdrs12 default-box-shadow2 p30 mb30 overflow-hidden position-relative">
                    <h4 className="title fz17 mb30">Cambiar contraseña</h4>
                    <ChangePasswordForm />
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

export default DashboardMyProfile;
