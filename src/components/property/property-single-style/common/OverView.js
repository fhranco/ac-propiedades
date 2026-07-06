import React from "react";

const OverView = ({ data }) => {
  if (!data) return null;

  const overviewData = [
    {
      icon: "flaticon-bed",
      label: "Dormitorios",
      value: data.bedrooms || 0,
    },
    {
      icon: "flaticon-shower",
      label: "Baños",
      value: data.bathrooms || 0,
    },
    {
      icon: "flaticon-event",
      label: "Año de Construcción",
      value: data.yearBuilding || "No especificado",
    },
    {
      icon: "flaticon-garage",
      label: "Estacionamiento",
      value: data.garage || "No especificado",
      xs: true,
    },
    {
      icon: "flaticon-expand",
      label: "Superficie",
      value: `${data.area || 0} m²`,
      xs: true,
    },
    {
      icon: "flaticon-home-1",
      label: "Tipo de Propiedad",
      value: data.category || "Casa",
    },
  ];

  return (
    <>
      {overviewData.map((item, index) => (
        <div
          key={index}
          className={`col-sm-6 col-lg-4 ${item.xs ? "mb25-xs" : "mb25"}`}
        >
          <div className="overview-element d-flex align-items-center">
            <span className={`icon ${item.icon}`} />
            <div className="ml15">
              <h6 className="mb-0">{item.label}</h6>
              <p className="text mb-0 fz15">{item.value}</p>
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default OverView;
