"use client";
import React, { useEffect, useState } from "react";

const RecentActivities = () => {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchActivities = async () => {
      try {
        // Cargar visitas, favoritos y propiedades al mismo tiempo
        const [resVisits, resFavs, resProps] = await Promise.all([
          fetch("/api/visitas"),
          fetch("/api/favoritos"),
          fetch("/api/propiedades")
        ]);

        if (resVisits.ok && resFavs.ok && resProps.ok) {
          const visits = await resVisits.json();
          const favs = await resFavs.json();
          const props = await resProps.json();

          const propsMap = {};
          props.forEach(p => {
            propsMap[p.id] = p.title;
          });

          // Formatear eventos de visitas
          const visitEvents = visits.map(v => ({
            id: v.id,
            icon: "flaticon-search-chart",
            text: `Alguien visitó tu propiedad `,
            highlight: propsMap[v.propiedadId] || `Propiedad ID: ${v.propiedadId}`,
            timestamp: new Date(v.timestamp)
          }));

          // Formatear eventos de favoritos
          const favEvents = favs.map(f => ({
            id: f.id,
            icon: "flaticon-like",
            text: `Alguien agregó a favoritos `,
            highlight: propsMap[f.propiedadId] || `Propiedad ID: ${f.propiedadId}`,
            timestamp: new Date(f.timestamp)
          }));

          // Combinar y ordenar cronológicamente (más recientes primero)
          const allEvents = [...visitEvents, ...favEvents]
            .sort((a, b) => b.timestamp - a.timestamp)
            .slice(0, 6); // Mostrar las últimas 6 actividades

          setActivities(allEvents);
        }
      } catch (err) {
        console.error("Error al obtener actividades:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchActivities();
  }, []);

  if (loading) {
    return <div className="text-center py-3">Cargando actividades...</div>;
  }

  if (activities.length === 0) {
    return (
      <div className="text-center py-4 text-muted">
        <p className="mb-0">No hay actividades recientes todavía.</p>
      </div>
    );
  }

  return (
    <>
      {activities.map((activity, index) => (
        <div
          key={index}
          className="recent-activity d-sm-flex align-items-center mb20"
        >
          <span className={`icon me-3 ${activity.icon} flex-shrink-0`} />
          <p className="text mb-0 flex-grow-1">
            {activity.text}
            <span className="fw600">{activity.highlight}</span>
          </p>
        </div>
      ))}
    </>
  );
};

export default RecentActivities;
