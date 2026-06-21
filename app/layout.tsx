import type { Metadata } from "next";
import "./globals.css";

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
    <html lang="en" className="h-full">
      <body className="min-h-full flex flex-col bg-white text-[#111111]">{children}</body>
    </html>
  );
}
