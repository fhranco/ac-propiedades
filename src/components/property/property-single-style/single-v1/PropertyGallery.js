"use client";
import { Gallery, Item } from "react-photoswipe-gallery";
import "photoswipe/dist/photoswipe.css";
import React, { useState, useEffect, useRef } from "react";

const PLACEHOLDER_COVER = "/images/listings/listing-single-1.jpg";

const PropertyGallery = ({ data }) => {
  const [images, setImages] = useState([]);
  const firstItemRef = useRef(null);

  useEffect(() => {
    if (!data) return;

    // Parsear galería de imágenes
    let imgs = [];
    if (Array.isArray(data.images)) {
      imgs = data.images;
    } else if (typeof data.images === "string") {
      try {
        imgs = JSON.parse(data.images);
      } catch {}
    }

    if (imgs.length === 0) {
      imgs = [PLACEHOLDER_COVER];
    }
    setImages(imgs);
  }, [data]);

  const handleOpenGallery = (e) => {
    e.preventDefault();
    if (firstItemRef.current) {
      firstItemRef.current.click();
    }
  };

  return (
    <div className="container px-0 mb30 position-relative" style={{ maxWidth: "100%" }}>
      <style dangerouslySetInnerHTML={{__html: `
        .masonry-container {
          position: relative;
          max-height: 500px;
          overflow: hidden;
          border-radius: 16px;
          box-shadow: 0 10px 30px rgba(0,0,0,0.08);
          border: 1px solid #e9e9e9;
        }
        .masonry-gallery {
          column-count: 3;
          column-gap: 16px;
          width: 100%;
          padding: 16px;
        }
        .masonry-item {
          break-inside: avoid;
          margin-bottom: 16px;
          border-radius: 12px;
          overflow: hidden;
          box-shadow: 0 4px 10px rgba(0,0,0,0.04);
          border: 1px solid #f0f0f0;
          cursor: pointer;
          transition: transform 0.2s ease, box-shadow 0.2s ease;
        }
        .masonry-item:hover {
          transform: scale(1.015);
          box-shadow: 0 8px 20px rgba(0,0,0,0.08);
        }
        .gallery-fade-overlay {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          height: 180px;
          background: linear-gradient(to bottom, rgba(255,255,255,0) 0%, rgba(255,255,255,0.95) 80%, rgba(255,255,255,1) 100%);
          display: flex;
          align-items: flex-end;
          justify-content: center;
          padding-bottom: 30px;
          z-index: 10;
          pointer-events: none; /* Dejar pasar clics si es necesario */
        }
        .gallery-view-btn {
          pointer-events: auto; /* Activar clics en el botón */
          background-color: #eb6753;
          color: #fff;
          border: none;
          border-radius: 30px;
          padding: 14px 28px;
          font-weight: 600;
          font-size: 15px;
          box-shadow: 0 10px 20px rgba(235, 103, 83, 0.3);
          transition: all 0.3s ease;
          display: inline-flex;
          align-items: center;
          gap: 8px;
        }
        .gallery-view-btn:hover {
          background-color: #d65946;
          transform: translateY(-2px);
          box-shadow: 0 12px 24px rgba(235, 103, 83, 0.4);
          color: #fff;
        }
        @media (max-width: 991px) {
          .masonry-gallery {
            column-count: 2;
          }
        }
        @media (max-width: 575px) {
          .masonry-gallery {
            column-count: 1;
          }
          .masonry-container {
            max-height: 400px;
          }
        }
      `}} />

      <Gallery>
        <div className="masonry-container">
          <div className="masonry-gallery">
            {images.map((src, index) => (
              <div key={index} className="masonry-item">
                <Item
                  original={src}
                  thumbnail={src}
                  width={1200}
                  height={900}
                >
                  {({ ref, open }) => (
                    <img
                      src={src}
                      style={{ 
                        width: "100%", 
                        height: "auto", 
                        display: "block"
                      }}
                      ref={(node) => {
                        ref.current = node;
                        if (index === 0) firstItemRef.current = node;
                      }}
                      onClick={open}
                      alt={`Imagen ${index + 1} de la propiedad`}
                      role="button"
                    />
                  )}
                </Item>
              </div>
            ))}
          </div>

          {/* Difuminado y Botón Visor */}
          <div className="gallery-fade-overlay">
            <button className="gallery-view-btn" onClick={handleOpenGallery}>
              <i className="fas fa-images fz16" />
              Ver todas las fotos ({images.length})
            </button>
          </div>
        </div>
      </Gallery>
    </div>
  );
};

export default PropertyGallery;
