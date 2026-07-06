"use client";
import React from "react";

const amenitiesData = {
  column1: [
    { label: "Estacionamiento", defaultChecked: true },
    { label: "Bodega", defaultChecked: false },
    { label: "Jardín", defaultChecked: false },
    { label: "Terraza", defaultChecked: false },
    { label: "Patio", defaultChecked: false },
    { label: "Quincho / BBQ", defaultChecked: false },
    { label: "Piscina", defaultChecked: false },
    { label: "Piscina climatizada", defaultChecked: false },
    { label: "Sauna", defaultChecked: false }
  ],
  column2: [
    { label: "Calefacción central", defaultChecked: true },
    { label: "Calefacción a gas", defaultChecked: false },
    { label: "Calefacción eléctrica", defaultChecked: false },
    { label: "Chimenea", defaultChecked: false },
    { label: "Aire acondicionado", defaultChecked: false },
    { label: "Agua caliente 24h", defaultChecked: true },
    { label: "Panel solar", defaultChecked: false }
  ],
  column3: [
    { label: "Portería / Conserjería", defaultChecked: false },
    { label: "Cámara de seguridad", defaultChecked: false },
    { label: "Alarma", defaultChecked: false },
    { label: "Citófono", defaultChecked: true },
    { label: "Puerta blindada", defaultChecked: false },
    { label: "Reja perimetral", defaultChecked: false },
    { label: "Condominio cerrado", defaultChecked: false }
  ],
  column4: [
    { label: "Fibra óptica / Internet", defaultChecked: true },
    { label: "TV cable / satélite", defaultChecked: false },
    { label: "Lavandería", defaultChecked: false },
    { label: "Sala de gimnasio", defaultChecked: false },
    { label: "Sala de eventos", defaultChecked: false },
    { label: "Ascensor", defaultChecked: false },
    { label: "Acceso para discapacitados", defaultChecked: false }
  ]
};

const Amenities = ({ initialData }) => {
  const ams = initialData && Array.isArray(initialData.amenities) ? initialData.amenities : [];

  return (
    <div className="row">
      {Object.keys(amenitiesData).map((columnKey, index) => (
        <div key={index} className="col-sm-6 col-lg-3">
          <div className="checkbox-style1">
            {amenitiesData[columnKey].map((amenity, amenityIndex) => (
              <label key={amenityIndex} className="custom_checkbox">
                {amenity.label}
                <input
                  type="checkbox"
                  name={`amenity_${amenity.label.replace(/\s+/g, "_").toLowerCase()}`}
                  value={amenity.label}
                  defaultChecked={
                    initialData ? ams.includes(amenity.label) : amenity.defaultChecked
                  }
                />
                <span className="checkmark" />
              </label>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Amenities;
