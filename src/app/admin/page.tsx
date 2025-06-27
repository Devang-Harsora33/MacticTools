"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Box,
  Button,
  Container,
  TextField,
  Typography,
  CircularProgress,
  Paper,
} from "@mui/material";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/lib/firebase"; // Make sure this is correctly pointing to your Firebase auth setup
import { isAdmin } from "@/lib/admin-config";
import toast, { Toaster } from "react-hot-toast";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      if (isAdmin(user.uid)) {
        toast.success("Login successful! Welcome to Admin Panel.");
        router.push("/admin/dashboard");
      } else {
        toast.error("Access denied. You don't have admin privileges.");
        await auth.signOut();
      }
    } catch (err: unknown) {
      console.error(err);
      toast.error("Invalid email or password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        position: "relative",
        minHeight: "100vh",
        display: "flex",
        mt: "10rem",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden", // Ensure children don't overflow
      }}
    >
      {/* Background image with blur */}
      <Box
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100vw",
          height: "100vh",
          backgroundImage:
            "url('https://firebasestorage.googleapis.com/v0/b/mactictools-28453.firebasestorage.app/o/assets%2Fbg_cover2.webp?alt=media&token=f0cef767-a5fc-4d02-b16d-32d177893426')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          filter: "blur(1px)",
          zIndex: 0,
        }}
      />

      {/* Foreground content (form) */}
      <Container
        maxWidth="sm"
        sx={{
          position: "relative",
          zIndex: 1,
        }}
      >
        <Paper elevation={6} sx={{ p: 4, borderRadius: 3 }}>
          <Typography
            variant="h5"
            fontWeight="bold"
            gutterBottom
            align="center"
          >
            Admin Login
          </Typography>

          <form onSubmit={handleLogin}>
            <TextField
              label="Email"
              fullWidth
              margin="normal"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <TextField
              label="Password"
              type="password"
              fullWidth
              margin="normal"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            <Box mt={3} display="flex" justifyContent="center">
              <Button
                type="submit"
                fullWidth
                variant="contained"
                size="large"
                disabled={loading}
                sx={{
                  backgroundColor: "#73573f",
                  py: 1.5,
                  fontWeight: 600,
                  borderRadius: 2,
                  boxShadow: 3,
                  "&:hover": {
                    backgroundColor: "#917e6a",
                    transform: "translateY(-2px)",
                    boxShadow: 4,
                    scale: "1.03",
                  },
                  transition: "all 0.3s ease-in-out",
                }}
              >
                {loading ? <CircularProgress size={24} /> : "Login"}
              </Button>
            </Box>
          </form>
        </Paper>
      </Container>

      {/* Toast notifications */}
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 4000,
          style: {
            background: "#363636",
            color: "#fff",
          },
          success: {
            duration: 3000,
            iconTheme: {
              primary: "#4ade80",
              secondary: "#fff",
            },
          },
          error: {
            duration: 4000,
            iconTheme: {
              primary: "#ef4444",
              secondary: "#fff",
            },
          },
        }}
      />
    </Box>
  );
}
