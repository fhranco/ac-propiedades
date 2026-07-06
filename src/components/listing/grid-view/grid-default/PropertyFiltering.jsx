"use client";

import { createClient } from "@supabase/supabase-js";
import React, { useState, useEffect } from "react";
import ListingSidebar from "../../sidebar";
import TopFilterBar from "./TopFilterBar";
import FeaturedListings from "./FeatuerdListings";
import PaginationTwo from "../../PaginationTwo";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

/** Convierte la categoría de Supabase al valor que usa el filtro de tipo */
const categoryToPropertyType = (cat) => {
  if (!cat) return "";
  const c = cat.toLowerCase();
  if (c.includes("casa") || c.includes("house")) return "Houses";
  if (c.includes("depto") || c.includes("departamento") || c.includes("apartment")) return "Apartments";
  if (c.includes("terreno") || c.includes("parcela") || c.includes("sitio") || c.includes("lote")) return "Land";
  if (c.includes("comercial") || c.includes("local") || c.includes("oficina") || c.includes("office")) return "Office";
  if (c.includes("cabaña") || c.includes("villa")) return "Villa";
  return cat;
};

/** Mapea una fila de Supabase al shape esperado por los filtros y tarjetas */
const mapProperty = (prop) => {
  const rawPrice = Number(prop.price) || 0;
  const sufijo = (prop.sufijo_precio || "").trim().toUpperCase();
  const priceFormatted = rawPrice > 0
    ? sufijo === "UF"
      ? `${rawPrice.toLocaleString("es-CL")} UF`
      : `$${rawPrice.toLocaleString("es-CL")}`
    : "Precio a consultar";

  return {
    id: prop.id,
    title: prop.title || "Sin título",
    location: prop.address || prop.city || "",
    city: prop.city || "",
    description: prop.description || "",
    sector: prop.sector_barrio || "",
    comuna: prop.comuna || "",
    provincia: prop.provincia || "",
    region: prop.region || "",
    category: prop.category || "",
    image: Array.isArray(prop.images) && prop.images.length > 0
      ? prop.images[0]
      : (typeof prop.images === "string" && prop.images ? prop.images : "/images/listings/listing-single-v3/default.jpg"),
    price: priceFormatted,
    priceRaw: rawPrice,
    forRent: prop.type === "Arriendo",
    bed: prop.bedrooms || 0,
    bath: prop.bathrooms || 0,
    sqft: prop.area || 0,
    propertyType: categoryToPropertyType(prop.category),
    yearBuilding: prop.year_building || 0,
    features: Array.isArray(prop.amenities) ? prop.amenities : [],
    sufijoPrecio: prop.sufijo_precio || "",
    slug: prop.slug || String(prop.id),
  };
};

export default function PropertyFiltering() {
  const [allListings, setAllListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filteredData, setFilteredData] = useState([]);

  const [currentSortingOption, setCurrentSortingOption] = useState("Newest");
  const [sortedFilteredData, setSortedFilteredData] = useState([]);
  const [pageNumber, setPageNumber] = useState(1);
  const [colstyle, setColstyle] = useState(false);
  const [pageItems, setPageItems] = useState([]);
  const [pageContentTrac, setPageContentTrac] = useState([]);

  const [listingStatus, setListingStatus] = useState("All");
  const [propertyTypes, setPropertyTypes] = useState([]);
  const [priceRange, setPriceRange] = useState([0, 999999999]);
  const [currency, setCurrency] = useState(""); // "UF", "CLP" o "" (todos)
  const [bedrooms, setBedrooms] = useState(0);
  const [bathroms, setBathroms] = useState(0);
  const [location, setLocation] = useState("All Cities");
  const [squirefeet, setSquirefeet] = useState([]);
  const [yearBuild, setyearBuild] = useState([]);
  const [categories, setCategories] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  /* ── Carga inicial desde Supabase (browser → Supabase directo) ── */
  useEffect(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      const catParam = params.get("category");
      if (catParam) {
        const mapped = categoryToPropertyType(catParam);
        if (mapped) {
          setPropertyTypes([mapped]);
        }
      }
      const locParam = params.get("location");
      if (locParam) {
        setLocation(locParam);
      }
      const statusParam = params.get("status");
      if (statusParam) {
        setListingStatus(statusParam);
      }
    }

    setLoading(true);
    supabase
      .from("properties")
      .select("*")
      .order("created_at", { ascending: false })
      .then(({ data, error }) => {
        if (error) {
          console.error("Error cargando propiedades:", error);
        } else {
          setAllListings((data || []).map(mapProperty));
        }
        setLoading(false);
      });
  }, []);

  /* ── Paginación ── */
  useEffect(() => {
    setPageItems(sortedFilteredData.slice((pageNumber - 1) * 8, pageNumber * 8));
    setPageContentTrac([
      (pageNumber - 1) * 8 + 1,
      pageNumber * 8,
      sortedFilteredData.length,
    ]);
  }, [pageNumber, sortedFilteredData]);

  /* ── Handlers de filtros ── */
  const resetFilter = () => {
    setListingStatus("All");
    setPropertyTypes([]);
    setPriceRange([0, 999999999]);
    setBedrooms(0);
    setBathroms(0);
    setLocation("All Cities");
    setSquirefeet([]);
    setyearBuild([0, 2050]);
    setCategories([]);
    setCurrentSortingOption("Newest");
    document.querySelectorAll(".filterInput").forEach((el) => { el.value = null; });
  };

  const handlelistingStatus  = (elm) => setListingStatus((pre) => (pre === elm ? "All" : elm));
  const handlepropertyTypes  = (elm) => {
    if (elm === "All") setPropertyTypes([]);
    else setPropertyTypes((pre) => pre.includes(elm) ? pre.filter((el) => el !== elm) : [...pre, elm]);
  };
  const handlepriceRange  = (elm) => setPriceRange(elm);
  const handlecurrency     = (cur) => setCurrency(cur);
  const handlebedrooms     = (elm) => setBedrooms(elm);
  const handlebathroms       = (elm) => setBathroms(elm);
  const handlelocation       = (elm) => setLocation(elm);
  const handlesquirefeet     = (elm) => setSquirefeet(elm);
  const handleyearBuild      = (elm) => setyearBuild(elm);
  const handlecategories     = (elm) => {
    if (elm === "All") setCategories([]);
    else setCategories((pre) => pre.includes(elm) ? pre.filter((el) => el !== elm) : [...pre, elm]);
  };

  const filterFunctions = {
    handlelistingStatus, handlepropertyTypes, handlepriceRange, handlecurrency,
    handlebedrooms, handlebathroms, handlelocation, handlesquirefeet,
    handleyearBuild, handlecategories,
    priceRange, listingStatus, propertyTypes,
    resetFilter, bedrooms, bathroms, location,
    squirefeet, yearBuild, categories,
    setPropertyTypes, setSearchQuery,
  };

  /* ── Aplicar filtros ── */
  useEffect(() => {
    const refItems = allListings.filter((elm) => {
      if (listingStatus === "All") return true;
      if (listingStatus === "Buy")  return !elm.forRent;
      if (listingStatus === "Rent") return elm.forRent;
      return true;
    });

    let filteredArrays = [];

    if (propertyTypes.length > 0) {
      filteredArrays.push(refItems.filter((elm) => propertyTypes.includes(elm.propertyType)));
    }

    filteredArrays.push(refItems.filter((el) => el.bed >= bedrooms));
    filteredArrays.push(refItems.filter((el) => el.bath >= bathroms));

    const q = searchQuery.toLowerCase();
    filteredArrays.push(
      refItems.filter((el) =>
        !q ||
        (el.title       || "").toLowerCase().includes(q) ||
        (el.city        || "").toLowerCase().includes(q) ||
        (el.location    || "").toLowerCase().includes(q) ||
        (el.description || "").toLowerCase().includes(q) ||
        (el.sector      || "").toLowerCase().includes(q) ||
        (el.comuna      || "").toLowerCase().includes(q) ||
        (el.provincia   || "").toLowerCase().includes(q) ||
        (el.region      || "").toLowerCase().includes(q) ||
        (el.category    || "").toLowerCase().includes(q) ||
        (el.features    || []).join(" ").toLowerCase().includes(q)
      )
    );

    filteredArrays.push(
      !categories.length
        ? [...refItems]
        : refItems.filter((elm) => categories.every((elem) => (elm.features || []).includes(elem)))
    );

    if (location !== "All Cities") {
      filteredArrays.push(refItems.filter((el) => el.city === location));
    }

    if (priceRange.length > 0) {
      filteredArrays.push(
        refItems.filter((elm) => {
          // Si hay moneda seleccionada, filtra solo las que coincidan
          if (currency && elm.sufijoPrecio && elm.sufijoPrecio.toUpperCase() !== currency) return true;
          return elm.priceRaw >= priceRange[0] && elm.priceRaw <= priceRange[1];
        })
      );
    }

    if (squirefeet.length > 0 && squirefeet[1]) {
      filteredArrays.push(
        refItems.filter((elm) => elm.sqft >= Number(squirefeet[0]) && elm.sqft <= Number(squirefeet[1]))
      );
    }

    if (yearBuild.length > 0) {
      filteredArrays.push(
        refItems.filter((elm) => elm.yearBuilding >= Number(yearBuild[0]) && elm.yearBuilding <= Number(yearBuild[1]))
      );
    }

    const commonItems = refItems.filter((item) =>
      filteredArrays.every((array) => array.includes(item))
    );
    setFilteredData(commonItems);
  }, [
    allListings, listingStatus, propertyTypes, priceRange, currency,
    bedrooms, bathroms, location, squirefeet, yearBuild, categories, searchQuery,
  ]);

  /* ── Ordenamiento ── */
  useEffect(() => {
    setPageNumber(1);
    if (currentSortingOption === "Newest") {
      setSortedFilteredData([...filteredData].sort((a, b) => b.yearBuilding - a.yearBuilding));
    } else if (currentSortingOption.trim() === "Price Low") {
      setSortedFilteredData([...filteredData].sort((a, b) => a.priceRaw - b.priceRaw));
    } else if (currentSortingOption.trim() === "Price High") {
      setSortedFilteredData([...filteredData].sort((a, b) => b.priceRaw - a.priceRaw));
    } else {
      setSortedFilteredData([...filteredData]);
    }
  }, [filteredData, currentSortingOption]);

  return (
    <section className="pt0 pb90 bgc-f7">
      <div className="container">
        <div className="row gx-xl-5">
          {/* Sidebar desktop */}
          <div className="col-lg-4 d-none d-lg-block">
            <ListingSidebar filterFunctions={filterFunctions} />
          </div>

          {/* Sidebar móvil (offcanvas) */}
          <div
            className="offcanvas offcanvas-start p-0"
            tabIndex="-1"
            id="listingSidebarFilter"
            aria-labelledby="listingSidebarFilterLabel"
          >
            <div className="offcanvas-header">
              <h5 className="offcanvas-title" id="listingSidebarFilterLabel">
                Filtros de Propiedades
              </h5>
              <button
                type="button"
                className="btn-close text-reset"
                data-bs-dismiss="offcanvas"
                aria-label="Close"
              />
            </div>
            <div className="offcanvas-body p-0">
              <ListingSidebar filterFunctions={filterFunctions} />
            </div>
          </div>

          {/* Listado principal */}
          <div className="col-lg-8">
            <div className="row align-items-center mb20">
              <TopFilterBar
                pageContentTrac={pageContentTrac}
                colstyle={colstyle}
                setColstyle={setColstyle}
                setCurrentSortingOption={setCurrentSortingOption}
              />
            </div>

            {loading ? (
              <div className="text-center py-5">
                <div className="spinner-border text-primary" role="status">
                  <span className="visually-hidden">Cargando...</span>
                </div>
                <p className="mt-3 text-muted">Cargando propiedades...</p>
              </div>
            ) : pageItems.length === 0 ? (
              <div className="text-center py-5">
                <span className="flaticon-home" style={{ fontSize: "48px", color: "#ccc" }} />
                <p className="mt-3 text-muted">No se encontraron propiedades con los filtros seleccionados.</p>
              </div>
            ) : (
              <>
                <div className="row mt15">
                  <FeaturedListings colstyle={colstyle} data={pageItems} />
                </div>
                <div className="row">
                  <PaginationTwo
                    pageCapacity={8}
                    data={sortedFilteredData}
                    pageNumber={pageNumber}
                    setPageNumber={setPageNumber}
                  />
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
