"use client";

import { useEffect } from "react";
import Aos from "aos";

export default function AosInit() {
  useEffect(() => {
    // Bootstrap JS (required for tabs, modals, dropdowns)
    if (typeof window !== "undefined") {
      import("bootstrap");
    }
    // AOS animations
    Aos.init({
      duration: 1200,
      once: true,
    });
  }, []);

  return null;
}
