import DefaultHeader from "@/components/common/DefaultHeader";
import Footer from "@/components/common/default-footer";
import MobileMenu from "@/components/common/mobile-menu";
import Image from "next/image";
import { supabase } from "@/lib/supabase";

export async function generateMetadata({ params }) {
  const { id } = params;

  // Fetch from supabase
  const { data: blog, error } = await supabase
    .from("blogs")
    .select("*")
    .eq("id", id)
    .single();

  if (error || !blog) {
    return {
      title: "Noticia no encontrada | AC Propiedades",
    };
  }

  return {
    title: blog.seo_title || blog.title,
    description: blog.seo_description,
    keywords: blog.seo_keywords,
    openGraph: {
      title: blog.seo_title || blog.title,
      description: blog.seo_description,
      images: [blog.image || "/images/blog/blog-single-1.jpg"],
    },
  };
}

const BlogSingle = async ({ params }) => {
  const { data: blog, error } = await supabase
    .from("blogs")
    .select("*")
    .eq("id", params.id)
    .single();

  if (error || !blog) {
    return <div>Noticia no encontrada.</div>;
  }

  const date = new Date(blog.created_at);
  const formattedDate = `${date.getDate()} de ${date.toLocaleString('es-ES', { month: 'long' })}, ${date.getFullYear()}`;

  return (
    <>
      <DefaultHeader />
      <MobileMenu />

      <section className="our-blog pt50">
        <div className="container">
          <div className="row" data-aos="fade-up" data-aos-delay="100">
            <div className="col-lg-12">
              <h2 className="blog-title">{blog.title}</h2>
              <div className="blog-single-meta">
                <div className="post-author d-sm-flex align-items-center">
                  <span className="text">{formattedDate}</span>
                  {blog.category && <span className="text ml15"> / {blog.category}</span>}
                </div>
              </div>
            </div>
          </div>
        </div>

        {blog.image && (
          <div className="mx-auto maxw1600 mt60" data-aos="fade-up" data-aos-delay="300">
            <div className="row">
              <div className="col-lg-12">
                <div className="large-thumb">
                  <Image
                    width={1200}
                    height={600}
                    priority
                    className="w-100 h-100 cover"
                    style={{ maxHeight: "600px", objectFit: "cover" }}
                    src={blog.image}
                    alt={blog.title}
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="container">
          <div className="roww" data-aos="fade-up" data-aos-delay="500">
            <div className="col-xl-8 offset-xl-2">
              <div 
                className="ui-content mt40 mb60"
                dangerouslySetInnerHTML={{ __html: blog.content }}
              />
            </div>
          </div>
        </div>
      </section>

      <section className="footer-style1 pt60 pb-0">
        <Footer />
      </section>
    </>
  );
};

export default BlogSingle;
