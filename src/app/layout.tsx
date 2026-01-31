import type { Metadata } from "next";
import { Inter, Outfit, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "DeepTrace | Cyber Intelligence Platform",
  description: "AI System for Detecting Coordinated Influence Campaigns",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${inter.variable} ${outfit.variable} ${jetbrainsMono.variable} antialiased bg-background text-foreground overflow-x-hidden selection:bg-primary selection:text-black`}
      >
        <div className="fixed inset-0 pointer-events-none z-50 scanline mix-blend-overlay opacity-30"></div>
        {children}
      </body>
    </html>
  );
}
