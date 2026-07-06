"use client";
import Link from "next/link";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/utils/supabase/client";

const SignIn = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  
  const supabase = createClient();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      // Usamos el sistema nativo de Supabase Auth
      const { data, error: authError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (authError) {
        setError(authError.message === "Invalid login credentials" ? "Correo o contraseña incorrectos" : authError.message);
        return;
      }

      if (data?.session) {
        // Guardamos un identificador de sesión para retrocompatibilidad rápida de UI si hace falta
        localStorage.setItem("userSession", JSON.stringify(data.user));
        // Guardamos la cookie manual para que el middleware de Next.js nos deje pasar al Dashboard
        document.cookie = `userSession=${data.user.id}; path=/; max-age=86400; SameSite=Lax`;
        
        window.dispatchEvent(new Event("storage"));

        // Limpiar el backdrop y las clases de modal de Bootstrap en el DOM
        if (typeof document !== "undefined") {
          const backdrops = document.querySelectorAll(".modal-backdrop");
          backdrops.forEach((el) => el.remove());
          document.body.classList.remove("modal-open");
          document.body.style.overflow = "";
          document.body.style.paddingRight = "";
        }

        // Redirigir al home del dashboard
        router.push("/dashboard-home");
      }
    } catch (err) {
      setError("Error de conexión con el servidor");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="form-style1" onSubmit={handleSubmit}>
      {error && (
        <div className="alert alert-danger fz14 py-2" role="alert">
          {error}
        </div>
      )}

      <div className="mb25">
        <label className="form-label fw600 dark-color">Correo Electrónico</label>
        <input
          type="email"
          className="form-control"
          placeholder="Ingresa tu correo"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>

      <div className="mb15">
        <label className="form-label fw600 dark-color">Contraseña</label>
        <input
          type="password"
          className="form-control"
          placeholder="Ingresa tu contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>

      <div className="d-grid mb20 mt30">
        <button className="ud-btn btn-thm" type="submit" disabled={loading}>
          {loading ? "Ingresando..." : "Ingresar"} <i className="fal fa-arrow-right-long" />
        </button>
      </div>

      <div className="text-center mt20">
        <p className="fz12 text-muted">
          Plataforma segura por Supabase Auth.
        </p>
      </div>
    </form>
  );
};

export default SignIn;
