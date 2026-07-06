import DefaultHeader from "@/components/common/DefaultHeader";
import MobileMenu from "@/components/common/mobile-menu";
import Copyright from "@/components/common/default-footer/Copyright";
import ListingMap1 from "@/components/listing/map-style/ListingMap1";
import React, { Suspense } from "react";

export const metadata = {
  title: "Mapa de Propiedades | AC Propiedades Magallanes",
};

const MapV1 = () => {
  return (
    <>
      <DefaultHeader />
      <MobileMenu />

      <Suspense fallback={
        <div className="d-flex flex-column align-items-center justify-content-center" style={{ minHeight: "80vh" }}>
          <div className="spinner-border text-thm" role="status">
            <span className="visually-hidden">Cargando...</span>
          </div>
          <p className="mt-2 text-muted">Cargando mapa...</p>
        </div>
      }>
        <div style={{ height: "80vh", width: "100%", position: "relative", zIndex: 1 }}>
          <ListingMap1 />
        </div>
      </Suspense>

      {/* Minimal Footer / Bottom bar */}
      <section className="footer-style1 pt20 pb20" style={{ background: "#1d293f" }}>
        <div className="container">
          <Copyright />
        </div>
      </section>
      {/* End Minimal Footer */}
    </>
  );
};

export default MapV1;
