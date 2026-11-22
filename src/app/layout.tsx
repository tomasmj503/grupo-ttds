import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Montserrat } from "next/font/google";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
});

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: "#050505",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  title: "GRUPO TTDS | Hospitalidad Nocturna & Alta Gastronomía",
  description:
    "Grupo TTDS reúne los conceptos gastronómicos y nocturnos más cautivadores: Tío Toro y Dragon Soul. Cocina de autor, mixología y atmósfera editorial en Bogotá.",
  keywords: [
    "Grupo TTDS",
    "Tío Toro",
    "Dragon Soul",
    "Normandía Bogotá",
    "Restaurantes de lujo Bogotá",
    "Hamburguesas Artesanales",
    "Sushi Bar",
    "Lounge Nocturno",
  ],
  openGraph: {
    title: "GRUPO TTDS | Hospitalidad Nocturna & Alta Gastronomía",
    description:
      "Tío Toro & Dragon Soul. Conceptos de alta cocina y vida nocturna con estética editorial.",
    url: "https://grupottds.com",
    siteName: "Grupo TTDS",
    locale: "es_CO",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="es"
      className={`${cormorant.variable} ${montserrat.variable} bg-[#050505] text-[#F5F5F0] antialiased selection:bg-[#C8A97E] selection:text-[#050505]`}
    >
      <body className="min-h-screen bg-[#050505] text-[#F5F5F0] font-sans overflow-x-hidden">
        {children}
      </body>
    </html>
  );
}
