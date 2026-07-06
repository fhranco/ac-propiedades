"use client";
import testimonialData from "@/data/testimonials";
import Image from "next/image";
import { useEffect, useState } from "react";

const Testimonial = () => {
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  // Duplicamos testimonios para lograr ciclo ininterrumpido en el scroll
  const doubleTestimonials = [...testimonialData, ...testimonialData, ...testimonialData];

  return (
    <>
      <style dangerouslySetInnerHTML={{__html: `
        .testi-marquee-wrapper {
          overflow: hidden;
          width: 100%;
          padding: 20px 0;
          position: relative;
        }
        .testi-marquee-track {
          display: flex;
          gap: 30px;
          width: calc((380px + 30px) * ${doubleTestimonials.length});
          animation: scrollTestiMarquee 40s linear infinite;
        }
        .testi-marquee-track:hover {
          animation-play-state: paused;
        }
        .testi-marquee-item {
          width: 380px;
          flex-shrink: 0;
          display: flex;
        }
        .testi-marquee-item .testimonial-style1 {
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          width: 100%;
          margin-bottom: 0 !important;
          box-shadow: 0 10px 30px rgba(29, 41, 63, 0.15);
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 12px;
          background: #1d293f;
          padding: 30px;
          transition: all 0.3s ease;
        }
        .testi-marquee-item .testimonial-style1 .title,
        .testi-marquee-item .testimonial-style1 .text,
        .testi-marquee-item .testimonial-style1 h6 {
          color: #ffffff !important;
        }
        .testi-marquee-item .testimonial-style1 .icon {
          color: rgba(255, 255, 255, 0.2) !important;
        }
        .testi-marquee-item .testimonial-style1 .testimonial-review i {
          color: #ffc107 !important;
        }
        .testi-marquee-item:hover .testimonial-style1 {
          border-color: #eb6753;
          transform: translateY(-2px);
          box-shadow: 0 15px 35px rgba(235, 103, 83, 0.15);
        }
        .testimonial-content {
          flex-grow: 1;
          display: flex;
          flex-direction: column;
        }
        .testimonial-content .text {
          flex-grow: 1;
          margin-bottom: 15px;
          opacity: 0.9;
        }
        @keyframes scrollTestiMarquee {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(calc(-1 * (380px + 30px) * ${testimonialData.length}));
          }
        }
      `}} />

      <div className="testi-marquee-wrapper">
        <div className="testi-marquee-track">
          {doubleTestimonials.map((testimonial, index) => (
            <div className="testi-marquee-item" key={index}>
              <div className="testimonial-style1 position-relative">
                <div className="testimonial-content">
                  <h5 className="title">{testimonial.title}</h5>
                  <span className="icon fas fa-quote-left" />
                  <p className="text" style={{ fontSize: "14px", lineHeight: "1.6" }}>{testimonial.quote}</p>
                  <div className="testimonial-review">
                    {Array.from({ length: testimonial.stars }, (_, starIdx) => (
                      <a className="me-1" href="#" key={starIdx} onClick={(e) => e.preventDefault()}>
                        <i className="fas fa-star" />
                      </a>
                    ))}
                  </div>
                </div>
                <div className="thumb d-flex align-items-center">
                  <div className="flex-shrink-0">
                    <Image
                      width={60}
                      height={60}
                      className="wa"
                      src={testimonial.image}
                      alt="avatar"
                      style={{ borderRadius: "50%" }}
                    />
                  </div>
                  <div className="flex-grow-1 ms-3">
                    <h6 className="mb-0">{testimonial.name}</h6>
                    <p className="mb-0" style={{ fontSize: "12px", color: "#94a3b8" }}>{testimonial.company}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Testimonial;
