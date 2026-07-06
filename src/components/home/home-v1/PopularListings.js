"use client";
import Image from "next/image";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper";
import "swiper/swiper-bundle.min.css";

const PopularListings = ({data = [] }) => {
  const agentPhone = "56984152100"; // Teléfono principal de contacto

  return (
    <>
      <style dangerouslySetInnerHTML={{__html: `
        .swiper-slide {
          height: auto;
          display: flex;
        }
        .premium-listing-card {
          background: #ffffff;
          border: 1px solid #e9e9e9;
          border-radius: 20px;
          overflow: hidden;
          position: relative;
          transition: all 0.4s cubic-bezier(0.165, 0.84, 0.44, 1);
          box-shadow: 0 10px 30px rgba(0,0,0,0.02);
          height: 100%;
          display: flex;
          flex-direction: column;
          margin-bottom: 15px;
          width: 100%;
        }
        .premium-listing-card:hover {
          transform: translateY(-8px);
          box-shadow: 0 20px 40px rgba(29, 41, 63, 0.07);
          border-color: rgba(235, 103, 83, 0.3);
        }
        .premium-listing-thumb {
          position: relative;
          height: 240px;
          overflow: hidden;
        }
        .premium-listing-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.6s cubic-bezier(0.165, 0.84, 0.44, 1);
        }
        .premium-listing-card:hover .premium-listing-img {
          transform: scale(1.06);
        }
        .premium-price-badge {
          position: absolute;
          bottom: 15px;
          left: 15px;
          background: rgba(29, 41, 63, 0.85);
          backdrop-filter: blur(8px);
          color: #ffffff;
          padding: 8px 16px;
          border-radius: 30px;
          font-weight: 700;
          font-size: 16px;
          box-shadow: 0 4px 15px rgba(0,0,0,0.15);
          z-index: 2;
        }
        .premium-type-tag {
          position: absolute;
          top: 15px;
          left: 15px;
          background: #eb6753;
          color: #ffffff;
          padding: 4px 12px;
          border-radius: 30px;
          font-weight: 600;
          font-size: 11px;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          z-index: 2;
        }
        .premium-listing-content {
          padding: 24px;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          flex-grow: 1;
        }
        .premium-listing-title a {
          color: #1d293f;
          font-weight: 700;
          font-size: 17px;
          text-decoration: none;
          transition: color 0.2s ease;
        }
        .premium-listing-title a:hover {
          color: #eb6753;
        }
        .premium-meta-container {
          display: flex;
          align-items: center;
          gap: 15px;
          margin-top: 15px;
        }
        .premium-meta-item {
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 13px;
          color: #6b7280;
        }
        .premium-meta-item i {
          color: #eb6753;
          font-size: 14px;
        }
        .premium-wa-btn {
          width: 42px;
          height: 42px;
          border-radius: 50%;
          background: rgba(37, 211, 102, 0.08);
          color: #25d366;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.3s ease;
          border: 1px solid rgba(37, 211, 102, 0.15);
          text-decoration: none;
        }
        .premium-wa-btn:hover {
          background: #25d366;
          color: #ffffff;
          box-shadow: 0 8px 16px rgba(37, 211, 102, 0.35);
          transform: scale(1.1);
        }
        .popular-listings-prev:hover, .popular-listings-next:hover {
          background: #eb6753 !important;
          color: #ffffff !important;
          border-color: #eb6753 !important;
        }
        .popular-listings-pagination .swiper-pagination-bullet {
          width: 10px;
          height: 10px;
          background: #ccc;
          opacity: 1;
          margin: 0 6px !important;
          transition: all 0.3s;
        }
        .popular-listings-pagination .swiper-pagination-bullet-active {
          background: #eb6753;
          width: 25px;
          border-radius: 10px;
        }
      `}} />

      <div className="position-relative">
        <Swiper
          className="swiper-container-equal"
          spaceBetween={30}
          slidesPerView={1}
          modules={[Autoplay, Navigation, Pagination]}
          autoplay={{
            delay: 3500,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
          }}
          pagination={{
            el: ".popular-listings-pagination",
            clickable: true,
          }}
          navigation={{
            nextEl: ".popular-listings-next",
            prevEl: ".popular-listings-prev",
          }}
          breakpoints={{
          300: {
            slidesPerView: 1,
          },
          768: {
            slidesPerView: 2,
          },
          1024: {
            slidesPerView: 3,
          },
          1200: {
            slidesPerView: 3,
          },
        }}
      >
        {data.slice(0, 6).map((listing) => {
          let imageSrc = "/images/listings/g1-1.jpg";
          if (listing.images) {
            if (Array.isArray(listing.images) && listing.images.length > 0) {
              imageSrc = listing.images[0];
            } else if (typeof listing.images === "string") {
              try {
                const arr = JSON.parse(listing.images);
                if (arr.length > 0) imageSrc = arr[0];
              } catch (e) {}
            }
          }

          const formattedPrice = listing.price 
            ? (listing.sufijo_precio === "UF"
              ? `UF ${Number(listing.price).toLocaleString("es-CL")}`
              : `$${Number(listing.price).toLocaleString("es-CL")}`)
            : "Consultar Precio";

          const address = listing.address || (listing.comuna ? `${listing.comuna}, Chile` : "Punta Arenas, Chile");
          
          const whatsAppUrl = `https://wa.me/${agentPhone}?text=${encodeURIComponent(
            `Hola, me interesa recibir información sobre la parcela/lote "${listing.title}" (ID: ${listing.id_ingreso_manual || listing.id}).`
          )}`;

          return (
          <SwiperSlide key={listing.id}>
            <div className="item h-100 py-2 w-100">
                <div className="premium-listing-card">
                  {/* Contenedor de Imagen y Badges */}
                  <div className="premium-listing-thumb">
                    <img
                      className="premium-listing-img"
                      src={imageSrc}
                      alt={listing.title}
                      loading="lazy"
                    />
                    <div className="premium-type-tag">
                      {listing.category || "Parcela"}
                    </div>
                    <div className="premium-price-badge">
                      {formattedPrice}
                    </div>
                  </div>

                  {/* Contenido de la Tarjeta */}
                  <div className="premium-listing-content">
                    <div>
                      <h6 className="premium-listing-title mb-1">
                        <Link href={`/propiedades/${listing.id}`} className="stretched-link">{listing.title}</Link>
                      </h6>
                      <p className="text mb-0" style={{ fontSize: "13px", color: "#6b7280" }}>
                        <i className="fas fa-map-marker-alt text-thm me-1" /> {address}
                      </p>
                    </div>

                    <div className="d-flex justify-content-between align-items-center mt-3 pt-3" style={{ borderTop: "1px solid #f1f1f1" }}>
                      <div className="premium-meta-container">
                        {Number(listing.bedrooms || listing.habitaciones || 0) > 0 && (
                          <div className="premium-meta-item" title="Dormitorios">
                            <span className="flaticon-bed text-thm fz16" />
                            <span className="fw-semibold">{listing.bedrooms || listing.habitaciones}</span>
                          </div>
                        )}
                        {Number(listing.bathrooms || 0) > 0 && (
                          <div className="premium-meta-item" title="Baños">
                            <span className="flaticon-shower text-thm fz16" />
                            <span className="fw-semibold">{listing.bathrooms}</span>
                          </div>
                        )}
                        {Number(listing.area || 0) > 0 && (
                          <div className="premium-meta-item" title="Superficie">
                            <span className="flaticon-expand text-thm fz16" />
                            <span className="fw-semibold">{listing.area} m²</span>
                          </div>
                        )}
                      </div>

                      <div>
                        <a 
                          href={whatsAppUrl} 
                          target="_blank" 
                          rel="noopener noreferrer" 
                          className="premium-wa-btn position-relative"
                          style={{ zIndex: 2 }}
                          title="Contactar por WhatsApp"
                        >
                          <i className="fab fa-whatsapp fz18" />
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
          </SwiperSlide>
        )})}
        </Swiper>

        <div className="d-flex justify-content-center align-items-center mt-4 pt-2" style={{ gap: "20px" }}>
          <button className="popular-listings-prev" style={{ width: "44px", height: "44px", borderRadius: "50%", border: "1px solid #e9e9e9", background: "#fff", color: "#1d293f", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", transition: "all 0.3s" }}>
            <i className="far fa-chevron-left" />
          </button>
          
          <div className="popular-listings-pagination position-relative mt-0 w-auto d-flex align-items-center" />

          <button className="popular-listings-next" style={{ width: "44px", height: "44px", borderRadius: "50%", border: "1px solid #e9e9e9", background: "#fff", color: "#1d293f", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", transition: "all 0.3s" }}>
            <i className="far fa-chevron-right" />
          </button>
        </div>
      </div>
    </>
  );
};

export default PopularListings;
