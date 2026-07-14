'use client'

import React, { useState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import { supabase } from "@/lib/supabase";
import TopFilterBar from "./TopFilterBar";
import FeaturedListings from "./FeatuerdListings";

import PaginationTwo from "../../PaginationTwo";
import ListingMap1 from "../ListingMap1";

export default function PropertyFilteringTwo() {
    const searchParams = useSearchParams();
    const urlSearch = searchParams.get('search') || '';
    const urlType = searchParams.get('type') || '';
    const urlCategory = searchParams.get('category') || '';
    const urlBedrooms = Number(searchParams.get('bedrooms')) || 0;
    const urlBathrooms = Number(searchParams.get('bathrooms')) || 0;
    const urlMinPrice = Number(searchParams.get('minPrice')) || 0;
    const urlMaxPrice = Number(searchParams.get('maxPrice')) || 1000000000;
    const urlAmenities = searchParams.get('amenities') ? searchParams.get('amenities').split(",") : [];

    const [dbProperties, setDbProperties] = useState([]);
    const [loading, setLoading] = useState(true);

    const [filteredData, setFilteredData] = useState([]);
    const [currentSortingOption, setCurrentSortingOption] = useState('Newest')
    const [sortedFilteredData, setSortedFilteredData] = useState([]);
    const [mapFullscreen, setMapFullscreen] = useState(false);

    const [pageNumber, setPageNumber] = useState(1)
    const [colstyle, setColstyle] = useState(true)
    const [pageItems, setPageItems] = useState([])
    const [pageContentTrac, setPageContentTrac] = useState([])
  
    useEffect(() => {
      setPageItems(sortedFilteredData
        .slice((pageNumber - 1) * 4, pageNumber * 4))
        setPageContentTrac([((pageNumber - 1) * 4) + 1 ,pageNumber * 4,sortedFilteredData.length])
    }, [pageNumber,sortedFilteredData])

    // Cargar propiedades desde Supabase (directo desde el browser)
    useEffect(() => {
      setLoading(true);
      supabase
        .from('properties')
        .select("id, title, category, price, sufijo_precio, city, address, bedrooms, bathrooms, area, type, images, status, created_at, id_ingreso_manual, slug, year_building, amenities, lat, latitude, lng, longitude, sector_barrio, comuna")
        .order('created_at', { ascending: false })
        .then(({ data, error }) => {
          if (!error && Array.isArray(data)) {
            const sufijo = (s) => (s || '').trim().toUpperCase();
            const normalized = data.map((prop) => {
              const rawPrice = Number(prop.price) || 0;
              const suf = sufijo(prop.sufijo_precio);
              const priceFormatted = rawPrice > 0
                ? suf === 'UF' ? `${rawPrice.toLocaleString('es-CL')} UF` : `$${rawPrice.toLocaleString('es-CL')}`
                : 'Precio a consultar';
              return {
                id: prop.id,
                title: prop.title || 'Sin título',
                price: priceFormatted,
                priceNum: rawPrice,
                sufijoPrecio: suf,
                city: prop.city || 'Punta Arenas',
                location: prop.address || prop.city || 'Magallanes, Chile',
                description: prop.description || '',
                sector: prop.sector_barrio || '',
                comuna: prop.comuna || '',
                bed: prop.bedrooms || 0,
                bath: prop.bathrooms || 0,
                sqft: prop.area || 0,
                forRent: prop.type === 'Arriendo',
                propertyType: prop.category || 'Casa',
                category: prop.category || '',
                yearBuilding: prop.year_building || 0,
                features: Array.isArray(prop.amenities) ? prop.amenities : [],
                image: (Array.isArray(prop.images) && prop.images[0]) || '/images/listings/g1-1.jpg',
                images: prop.images || [],
                lat: prop.lat || prop.latitude || null,
                lng: prop.lng || prop.longitude || null,
                slug: prop.slug || String(prop.id),
              };
            });
            setDbProperties(normalized);
          } else if (error) {
            console.error('Error loading properties for map:', error);
          }
          setLoading(false);
        });
    }, []);

    const [listingStatus, setListingStatus] = useState('All')
    const [propertyTypes, setPropertyTypes] = useState([])
    const [priceRange, setPriceRange] = useState([0,1000000000]) // Rango inicial expandido para CLP/UF
    const [bedrooms, setBedrooms] = useState(0)
    const [bathroms, setBathroms] = useState(0)
    const [location, setLocation] = useState('All Cities')
    const [squirefeet, setSquirefeet] = useState([])
    const [yearBuild, setyearBuild] = useState([])
    const [categories, setCategories] = useState([])
    const [searchQuery, setSearchQuery] = useState('')

    // Sincronizar parámetros de la URL cuando carguen
    useEffect(() => {
      if (urlSearch) {
        setSearchQuery(urlSearch);
      }
      if (urlType) {
        if (urlType === "Arriendo") {
          setListingStatus("Rent");
        } else if (urlType === "Venta") {
          setListingStatus("Buy");
        }
      }
      if (urlCategory) {
        setPropertyTypes([urlCategory]);
      }
      if (urlBedrooms) {
        setBedrooms(urlBedrooms);
      }
      if (urlBathrooms) {
        setBathroms(urlBathrooms);
      }
      if (urlMinPrice || urlMaxPrice !== 1000000000) {
        setPriceRange([urlMinPrice, urlMaxPrice]);
      }
      if (urlAmenities.length > 0) {
        setCategories(urlAmenities);
      }
    }, [urlSearch, urlType, urlCategory, urlBedrooms, urlBathrooms, urlMinPrice, urlMaxPrice, urlAmenities.join(',')]);

    const resetFilter = ()=>{
      setListingStatus('All')
      setPropertyTypes([])
      setPriceRange([0,1000000000])
      setBedrooms(0)
      setBathroms(0)
      setLocation('All Cities')
      setSquirefeet([])
      setyearBuild([0,2050])
      setCategories([])
      setCurrentSortingOption('Newest')
      document.querySelectorAll(".filterInput").forEach(function(element) {
        element.value = null;
      });
      document.querySelectorAll(".filterSelect").forEach(function(element) {
        element.value = 'All Cities';
      });
    }

    const handlelistingStatus =(elm)=>{
      setListingStatus(pre => pre == elm ? 'All':elm)
    }

    const handlepropertyTypes =(elm)=>{
      if (elm == 'All') {
        setPropertyTypes([])
      } else {
        setPropertyTypes(pre=>pre.includes(elm) ? [...pre.filter((el)=>el!=elm)] : [...pre,elm])
      }
    }

    const handlepriceRange =(elm)=>{
      setPriceRange(elm)
    }

    const handlebedrooms =(elm)=>{
      setBedrooms(elm)
    }

    const handlebathroms =(elm)=>{
      setBathroms(elm)
    }

    const handlelocation =(elm)=>{
      setLocation(elm)
    }

    const handlesquirefeet =(elm)=>{
      setSquirefeet(elm)
    }

    const handleyearBuild =(elm)=>{
      setyearBuild(elm)
    }

    const handlecategories =(elm)=>{
      if (elm == 'All') {
        setCategories([])
      } else {
        setCategories(pre=>pre.includes(elm) ? [...pre.filter((el)=>el!=elm)] : [...pre,elm])
      }
    }

    const filterFunctions={
      handlelistingStatus,
      handlepropertyTypes,
      handlepriceRange,
      handlebedrooms,
      handlebathroms,
      handlelocation,
      handlesquirefeet,
      handleyearBuild,
      handlecategories,
      priceRange,
      listingStatus,
      propertyTypes,
      resetFilter,
      bedrooms,
      bathroms,
      location,
      squirefeet,
      yearBuild,
      categories,
      setPropertyTypes,
      setSearchQuery
    }

    // Filtrar propiedades
    useEffect(() => {
      if (loading) return;

      const refItems = dbProperties.filter((elm) => {
        if (listingStatus == "All") {
          return true;
        } else if (listingStatus == "Buy") {
          return !elm.forRent;
        } else if (listingStatus == "Rent") {
          return elm.forRent;
        }
      });
  
      let filteredArrays = [];

      if (propertyTypes.length > 0) {
        const filtered = refItems.filter((elm) =>
          propertyTypes.includes(elm.propertyType)
        );
        filteredArrays = [...filteredArrays, filtered];
      }
      filteredArrays = [...filteredArrays, refItems.filter((el=>el.bed >= bedrooms)) ];
      filteredArrays = [...filteredArrays, refItems.filter((el=>el.bath >= bathroms)) ];
      filteredArrays = [...filteredArrays, refItems.filter((el => 
        el.city.toLocaleLowerCase().includes(searchQuery.toLocaleLowerCase()) ||  
        el.location.toLocaleLowerCase().includes(searchQuery.toLocaleLowerCase()) ||  
        el.title.toLocaleLowerCase().includes(searchQuery.toLocaleLowerCase())  ||  
        (Array.isArray(el.features) && el.features.join(' ').toLocaleLowerCase().includes(searchQuery.toLocaleLowerCase()))
      )) ];
     
      filteredArrays = [...filteredArrays, !categories.length ? [...refItems] : refItems.filter((elm)=>categories.every(elem=>elm.features.includes(elem))) ];

      if (location != 'All Cities') {
        filteredArrays = [...filteredArrays, refItems.filter((el=>el.city == location)) ];
      }
     
      if (priceRange.length > 0) {
        const filtered = refItems.filter(
          (elm) =>
            Number(elm.price.replace(/[^0-9]/g, '')) >= priceRange[0] &&
            Number(elm.price.replace(/[^0-9]/g, '')) <= priceRange[1],
        );
        filteredArrays = [...filteredArrays, filtered];
      }

      if (squirefeet.length > 0 && squirefeet[1]) {
        const filtered = refItems.filter(
          (elm) =>
            elm.sqft >= squirefeet[0] &&
            elm.sqft <= squirefeet[1],
        );
        filteredArrays = [...filteredArrays, filtered];
      }

      if (yearBuild.length > 0 && yearBuild[1]) {
        const filtered = refItems.filter(
          (elm) =>
            elm.yearBuilding >= yearBuild[0] &&
            elm.yearBuilding <= yearBuild[1]
        );
        filteredArrays = [...filteredArrays, filtered];
      }
      
      const commonItems = refItems.filter((item) =>
        filteredArrays.every((array) => array.includes(item))
      );

      setFilteredData(commonItems);
    }, [
      dbProperties,
      loading,
      listingStatus,
      propertyTypes,
      priceRange,
      bedrooms,
      bathroms,
      location,
      squirefeet,
      yearBuild,
      categories,
      searchQuery
    ])

    useEffect(() => {
      setPageNumber(1)
      if (currentSortingOption == 'Newest') {
        const sorted = [...filteredData].sort((a,b)=>b.yearBuilding - a.yearBuilding)
        setSortedFilteredData(sorted)
      } 
      else if (currentSortingOption.trim() == 'Price Low') {
        const sorted = [...filteredData].sort((a,b)=>Number(a.price.replace(/[^0-9]/g, '')) - Number(b.price.replace(/[^0-9]/g, '')))
        setSortedFilteredData(sorted)
      } 
      else if (currentSortingOption.trim() == 'Price High') {
        const sorted = [...filteredData].sort((a,b)=>Number(b.price.replace(/[^0-9]/g, '')) - Number(a.price.replace(/[^0-9]/g, '')))
        setSortedFilteredData(sorted)
      } 
      else {
        setSortedFilteredData(filteredData)
      }
    }, [filteredData, currentSortingOption])

  return (
    <>
      {/* Property Filtering */}
      <section className="p-0 bgc-f7">
        <div className="container-fluid">
          <div className="row" data-aos="fade-up" data-aos-duration="200">

            {/* Panel listados — se oculta en modo fullscreen */}
            {!mapFullscreen && (
              <div className="col-xl-5">
                <div className="half_map_area_content mt30">

                  <h4 className="mb-1">Propiedades en Magallanes</h4>

                  <div className="row align-items-center mb10">
                    <TopFilterBar pageContentTrac={pageContentTrac} colstyle={colstyle} setColstyle={setColstyle} setCurrentSortingOption={setCurrentSortingOption} />
                  </div>
                  <div className="row">
                    {loading ? (
                      <div className="text-center py-5">
                        <div className="spinner-border text-thm" role="status">
                          <span className="visually-hidden">Cargando...</span>
                        </div>
                        <p className="text-muted mt-2">Cargando propiedades...</p>
                      </div>
                    ) : (
                      <FeaturedListings colstyle={colstyle} data={pageItems} />
                    )}
                  </div>

                  <div className="row text-center">
                    <PaginationTwo pageCapacity={4} data={sortedFilteredData} pageNumber={pageNumber} setPageNumber={setPageNumber} />
                  </div>
                </div>
              </div>
            )}

            {/* Mapa — se expande a pantalla completa */}
            <div className={mapFullscreen ? "col-xl-12" : "col-xl-7"} style={{ position: "relative" }}>
              {/* Botón toggle fullscreen */}
              <button
                onClick={() => setMapFullscreen(f => !f)}
                title={mapFullscreen ? "Mostrar listado" : "Expandir mapa"}
                style={{
                  position: "absolute",
                  top: 12,
                  right: 16,
                  zIndex: 1000,
                  background: "#fff",
                  border: "1px solid #ddd",
                  borderRadius: 8,
                  padding: "6px 12px",
                  cursor: "pointer",
                  fontWeight: 600,
                  fontSize: 13,
                  display: "flex",
                  alignItems: "center",
                  gap: 6,
                  boxShadow: "0 2px 8px rgba(0,0,0,0.12)",
                }}
              >
                <i className={mapFullscreen ? "flaticon-shrink" : "flaticon-fullscreen"} />
                {mapFullscreen ? " Mostrar listado" : " Pantalla completa"}
              </button>

              <div className="half_map_area map-canvas half_style" style={{ height: mapFullscreen ? "calc(100vh - 80px)" : undefined }}>
                <ListingMap1 properties={sortedFilteredData} />
              </div>
            </div>

          </div>
        </div>
      </section>
    </>
  )
}
