import ScrollToTop from "@/components/common/ScrollTop";
import WhatsAppFloating from "@/components/common/WhatsAppFloating";
import "../../node_modules/react-modal-video/scss/modal-video.scss";
import "aos/dist/aos.css";
import "../../public/scss/main.scss";
import { DM_Sans, Poppins } from "next/font/google";
import AosInit from "@/components/common/AosInit";

// DM_Sans font
const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--body-font-family",
});

// Poppins font
const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--title-font-family",
});

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body
        className={`body  ${poppins.variable} ${dmSans.variable}`}
        cz-shortcut-listen="false"
      >
        <AosInit />
        <div className="wrapper ovh">{children}</div>
        <ScrollToTop />
        <WhatsAppFloating />
      </body>
    </html>
  );
}
