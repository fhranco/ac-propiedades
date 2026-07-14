import Image from "next/image";
import Link from "next/link";

const About = () => {
  const featureList = [
    "Encuentra excelentes oportunidades",
    "Atención personalizada y soporte rápido",
    "Publica tu propia propiedad con nosotros",
  ];
  return (
    <>

      <div className="row align-items-center">
        {/* Columna de Texto - A la izquierda */}
        <div className="col-lg-5 col-12">
          <div
            className="about-box-1 pe-4 mt0-lg mb30-lg "
            data-aos="fade-left"
          >
            <h2 className="title mb30" style={{ color: "#ffffff", fontWeight: "850" }}>
              Encontremos la mejor opción para ti
            </h2>
            <p className="text mb25 fz15" style={{ color: "#cbd5e1" }}>
              Te asesoramos en cada paso legal y comercial para que vendas o compres de forma segura en la Patagonia.
            </p>
            <div className="list-style1 mb50">
              <ul>
                {featureList.map((list, index) => (
                  <li key={index} style={{ color: "#cbd5e1" }}>
                    <i className="far fa-check text-white bgc-dark fz15" style={{ backgroundColor: "#eb6753" }}></i>
                    {list}
                  </li>
                ))}
              </ul>
            </div>
            <Link href="/propiedades" className="ud-btn btn-thm">
              Conocer Más<i className="fal fa-arrow-right-long"></i>
            </Link>
          </div>
        </div>

        {/* Columna de Imágenes - A la derecha */}
        <div className="col-lg-7 col-12 d-flex justify-content-end">
          <div className="position-relative mb35 mb0-sm style-img-container" style={{ width: "100%", maxWidth: "520px", marginLeft: "auto" }} data-aos="fade-right">
            
            {/* Imagen Principal de Alta Gama */}
            <div style={{ borderRadius: "16px", overflow: "hidden", border: "4px solid rgba(255, 255, 255, 0.15)", boxShadow: "0 20px 40px rgba(0, 0, 0, 0.3)" }}>
              <Image
                width={520}
                height={400}
                className="img-1"
                src="/images/atardecer-en-punta-arenas.webp"
                alt="Propiedad Premium en Magallanes"
                style={{ objectFit: "cover", width: "100%", height: "400px", display: "block" }}
              />
            </div>

            {/* Tarjeta Flotante Corporativa de Confianza */}
            <div style={{
              position: "absolute",
              bottom: "-25px",
              left: "-25px",
              background: "#eb6753",
              color: "#ffffff",
              padding: "24px 30px",
              borderRadius: "12px",
              boxShadow: "0 10px 30px rgba(235, 103, 83, 0.3)",
              maxWidth: "280px",
              zIndex: "3",
              border: "1px solid rgba(255, 255, 255, 0.1)"
            }} className="d-none d-sm-block">
              <h4 style={{ color: "#ffffff", fontWeight: "850", fontSize: "28px", margin: "0 0 5px 0", lineHeight: "1.1" }}>
                10+ Años
              </h4>
              <p style={{ margin: "0", fontSize: "13px", fontWeight: "600", textTransform: "uppercase", letterSpacing: "1px", color: "rgba(255, 255, 255, 0.9)" }}>
                De Experiencia en Magallanes
              </p>
              <div style={{ height: "1px", background: "rgba(255, 255, 255, 0.2)", margin: "12px 0" }} />
              <p style={{ margin: "0", fontSize: "12px", color: "rgba(255, 255, 255, 0.8)", lineHeight: "1.4" }}>
                Asesoría legal y comercial personalizada para asegurar tu inversión.
              </p>
            </div>

          </div>
        </div>
      </div>
    </>
  );
};

export default About;
