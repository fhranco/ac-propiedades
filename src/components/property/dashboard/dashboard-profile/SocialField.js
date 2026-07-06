"use client";
import React, { useState, useEffect } from "react";

const SocialField = ({ data, onSave, saving }) => {
  const [form, setForm] = useState({
    facebook: "",
    pinterest: "",
    instagram: "",
    twitter: "",
    linkedin: "",
    website: ""
  });

  useEffect(() => {
    if (data) {
      setForm({
        facebook: data.facebook || "",
        pinterest: data.pinterest || "",
        instagram: data.instagram || "",
        twitter: data.twitter || "",
        linkedin: data.linkedin || "",
        website: data.website || ""
      });
    }
  }, [data]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(form);
  };

  return (
    <form className="form-style1" onSubmit={handleSubmit}>
      <div className="row">
        <div className="col-sm-6 col-xl-4">
          <div className="mb20">
            <label className="heading-color ff-heading fw600 mb10">
              Enlace de Facebook
            </label>
            <input
              type="text"
              name="facebook"
              value={form.facebook}
              onChange={handleChange}
              className="form-control"
              placeholder="https://facebook.com/usuario"
            />
          </div>
        </div>

        <div className="col-sm-6 col-xl-4">
          <div className="mb20">
            <label className="heading-color ff-heading fw600 mb10">
              Enlace de Pinterest
            </label>
            <input
              type="text"
              name="pinterest"
              value={form.pinterest}
              onChange={handleChange}
              className="form-control"
              placeholder="https://pinterest.com/usuario"
            />
          </div>
        </div>

        <div className="col-sm-6 col-xl-4">
          <div className="mb20">
            <label className="heading-color ff-heading fw600 mb10">
              Enlace de Instagram
            </label>
            <input
              type="text"
              name="instagram"
              value={form.instagram}
              onChange={handleChange}
              className="form-control"
              placeholder="https://instagram.com/usuario"
            />
          </div>
        </div>

        <div className="col-sm-6 col-xl-4">
          <div className="mb20">
            <label className="heading-color ff-heading fw600 mb10">
              Enlace de Twitter
            </label>
            <input
              type="text"
              name="twitter"
              value={form.twitter}
              onChange={handleChange}
              className="form-control"
              placeholder="https://twitter.com/usuario"
            />
          </div>
        </div>

        <div className="col-sm-6 col-xl-4">
          <div className="mb20">
            <label className="heading-color ff-heading fw600 mb10">
              Enlace de LinkedIn
            </label>
            <input
              type="text"
              name="linkedin"
              value={form.linkedin}
              onChange={handleChange}
              className="form-control"
              placeholder="https://linkedin.com/in/usuario"
            />
          </div>
        </div>

        <div className="col-sm-6 col-xl-4">
          <div className="mb20">
            <label className="heading-color ff-heading fw600 mb10">
              Enlace del sitio web (sin http)
            </label>
            <input
              type="text"
              name="website"
              value={form.website}
              onChange={handleChange}
              className="form-control"
              placeholder="www.tuweb.com"
            />
          </div>
        </div>

        <div className="col-md-12">
          <div className="text-end">
            <button type="submit" className="ud-btn btn-dark" disabled={saving}>
              {saving ? "Guardando..." : "Actualizar redes"}
              <i className="fal fa-arrow-right-long" />
            </button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default SocialField;
