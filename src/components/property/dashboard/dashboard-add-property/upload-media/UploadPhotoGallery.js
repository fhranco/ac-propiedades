"use client";
import { Tooltip as ReactTooltip } from "react-tooltip";
import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";

const UploadPhotoGallery = ({ initialImages = [] }) => {
  const [uploadedImages, setUploadedImages] = useState([]);
  const [coverIndex, setCoverIndex] = useState(0);
  const fileInputRef = useRef(null);

  // Sincronizar imágenes existentes de la propiedad en modo edición
  useEffect(() => {
    if (initialImages && initialImages.length > 0) {
      setUploadedImages(initialImages);
    }
  }, [initialImages]);

  const handleUpload = (files) => {
    const newImages = [...uploadedImages];

    for (const file of files) {
      const reader = new FileReader();
      reader.onload = (e) => {
        newImages.push(e.target.result);
        setUploadedImages([...newImages]);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDrop = (event) => {
    event.preventDefault();
    const files = event.dataTransfer.files;
    handleUpload(files);
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  const handleDelete = (index) => {
    const newImages = [...uploadedImages];
    newImages.splice(index, 1);
    setUploadedImages(newImages);
    
    if (coverIndex === index) {
      setCoverIndex(0);
    } else if (coverIndex > index) {
      setCoverIndex(coverIndex - 1);
    }
  };

  const handleSetCover = (index) => {
    setCoverIndex(index);
  };

  return (
    <>
      <div
        className="upload-img position-relative overflow-hidden bdrs12 text-center mb30 px-2"
        onDrop={handleDrop}
        onDragOver={handleDragOver}
      >
        <div className="icon mb30">
          <span className="flaticon-upload" />
        </div>
        <h4 className="title fz17 mb10">Subir/Arrastrar fotos de la propiedad</h4>
        <p className="text mb25">
          Las fotos deben ser formato JPEG o PNG
        </p>
        <label className="ud-btn btn-white cursor-pointer">
          Buscar archivos
          <input
            ref={fileInputRef}
            id="fileInput"
            type="file"
            multiple
            className="d-none"
            onChange={(e) => handleUpload(e.target.files)}
          />
        </label>
      </div>

      {/* Input oculto con string JSON de imágenes para el submit del formulario */}
      <input type="hidden" name="imagesJson" value={JSON.stringify(uploadedImages)} />
      <input type="hidden" name="coverImageIndex" value={coverIndex} />

      {uploadedImages.length > 0 && (
        <>
          <h5 className="title fz15 mb20">Galería cargada (Haz clic en la estrella para definir la portada principal)</h5>
          <div className="row profile-box position-relative d-md-flex align-items-stretch mb50">
            {uploadedImages.map((imageData, index) => {
              const isCover = coverIndex === index;
              return (
                <div className="col-6 col-sm-4 col-md-3 col-xl-2 mb20" key={index}>
                  <div 
                    className="profile-img position-relative h-100 border bdrs12 p-1 d-flex flex-column justify-content-between"
                    style={{ 
                      borderColor: isCover ? "#eb6753" : "#e9e9e9", 
                      backgroundColor: isCover ? "#eb675305" : "#fff",
                      boxShadow: isCover ? "0 4px 12px rgba(235, 103, 83, 0.15)" : "none"
                    }}
                  >
                    <div className="position-relative overflow-hidden bdrs8" style={{ height: "120px" }}>
                      <img
                        src={imageData}
                        className="w-100 h-100 cover"
                        alt={`Galería ${index + 1}`}
                        style={{ objectFit: "cover" }}
                      />
                      <button
                        type="button"
                        className="tag position-absolute"
                        style={{
                          top: "8px",
                          right: "8px",
                          background: "rgba(255, 255, 255, 0.9)",
                          border: "none",
                          borderRadius: "50%",
                          width: "28px",
                          height: "28px",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          cursor: "pointer"
                        }}
                        onClick={() => handleDelete(index)}
                        title="Eliminar foto"
                      >
                        <span className="flaticon-bin" style={{ fontSize: "12px", color: "#dc3545" }} />
                      </button>
                    </div>

                    <div className="d-flex justify-content-between align-items-center mt10 px-1">
                      <button
                        type="button"
                        style={{
                          border: "none",
                          background: "none",
                          cursor: "pointer"
                        }}
                        onClick={() => handleSetCover(index)}
                        title="Fijar como portada principal"
                      >
                        <i 
                          className={isCover ? "fas fa-star" : "far fa-star"} 
                          style={{ color: isCover ? "#eb6753" : "#a1a1a1", fontSize: "16px" }}
                        />
                      </button>
                      <span className="text-muted fz11">#{index + 1}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </>
      )}
    </>
  );
};

export default UploadPhotoGallery;
