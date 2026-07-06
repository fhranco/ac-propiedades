"use client";
import React, { useState } from "react";
import Image from "next/image";

const ProfileBox = ({ imageUrl, onUpload, onDelete }) => {
  const [dragActive, setDragActive] = useState(false);

  const handleFile = (file) => {
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        onUpload(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUpload = (event) => {
    const file = event.target.files[0];
    handleFile(file);
  };

  return (
    <div className="profile-box position-relative d-md-flex align-items-end mb50">
      <div className="profile-img new position-relative overflow-hidden bdrs12 mb20-sm">
        <Image
          width={240}
          height={220}
          className="w-100 cover h-100"
          src={imageUrl || "/images/listings/profile-1.jpg"}
          alt="profile avatar"
          unoptimized={imageUrl?.startsWith("data:")}
        />

        {imageUrl && (
          <button
            type="button"
            className="tag-del"
            style={{ border: "none" }}
            onClick={onDelete}
            title="Eliminar imagen"
          >
            <span className="fas fa-trash-can" />
          </button>
        )}
      </div>

      <div className="profile-content ml30 ml0-sm">
        <label className="upload-label pointer">
          <input
            type="file"
            accept="image/jpeg,image/png"
            onChange={handleUpload}
            style={{ display: "none" }}
          />
          <div className="ud-btn btn-white2 mb30">
            Subir foto de perfil
            <i className="fal fa-arrow-right-long" />
          </div>
        </label>
        <p className="text">
          La foto de perfil se guardará y sincronizará con todas tus publicaciones públicas.
        </p>
      </div>
    </div>
  );
};

export default ProfileBox;
