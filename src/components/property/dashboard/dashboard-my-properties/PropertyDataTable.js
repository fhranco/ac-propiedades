"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useState, useEffect, useCallback, useRef } from "react";
import PaginationTwo from "@/components/listing/PaginationTwo";

const getStatusStyle = (status) => {
  switch (status) {
    case "Published":  return "pending-style style2";
    case "Pending":    return "pending-style style1";
    case "Processing": return "pending-style style3";
    default:           return "pending-style style1";
  }
};

const translateStatus = (status) => {
  switch (status) {
    case "Published":  return "Publicado";
    case "Pending":    return "Pendiente";
    case "Processing": return "En proceso";
    default:           return status;
  }
};

const EditModal = ({ property, onClose, onSaved }) => {
  const [form, setForm] = useState({
    // ── Descripción
    propertyId:        property.propertyId        || "",
    title:             property.title             || "",
    description:       property.description       || "",
    category:          property.category          || "Casa",
    listedIn:          property.listedIn          || "Active",
    status:            property.status            || "Pending",
    price:             property.price             || "",
    tax:               property.tax               || "",
    priceSuffix:       property.priceSuffix       || "UF",
    // ── Ubicación
    address:           property.address           || "",
    zip:               property.zip               || "",
    lat:               property.lat               || "",
    lng:               property.lng               || "",
    // ── Detalles
    sqft:              property.sqft              || "",
    landArea:          property.landArea          || "",
    rooms:             property.rooms             || "",
    bedrooms:          property.bedrooms          || "",
    bathrooms:         property.bathrooms         || "",
    garages:           property.garages           || "",
    garageSize:        property.garageSize        || "",
    yearBuilt:         property.yearBuilt         || "",
    availableFrom:     property.availableFrom     || "",
    basement:          property.basement          || "",
    additionalDetails: property.additionalDetails || "",
    roofType:          property.roofType          || "",
    exteriorMaterial:  property.exteriorMaterial  || "",
    structureType:     property.structureType     || "Departamento",
    floorNumber:       property.floorNumber       || "",
    energyClass:       property.energyClass       || "",
    energyEfficiency:  property.energyEfficiency  || "",
    agentNotes:        property.agentNotes        || "",
    // ── Media
    videoUrl:          property.videoUrl          || "",
    virtualTour:       property.virtualTour       || "",
  });
  const [saving, setSaving] = useState(false);
  const [error, setError]   = useState(null);
  const [activeTab, setActiveTab] = useState("descripcion");

  // ── Galería de imágenes ─────────────────────────────────────────────────
  const parseImages = (raw) => {
    if (!raw) return [];
    if (Array.isArray(raw)) return raw;
    try { return JSON.parse(raw); } catch { return []; }
  };
  const [galleryImages, setGalleryImages] = useState(() => parseImages(property.images));
  const [coverIndex, setCoverIndex]       = useState(() => {
    const imgs = parseImages(property.images);
    if (property.coverImage && imgs.length > 0) {
      const idx = imgs.indexOf(property.coverImage);
      return idx >= 0 ? idx : 0;
    }
    return 0;
  });
  const fileInputRef = useRef(null);

  const handleGalleryUpload = (files) => {
    const readers = [...files].map((file) =>
      new Promise((resolve) => {
        const reader = new FileReader();
        reader.onload = (e) => resolve(e.target.result);
        reader.readAsDataURL(file);
      })
    );
    Promise.all(readers).then((newImgs) => {
      setGalleryImages((prev) => [...prev, ...newImgs]);
    });
  };

  const handleGalleryDelete = (idx) => {
    setGalleryImages((prev) => {
      const next = prev.filter((_, i) => i !== idx);
      return next;
    });
    if (coverIndex === idx) setCoverIndex(0);
    else if (coverIndex > idx) setCoverIndex((c) => c - 1);
  };
  // ────────────────────────────────────────────────────────────────────────

  const handleChange = (e) =>
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError(null);
    const coverImage = galleryImages[coverIndex] || galleryImages[0] || null;
    try {
      const res = await fetch("/api/propiedades", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: property.id,
          updates: {
            ...form,
            images: JSON.stringify(galleryImages),
            coverImage: galleryImages[coverIndex] || galleryImages[0] || null,
          },
        }),
      });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Error al guardar");
      }
      onSaved();
    } catch (err) {
      setError(err.message);
      setSaving(false);
    }
  };

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, []);

  const ic = "form-control bdrs6 mb15";
  const lc = "fz13 fw500 heading-color mb5 d-block";
  const sc = "form-select bdrs6 mb15";

  const tabs = [
    { id: "descripcion", label: "1. Descripción" },
    { id: "ubicacion",   label: "2. Ubicación" },
    { id: "detalles",    label: "3. Detalles" },
    { id: "media",       label: "4. Multimedia" },
  ];

  return (
    <div
      style={{ position: "fixed", inset: 0, zIndex: 9999, background: "rgba(0,0,0,0.6)",
        display: "flex", alignItems: "center", justifyContent: "center", padding: "16px" }}
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div style={{ background: "#fff", borderRadius: "16px", width: "100%", maxWidth: "800px",
        maxHeight: "92vh", overflowY: "auto", padding: "32px",
        boxShadow: "0 24px 80px rgba(0,0,0,0.3)" }}>

        {/* Header */}
        <div className="d-flex justify-content-between align-items-center mb20">
          <h4 className="title mb-0">Editar propiedad</h4>
          <button onClick={onClose}
            style={{ background: "none", border: "none", fontSize: "24px", cursor: "pointer", color: "#888", lineHeight: 1 }}
            aria-label="Cerrar">×</button>
        </div>

        {error && <div className="alert alert-danger mb15" role="alert">{error}</div>}

        {/* Tabs */}
        <div className="nav nav-tabs mb25" style={{ borderBottom: "2px solid #f0f0f0", gap: "4px" }}>
          {tabs.map((t) => (
            <button key={t.id} type="button"
              onClick={() => setActiveTab(t.id)}
              style={{
                padding: "8px 16px", border: "none", background: "none", cursor: "pointer",
                fontWeight: 600, fontSize: "13px",
                color: activeTab === t.id ? "#e87722" : "#666",
                borderBottom: activeTab === t.id ? "2px solid #e87722" : "2px solid transparent",
                marginBottom: "-2px",
              }}>
              {t.label}
            </button>
          ))}
        </div>

        <form onSubmit={handleSubmit}>

          {/* ── Descripción ── */}
          {activeTab === "descripcion" && (
            <div className="row">
              <div className="col-sm-6 mb10">
                <label className={lc}>ID de la propiedad</label>
                <input name="propertyId" value={form.propertyId} onChange={handleChange}
                  className={ic} placeholder="Ej: PROP-00123" />
              </div>
              <div className="col-12 mb10">
                <label className={lc}>Título *</label>
                <input name="title" value={form.title} onChange={handleChange}
                  className={ic} required maxLength={200}
                  placeholder="Ej: Hermoso departamento central frente al estrecho" />
              </div>
              <div className="col-12 mb10">
                <label className={lc}>Descripción</label>
                <textarea name="description" value={form.description} onChange={handleChange}
                  className={ic} rows={5} maxLength={2000}
                  placeholder="Escribe una descripción completa y atractiva de la propiedad..." />
              </div>
              <div className="col-sm-4 mb10">
                <label className={lc}>Categoría</label>
                <select name="category" value={form.category} onChange={handleChange} className={sc}>
                  <option value="Casa">Casa</option>
                  <option value="Departamento">Departamento</option>
                  <option value="Oficina">Oficina</option>
                  <option value="Bodega">Bodega/Almacén</option>
                  <option value="Local">Local comercial</option>
                  <option value="Lote">Lote</option>
                  <option value="Parcela">Parcela</option>
                </select>
              </div>
              <div className="col-sm-4 mb10">
                <label className={lc}>Listar en</label>
                <select name="listedIn" value={form.listedIn} onChange={handleChange} className={sc}>
                  <option value="All Listing">Todos los listados</option>
                  <option value="Active">Activo</option>
                  <option value="Sold">Vendido</option>
                  <option value="Processing">En proceso</option>
                </select>
              </div>
              <div className="col-sm-4 mb10">
                <label className={lc}>Estado de publicación</label>
                <select name="status" value={form.status} onChange={handleChange} className={sc}>
                  <option value="Pending">Pendiente</option>
                  <option value="Processing">En proceso</option>
                  <option value="Published">Publicado</option>
                </select>
              </div>
              <div className="col-sm-5 mb10">
                <label className={lc}>Precio</label>
                <input name="price" value={form.price} onChange={handleChange}
                  className={ic} type="number" min="0" placeholder="Ej: 120000" />
              </div>
              <div className="col-sm-4 mb10">
                <label className={lc}>Sufijo del precio</label>
                <input name="priceSuffix" value={form.priceSuffix} onChange={handleChange}
                  className={ic} placeholder="Ej: mensual, total, UF" />
              </div>
              <div className="col-sm-3 mb10">
                <label className={lc}>Contribuciones anuales</label>
                <input name="tax" value={form.tax} onChange={handleChange}
                  className={ic} placeholder="Ej: 45000" />
              </div>
            </div>
          )}

          {/* ── Ubicación ── */}
          {activeTab === "ubicacion" && (
            <div className="row">
              <div className="col-12 mb10">
                <label className={lc}>Dirección</label>
                <input name="address" value={form.address} onChange={handleChange}
                  className={ic} maxLength={300}
                  placeholder="Ej: Av. Colón 456, Punta Arenas" />
              </div>
              <div className="col-sm-4 mb10">
                <label className={lc}>Código Postal</label>
                <input name="zip" value={form.zip} onChange={handleChange}
                  className={ic} placeholder="Ej: 6200000" />
              </div>
              <div className="col-sm-4 mb10">
                <label className={lc}>Latitud</label>
                <input name="lat" value={form.lat} onChange={handleChange}
                  className={ic} placeholder="Ej: -53.1638" />
              </div>
              <div className="col-sm-4 mb10">
                <label className={lc}>Longitud</label>
                <input name="lng" value={form.lng} onChange={handleChange}
                  className={ic} placeholder="Ej: -70.9171" />
              </div>
            </div>
          )}

          {/* ── Detalles ── */}
          {activeTab === "detalles" && (
            <div className="row">
              <div className="col-sm-4 mb10">
                <label className={lc}>Superficie total (m²)</label>
                <input name="sqft" value={form.sqft} onChange={handleChange}
                  className={ic} type="number" min="0" placeholder="Ej: 85" />
              </div>
              <div className="col-sm-4 mb10">
                <label className={lc}>Superficie del terreno (m²)</label>
                <input name="landArea" value={form.landArea} onChange={handleChange}
                  className={ic} type="number" min="0" placeholder="Ej: 200" />
              </div>
              <div className="col-sm-4 mb10">
                <label className={lc}>Habitaciones</label>
                <input name="rooms" value={form.rooms} onChange={handleChange}
                  className={ic} type="number" min="0" placeholder="Ej: 3" />
              </div>
              <div className="col-sm-4 mb10">
                <label className={lc}>Dormitorios</label>
                <input name="bedrooms" value={form.bedrooms} onChange={handleChange}
                  className={ic} type="number" min="0" placeholder="Ej: 2" />
              </div>
              <div className="col-sm-4 mb10">
                <label className={lc}>Baños</label>
                <input name="bathrooms" value={form.bathrooms} onChange={handleChange}
                  className={ic} type="number" min="0" placeholder="Ej: 2" />
              </div>
              <div className="col-sm-4 mb10">
                <label className={lc}>Estacionamientos</label>
                <input name="garages" value={form.garages} onChange={handleChange}
                  className={ic} type="number" min="0" placeholder="Ej: 1" />
              </div>
              <div className="col-sm-4 mb10">
                <label className={lc}>Tamaño estacionamiento</label>
                <input name="garageSize" value={form.garageSize} onChange={handleChange}
                  className={ic} placeholder="Ej: 15 m²" />
              </div>
              <div className="col-sm-4 mb10">
                <label className={lc}>Año de construcción</label>
                <input name="yearBuilt" value={form.yearBuilt} onChange={handleChange}
                  className={ic} placeholder="Ej: 2010" />
              </div>
              <div className="col-sm-4 mb10">
                <label className={lc}>Disponible desde</label>
                <input name="availableFrom" value={form.availableFrom} onChange={handleChange}
                  className={ic} placeholder="dd/mm/aaaa" />
              </div>
              <div className="col-sm-4 mb10">
                <label className={lc}>Subterráneo / Bodega</label>
                <input name="basement" value={form.basement} onChange={handleChange}
                  className={ic} placeholder="Ej: Bodega 12 m²" />
              </div>
              <div className="col-sm-4 mb10">
                <label className={lc}>Tipo de techo</label>
                <input name="roofType" value={form.roofType} onChange={handleChange}
                  className={ic} placeholder="Ej: Zinc, Teja, Losa" />
              </div>
              <div className="col-sm-4 mb10">
                <label className={lc}>Material exterior</label>
                <input name="exteriorMaterial" value={form.exteriorMaterial} onChange={handleChange}
                  className={ic} placeholder="Ej: Hormigón, Madera, Ladrillo" />
              </div>
              <div className="col-sm-4 mb10">
                <label className={lc}>Tipo de estructura</label>
                <select name="structureType" value={form.structureType} onChange={handleChange} className={sc}>
                  <option value="Departamento">Departamento</option>
                  <option value="Casa">Casa</option>
                  <option value="Oficina">Oficina</option>
                  <option value="Loft">Loft</option>
                  <option value="Cabaña">Cabaña</option>
                  <option value="Terreno">Terreno</option>
                </select>
              </div>
              <div className="col-sm-4 mb10">
                <label className={lc}>N° de piso</label>
                <select name="floorNumber" value={form.floorNumber} onChange={handleChange} className={sc}>
                  <option value="">Seleccionar...</option>
                  {["1°","2°","3°","4°","5°","6°+","Último piso"].map(v => (
                    <option key={v} value={v}>{v}</option>
                  ))}
                </select>
              </div>
              <div className="col-sm-4 mb10">
                <label className={lc}>Clase energética</label>
                <select name="energyClass" value={form.energyClass} onChange={handleChange} className={sc}>
                  <option value="">Seleccionar...</option>
                  {["A","B","C","D","E","F"].map(v => (
                    <option key={v} value={v}>{v}</option>
                  ))}
                </select>
              </div>
              <div className="col-sm-4 mb10">
                <label className={lc}>Eficiencia energética (kWh/m²año)</label>
                <select name="energyEfficiency" value={form.energyEfficiency} onChange={handleChange} className={sc}>
                  <option value="">Seleccionar...</option>
                  {["< 50","50–100","100–150","150–200","> 200"].map(v => (
                    <option key={v} value={v}>{v}</option>
                  ))}
                </select>
              </div>
              <div className="col-12 mb10">
                <label className={lc}>Detalles adicionales</label>
                <input name="additionalDetails" value={form.additionalDetails} onChange={handleChange}
                  className={ic} placeholder="Ej: Vista al mar, piso 8" />
              </div>
              <div className="col-12 mb10">
                <label className={lc}>Notas del agente (no visibles en el sitio)</label>
                <textarea name="agentNotes" value={form.agentNotes} onChange={handleChange}
                  className={ic} rows={4} placeholder="Observaciones internas sobre la propiedad..." />
              </div>
            </div>
          )}

          {/* ── Multimedia ── */}
          {activeTab === "media" && (
            <div className="row">

              {/* ── FOTOS ── */}
              <div className="col-12 mb20">

                {/* Zona upload */}
                <div
                  className="upload-img position-relative overflow-hidden bdrs12 text-center mb25 px-2"
                  onDrop={(e) => { e.preventDefault(); handleGalleryUpload(e.dataTransfer.files); }}
                  onDragOver={(e) => e.preventDefault()}
                  style={{ cursor: "pointer" }}
                  onClick={() => fileInputRef.current?.click()}
                >
                  <div className="icon mb15"><span className="flaticon-upload" /></div>
                  <h6 className="title fz15 mb5">Subir / Arrastrar fotos</h6>
                  <p className="text fz13 mb15">JPEG o PNG · múltiples a la vez</p>
                  <span className="ud-btn btn-white" style={{ pointerEvents: "none" }}>Buscar archivos</span>
                  <input
                    ref={fileInputRef} type="file" multiple accept="image/*"
                    className="d-none"
                    onChange={(e) => handleGalleryUpload(e.target.files)}
                  />
                </div>

                {galleryImages.length > 0 && (
                  <div className="row">

                    {/* ── PORTADA (izquierda, grande) ── */}
                    <div className="col-md-5 mb20">
                      <div style={{
                        background: "linear-gradient(135deg, #fff8f4 0%, #fff 100%)",
                        border: "2px solid #e87722",
                        borderRadius: "14px",
                        padding: "12px",
                      }}>
                        {/* Encabezado portada */}
                        <div className="d-flex align-items-center gap-2 mb10">
                          <span style={{
                            background: "#e87722", color: "#fff",
                            borderRadius: "20px", padding: "3px 12px",
                            fontSize: "12px", fontWeight: 700,
                            display: "flex", alignItems: "center", gap: "4px"
                          }}>
                            <i className="fas fa-crown" style={{ fontSize: "10px" }} /> PORTADA PRINCIPAL
                          </span>
                        </div>
                        {/* Imagen portada */}
                        <div className="position-relative overflow-hidden" style={{ height: "200px", borderRadius: "10px", marginBottom: "8px" }}>
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img
                            src={galleryImages[coverIndex]}
                            alt="portada"
                            style={{ width: "100%", height: "100%", objectFit: "cover" }}
                          />
                          {/* Botón eliminar portada */}
                          <button type="button"
                            onClick={() => handleGalleryDelete(coverIndex)}
                            title="Eliminar portada"
                            style={{
                              position: "absolute", top: "8px", right: "8px",
                              width: "30px", height: "30px", borderRadius: "50%",
                              border: "none", cursor: "pointer", zIndex: 2,
                              background: "rgba(220,53,69,0.9)", color: "#fff",
                              display: "flex", alignItems: "center", justifyContent: "center",
                            }}
                          >
                            <i className="fas fa-trash-can" style={{ fontSize: "12px" }} />
                          </button>
                        </div>
                        <p className="fz12 text mb-0 text-center" style={{ color: "#e87722" }}>
                          Esta foto aparece en las tarjetas y búsquedas
                        </p>
                      </div>
                    </div>

                    {/* ── GALERÍA (derecha, miniaturas) ── */}
                    <div className="col-md-7 mb20">
                      <div style={{
                        background: "#fafafa",
                        border: "1px solid #e9e9e9",
                        borderRadius: "14px",
                        padding: "12px",
                        minHeight: "240px",
                      }}>
                        {/* Encabezado galería */}
                        <div className="d-flex align-items-center justify-content-between mb10">
                          <span style={{ fontWeight: 700, fontSize: "13px", color: "#444" }}>
                            <i className="fas fa-images me-1" style={{ color: "#888" }} />
                            GALERÍA ({galleryImages.length} foto{galleryImages.length !== 1 ? "s" : ""})
                          </span>
                          <span className="fz11 text">⭐ = cambiar portada</span>
                        </div>
                        {/* Grid de miniaturas */}
                        <div className="row g-2">
                          {galleryImages.map((src, idx) => {
                            const isCover = coverIndex === idx;
                            return (
                              <div key={idx} className="col-4">
                                <div style={{
                                  border: `2px solid ${isCover ? "#e87722" : "#e0e0e0"}`,
                                  borderRadius: "8px",
                                  overflow: "hidden",
                                  position: "relative",
                                  opacity: isCover ? 1 : 0.85,
                                }}>
                                  <div style={{ height: "70px", position: "relative" }}>
                                    {/* eslint-disable-next-line @next/next/no-img-element */}
                                    <img
                                      src={src}
                                      alt={`foto-${idx + 1}`}
                                      style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
                                    />
                                    {/* Estrella */}
                                    <button type="button"
                                      onClick={() => setCoverIndex(idx)}
                                      title={isCover ? "Portada actual" : "Definir como portada"}
                                      style={{
                                        position: "absolute", top: "4px", left: "4px",
                                        width: "22px", height: "22px", borderRadius: "50%",
                                        border: "none", cursor: isCover ? "default" : "pointer", zIndex: 2,
                                        background: isCover ? "#e87722" : "rgba(255,255,255,0.85)",
                                        color: isCover ? "#fff" : "#888",
                                        display: "flex", alignItems: "center", justifyContent: "center",
                                        fontSize: "9px",
                                      }}
                                    >
                                      <i className={isCover ? "fas fa-star" : "far fa-star"} />
                                    </button>
                                    {/* Eliminar */}
                                    {!isCover && (
                                      <button type="button"
                                        onClick={() => handleGalleryDelete(idx)}
                                        title="Eliminar"
                                        style={{
                                          position: "absolute", top: "4px", right: "4px",
                                          width: "22px", height: "22px", borderRadius: "50%",
                                          border: "none", cursor: "pointer", zIndex: 2,
                                          background: "rgba(220,53,69,0.85)", color: "#fff",
                                          display: "flex", alignItems: "center", justifyContent: "center",
                                          fontSize: "9px",
                                        }}
                                      >
                                        <i className="fas fa-times" />
                                      </button>
                                    )}
                                  </div>
                                  {/* Label debajo */}
                                  <div style={{
                                    padding: "2px 4px",
                                    textAlign: "center",
                                    background: isCover ? "#e87722" : "#f5f5f5",
                                    fontSize: "10px",
                                    fontWeight: 600,
                                    color: isCover ? "#fff" : "#888",
                                  }}>
                                    {isCover ? "★ Portada" : `Foto ${idx + 1}`}
                                  </div>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    </div>

                  </div>
                )}
              </div>


              {/* ── Video ── */}
              <div className="col-12 mb10">
                <label className={lc}>Enlace del video (YouTube/Vimeo)</label>
                <input name="videoUrl" value={form.videoUrl} onChange={handleChange}
                  className={ic} placeholder="Ej: https://www.youtube.com/watch?v=..." />
              </div>
              {/* ── Tour virtual ── */}
              <div className="col-12 mb10">
                <label className={lc}>Tour virtual 3D (Matterport u otro)</label>
                <input name="virtualTour" value={form.virtualTour} onChange={handleChange}
                  className={ic} placeholder="Ej: https://my.matterport.com/show/?m=..." />
              </div>
            </div>
          )}

          {/* Nav botones entre tabs */}
          <div className="d-flex justify-content-between align-items-center pt20" style={{ borderTop: "1px solid #f0f0f0", marginTop: "8px" }}>
            <div className="d-flex gap-2">
              {tabs.map((t, i) => i > 0 && activeTab === t.id && (
                <button key={t.id} type="button" onClick={() => setActiveTab(tabs[i-1].id)}
                  className="ud-btn btn-white2" style={{ padding: "8px 16px", fontSize: "13px" }}>
                  ← Anterior
                </button>
              ))}
              {tabs.map((t, i) => i < tabs.length - 1 && activeTab === t.id && (
                <button key={t.id} type="button" onClick={() => setActiveTab(tabs[i+1].id)}
                  className="ud-btn btn-white2" style={{ padding: "8px 16px", fontSize: "13px" }}>
                  Siguiente →
                </button>
              ))}
            </div>
            <div className="d-flex gap-3">
              <button type="button" onClick={onClose} className="ud-btn btn-white2" disabled={saving}>
                Cancelar
              </button>
              <button type="submit" className="ud-btn btn-thm" disabled={saving}>
                {saving ? "Guardando..." : "Guardar cambios"}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

const DeleteModal = ({ property, onClose, onDeleted }) => {
  const [deleting, setDeleting] = useState(false);
  const [error, setError]       = useState(null);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, []);

  const handleDelete = async () => {
    setDeleting(true);
    setError(null);
    try {
      const res = await fetch("/api/propiedades", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: property.id }),
      });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Error al eliminar");
      }
      onDeleted();
    } catch (err) {
      setError(err.message);
      setDeleting(false);
    }
  };

  return (
    <div
      style={{ position: "fixed", inset: 0, zIndex: 9999, background: "rgba(0,0,0,0.55)",
        display: "flex", alignItems: "center", justifyContent: "center", padding: "16px" }}
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div style={{ background: "#fff", borderRadius: "16px", width: "100%", maxWidth: "440px",
        padding: "32px", boxShadow: "0 20px 60px rgba(0,0,0,0.25)", textAlign: "center" }}>
        <div style={{ fontSize: "48px", marginBottom: "12px" }}>🗑️</div>
        <h4 className="title mb10">Eliminar propiedad?</h4>
        <p className="text mb20">
          <strong>{property.title}</strong><br />
          Esta accion es irreversible.
        </p>
        {error && <div className="alert alert-danger mb20" role="alert">{error}</div>}
        <div className="d-flex gap-3 justify-content-center">
          <button onClick={onClose} className="ud-btn btn-white2" disabled={deleting}>
            Cancelar
          </button>
          <button onClick={handleDelete} disabled={deleting} className="ud-btn"
            style={{ background: "#dc3545", color: "#fff", border: "none" }}>
            {deleting ? "Eliminando..." : "Si, eliminar"}
          </button>
        </div>
      </div>
    </div>
  );
};

const PropertyDataTable = () => {
  const [properties, setProperties]     = useState([]);
  const [loading, setLoading]           = useState(true);
  const [error, setError]               = useState(null);
  const [editTarget, setEditTarget]     = useState(null);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [toast, setToast]               = useState(null);
  const [pageNumber, setPageNumber]     = useState(1);

  const showToast = (type, text) => {
    setToast({ type, text });
    setTimeout(() => setToast(null), 3500);
  };

  const loadProperties = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/propiedades", { cache: "no-store" });
      if (!res.ok) throw new Error("No se pudo cargar la lista de propiedades");
      const data = await res.json();
      setProperties(Array.isArray(data) ? data : []);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { loadProperties(); }, [loadProperties]);

  const handleEditSaved = () => {
    setEditTarget(null);
    loadProperties();
    showToast("success", "Propiedad actualizada correctamente.");
  };

  const handleDeleted = () => {
    setDeleteTarget(null);
    loadProperties();
    showToast("success", "Propiedad eliminada correctamente.");
  };

  const handleDuplicate = async (property) => {
    try {
      showToast("success", "Duplicando propiedad...");
      const duplicatedData = { ...property };
      
      // Eliminar IDs para que la BD o la API generen unos nuevos
      delete duplicatedData.id;
      delete duplicatedData.propertyId;
      delete duplicatedData.created_at;
      delete duplicatedData.updated_at;
      
      duplicatedData.title = `${property.title} (Copia)`;
      duplicatedData.status = "Pending";
      
      // Parsear imágenes si vienen como string JSON para enviarlas correctamente
      if (typeof duplicatedData.images === "string") {
        try {
          duplicatedData.images = JSON.parse(duplicatedData.images);
        } catch(e) {}
      }
      
      const res = await fetch("/api/propiedades", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(duplicatedData),
      });

      if (!res.ok) {
        throw new Error("Error al duplicar la propiedad");
      }

      showToast("success", "Propiedad duplicada correctamente.");
      loadProperties();
    } catch (err) {
      showToast("error", err.message);
    }
  };

  if (loading) {
    return (
      <div className="text-center py-5">
        <div className="spinner-border text-thm" role="status">
          <span className="visually-hidden">Cargando...</span>
        </div>
        <p className="text mt15">Cargando propiedades...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="alert alert-danger" role="alert">
        <strong>Error:</strong> {error}
        <button className="btn btn-sm btn-outline-danger ms-3" onClick={loadProperties}>
          Reintentar
        </button>
      </div>
    );
  }

  if (properties.length === 0) {
    return (
      <div className="text-center py-5">
        <div style={{ fontSize: "48px" }}>🏠</div>
        <h5 className="title mt15 mb10">No tienes propiedades aun</h5>
        <p className="text mb20">Agrega tu primera propiedad para que aparezca aqui.</p>
        <a href="/dashboard-add-property" className="ud-btn btn-thm">
          Agregar propiedad <i className="fal fa-arrow-right-long ms-2" />
        </a>
      </div>
    );
  }

  return (
    <>
      {toast && (
        <div role="alert" style={{ position: "fixed", top: "24px", right: "24px", zIndex: 99999,
          background: toast.type === "success" ? "#198754" : "#dc3545", color: "#fff",
          borderRadius: "10px", padding: "14px 24px", fontSize: "15px",
          boxShadow: "0 8px 30px rgba(0,0,0,0.2)", maxWidth: "380px" }}>
          {toast.text}
        </div>
      )}

      {editTarget && (
        <EditModal property={editTarget} onClose={() => setEditTarget(null)} onSaved={handleEditSaved} />
      )}
      {deleteTarget && (
        <DeleteModal property={deleteTarget} onClose={() => setDeleteTarget(null)} onDeleted={handleDeleted} />
      )}

      {/* Paginación dinámica cliente */}
      {(() => {
        const pageCapacity = 8;
        const startIndex = (pageNumber - 1) * pageCapacity;
        const paginatedProperties = properties.slice(startIndex, startIndex + pageCapacity);

        return (
          <>
            <table className="table-style3 table at-savesearch">
              <thead className="t-head">
                <tr>
                  <th scope="col">Titulo</th>
                  <th scope="col">Categoria</th>
                  <th scope="col">Estado</th>
                  <th scope="col">Precio</th>
                  <th scope="col">Acciones</th>
                </tr>
              </thead>
              <tbody className="t-body">
                {paginatedProperties.map((property) => {
                  let coverImg = "/images/listings/list-1.jpg";
                  if (property.cover_image) {
                    coverImg = property.cover_image;
                  } else if (property.coverImage) {
                    coverImg = property.coverImage;
                  } else if (Array.isArray(property.images) && property.images.length > 0) {
                    coverImg = property.images[0];
                  } else if (typeof property.images === "string") {
                    try {
                      const arr = JSON.parse(property.images);
                      if (arr.length > 0) coverImg = arr[0];
                    } catch (e) {}
                  }

                  return (
                    <tr key={property.id}>
                      <th scope="row">
                        <div className="listing-style1 dashboard-style d-xxl-flex align-items-center mb-0">
                          <div className="list-thumb">
                            <Image width={110} height={94} className="w-100"
                              src={coverImg} alt={property.title || "propiedad"}
                              style={{ objectFit: "cover", borderRadius: "8px" }} />
                          </div>
                          <div className="list-content py-0 p-0 mt-2 mt-xxl-0 ps-xxl-4">
                              {property.id
                                ? <Link href={'/propiedades/' + property.id}>{property.title}</Link>
                                : <span>{property.title}</span>}
                            <p className="list-text mb-0">{property.address || property.location || "—"}</p>
                          </div>
                        </div>
                      </th>
                      <td className="vam"><span className="fz13">{property.category || "—"}</span></td>
                      <td className="vam">
                        <span className={getStatusStyle(property.status)}>
                          {translateStatus(property.status || "Pending")}
                        </span>
                      </td>
                      <td className="vam">
                        <span className="fz13 fw500">
                          {property.price
                            ? Number(property.price).toLocaleString("es-CL") + " " + (property.priceSuffix || "")
                            : "—"}
                        </span>
                      </td>
                      <td className="vam">
                        <div className="d-flex gap-2">
                          <Link
                            href={`/dashboard-add-property?edit=${property.id}`}
                            className="icon d-flex align-items-center justify-content-center"
                            style={{ border: "none", background: "none", color: "#6b7280" }}
                            title="Editar"
                          >
                            <span className="fas fa-pen fa" />
                          </Link>
                          <button
                            className="icon"
                            style={{ border: "none", background: "none", color: "#6b7280" }}
                            title="Duplicar"
                            onClick={() => handleDuplicate(property)}
                            aria-label={"Duplicar " + property.title}
                          >
                            <span className="far fa-copy fa" />
                          </button>
                          <button
                            className="icon"
                            style={{ border: "none", background: "none" }}
                            title="Eliminar"
                            onClick={() => setDeleteTarget(property)}
                            aria-label={"Eliminar " + property.title}
                          >
                            <span className="flaticon-bin" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>

            {/* Paginador funcional */}
            <div className="mt30">
              <PaginationTwo
                pageCapacity={pageCapacity}
                data={properties}
                pageNumber={pageNumber}
                setPageNumber={setPageNumber}
                type="propiedades"
              />
            </div>
          </>
        );
      })()}
    </>
  );
};

export default PropertyDataTable;
