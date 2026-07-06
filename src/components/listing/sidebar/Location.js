"use client";
import Select from "react-select";

const Location = ({filterFunctions}) => {
  const locationOptions = [
    { value: "All Cities", label: "Todas las Comunas" },
    { value: "Punta Arenas", label: "Punta Arenas" },
    { value: "Puerto Natales", label: "Puerto Natales" },
  ];

  const customStyles = {
    option: (styles, { isFocused, isSelected, isHovered }) => {
      return {
        ...styles,
        backgroundColor: isSelected
          ? "#e87722"
          : isHovered
          ? "#e8772212"
          : isFocused
          ? "#e8772212"
          : undefined,
      };
    },
  };

  return (
    <Select
      defaultValue={[locationOptions[0]]}
      name="colors"
      styles={customStyles}
      options={locationOptions}
      value={{
        value: filterFunctions.location,
        label: filterFunctions.location === "All Cities" ? "Todas las Comunas" : filterFunctions.location
      }}
      
     
      
      
      
      
      className="select-custom filterSelect"
      classNamePrefix="select"
      onChange={(e)=>filterFunctions?.handlelocation(e.value)}
      required
    />
  );
};

export default Location;
