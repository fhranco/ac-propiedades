"use client";
import React, { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { useRouter, useSearchParams } from "next/navigation";

const AddBlog = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const editId = searchParams.get("edit");

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
    slug: "",
    content: "",
    image: "",
    category: "",
    seo_title: "",
    seo_description: "",
    seo_keywords: "",
    status: "published",
  });

  useEffect(() => {
    if (editId) {
      const fetchBlog = async () => {
        const { data, error } = await supabase
          .from("blogs")
          .select("*")
          .eq("id", editId)
          .single();
        if (data && !error) {
          setFormData(data);
        }
      };
      fetchBlog();
    }
  }, [editId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    let newFormData = { ...formData, [name]: value };

    // Auto-generate slug from title if title is changed and we are NOT editing
    if (name === "title" && !editId) {
      newFormData.slug = value
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)+/g, "");
    }
    setFormData(newFormData);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    try {
      if (editId) {
        const { error } = await supabase
          .from("blogs")
          .update(formData)
          .eq("id", editId);
        if (error) throw error;
        setMessage({ type: "success", text: "Noticia actualizada con éxito." });
      } else {
        const { error } = await supabase
          .from("blogs")
          .insert([formData]);
        if (error) throw error;
        setMessage({ type: "success", text: "Noticia guardada con éxito." });
        
        // Clear form only on insert
        setFormData({
          title: "",
          slug: "",
          content: "",
          image: "",
          category: "",
          seo_title: "",
          seo_description: "",
          seo_keywords: "",
          status: "published",
        });
      }
      
    } catch (error) {
      console.error("Error guardando noticia:", error);
      setMessage({ type: "error", text: "Error al guardar la noticia: " + error.message });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="ps-widget bgc-white bdrs12 default-box-shadow2 p30 mb30 overflow-hidden position-relative">
      <h4 className="title fz17 mb30">Información del Artículo</h4>
      
      {message && (
        <div className={`alert alert-${message.type === "success" ? "success" : message.type === "info" ? "info" : "danger"}`}>
          {message.text}
        </div>
      )}

      <form className="form-style1" onSubmit={handleSubmit}>
        <div className="row">
          <div className="col-sm-6">
            <div className="mb20">
              <label className="heading-color ff-heading fw600 mb10">Título de la Noticia *</label>
              <input
                type="text"
                className="form-control"
                placeholder="Ej: Nuevas parcelas en Magallanes"
                name="title"
                value={formData.title}
                onChange={handleChange}
                required
              />
            </div>
          </div>
          <div className="col-sm-6">
            <div className="mb20">
              <label className="heading-color ff-heading fw600 mb10">URL Amigable (Slug) *</label>
              <input
                type="text"
                className="form-control"
                placeholder="ej-nuevas-parcelas"
                name="slug"
                value={formData.slug}
                onChange={handleChange}
                required
              />
            </div>
          </div>
          
          <div className="col-sm-6">
            <div className="mb20">
              <label className="heading-color ff-heading fw600 mb10">Categoría</label>
              <input
                type="text"
                className="form-control"
                placeholder="Ej: Inversión, Consejos, Mercado"
                name="category"
                value={formData.category}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="col-sm-6">
            <div className="mb20">
              <label className="heading-color ff-heading fw600 mb10">Imagen Destacada (Archivo o URL)</label>
              <input
                type="text"
                className="form-control mb-2"
                placeholder="https://ejemplo.com/imagen.jpg"
                name="image"
                value={formData.image.startsWith("data:image") ? "Imagen subida localmente" : formData.image}
                onChange={handleChange}
                disabled={formData.image.startsWith("data:image")}
              />
              <input
                type="file"
                className="form-control"
                accept="image/*"
                onChange={async (e) => {
                  const file = e.target.files?.[0];
                  if (file) {
                    setMessage({ type: "info", text: "Optimizando y subiendo imagen..." });
                    try {
                      // 1. Comprimir imagen en el navegador
                      const compressImageLocal = (imgFile) => {
                        return new Promise((resolve) => {
                          const reader = new FileReader();
                          reader.readAsDataURL(imgFile);
                          reader.onload = (event) => {
                            const img = new window.Image();
                            img.src = event.target.result;
                            img.onload = () => {
                              const canvas = document.createElement("canvas");
                              let width = img.width;
                              let height = img.height;
                              const maxWidth = 1600;
                              const maxHeight = 1200;
                              if (width > height) {
                                if (width > maxWidth) {
                                  height = Math.round((height * maxWidth) / width);
                                  width = maxWidth;
                                }
                              } else {
                                if (height > maxHeight) {
                                  width = Math.round((width * maxHeight) / height);
                                  height = maxHeight;
                                }
                              }
                              canvas.width = width;
                              canvas.height = height;
                              const ctx = canvas.getContext("2d");
                              ctx.drawImage(img, 0, 0, width, height);
                              canvas.toBlob(
                                (blob) => {
                                  const compFile = new File([blob], imgFile.name, {
                                    type: "image/jpeg",
                                    lastModified: Date.now(),
                                  });
                                  resolve(compFile);
                                },
                                "image/jpeg",
                                0.8
                              );
                            };
                          };
                        });
                      };

                      const compressedFile = await compressImageLocal(file);

                      // 2. Subir a Supabase Storage (bajo carpeta blogs/ en el bucket propiedades)
                      const fileExt = file.name.split(".").pop();
                      const fileName = `blogs/${Date.now()}-${Math.random().toString(36).substring(2, 15)}.${fileExt}`;

                      const { error: uploadError } = await supabase.storage
                        .from("AC PROPIEDADES")
                        .upload(fileName, compressedFile, {
                          cacheControl: "3600",
                          upsert: false,
                        });

                      if (uploadError) throw uploadError;

                      // 3. Obtener URL pública
                      const { data: { publicUrl } } = supabase.storage
                        .from("AC PROPIEDADES")
                        .getPublicUrl(fileName);

                      setFormData(prev => ({ ...prev, image: publicUrl }));
                      setMessage({ type: "success", text: "Imagen optimizada y subida correctamente a Storage." });
                    } catch (err) {
                      console.warn("Storage upload failed, falling back to base64:", err);
                      // Fallback a base64
                      const reader = new FileReader();
                      reader.onloadend = () => {
                        setFormData(prev => ({ ...prev, image: reader.result }));
                        setMessage({ type: "success", text: "Imagen cargada localmente (Base64)." });
                      };
                      reader.readAsDataURL(file);
                    }
                  }
                }}
              />
              {formData.image && (
                <div className="mt-2 text-end">
                  <button 
                    type="button" 
                    className="btn btn-sm btn-danger mb-2" 
                    onClick={() => setFormData(prev => ({ ...prev, image: "" }))}
                  >
                    Borrar Imagen
                  </button>
                  <img src={formData.image} alt="Preview" style={{ maxWidth: "100%", height: "auto", borderRadius: "8px", display: "block" }} />
                </div>
              )}
            </div>
          </div>

          <div className="col-sm-12">
            <div className="mb20">
              <label className="heading-color ff-heading fw600 mb10">Contenido del Artículo (HTML/Texto) *</label>
              <textarea
                cols={30}
                rows={10}
                placeholder="Escribe el contenido del artículo aquí..."
                name="content"
                value={formData.content}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="col-sm-12 mt30">
            <h4 className="title fz17 mb30">Configuración SEO (Optimización en Google)</h4>
          </div>

          <div className="col-sm-12">
            <div className="mb20">
              <label className="heading-color ff-heading fw600 mb10">Título SEO</label>
              <input
                type="text"
                className="form-control"
                placeholder="Título optimizado para buscadores"
                name="seo_title"
                value={formData.seo_title}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="col-sm-12">
            <div className="mb20">
              <label className="heading-color ff-heading fw600 mb10">Descripción SEO</label>
              <textarea
                cols={30}
                rows={3}
                placeholder="Breve resumen para Google (150-160 caracteres)"
                name="seo_description"
                value={formData.seo_description}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="col-sm-12">
            <div className="mb20">
              <label className="heading-color ff-heading fw600 mb10">Palabras Clave (Keywords)</label>
              <input
                type="text"
                className="form-control"
                placeholder="parcelas, magallanes, inversión (separadas por coma)"
                name="seo_keywords"
                value={formData.seo_keywords}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="col-md-12 mt20 text-end">
            <button type="submit" className="ud-btn btn-dark" disabled={loading}>
              {loading ? "Guardando..." : "Publicar Noticia"}
              <i className="fal fa-arrow-right-long" />
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AddBlog;
