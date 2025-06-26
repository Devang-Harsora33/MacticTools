"use client";
import { usePathname } from "next/navigation";
import React from "react";
import AdminNavbar from "@/components/admin/AdminNavbar";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  const isLoginPage = pathname === "/admin";

  if (isLoginPage) {
    return <>{children}</>; // No navbar or padding
  }

  return (
    <div className="min-h-screen bg-[#73573f] py-[10rem] font-sf-pro">
      <AdminNavbar />
      <main className="container mx-auto px-4 py-8">{children}</main>
    </div>
  );
}
