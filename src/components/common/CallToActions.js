"use client";
import Link from "next/link";

const CallToActions = () => {
  const agentPhone = "56984152100";
  const agentPhoneFormatted = "+56 9 8415 2100";

  return (
    <section style={{ background: "#eb6753", padding: "60px 0", margin: "60px 0", position: "relative", overflow: "hidden", width: "100vw", marginLeft: "calc(-50vw + 50%)" }}>
      {/* Luz decorativa en esquina */}
      <div style={{
        position: "absolute",
        top: "-150px",
        right: "-150px",
        width: "300px",
        height: "300px",
        background: "rgba(255, 255, 255, 0.2)",
        borderRadius: "50%",
        filter: "blur(60px)",
        pointerEvents: "none"
      }} />

      <div className="row align-items-center position-relative" style={{ zIndex: 2, maxWidth: "1200px", margin: "0 auto" }}>
        <div className="col-lg-7 col-xl-7 mb30-md" data-aos="fade-right">
          <span className="fw-semibold uppercase mb15 d-block" style={{ color: "#1d293f", letterSpacing: "2px", fontSize: "13px", fontWeight: "700" }}>
            CONTACTO DIRECTO E INMEDIATO
          </span>
          <h2 className="title" style={{ color: "#ffffff", fontWeight: "850", fontSize: "36px", margin: "0 0 15px 0", lineHeight: "1.2" }}>
            ¿Necesitas ayuda? Habla con un experto.
          </h2>
          <p style={{ color: "#ffffff", opacity: "0.95", fontSize: "16px", margin: 0, lineHeight: "1.6" }}>
            Nuestros agentes están disponibles para guiarte en tu búsqueda de parcelas o venta de propiedades en Magallanes.
          </p>
        </div>
        {/* End .col-lg-7 */}

        <div className="col-lg-5 col-xl-5" data-aos="fade-left">
          <div className="d-flex flex-column gap-3 align-items-lg-end align-items-center justify-content-lg-end">
            <Link
              href={`https://api.whatsapp.com/send?phone=${agentPhone}&text=Hola%20AC%20Propiedades,%20necesito%20asesor%C3%ADa%20con%20un%20experto.`}
              target="_blank"
              className="ud-btn w-100 w-sm-auto text-center"
              style={{
                background: "#1d293f",
                color: "#ffffff",
                borderRadius: "10px",
                fontWeight: "750",
                border: "none",
                padding: "14px 60px",
                minWidth: "350px",
                fontSize: "15px",
                boxShadow: "0 10px 20px rgba(29, 41, 63, 0.2)",
                transition: "all 0.3s ease",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                whiteSpace: "nowrap"
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.backgroundColor = "#111a28";
                e.currentTarget.style.transform = "translateY(-1px)";
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.backgroundColor = "#1d293f";
                e.currentTarget.style.transform = "translateY(0)";
              }}
            >
              <i className="fab fa-whatsapp me-2 fz18" style={{ color: "#25D366" }} />
              Escríbenos al WhatsApp
            </Link>
            <Link 
              href={`tel:${agentPhone}`} 
              className="ud-btn w-100 w-sm-auto text-center"
              style={{
                background: "rgba(255, 255, 255, 0.15)",
                color: "#ffffff",
                borderRadius: "10px",
                fontWeight: "600",
                border: "1px solid rgba(255, 255, 255, 0.3)",
                padding: "14px 60px",
                minWidth: "350px",
                fontSize: "15px",
                transition: "all 0.3s ease",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                whiteSpace: "nowrap"
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.background = "rgba(255, 255, 255, 0.25)";
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.background = "rgba(255, 255, 255, 0.15)";
              }}
            >
              <span className="flaticon-call vam pe-2" />
              {agentPhoneFormatted}
            </Link>
          </div>
        </div>
        {/* End col-lg-5 */}
      </div>
    </section>
  );
};

export default CallToActions;
