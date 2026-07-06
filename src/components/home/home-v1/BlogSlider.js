"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper";
import { supabase } from "@/lib/supabase";
import "swiper/swiper-bundle.min.css";

const BlogSlider = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlogs = async () => {
      const { data, error } = await supabase
        .from("blogs")
        .select("*")
        .eq("status", "published")
        .order("created_at", { ascending: false });

      if (error) {
        console.error("Error fetching blogs:", error);
      } else {
        setBlogs(data || []);
      }
      setLoading(false);
    };

    fetchBlogs();
  }, []);

  if (loading) {
    return <div>Cargando noticias...</div>;
  }

  if (blogs.length === 0) {
    return <div>No hay noticias publicadas aún.</div>;
  }

  return (
    <>
      <style dangerouslySetInnerHTML={{__html: `
        .blog-style1 {
          background-color: #fff;
          border-radius: 12px;
          overflow: hidden;
          box-shadow: 0px 10px 30px 0px rgba(29, 41, 63, 0.05);
          margin-bottom: 15px;
          transition: all 0.3s ease;
          height: 100%;
          display: flex;
          flex-direction: column;
        }
        .blog-style1:hover {
          transform: translateY(-5px);
          box-shadow: 0px 15px 35px 0px rgba(29, 41, 63, 0.08);
        }
        .blog-slider-pagination {
          display: flex;
          justify-content: center;
          gap: 8px;
          margin-top: 30px;
        }
        .blog-slider-pagination .swiper-pagination-bullet {
          width: 10px;
          height: 10px;
          background: #d9d9d9;
          opacity: 1;
          margin: 0 !important;
          transition: all 0.3s ease;
        }
        .blog-slider-pagination .swiper-pagination-bullet-active {
          background: #eb6753;
          width: 25px;
          border-radius: 10px;
        }
        .swiper-slide {
          height: auto; /* Makes cards equal height */
        }
      `}} />
      
      <Swiper
        spaceBetween={30}
        modules={[Navigation, Pagination, Autoplay]}
        navigation={{
          nextEl: ".blog-slider-next",
          prevEl: ".blog-slider-prev",
        }}
        pagination={{
          el: ".blog-slider-pagination",
          clickable: true,
        }}
        autoplay={{
          delay: 4000,
          disableOnInteraction: false,
          pauseOnMouseEnter: true,
        }}
        loop={true}
        breakpoints={{
          300: {
            slidesPerView: 1,
          },
          768: {
            slidesPerView: 2,
          },
          1024: {
            slidesPerView: 3,
          },
        }}
        className="blog-slider-container"
      >
        {blogs.map((item) => {
          const date = new Date(item.created_at);
          const monthNames = ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"];
          
          return (
            <SwiperSlide key={item.id}>
              <div className="blog-style1 large-size">
                {item.image && (
                  <div className="blog-img" style={{ height: "240px", overflow: "hidden" }}>
                    <Image
                      width={796}
                      height={465}
                      priority
                      className="w-100 h-100 cover"
                      src={item.image}
                      alt={item.title}
                      style={{ objectFit: "cover", transition: "all 0.5s ease" }}
                    />
                  </div>
                )}
                <div className="blog-content pl30 pb20 pt20 pr30" style={{ flexGrow: 1, display: "flex", flexDirection: "column" }}>
                  <div className="date mb10">
                    <span className="month">{monthNames[date.getMonth()]}</span>
                    <span className="day"> {date.getDate()}</span>
                  </div>
                  {item.category && (
                    <a className="tag" href="#" style={{ color: "#eb6753", fontSize: "14px", fontWeight: "600", marginBottom: "10px", display: "inline-block" }}>
                      {item.category}
                    </a>
                  )}
                  <h4 className="title mt-1 mb20" style={{ fontSize: "20px", fontWeight: "700" }}>
                    <Link href={`/noticias/${item.id}`} style={{ color: "#1d293f", textDecoration: "none" }}>
                      {item.title}
                    </Link>
                  </h4>
                  <p className="text" style={{ flexGrow: 1 }}>
                    {item.seo_description || "Haz clic para leer más sobre esta noticia..."}
                  </p>
                </div>
              </div>
            </SwiperSlide>
          );
        })}
      </Swiper>

      <div className="row align-items-center justify-content-center mt-3">
        <div className="col-auto">
          <button className="blog-slider-prev position-relative" style={{ background: "none", border: "1px solid #e9e9e9", width: "40px", height: "40px", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", color: "#1d293f" }}>
            <i className="far fa-arrow-left-long" />
          </button>
        </div>
        <div className="col-auto">
          <div className="blog-slider-pagination" style={{ marginTop: "0" }} />
        </div>
        <div className="col-auto">
          <button className="blog-slider-next position-relative" style={{ background: "none", border: "1px solid #e9e9e9", width: "40px", height: "40px", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", color: "#1d293f" }}>
            <i className="far fa-arrow-right-long" />
          </button>
        </div>
      </div>
    </>
  );
};

export default BlogSlider;
