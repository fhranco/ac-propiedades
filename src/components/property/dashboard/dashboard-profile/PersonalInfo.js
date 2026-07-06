"use client";
import React, { useState, useEffect } from "react";

const PersonalInfo = ({ data, onSave, saving }) => {
  const [form, setForm] = useState({
    username: "",
    email: "",
    phoneNumber: "",
    firstName: "",
    lastName: "",
    position: "",
    language: "",
    companyName: "",
    rut: "",
    address: "",
    aboutMe: ""
  });

  useEffect(() => {
    if (data) {
      setForm({
        username: data.username || "",
        email: data.email || "",
        phoneNumber: data.phoneNumber || "",
        firstName: data.firstName || "",
        lastName: data.lastName || "",
        position: data.position || "",
        language: data.language || "",
        companyName: data.companyName || "",
        rut: data.rut || "",
        address: data.address || "",
        aboutMe: data.aboutMe || ""
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
              Nombre de usuario
            </label>
            <input
              type="text"
              name="username"
              value={form.username}
              onChange={handleChange}
              className="form-control"
              placeholder="Ej: juan.perez"
              required
            />
          </div>
        </div>

        <div className="col-sm-6 col-xl-4">
          <div className="mb20">
            <label className="heading-color ff-heading fw600 mb10">Correo electrónico</label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              className="form-control"
              placeholder="Ej: contacto@acpropiedades.cl"
              required
            />
          </div>
        </div>

        <div className="col-sm-6 col-xl-4">
          <div className="mb20">
            <label className="heading-color ff-heading fw600 mb10">Teléfono</label>
            <input
              type="text"
              name="phoneNumber"
              value={form.phoneNumber}
              onChange={handleChange}
              className="form-control"
              placeholder="Ej: +56 9 1234 5678"
              required
            />
          </div>
        </div>

        <div className="col-sm-6 col-xl-4">
          <div className="mb20">
            <label className="heading-color ff-heading fw600 mb10">
              Nombre
            </label>
            <input
              type="text"
              name="firstName"
              value={form.firstName}
              onChange={handleChange}
              className="form-control"
              placeholder="Ej: Juan"
              required
            />
          </div>
        </div>

        <div className="col-sm-6 col-xl-4">
          <div className="mb20">
            <label className="heading-color ff-heading fw600 mb10">
              Apellido
            </label>
            <input
              type="text"
              name="lastName"
              value={form.lastName}
              onChange={handleChange}
              className="form-control"
              placeholder="Ej: Pérez"
              required
            />
          </div>
        </div>

        <div className="col-sm-6 col-xl-4">
          <div className="mb20">
            <label className="heading-color ff-heading fw600 mb10">
              Cargo
            </label>
            <input
              type="text"
              name="position"
              value={form.position}
              onChange={handleChange}
              className="form-control"
              placeholder="Ej: Agente inmobiliario"
              required
            />
          </div>
        </div>

        <div className="col-sm-6 col-xl-4">
          <div className="mb20">
            <label className="heading-color ff-heading fw600 mb10">
              Idioma
            </label>
            <input
              type="text"
              name="language"
              value={form.language}
              onChange={handleChange}
              className="form-control"
              placeholder="Ej: Español"
              required
            />
          </div>
        </div>

        <div className="col-sm-6 col-xl-4">
          <div className="mb20">
            <label className="heading-color ff-heading fw600 mb10">
              Nombre de la empresa
            </label>
            <input
              type="text"
              name="companyName"
              value={form.companyName}
              onChange={handleChange}
              className="form-control"
              placeholder="Ej: AC Propiedades Magallanes"
              required
            />
          </div>
        </div>

        <div className="col-sm-6 col-xl-4">
          <div className="mb20">
            <label className="heading-color ff-heading fw600 mb10">
              RUT
            </label>
            <input
              type="text"
              name="rut"
              value={form.rut}
              onChange={handleChange}
              className="form-control"
              placeholder="Ej: 12.345.678-9"
              required
            />
          </div>
        </div>

        <div className="col-xl-12">
          <div className="mb20">
            <label className="heading-color ff-heading fw600 mb10">
              Dirección
            </label>
            <input
              type="text"
              name="address"
              value={form.address}
              onChange={handleChange}
              className="form-control"
              placeholder="Ej: Calle Bories 123, Punta Arenas"
              required
            />
          </div>
        </div>

        <div className="col-md-12">
          <div className="mb10">
            <label className="heading-color ff-heading fw600 mb10">
              Sobre mí
            </label>
            <textarea
              name="aboutMe"
              value={form.aboutMe}
              onChange={handleChange}
              cols={30}
              rows={4}
              placeholder="Escribe una breve biografía o descripción profesional..."
            />
          </div>
        </div>

        <div className="col-md-12">
          <div className="text-end">
            <button type="submit" className="ud-btn btn-dark" disabled={saving}>
              {saving ? "Guardando..." : "Actualizar perfil"}
              <i className="fal fa-arrow-right-long" />
            </button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default PersonalInfo;
