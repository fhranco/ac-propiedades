import { supabase } from "@/lib/supabase";

const compressImage = (file, maxWidth = 1600, maxHeight = 1200, quality = 0.8) => {
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (event) => {
      const img = new window.Image();
      img.src = event.target.result;
      img.onload = () => {
        const canvas = document.createElement("canvas");
        let width = img.width;
        let height = img.height;

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
            const compressedFile = new File([blob], file.name, {
              type: "image/jpeg",
              lastModified: Date.now(),
            });
            resolve(compressedFile);
          },
          "image/jpeg",
          quality
        );
      };
    };
  });
};

const UploadPhotoGallery = ({ initialImages = [] }) => {
  const [uploadedImages, setUploadedImages] = useState([]);
  const [coverIndex, setCoverIndex] = useState(0);
  const [uploadingStatus, setUploadingStatus] = useState("");
  const fileInputRef = useRef(null);

  // Sincronizar imágenes existentes de la propiedad en modo edición
  useEffect(() => {
    if (initialImages && initialImages.length > 0) {
      setUploadedImages(initialImages);
    }
  }, [initialImages]);

  const handleUpload = async (files) => {
    const newImages = [...uploadedImages];
    let count = 0;

    for (const file of files) {
      count++;
      setUploadingStatus(`Optimizando y subiendo foto ${count} de ${files.length}...`);
      try {
        // 1. Comprimir imagen en el navegador
        const compressedFile = await compressImage(file);

        // 2. Intentar subir a Supabase Storage
        const fileExt = file.name.split(".").pop();
        const fileName = `${Date.now()}-${Math.random().toString(36).substring(2, 15)}.${fileExt}`;
        const filePath = `${fileName}`;

        const { error: uploadError } = await supabase.storage
          .from("AC PROPIEDADES")
          .upload(filePath, compressedFile, {
            cacheControl: "3600",
            upsert: false,
          });

        if (uploadError) throw uploadError;

        // Obtener URL pública
        const { data: { publicUrl } } = supabase.storage
          .from("AC PROPIEDADES")
          .getPublicUrl(filePath);

        newImages.push(publicUrl);
        setUploadedImages([...newImages]);
      } catch (err) {
        console.warn("Storage upload failed, falling back to compressed base64:", err);
        // Si falla la subida a Storage (ej. políticas RLS), caemos en Base64 pero comprimido
        const compressedFile = await compressImage(file);
        const base64 = await new Promise((resolve) => {
          const reader = new FileReader();
          reader.onload = (e) => resolve(e.target.result);
          reader.readAsDataURL(compressedFile);
        });
        newImages.push(base64);
        setUploadedImages([...newImages]);
      }
    }
    setUploadingStatus("");
  };

  const handleDrop = (event) => {
    event.preventDefault();
    const files = event.dataTransfer.files;
    handleUpload(files);
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  const handleDelete = (index) => {
    const newImages = [...uploadedImages];
    newImages.splice(index, 1);
    setUploadedImages(newImages);
    
    if (coverIndex === index) {
      setCoverIndex(0);
    } else if (coverIndex > index) {
      setCoverIndex(coverIndex - 1);
    }
  };

  const handleSetCover = (index) => {
    setCoverIndex(index);
  };

  return (
    <>
      <div
        className="upload-img position-relative overflow-hidden bdrs12 text-center mb30 px-2"
        onDrop={handleDrop}
        onDragOver={handleDragOver}
      >
        <div className="icon mb30">
          <span className="flaticon-upload" />
        </div>
        <h4 className="title fz17 mb10">Subir/Arrastrar fotos de la propiedad</h4>
        <p className="text mb25">
          Las fotos deben ser formato JPEG o PNG
        </p>
        <label className="ud-btn btn-white cursor-pointer">
          Buscar archivos
          <input
            ref={fileInputRef}
            id="fileInput"
            type="file"
            multiple
            className="d-none"
            onChange={(e) => handleUpload(e.target.files)}
          />
        </label>
      </div>

      {uploadingStatus && (
        <div className="alert alert-info text-center mb20" style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "10px", borderRadius: "12px", border: "1px solid #bbeeeb", color: "#1d293f" }}>
          <div className="spinner-border spinner-border-sm text-info" role="status" style={{ width: "1rem", height: "1rem" }} />
          <span className="fw-semibold fz14">{uploadingStatus}</span>
        </div>
      )}

      {/* Input oculto con string JSON de imágenes para el submit del formulario */}
      <input type="hidden" name="imagesJson" value={JSON.stringify(uploadedImages)} />
      <input type="hidden" name="coverImageIndex" value={coverIndex} />

      {uploadedImages.length > 0 && (
        <>
          <h5 className="title fz15 mb20">Galería cargada (Haz clic en la estrella para definir la portada principal)</h5>
          <div className="row profile-box position-relative d-md-flex align-items-stretch mb50">
            {uploadedImages.map((imageData, index) => {
              const isCover = coverIndex === index;
              return (
                <div className="col-6 col-sm-4 col-md-3 col-xl-2 mb20" key={index}>
                  <div 
                    className="profile-img position-relative h-100 border bdrs12 p-1 d-flex flex-column justify-content-between"
                    style={{ 
                      borderColor: isCover ? "#eb6753" : "#e9e9e9", 
                      backgroundColor: isCover ? "#eb675305" : "#fff",
                      boxShadow: isCover ? "0 4px 12px rgba(235, 103, 83, 0.15)" : "none"
                    }}
                  >
                    <div className="position-relative overflow-hidden bdrs8" style={{ height: "120px" }}>
                      <img
                        src={imageData}
                        className="w-100 h-100 cover"
                        alt={`Galería ${index + 1}`}
                        style={{ objectFit: "cover" }}
                      />
                      <button
                        type="button"
                        className="tag position-absolute"
                        style={{
                          top: "8px",
                          right: "8px",
                          background: "rgba(255, 255, 255, 0.9)",
                          border: "none",
                          borderRadius: "50%",
                          width: "28px",
                          height: "28px",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          cursor: "pointer"
                        }}
                        onClick={() => handleDelete(index)}
                        title="Eliminar foto"
                      >
                        <span className="flaticon-bin" style={{ fontSize: "12px", color: "#dc3545" }} />
                      </button>
                    </div>

                    <div className="d-flex justify-content-between align-items-center mt10 px-1">
                      <button
                        type="button"
                        style={{
                          border: "none",
                          background: "none",
                          cursor: "pointer"
                        }}
                        onClick={() => handleSetCover(index)}
                        title="Fijar como portada principal"
                      >
                        <i 
                          className={isCover ? "fas fa-star" : "far fa-star"} 
                          style={{ color: isCover ? "#eb6753" : "#a1a1a1", fontSize: "16px" }}
                        />
                      </button>
                      <span className="text-muted fz11">#{index + 1}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </>
      )}
    </>
  );
};

export default UploadPhotoGallery;
