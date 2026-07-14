"use client";
import React, { useState, useEffect, useRef } from "react";
import { supabase } from "@/lib/supabase";

const compressImage = (file, maxWidth = 1600, maxHeight = 1200, quality = 0.8) => {
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (event) => {
      const img = new window.Image();
      img.src = event.target.result;
      img.onload = () => {
        const canvas = document.createElement("canvas");
        let width = img.width, height = img.height;
        if (width > height) {
          if (width > maxWidth) { height = Math.round((height * maxWidth) / width); width = maxWidth; }
        } else {
          if (height > maxHeight) { width = Math.round((width * maxHeight) / height); height = maxHeight; }
        }
        canvas.width = width; canvas.height = height;
        canvas.getContext("2d").drawImage(img, 0, 0, width, height);
        canvas.toBlob(
          (blob) => {
            const base = file.name.substring(0, file.name.lastIndexOf(".")) || file.name;
            resolve(new File([blob], `${base}.webp`, { type: "image/webp", lastModified: Date.now() }));
          }, "image/webp", quality
        );
      };
    };
  });
};

const uploadToStorage = async (file) => {
  const compressed = await compressImage(file);
  const fileName = `${Date.now()}-${Math.random().toString(36).substring(2, 10)}.webp`;
  try {
    const { error } = await supabase.storage.from("propiedades").upload(fileName, compressed, { cacheControl: "3600", upsert: false });
    if (error) throw error;
    const { data: { publicUrl } } = supabase.storage.from("propiedades").getPublicUrl(fileName);
    return publicUrl;
  } catch {
    return await new Promise((resolve) => {
      const reader = new FileReader();
      reader.onload = (e) => resolve(e.target.result);
      reader.readAsDataURL(compressed);
    });
  }
};

// ────────────────────────────────────────────────────────────
// Sub-componente: zona de upload de la PORTADA (una sola foto)
// ────────────────────────────────────────────────────────────
const CoverUpload = ({ value, onChange }) => {
  const [uploading, setUploading] = useState(false);
  const inputRef = useRef(null);

  const handle = async (file) => {
    if (!file) return;
    setUploading(true);
    const url = await uploadToStorage(file);
    onChange(url);
    setUploading(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    if (file) handle(file);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  return (
    <div>
      {/* Hidden input para el formulario */}
      <input type="hidden" name="coverImageUrl" value={value || ""} />

      {/* Preview o zona de upload */}
      <div
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        style={{
          borderRadius: "14px", overflow: "hidden", border: "2px dashed #eb6753",
          minHeight: "180px", background: value ? "transparent" : "#fff9f8",
          display: "flex", alignItems: "center", justifyContent: "center",
          cursor: "pointer", position: "relative",
        }}
        onClick={() => !uploading && inputRef.current?.click()}
      >
        {value ? (
          <>
            <img src={value} alt="Portada" style={{ width: "100%", height: "180px", objectFit: "cover" }} />
            <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, background: "linear-gradient(transparent, rgba(0,0,0,0.55))", padding: "10px 14px" }}>
              <span style={{ color: "#fff", fontSize: "12px", fontWeight: 600 }}>
                <i className="fas fa-check-circle me-1" style={{ color: "#5bbb7b" }} />
                Portada cargada — haz clic para cambiar
              </span>
            </div>
          </>
        ) : (
          <div className="text-center py-4 px-3">
            {uploading ? (
              <>
                <div className="spinner-border spinner-border-sm text-danger mb10" role="status" />
                <p className="fz13 text-muted mb0">Subiendo portada...</p>
              </>
            ) : (
              <>
                <i className="flaticon-upload d-block mb10" style={{ fontSize: "28px", color: "#eb6753" }} />
                <p className="fz14 fw600 mb5" style={{ color: "#eb6753" }}>Subir imagen de portada</p>
                <p className="fz12 text-muted mb0">Una sola foto · JPEG, PNG o WebP</p>
              </>
            )}
          </div>
        )}
      </div>

      {/* Botón eliminar */}
      {value && (
        <button type="button" className="ud-btn btn-white bdrs8 mt10 fz13"
          style={{ border: "1px solid #e9e9e9", padding: "6px 16px" }}
          onClick={(e) => { e.stopPropagation(); onChange(""); }}>
          <i className="fas fa-trash-alt me-1" style={{ color: "#dc3545" }} /> Quitar portada
        </button>
      )}

      <input ref={inputRef} type="file" accept="image/*" className="d-none"
        onChange={(e) => handle(e.target.files?.[0])} />
    </div>
  );
};

// ────────────────────────────────────────────────────────────
// Sub-componente: zona de upload de la GALERÍA (múltiples)
// ────────────────────────────────────────────────────────────
const GalleryUpload = ({ images, onChange }) => {
  const [uploading, setUploading] = useState("");
  const inputRef = useRef(null);

  const handleFiles = async (files) => {
    const newImages = [...images];
    let i = 0;
    for (const file of files) {
      i++;
      setUploading(`Subiendo foto ${i} de ${files.length}...`);
      const url = await uploadToStorage(file);
      newImages.push(url);
      onChange([...newImages]);
    }
    setUploading("");
  };

  const handleDelete = (index) => {
    const updated = [...images];
    updated.splice(index, 1);
    onChange(updated);
  };

  return (
    <div>
      {/* Hidden input para el formulario */}
      <input type="hidden" name="imagesJson" value={JSON.stringify(images)} />

      {/* Zona drag & drop */}
      <div
        style={{ borderRadius: "12px", border: "2px dashed #d0d5dd", minHeight: "100px", background: "#fafafa", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", padding: "20px" }}
        onClick={() => inputRef.current?.click()}
        onDrop={(e) => { e.preventDefault(); handleFiles(e.dataTransfer.files); }}
        onDragOver={(e) => e.preventDefault()}
      >
        {uploading ? (
          <div className="d-flex align-items-center gap-2">
            <div className="spinner-border spinner-border-sm text-success" role="status" />
            <span className="fz13 fw600">{uploading}</span>
          </div>
        ) : (
          <div className="text-center">
            <i className="flaticon-upload d-block mb5" style={{ fontSize: "24px", color: "#5bbb7b" }} />
            <span className="fz13 text-muted">Haz clic o arrastra las fotos de la galería</span>
          </div>
        )}
      </div>

      {/* Grid de fotos */}
      {images.length > 0 && (
        <div className="row mt20">
          {images.map((src, index) => (
            <div className="col-6 col-sm-4 col-md-3 col-xl-2 mb15" key={index}>
              <div className="position-relative border bdrs12 p-1" style={{ border: "1px solid #e9e9e9" }}>
                <div className="position-relative overflow-hidden bdrs8" style={{ height: "100px" }}>
                  <img src={src} alt={`Galería ${index + 1}`} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                  <button type="button" className="position-absolute"
                    style={{ top: "5px", right: "5px", background: "rgba(255,255,255,0.9)", border: "none", borderRadius: "50%", width: "24px", height: "24px", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}
                    onClick={() => handleDelete(index)} title="Eliminar">
                    <span className="flaticon-bin" style={{ fontSize: "10px", color: "#dc3545" }} />
                  </button>
                </div>
                <span className="d-block text-center text-muted fz11 mt5">#{index + 1}</span>
              </div>
            </div>
          ))}
        </div>
      )}

      <input ref={inputRef} type="file" multiple accept="image/*" className="d-none"
        onChange={(e) => handleFiles(e.target.files)} />
    </div>
  );
};

// ────────────────────────────────────────────────────────────
// Componente principal
// ────────────────────────────────────────────────────────────
const UploadPhotoGallery = ({ initialImages = [], initialCoverImage = null }) => {
  const [coverImage, setCoverImage] = useState("");
  const [galleryImages, setGalleryImages] = useState([]);

  useEffect(() => {
    if (initialCoverImage) setCoverImage(initialCoverImage);
    if (initialImages && initialImages.length > 0) setGalleryImages(initialImages);
  }, [initialCoverImage, initialImages]);

  return (
    <div>
      {/* ── PORTADA ── */}
      <div className="mb35">
        <div className="d-flex align-items-center gap-2 mb15">
          <span style={{ background: "#eb6753", color: "#fff", borderRadius: "6px", padding: "3px 12px", fontSize: "11px", fontWeight: 700, letterSpacing: "1px" }}>
            PORTADA
          </span>
          <span className="fz13 text-muted">Imagen principal del listado y la home (no forma parte de la galería)</span>
        </div>
        <CoverUpload value={coverImage} onChange={setCoverImage} />
      </div>

      {/* Divisor */}
      <hr style={{ borderColor: "#f0f0f0", margin: "0 0 25px 0" }} />

      {/* ── GALERÍA ── */}
      <div>
        <div className="d-flex align-items-center gap-2 mb15">
          <span style={{ background: "#1d293f", color: "#fff", borderRadius: "6px", padding: "3px 12px", fontSize: "11px", fontWeight: 700, letterSpacing: "1px" }}>
            GALERÍA
          </span>
          <span className="fz13 text-muted">Todas las fotos de la propiedad · {galleryImages.length} foto{galleryImages.length !== 1 ? "s" : ""}</span>
        </div>
        <GalleryUpload images={galleryImages} onChange={setGalleryImages} />
      </div>
    </div>
  );
};

export default UploadPhotoGallery;
