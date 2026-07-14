import CallToActions from "@/components/common/CallToActions";
import DefaultHeader from "@/components/common/DefaultHeader";
import Footer from "@/components/common/default-footer";
import MobileMenu from "@/components/common/mobile-menu";
import Link from "next/link";

export const metadata = {
  title: "Nuestros Servicios | AC Propiedades Magallanes",
};

const Services = () => {
  return (
    <>
      {/* Main Header Nav */}
      <DefaultHeader />
      
      {/* Mobile Nav */}
      <MobileMenu />
      
      {/* Custom Hero Banner */}
      <section className="p-0 position-relative" style={{ height: "400px" }}>
        <div 
          className="position-absolute w-100 h-100" 
          style={{ 
            backgroundImage: "linear-gradient(rgba(29, 41, 63, 0.8), rgba(29, 41, 63, 0.9)), url('/images/herro%20servicios.webp')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundAttachment: "fixed",
            zIndex: 0
          }} 
        />
        <div className="container position-relative h-100" style={{ zIndex: 1 }}>
          <div className="row h-100 align-items-center">
            <div className="col-lg-12 text-center mt-5">
              <h2 className="text-white mb-3" style={{ fontSize: "56px", fontWeight: "600" }}>Nuestros Servicios</h2>
              <p className="text-white mb-0" style={{ fontSize: "18px", opacity: 0.9 }}>
                Comprar, vender o invertir en Magallanes nunca fue tan seguro
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Buying Section */}
      <section className="pt90 pb90">
        <div className="container">
          <div className="row align-items-center" data-aos="fade-up">
            <div className="col-lg-5">
              <h2 className="mb30">¿Buscas Comprar o Invertir?</h2>
              <p className="text mb40">
                Adquirir una propiedad o un terreno rural en la Patagonia es una decisión importante. Te acompañamos desde el primer contacto hasta que tienes las llaves (o las escrituras) en tus manos.
              </p>
              
              <div className="list-one mb30 d-flex align-items-start">
                <span className="list-icon flex-shrink-0 flaticon-search mb20 me-4" style={{ fontSize: "40px", color: "#eb6753" }} />
                <div className="list-content flex-grow-1">
                  <h5 className="mb-1">1. Búsqueda y Selección</h5>
                  <p className="text mb-0">Analizamos tus necesidades y te presentamos las opciones que realmente se ajustan a lo que buscas, sin hacerte perder el tiempo.</p>
                </div>
              </div>
                        <div className="list-one mb30 d-flex align-items-start">
                <span className="list-icon flex-shrink-0 flaticon-secure-payment mb20 me-4" style={{ fontSize: "40px", color: "#eb6753" }} />
                <div className="list-content flex-grow-1">
                  <h5 className="mb-1">2. Recopilación de Antecedentes y Documentación</h5>
                  <p className="text mb-0">Coordinamos visitas y nos aseguramos de que toda la documentación esté impecable antes de cualquier compromiso.</p>
                </div>
              </div>

              <div className="list-one d-flex align-items-start">
                <span className="list-icon flex-shrink-0 flaticon-house-key mb20 me-4" style={{ fontSize: "40px", color: "#eb6753" }} />
                <div className="list-content flex-grow-1">
                  <h5 className="mb-1">3. Cierre y Escrituración</h5>
                  <p className="text mb-0">Gestionamos el proceso de promesa de compraventa, notaría y conservador de bienes raíces para que el proceso fluya sin fricciones.</p>
                </div>
              </div>

            </div>
            
            <div className="col-lg-6 offset-lg-1 mt-5 mt-lg-0">
               <div className="position-relative bdrs24 overflow-hidden" style={{ height: "600px" }}>
                  <img src="/images/celebraci%C3%B3n%20frente%20a%20la%20nueva%20casa.webp" alt="Celebración frente a la nueva casa" className="w-100 h-100 object-fit-cover" style={{ objectFit: 'cover' }} />
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* Selling Section */}
      <section className="bgc-thm-light pt90 pb90">
        <div className="container">
          <div className="row align-items-center" data-aos="fade-up">
            <div className="col-lg-6 order-2 order-lg-1 mt-5 mt-lg-0">
               <div className="position-relative bdrs24 overflow-hidden" style={{ height: "600px" }}>
                  <img src="/images/entrega%20de%20llave%20en%20el%20campo.webp" alt="Familia cerrando trato de venta" className="w-100 h-100 object-fit-cover" style={{ objectFit: 'cover' }} />
               </div>
            </div>
            
            <div className="col-lg-5 offset-lg-1 order-1 order-lg-2">
              <h2 className="mb30">¿Quieres Vender tu Propiedad?</h2>
              <p className="text mb40">
                Sabemos el valor que tiene tu patrimonio. Diseñamos una estrategia comercial para vender tu propiedad en el menor tiempo posible y al mejor precio de mercado.
              </p>
              
              <div className="list-one mb30 d-flex align-items-start">
                <span className="list-icon flex-shrink-0 flaticon-images mb20 me-4" style={{ fontSize: "40px", color: "#eb6753" }} />
                <div className="list-content flex-grow-1">
                  <h5 className="mb-1">1. Marketing y Posicionamiento</h5>
                  <p className="text mb-0">Producimos material visual atractivo y publicamos tu propiedad en todos nuestros canales digitales y portales de alta exposición.</p>
                </div>
              </div>

              <div className="list-one d-flex align-items-start">
                <span className="list-icon flex-shrink-0 flaticon-user mb20 me-4" style={{ fontSize: "40px", color: "#eb6753" }} />
                <div className="list-content flex-grow-1">
                  <h5 className="mb-1">2. Gestión de Interesados y Cierre</h5>
                  <p className="text mb-0">Filtramos a los clientes reales, agendamos visitas guiadas y negociamos las mejores condiciones para ti hasta el cierre notarial.</p>
                </div>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* Commitment Section */}
      <section className="pt90 pb90">
        <div className="container text-center" data-aos="fade-up">
          <h2 className="mb20">Nuestro Compromiso</h2>
          <p className="text mb50 mx-auto" style={{ maxWidth: "800px" }}>
            No buscamos transacciones de una sola vez. Nuestro objetivo es ser tu corredor de propiedades de confianza para toda la vida en la Región de Magallanes. Garantizamos total transparencia, ética profesional y un nivel de comunicación donde siempre sabrás en qué etapa está tu proceso.
          </p>
          <Link href="/contacto" className="ud-btn btn-thm">
            Conversemos sobre tu proyecto <i className="fal fa-arrow-right-long" />
          </Link>
        </div>
      </section>

      {/* Our CTA */}
      <CallToActions />
      
      {/* Footer */}
      <section className="footer-style1 pt60 pb-0" style={{ background: "#1d293f" }}>
        <Footer />
      </section>
    </>
  );
};

export default Services;
