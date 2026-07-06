"use client";
import React, { useState } from "react";
import Select from "react-select";

const ReviewBoxForm = ({ propiedadId }) => {
  const [email, setEmail] = useState("");
  const [title, setTitle] = useState("");
  const [rating, setRating] = useState("Five Star");
  const [review, setReview] = useState("");
  const [statusMessage, setStatusMessage] = useState(null);

  const inqueryType = [
    { value: "Five Star", label: "5 Estrellas" },
    { value: "Four Star", label: "4 Estrellas" },
    { value: "Three Star", label: "3 Estrellas" },
    { value: "Two Star", label: "2 Estrellas" },
    { value: "One Star", label: "1 Estrella" },
  ];

  const customStyles = {
    option: (styles, { isFocused, isSelected, isHovered }) => {
      return {
        ...styles,
        backgroundColor: isSelected
          ? "#eb6753"
          : isHovered
          ? "#eb675312"
          : isFocused
          ? "#eb675312"
          : undefined,
      };
    },
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setStatusMessage(null);

    try {
      const res = await fetch("/api/resenas", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          propiedadId,
          email,
          title,
          rating,
          review,
        }),
      });

      if (res.ok) {
        setStatusMessage({ type: "success", text: "¡Reseña guardada correctamente!" });
        setEmail("");
        setTitle("");
        setReview("");
        // Opcionalmente recargar la página para ver los cambios
        if (typeof window !== "undefined") {
          window.location.reload();
        }
      } else {
        const err = await res.json();
        setStatusMessage({ type: "error", text: err.error || "Error al guardar" });
      }
    } catch (err) {
      setStatusMessage({ type: "error", text: err.message });
    }
  };

  return (
    <form className="comments_form mt30" onSubmit={handleSubmit}>
      {statusMessage && (
        <div className={`alert ${statusMessage.type === "success" ? "alert-success" : "alert-danger"} mb-3`}>
          {statusMessage.text}
        </div>
      )}
      <div className="row">
        <div className="col-md-12">
          <div className="mb-4">
            <label className="fw600 ff-heading mb-2">Email</label>
            <input
              type="email"
              className="form-control"
              placeholder="tu@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
        </div>

        <div className="col-md-6">
          <div className="mb-4">
            <label className="fw600 ff-heading mb-2">Título de la opinión</label>
            <input
              type="text"
              className="form-control"
              placeholder="Ej: Excelente ubicación"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>
        </div>

        <div className="col-md-6">
          <div className="widget-wrapper sideborder-dropdown mb-4">
            <label className="fw600 ff-heading mb-2">Calificación</label>
            <div className="form-style2 input-group">
              <Select
                defaultValue={[inqueryType[0]]}
                name="rating"
                options={inqueryType}
                styles={customStyles}
                className="custom-react_select"
                classNamePrefix="select"
                onChange={(option) => setRating(option.value)}
                required
                isClearable={false}
              />
            </div>
          </div>
        </div>

        <div className="col-md-12">
          <div className="mb-4">
            <label className="fw600 ff-heading mb-2">Opinión</label>
            <textarea
              className="pt15"
              rows={6}
              placeholder="Escribe tu reseña aquí..."
              value={review}
              onChange={(e) => setReview(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="ud-btn btn-white2">
            Enviar reseña
            <i className="fal fa-arrow-right-long" />
          </button>
        </div>
      </div>
    </form>
  );
};

export default ReviewBoxForm;
