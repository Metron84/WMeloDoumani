import type { Metadata } from "next";
import { Archivo, Newsreader } from "next/font/google";
import "./globals.css";
import { identity, links } from "@/data/cv";

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
  themeColor: "#0a111f",
  width: "device-width",
  initialScale: 1,
};

const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: identity.name,
  alternateName: "Melo Doumani",
  jobTitle: identity.role,
  description: identity.summary,
  email: `mailto:${identity.email}`,
  telephone: identity.phone,
  url: "https://melodoumani.com",
  image: "https://melodoumani.com/melo-portrait.jpg",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Dubai",
    addressCountry: "AE",
  },
  worksFor: {
    "@type": "Organization",
    name: "The Reflective Football",
    url: "https://thereflectivefootball.com",
  },
  knowsLanguage: ["en", "ar", "fr", "es", "it"],
  sameAs: links.map((l) => l.href),
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={`${archivo.variable} ${newsreader.variable}`}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
        />
        {children}
      </body>
    </html>
  );
}
