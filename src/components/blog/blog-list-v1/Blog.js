"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { supabase } from "@/lib/supabase";

const Blog = () => {
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
      {blogs.map((item) => {
        const date = new Date(item.created_at);
        const monthNames = ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"];
        
        return (
          <div className="blog-style1 large-size bgc-white" key={item.id}>
            {item.image && (
              <div className="blog-img">
                <Image
                  width={796}
                  height={465}
                  priority
                  className="w-100 h-100 cover"
                  src={item.image}
                  alt={item.title}
                />
              </div>
            )}
            <div className="blog-content pl30 pb20">
              <div className="date">
                <span className="month">{monthNames[date.getMonth()]}</span>
                <span className="day">{date.getDate()}</span>
              </div>
              {item.category && (
                <a className="tag" href="#">
                  {item.category}
                </a>
              )}
              <h4 className="title mt-1 mb20">
                <Link href={`/noticias/${item.id}`}>{item.title}</Link>
              </h4>
              <p className="text">
                {item.seo_description || "Haz clic para leer más sobre esta noticia..."}
              </p>
            </div>
          </div>
        );
      })}
    </>
  );
};

export default Blog;
