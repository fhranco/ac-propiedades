"use client";
import React, { useState, useEffect, useCallback } from "react";

const FavoritosCounter = () => {
  const [favoritos, setFavoritos] = useState([]);
  const [propiedades, setPropiedades] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const [favRes, propRes] = await Promise.all([
        fetch("/api/favoritos"),
        fetch("/api/propiedades"),
      ]);
      if (!favRes.ok || !propRes.ok) throw new Error("Error al cargar datos");
      const [favData, propData] = await Promise.all([
        favRes.json(),
        propRes.json(),
      ]);
      setFavoritos(Array.isArray(favData) ? favData : []);
      setPropiedades(Array.isArray(propData) ? propData : []);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { load(); }, [load]);

  if (loading) {
    return (
      <div className="col-xl-12">
        <div className="ps-widget bgc-white bdrs12 default-box-shadow2 p30 mb30 text-center">
          <div className="spinner-border text-thm" role="status" />
          <p className="text mt15">Cargando estadísticas...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="col-xl-12">
        <div className="alert alert-danger">{error}</div>
      </div>
    );
  }

  // Agrupar favoritos por property_id
  const countByProp = favoritos.reduce((acc, fav) => {
    const propId = fav.property_id || fav.propiedadId;
    if (propId) {
      acc[propId] = (acc[propId] || 0) + 1;
    }
    return acc;
  }, {});

  // Ordenar por cantidad descendente
  const ranking = Object.entries(countByProp)
    .map(([propertyId, count]) => {
      const prop = propiedades.find((p) => String(p.id) === String(propertyId));
      return {
        propiedadId: propertyId,
        count,
        title: prop?.title || `Propiedad #${propertyId}`,
        category: prop?.category || "—",
        status: prop?.status || "—",
      };
    })
    .sort((a, b) => b.count - a.count);

  // Última actividad
  const lastFav =
    favoritos.length > 0
      ? [...favoritos].sort(
          (a, b) => new Date(b.added_at || b.timestamp) - new Date(a.added_at || a.timestamp)
        )[0]
      : null;

  return (
    <div className="col-xl-12">
      {/* Tarjetas de resumen */}
      <div className="row mb30">
        {/* Total */}
        <div className="col-sm-4 mb20">
          <div className="ps-widget bgc-white bdrs12 default-box-shadow2 p30 text-center h-100">
            <div
              style={{
                fontSize: "40px",
                lineHeight: 1,
                marginBottom: "10px",
                color: "#e87722",
              }}
            >
              <i className="flaticon-like" />
            </div>
            <div style={{ fontSize: "42px", fontWeight: 800, color: "#222" }}>
              {favoritos.length}
            </div>
            <p className="text fz14 mb-0">Total de me gusta recibidos</p>
          </div>
        </div>

        {/* Propiedades con favoritos */}
        <div className="col-sm-4 mb20">
          <div className="ps-widget bgc-white bdrs12 default-box-shadow2 p30 text-center h-100">
            <div
              style={{
                fontSize: "40px",
                lineHeight: 1,
                marginBottom: "10px",
                color: "#198754",
              }}
            >
              <i className="flaticon-home" />
            </div>
            <div style={{ fontSize: "42px", fontWeight: 800, color: "#222" }}>
              {Object.keys(countByProp).length}
            </div>
            <p className="text fz14 mb-0">
              Propiedades con al menos 1 me gusta
            </p>
          </div>
        </div>

        {/* Última actividad */}
        <div className="col-sm-4 mb20">
          <div className="ps-widget bgc-white bdrs12 default-box-shadow2 p30 text-center h-100">
            <div
              style={{
                fontSize: "40px",
                lineHeight: 1,
                marginBottom: "10px",
                color: "#0d6efd",
              }}
            >
              <i className="far fa-clock" />
            </div>
            <div
              style={{
                fontSize: "15px",
                fontWeight: 700,
                color: "#222",
                marginBottom: "4px",
              }}
            >
              {lastFav
                ? new Date(lastFav.added_at || lastFav.timestamp).toLocaleString("es-CL", {
                    day: "2-digit",
                    month: "2-digit",
                    year: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                  })
                : "Sin actividad"}
            </div>
            <p className="text fz14 mb-0">Último me gusta registrado</p>
          </div>
        </div>
      </div>

      {/* Ranking de propiedades */}
      <div className="ps-widget bgc-white bdrs12 default-box-shadow2 p30 mb30 overflow-hidden">
        <h5 className="title fz17 mb20">
          <i className="fas fa-trophy me-2" style={{ color: "#e87722" }} />
          Ranking de propiedades más populares
        </h5>

        {ranking.length === 0 ? (
          <div className="text-center py-4">
            <div style={{ fontSize: "48px" }}>💛</div>
            <h6 className="title mt15 mb5">
              Aún no hay me gusta registrados
            </h6>
            <p className="text fz13">
              Cuando los visitantes marquen una propiedad como favorita,
              aparecerá aquí el recuento.
            </p>
          </div>
        ) : (
          <div className="table-responsive">
            <table className="table-style3 table at-savesearch">
              <thead className="t-head">
                <tr>
                  <th>#</th>
                  <th>Propiedad</th>
                  <th>Categoría</th>
                  <th>Estado</th>
                  <th style={{ textAlign: "center" }}>
                    <i className="flaticon-like me-1" /> Me gusta
                  </th>
                </tr>
              </thead>
              <tbody className="t-body">
                {ranking.map((item, idx) => (
                  <tr key={item.propiedadId}>
                    <td className="vam">
                      <span
                        style={{
                          display: "inline-flex",
                          alignItems: "center",
                          justifyContent: "center",
                          width: "28px",
                          height: "28px",
                          borderRadius: "50%",
                          background:
                            idx === 0
                              ? "#e87722"
                              : idx === 1
                              ? "#adb5bd"
                              : idx === 2
                              ? "#cd7f32"
                              : "#f0f0f0",
                          color: idx < 3 ? "#fff" : "#666",
                          fontWeight: 700,
                          fontSize: "13px",
                        }}
                      >
                        {idx + 1}
                      </span>
                    </td>
                    <td className="vam">
                      <span className="fz14 fw500 heading-color">
                        {item.title}
                      </span>
                    </td>
                    <td className="vam">
                      <span className="fz13">{item.category}</span>
                    </td>
                    <td className="vam">
                      <span className="fz13">{item.status}</span>
                    </td>
                    <td className="vam" style={{ textAlign: "center" }}>
                      <span
                        style={{
                          background: "#fff0e8",
                          color: "#e87722",
                          borderRadius: "20px",
                          padding: "4px 14px",
                          fontWeight: 700,
                          fontSize: "15px",
                          display: "inline-flex",
                          alignItems: "center",
                          gap: "6px",
                        }}
                      >
                        <i
                          className="fas fa-heart"
                          style={{ fontSize: "12px" }}
                        />
                        {item.count}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default FavoritosCounter;
