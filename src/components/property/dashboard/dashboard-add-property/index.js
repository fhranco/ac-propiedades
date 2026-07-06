"use client";
import React, { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import PropertyDescription from "./property-description";
import UploadMedia from "./upload-media";
import LocationField from "./LocationField";
import DetailsFiled from "./details-field";
import Amenities from "./Amenities";

const AddPropertyTabContent = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const editId = searchParams.get("edit");

  const [statusMessage, setStatusMessage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [initialData, setInitialData] = useState(null);
  const [existingImages, setExistingImages] = useState([]);

  // Cargar datos de la propiedad si estamos en modo edición
  useEffect(() => {
    if (editId) {
      const fetchProperty = async () => {
        try {
          console.log("AddPropertyPage: fetching properties from API for editId:", editId);
          const res = await fetch(`/api/propiedades`, { cache: "no-store" });
          if (res.ok) {
            const list = await res.json();
            console.log("AddPropertyPage: list returned:", list.length, "items");
            const found = list.find((item) => String(item.id) === String(editId));
            console.log("AddPropertyPage: found item:", found);
            if (found) {
              setInitialData(found);
              
              // Extraer imágenes existentes de Supabase
              let imgsArray = [];
              if (found.images) {
                if (Array.isArray(found.images)) {
                  imgsArray = found.images;
                } else if (typeof found.images === "string") {
                  try { imgsArray = JSON.parse(found.images); } catch {}
                }
              }
              setExistingImages(imgsArray);

              // Llenar campos del formulario de forma dinámica
              setTimeout(() => {
                const formEl = document.querySelector("#add-property-form");
                if (formEl) {
                  const fields = [
                    { name: "title", value: found.title },
                    { name: "propertyId", value: found.id_ingreso_manual || found.id },
                    { name: "description", value: found.description },
                    { name: "price", value: found.price },
                    { name: "tax", value: found.contribuciones },
                    { name: "priceSuffix", value: found.sufijo_precio },
                    // SEO
                    { name: "seoTitle", value: found.seo_title },
                    { name: "seoDescription", value: found.seo_description },
                    { name: "seoKeywords", value: found.seo_keywords },
                    { name: "seoExtract", value: found.seo_extract },
                    { name: "usoTipo", value: found.uso_tipo },
                    { name: "sectorBarrio", value: found.sector_barrio },
                    { name: "espaciosComerciales", value: found.espacios_comerciales },
                    { name: "espaciosHabitacionales", value: found.espacios_habitacionales },
                    // Ubicación
                    { name: "address", value: found.address },
                    { name: "provincia", value: found.provincia },
                    { name: "comuna", value: found.comuna },
                    { name: "zip", value: found.codigo_postal },
                    { name: "lat", value: found.lat },
                    { name: "lng", value: found.lng },
                    // Detalles
                    { name: "sqft", value: found.area },
                    { name: "landArea", value: found.superficie_terreno },
                    { name: "rooms", value: found.habitaciones },
                    { name: "bedrooms", value: found.bedrooms },
                    { name: "bathrooms", value: found.bathrooms },
                    { name: "garages", value: found.garage },
                    { name: "tamanoEstacionamiento", value: found.tamano_estacionamiento },
                    { name: "yearBuilt", value: found.year_building },
                    { name: "disponibleDesde", value: found.disponible_desde },
                    { name: "subterraneoBodega", value: found.subterraneo_bodega },
                    { name: "detallesAdicionales", value: found.detalles_adicionales },
                    { name: "tipoTecho", value: found.tipo_techo },
                    { name: "materialExterior", value: found.material_exterior },
                    { name: "tipoEstructura", value: found.tipo_estructura },
                    { name: "numPiso", value: found.num_piso },
                    { name: "claseEnergetica", value: found.clase_energetica },
                    { name: "eficienciaEnergetica", value: found.eficiencia_energetica },
                    { name: "notasAgente", value: found.notas_agente },
                    // Multimedia
                    { name: "videoUrl", value: found.video_url },
                    { name: "tour360Url", value: found.tour_360_url }
                  ];

                  fields.forEach((f) => {
                    const input = formEl.querySelector(`[name="${f.name}"]`);
                    if (input) input.value = f.value || "";
                  });

                   // Llenar selectores
                   const selectMappings = {
                     category: found.category,
                     listedIn: found.type === "Venta" ? "Active" : "Processing",
                     status: found.status === "Disponible" ? "Published" : "Pending",
                     usoTipo: found.uso_tipo,
                     structureType: found.tipo_estructura,
                     floorNumber: found.num_piso,
                     energyClass: found.clase_energetica,
                     energyEfficiency: found.eficiencia_energetica
                   };

                   Object.entries(selectMappings).forEach(([name, val]) => {
                     const select = formEl.querySelector(`select[name="${name}"]`);
                     if (select) select.value = val || "";
                   });

                  // Llenar checkboxes de Amenities
                  if (found.amenities) {
                    const ams = Array.isArray(found.amenities) ? found.amenities : [];
                    formEl.querySelectorAll('input[type="checkbox"]').forEach((cb) => {
                      cb.checked = ams.includes(cb.value);
                    });
                  }
                }
              }, 500);
            }
          }
        } catch (e) {
          console.error("Error al cargar la propiedad para edición:", e);
        }
      };
      fetchProperty();
    }
  }, [editId]);

  // Recopilar datos y guardar (Crear POST / Actualizar PUT)
  const handleSaveClick = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatusMessage(null);

    const formEl = document.querySelector("#add-property-form");
    if (!formEl) {
      setStatusMessage({ type: 'error', text: 'Error: No se encontró el formulario.' });
      setLoading(false);
      return;
    }

    const formData = new FormData(formEl);
    const data = Object.fromEntries(formData.entries());

    // Mapear características seleccionadas
    const amenities = [];
    formEl.querySelectorAll('input[type="checkbox"]:checked').forEach((el) => {
      amenities.push(el.value);
    });

    // Mapear y decodificar fotos desde el JSON de la galería
    let imagesPayload = ["/images/listings/listing-single-1.jpg"];
    if (data.imagesJson) {
      try {
        const parsed = JSON.parse(data.imagesJson);
        if (parsed.length > 0) {
          imagesPayload = parsed;
          // Reordenar para que la imagen seleccionada como portada (coverImageIndex) esté siempre en el índice 0
          const coverIdx = Number(formData.get("coverImageIndex")) || 0;
          if (coverIdx > 0 && coverIdx < imagesPayload.length) {
            const coverImg = imagesPayload[coverIdx];
            imagesPayload.splice(coverIdx, 1);
            imagesPayload.unshift(coverImg);
          }
        }
      } catch (e) {}
    }

    const parseNum = (val) => {
      if (!val) return 0;
      // Remueve todo lo que no sea número o punto decimal (para soportar decimales). 
      // Si el usuario usa puntos como separador de miles, los removemos.
      const clean = String(val).replace(/\./g, "").replace(/,/g, ".");
      const num = parseFloat(clean);
      return isNaN(num) ? 0 : num;
    };

    const propertyPayload = {
      title: data.title || "Propiedad sin título",
      id_ingreso_manual: data.propertyId,
      description: data.description,
      category: data.category,
      type: data.listedIn === "Active" ? "Venta" : "Arriendo",
      status: data.status === "Published" ? "Disponible" : "Pendiente",
      price: parseNum(data.price),
      contribuciones: parseNum(data.tax),
      sufijo_precio: data.priceSuffix,
      
      // SEO
      seo_title: data.seoTitle,
      seo_description: data.seoDescription,
      seo_keywords: data.seoKeywords,
      seo_extract: data.seoExtract,
      uso_tipo: data.usoTipo,
      sector_barrio: data.sectorBarrio,
      espacios_comerciales: data.espaciosComerciales,
      espacios_habitacionales: data.espaciosHabitacionales,

      // Ubicación
      address: data.address,
      provincia: data.provincia,
      comuna: data.comuna,
      codigo_postal: data.zip,
      latitude: data.lat ? parseFloat(data.lat) : null,
      longitude: data.lng ? parseFloat(data.lng) : null,
      
      // Detalles
      area: parseNum(data.sqft),
      superficie_terreno: parseNum(data.landArea),
      habitaciones: parseNum(data.rooms),
      bedrooms: parseNum(data.bedrooms),
      bathrooms: parseNum(data.bathrooms),
      garage: data.garages,
      tamano_estacionamiento: data.tamanoEstacionamiento,
      year_building: data.yearBuilt,
      disponible_desde: data.disponibleDesde,
      subterraneo_bodega: data.subterraneoBodega,
      detalles_adicionales: data.detallesAdicionales,
      tipo_techo: data.tipoTecho,
      material_exterior: data.materialExterior,
      tipo_estructura: data.tipoEstructura,
      num_piso: data.numPiso,
      clase_energetica: data.claseEnergetica,
      eficiencia_energetica: data.eficienciaEnergetica,
      notas_agente: data.notasAgente,

      // Multimedia
      video_url: data.videoUrl,
      tour_360_url: data.tour360Url,
      images: imagesPayload,
      amenities: amenities
    };

    try {
      const url = '/api/propiedades';
      const method = editId ? 'PUT' : 'POST';
      const body = editId 
        ? JSON.stringify({ id: editId, updates: propertyPayload })
        : JSON.stringify(propertyPayload);

      const res = await fetch(url, {
        method: method,
        headers: { 'Content-Type': 'application/json' },
        body: body,
      });
      
      if (res.ok) {
        setStatusMessage({ 
          type: 'success', 
          text: editId 
            ? '¡Propiedad actualizada exitosamente en Supabase!' 
            : '¡Propiedad añadida correctamente a la base de datos de Supabase!' 
        });
        if (!editId) formEl.reset();
        window.scrollTo({ top: 0, behavior: 'smooth' });
        
        if (editId) {
          setTimeout(() => {
            router.push("/dashboard-my-properties");
          }, 1500);
        }
      } else {
        const err = await res.json();
        setStatusMessage({ type: 'error', text: err.error || 'Error al guardar la propiedad' });
      }
    } catch (err) {
      setStatusMessage({ type: 'error', text: err.message });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <form id="add-property-form" key={initialData?.id || "new"} onSubmit={(e) => e.preventDefault()}>
        <nav>
          <div className="nav nav-tabs" id="nav-tab2" role="tablist">
            <button
              className="nav-link active fw600 ms-3"
              id="nav-item1-tab"
              data-bs-toggle="tab"
              data-bs-target="#nav-item1"
              type="button"
              role="tab"
              aria-controls="nav-item1"
              aria-selected="true"
            >
              1. Descripción
            </button>
            <button
              className="nav-link fw600"
              id="nav-item2-tab"
              data-bs-toggle="tab"
              data-bs-target="#nav-item2"
              type="button"
              role="tab"
              aria-controls="nav-item2"
              aria-selected="false"
            >
              2. Multimedia
            </button>
            <button
              className="nav-link fw600"
              id="nav-item3-tab"
              data-bs-toggle="tab"
              data-bs-target="#nav-item3"
              type="button"
              role="tab"
              aria-controls="nav-item3"
              aria-selected="false"
            >
              3. Ubicación
            </button>
            <button
              className="nav-link fw600"
              id="nav-item4-tab"
              data-bs-toggle="tab"
              data-bs-target="#nav-item4"
              type="button"
              role="tab"
              aria-controls="nav-item4"
              aria-selected="false"
            >
              4. Detalle
            </button>
            <button
              className="nav-link fw600"
              id="nav-item5-tab"
              data-bs-toggle="tab"
              data-bs-target="#nav-item5"
              type="button"
              role="tab"
              aria-controls="nav-item5"
              aria-selected="false"
            >
              5. Características
            </button>
          </div>
        </nav>

        {statusMessage && (
          <div 
            className={`alert ${statusMessage.type === 'success' ? 'alert-success' : 'alert-danger'} mt20 mb20`}
            style={{ borderRadius: "10px", padding: "12px 20px" }}
          >
            {statusMessage.text}
          </div>
        )}

        <div className="tab-content mt30" id="nav-tabContent">
          <div
            className="tab-pane fade show active"
            id="nav-item1"
            role="tabpanel"
            aria-labelledby="nav-item1-tab"
          >
            <div className="ps-widget bgc-white bdrs12 p30 overflow-hidden position-relative">
              <h4 className="title fz17 mb30">
                {editId ? "Editar descripción de la propiedad" : "Descripción de la propiedad"}
              </h4>
              <PropertyDescription initialData={initialData} />
            </div>
          </div>

          <div
            className="tab-pane fade"
            id="nav-item2"
            role="tabpanel"
            aria-labelledby="nav-item2-tab"
          >
            <UploadMedia initialImages={existingImages} initialData={initialData} />
          </div>

          <div
            className="tab-pane fade"
            id="nav-item3"
            role="tabpanel"
            aria-labelledby="nav-item3-tab"
          >
            <div className="ps-widget bgc-white bdrs12 p30 overflow-hidden position-relative">
              <h4 className="title fz17 mb30">Ubicación de la propiedad</h4>
              <LocationField initialData={initialData} />
            </div>
          </div>

          <div
            className="tab-pane fade"
            id="nav-item4"
            role="tabpanel"
            aria-labelledby="nav-item4-tab"
          >
            <div className="ps-widget bgc-white bdrs12 p30 overflow-hidden position-relative">
              <h4 className="title fz17 mb30">Detalles de la propiedad</h4>
              <DetailsFiled initialData={initialData} />
            </div>
          </div>

          <div
            className="tab-pane fade"
            id="nav-item5"
            role="tabpanel"
            aria-labelledby="nav-item5-tab"
          >
            <div className="ps-widget bgc-white bdrs12 p30 overflow-hidden position-relative mb30">
              <h4 className="title fz17 mb30">Seleccionar características</h4>
              <div className="row">
                <Amenities initialData={initialData} />
              </div>
            </div>
          </div>
        </div>

        {/* Botón de guardado dinámico */}
        <div className="d-flex justify-content-end mt30 mb50 pr30">
          <button
            type="button"
            onClick={handleSaveClick}
            disabled={loading}
            className="ud-btn btn-thm"
            style={{
              backgroundColor: "#eb6753",
              borderColor: "#eb6753",
              borderRadius: "10px",
              color: "#fff",
              fontWeight: "600",
              padding: "14px 40px",
              boxShadow: "0 10px 15px -3px rgba(235, 103, 83, 0.3)"
            }}
          >
            {loading ? (
              <>
                <i className="fas fa-spinner fa-spin me-2" />
                {editId ? "Actualizando propiedad..." : "Guardando propiedad..."}
              </>
            ) : (
              <>
                <i className={editId ? "fas fa-sync me-2" : "fas fa-save me-2"} />
                {editId ? "Actualizar Propiedad" : "Guardar Propiedad"}
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddPropertyTabContent;
