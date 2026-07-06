'use client'

const Amenities = ({filterFunctions}) => {
  const amenities = [
    [
      { label: "Ático", value: "Attic" },
      { label: "Cancha de Básquetbol", value: "Basketball court", defaultChecked: true },
      { label: "Aire Acondicionado", value: "Air Conditioning", defaultChecked: true },
      { label: "Césped", value: "Lawn", defaultChecked: true },
    ],
    [
      { label: "TV Cable", value: "TV Cable" },
      { label: "Secadora", value: "Dryer" },
      { label: "Ducha Exterior", value: "Outdoor Shower" },
      { label: "Lavadora", value: "Washer" },
    ],
    [
      { label: "Vista al Lago", value: "Lake view" },
      { label: "Bodega de Vinos", value: "Wine cellar" },
      { label: "Patio Delantero", value: "Front yard" },
      { label: "Refrigerador", value: "Refrigerator" },
    ],
  ];

  return (
    <>
      {amenities.map((column, columnIndex) => (
        <div className="col-sm-4" key={columnIndex}>
          <div className="widget-wrapper mb20">
            <div className="checkbox-style1">
              {column.map((amenity, amenityIndex) => (
                <label className="custom_checkbox" key={amenityIndex}>
                  {amenity.label}
                  <input
                    checked={filterFunctions?.categories.includes(amenity.value)}
                    onChange={()=>filterFunctions?.handlecategories(amenity.value)}
                    type="checkbox"
                  />
                  <span className="checkmark" />
                </label>
              ))}
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default Amenities;
