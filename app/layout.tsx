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
    title: "Donapet | Donaciones para comida y articulos de mascotas",
    description:
      "Compra racion, higiene, abrigo y juguetes para refugios verificados de mascotas.",
    icons: {
      icon: "/favicon.svg",
      shortcut: "/favicon.svg",
    },
    openGraph: {
      title: "Donapet | Donaciones para mascotas",
      description:
        "Una tienda solidaria donde refugios publican necesidades y donantes compran articulos reales.",
      images: [
        {
          url: "/og.png",
          width: 1680,
          height: 945,
          alt: "Perro, gato y articulos donados para refugios de mascotas",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: "Donapet | Donaciones para mascotas",
      description:
        "Ayuda a refugios comprando alimento y articulos que llegan directo a quienes los necesitan.",
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
