import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Noto_Sans_Oriya } from "next/font/google";
import "./globals.css";

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-jakarta",
});

const notoOriya = Noto_Sans_Oriya({
  subsets: ["oriya"],
  weight: ["400", "600", "700"],
  variable: "--font-oriya",
});

export const metadata: Metadata = {
  title: "OdiaFlix - Explore Odia Cinema Like Never Before",
  description: "Your ultimate destination for Odia movies, web series and more.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${jakarta.variable} ${notoOriya.variable}`}>
      <body className="font-sans antialiased bg-[#0B0D12] text-white selection:bg-[#4B0082] selection:text-white">
        {children}
      </body>
    </html>
  );
}