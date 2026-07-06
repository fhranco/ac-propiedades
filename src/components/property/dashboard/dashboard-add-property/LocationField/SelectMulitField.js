"use client";
import React, { useEffect, useState } from "react";

const normalizeString = (str) => {
  if (!str) return "";
  return str
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/\b(de|la|el|y|los|las)\b/g, "")
    .replace(/[^a-z0-9]/g, "");
};

const SelectMultiField = ({ initialData }) => {
  const [regions, setRegions] = useState([]);
  const [provinces, setProvinces] = useState([]);
  const [communes, setCommunes] = useState([]);

  const [selectedRegionVal, setSelectedRegionVal] = useState("");
  const [selectedProvinceVal, setSelectedProvinceVal] = useState("");
  const [selectedCommuneVal, setSelectedCommuneVal] = useState("");

  // Load all regions on mount
  useEffect(() => {
    fetch("/data/chileGeo.json")
      .then((res) => res.json())
      .then((data) => {
        console.log("SelectMultiField: chileGeo loaded successfully, regions count:", data.regions?.length);
        setRegions(data.regions || []);
      })
      .catch((err) => console.error("Error cargando datos geográficos:", err));
  }, []);

  // Map geographic names from initialData into dropdown codes
  useEffect(() => {
    console.log("SelectMultiField useEffect triggered");
    if (initialData) {
      console.log("SelectMultiField: initialData available:", initialData);
      console.log("SelectMultiField: initialData.region =", initialData.region);
      console.log("SelectMultiField: initialData.provincia =", initialData.provincia);
      console.log("SelectMultiField: initialData.comuna =", initialData.comuna);
      console.log("SelectMultiField: initialData.city =", initialData.city);
    }
    
    if (initialData && regions.length > 0) {
      let regionName = initialData.region;
      const provinceName = initialData.provincia;
      const communeName = initialData.comuna || initialData.city;

      // AUTO-HEAL FALLBACK: If region is null/empty but we have province or commune, deduce the region name
      if (!regionName) {
        console.log("SelectMultiField: region is missing, attempting to deduce from province/commune");
        if (provinceName) {
          const matchedReg = regions.find((r) =>
            (r.provinces || []).some((p) => normalizeString(p.name) === normalizeString(provinceName))
          );
          if (matchedReg) {
            regionName = matchedReg.name;
            console.log("Deduced region from province:", regionName);
          }
        }
        if (!regionName && communeName) {
          const matchedReg = regions.find((r) =>
            (r.provinces || []).some((p) =>
              (p.communes || []).some((c) => normalizeString(c.name) === normalizeString(communeName))
            )
          );
          if (matchedReg) {
            regionName = matchedReg.name;
            console.log("Deduced region from commune:", regionName);
          }
        }
      }

      console.log("SelectMultiField: raw target names to find:", { regionName, provinceName, communeName });

      const reg = regions.find((r) => {
        const normR = normalizeString(r.name);
        const normTarget = normalizeString(regionName);
        return normR === normTarget;
      });

      console.log("Found region:", reg);
      if (reg) {
        setSelectedRegionVal(reg.code);
        
        const provs = reg.provinces || [];
        setProvinces(provs);
        
        const prov = provs.find((p) => {
          const normP = normalizeString(p.name);
          const normTarget = normalizeString(provinceName);
          return normP === normTarget;
        });

        console.log("Found province:", prov);
        if (prov) {
          setSelectedProvinceVal(prov.code);
          
          const coms = prov.communes || [];
          setCommunes(coms);
          
          const com = coms.find((c) => {
            const normC = normalizeString(c.name);
            const normTarget = normalizeString(communeName);
            return normC === normTarget;
          });

          console.log("Found commune:", com);
          if (com) {
            setSelectedCommuneVal(com.code);
          }
        }
      }
    }
  }, [initialData, regions]);

  // When region changes → load its provinces
  const handleRegionChange = (e) => {
    const val = e.target.value;
    setSelectedRegionVal(val);
    setSelectedProvinceVal("");
    setSelectedCommuneVal("");
    setCommunes([]);

    if (val) {
      const region = regions.find((r) => r.code === val);
      setProvinces(region ? region.provinces : []);
    } else {
      setProvinces([]);
    }
  };

  // When province changes → load its communes
  const handleProvinceChange = (e) => {
    const val = e.target.value;
    setSelectedProvinceVal(val);
    setSelectedCommuneVal("");

    if (val) {
      const province = provinces.find((p) => p.code === val);
      setCommunes(province ? province.communes : []);
    } else {
      setCommunes([]);
    }
  };

  // Get selected names
  const selectedRegionName = regions.find((r) => r.code === selectedRegionVal)?.name || "";
  const selectedProvinceName = provinces.find((p) => p.code === selectedProvinceVal)?.name || "";
  const selectedCommuneName = communes.find((c) => c.code === selectedCommuneVal)?.name || "";

  return (
    <>
      {/* Hidden inputs to submit actual names to the backend */}
      <input type="hidden" name="region" value={selectedRegionName} />
      <input type="hidden" name="provincia" value={selectedProvinceName} />
      <input type="hidden" name="comuna" value={selectedCommuneName} />
      <input type="hidden" name="city" value={selectedCommuneName} />

      {/* Región */}
      <div className="col-sm-6 col-xl-4">
        <div className="mb20">
          <label className="heading-color ff-heading fw600 mb10">Región</label>
          <div className="location-area">
            <select
              name="region_code"
              className="form-select select-custom"
              value={selectedRegionVal}
              onChange={handleRegionChange}
              required
            >
              <option value="">Seleccionar región...</option>
              {regions.map((r) => (
                <option key={r.code} value={r.code}>
                  {r.name}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Provincia */}
      <div className="col-sm-6 col-xl-4">
        <div className="mb20">
          <label className="heading-color ff-heading fw600 mb10">Provincia</label>
          <div className="location-area">
            <select
              name="province_code"
              className="form-select select-custom"
              value={selectedProvinceVal}
              onChange={handleProvinceChange}
              disabled={!selectedRegionVal}
              required
            >
              <option value="">Seleccionar provincia...</option>
              {provinces.map((p) => (
                <option key={p.code} value={p.code}>
                  {p.name}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Comuna */}
      <div className="col-sm-6 col-xl-4">
        <div className="mb20">
          <label className="heading-color ff-heading fw600 mb10">Comuna</label>
          <div className="location-area">
            <select
              name="city_code"
              className="form-select select-custom"
              value={selectedCommuneVal}
              onChange={(e) => setSelectedCommuneVal(e.target.value)}
              disabled={!selectedProvinceVal}
              required
            >
              <option value="">Seleccionar comuna...</option>
              {communes.map((c) => (
                <option key={c.code} value={c.code}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
    </>
  );
};

export default SelectMultiField;
