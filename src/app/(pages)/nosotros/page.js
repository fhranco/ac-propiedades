import CallToActions from "@/components/common/CallToActions";
import DefaultHeader from "@/components/common/DefaultHeader";
import Partner from "@/components/common/Partner";
import Footer from "@/components/common/default-footer";
import MobileMenu from "@/components/common/mobile-menu";
import FunFact from "@/components/pages/about/FunFact";
import Mission from "@/components/pages/about/Mission";
import ApartmentType from "@/components/home/home-v1/ApartmentType";
import PopulerProperty from "@/components/home/home-v1/PopulerProperty";

export const metadata = {
  title: "Sobre Nosotros | AC Propiedades Magallanes",
};

const About = () => {
  return (
    <>
      {/* Main Header Nav */}
      <DefaultHeader />
      {/* End Main Header Nav */}

      {/* Mobile Nav  */}
      <MobileMenu />
      {/* End Mobile Nav  */}

      {/* Custom Hero Banner for About Us */}
      <section className="p-0 position-relative" style={{ height: "450px" }}>
        <div 
          className="position-absolute w-100 h-100" 
          style={{ 
            backgroundImage: "linear-gradient(rgba(29, 41, 63, 0.7), rgba(29, 41, 63, 0.8)), url('/images/atardecer-en-punta-arenas.webp')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundAttachment: "fixed",
            zIndex: 0
          }} 
        />
        <div className="container position-relative h-100" style={{ zIndex: 1 }}>
          <div className="row h-100 align-items-center">
            <div className="col-lg-12 text-center mt-5">
              <h2 className="text-white mb-3" style={{ fontSize: "56px", fontWeight: "600" }}>Sobre Nosotros</h2>
              <div className="breadcumb-list text-white">
                <a href="/" className="text-white" style={{ opacity: 0.8 }}>Inicio</a>
                <span className="text-white mx-2" style={{ opacity: 0.8 }}>/</span>
                <span className="text-white">Sobre nosotros</span>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* End Custom Hero Banner */}

      {/* Our About Area */}
      <section className="our-about pb90">
        <div className="container">
          <div className="row" data-aos="fade-up" data-aos-delay="300">
            <div className="col-lg-6">
              <h2 className="mb30">
                ¿Quiénes Somos?
              </h2>
              <p className="text mb25">
                <strong>AC Propiedades Magallanes</strong> nació con un propósito claro: transformar y profesionalizar la visión del sector inmobiliario en el fin del mundo. Somos una agencia local, profundamente arraigada en la Región de Magallanes y de la Antártica Chilena, especializada tanto en la venta y arriendo de propiedades como en el desarrollo e inversión de tierras rurales en la Patagonia.
              </p>
              <p className="text mb55">
                Nuestra misión es guiarte de manera honesta, ágil y transparente en cada paso de tu camino inmobiliario. Conectamos a las personas con las propiedades correctas, ofreciendo un servicio seguro y enfocado en la satisfacción total.
              </p>
            </div>
            <div className="col-lg-6">
              <h2 className="mb30">
                Nuestra Especialidad
              </h2>
              <p className="text mb25">
                Aunque cubrimos todas las necesidades habitacionales y comerciales, nuestro gran valor diferencial es la <strong>Inversión Tierra y Rural</strong>. Contamos con una selección exclusiva de lotes y terrenos en la Patagonia con alto potencial de plusvalía y listos para escriturar.
              </p>
              <div className="row mt40">
                <Mission />
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* End Our About Area */}

      {/* Explore Apartment Types from Home */}
      <section className="pb90 pb30-md pt-0">
        <div className="container">
          <div className="row" data-aos="fade-up" data-aos-delay="0">
            <div className="col-lg-6 mx-auto">
              <div className="main-title2 text-center">
                <h2 className="title">Explora por tipo de propiedad</h2>
                <p className="paragraph">
                  Encuentra el lugar ideal para ti, desde parcelas en la Patagonia hasta casas en la ciudad.
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="container-fluid" data-aos="fade-up" data-aos-delay="300">
          <div className="row">
            <div className="col-lg-12">
              <div className="explore-apartment-slider">
                <ApartmentType />
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* End Explore Apartment Types */}

      {/* Featured Properties (Parcelas) from Home */}
      <section className="bg-dark pt-0 pb-0">
        {/* Usamos el mismo diseño impactante de la Home con el video de parcelas de fondo */}
        <div className="row">
          <PopulerProperty />
        </div>
      </section>
      {/* End Featured Properties */}

      {/* Funfact */}
      <section className="pt90 pb90">
        <div className="container">
          <div
            className="row justify-content-center"
            data-aos="fade-up"
            data-aos-delay="300"
          >
            <FunFact />
          </div>
        </div>
      </section>
      {/* End Funfact */}

      {/* Our Partners */}
      <section className="our-partners pt-0">
        <div className="container">
          <div className="row">
            <div className="col-lg-12" data-aos="fade-up">
              <div className="main-title text-center">
                <h6>Nuestros aliados y empresas colaboradoras</h6>
              </div>
            </div>
            <div className="col-lg-12 text-center">
              <div
                className="dots_none nav_none"
                data-aos="fade-up"
                data-aos-delay="300"
              >
                <Partner />
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* End Our Partners */}

      {/* Our CTA */}
      <CallToActions />
      {/* Our CTA */}

      {/* Start Our Footer */}
      <section className="footer-style1 pt60 pb-0">
        <Footer />
      </section>
      {/* End Our Footer */}
    </>
  );
};

export default About;
