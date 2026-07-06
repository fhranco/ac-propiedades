"use client";

import React, { useEffect, useRef, useState } from "react";
import CountUp from "react-countup";

const FunFact = () => {
  const [funFacts, setFunFacts] = useState([
    {
      number: 0,
      unit: "",
      text: "Ventas de Corretaje",
    },
    {
      number: 0,
      unit: "",
      text: "Propiedades Disponibles",
    },
    {
      number: 0,
      unit: "+",
      text: "Clientes Felices",
    },
  ]);

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const res = await fetch("/api/propiedades");
        if (res.ok) {
          const properties = await res.json();
          
          // Contadores reales basados en la base de datos (Supabase)
          const disponibles = properties.filter(p => !p.status || p.status.toLowerCase() === 'disponible').length;
          const vendidas = properties.filter(p => p.status && p.status.toLowerCase() === 'vendido').length;
          
          // Base histórica de 100 ventas previas a la plataforma web + las ventas nuevas en DB
          const totalVentas = 100 + vendidas;
          
          setFunFacts([
            {
              number: totalVentas,
              unit: "+",
              text: "Propiedades Vendidas",
            },
            {
              number: disponibles,
              unit: "",
              text: "Propiedades Disponibles",
            },
            {
              number: properties.length, // Como base inicial para clientes felices
              unit: "+",
              text: "Clientes Atendidos",
            },
          ]);
        }
      } catch (err) {
        console.error("Error al cargar propiedades para FunFact:", err);
      }
    };
    fetchProperties();
  }, []);

  return (
    <>
      {funFacts.map((item, index) => (
        <div className="col-md-4" key={index}>
          <div className="funfact_one text-center">
            <div className="details">
              <ul className="ps-0 mb-0 d-flex justify-content-center">
                <li>
                  <div className="timer">
                    {" "}
                    <CounterWithAnimation end={item.number} />
                  </div>
                </li>
                <li>
                  <span>{item.unit}</span>
                </li>
              </ul>
              <p className="text mb-0">{item.text}</p>
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

const CounterWithAnimation = ({ end }) => {
  const countRef = useRef(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const options = {
      root: null,
      rootMargin: "0px",
      threshold: 0.1,
    };

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setInView(true);
      }
    }, options);

    const currentRef = countRef.current;

    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, []);

  return (
    <span ref={countRef}>
      {inView ? <CountUp end={end} duration={4} separator="." /> : "0"}
    </span>
  );
};

export default FunFact;
