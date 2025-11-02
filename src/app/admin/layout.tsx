"use client";
import { usePathname } from "next/navigation";
import React, { useState, useEffect } from "react";
import AdminNavbar from "@/components/admin/AdminNavbar";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [isLoginPage, setIsLoginPage] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    setIsLoginPage(pathname === "/admin");
  }, [pathname]);

  // Prevent hydration mismatch by not rendering conditionally until mounted
  if (!mounted) {
    return <>{children}</>;
  }

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
