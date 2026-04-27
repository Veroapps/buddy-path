import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";

const outfit = Outfit({ subsets: ["latin", "latin-ext"], weight: ["300", "400", "500", "600", "700"] });

export const metadata: Metadata = {
  title: "Buddy Path",
  description: "Tvoje cesta k lepším návykům",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="cs">
      <body className={`${outfit.className} antialiased`}>{children}</body>
    </html>
  );
}
