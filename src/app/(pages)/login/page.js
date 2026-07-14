import SignIn from "@/components/common/login-signup-modal/SignIn";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export const metadata = {
  title: "Iniciar Sesión | AC Propiedades Magallanes",
};

const Login = () => {
  return (
    <>
      <section className="our-compare p-0 position-relative overflow-hidden d-flex align-items-center justify-content-center" style={{ minHeight: "100vh" }}>
        {/* Background Image (Optimized instead of heavy video) */}
        <div
          style={{
            position: "absolute",
            width: "100%",
            height: "100%",
            backgroundImage: "url('/images/listings/g1-4.jpg')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            top: 0,
            left: 0,
            zIndex: 1
          }}
        />

        {/* Dark overlay to give contrast */}
        <div
          style={{
            position: "absolute",
            width: "100%",
            height: "100%",
            background: "rgba(30, 41, 59, 0.65)", // Slate 800 with opacity
            top: 0,
            left: 0,
            zIndex: 2,
            backdropFilter: "blur(3px)"
          }}
        />

        {/* Login Card */}
        <div className="container" style={{ position: "relative", zIndex: 3 }}>
          <div className="row justify-content-center">
            <div className="col-md-8 col-lg-6 col-xl-5">
              <div 
                className="log-reg-form signup-modal form-style1 p50 p30-sm default-box-shadow2 bdrs12"
                style={{
                  background: "rgba(255, 255, 255, 0.92)",
                  border: "1px solid rgba(255, 255, 255, 0.3)",
                  boxShadow: "0 20px 40px rgba(0, 0, 0, 0.25)"
                }}
              >
                <div className="text-center mb30">
                  <Link href="/">
                    <Image
                      style={{ objectFit: "contain" }}
                      width={100}
                      height={100}
                      className="mb20"
                      src="/images/Logo.png"
                      alt="logo"
                    />
                  </Link>
                  <h2 className="title fw700 mb10" style={{ color: "#1d293f", fontSize: "28px" }}>
                    Iniciar Sesión
                  </h2>
                  <p className="text" style={{ color: "#5f6c80", fontSize: "14px" }}>
                    Plataforma administrativa de AC Propiedades Magallanes.
                  </p>
                </div>
                <SignIn />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Login;
