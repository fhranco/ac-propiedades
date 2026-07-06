"use client";
import React, { useState, useEffect } from "react";

const VideoOptionFiled = ({ initialData }) => {
  const [videoMode, setVideoMode] = useState("link"); // 'link' o 'file'
  const [videoUrl, setVideoUrl] = useState("");
  const [videoFileBase64, setVideoFileBase64] = useState("");

  useEffect(() => {
    if (initialData?.video_url) {
      setVideoUrl(initialData.video_url);
    }
  }, [initialData]);

  const handleVideoFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setVideoFileBase64(event.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // Helper para generar embed de youtube/vimeo/instagram/facebook a partir del enlace
  const getEmbedUrl = (url) => {
    if (!url) return "";
    
    // YouTube
    if (url.includes("youtube.com") || url.includes("youtu.be")) {
      const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
      const match = url.match(regExp);
      return match && match[2].length === 11
        ? `https://www.youtube.com/embed/${match[2]}`
        : url;
    }
    
    // Vimeo
    if (url.includes("vimeo.com")) {
      const regExp = /vimeo\.com\/([0-9]+)/;
      const match = url.match(regExp);
      return match ? `https://player.vimeo.com/video/${match[1]}` : url;
    }

    // Instagram (Reels y Posts)
    if (url.includes("instagram.com")) {
      // Remover query parameters y asegurarse de terminar con /embed
      let cleanUrl = url.split("?")[0];
      if (!cleanUrl.endsWith("/")) {
        cleanUrl += "/";
      }
      return `${cleanUrl}embed`;
    }

    // Facebook Videos
    if (url.includes("facebook.com") || url.includes("fb.watch")) {
      return `https://www.facebook.com/plugins/video.php?href=${encodeURIComponent(url)}&show_text=0`;
    }

    return url;
  };

  return (
    <>
      <div className="col-12 mb20">
        <label className="heading-color ff-heading fw600 mb15">Método de Video</label>
        <div className="d-flex gap-4 flex-wrap">
          <div className="form-check cursor-pointer">
            <input
              className="form-check-input"
              type="radio"
              name="videoMode"
              id="videoModeLink"
              value="link"
              checked={videoMode === "link"}
              onChange={() => setVideoMode("link")}
            />
            <label className="form-check-label heading-color ff-heading cursor-pointer" htmlFor="videoModeLink">
              Enlace de video (YouTube / Vimeo)
            </label>
          </div>
          <div className="form-check cursor-pointer">
            <input
              className="form-check-input"
              type="radio"
              name="videoMode"
              id="videoModeFile"
              value="file"
              checked={videoMode === "file"}
              onChange={() => setVideoMode("file")}
            />
            <label className="form-check-label heading-color ff-heading cursor-pointer" htmlFor="videoModeFile">
              Subir archivo de video local
            </label>
          </div>
        </div>
      </div>

      {videoMode === "link" ? (
        <div className="col-12">
          <div className="mb30">
            <label className="heading-color ff-heading fw600 mb10">Enlace del Video</label>
            <input
              type="text"
              name="videoUrl"
              className="form-control"
              placeholder="Ej: https://www.youtube.com/watch?v=XXXXX"
              value={videoUrl}
              onChange={(e) => setVideoUrl(e.target.value)}
            />
          </div>
          {videoUrl && (
            <div className="mb30">
              <label className="heading-color ff-heading fw600 mb10">Vista previa del reproductor</label>
              <div className="location-area">
                <iframe
                  src={getEmbedUrl(videoUrl)}
                  width="100%"
                  height="360"
                  style={{ border: 0 }}
                  allowFullScreen
                />
              </div>
            </div>
          )}
        </div>
      ) : (
        <div className="col-12">
          <div className="mb30">
            <label className="heading-color ff-heading fw600 mb10">Seleccionar archivo</label>
            <input
              type="file"
              accept="video/mp4,video/mov,video/*"
              className="form-control"
              onChange={handleVideoFileChange}
            />
            {/* Guardar Base64 del archivo para enviar en el form */}
            <input type="hidden" name="videoFile" value={videoFileBase64} />
          </div>
          {videoFileBase64 && (
            <div className="mb30">
              <label className="heading-color ff-heading fw600 mb10">Vista previa</label>
              <div className="location-area">
                <video
                  src={videoFileBase64}
                  controls
                  style={{ maxWidth: "100%", maxHeight: "360px" }}
                />
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default VideoOptionFiled;
