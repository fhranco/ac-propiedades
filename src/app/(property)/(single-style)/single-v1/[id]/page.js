import DefaultHeader from "@/components/common/DefaultHeader";
import Footer from "@/components/common/default-footer";
import MobileMenu from "@/components/common/mobile-menu";
import OverView from "@/components/property/property-single-style/common/OverView";
import PropertyAddress from "@/components/property/property-single-style/common/PropertyAddress";
import PropertyDetails from "@/components/property/property-single-style/common/PropertyDetails";
import PropertyFeaturesAminites from "@/components/property/property-single-style/common/PropertyFeaturesAminites";
import PropertyHeader from "@/components/property/property-single-style/common/PropertyHeader";
import ProperytyDescriptions from "@/components/property/property-single-style/common/ProperytyDescriptions";
import ContactWithAgent from "@/components/property/property-single-style/sidebar/ContactWithAgent";
import ScheduleTour from "@/components/property/property-single-style/sidebar/ScheduleTour";
import PropertyGallery from "@/components/property/property-single-style/single-v1/PropertyGallery";
import PropertyVideo from "@/components/property/property-single-style/common/PropertyVideo";
import VirtualTour360 from "@/components/property/property-single-style/common/VirtualTour360";
import React from "react";
import { supabase } from "@/lib/supabase";


export const metadata = {
  title: "Detalle de Propiedad || AC Propiedades Magallanes",
};

const SingleV1 = async ({ params }) => {
  // Obtener la propiedad directamente de Supabase en el servidor
  const { data: property, error } = await supabase
    .from("properties")
    .select("*")
    .eq("id", params.id)
    .single();

  if (error || !property) {
    return (
      <div className="container pt60 pb60 text-center">
        <h2>Propiedad no encontrada</h2>
        <p>No pudimos cargar la información de esta propiedad en este momento.</p>
      </div>
    );
  }

  return (
    <>
      {/* Main Header Nav */}
      <DefaultHeader />
      {/* End Main Header Nav */}

      {/* Mobile Nav  */}
      <MobileMenu />
      {/* End Mobile Nav  */}

      {/* Property All Single V1 */}
      <section className="pt60 pb90 bgc-f7">
        <div className="container">
          <div className="row">
            <PropertyHeader data={property} />
          </div>
          {/* End .row */}

          <div className="row mb30 mt30">
            <PropertyGallery data={property} />
          </div>
          {/* End .row */}

          <div className="row wrap">
            <div className="col-lg-8">
              <div className="ps-widget bgc-white bdrs12 default-box-shadow2 p30 mb30 overflow-hidden position-relative">
                <h4 className="title fz17 mb30">Resumen</h4>
                <div className="row">
                  <OverView data={property} />
                </div>
              </div>
              {/* End .ps-widget */}

              <div className="ps-widget bgc-white bdrs12 default-box-shadow2 p30 mb30 overflow-hidden position-relative">
                <h4 className="title fz17 mb30">Descripción de la Propiedad</h4>
                <ProperytyDescriptions data={property} />
                {/* End property description */}

                <h4 className="title fz17 mb30 mt50">Detalles de la Propiedad</h4>
                <div className="row">
                  <PropertyDetails data={property} />
                </div>
              </div>
              {/* End .ps-widget */}

              <div className="ps-widget bgc-white bdrs12 default-box-shadow2 p30 mb30 overflow-hidden position-relative">
                <h4 className="title fz17 mb30 mt30">Ubicación</h4>
                <div className="row">
                  <PropertyAddress data={property} />
                </div>
              </div>
              {/* End .ps-widget */}

              <div className="ps-widget bgc-white bdrs12 default-box-shadow2 p30 mb30 overflow-hidden position-relative">
                <h4 className="title fz17 mb30">Características y Comodidades</h4>
                <div className="row">
                  <PropertyFeaturesAminites data={property} />
                </div>
              </div>
              {/* End .ps-widget */}

              {/* Video de la Propiedad (Dinámico - se oculta si no está configurado) */}
              {property.video_url && (
                <div className="ps-widget bgc-white bdrs12 default-box-shadow2 p30 mb30">
                  <h4 className="title fz17 mb30">Video de la Propiedad</h4>
                  <div className="row">
                    <PropertyVideo data={property} />
                  </div>
                </div>
              )}

              {/* Recorrido Virtual 360° (Dinámico - se oculta si no está configurado) */}
              {property.tour_360_url && (
                <div className="ps-widget bgc-white bdrs12 default-box-shadow2 p30 mb30 overflow-hidden position-relative">
                  <h4 className="title fz17 mb30">Tour Virtual 360°</h4>
                  <div className="row">
                    <VirtualTour360 data={property} />
                  </div>
                </div>
              )}
            </div>
            {/* End .col-8 */}

            <div className="col-lg-4">
              <div className="column">
                <div className="default-box-shadow1 bdrs12 bdr1 p30 mb30-md bgc-white position-relative">
                  <h4 className="form-title mb5">Programar Visita</h4>
                  <p className="text">Elige tu día y hora preferida</p>
                  <ScheduleTour data={property} />
                </div>
                {/* End .Schedule a tour */}

                <div className="agen-personal-info position-relative bgc-white default-box-shadow1 bdrs12 p30 mt30">
                  <div className="widget-wrapper mb-0">
                    <h6 className="title fz17 mb30">Contactar con Agente</h6>
                    <ContactWithAgent 
                      propiedadId={params.id} 
                      propiedadTitulo={property.title} 
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* End .row */}
        </div>
        {/* End .container */}
      </section>
      {/* End Property All Single V1  */}

      {/* Start Our Footer */}
      <section className="footer-style1 pt60 pb-0">
        <Footer />
      </section>
      {/* End Our Footer */}
    </>
  );
};

export default SingleV1;
