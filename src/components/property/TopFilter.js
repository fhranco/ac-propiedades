'use client'

import React from "react";
import Location from "./Location";

const propertyTypes = [
  { label: "Casas", value: "Houses" },
  { label: "Departamentos", value: "Apartments" },
  { label: "Oficinas", value: "Office" },
  { label: "Cabañas", value: "Villa" },
];



const TopFilter = ({filterFunctions}) => {
  return (
    <>
      <div className="col-md-9">
        <div className="agent-page-meta dropdown-lists">
          <div className="d-sm-flex">
            <div className="position-relative mb10 mr10">
              <input
                type="text"
                className="form-control"
                placeholder="Ingresa nombre del agente"
                onChange={(e)=>filterFunctions.setSearchQuery(e.target.value)}
              />
            </div>
            {/* End searchbox */}

            <div className="position-relative mb10 mr10">
              <button
                type="button"
                className="open-btn box-shadow-0 dropdown-toggle"
                data-bs-toggle="dropdown"
                data-bs-auto-close="outside"
              >
                Todas las Categorías <i className="fa fa-angle-down ms-2" />
              </button>
              <div className="dropdown-menu">
                <div className="widget-wrapper bdrb1 pb25 mb0 pl20">
                  <div className="checkbox-style1">
                                          <label className="custom_checkbox">
                        Todas
                      <input type="checkbox" 
                      checked={!filterFunctions?.propertyTypes.length}
                      onChange={(e=>{filterFunctions?.setPropertyTypes([])})}/>
                      <span className="checkmark" />
                    </label>
                    {propertyTypes.map((property, index) => (
                      <label className="custom_checkbox" key={index} >
                      {property.label}
                      <input type="checkbox"
                      checked={filterFunctions?.propertyTypes.includes(property.value)}
                      onChange={(e=>{filterFunctions.handlepropertyTypes(property.value)})}
                       />
                      <span className="checkmark" />
                    </label>

                      
                    ))}
                  </div>
                </div>
                <div className="text-end mt10 pr10">
                  <button
                    type="button"
                    className="done-btn box-shadow-0 ud-btn btn-thm dropdown-toggle"
                  >
                    Listo
                  </button>
                </div>
              </div>
            </div>
            {/* End  All Categories */}

            <div className="position-relative mb10">
              <button
                type="button"
                className="open-btn mb15 drop_btn"
                data-bs-toggle="dropdown"
                data-bs-auto-close="outside"
              >
                Todas las Comunas <i className="fa fa-angle-down ms-2" />
              </button>
              <div className="dropdown-menu">
                <div className="widget-wrapper bdrb1 pb25 mb0 p20">
                  <div className="bootselect-multiselect">
                    <Location filterFunctions={filterFunctions} />
                  </div>
                </div>
                <div className="text-end mt10 pr10">
                  <button
                    type="button"
                    className="done-btn box-shadow-0 ud-btn btn-thm drop_btn"
                  >
                    Listo
                  </button>
                </div>
              </div>
            </div>
            {/*  All Cities */}
          </div>
        </div>
      </div>
      {/* End .col-9 */}

      <div className="col-md-3">
        <div className="page_control_shorting text-start text-md-end mb20">
          <div className="pcs_dropdown d-flex align-items-center justify-content-end">
            <span style={{ minWidth: "80px", textAlign: "left" }}>Ordenar por</span>
            <select
              style={{ width: "135px" }}
              className="selectpicker form-select"
            >
              <option value="Newest">Más recientes</option>
              <option value="Best Seller">Más vendidos</option>
              <option value="Best Match">Relevancia</option>
              <option value="Price Low">Precio menor</option>
              <option value="Price High">Precio mayor</option>
            </select>
          </div>
        </div>
      </div>
    </>
  );
};

export default TopFilter;
