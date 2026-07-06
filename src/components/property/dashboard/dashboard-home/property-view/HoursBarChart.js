"use client";
import React, { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const HoursBarChart = () => {
  const [rankingData, setRankingData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRanking = async () => {
      try {
        const res = await fetch("/api/visitas?agrupado=true");
        if (res.ok) {
          const data = await res.json();
          // Tomar solo las top 5 propiedades más visitadas
          setRankingData(data.slice(0, 5));
        }
      } catch (err) {
        console.error("Error al obtener ranking:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchRanking();
  }, []);

  if (loading) {
    return <div className="text-center py-5">Cargando métricas...</div>;
  }

  // Si no hay visitas registradas aún, mostrar mensaje explicativo
  const totalVisits = rankingData.reduce((acc, curr) => acc + curr.visitas, 0);
  if (totalVisits === 0) {
    return (
      <div className="text-center py-5 text-muted">
        <i className="flaticon-search-chart fz40 mb10 d-block" />
        <p>Aún no hay visitas registradas en las propiedades.</p>
        <p className="fz13">Las visitas aparecerán aquí automáticamente a medida que los usuarios vean los detalles.</p>
      </div>
    );
  }

  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart
        data={rankingData}
        layout="vertical"
        margin={{
          top: 20,
          right: 30,
          left: 50,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis type="number" />
        <YAxis 
          dataKey="title" 
          type="category" 
          width={150} 
          tick={{ fontSize: 12 }}
        />
        <Tooltip formatter={(value) => [`${value} visitas`, "Popularidad"]} />
        <Bar dataKey="visitas" fill="#eb6753" radius={[0, 4, 4, 0]} barSize={20} />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default HoursBarChart;
