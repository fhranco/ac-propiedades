"use client";
import React from "react";

const options = {
  pisoNumero: ["1°", "2°", "3°", "4°", "5°", "6°+", "Último piso"],
  claseEnergetica: ["A", "B", "C", "D", "E", "F"],
  eficienciaEnergetica: ["< 50", "50–100", "100–150", "150–200", "> 200"],
};

const MultiSelectField = ({ initialData }) => {
  const fieldTitles = [
    "N° de piso",
    "Clase energética",
    "Eficiencia energética (kWh/m²año)",
  ];
  
  const fieldNames = [
    "floorNumber",
    "energyClass",
    "energyEfficiency"
  ];

  const defaultVals = [
    initialData?.num_piso || "",
    initialData?.clase_energetica || "",
    initialData?.eficiencia_energetica || ""
  ];

  return (
    <>
      {Object.keys(options).map((key, index) => (
        <div className="col-sm-6 col-xl-4" key={index}>
          <div className="mb20">
            <label className="heading-color ff-heading fw600 mb10">
              {fieldTitles[index]}
            </label>
            <div className="location-area">
              <select
                name={fieldNames[index]}
                className="form-select select-custom"
                defaultValue={defaultVals[index]}
                required
              >
                <option value="">Seleccionar...</option>
                {options[key].map((item) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default MultiSelectField;
