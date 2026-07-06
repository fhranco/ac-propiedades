"use client";
import React from "react";

const structureTypeOptions = [
  { value: "Departamento", label: "Departamento" },
  { value: "Casa", label: "Casa" },
  { value: "Oficina", label: "Oficina" },
  { value: "Loft", label: "Loft" },
  { value: "Cabaña", label: "Cabaña" },
  { value: "Terreno", label: "Terreno" },
];

const StructureType = ({ initialData }) => {
  return (
    <div className="col-sm-6 col-xl-4">
      <div className="mb20">
        <label className="heading-color ff-heading fw600 mb10">
          Tipo de estructura
        </label>
        <div className="location-area">
          <select
            name="structureType"
            className="form-select select-custom"
            defaultValue={initialData?.tipo_estructura || "Departamento"}
            required
          >
            {structureTypeOptions.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
};

export default StructureType;
