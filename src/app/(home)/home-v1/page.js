import Explore from "@/components/common/Explore";
import Footer from "@/components/common/default-footer";
import MobileMenu from "@/components/common/mobile-menu";
import About from "@/components/home/home-v1/About";
import ApartmentType from "@/components/home/home-v1/ApartmentType";
import CallToActions from "@/components/common/CallToActions";
import FeaturedListings from "@/components/home/home-v1/FeatuerdListings";
import Header from "@/components/home/home-v1/Header";
import Partner from "@/components/common/Partner";
import PopularListings from "@/components/home/home-v1/PopularListings";
import PropertiesByCities from "@/components/home/home-v1/PropertiesByCities";
import Testimonial from "@/components/home/home-v1/Testimonial";
import Hero from "@/components/home/home-v1/hero";
import Image from "next/image";
import Blog from "@/components/common/Blog";
import BlogSlider from "@/components/home/home-v1/BlogSlider";
import PopulerProperty from "@/components/home/home-v1/PopulerProperty";
import SellWithUs from "@/components/home/home-v1/SellWithUs";
import SellerGuide from "@/components/home/home-v1/SellerGuide";
import Link from "next/link";

export const metadata = {
  title: "Inicio | AC Propiedades Magallanes",
};

const Home_V1 = () => {
  return (
    <>
      {/* Main Header Nav */}
      <Header />
      {/* End Main Header Nav */}

      {/* Mobile Nav  */}
      <MobileMenu />
      {/* End Mobile Nav  */}

      {/* Home Banner Style V1 */}
      <section className="home-banner-style1 p0" style={{ position: "relative", overflow: "hidden" }}>
        
        {/* Background Image (Optimized instead of heavy video) */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundImage: "url('/images/atardecer-en-punta-arenas.webp')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            zIndex: 0,
          }}
        />

        {/* Overlay para oscurecer el video y que resalte el texto */}
        <div 
          style={{ 
            position: "absolute", 
            top: 0, 
            left: 0, 
            width: "100%", 
            height: "100%", 
            backgroundColor: "rgba(29, 41, 63, 0.5)", 
            zIndex: 1 
          }} 
        />

        <div className="home-style1" style={{ background: "none", position: "relative", zIndex: 2 }}>
          <div className="container">
            <div className="row">
              <div className="col-xl-11 mx-auto">
                <Hero />
              </div>
            </div>
          </div>
          {/* End .container */}

          <a href="#explore-property">
            <div className="mouse_scroll animate-up-4">
              <Image
                width={20}
                height={105}
                src="/images/about/home-scroll.png"
                alt="scroll image"
              />
            </div>
          </a>
        </div>
      </section>
      {/* End Home Banner Style V1 */}

      {/* Explore Apartment */}
      <section id="explore-property" className="pb90 pb30-md" style={{ background: "#ffffff", color: "#1e293b", padding: "60px 0" }}>
        <div className="container">
          <div className="row  justify-content-between align-items-center">
            <div className="col-auto">
              <div
                className="main-title"
                data-aos="fade-up"
                data-aos-delay="300"
              >
                <h2 className="title" style={{ color: "#1d293f", fontWeight: "850" }}>Explora por Tipo de Propiedad</h2>
                <p className="paragraph" style={{ color: "#5f718a" }}>
                  Encuentra el hogar o espacio ideal en la Patagonia
                </p>
              </div>
            </div>
            {/* End header */}


            {/* End .col for navigation and pagination */}
          </div>
          {/* End .row */}

          <div className="row">
            <div className="col-lg-12">
              <div
                className="w-100"
                data-aos="fade-up"
                data-aos-delay="300"
              >
                <ApartmentType />
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* End Explore Apartment */}

      {/* Explore Apartment (Descubre cómo te ayudamos) */}
      <section 
        className="" 
        style={{ 
          background: "linear-gradient(135deg, #eb6753 0%, #e0533e 100%)", 
          padding: "100px 0 120px 0",
          position: "relative",
          zIndex: "2"
        }}
      >
        {/* SVG Curva Superior */}
        <div style={{ position: "absolute", top: "0", left: "0", width: "100%", overflow: "hidden", lineHeight: "0" }}>
          <svg viewBox="0 0 1200 120" preserveAspectRatio="none" style={{ position: "relative", display: "block", width: "calc(100% + 1.3px)", height: "40px", transform: "rotate(180deg)" }}>
            <path d="M0,0V120H1200V0C900,90,300,90,0,0Z" fill="#ffffff"></path>
          </svg>
        </div>

        <div className="container" style={{ position: "relative", zIndex: "3" }}>
          <div className="row">
            <div
              className="col-lg-6 m-auto"
              data-aos="fade-up"
              data-aos-delay="300"
            >
              <div className="main-title text-center mb50">
                <h2 className="title" style={{ color: "#ffffff", fontWeight: "850" }}>Descubre cómo te ayudamos</h2>
                <p className="paragraph" style={{ color: "rgba(255, 255, 255, 0.9)" }}>
                  Te acompañamos en todo el proceso de compra o venta
                </p>
              </div>
            </div>
          </div>
          {/* End .row */}

          <div className="row">
            <Explore />
          </div>
        </div>

        {/* SVG Curva Inferior */}
        <div style={{ position: "absolute", bottom: "0", left: "0", width: "100%", overflow: "hidden", lineHeight: "0" }}>
          <svg viewBox="0 0 1200 120" preserveAspectRatio="none" style={{ position: "relative", display: "block", width: "calc(100% + 1.3px)", height: "40px" }}>
            <path d="M0,0V120H1200V0C900,90,300,90,0,0Z" fill="#ffffff"></path>
          </svg>
        </div>
      </section>
      {/* End Explore Apartment */}

      {/* Featured Listings */}
      <section className="bgc-f7" style={{ background: "#ffffff", color: "#1d293f", padding: "80px 0" }}>
        <div className="container">
          <div className="row align-items-center" data-aos="fade-up">
            <div className="col-lg-12">
              <div className="main-title2 text-center text-lg-start">
                <h2 className="title" style={{ color: "#1d293f", fontWeight: "850" }}>Propiedades Destacadas</h2>
                <p className="paragraph" style={{ color: "#5f718a" }}>
                  Explora nuestra selección de propiedades exclusivas en Magallanes
                </p>
              </div>
            </div>
          </div>
          {/* End header */}

          <div className="row">
            <div className="col-lg-12" data-aos="fade-up" data-aos-delay="200">
              <div className="feature-listing-slider">
                <FeaturedListings />
              </div>
            </div>
          </div>

          <div className="row mt-4" data-aos="fade-up" data-aos-delay="300">
            <div className="col-lg-12 text-center">
              <Link className="ud-btn btn-thm" href="/propiedades" style={{ borderRadius: "8px", fontWeight: "600", padding: "12px 30px" }}>
                Ver Todas las Propiedades
                <i className="fal fa-arrow-right-long" />
              </Link>
            </div>
          </div>
        </div>
      </section>
      {/* End Featured Listings */}

      {/* About Us (moved) */}
      <section className="pb40 pt40" style={{ background: "#1d293f", color: "#ffffff", padding: "40px 0 20px 0", position: "relative", overflow: "hidden" }}>
        
        {/* CSS para rotación responsive en móvil */}
        <style dangerouslySetInnerHTML={{__html: `
          @media (max-width: 991.98px) {
            .mob-watermark-left {
              position: relative !important;
              left: 0 !important;
              top: 0 !important;
              transform: none !important;
              writing-mode: horizontal-tb !important;
              font-size: 32px !important;
              font-weight: 850 !important;
              text-align: left !important;
              margin-bottom: 20px !important;
              color: #ffffff !important;
              letter-spacing: 2px !important;
              padding-left: 0 !important;
            }
            .mob-watermark-right {
              display: none !important;
            }
            .about-container-wrapper {
              padding-left: 15px !important;
            }
          }
        `}} />

        {/* CSS para responsive */}
        <style dangerouslySetInnerHTML={{__html: `
          .vertical-text-comprar {
            writing-mode: vertical-lr;
            transform: rotate(180deg);
            color: #ffffff;
            font-size: 85px;
            font-weight: 900;
            letter-spacing: 6px;
            text-align: center;
            line-height: 1;
            margin: 0 auto;
            display: flex;
            align-items: center;
            justify-content: center;
            height: 100%;
            user-select: none;
            pointer-events: none;
          }
          @media (max-width: 991.98px) {
            .vertical-text-comprar {
              display: none !important;
            }
          }
        `}} />

        <div className="container" style={{ position: "relative", zIndex: "2" }}>
          <div className="row align-items-center">
            {/* Columna del Título COMPRAR (Oculta en móviles, 2 col en desktop) */}
            <div className="col-lg-2 d-none d-lg-block">
              <div className="vertical-text-comprar">
                COMPRAR
              </div>
            </div>
            {/* Columna del Contenido Completo (col-12 en móviles, col-lg-10 en desktop) */}
            <div className="col-lg-10 col-12">
              <About />
            </div>
          </div>
        </div>
      </section>
      {/*  <!-- End About Us --> */}

      {/* Guia del Vendedor (Pasos y Errores) Section */}
      <SellerGuide />

      {/* Popular Property */}
      <PopulerProperty />
      {/* End  Popular Property */}

      {/* Formulario Vende con Nosotros / Tasacion al Final */}
      <SellWithUs />



      {/* Explore Blog */}
      <section className="pb90 pb20-md">
        <div className="container">
          <div className="row">
            <div className="col-lg-6 m-auto" data-aos="fade-up">
              <div className="main-title text-start text-md-center">
                <h2 className="title">De nuestro Blog de Noticias</h2>
                <p className="paragraph">
                  Mantente al día con las novedades del mercado inmobiliario en la región
                </p>
              </div>
            </div>
          </div>
          {/* End .row */}

          <div className="row" data-aos="fade-up" data-aos-delay="300">
            <div className="col-lg-12">
              <BlogSlider />
            </div>
          </div>
          {/* End .row */}
        </div>
      </section>
      {/* Explore Blog */}



      {/* Our Testimonials (Moved to bottom) */}
      <section className="pb100 pb50-md bgc-thm-light" style={{ background: "#ffffff", color: "#1d293f", padding: "80px 0", overflow: "hidden" }}>
        <div className="container-fluid">
          <div className="row justify-content-center text-center mb50">
            <div className="col-lg-6">
              <div
                className="main-title"
                data-aos="fade-up"
                data-aos-delay="300"
              >
                <h2 className="title" style={{ color: "#1d293f", fontWeight: "850" }}>Lo que Dicen Nuestros Clientes</h2>
                <p className="paragraph">
                  La confianza y satisfacción de quienes nos eligen es nuestra mayor prioridad
                </p>
              </div>
            </div>
          </div>
          {/* End .row */}

          <div className="row">
            <div className="col-lg-12">
              <div
                className="testimonial-slider"
                data-aos="fade-up"
                data-aos-delay="300"
              >
                <Testimonial />
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* End Our Testimonials */}

      {/* Our CTA (Naranja con curvas al final sobre el footer) */}
      <CallToActions />
      {/* Our CTA */}

      {/* Start Our Footer */}
      <section className="footer-style1 pt60 pb-0" style={{ background: "#1d293f" }}>
        <Footer />
      </section>
      {/* End Our Footer */}
    </>
  );
};

export default Home_V1;
