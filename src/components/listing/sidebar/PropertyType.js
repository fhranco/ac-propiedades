'use client'

import React from "react";

const PropertyType = ({filterFunctions}) => {

  const options = [
    { label: "Casas", value: "Houses" },
    { label: "Departamentos", value: "Apartments" },
    { label: "Terrenos / Parcelas", value: "Land" },
    { label: "Comercial / Local", value: "Office" },
    { label: "Cabañas / Villas", value: "Villa" },
  ];

  return (
    <>
    <label className="custom_checkbox"  >
          Todos
          <input type="checkbox"
          checked={!filterFunctions?.propertyTypes.length}
          onChange={(e=>{filterFunctions?.setPropertyTypes([])})}
  />
          <span className="checkmark" />
        </label>
      {options.map((option, index) => (
        <label className="custom_checkbox" key={index} >
          {option.label}
          <input type="checkbox"
          checked={filterFunctions?.propertyTypes.includes(option.value)}
          onChange={(e=>{filterFunctions.handlepropertyTypes(option.value)})}
  />
          <span className="checkmark" />
        </label>
      ))}
    </>
  );
};

export default PropertyType;
