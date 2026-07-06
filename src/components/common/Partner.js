"use client";
import Image from "next/image";
import { useEffect, useState } from "react";

const Partner = () => {
  const partnerImages = ["1.png", "2.png", "3.png", "4.png", "5.png", "6.png"];
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  // Duplicamos el array de imágenes para crear el efecto infinito e ininterrumpido en el scroll
  const doubleImages = [...partnerImages, ...partnerImages, ...partnerImages];

  return (
    <>
      <style dangerouslySetInnerHTML={{__html: `
        .marquee-wrapper {
          overflow: hidden;
          width: 100%;
          padding: 10px 0;
          position: relative;
        }
        .marquee-track {
          display: flex;
          width: calc(110px * ${doubleImages.length});
          animation: scrollMarquee 25s linear infinite;
          transform: translateX(calc(-110px * ${partnerImages.length}));
        }
        .marquee-track:hover {
          animation-play-state: paused;
        }
        .marquee-item {
          width: 110px;
          display: flex;
          justify-content: center;
          align-items: center;
          flex-shrink: 0;
          opacity: 0.5;
          transition: opacity 0.3s ease;
        }
        .marquee-item:hover {
          opacity: 0.9;
        }
        @keyframes scrollMarquee {
          0% {
            transform: translateX(calc(-110px * ${partnerImages.length}));
          }
          100% {
            transform: translateX(0);
          }
        }
      `}} />

      <div className="marquee-wrapper">
        <div className="marquee-track">
          {doubleImages.map((imageName, index) => (
            <div className="marquee-item" key={index}>
              <Image
                width={85}
                height={24}
                style={{ objectFit: "contain", maxHeight: "24px" }}
                className="wa"
                src={`/images/partners/${imageName}`}
                alt="partner-logo"
              />
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Partner;
