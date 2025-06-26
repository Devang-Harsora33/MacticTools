import React from "react";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import { Toaster } from "react-hot-toast";
import Footer from "@/components/Header/nav/Footer";
import Footercontact from "@/components/Footercontact";
import ClientWrapper from "@/components/ClientWrapper";
import { Metadata } from "next";
import { GoogleAnalytics } from "@next/third-parties/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Mactic Tools",
  description: "Explore our range of quality products at Mactic Tools",
  icons: {
    icon: "/Images/logo1.webp",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="min-h-screen flex flex-col font-sf-pro overflow-hidden">
          <Header />
          <ClientWrapper>
            <main className="flex-grow pb-[5rem] bg-[#73573f]">{children}</main>
          </ClientWrapper>
          <Footercontact />
          <Footer />
          <Toaster position="bottom-right" />
        </div>
        <GoogleAnalytics gaId="G-Z100YP056Q" />
      </body>
    </html>
  );
}
