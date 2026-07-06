"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

// Número de WhatsApp de AC Propiedades Magallanes — cambia este valor
const WA_NUMBER = "56912345678";

const formatPrice = (price) => {
  if (!price || price === "Precio a consultar") return price || "Precio a consultar";
  // Si ya tiene formato (UF, $), devuélvelo tal cual
  return price;
};

const FeaturedListings = ({ data, colstyle }) => {
  const [favorites, setFavorites] = useState(new Set());

  const toggleFavorite = (id) => {
    setFavorites((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };
  return (
    <>
      {data.map((listing) => (
        <div
          className={`${colstyle ? "col-sm-12" : "col-sm-6 col-lg-6"} mb-4`}
          key={listing.id}
        >
          <div
            className={colstyle ? "listing-style1 listCustom listing-type" : "listing-style1"}
            style={{ borderRadius: 12, overflow: "hidden", boxShadow: "0 2px 16px rgba(0,0,0,0.07)" }}
          >
            {/* Imagen */}
            <div className="list-thumb" style={{ position: "relative" }}>
              <Image
                width={382}
                height={248}
                style={{ height: 230, objectFit: "cover", width: "100%" }}
                className="w-100"
                src={listing.image}
                alt={listing.title}
              />

              {/* Badge categoría */}
              {listing.propertyType && (
                <div
                  style={{
                    position: "absolute",
                    top: 12,
                    left: 12,
                    background: "rgba(235,103,83,0.92)",
                    color: "#fff",
                    fontSize: 11,
                    fontWeight: 700,
                    padding: "3px 10px",
                    borderRadius: 20,
                    letterSpacing: 0.5,
                    backdropFilter: "blur(4px)",
                  }}
                >
                  {listing.category || listing.propertyType}
                </div>
              )}

              {/* Precio */}
              <div className="list-price" style={{ fontSize: 15, fontWeight: 700 }}>
                {formatPrice(listing.price)}
              </div>
            </div>

            {/* Contenido */}
            <div className="list-content" style={{ padding: "16px 20px 14px" }}>
              <h6 className="list-title mb-1" style={{ fontSize: 15, fontWeight: 700, lineHeight: 1.3 }}>
                <Link href={`/propiedades/${listing.id}`} style={{ color: "#1d293f" }}>
                  {listing.title}
                </Link>
              </h6>

              <p className="list-text mb-2" style={{ fontSize: 13, color: "#6b7280" }}>
                <span className="flaticon-pin me-1" style={{ fontSize: 12 }} />
                {listing.location}
              </p>

              {/* Métricas */}
              <div className="list-meta d-flex align-items-center gap-3 mb-2" style={{ fontSize: 13, color: "#555" }}>
                {listing.bed > 0 && (
                  <span>
                    <span className="flaticon-bed me-1" />
                    {listing.bed} dorm.
                  </span>
                )}
                {listing.bath > 0 && (
                  <span>
                    <span className="flaticon-shower me-1" />
                    {listing.bath} {listing.bath === 1 ? "baño" : "baños"}
                  </span>
                )}
                {listing.sqft > 0 && (
                  <span>
                    <span className="flaticon-expand me-1" />
                    {listing.sqft} m²
                  </span>
                )}
              </div>

              <hr className="mt-1 mb-2" style={{ borderColor: "#f0f0f0" }} />

              {/* Footer de la card */}
              <div className="list-meta2 d-flex justify-content-between align-items-center">
                <span
                  className="for-what"
                  style={{
                    fontSize: 12,
                    fontWeight: 600,
                    background: listing.forRent ? "#e8f4ff" : "#e8f9f0",
                    color: listing.forRent ? "#1a6fb8" : "#1a7a45",
                    padding: "3px 10px",
                    borderRadius: 20,
                  }}
                >
                  {listing.forRent ? "En Arriendo" : "En Venta"}
                </span>

                <div className="d-flex align-items-center gap-2">
                  {/* WhatsApp */}
                  <a
                    href={`https://wa.me/${WA_NUMBER}?text=Hola%2C%20me%20interesa%20la%20propiedad%3A%20${encodeURIComponent(listing.title)}%20(ID%3A%20${listing.id})`}
                    target="_blank"
                    rel="noopener noreferrer"
                    title="Consultar por WhatsApp"
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      width: 32,
                      height: 32,
                      borderRadius: "50%",
                      background: "#25d366",
                      color: "#fff",
                      fontSize: 16,
                      textDecoration: "none",
                      transition: "transform 0.2s",
                    }}
                    onMouseOver={(e) => e.currentTarget.style.transform = "scale(1.12)"}
                    onMouseOut={(e) => e.currentTarget.style.transform = "scale(1)"}
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                    </svg>
                  </a>
                  {/* Favorito */}
                  <button
                    title={favorites.has(listing.id) ? "Quitar de favoritos" : "Guardar en favoritos"}
                    onClick={() => toggleFavorite(listing.id)}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      width: 32,
                      height: 32,
                      borderRadius: "50%",
                      background: favorites.has(listing.id) ? "#fee2e2" : "#f3f4f6",
                      color: favorites.has(listing.id) ? "#ef4444" : "#1d293f",
                      fontSize: 14,
                      border: "none",
                      cursor: "pointer",
                      transition: "background 0.2s, color 0.2s",
                    }}
                  >
                    <span className="flaticon-like" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default FeaturedListings;
