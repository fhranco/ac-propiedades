"use client";
import React, { useEffect, useState } from "react";

const TopStateBlock = () => {
  const [totalProperties, setTotalProperties] = useState(0);
  const [totalVisits, setTotalVisits] = useState(0);
  const [totalFavorites, setTotalFavorites] = useState(0);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const resProperties = await fetch("/api/propiedades");
        if (resProperties.ok) {
          const data = await resProperties.json();
          if (Array.isArray(data)) {
            setTotalProperties(data.length);
          }
        }
      } catch (error) {
        console.error("Error al obtener propiedades:", error);
      }

      try {
        const resVisits = await fetch("/api/visitas");
        if (resVisits.ok) {
          const data = await resVisits.json();
          if (Array.isArray(data)) {
            setTotalVisits(data.length);
          }
        }
      } catch (error) {
        console.error("Error al obtener visitas:", error);
      }

      try {
        const resFavs = await fetch("/api/favoritos");
        if (resFavs.ok) {
          const data = await resFavs.json();
          if (Array.isArray(data)) {
            setTotalFavorites(data.length);
          }
        }
      } catch (error) {
        console.error("Error al obtener favoritos:", error);
      }
    };
    fetchStats();
  }, []);

  const statisticsData = [
    {
      text: "Total propiedades",
      title: totalProperties.toString(),
      icon: "flaticon-home",
    },
    {
      text: "Total visitas",
      title: totalVisits.toString(),
      icon: "flaticon-search-chart",
    },
    {
      text: "Total favoritos",
      title: totalFavorites.toString(),
      icon: "flaticon-like",
    },
  ];

  return (
    <>
      {statisticsData.map((data, index) => (
        <div key={index} className="col-sm-6 col-xxl-4">
          <div className="d-flex justify-content-between statistics_funfact">
            <div className="details">
              <div className="text fz25">{data.text}</div>
              <div className="title">{data.title}</div>
            </div>
            <div className="icon text-center">
              <i className={data.icon} />
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default TopStateBlock;
