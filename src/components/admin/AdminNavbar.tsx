"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { isAdmin } from "@/lib/admin-config";
import { Menu, X } from "lucide-react";
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
    { name: "Dashboard", href: "/admin/dashboard" },
    { name: "Products", href: "/admin/products" },
    { name: "Add Product", href: "/admin/add-product" },
    {
      name: "Google Analytics",
      href: "https://analytics.google.com/analytics/web/#/p494331781/realtime/overview?params=_u..nav%3Dmaui",
      target: "_blank",
    },
  ];

  if (isAdminUser === null || !isAdminUser) return null;

  return (
    <>
      <nav className="bg-[#fdfbf7] shadow-lg font-sf-pro">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center h-16">
            <Link href="/admin" className="text-xl font-bold text-[#3a3a3a]">
              Admin Panel
            </Link>

            <div className="md:hidden">
              <button onClick={() => setMenuOpen(!menuOpen)}>
                {menuOpen ? (
                  <X size={24} style={{ color: "#73573f" }} />
                ) : (
                  <Menu size={24} style={{ color: "#73573f" }} />
                )}
              </button>
            </div>

            <div className="hidden md:flex items-center space-x-4">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  target={item.target || "_self"}
                  href={item.href}
                  className={`px-3 py-2 rounded-md text-sm font-medium ${
                    pathname === item.href
                      ? "bg-[#3a3a3a] text-[#fdfbf7]"
                      : "text-[#73573f] hover:bg-[#3a3a3a] hover:text-[#fdfbf7] transition-all duration-300 ease-in-out"
                  }`}
                >
                  {item.name}
                </Link>
              ))}
              <button
                onClick={() => setShowLogoutModal(true)}
                className="px-3 py-2 rounded-md text-sm font-medium bg-red-600 text-[#fdfbf7] hover:bg-red-700 transition"
              >
                Logout
              </button>
            </div>
          </div>

          {/* Mobile menu */}
          {menuOpen && (
            <div className="md:hidden mt-2 space-y-2 font-sf-pro">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`block px-4 py-2 rounded-md text-sm font-medium ${
                    pathname === item.href
                      ? "bg-[#73573f] text-[#fdfbf7]"
                      : "text-[#73573f] hover:bg-[#3a3a3a] hover:text-[#fdfbf7] transition-all duration-300 ease-in-out"
                  }`}
                  onClick={() => setMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              <button
                onClick={() => {
                  setMenuOpen(false);
                  setShowLogoutModal(true);
                }}
                className="block w-full text-left px-4 py-2 rounded-md text-sm font-medium bg-red-600 text-[#fdfbf7] hover:bg-red-700 transition"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </nav>

      {/* Logout Confirmation Modal */}
      <Dialog
        open={showLogoutModal}
        onClose={() => setShowLogoutModal(false)}
        aria-labelledby="logout-dialog-title"
        aria-describedby="logout-dialog-description"
      >
        <DialogTitle id="logout-dialog-title">Logout Confirmation</DialogTitle>
        <DialogContent>
          <Typography id="logout-dialog-description">
            Are you sure you want to exit the admin panel?
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setShowLogoutModal(false)} color="inherit">
            Cancel
          </Button>
          <Button
            onClick={handleLogout}
            color="error"
            variant="contained"
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
