import React from "react";

const PropertyDetails = ({ data }) => {
  if (!data) return null;

  const formatCLP = (value) => {
    if (!value) return null;
    return new Intl.NumberFormat("es-CL", {
      style: "currency",
      currency: "CLP",
      minimumFractionDigits: 0,
    }).format(value);
  };

  // Mapear todos los nuevos campos específicos de Supabase
  const rawDetails = [
    {
      label: "ID de Propiedad",
      value: data.id_ingreso_manual || data.id || null,
    },
    {
      label: "Precio",
      value: formatCLP(data.price),
    },
    {
      label: "Sufijo Precio",
      value: data.sufijo_precio || null,
    },
    {
      label: "Contribuciones Anuales",
      value: data.contribuciones ? formatCLP(data.contribuciones) : null,
    },
    {
      label: "Superficie Construida",
      value: data.area ? `${data.area} m²` : null,
    },
    {
      label: "Superficie Terreno",
      value: data.superficie_terreno ? `${data.superficie_terreno} m²` : null,
    },
    {
      label: "Tipo de Uso",
      value: data.uso_tipo || null,
    },
    {
      label: "Sector / Barrio",
      value: data.sector_barrio || null,
    },
    {
      label: "Espacios Habitacionales",
      value: data.espacios_habitacionales || null,
    },
    {
      label: "Espacios Comerciales",
      value: data.espacios_comerciales || null,
    },
    {
      label: "Baños",
      value: data.bathrooms || data.habitaciones || null,
    },
    {
      label: "Dormitorios",
      value: data.bedrooms || null,
    },
    {
      label: "Estacionamiento",
      value: data.garage || null,
    },
    {
      label: "Tamaño Estacionamiento",
      value: data.tamano_estacionamiento || null,
    },
    {
      label: "Año de Construcción",
      value: data.year_building || data.yearBuilding || null,
    },
    {
      label: "Tipo de Propiedad",
      value: data.category || null,
    },
    {
      label: "Estado",
      value: data.status || null,
    },
  ];

  // Filtrar los detalles que no tienen valor (null, undefined o vacíos)
  const detailsList = rawDetails.filter(detail => detail.value !== null && detail.value !== undefined && detail.value !== "");

  if (detailsList.length === 0) return null;

  return (
    <div className="col-12 mt10">
      <div 
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
          gap: "15px 30px",
          padding: "10px 0"
        }}
      >
        {detailsList.map((detail, index) => (
          <div 
            key={index} 
            className="d-flex justify-content-between align-items-center"
            style={{
              borderBottom: "1px solid #f1f1f1",
              paddingBottom: "8px"
            }}
          >
            <span 
              className="ff-heading dark-color"
              style={{ 
                fontWeight: "600",
                fontSize: "14px",
                color: "#1d293f"
              }}
            >
              {detail.label}
            </span>
            <span 
              style={{ 
                fontSize: "14px",
                color: "#6b7280",
                textAlign: "right",
                paddingLeft: "15px"
              }}
            >
              {detail.value}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PropertyDetails;
