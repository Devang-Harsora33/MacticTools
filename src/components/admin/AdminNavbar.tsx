"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { isAdmin } from "@/lib/admin-config";
import {
  Menu,
  X,
  LayoutDashboard,
  Package,
  Plus,
  BarChart3,
  LogOut,
  Shield,
  ChevronRight,
} from "lucide-react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
} from "@mui/material";

const AdminNavbar = () => {
  const pathname = usePathname();
  const router = useRouter();
  const [isAdminUser, setIsAdminUser] = useState<boolean | null>(null);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (isAdmin(user?.uid)) {
        setIsAdminUser(true);
      } else {
        setIsAdminUser(false);
        router.replace("/not-found");
      }
    });

    return () => unsubscribe();
  }, [router]);

  const handleLogout = async () => {
    setShowLogoutModal(false);
    await signOut(auth);
    router.push("/admin");
  };

  const navItems = [
    {
      name: "Dashboard",
      href: "/admin/dashboard",
      icon: LayoutDashboard,
    },
    {
      name: "Products",
      href: "/admin/products",
      icon: Package,
    },
    {
      name: "Add Product",
      href: "/admin/add-product",
      icon: Plus,
    },
    {
      name: "Analytics",
      href: "https://analytics.google.com/analytics/web/#/p494331781/realtime/overview?params=_u..nav%3Dmaui",
      target: "_blank",
      icon: BarChart3,
    },
  ];

  if (isAdminUser === null || !isAdminUser) return null;

  return (
    <>
      <nav className="bg-gradient-to-r from-slate-50 to-gray-100 border-b border-gray-200/60 backdrop-blur-sm sticky top-0 z-50 font-sf-pro">
        <div className="container mx-auto px-6">
          <div className="flex justify-between items-center h-16">
            {/* Logo Section */}
            <Link href="/admin" className="flex items-center space-x-3 group">
              <div className="p-2 bg-gradient-to-br from-[#917e6a] to-[#73573f] rounded-lg shadow-lg group-hover:shadow-xl transition-all duration-300">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <div>
                <div className="text-xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
                  Admin Panel
                </div>
                <div className="text-xs text-gray-500 -mt-1">
                  Control Center
                </div>
              </div>
            </Link>

            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <button
                onClick={() => setMenuOpen(!menuOpen)}
                className="p-2 rounded-lg bg-white/80 backdrop-blur-sm border border-gray-200 hover:bg-white hover:shadow-md transition-all duration-200"
              >
                {menuOpen ? (
                  <X size={20} className="text-[#3a3a3a]" />
                ) : (
                  <Menu size={20} className="text-[#3a3a3a]" />
                )}
              </button>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-2">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = pathname === item.href;
                const isExternal = item.target === "_blank";

                return (
                  <Link
                    key={item.href}
                    target={item.target || "_self"}
                    href={item.href}
                    className={`group relative flex items-center space-x-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-300 ease-out ${
                      isActive
                        ? "bg-gradient-to-r from-[#917e6a] to-[#73573f] text-white shadow-lg shadow-[#73573f]-500/25"
                        : "text-gray-600 hover:text-gray-800 hover:bg-white/80 hover:shadow-md"
                    }`}
                  >
                    <Icon
                      size={16}
                      className={`transition-transform duration-200 ${
                        isActive
                          ? "text-white"
                          : "text-gray-500 group-hover:text-[#3a3a3a]"
                      }`}
                    />
                    <span>{item.name}</span>
                    {isExternal && (
                      <ChevronRight
                        size={12}
                        className="text-gray-400 group-hover:text-gray-600 transition-colors"
                      />
                    )}
                    {isActive && (
                      <div className="absolute inset-0 bg-gradient-to-r from-[#917e6a] to-[#73573f] rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10" />
                    )}
                  </Link>
                );
              })}

              <div className="w-px h-8 bg-gray-300 mx-2" />

              <button
                onClick={() => setShowLogoutModal(true)}
                className="group flex items-center space-x-2 px-4 py-2.5 rounded-xl text-sm font-medium bg-gradient-to-r from-red-500 to-pink-500 text-white hover:from-red-600 hover:to-pink-600 shadow-lg shadow-red-500/25 hover:shadow-xl hover:shadow-red-500/30 transition-all duration-300 transform hover:scale-105"
              >
                <LogOut
                  size={16}
                  className="transition-transform group-hover:-translate-x-0.5"
                />
                <span>Logout</span>
              </button>
            </div>
          </div>

          {/* Mobile menu */}
          {menuOpen && (
            <div className="md:hidden mt-4 mb-4 bg-white/90 backdrop-blur-sm rounded-2xl border border-gray-200/60 shadow-xl overflow-hidden animate-in slide-in-from-top-2 duration-300">
              <div className="p-4 space-y-2">
                {navItems.map((item) => {
                  const Icon = item.icon;
                  const isActive = pathname === item.href;
                  const isExternal = item.target === "_blank";

                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      target={item.target || "_self"}
                      className={`group flex items-center justify-between p-3 rounded-xl text-sm font-medium transition-all duration-200 ${
                        isActive
                          ? "bg-gradient-to-r from-[#917e6a] to-[#73573f] text-white shadow-md"
                          : "text-gray-600 hover:text-gray-800 hover:bg-gray-50"
                      }`}
                      onClick={() => setMenuOpen(false)}
                    >
                      <div className="flex items-center space-x-3">
                        <Icon
                          size={18}
                          className={
                            isActive
                              ? "text-white"
                              : "text-gray-500 group-hover:text-[#3a3a3a]"
                          }
                        />
                        <span>{item.name}</span>
                      </div>
                      {isExternal && (
                        <ChevronRight
                          size={14}
                          className="text-gray-400 group-hover:text-gray-600"
                        />
                      )}
                    </Link>
                  );
                })}

                <div className="pt-2">
                  <button
                    onClick={() => {
                      setMenuOpen(false);
                      setShowLogoutModal(true);
                    }}
                    className="group w-full flex items-center justify-between p-3 rounded-xl text-sm font-medium bg-gradient-to-r from-red-500 to-pink-500 text-white hover:from-red-600 hover:to-pink-600 shadow-md transition-all duration-200"
                  >
                    <div className="flex items-center space-x-3">
                      <LogOut size={18} />
                      <span>Logout</span>
                    </div>
                    <ChevronRight size={14} className="opacity-70" />
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Enhanced Logout Confirmation Modal */}
      <Dialog
        open={showLogoutModal}
        onClose={() => setShowLogoutModal(false)}
        aria-labelledby="logout-dialog-title"
        aria-describedby="logout-dialog-description"
        PaperProps={{
          style: {
            borderRadius: "16px",
            background: "linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%)",
            border: "1px solid rgba(148, 163, 184, 0.1)",
            boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
          },
        }}
      >
        <DialogTitle
          id="logout-dialog-title"
          className="text-center pb-2"
          style={{
            background: "linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            fontSize: "1.5rem",
            fontWeight: "600",
          }}
        >
          <div className="flex items-center justify-center space-x-2 mb-2">
            <div className="p-2 bg-red-100 rounded-full">
              <LogOut size={20} className="text-red-600" />
            </div>
          </div>
        </DialogTitle>
        <DialogContent className="pt-4">
          <Typography
            id="logout-dialog-description"
            className="text-center text-gray-600 leading-relaxed"
          >
            Are you sure you want to exit the admin panel?
            <br />
            <span className="text-sm text-gray-500">
              You&apos;ll need to log in again to access the dashboard.
            </span>
          </Typography>
        </DialogContent>
        <DialogActions className="p-6 pt-2 space-x-3">
          <Button
            onClick={() => setShowLogoutModal(false)}
            variant="outlined"
            className="px-6 py-2 rounded-lg border-gray-300 text-[#3a3a3a] hover:bg-gray-50 hover:border-gray-400 transition-all duration-200"
          >
            Cancel
          </Button>
          <Button
            onClick={handleLogout}
            variant="contained"
            className="px-6 py-2 rounded-lg bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105"
            autoFocus
          >
            Logout
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default AdminNavbar;
