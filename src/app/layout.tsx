import ThemeRegistry from "@/components/ThemeRegistry";
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
    icon: "/icon.png",
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
        <ThemeRegistry>
          <div className="min-h-screen flex flex-col font-sf-pro overflow-hidden">
            <Header />
            <ClientWrapper>
              <main className="flex-grow pb-[5rem] bg-[#fdfbf7]">{children}</main>
            </ClientWrapper>
            <Footercontact />
            <Footer />
            <Toaster position="top-right" />
          </div>
          <GoogleAnalytics gaId="G-Z100YP056Q" />
        </ThemeRegistry>
      </body>
    </html>
  );
}
