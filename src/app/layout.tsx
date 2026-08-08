import type { Metadata } from "next";
import { Archivo, Newsreader } from "next/font/google";
import "./globals.css";
import { identity } from "@/data/cv";

const archivo = Archivo({
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
  variable: "--font-archivo",
  display: "swap",
});

const newsreader = Newsreader({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-newsreader",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://melodoumani.com"),
  title: `${identity.name} — ${identity.role}`,
  description: identity.summary,
  alternates: { canonical: "https://melodoumani.com" },
  icons: { icon: "/icon.png", apple: "/icon.png" },
  openGraph: {
    title: `${identity.name} — ${identity.role}`,
    description: identity.summary,
    url: "https://melodoumani.com",
    siteName: identity.name,
    locale: "en_GB",
    type: "profile",
    images: [
      {
        url: "/og.jpg",
        width: 1200,
        height: 630,
        alt: `${identity.name}, ${identity.role}`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${identity.name} — ${identity.role}`,
    description: identity.summary,
    images: ["/og.jpg"],
  },
};

export const viewport = {
  themeColor: "#101418",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={`${archivo.variable} ${newsreader.variable}`}>
        {children}
      </body>
    </html>
  );
}
