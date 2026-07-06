"use client";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

const HeroContent = () => {
  const router = useRouter();
  const [searchText, setSearchText] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  
  // Estados para filtros avanzados
  const [category, setCategory] = useState("");
  const [bedrooms, setBedrooms] = useState("");
  const [bathrooms, setBathrooms] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [selectedAmenities, setSelectedAmenities] = useState([]);

  const categoriesList = ["Casa", "Departamento", "Terreno / Parcela", "Oficina", "Comercial"];
  const amenitiesList = ["Calefacción", "Estacionamiento", "Patio", "Terraza", "Quincho", "Bodega", "Vista al Mar", "Amoblado"];

  const handleAmenityChange = (amenity) => {
    setSelectedAmenities((prev) =>
      prev.includes(amenity) ? prev.filter((a) => a !== amenity) : [...prev, amenity]
    );
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    const params = new URLSearchParams();
    params.set("type", "Venta"); // Forzar venta
    
    if (searchText.trim()) {
      params.set("search", searchText.trim());
    }
    if (category) {
      params.set("category", category);
    }
    if (bedrooms) {
      params.set("bedrooms", bedrooms);
    }
    if (bathrooms) {
      params.set("bathrooms", bathrooms);
    }
    if (minPrice) {
      params.set("minPrice", minPrice);
    }
    if (maxPrice) {
      params.set("maxPrice", maxPrice);
    }
    if (selectedAmenities.length > 0) {
      params.set("amenities", selectedAmenities.join(","));
    }

    router.push(`/map-v1?${params.toString()}`);
  };

  return (
    <div className="advance-search-tab mt70 mt30-md mx-auto animate-up-3" style={{ maxWidth: "850px" }}>
      <div className="advance-content-style1 bgc-white p-4 bdrs16 shadow-lg">
        <form onSubmit={handleSearchSubmit}>
          {/* Fila principal del buscador */}
          <div className="row align-items-center">
            <div className="col-md-7 col-lg-8">
              <div className="advance-search-field position-relative text-start">
                <div className="box-search mb-2 mb-md-0">
                  <span className="icon flaticon-search" />
                  <input
                    className="form-control bgc-f7 bdrs12 py-3"
                    type="text"
                    name="search"
                    value={searchText}
                    onChange={(e) => setSearchText(e.target.value)}
                    placeholder="Ingresa dirección, barrio o comuna..."
                    style={{ fontSize: "15px" }}
                  />
                </div>
              </div>
            </div>

            <div className="col-md-5 col-lg-4">
              <div className="d-flex align-items-center justify-content-between justify-content-md-end">
                <button
                  className={`btn btn-light bdrs12 py-3 px-3 d-flex align-items-center gap-2 ${showFilters ? "active btn-thm text-white" : ""}`}
                  type="button"
                  onClick={() => setShowFilters(!showFilters)}
                  style={{ fontSize: "14px", border: "1px solid #e9e9e9", fontWeight: "600", transition: "all 0.2s" }}
                >
                  <i className="fas fa-sliders-h" /> {showFilters ? "Ocultar" : "Filtros"}
                </button>
                <button
                  className="advance-search-icon ud-btn btn-thm ms-2"
                  type="submit"
                  title="Buscar"
                >
                  <span className="flaticon-search" />
                </button>
              </div>
            </div>
          </div>

          {/* Panel Desplegable de Filtros Avanzados */}
          <div 
            style={{
              maxHeight: showFilters ? "800px" : "0",
              overflow: "hidden",
              transition: "max-height 0.4s ease-in-out, opacity 0.3s ease-in-out",
              opacity: showFilters ? 1 : 0,
              marginTop: showFilters ? "20px" : "0",
              borderTop: showFilters ? "1px solid #f1f1f1" : "none",
              paddingTop: showFilters ? "20px" : "0"
            }}
          >
            <div className="row g-3 text-start">
              {/* Categoría */}
              <div className="col-sm-4">
                <label className="form-label fw-semibold dark-color mb-1" style={{ fontSize: "13px" }}>Tipo de Propiedad</label>
                <select 
                  className="form-select bgc-f7 bdrs12 py-2" 
                  value={category} 
                  onChange={(e) => setCategory(e.target.value)}
                  style={{ border: "1px solid #e9e9e9" }}
                >
                  <option value="">Cualquiera</option>
                  {categoriesList.map((cat, idx) => (
                    <option key={idx} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>

              {/* Dormitorios */}
              <div className="col-sm-4">
                <label className="form-label fw-semibold dark-color mb-1" style={{ fontSize: "13px" }}>Dormitorios</label>
                <select 
                  className="form-select bgc-f7 bdrs12 py-2" 
                  value={bedrooms} 
                  onChange={(e) => setBedrooms(e.target.value)}
                  style={{ border: "1px solid #e9e9e9" }}
                >
                  <option value="">Cualquiera</option>
                  <option value="1">1+ Dorms</option>
                  <option value="2">2+ Dorms</option>
                  <option value="3">3+ Dorms</option>
                  <option value="4">4+ Dorms</option>
                </select>
              </div>

              {/* Baños */}
              <div className="col-sm-4">
                <label className="form-label fw-semibold dark-color mb-1" style={{ fontSize: "13px" }}>Baños</label>
                <select 
                  className="form-select bgc-f7 bdrs12 py-2" 
                  value={bathrooms} 
                  onChange={(e) => setBathrooms(e.target.value)}
                  style={{ border: "1px solid #e9e9e9" }}
                >
                  <option value="">Cualquiera</option>
                  <option value="1">1+ Baños</option>
                  <option value="2">2+ Baños</option>
                  <option value="3">3+ Baños</option>
                </select>
              </div>

              {/* Precio Mínimo */}
              <div className="col-sm-6">
                <label className="form-label fw-semibold dark-color mb-1" style={{ fontSize: "13px" }}>Precio Mínimo</label>
                <input 
                  type="number" 
                  className="form-control bgc-f7 bdrs12 py-2" 
                  placeholder="Ej: 50000000" 
                  value={minPrice} 
                  onChange={(e) => setMinPrice(e.target.value)}
                  style={{ border: "1px solid #e9e9e9" }}
                />
              </div>

              {/* Precio Máximo */}
              <div className="col-sm-6">
                <label className="form-label fw-semibold dark-color mb-1" style={{ fontSize: "13px" }}>Precio Máximo</label>
                <input 
                  type="number" 
                  className="form-control bgc-f7 bdrs12 py-2" 
                  placeholder="Ej: 250000000" 
                  value={maxPrice} 
                  onChange={(e) => setMaxPrice(e.target.value)}
                  style={{ border: "1px solid #e9e9e9" }}
                />
              </div>

              {/* Características */}
              <div className="col-12 mt-3">
                <label className="form-label fw-semibold dark-color mb-2" style={{ fontSize: "13px" }}>Comodidades / Características</label>
                <div className="row g-2">
                  {amenitiesList.map((amenity, idx) => (
                    <div key={idx} className="col-6 col-sm-3">
                      <div className="form-check">
                        <input
                          type="checkbox"
                          className="form-check-input"
                          id={`amenity-${idx}`}
                          checked={selectedAmenities.includes(amenity)}
                          onChange={() => handleAmenityChange(amenity)}
                          style={{ cursor: "pointer" }}
                        />
                        <label className="form-check-label dark-color" htmlFor={`amenity-${idx}`} style={{ fontSize: "12px", cursor: "pointer", userSelect: "none" }}>
                          {amenity}
                        </label>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default HeroContent;
