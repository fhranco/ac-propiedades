
'use client'

import React from "react";

const TopFilterBar = ({setCurrentSortingOption,colstyle,setColstyle,pageContentTrac}) => {
  return (
    <>
      <div className="col-sm-6">
        <div className="text-center text-sm-start">
          <p className="pagination_page_count mb-0">
            Mostrando {pageContentTrac[0]}–{pageContentTrac[2] < pageContentTrac[1] ? pageContentTrac[2] : pageContentTrac[1]} de {pageContentTrac[2]} resultados
          </p>
        </div>
      </div>
      {/* End .col-sm-6 */}

      <div className="col-sm-6">
        <div className="page_control_shorting d-flex align-items-center justify-content-center justify-content-sm-end">
          <div className="pcs_dropdown pr10 d-flex align-items-center">
            <span style={{ minWidth: "80px" }}>Ordenar por</span>
            <select className="form-select"  onChange={(e)=>setCurrentSortingOption && setCurrentSortingOption(e.target.value)}>
              <option value="Newest">Más recientes</option>
              <option value="Best Seller">Más vendidos</option>
              <option value="Best Match">Relevancia</option>
              <option value="Price Low">Precio menor</option>
              <option value="Price High">Precio mayor</option>
            </select>
          </div>
          <div className={`pl15 pr15 bdrl1 bdrr1 d-none d-md-block cursor  ${!colstyle? 'menuActive':'#' } `}    onClick={()=>setColstyle(false)}>
            Cuadrícula
          </div>
          <div className={`pl15 d-none d-md-block cursor  ${colstyle? 'menuActive':'#' }`}   onClick={()=>setColstyle(true)}>
            Lista
          </div>
        </div>
      </div>
      {/* End .col-sm-6 */}
    </>
  );
};

export default TopFilterBar;
