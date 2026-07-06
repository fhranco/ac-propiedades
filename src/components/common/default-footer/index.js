import Image from "next/image";
import Link from "next/link";
import ContactMeta from "./ContactMeta";
import AppWidget from "./AppWidget";
import Social from "./Social";
import MenuWidget from "./MenuWidget";
import Copyright from "./Copyright";

const Footer = () => {
  return (
    <>
      <div className="container">
        {/* Cabecera del Footer: Logo y Redes Sociales */}
        <div className="row align-items-center mb-5 border-bottom border-light pb-4" style={{ borderColor: 'rgba(255,255,255,0.1) !important' }}>
          <div className="col-md-6 text-center text-md-start">
            <Link className="footer-logo" href="/">
              <Image style={{ objectFit: "contain" }}
                width={250}
                height={250}
                src="/images/Logo.png"
                alt="AC Propiedades Magallanes"
              />
            </Link>
          </div>
          <div className="col-md-6 text-center text-md-end mt-4 mt-md-0">
            <div className="social-widget">
              <h6 className="text-white mb20">Síguenos en redes sociales</h6>
              <Social />
            </div>
          </div>
        </div>

        {/* Contenido principal del Footer */}
        <div className="row">
          <div className="col-lg-4">
            <div className="footer-widget mb-4 mb-lg-5">
              <ContactMeta />
              <div className="mt-4">
                <AppWidget />
              </div>
            </div>
          </div>
          {/* End .col-lg-4 */}

          <div className="col-lg-8">
            <div className="footer-widget mb-4 mb-lg-5">
              <div className="row justify-content-between">
                <MenuWidget />
              </div>
            </div>
          </div>
        </div>
        {/* End .row */}
      </div>
      {/* End .container */}

      <Copyright />
      {/* End copyright */}
    </>
  );
};

export default Footer;
