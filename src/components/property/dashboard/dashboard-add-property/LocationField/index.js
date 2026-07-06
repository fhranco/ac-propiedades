import React from "react";
import SelectMulitField from "./SelectMulitField";
import Map from "./Map";

const LocationField = ({ initialData }) => {
  return (
    <div className="form-style1">
      <div className="row">
        <div className="col-sm-12">
          <div className="mb20">
            <label className="heading-color ff-heading fw600 mb10">
              Dirección
            </label>
            <input
              type="text"
              name="address"
              className="form-control"
              placeholder="Ej: Calle 123, Santiago"
              defaultValue={initialData?.address || ""}
            />
          </div>
        </div>
        {/* End col-12 */}

        <SelectMulitField initialData={initialData} />

        <div className="col-sm-6 col-xl-4">
          <div className="mb20">
            <label className="heading-color ff-heading fw600 mb10">
              Código postal
            </label>
            <input 
              type="text" 
              name="zip"
              className="form-control" 
              placeholder="Ej: 8320000" 
              defaultValue={initialData?.codigo_postal || ""}
            />
          </div>
        </div>
        {/* End col-4 */}

        <div className="col-sm-12">
          <div className="mb20 mt30">
            <label className="heading-color ff-heading fw600 mb30">
              Coloca el pin del listado en el mapa
            </label>
            <Map lat={initialData?.lat} lng={initialData?.lng} />
          </div>
        </div>
        {/* End col-12 */}
      </div>
      {/* End .row */}

      <div className="row">
        <div className="col-sm-6 col-xl-4">
          <div className="mb30">
            <label className="heading-color ff-heading fw600 mb10">
              Latitud
            </label>
            <input 
              type="text" 
              name="lat"
              className="form-control" 
              placeholder="Ej: -33.45" 
              defaultValue={initialData?.lat || ""}
            />
          </div>
        </div>
        {/* End .col-sm-6 */}

        <div className="col-sm-6 col-xl-4">
          <div className="mb30">
            <label className="heading-color ff-heading fw600 mb10">
              Longitud
            </label>
            <input 
              type="text" 
              name="lng"
              className="form-control" 
              placeholder="Ej: -70.66" 
              defaultValue={initialData?.lng || ""}
            />
          </div>
        </div>
        {/* End .col-sm-6 */}
      </div>
      {/* End .row */}
    </div>
  );
};

export default LocationField;
