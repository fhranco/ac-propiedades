import Image from "next/image";
import Link from "next/link";

const Explore = () => {
  const iconboxData = [
    {
      id: 1,
      icon: "/images/icon/property-buy.svg",
      title: "Compra una propiedad",
      text: "Encuentra la casa, departamento o terreno de tus sueños en Magallanes con asesoría experta y acompañamiento continuo.",
      linkText: "Buscar propiedades",
      href: "/propiedades?status=Buy",
      isExternal: false
    },
    {
      id: 2,
      icon: "/images/icon/property-sell.svg",
      title: "Vende tu propiedad",
      text: "Te ayudamos a tasar, promocionar y encontrar el comprador ideal para tu inmueble de forma rápida y segura.",
      linkText: "Vender mi propiedad",
      href: "https://wa.me/56984152100?text=Hola%20AC%20Propiedades%2C%20me%20gustar%C3%ADa%20vender%20mi%20propiedad%20con%20ustedes.",
      isExternal: true
    }
  ];

  return (
    <>
      <style dangerouslySetInnerHTML={{__html: `
        .premium-service-card {
          border: 1px solid #e9e9e9;
          background: #ffffff;
          border-radius: 24px;
          padding: 45px 35px;
          transition: all 0.4s cubic-bezier(0.165, 0.84, 0.44, 1);
          box-shadow: 0 10px 30px rgba(0,0,0,0.02);
          position: relative;
          overflow: hidden;
          z-index: 1;
        }
        .premium-service-card::before {
          content: "";
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: linear-gradient(135deg, rgba(235, 103, 83, 0.04) 0%, rgba(29, 41, 63, 0.02) 100%);
          opacity: 0;
          transition: opacity 0.4s ease;
          z-index: -1;
        }
        .premium-service-card:hover {
          transform: translateY(-8px);
          box-shadow: 0 20px 40px rgba(29, 41, 63, 0.06);
          border-color: rgba(235, 103, 83, 0.3);
        }
        .premium-service-card:hover::before {
          opacity: 1;
        }
        .premium-service-card .icon-wrapper {
          width: 90px;
          height: 90px;
          border-radius: 50%;
          background: rgba(235, 103, 83, 0.08);
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto 30px auto;
          transition: all 0.4s cubic-bezier(0.165, 0.84, 0.44, 1);
        }
        .premium-service-card:hover .icon-wrapper {
          background: #eb6753;
          transform: scale(1.08) rotate(5deg);
        }
        .premium-service-card .icon-wrapper img {
          transition: all 0.4s ease;
        }
        .premium-service-card:hover .icon-wrapper img {
          filter: brightness(0) invert(1);
        }
        .premium-service-card .premium-btn {
          background: transparent;
          color: #1d293f;
          border: 1px solid #1d293f;
          border-radius: 30px;
          padding: 12px 28px;
          font-weight: 600;
          font-size: 14px;
          transition: all 0.3s ease;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          width: 100%;
          text-decoration: none;
        }
        .premium-service-card:hover .premium-btn {
          background: #eb6753;
          color: #fff;
          border-color: #eb6753;
          box-shadow: 0 10px 20px rgba(235, 103, 83, 0.2);
        }
      `}} />

      {iconboxData.map((item) => (
        <div
          className="col-sm-6 col-lg-5 mx-auto mb30"
          key={item.id}
          data-aos="fade-up"
          data-aos-delay={(item.id + 1) * 100}
        >
          <div className="premium-service-card text-center h-100 d-flex flex-column justify-content-between">
            <div>
              <div className="icon-wrapper">
                <Image width={50} height={50} src={item.icon} alt="icon" />
              </div>
              <div className="iconbox-content">
                <h4 className="title mb15" style={{ color: "#1d293f", fontWeight: "700" }}>{item.title}</h4>
                <p className="text mb30" style={{ color: "#6b7280", fontSize: "14px", lineHeight: "1.6" }}>{item.text}</p>
              </div>
            </div>
            <div>
              {item.isExternal ? (
                <a 
                  href={item.href} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="premium-btn"
                >
                  {item.linkText}
                  <i className="fal fa-arrow-right-long" />
                </a>
              ) : (
                <Link href={item.href} className="premium-btn">
                  {item.linkText}
                  <i className="fal fa-arrow-right-long" />
                </Link>
              )}
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default Explore;
