"use client";
import React, { useEffect, useState, useRef } from "react";
import { db } from "@/lib/firebase";
import { collection, addDoc } from "firebase/firestore";
import toast from "react-hot-toast";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import {
  Box,
  Button,
  CircularProgress,
  Grid,
  TextField,
  Typography,
  Paper,
  InputAdornment,
} from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import EmailIcon from "@mui/icons-material/Email";
import SubjectIcon from "@mui/icons-material/Subject";
import MessageIcon from "@mui/icons-material/Message";
import PhoneIcon from "@mui/icons-material/Phone";
import SendIcon from "@mui/icons-material/Send";
import Link from "next/link";
import PhoneOutlinedIcon from "@mui/icons-material/PhoneOutlined";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import InstagramIcon from "@mui/icons-material/Instagram";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";

gsap.registerPlugin(ScrollTrigger);

export default function ContactPage() {
  const container = useRef(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>(".fade-up").forEach((el) => {
        gsap.fromTo(
          el,
          { y: 50, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1,
            ease: "power3.inOut",
            scrollTrigger: {
              trigger: el,
              start: "top 85%",
              end: "top 85%",
              toggleActions: "play none reverse none",
              markers: false,
            },
          }
        );
      });
    }, container);
    return () => ctx.revert();
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData(e.currentTarget);

    try {
      const contactsCollection = collection(db, "contacts");
      const now = new Date();

      await addDoc(contactsCollection, {
        name: formData.get("name"),
        email: formData.get("email"),
        phone: formData.get("phone"),
        subject: formData.get("subject"),
        message: formData.get("message"),
        timestamp: now,
        date: now.toLocaleDateString(),
        time: now.toLocaleTimeString(),
      });

      // e.currentTarget.reset(); // Reset the form after submission
      toast.success("Message sent successfully!");
    } catch (error) {
      console.error("Firestore Error:", error);
      toast.error("Failed to send message. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div ref={container} className="bg-[#fdfbf7] overflow-hidden font-sf-pro">
      <nav
        className="absolute top-[7rem] md:top-[11rem] left-[1rem] md:left-[4rem] font-sf-pro rounded-md px-4 py-2 z-50"
        aria-label="Breadcrumb"
      >
        <ol className="flex items-center space-x-2 text-md text-[#fdfbf7]">
          <li>
            <Link href="/" className="hover:underline font-medium">
              Home
            </Link>
          </li>
          <li>/</li>
          <li className="font-sf-pro-semibold" aria-current="page">
            Contact
          </li>
        </ol>
      </nav>
      {/* Hero Banner */}
      <div
        className="relative h-[100vh] bg-center bg-cover md:bg-fixed"
        style={{ backgroundImage: "url(/Images/bg_cover1.webp)" }}
      >
        <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#fdfbf7] text-center px-4 fade-up">
            Let&apos;s Connect with Mactic Tools{" "}
          </h1>
        </div>
      </div>

      {/* Contact Section */}
      <section className="w-full py-20 px-4 sm:px-6 lg:px-8">
        <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-start fade-up">
          {/* Contact Info Card */}
          <div className="w-full bg-[#f1ece4] p-8 rounded-2xl shadow-xl space-y-8 transition-all ease-in-out hover:shadow-2xl duration-300 border-4 border-dotted border-[#ccc4b8]">
            <div>
              <h2 className="text-4xl font-extrabold text-[#73573f]">
                Get in Touch
              </h2>
              <p className="mt-4 text-[#73573f] text-lg leading-relaxed">
                Whether you have a project in mind, want to explore
                collaborations, or simply have a question—we&apos;re here to
                help.
              </p>
            </div>

            <div className="space-y-8 text-base">
              {/* Phone */}
              <div className="flex items-start gap-4">
                <PhoneOutlinedIcon sx={{ color: "#73573f", fontSize: 36 }} />
                <div>
                  <h3 className="text-lg font-semibold text-[#3a3a3a]">
                    Phone
                  </h3>
                  <div className="text-[#73573f] flex flex-col gap-2">
                    <div className="flex flex-row gap-2 transition-all duration-300 ease-in-out hover:scale-105">
                      Gangar Rajput:
                      <Link href={"tel:+917777883732"}>
                        <p className="hover:underline">+91 7777883732</p>
                      </Link>
                      {"/"}
                      <Link href={"tel:+917777883732"}>
                        <p className="hover:underline">+91 7777883732</p>
                      </Link>
                    </div>
                    <div className="flex flex-row gap-2 transition-all duration-300 ease-in-out hover:scale-105">
                      Gangar Rajput:{" "}
                      <Link href={"tel:+917777883732"}>
                        <p className="hover:underline">+91 7777883732</p>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>

              {/* Email */}
              <div className="flex items-start gap-4">
                <EmailOutlinedIcon sx={{ color: "#73573f", fontSize: 36 }} />
                <div>
                  <h3 className="text-lg font-semibold text-[#3a3a3a]">
                    Email
                  </h3>
                  <div className="transition-all duration-300 ease-in-out hover:scale-105">
                    <p className="text-[#73573f]">
                      <Link href={"mailto:mactictools@gmail.com"}>
                        <span className="hover:underline">
                          mactictools@gmail.com
                        </span>
                      </Link>
                    </p>
                  </div>
                </div>
              </div>

              {/* Instagram */}
              <div className="flex items-start gap-4">
                <InstagramIcon sx={{ color: "#73573f", fontSize: 36 }} />
                <div>
                  <h3 className="text-lg font-semibold text-[#3a3a3a]">
                    Instagram
                  </h3>
                  <div className="transition-all duration-300 ease-in-out hover:scale-105">
                    <p className="text-[#73573f]">
                      <Link href={"https://www.instagram.com/mactic.tools/"}>
                        <span className="hover:underline">@mactic.tools</span>
                      </Link>
                    </p>
                  </div>
                </div>
              </div>

              {/* Locations */}
              <div className="flex items-start gap-4">
                <LocationOnOutlinedIcon
                  sx={{ color: "#73573f", fontSize: 36 }}
                />
                <div>
                  <h3 className="text-lg font-semibold text-[#3a3a3a]">
                    Locations
                  </h3>
                  <div className="text-[#73573f] ">
                    <strong>Main Office:</strong>
                    <br />
                    <div className="flex  transition-all duration-300 ease-in-out hover:scale-105">
                      <Link
                        href={
                          "https://www.google.com/maps/place/18%C2%B056'59.3%22N+72%C2%B050'00.6%22E/@18.9498056,72.8335,17z/data=!4m4!3m3!8m2!3d18.9498056!4d72.8335?g_ep=Eg1tbF8yMDI1MDYyM18wIJvbDyoASAJQAg%3D%3D"
                        }
                        target="_blank"
                      >
                        <span className="hover:underline">
                          Mactic Tools: Shop No 202, 2nd floor, 46-Shamsi
                          Heights, Sarang Street, Khokha Bazar Mumbai-400003
                        </span>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form Card */}
          <Box
            sx={{
              width: "100%",
              transition: "all 0.3s ease-in-out",
              "&:hover": {
                boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.1)",
              },
            }}
          >
            <Paper
              elevation={4}
              sx={{
                p: { xs: 4, sm: 6 },
                borderRadius: 4,
                backdropFilter: "blur(8px)",
                backgroundColor: "#f1ece4",
                border: "4px dotted #ccc4b8",
              }}
            >
              <Typography
                variant="h4"
                fontWeight={700}
                gutterBottom
                textAlign="center"
                color="#73573f"
              >
                Contact Us
              </Typography>

              <Typography
                variant="subtitle1"
                color="text.secondary"
                textAlign="center"
                mb={4}
              >
                We&apos;d love to hear from you! Fill out the form below and
                we&apos;ll get back to you.
              </Typography>

              <Box
                component="form"
                noValidate
                autoComplete="off"
                onSubmit={handleSubmit}
                sx={{ width: "100%" }}
              >
                <Grid container spacing={3} sx={{ width: "100%", m: 0 }}>
                  <Grid size={6} sx={{ width: "100%", p: 1 }}>
                    <TextField
                      fullWidth
                      name="name"
                      label="Full Name"
                      required
                      variant="outlined"
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <PersonIcon color="action" />
                          </InputAdornment>
                        ),
                      }}
                    />
                  </Grid>

                  <Grid size={6} sx={{ width: "100%", p: 1 }}>
                    <TextField
                      fullWidth
                      name="email"
                      label="Email"
                      type="email"
                      required
                      variant="outlined"
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <EmailIcon color="action" />
                          </InputAdornment>
                        ),
                      }}
                    />
                  </Grid>

                  <Grid size={6} sx={{ width: "100%", p: 1 }}>
                    <TextField
                      fullWidth
                      name="phone"
                      label="Phone Number"
                      type="tel"
                      required
                      variant="outlined"
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <PhoneIcon color="action" />
                          </InputAdornment>
                        ),
                      }}
                    />
                  </Grid>

                  <Grid size={6} sx={{ width: "100%", p: 1 }}>
                    <TextField
                      fullWidth
                      name="subject"
                      label="Subject"
                      required
                      variant="outlined"
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <SubjectIcon color="action" />
                          </InputAdornment>
                        ),
                      }}
                    />
                  </Grid>

                  <Grid size={12} sx={{ width: "100%", p: 1 }}>
                    <TextField
                      fullWidth
                      name="message"
                      label="Your Message"
                      multiline
                      rows={5}
                      required
                      variant="outlined"
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <MessageIcon color="action" />
                          </InputAdornment>
                        ),
                      }}
                    />
                  </Grid>

                  <Grid size={12} sx={{ width: "100%", p: 1 }}>
                    <Button
                      type="submit"
                      fullWidth
                      variant="contained"
                      size="large"
                      startIcon={
                        loading ? (
                          <CircularProgress size={20} color="inherit" />
                        ) : (
                          <SendIcon />
                        )
                      }
                      disabled={loading}
                      sx={{
                        backgroundColor: "#73573f", // 👈 your color here
                        py: 1.5,
                        fontWeight: 600,
                        borderRadius: 2,
                        boxShadow: 3,
                        "&:hover": {
                          backgroundColor: "#917e6a", // 👈 same color on hover (optional)
                          transform: "translateY(-2px)",
                          boxShadow: 4,
                          scale: "1.03",
                        },
                        transition: "all 0.3s ease-in-out",
                      }}
                    >
                      {loading ? "Sending..." : "Send Message"}
                    </Button>
                  </Grid>
                </Grid>
              </Box>
            </Paper>
          </Box>
        </div>
      </section>

      {/* Map */}
      <div className="fade-up max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-[10rem]">
        <h2 className="text-3xl font-bold text-[#73573f] text-center mb-8">
          Visit Our Facility
        </h2>
        <div className="text-center text-lg font-semibold text-[#73573f] mb-[2rem] ">
          <Link
            href="https://www.google.com/maps/place/18%C2%B056'59.3%22N+72%C2%B050'00.6%22E/@18.9498056,72.8335,17z"
            target="_blank"
          >
            <span className="underline inline-block scale-100 hover:scale-110 transition-all duration-300 ease-in-out">
              Tap the map to open in Google Maps
            </span>
          </Link>
        </div>
        <div className="rounded-lg overflow-hidden h-96 shadow-lg">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d15079.677718149262!2d72.8335!3d18.9498056!3m2!1i1024!2i768!4f1!3m3!1m2!1s0x0%3A0x0!2zMTjCsDU2JzU5LjMiTiA3MsKwNTAnMDAuNiJF!5e0!3m2!1sen!2sin!4v1719498056000!5m2!1sen!2sin"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </div>
    </div>
  );
}
