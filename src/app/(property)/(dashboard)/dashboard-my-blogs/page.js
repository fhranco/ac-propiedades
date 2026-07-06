"use client";
import DashboardHeader from "@/components/common/DashboardHeader";
import MobileMenu from "@/components/common/mobile-menu";
import DboardMobileNavigation from "@/components/property/dashboard/DboardMobileNavigation";
import Footer from "@/components/property/dashboard/Footer";
import SidebarDashboard from "@/components/property/dashboard/SidebarDashboard";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import Link from "next/link";

export default function DashboardMyBlogs() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchBlogs = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("blogs")
      .select("*")
      .order("created_at", { ascending: false });

    if (!error && data) {
      setBlogs(data);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm("¿Estás seguro de eliminar esta noticia?")) {
      await supabase.from("blogs").delete().eq("id", id);
      fetchBlogs();
    }
  };

  return (
    <>
      <DashboardHeader />
      <MobileMenu />

      <div className="dashboard_content_wrapper">
        <div className="dashboard dashboard_wrapper pr30 pr0-xl">
          <SidebarDashboard />

          <div className="dashboard__main pl0-md">
            <div className="dashboard__content bgc-f7">
              <div className="row pb40">
                <div className="col-lg-12">
                  <DboardMobileNavigation />
                </div>
              </div>

              <div className="row align-items-center pb40">
                <div className="col-lg-12">
                  <div className="dashboard_title_area">
                    <h2>Mis Noticias</h2>
                    <p className="text">Administra los artículos de tu blog.</p>
                  </div>
                </div>
              </div>

              <div className="row">
                <div className="col-xl-12">
                  <div className="ps-widget bgc-white bdrs12 default-box-shadow2 p30 mb30 overflow-hidden position-relative">
                    <div className="packages_table table-responsive">
                      <table className="table-style3 table at-savesearch">
                        <thead className="t-head">
                          <tr>
                            <th scope="col">Título</th>
                            <th scope="col">Categoría</th>
                            <th scope="col">Fecha</th>
                            <th scope="col">Acciones</th>
                          </tr>
                        </thead>
                        <tbody className="t-body">
                          {loading ? (
                            <tr><td colSpan="4">Cargando...</td></tr>
                          ) : blogs.length === 0 ? (
                            <tr><td colSpan="4">No tienes noticias publicadas.</td></tr>
                          ) : (
                            blogs.map((blog) => (
                              <tr key={blog.id}>
                                <td>
                                  <Link href={`/noticias/${blog.id}`} target="_blank">
                                    {blog.title}
                                  </Link>
                                </td>
                                <td>{blog.category || "-"}</td>
                                <td>{new Date(blog.created_at).toLocaleDateString()}</td>
                                <td>
                                  <div className="d-flex">
                                    <Link
                                      href={`/dashboard-add-blog?edit=${blog.id}`}
                                      className="icon mr10"
                                      style={{ border: "none", background: "none", color: "#1d293f", cursor: "pointer", marginRight: "10px" }}
                                      title="Editar"
                                    >
                                      <span className="fas fa-pen" />
                                    </Link>
                                    <button
                                      className="icon"
                                      style={{ border: "none", background: "none", color: "red", cursor: "pointer" }}
                                      onClick={() => handleDelete(blog.id)}
                                      title="Eliminar"
                                    >
                                      <span className="flaticon-bin" />
                                    </button>
                                  </div>
                                </td>
                              </tr>
                            ))
                          )}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <Footer />
          </div>
        </div>
      </div>
    </>
  );
}
