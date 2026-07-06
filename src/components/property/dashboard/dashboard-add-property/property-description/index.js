"use client";
import React from "react";

const PropertyDescription = ({ initialData }) => {
  const catergoryOptions = [
    { value: "Casa", label: "Casa" },
    { value: "Departamento", label: "Departamento" },
    { value: "Oficina", label: "Oficina" },
    { value: "Bodega", label: "Bodega/Almacén" },
    { value: "Local", label: "Local comercial" },
    { value: "Lote", label: "Lote" },
    { value: "Parcela", label: "Parcela" },
  ];
  
  const listedIn = [
    { value: "All Listing", label: "Todos los listados" },
    { value: "Active", label: "Activo" },
    { value: "Sold", label: "Vendido" },
    { value: "Processing", label: "En proceso" },
  ];
  
  const PropertyStatus = [
    { value: "Published", label: "Publicado" },
    { value: "Pending", label: "Pendiente" },
    { value: "Processing", label: "En proceso" }
  ];

  const usoTipoOptions = [
    { value: "Residencial", label: "Residencial" },
    { value: "Comercial", label: "Comercial" },
    { value: "Uso Mixto", label: "Uso Mixto" }
  ];

  return (
    <div className="form-style1">
      <div className="row">
        {/* Sección de Datos Visuales de la Propiedad */}
        <div className="col-sm-12">
          <div className="mb20">
            <label className="heading-color ff-heading fw600 mb10">Título Visual de la Propiedad</label>
            <input
              type="text"
              name="title"
              className="form-control"
              placeholder="Ej: Hermoso departamento central frente al estrecho"
              defaultValue={initialData?.title || ""}
            />
          </div>
          <div className="mb20">
            <label className="heading-color ff-heading fw600 mb10">ID de la propiedad</label>
            <input
              type="text"
              name="propertyId"
              className="form-control"
              placeholder="Ej: PROP-00123"
              defaultValue={initialData?.id_ingreso_manual || initialData?.id || ""}
            />
          </div>
        </div>

        <div className="col-sm-12">
          <div className="mb20">
            <label className="heading-color ff-heading fw600 mb10">Descripción de la Propiedad</label>
            <textarea
              cols={30}
              rows={5}
              name="description"
              placeholder="Escribe una descripción completa y atractiva de la propiedad..."
              defaultValue={initialData?.description || ""}
            />
          </div>
        </div>

        <div className="col-sm-6 col-xl-4">
          <div className="mb20">
            <label className="heading-color ff-heading fw600 mb10">Seleccionar categoría</label>
            <div className="location-area">
              <select
                name="category"
                className="form-select select-custom"
                defaultValue={initialData?.category || "Departamento"}
              >
                {catergoryOptions.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        <div className="col-sm-6 col-xl-4">
          <div className="mb20">
            <label className="heading-color ff-heading fw600 mb10">Listar en</label>
            <div className="location-area">
              <select
                name="listedIn"
                className="form-select select-custom"
                defaultValue={initialData?.type === "Venta" ? "Active" : "Processing"}
              >
                {listedIn.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        <div className="col-sm-6 col-xl-4">
          <div className="mb20">
            <label className="heading-color ff-heading fw600 mb10">Estado de la propiedad</label>
            <div className="location-area">
              <select
                name="status"
                className="form-select select-custom"
                defaultValue={initialData?.status === "Disponible" ? "Published" : "Pending"}
              >
                {PropertyStatus.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        <div className="col-sm-6 col-xl-4">
          <div className="mb30">
            <label className="heading-color ff-heading fw600 mb10">Precio ($ / UF)</label>
            <input
              type="text"
              name="price"
              className="form-control"
              placeholder="Ej: 120000"
              defaultValue={initialData?.price || ""}
            />
          </div>
        </div>

        <div className="col-sm-6 col-xl-4">
          <div className="mb30">
            <label className="heading-color ff-heading fw600 mb10">Contribuciones anuales</label>
            <input
              type="text"
              name="tax"
              className="form-control"
              placeholder="Ej: 45000"
              defaultValue={initialData?.contribuciones || ""}
            />
          </div>
        </div>

        <div className="col-sm-6 col-xl-4">
          <div className="mb30">
            <label className="heading-color ff-heading fw600 mb10">Sufijo del precio</label>
            <input
              type="text"
              name="priceSuffix"
              className="form-control"
              placeholder="Ej: mensual, total, UF"
              defaultValue={initialData?.sufijo_precio || ""}
            />
          </div>
        </div>

        {/* ========================================================================= */}
        {/* SECCIÓN AVANZADA: POSICIONAMIENTO Y CONFIGURACIÓN SEO (Google) */}
        {/* ========================================================================= */}
        <div className="col-sm-12 mt40 mb20">
          <hr />
          <h4 className="title fz17 text-thm" style={{ color: "#eb6753", fontWeight: "600" }}>
            <i className="fas fa-search-plus me-2" />
            Configuración Avanzada SEO y Ficha (Google)
          </h4>
          <p className="text-muted fz14">Establece metadatos específicos para mejorar la indexación en buscadores.</p>
        </div>

        <div className="col-sm-12">
          <div className="mb20">
            <label className="heading-color ff-heading fw600 mb10">Título SEO (Recomendado 50-60 caracteres)</label>
            <input
              type="text"
              name="seoTitle"
              className="form-control"
              placeholder="Ej: Casa en venta en Villa Jardín de la Patagonia, Punta Arenas – Uso comercial"
              defaultValue={initialData?.seo_title || ""}
            />
          </div>
        </div>

        <div className="col-sm-12">
          <div className="mb20">
            <label className="heading-color ff-heading fw600 mb10">Meta Descripción SEO (Máximo 155 caracteres)</label>
            <textarea
              cols={30}
              rows={2}
              name="seoDescription"
              className="form-control"
              placeholder="Escribe la metadescripción para los resultados de búsqueda de Google..."
              style={{ height: "auto" }}
              defaultValue={initialData?.seo_description || ""}
            />
          </div>
        </div>

        <div className="col-sm-12">
          <div className="mb20">
            <label className="heading-color ff-heading fw600 mb10">Palabras Clave SEO (Separadas por comas)</label>
            <input
              type="text"
              name="seoKeywords"
              className="form-control"
              placeholder="Ej: casa en venta en Punta Arenas, casa uso comercial Punta Arenas"
              defaultValue={initialData?.seo_keywords || ""}
            />
          </div>
        </div>

        <div className="col-sm-12">
          <div className="mb20">
            <label className="heading-color ff-heading fw600 mb10">Extracto SEO Corto (Resumen de 1-2 líneas)</label>
            <input
              type="text"
              name="seoExtract"
              className="form-control"
              placeholder="Resumen corto de la propiedad que destaque el atributo principal..."
              defaultValue={initialData?.seo_extract || ""}
            />
          </div>
        </div>

        <div className="col-sm-6 col-xl-4">
          <div className="mb20">
            <label className="heading-color ff-heading fw600 mb10">Tipo de Uso</label>
            <div className="location-area">
              <select
                name="usoTipo"
                className="form-select select-custom"
                defaultValue={initialData?.uso_tipo || "Residencial"}
              >
                {usoTipoOptions.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        <div className="col-sm-6 col-xl-4">
          <div className="mb20">
            <label className="heading-color ff-heading fw600 mb10">Sector / Barrio de la ciudad</label>
            <input
              type="text"
              name="sectorBarrio"
              className="form-control"
              placeholder="Ej: Villa Jardín de la Patagonia"
              defaultValue={initialData?.sector_barrio || ""}
            />
          </div>
        </div>

        <div className="col-sm-12 col-md-6">
          <div className="mb20">
            <label className="heading-color ff-heading fw600 mb10">Detalle Espacios Comerciales (Si aplica)</label>
            <input
              type="text"
              name="espaciosComerciales"
              className="form-control"
              placeholder="Ej: Hall de recepción + 2 salas multiuso + 1 baño visita"
              defaultValue={initialData?.espacios_comerciales || ""}
            />
          </div>
        </div>

        <div className="col-sm-12 col-md-6">
          <div className="mb20">
            <label className="heading-color ff-heading fw600 mb10">Detalle Espacios Habitacionales (Si aplica)</label>
            <input
              type="text"
              name="espaciosHabitacionales"
              className="form-control"
              placeholder="Ej: 1 dormitorio principal, 1 baño completo, living comedor"
              defaultValue={initialData?.espacios_habitacionales || ""}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyDescription;
