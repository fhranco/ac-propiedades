"use client";
import React, { useState } from "react";
import InputRange from "react-input-range";
import "react-input-range/lib/css/index.css";

const RANGES = {
  UF:  { min: 0, max: 20000,     step: 100,      defaultMin: 500,      defaultMax: 15000      },
  CLP: { min: 0, max: 500000000, step: 5000000,   defaultMin: 10000000, defaultMax: 250000000  },
};

const formatUF  = (n) => `${Number(n).toLocaleString("es-CL")} UF`;
const formatCLP = (n) => `$${Number(n).toLocaleString("es-CL")}`;

const PriceRange = ({ filterFunctions }) => {
  const [currency, setCurrency] = useState("UF");
  const range = RANGES[currency];
  const [value, setValue] = useState({ min: range.defaultMin, max: range.defaultMax });

  const handleCurrencyChange = (cur) => {
    const r = RANGES[cur];
    setCurrency(cur);
    setValue({ min: r.defaultMin, max: r.defaultMax });
    filterFunctions?.handlepriceRange([r.defaultMin, r.defaultMax]);
    filterFunctions?.handlecurrency?.(cur);
  };

  const handleOnChange = (val) => {
    setValue(val);
    filterFunctions?.handlepriceRange([val.min || 0, val.max]);
    filterFunctions?.handlecurrency?.(currency);
  };

  const fmt = currency === "UF" ? formatUF : formatCLP;

  return (
    <>
      {/* Selector de moneda */}
      <div className="d-flex gap-2 mb-3">
        {["UF", "CLP"].map((cur) => (
          <button
            key={cur}
            type="button"
            onClick={() => handleCurrencyChange(cur)}
            className={`ud-btn btn-sm ${currency === cur ? "btn-thm" : "btn-white"}`}
            style={{ minWidth: 60, padding: "4px 12px", fontSize: 13 }}
          >
            {cur}
          </button>
        ))}
      </div>

      {/* Slider */}
      <div className="range-wrapper">
        <InputRange
          formatLabel={() => ``}
          maxValue={range.max}
          minValue={range.min}
          step={range.step}
          value={value}
          onChange={handleOnChange}
          id="slider"
        />
        <div className="d-flex align-items-center mt-2">
          <span id="slider-range-value1" style={{ fontSize: 13 }}>{fmt(value.min)}</span>
          <i className="fa-sharp fa-solid fa-minus mx-2 dark-color icon" />
          <span id="slider-range-value2" style={{ fontSize: 13 }}>{fmt(value.max)}</span>
        </div>
      </div>
    </>
  );
};

export default PriceRange;
