import Image from "next/image";
import React from "react";

const Office = () => {
  const offices = [
    {
      id: 1,
      city: "Punta Arenas",
      icon: "/images/icon/paris.svg",
      address: "Av. Colón 456, Punta Arenas",
      phoneNumber: "+56 61 224 5678",
      mapLink: "https://maps.google.com/?q=Av.+Colón+456,+Punta+Arenas,+Chile",
    },
    {
      id: 2,
      city: "Puerto Natales",
      icon: "/images/icon/london.svg",
      address: "Eberhard 230, Puerto Natales",
      phoneNumber: "+56 61 241 1234",
      mapLink: "https://maps.google.com/?q=Eberhard+230,+Puerto+Natales,+Chile",
    },
    {
      id: 3,
      city: "Porvenir",
      icon: "/images/icon/new-york.svg",
      address: "Plaza de Armas, Porvenir",
      phoneNumber: "+56 61 258 5678",
      mapLink: "https://maps.google.com/?q=Plaza+de+Armas,+Porvenir,+Chile",
    },
    // Add more office objects here...
  ];

  return (
    <>
      {offices.map((office) => (
        <div className="col-sm-6 col-lg-4" key={office.id}>
          <div className="iconbox-style8 text-center">
            <div className="icon">
              <Image width={120} height={120} src={office.icon} alt="icon" />
            </div>
            <div className="iconbox-content">
              <h4 className="title">{office.city}</h4>
              <p className="text mb-1">{office.address}</p>
              <h6 className="mb10">{office.phoneNumber}</h6>
              <a className="text-decoration-underline" href={office.mapLink} target="_blank" rel="noopener noreferrer">
                Ver en Google Maps
              </a>
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default Office;
