import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import "./globals.css";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-serif",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "SALTed — Sarawak's Authentic Local Taste, Extra Delicious",
  description:
    "Authentic Sarawakian food in Petaling Jaya. Order for pickup or book a table. Muslim-owned, halal.",
  keywords: "Sarawak food, kolo mee, sarawak laksa, petaling jaya, halal, mutiara damansara",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`h-full ${playfair.variable} ${inter.variable}`}>
      <body className="min-h-full flex flex-col bg-white text-[#1A1A1A]">{children}</body>
    </html>
  );
}
