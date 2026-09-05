import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { headers } from "next/headers";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export async function generateMetadata(): Promise<Metadata> {
  const headerList = await headers();
  const host = headerList.get("host") ?? "localhost:3000";
  const protocol = headerList.get("x-forwarded-proto") ?? "https";
  const baseUrl = new URL(`${protocol}://${host}`);

  return {
    metadataBase: baseUrl,
    title: "Adoptar | Inicio",
    description:
      "Un espacio de Tu Ración para conectar adopciones, refugios y donaciones concretas.",
    icons: {
      icon: "/favicon.svg",
      shortcut: "/favicon.svg",
    },
    openGraph: {
      title: "Adoptar | Inicio",
      description:
        "Conocé el circuito de adopciones y ayudá a refugios comprando alimento, higiene y abrigo.",
      images: [
        {
          url: "/og.png",
          width: 1680,
          height: 945,
          alt: "Perro, gato y artículos donados para refugios de mascotas",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: "Adoptar | Inicio",
      description:
        "Conocé mascotas en adopción y ayudá a refugios con artículos reales.",
      images: ["/og.png"],
    },
  };
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
