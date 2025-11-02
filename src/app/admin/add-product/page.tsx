"use client";

import React, { useState, useEffect, useRef } from "react";
import { db, storage } from "@/lib/firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { ref, uploadBytes, getMetadata } from "firebase/storage";
import { useRouter } from "next/navigation";
import Image from "next/image";
import {
  Box,
  Button,
  Card,
  CardContent,
  CircularProgress,
  IconButton,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import toast from "react-hot-toast";
import { Package, Image as ImageIcon, Info, Plus, X } from "lucide-react";

const AddProduct = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    category: "",
    sizesAndQuantities: [] as { size: string; quantity: string }[],
    images: [] as File[],
  });
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);
  const blobUrlsRef = useRef<string[]>([]);

  const addFiles = (files: FileList | File[]) => {
    const fileArray = Array.from(files);
    setFormData((prev) => ({
      ...prev,
      images: [...prev.images, ...fileArray],
    }));

    const newPreviews = fileArray.map((file) => URL.createObjectURL(file));
    blobUrlsRef.current = [...blobUrlsRef.current, ...newPreviews];
    setImagePreviews((prev) => [...prev, ...newPreviews]);
  };

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value, type } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]:
        type === "checkbox" ? (e.target as HTMLInputElement).checked : value,
    }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      addFiles(e.target.files);
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (e.dataTransfer.files?.length > 0) {
      addFiles(e.dataTransfer.files);
    }
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLDivElement>) => {
    const items = e.clipboardData.items;
    const files: File[] = [];
    for (let i = 0; i < items.length; i++) {
      const item = items[i];
      if (item.kind === "file") {
        const file = item.getAsFile();
        if (file) files.push(file);
      }
    }
    if (files.length > 0) {
      addFiles(files);
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const removeImage = (index: number) => {
    // Revoke the blob URL to free up memory
    const previewUrl = imagePreviews[index];
    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
      blobUrlsRef.current = blobUrlsRef.current.filter((url) => url !== previewUrl);
    }

    setFormData((prev) => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index),
    }));
    setImagePreviews((prev) => prev.filter((_, i) => i !== index));
  };

  const addSizeQuantity = () => {
    setFormData((prev) => ({
      ...prev,
      sizesAndQuantities: [...prev.sizesAndQuantities, { size: "", quantity: "" }],
    }));
  };

  const removeSizeQuantity = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      sizesAndQuantities: prev.sizesAndQuantities.filter((_, i) => i !== index),
    }));
  };

  const updateSizeQuantity = (index: number, field: "size" | "quantity", value: string) => {
    setFormData((prev) => ({
      ...prev,
      sizesAndQuantities: prev.sizesAndQuantities.map((item, i) =>
        i === index ? { ...item, [field]: value } : item
      ),
    }));
  };

  // Cleanup: Revoke all blob URLs when component unmounts
  useEffect(() => {
    return () => {
      blobUrlsRef.current.forEach((url) => {
        URL.revokeObjectURL(url);
      });
      blobUrlsRef.current = [];
    };
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    // Validation
    if (!formData.name.trim()) {
      toast.error("Product name is required");
      setLoading(false);
      return;
    }
    if (!formData.description.trim()) {
      toast.error("Description is required");
      setLoading(false);
      return;
    }
    if (!formData.category.trim()) {
      toast.error("Category is required");
      setLoading(false);
      return;
    }
    if (formData.images.length === 0) {
      toast.error("Please upload at least one image");
      setLoading(false);
      return;
    }
    try {
      const imageUrls = await Promise.all(
        formData.images.map(async (file) => {
          const productFolderName = formData.name.trim().replace(/\s+/g, "_"); // clean folder name
          const storagePath = `products/${productFolderName}/${Date.now()}-${file.name}`;
          const storageRef = ref(storage, storagePath);
          
          // Upload the file
          await uploadBytes(storageRef, file);
          
          // Get metadata to extract bucket name
          const metadata = await getMetadata(storageRef);
          const bucket = metadata.bucket;
          
          // Generate permanent URL without token
          // Format: https://firebasestorage.googleapis.com/v0/b/{bucket}/o/{encodedPath}?alt=media
          const encodedPath = encodeURIComponent(storagePath);
          const permanentUrl = `https://firebasestorage.googleapis.com/v0/b/${bucket}/o/${encodedPath}?alt=media`;
          
          return permanentUrl;
        })
      );

      const productData = {
        name: formData.name,
        description: formData.description,
        category: formData.category,
        sizesAndQuantities: formData.sizesAndQuantities,
        images: imageUrls,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      };

      await addDoc(collection(db, "products"), productData);

      // Clean up blob URLs after successful submission
      blobUrlsRef.current.forEach((url) => {
        URL.revokeObjectURL(url);
      });
      blobUrlsRef.current = [];

      router.push("/admin/products");
    } catch (err) {
      setError("Failed to add product. Please try again.");
      console.error("Error adding product:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        backgroundColor: "#fdfbf7",
        minHeight: "100vh",
        paddingY: "3rem",
        paddingX: { xs: 2 },
        display: "flex",
        justifyContent: "center",
        alignItems: "flex-start",
      }}
    >
      <Box sx={{ width: "100%", maxWidth: "900px" }}>
        {/* Header */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 2,
            mb: 4,
          }}
        >
          <Package size={32} color="#73573f" />
          <Typography
            variant="h4"
            fontWeight="bold"
            sx={{ color: "#73573f" }}
          >
            Add New Product
          </Typography>
        </Box>

        {/* Error Message */}
        {error && (
          <Paper
            elevation={0}
            sx={{
              bgcolor: "error.light",
              color: "error.main",
              p: 2,
              mb: 3,
              borderRadius: 2,
              border: "1px solid",
              borderColor: "error.main",
            }}
          >
            {error}
          </Paper>
        )}

        <form onSubmit={handleSubmit}>
          <Card
            elevation={3}
            sx={{
              borderRadius: 3,
              overflow: "hidden",
              backgroundColor: "#fff",
            }}
          >
            <CardContent sx={{ p: 4 }}>
              {/* Product Information Section */}
              <Box sx={{ mb: 4 }}>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 1,
                    mb: 3,
                    pb: 1.5,
                    borderBottom: "2px solid",
                    borderColor: "#73573f",
                  }}
                >
                  <Info size={20} color="#73573f" />
                  <Typography
                    variant="h6"
                    fontWeight="600"
                    sx={{ color: "#73573f" }}
                  >
                    Product Information
                  </Typography>
                </Box>

                <Box
                  sx={{
                    display: "grid",
                    gridTemplateColumns: {
                      xs: "1fr",
                      sm: "repeat(2, 1fr)",
                    },
                    gap: 3,
                  }}
                >
                  <TextField
                    label="Product Name"
                    name="name"
                    fullWidth
                    required
                    value={formData.name}
                    onChange={handleInputChange}
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        "& fieldset": {
                          borderColor: "#d0d0d0",
                        },
                        "&:hover fieldset": {
                          borderColor: "#73573f",
                        },
                        "&.Mui-focused fieldset": {
                          borderColor: "#73573f",
                        },
                      },
                      "& .MuiInputLabel-root.Mui-focused": {
                        color: "#73573f",
                      },
                    }}
                  />

                  <TextField
                    label="Category"
                    name="category"
                    fullWidth
                    required
                    value={formData.category}
                    onChange={handleInputChange}
                    placeholder="e.g., Hand Tools, Power Tools"
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        "& fieldset": {
                          borderColor: "#d0d0d0",
                        },
                        "&:hover fieldset": {
                          borderColor: "#73573f",
                        },
                        "&.Mui-focused fieldset": {
                          borderColor: "#73573f",
                        },
                      },
                      "& .MuiInputLabel-root.Mui-focused": {
                        color: "#73573f",
                      },
                    }}
                  />

                  <Box sx={{ gridColumn: { xs: "1", sm: "1 / -1" } }}>
                    <TextField
                      label="Description"
                      name="description"
                      fullWidth
                      required
                      multiline
                      rows={4}
                      value={formData.description}
                      onChange={handleInputChange}
                      placeholder="Enter product description..."
                      sx={{
                        "& .MuiOutlinedInput-root": {
                          "& fieldset": {
                            borderColor: "#d0d0d0",
                          },
                          "&:hover fieldset": {
                            borderColor: "#73573f",
                          },
                          "&.Mui-focused fieldset": {
                            borderColor: "#73573f",
                          },
                        },
                        "& .MuiInputLabel-root.Mui-focused": {
                          color: "#73573f",
                        },
                      }}
                    />
                  </Box>

                  {/* Sizes and Quantities Section */}
                  <Box sx={{ gridColumn: { xs: "1", sm: "1 / -1" } }}>
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        mb: 2,
                      }}
                    >
                      <Typography
                        variant="subtitle1"
                        sx={{ color: "#73573f", fontWeight: 600 }}
                      >
                        Sizes and Quantities
                      </Typography>
                      <Button
                        variant="outlined"
                        size="small"
                        startIcon={<Plus size={16} />}
                        onClick={addSizeQuantity}
                        sx={{
                          borderColor: "#73573f",
                          color: "#73573f",
                          textTransform: "none",
                          "&:hover": {
                            borderColor: "#8b6f4f",
                            backgroundColor: "#73573f15",
                          },
                        }}
                      >
                        Add
                      </Button>
                    </Box>

                    {formData.sizesAndQuantities.length === 0 ? (
                      <Paper
                        elevation={0}
                        sx={{
                          p: 2,
                          border: "1px dashed #d0d0d0",
                          borderRadius: 2,
                          textAlign: "center",
                          color: "#999",
                        }}
                      >
                        <Typography variant="body2">
                          No sizes and quantities added. Click &quot;Add&quot; to add one.
                        </Typography>
                      </Paper>
                    ) : (
                      <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                        {formData.sizesAndQuantities.map((item, index) => (
                          <Box
                            key={index}
                            sx={{
                              display: "flex",
                              gap: 2,
                              alignItems: "flex-start",
                            }}
                          >
                            <TextField
                              label="Size"
                              fullWidth
                              value={item.size}
                              onChange={(e) =>
                                updateSizeQuantity(index, "size", e.target.value)
                              }
                              placeholder="e.g., Small, Medium, Large"
                              sx={{
                                "& .MuiOutlinedInput-root": {
                                  "& fieldset": {
                                    borderColor: "#d0d0d0",
                                  },
                                  "&:hover fieldset": {
                                    borderColor: "#73573f",
                                  },
                                  "&.Mui-focused fieldset": {
                                    borderColor: "#73573f",
                                  },
                                },
                                "& .MuiInputLabel-root.Mui-focused": {
                                  color: "#73573f",
                                },
                              }}
                            />
                            <TextField
                              label="Quantity"
                              fullWidth
                              value={item.quantity}
                              onChange={(e) =>
                                updateSizeQuantity(index, "quantity", e.target.value)
                              }
                              placeholder="e.g., 10, 20, 30"
                              sx={{
                                "& .MuiOutlinedInput-root": {
                                  "& fieldset": {
                                    borderColor: "#d0d0d0",
                                  },
                                  "&:hover fieldset": {
                                    borderColor: "#73573f",
                                  },
                                  "&.Mui-focused fieldset": {
                                    borderColor: "#73573f",
                                  },
                                },
                                "& .MuiInputLabel-root.Mui-focused": {
                                  color: "#73573f",
                                },
                              }}
                            />
                            <IconButton
                              onClick={() => removeSizeQuantity(index)}
                              sx={{
                                color: "error.main",
                                mt: 1,
                                "&:hover": {
                                  backgroundColor: "error.light",
                                },
                              }}
                            >
                              <X size={20} />
                            </IconButton>
                          </Box>
                        ))}
                      </Box>
                    )}
                  </Box>
                </Box>
              </Box>

              {/* Image Upload Section */}
              <Box sx={{ mb: 4 }}>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 1,
                    mb: 3,
                    pb: 1.5,
                    borderBottom: "2px solid",
                    borderColor: "#73573f",
                  }}
                >
                  <ImageIcon size={20} color="#73573f" />
                  <Typography
                    variant="h6"
                    fontWeight="600"
                    sx={{ color: "#73573f" }}
                  >
                    Product Images
                  </Typography>
                </Box>

                <Box sx={{ mb: 2 }}>
                  <Button
                    variant="outlined"
                    component="label"
                    startIcon={<ImageIcon size={18} />}
                    sx={{
                      borderColor: "#73573f",
                      color: "#73573f",
                      textTransform: "none",
                      fontWeight: 500,
                      px: 3,
                      py: 1,
                      "&:hover": {
                        borderColor: "#73573f",
                        backgroundColor: "#73573f15",
                      },
                    }}
                  >
                    Choose Images
                    <input
                      type="file"
                      accept="image/*"
                      multiple
                      hidden
                      onChange={handleImageChange}
                    />
                  </Button>
                </Box>

                <Paper
                  elevation={0}
                  onDrop={handleDrop}
                  onDragOver={handleDragOver}
                  onPaste={handlePaste}
                  sx={{
                    border: "2px dashed #73573f",
                    borderRadius: 2,
                    backgroundColor: formData.images.length > 0 ? "#fff" : "#fafafa",
                    minHeight: "200px",
                    p: 2,
                    display: "flex",
                    flexDirection: "column",
                    alignItems:
                      formData.images.length === 0 ? "center" : "flex-start",
                    justifyContent:
                      formData.images.length === 0 ? "center" : "flex-start",
                    cursor: "pointer",
                    transition: "all 0.3s ease",
                    "&:hover": {
                      backgroundColor: "#f5f5f5",
                      borderColor: "#8b6f4f",
                    },
                  }}
                >
                  {imagePreviews.length > 0 ? (
                    <Box
                      sx={{
                        display: "flex",
                        gap: 2,
                        flexWrap: "wrap",
                        width: "100%",
                      }}
                    >
                      {imagePreviews.map((preview, index) => (
                        <Box
                          key={index}
                          sx={{
                            position: "relative",
                            minWidth: "180px",
                            maxWidth: "180px",
                          }}
                        >
                          <Box
                            sx={{
                              position: "relative",
                              borderRadius: 2,
                              overflow: "hidden",
                              boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
                              border: "2px solid #e0e0e0",
                            }}
                          >
                            <Image
                              src={preview}
                              alt={`Preview ${index + 1}`}
                              width={180}
                              height={135}
                              style={{
                                objectFit: "cover",
                                width: "100%",
                                height: "135px",
                                display: "block",
                              }}
                            />
                            <Button
                              onClick={() => removeImage(index)}
                              variant="contained"
                              size="small"
                              sx={{
                                position: "absolute",
                                top: 8,
                                right: 8,
                                minWidth: "32px",
                                width: "32px",
                                height: "32px",
                                borderRadius: "50%",
                                padding: 0,
                                backgroundColor: "error.main",
                                color: "white",
                                fontSize: "18px",
                                fontWeight: "bold",
                                "&:hover": {
                                  backgroundColor: "error.dark",
                                },
                                boxShadow: "0 2px 4px rgba(0,0,0,0.2)",
                              }}
                            >
                              ×
                            </Button>
                          </Box>
                          <Typography
                            variant="caption"
                            sx={{
                              display: "block",
                              textAlign: "center",
                              mt: 1,
                              color: "#666",
                            }}
                          >
                            Image {index + 1}
                          </Typography>
                        </Box>
                      ))}
                    </Box>
                  ) : (
                    <Box
                      sx={{
                        textAlign: "center",
                        color: "#999",
                      }}
                    >
                      <ImageIcon size={48} style={{ marginBottom: 8, opacity: 0.5 }} />
                      <Typography variant="body1" sx={{ fontWeight: 500, mb: 1 }}>
                        Drag & Drop images here
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        or paste from clipboard
                      </Typography>
                    </Box>
                  )}
                </Paper>
              </Box>

              {/* Submit Button */}
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "flex-end",
                  gap: 2,
                  pt: 2,
                  borderTop: "1px solid #e0e0e0",
                }}
              >
                <Button
                  variant="outlined"
                  onClick={() => router.back()}
                  sx={{
                    borderColor: "#73573f",
                    color: "#73573f",
                    textTransform: "none",
                    px: 4,
                    py: 1.5,
                    fontWeight: 500,
                    "&:hover": {
                      borderColor: "#8b6f4f",
                      backgroundColor: "#73573f15",
                    },
                  }}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  variant="contained"
                  disabled={loading}
                  startIcon={
                    loading ? (
                      <CircularProgress size={20} color="inherit" />
                    ) : (
                      <Package size={20} />
                    )
                  }
                  sx={{
                    backgroundColor: "#73573f",
                    textTransform: "none",
                    px: 4,
                    py: 1.5,
                    fontWeight: 600,
                    "&:hover": {
                      backgroundColor: "#8b6f4f",
                    },
                    "&:disabled": {
                      backgroundColor: "#a0a0a0",
                    },
                  }}
                >
                  {loading ? "Adding Product..." : "Add Product"}
                </Button>
              </Box>
            </CardContent>
          </Card>
        </form>
      </Box>
    </Box>
  );
};

export default AddProduct;
