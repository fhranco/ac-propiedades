'use client'

import React from "react";

const OtherFeatures = ({filterFunctions}) => {
  const features = [
    "Estacionamiento",
    "Garaje",
    "Jardín",
    "Bodega",
    "Terraza",
    "Quincho / BBQ",
    "Calefacción central",
    "Calefacción a leña",
    "Alarma / Seguridad",
    "Portón automático",
    "Lavandería",
    "Ascensor",
  ];

  return (
    <div className="checkbox-style1">
      {features.map((feature, index) => (
        <label className="custom_checkbox" key={index}>
          {feature}
          <input
            type="checkbox"
            checked={filterFunctions?.categories.includes(feature)}
            onChange={() => filterFunctions?.handlecategories(feature)}
          />
          <span className="checkmark" />
        </label>
      ))}
    </div>
  );
};

export default OtherFeatures;
