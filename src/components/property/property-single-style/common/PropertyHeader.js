"use client";

import React from "react";

const PropertyHeader = ({ data }) => {
  const [isLiked, setIsLiked] = React.useState(false);
  const [viewsCount, setViewsCount] = React.useState(0);

  const id = data?.id;

  React.useEffect(() => {
    if (id) {
      // Registrar visita e inmediatamente obtener conteo actualizado
      fetch("/api/visitas", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ propiedadId: id }),
      })
      .then(() => {
        // Consultar el listado agrupado para obtener la cantidad real de visitas
        fetch("/api/visitas?agrupado=true")
          .then((r) => r.json())
          .then((ranking) => {
            const match = ranking.find((r) => String(r.id) === String(id));
            if (match) {
              setViewsCount(match.visitas);
            } else {
              setViewsCount(1); // Mínimo 1 por la visita actual
            }
          });
      })
      .catch((err) => console.error("Error al registrar visita:", err));
      
      // Chequear si ya está guardado en localStorage para cambiar estado visual
      const localFavs = JSON.parse(localStorage.getItem("ac_favs") || "[]");
      if (localFavs.includes(id)) {
        setIsLiked(true);
      }
    }
  }, [id]);

  const handleLikeClick = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/favoritos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ propiedadId: id }),
      });
      if (res.ok) {
        setIsLiked(true);
        const localFavs = JSON.parse(localStorage.getItem("ac_favs") || "[]");
        if (!localFavs.includes(id)) {
          localFavs.push(id);
          localStorage.setItem("ac_favs", JSON.stringify(localFavs));
        }
      }
    } catch (err) {
      console.error("Error al guardar favorito:", err);
    }
  };

  // Formateador de pesos chilenos (CLP)
  const formatCLP = (value) => {
    if (!value) return "$0";
    return new Intl.NumberFormat("es-CL", {
      style: "currency",
      currency: "CLP",
      minimumFractionDigits: 0,
    }).format(value);
  };

  return (
    <>
      <div className="col-lg-8">
        <div className="single-property-content mb30-md">
          <h2 className="sp-lg-title">{data?.title}</h2>
          <div className="pd-meta mb15 d-md-flex align-items-center">
            <p className="text fz15 mb-0 bdrr1 pr10 bdrrn-sm">
              {data?.address || (data?.comuna || data?.city ? `${data.comuna || data.city}, Chile` : "Magallanes, Chile")}
            </p>
            <a
              className="ff-heading text-thm fz15 bdrr1 pr10 ml0-sm ml10 bdrrn-sm"
              href="#"
            >
              <i className="fas fa-circle fz10 pe-2" />
              {data?.type || "Venta"}
            </a>
            {data?.yearBuilding && (
              <a
                className="ff-heading bdrr1 fz15 pr10 ml10 ml0-sm bdrrn-sm"
                href="#"
              >
                <i className="far fa-clock pe-2" />
                Construcción: {data.yearBuilding}
              </a>
            )}
            <a className="ff-heading ml10 ml0-sm fz15" href="#">
              <i className="flaticon-fullscreen pe-2 align-text-top" />
              {viewsCount} Visitas
            </a>
          </div>
          <div className="property-meta d-flex align-items-center">
            <a className="text fz15" href="#">
              <i className="flaticon-bed pe-2 align-text-top" />
              {data?.bedrooms || 0} Dormitorios
            </a>
            <a className="text ml20 fz15" href="#">
              <i className="flaticon-shower pe-2 align-text-top" />
              {data?.bathrooms || 0} Baños
            </a>
            <a className="text ml20 fz15" href="#">
              <i className="flaticon-expand pe-2 align-text-top" />
              {data?.area || 0} m²
            </a>
          </div>
        </div>
      </div>
      {/* End .col-lg--8 */}

      <div className="col-lg-4">
        <div className="single-property-content">
          <div className="property-action text-lg-end">
            <div className="d-flex mb20 mb10-md align-items-center justify-content-lg-end">
              <a 
                className="icon mr10" 
                href="#"
                onClick={handleLikeClick}
                style={{ backgroundColor: isLiked ? "#eb6753" : "", color: isLiked ? "#fff" : "" }}
                title="Favoritos"
              >
                <span className="flaticon-like" />
              </a>
              <a 
                className="icon mr10" 
                href="#" 
                onClick={(e) => {
                  e.preventDefault();
                  if (typeof window !== "undefined") {
                    const url = encodeURIComponent(window.location.href);
                    const text = encodeURIComponent(`Hola, mira esta propiedad de AC Propiedades: ${data?.title || ""} `);
                    window.open(`https://api.whatsapp.com/send?text=${text}${url}`, "_blank");
                  }
                }}
                style={{ color: "#25D366" }}
                title="Compartir por WhatsApp"
              >
                <i className="fab fa-whatsapp fz18" />
              </a>
              <a className="icon mr10" href="#" title="Compartir">
                <span className="flaticon-share-1" />
              </a>
              <a 
                className="icon" 
                href="#" 
                onClick={(e) => {
                  e.preventDefault();
                  if (typeof window !== "undefined") {
                    window.print();
                  }
                }}
                title="Imprimir Ficha"
              >
                <span className="flaticon-printer" />
              </a>
            </div>
            <h3 className="price mb-0">{formatCLP(data?.price)}</h3>
          </div>
        </div>
      </div>
      {/* End .col-lg--4 */}
    </>
  );
};

export default PropertyHeader;
