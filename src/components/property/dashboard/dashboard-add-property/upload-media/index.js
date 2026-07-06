"use client";
import React, { useState, useEffect } from "react";
import UploadPhotoGallery from "./UploadPhotoGallery";
import VideoOptionFiled from "./VideoOptionFiled";

const UploadMedia = ({ initialImages = [], initialData }) => {
  const [tourUrl, setTourUrl] = useState("");

  useEffect(() => {
    if (initialData?.tour_360_url) {
      setTourUrl(initialData.tour_360_url);
    }
  }, [initialData]);

  const handleTourChange = (e) => {
    setTourUrl(e.target.value);
  };

  return (
    <div className="ps-widget bgc-white bdrs12 p30 overflow-hidden position-relative">
      <h4 className="title fz17 mb30">Cargar fotos de la propiedad</h4>
      <div className="form-style1">
        <div className="row">
          <div className="col-lg-12">
            <UploadPhotoGallery initialImages={initialImages} />
          </div>
        </div>
        {/* End col-12 */}

        <div className="row mt30">
          <h4 className="title fz17 mb30">Opción de Video</h4>
          <VideoOptionFiled initialData={initialData} />
        </div>
        {/* End .row */}

        <div className="row mt30">
          <h4 className="title fz17 mb30">Tour Virtual 360°</h4>
          <div className="col-sm-6 col-xl-12">
            <div className="mb30">
              <label className="heading-color ff-heading fw600 mb10">Enlace del Tour Virtual</label>
              <input
                type="text"
                className="form-control"
                name="tour360Url"
                placeholder="https://my.matterport.com/show/?m=..."
                value={tourUrl}
                onChange={handleTourChange}
              />
            </div>
          </div>
        </div>
        {/* End .row */}

        {tourUrl && (
          <div className="row mt-3">
            <div className="col-12">
              <div className="mb30">
                <label className="heading-color ff-heading fw600 mb10">Vista previa del Tour</label>
                <div className="location-area" style={{ borderRadius: "12px", overflow: "hidden" }}>
                  <iframe
                    src={tourUrl}
                    width="100%"
                    height="400"
                    style={{ border: 0 }}
                    allowFullScreen
                  ></iframe>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default UploadMedia;
