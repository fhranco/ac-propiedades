import CallToActions from "@/components/common/CallToActions";
import DefaultHeader from "@/components/common/DefaultHeader";
import Footer from "@/components/common/default-footer";
import MobileMenu from "@/components/common/mobile-menu";

export const metadata = {
  title: "Contacto | AC Propiedades Magallanes",
};

const Contact = () => {
  return (
    <>
      {/* Main Header Nav */}
      <DefaultHeader />
      {/* End Main Header Nav */}

      {/* Mobile Nav  */}
      <MobileMenu />
      {/* End Mobile Nav  */}

      {/* Hero Banner for Contact */}
      <section className="inner-banner-style1 text-center" style={{ 
        backgroundImage: "linear-gradient(rgba(29, 41, 63, 0.8), rgba(29, 41, 63, 0.8)), url('/images/atardecer-en-punta-arenas.webp')", 
        backgroundSize: "cover", 
        backgroundPosition: "center", 
        padding: "160px 0 100px 0" 
      }}>
        <div className="container">
          <h2 className="title" style={{ color: "#ffffff", fontWeight: "850", fontSize: "42px", marginBottom: "15px" }}>Contáctanos</h2>
          <p className="text" style={{ color: "rgba(255, 255, 255, 0.9)", fontSize: "18px", maxWidth: "600px", margin: "0 auto" }}>
            Estamos aquí para ayudarte. Déjanos tus datos o escríbenos por WhatsApp y un corredor de propiedades experto se comunicará contigo a la brevedad.
          </p>
        </div>
      </section>
      {/* End Hero Banner */}

      {/* Start Our Contact Form */}
      <section className="pt-5 pb-5" style={{ backgroundColor: "#f9fbfd" }}>
        <div className="container">
          <div className="row d-flex align-items-center justify-content-center">
            
            <div className="col-lg-5 mb-5 mb-lg-0">
              <h2 className="mb30 text-capitalize" style={{ color: "#1d293f", fontWeight: "800", fontSize: "36px" }}>
                Nos encantaría <br className="d-none d-lg-block" />
                escucharte.
              </h2>
              <p className="text mb40" style={{ color: "#5f718a", fontSize: "16px", lineHeight: "1.8" }}>
                Ya sea que busques comprar tu primera casa, invertir en un terreno en la Patagonia, o necesites asesoría para vender tu propiedad, nuestro equipo de expertos en Magallanes está a tu entera disposición para guiarte paso a paso.
              </p>
              
              <div className="d-flex align-items-center mb20">
                <div className="icon" style={{ width: "50px", height: "50px", borderRadius: "50%", backgroundColor: "rgba(235, 103, 83, 0.1)", display: "flex", alignItems: "center", justifyContent: "center", marginRight: "15px" }}>
                  <i className="fal fa-envelope" style={{ color: "#eb6753", fontSize: "20px" }}></i>
                </div>
                <div>
                  <h6 className="mb-0" style={{ color: "#1d293f", fontWeight: "700" }}>Correo Electrónico</h6>
                  <p className="mb-0" style={{ color: "#5f718a" }}>contacto@acpropiedadesmagallanes.cl</p>
                </div>
              </div>
              
              <div className="d-flex align-items-center">
                <div className="icon" style={{ width: "50px", height: "50px", borderRadius: "50%", backgroundColor: "rgba(235, 103, 83, 0.1)", display: "flex", alignItems: "center", justifyContent: "center", marginRight: "15px" }}>
                  <i className="fal fa-phone-alt" style={{ color: "#eb6753", fontSize: "20px" }}></i>
                </div>
                <div>
                  <h6 className="mb-0" style={{ color: "#1d293f", fontWeight: "700" }}>Teléfono Directo</h6>
                  <p className="mb-0" style={{ color: "#5f718a" }}>+56 9 8415 2100</p>
                </div>
              </div>
            </div>
            {/* End .col */}

            <div className="col-lg-6 offset-lg-1 position-relative">
              <div className="home8-contact-form default-box-shadow1 bdrs12 p40 bgc-white" style={{ border: "1px solid #eaeaea" }}>
                <h4 className="form-title mb25" style={{ color: "#1d293f", fontWeight: "700" }}>
                  Envíanos un Mensaje
                </h4>
                <div className="row">
                  <div className="col-md-6">
                    <div className="mb20">
                      <label className="heading-color ff-heading fw600 mb10">Nombre</label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Tu nombre"
                        required
                        style={{ padding: "15px", borderRadius: "8px", backgroundColor: "#f9f9f9", border: "1px solid #e1e1e1" }}
                      />
                    </div>
                  </div>
                  {/* End .col-md-6 */}

                  <div className="col-md-6">
                    <div className="mb20">
                      <label className="heading-color ff-heading fw600 mb10">Apellido</label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Tu apellido"
                        required
                        style={{ padding: "15px", borderRadius: "8px", backgroundColor: "#f9f9f9", border: "1px solid #e1e1e1" }}
                      />
                    </div>
                  </div>
                  {/* End .col-md-6 */}

                  <div className="col-md-12">
                    <div className="mb20">
                      <label className="heading-color ff-heading fw600 mb10">Correo electrónico</label>
                      <input
                        type="email"
                        className="form-control"
                        placeholder="tu@correo.com"
                        required
                        style={{ padding: "15px", borderRadius: "8px", backgroundColor: "#f9f9f9", border: "1px solid #e1e1e1" }}
                      />
                    </div>
                  </div>
                  {/* End .col-md-12 */}

                  <div className="col-md-12">
                    <div className="mb10">
                      <label className="heading-color ff-heading fw600 mb10">Mensaje</label>
                      <textarea
                        cols={30}
                        rows={5}
                        placeholder="¿En qué podemos ayudarte?"
                        required
                        style={{ padding: "15px", borderRadius: "8px", backgroundColor: "#f9f9f9", border: "1px solid #e1e1e1", width: "100%" }}
                      />
                    </div>
                  </div>
                  {/* End .col-md-12 */}

                  <div className="col-md-12 mt-3">
                    <div className="d-grid">
                      <button type="submit" className="ud-btn btn-thm" style={{ padding: "15px", borderRadius: "8px", fontWeight: "700", fontSize: "16px" }}>
                        Enviar mensaje
                        <i className="fal fa-arrow-right-long" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* End .col */}
          </div>
        </div>
      </section>
      {/* End Our Contact Form */}

      {/* Our CTA */}
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

export default Contact;
