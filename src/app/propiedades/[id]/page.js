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
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

// Generar metadatos dinámicos basados en la propiedad de Supabase para SEO (Google y LLMs)
export async function generateMetadata({ params }) {
  const { data: property } = await supabase
    .from("properties")
    .select("title, seo_title, description, seo_description, images, price")
    .eq("id", params.id)
    .single();

  const title = property?.seo_title || property?.title || "Propiedad || AC Propiedades Magallanes";
  const description = property?.seo_description || property?.description || "Detalle de propiedad en Magallanes";
  
  // Extraer la primera imagen para Open Graph (redes sociales y LLMs)
  let shareImage = "/images/og-default.jpg";
  if (property?.images) {
    if (Array.isArray(property.images) && property.images.length > 0) {
      shareImage = property.images[0];
    } else if (typeof property.images === "string") {
      try {
        const parsed = JSON.parse(property.images);
        if (parsed.length > 0) shareImage = parsed[0];
      } catch {}
    }
  }

  return {
    title: title,
    description: description,
    openGraph: {
      title: title,
      description: description,
      images: [
        {
          url: shareImage,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
      type: "website",
    },
    other: {
      "product:price:amount": property?.price || 0,
      "product:price:currency": "CLP",
    }
  };
}

const PropertyTemplate = async ({ params }) => {
  // Obtener los datos reales de la propiedad desde Supabase
  const { data: property, error } = await supabase
    .from("properties")
    .select("*")
    .eq("id", params.id)
    .single();

  if (error || !property) {
    return (
      <>
        <DefaultHeader />
        <MobileMenu />
        <div className="container pt60 pb60 text-center" style={{ minHeight: "50vh" }}>
          <h2 className="mt50">Propiedad no encontrada</h2>
          <p className="text">No pudimos cargar la información de esta propiedad. Verifica el enlace o vuelve al inicio.</p>
        </div>
        <Footer />
      </>
    );
  }

  // Sincronizar estructura Schema.org JSON-LD para indexación inteligente (Google y LLMs)
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SingleFamilyResidence",
    "name": property.title,
    "description": property.description,
    "image": property.images ? (Array.isArray(property.images) ? property.images[0] : property.images) : "",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": property.address || "",
      "addressLocality": property.city || "Punta Arenas",
      "addressRegion": property.region || "Magallanes",
      "addressCountry": "CL"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": property.latitude || "",
      "longitude": property.longitude || ""
    },
    "offers": {
      "@type": "Offer",
      "priceCurrency": "CLP",
      "price": property.price,
      "availability": "https://schema.org/InStock"
    },
    "numberOfRooms": property.bedrooms || 0,
    "numberOfBathroomsTotal": property.bathrooms || 0,
    "floorSize": {
      "@type": "QuantitativeValue",
      "value": property.area || 0,
      "unitCode": "MTK"
    },
    "additionalProperty": [
      {
        "@type": "PropertyValue",
        "name": "Tipo de Uso",
        "value": property.uso_tipo || "Residencial"
      },
      {
        "@type": "PropertyValue",
        "name": "Sector/Barrio",
        "value": property.sector_barrio || ""
      }
    ]
  };

  // Verificar si hay amenities cargadas
  let hasAmenities = false;
  if (property.amenities) {
    if (Array.isArray(property.amenities) && property.amenities.length > 0) {
      hasAmenities = true;
    } else if (typeof property.amenities === "string" && property.amenities.trim().length > 0) {
      hasAmenities = true;
    }
  }

  return (
    <>
      {/* Insertar JSON-LD de datos estructurados para Google e Inteligencias Artificiales (LLMs) */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <DefaultHeader />
      <MobileMenu />

      <section className="pt60 pb90 bgc-f7">
        <div className="container">
          {/* Encabezado Principal Dinámico */}
          <div className="row">
            <PropertyHeader data={property} />
          </div>

          {/* Galería de Imágenes Dinámica */}
          {property.images && (
            <div className="row mb30 mt30">
              <PropertyGallery data={property} />
            </div>
          )}

          <div className="row wrap">
            <div className="col-lg-8">
              {/* Resumen de características básicas */}
              <div className="ps-widget bgc-white bdrs12 default-box-shadow2 p30 mb30 overflow-hidden position-relative">
                <h4 className="title fz17 mb30">Resumen</h4>
                <div className="row">
                  <OverView data={property} />
                </div>
              </div>

              {/* Descripción y Detalles de la Propiedad */}
              {(property.description || property.price || property.area) && (
                <div className="ps-widget bgc-white bdrs12 default-box-shadow2 p30 mb30 overflow-hidden position-relative">
                  {property.description && (
                    <>
                      <h4 className="title fz17 mb30">Descripción de la Propiedad</h4>
                      <ProperytyDescriptions data={property} />
                    </>
                  )}

                  <h4 className="title fz17 mb30 mt50">Detalles de la Propiedad</h4>
                  <div className="row">
                    <PropertyDetails data={property} />
                  </div>
                </div>
              )}

              {/* Ubicación y Mapa Dinámico */}
              {property.address && (
                <div className="ps-widget bgc-white bdrs12 default-box-shadow2 p30 mb30 overflow-hidden position-relative">
                  <h4 className="title fz17 mb30 mt30">Ubicación</h4>
                  <div className="row">
                    <PropertyAddress data={property} />
                  </div>
                </div>
              )}

              {/* Características y Comodidades */}
              {hasAmenities && (
                <div className="ps-widget bgc-white bdrs12 default-box-shadow2 p30 mb30 overflow-hidden position-relative">
                  <h4 className="title fz17 mb30">Características y Comodidades</h4>
                  <div className="row">
                    <PropertyFeaturesAminites data={property} />
                  </div>
                </div>
              )}

              {/* Video de la Propiedad (Solo si existe en Supabase) */}
              {property.video_url && (
                <div className="ps-widget bgc-white bdrs12 default-box-shadow2 p30 mb30">
                  <h4 className="title fz17 mb30">Video de la Propiedad</h4>
                  <div className="row">
                    <PropertyVideo data={property} />
                  </div>
                </div>
              )}

              {/* Tour Virtual 360° (Solo si existe en Supabase) */}
              {property.tour_360_url && (
                <div className="ps-widget bgc-white bdrs12 default-box-shadow2 p30 mb30 overflow-hidden position-relative">
                  <h4 className="title fz17 mb30">Tour Virtual 360°</h4>
                  <div className="row">
                    <VirtualTour360 data={property} />
                  </div>
                </div>
              )}
            </div>

            {/* Sidebar de contacto y agenda */}
            <div className="col-lg-4">
              <div className="column">
                <div className="default-box-shadow1 bdrs12 bdr1 p30 mb30-md bgc-white position-relative">
                  <h4 className="form-title mb5">Programar Visita</h4>
                  <p className="text">Elige tu día y hora preferida</p>
                  <ScheduleTour data={property} />
                </div>

                <div className="agen-personal-info position-relative bgc-white default-box-shadow1 bdrs12 p30 mt30">
                  <div className="widget-wrapper mb-0">
                    <h6 className="title fz17 mb30">Contactar con Agente</h6>
                    <ContactWithAgent 
                      propiedadId={property.id} 
                      propiedadTitulo={property.title} 
                      agentId={property.agent_id}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="footer-style1 pt60 pb-0">
        <Footer />
      </section>
    </>
  );
};

export default PropertyTemplate;
