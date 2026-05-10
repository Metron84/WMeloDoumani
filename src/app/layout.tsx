import type { Metadata } from "next";
import { DM_Sans, Inter, Libre_Baskerville, Playfair_Display } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/Providers";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const libre = Libre_Baskerville({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-libre",
  display: "swap",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  variable: "--font-dm-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "W. Melo Doumani — Writer, Thinker, Builder",
    template: "%s | Melo Doumani",
  },
  description:
    "Ultimate Fantasy Manager, writing, and reflections — one unified site.",
  manifest: "/manifest.json",
};

export const viewport = {
  themeColor: "#080808",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  viewportFit: "cover",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-theme="dark" suppressHydrationWarning>
      <head>
        <meta name="theme-color" content="#080808" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              try {
                const t = localStorage.getItem('ufm-theme');
                if (t) document.documentElement.setAttribute('data-theme', t);
                else if (window.matchMedia('(prefers-color-scheme: light)').matches) {
                  document.documentElement.setAttribute('data-theme', 'light');
                }
              } catch(e) {}
            `,
          }}
        />
      </head>
      <body
        className={`${playfair.variable} ${inter.variable} ${libre.variable} ${dmSans.variable} bg-white text-slate-900 dark:bg-black dark:text-gray-200 transition-colors duration-300`}
      >
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
