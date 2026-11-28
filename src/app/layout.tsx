import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Plus_Jakarta_Sans } from "next/font/google";
import { GROUP_INFO, SITE } from "@/config/site";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
});

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: SITE.themeColor,
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  title: SITE.title,
  description: SITE.description,
  keywords: SITE.keywords,
  openGraph: {
    title: SITE.title,
    description: SITE.ogDescription,
    url: SITE.url,
    siteName: GROUP_INFO.displayName,
    locale: SITE.locale,
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
      className={`${cormorant.variable} ${jakarta.variable} bg-[#050505] text-[#F5F5F0] antialiased selection:bg-[#F5F5F0] selection:text-[#050505]`}
    >
      <body className="min-h-screen bg-[#050505] text-[#F5F5F0] font-sans overflow-x-hidden">
        {children}
      </body>
    </html>
  );
}
