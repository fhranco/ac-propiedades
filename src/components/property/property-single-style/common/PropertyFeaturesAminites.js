import React from "react";

const PropertyFeaturesAminites = ({ data }) => {
  let amenities = [];

  if (data?.amenities) {
    if (Array.isArray(data.amenities)) {
      amenities = data.amenities;
    } else if (typeof data.amenities === "string") {
      try {
        amenities = JSON.parse(data.amenities);
      } catch {
        amenities = data.amenities.split(",").map(item => item.trim());
      }
    }
  }

  // Si no hay amenities cargadas, no mostramos nada
  if (amenities.length === 0) {
    return null;
  }

  return (
    <div className="col-12 mt10">
      <div 
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
          gap: "12px 25px",
          padding: "10px 0"
        }}
      >
        {amenities.map((item, index) => (
          <div 
            key={index}
            className="d-flex align-items-center"
            style={{
              padding: "6px 0"
            }}
          >
            <span 
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: "20px",
                height: "20px",
                borderRadius: "50%",
                backgroundColor: "#eb675315",
                color: "#eb6753",
                fontSize: "10px",
                marginRight: "12px"
              }}
            >
              <i className="fas fa-check" />
            </span>
            <span 
              style={{
                fontSize: "14px",
                color: "#4b5563"
              }}
            >
              {item}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PropertyFeaturesAminites;
