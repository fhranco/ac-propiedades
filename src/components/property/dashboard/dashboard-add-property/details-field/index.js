"use client";
import React from "react";
import StructureType from "./StructureType";

const DetailsFiled = ({ initialData }) => {
  return (
    <div className="form-style1">
      <div className="row">
        <div className="col-sm-6 col-xl-4">
          <div className="mb20">
            <label className="heading-color ff-heading fw600 mb10">
              Superficie total (m²)
            </label>
            <input 
              type="text" 
              name="sqft"
              className="form-control" 
              placeholder="Ej: 85" 
              defaultValue={initialData?.area || ""}
            />
          </div>
        </div>

        <div className="col-sm-6 col-xl-4">
          <div className="mb20">
            <label className="heading-color ff-heading fw600 mb10">
              Superficie del terreno (m²)
            </label>
            <input 
              type="text" 
              name="landArea"
              className="form-control" 
              placeholder="Ej: 200" 
              defaultValue={initialData?.superficie_terreno || ""}
            />
          </div>
        </div>

        <div className="col-sm-6 col-xl-4">
          <div className="mb20">
            <label className="heading-color ff-heading fw600 mb10">Habitaciones</label>
            <input 
              type="text" 
              name="rooms"
              className="form-control" 
              placeholder="Ej: 3" 
              defaultValue={initialData?.habitaciones || ""}
            />
          </div>
        </div>

        <div className="col-sm-6 col-xl-4">
          <div className="mb20">
            <label className="heading-color ff-heading fw600 mb10">Dormitorios</label>
            <input 
              type="text" 
              name="bedrooms"
              className="form-control" 
              placeholder="Ej: 2" 
              defaultValue={initialData?.bedrooms || ""}
            />
          </div>
        </div>

        <div className="col-sm-6 col-xl-4">
          <div className="mb20">
            <label className="heading-color ff-heading fw600 mb10">Baños</label>
            <input 
              type="text" 
              name="bathrooms"
              className="form-control" 
              placeholder="Ej: 2" 
              defaultValue={initialData?.bathrooms || ""}
            />
          </div>
        </div>

        <div className="col-sm-6 col-xl-4">
          <div className="mb20">
            <label className="heading-color ff-heading fw600 mb10">
              ID Propiedad (ingreso manual)
            </label>
            <input 
              type="text" 
              name="propertyIdManual"
              className="form-control" 
              placeholder="Ej: AC-2024-001" 
              defaultValue={initialData?.id_ingreso_manual || ""}
            />
          </div>
        </div>

        <div className="col-sm-6 col-xl-4">
          <div className="mb20">
            <label className="heading-color ff-heading fw600 mb10">Estacionamientos</label>
            <input 
              type="text" 
              name="garages"
              className="form-control" 
              placeholder="Ej: 1" 
              defaultValue={initialData?.garage || ""}
            />
          </div>
        </div>

        <div className="col-sm-6 col-xl-4">
          <div className="col-sm-12">
            <div className="mb20">
              <label className="heading-color ff-heading fw600 mb10">
                Tamaño del estacionamiento
              </label>
              <input 
                type="text" 
                name="garageSize"
                className="form-control" 
                placeholder="Ej: 15 m²" 
                defaultValue={initialData?.tamano_estacionamiento || ""}
              />
            </div>
          </div>
        </div>

        <div className="col-sm-6 col-xl-4">
          <div className="mb20">
            <label className="heading-color ff-heading fw600 mb10">Año de construcción</label>
            <input 
              type="text" 
              name="yearBuilt"
              className="form-control" 
              placeholder="Ej: 2010" 
              defaultValue={initialData?.year_building || ""}
            />
          </div>
        </div>

        <div className="col-sm-6 col-xl-4">
          <div className="mb20">
            <label className="heading-color ff-heading fw600 mb10">
              Disponible desde (fecha)
            </label>
            <input 
              type="text" 
              name="availableFrom"
              className="form-control" 
              placeholder="dd/mm/aaaa" 
              defaultValue={initialData?.disponible_desde || ""}
            />
          </div>
        </div>

        <div className="col-sm-6 col-xl-4">
          <div className="mb20">
            <label className="heading-color ff-heading fw600 mb10">
              Subterráneo / Bodega
            </label>
            <input 
              type="text" 
              name="basement"
              className="form-control" 
              placeholder="Ej: Bodega 12 m²" 
              defaultValue={initialData?.subterraneo_bodega || ""}
            />
          </div>
        </div>

        <div className="col-sm-6 col-xl-4">
          <div className="mb20">
            <label className="heading-color ff-heading fw600 mb10">Detalles adicionales</label>
            <input 
              type="text" 
              name="additionalDetails"
              className="form-control" 
              placeholder="Ej: Vista al mar, piso 8" 
              defaultValue={initialData?.detalles_adicionales || ""}
            />
          </div>
        </div>

        <div className="col-sm-6 col-xl-4">
          <div className="mb20">
            <label className="heading-color ff-heading fw600 mb10">Tipo de techo</label>
            <input 
              type="text" 
              name="roofType"
              className="form-control" 
              placeholder="Ej: Zinc, Teja, Losa" 
              defaultValue={initialData?.tipo_techo || ""}
            />
          </div>
        </div>

        <div className="col-sm-6 col-xl-4">
          <div className="mb20">
            <label className="heading-color ff-heading fw600 mb10">Material exterior</label>
            <input
              type="text"
              name="exteriorMaterial"
              className="form-control"
              placeholder="Ej: Hormigón, Madera, Ladrillo"
              defaultValue={initialData?.material_exterior || ""}
            />
          </div>
        </div>

        <StructureType initialData={initialData} />
      </div>

      <div className="row">
        {/* N° de piso cambiado a campo de texto */}
        <div className="col-sm-6 col-xl-4">
          <div className="mb20">
            <label className="heading-color ff-heading fw600 mb10">
              N° de piso
            </label>
            <input 
              type="text" 
              name="floorNumber"
              className="form-control" 
              placeholder="Ej: 2" 
              defaultValue={initialData?.num_piso || ""}
            />
          </div>
        </div>

        <div className="col-sm-12">
          <div className="mb20">
            <label className="heading-color ff-heading fw600 mb10">
              Notas del agente (no visibles en el sitio)
            </label>
            <textarea
              cols={30}
              rows={5}
              name="agentNotes"
              placeholder="Observaciones internas sobre la propiedad..."
              defaultValue={initialData?.notas_agente || ""}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailsFiled;
