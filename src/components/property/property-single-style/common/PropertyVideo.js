"use client";
import React, { useState } from "react";
import ModalVideo from "react-modal-video";
import Image from "next/image";

const PropertyVideo = ({ data }) => {
  const [isOpen, setOpen] = useState(false);

  // Extraer ID de YouTube
  const getVideoId = (url) => {
    if (!url) return null;
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? match[2] : url;
  };

  const videoId = getVideoId(data?.video_url);

  // Si no hay video en la base de datos, no mostramos el widget
  if (!videoId) return null;

  // Portada del video: primera imagen de la propiedad o una por defecto
  let coverImage = "/images/listings/listing-single-1.jpg";
  if (data?.images) {
    if (Array.isArray(data.images) && data.images.length > 0) {
      coverImage = data.images[0];
    } else if (typeof data.images === "string") {
      try {
        const parsed = JSON.parse(data.images);
        if (parsed.length > 0) coverImage = parsed[0];
      } catch {}
    }
  }

  return (
    <>
      <ModalVideo
        channel="youtube"
        isOpen={isOpen}
        videoId={videoId}
        onClose={() => setOpen(false)}
      />

      <div className="col-md-12">
        <div 
          className="position-relative w-100"
          style={{
            height: "380px",
            borderRadius: "16px",
            overflow: "hidden",
            boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.05), 0 4px 6px -4px rgba(0, 0, 0, 0.05)",
            cursor: "pointer"
          }}
          onClick={() => setOpen(true)}
        >
          {/* Imagen de fondo de la propiedad */}
          <Image
            src={coverImage}
            fill
            sizes="100vw"
            alt="Vista de la Propiedad"
            style={{
              objectFit: "cover",
              transition: "transform 0.5s ease"
            }}
            onMouseOver={(e) => e.currentTarget.style.transform = "scale(1.05)"}
            onMouseOut={(e) => e.currentTarget.style.transform = "scale(1)"}
            unoptimized={coverImage.startsWith("data:")}
          />

          {/* Filtro Oscuro de Superposición */}
          <div 
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              backgroundColor: "rgba(29, 41, 63, 0.45)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center"
            }}
          >
            {/* Botón de reproducción de video premium animado */}
            <div 
              style={{
                width: "80px",
                height: "80px",
                borderRadius: "50%",
                backgroundColor: "#fff",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                boxShadow: "0 10px 25px rgba(0, 0, 0, 0.3)",
                transition: "all 0.3s ease"
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.transform = "scale(1.1)";
                e.currentTarget.style.boxShadow = "0 15px 30px rgba(235, 103, 83, 0.4)";
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.transform = "scale(1)";
                e.currentTarget.style.boxShadow = "0 10px 25px rgba(0, 0, 0, 0.3)";
              }}
            >
              <i 
                className="fas fa-play" 
                style={{ 
                  color: "#eb6753", 
                  fontSize: "24px",
                  marginLeft: "5px" // Centrado óptico del triángulo de play
                }} 
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PropertyVideo;
