"use client";

import React, { useState } from "react";
import { db, storage } from "@/lib/firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { useRouter } from "next/navigation";
import Image from "next/image";
import {
  Box,
  Button,
  Checkbox,
  CircularProgress,
  FormControlLabel,
  MenuItem,
  TextField,
  Typography,
} from "@mui/material";
import toast from "react-hot-toast";

const AddProduct = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    rating: 1,
    inStock: true,
    images: [] as File[],
  });
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);

  const addFiles = (files: FileList | File[]) => {
    const fileArray = Array.from(files);
    setFormData((prev) => ({
      ...prev,
      images: [...prev.images, ...fileArray],
    }));

    const newPreviews = fileArray.map((file) => URL.createObjectURL(file));
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
    setFormData((prev) => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index),
    }));
    setImagePreviews((prev) => prev.filter((_, i) => i !== index));
  };

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
    if (!formData.category.trim()) {
      toast.error("Category is required");
      setLoading(false);
      return;
    }
    if (!formData.rating) {
      toast.error("Rating is required");
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
          const storageRef = ref(
            storage,
            `products/${productFolderName}/${Date.now()}-${file.name}`
          );
          await uploadBytes(storageRef, file);
          return await getDownloadURL(storageRef);
        })
      );

      const productData = {
        ...formData,
        images: imageUrls,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      };

      await addDoc(collection(db, "products"), productData);
      router.push("/products");
    } catch (err) {
      setError("Failed to add product. Please try again.");
      console.error("Error adding product:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      mx="auto"
      p={4}
      sx={{
        backgroundColor: "#fdfbf7",
        width: "100%",
        paddingY: "15rem",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      <Typography
        variant="h4"
        fontWeight="bold"
        mb={4}
        sx={{ color: "#73573f" }}
      >
        Add New Product
      </Typography>

      {error && (
        <Box
          bgcolor="error.light"
          color="error.main"
          p={2}
          mb={2}
          borderRadius={2}
        >
          {error}
        </Box>
      )}

      <form onSubmit={handleSubmit}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 3,
            width: "100%",
            maxWidth: "600px",
          }}
        >
          <Box>
            <TextField
              label="Product Name"
              name="name"
              fullWidth
              required
              value={formData.name}
              onChange={handleInputChange}
            />
          </Box>

          <Box>
            <TextField
              label="Category"
              name="category"
              fullWidth
              required
              value={formData.category}
              onChange={handleInputChange}
            />
          </Box>
          <Box>
            <TextField
              select
              label="Rating"
              name="rating"
              fullWidth
              required
              value={formData.rating}
              onChange={handleInputChange}
            >
              {[1, 2, 3, 4, 5].map((num) => (
                <MenuItem key={num} value={num}>
                  {num}
                </MenuItem>
              ))}
            </TextField>
          </Box>

          <Box>
            <FormControlLabel
              control={
                <Checkbox
                  name="inStock"
                  checked={formData.inStock}
                  onChange={handleInputChange}
                  sx={{
                    color: "#73573f",
                    "&.Mui-checked": {
                      color: "#73573f",
                    },
                  }}
                />
              }
              label="In Stock"
              sx={{ color: "#73573f" }}
            />
          </Box>

          <Box>
            <Typography variant="subtitle1" gutterBottom>
              Upload Images
            </Typography>

            <Button
              variant="outlined"
              component="label"
              sx={{
                mb: 2,
                borderColor: "#73573f",
                color: "#73573f",
                "&:hover": {
                  borderColor: "#73573f",
                  backgroundColor: "#f5f5f5",
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

            <Box
              display="flex"
              gap={2}
              overflow="auto"
              py={1}
              px={1}
              onDrop={handleDrop}
              onDragOver={handleDragOver}
              onPaste={handlePaste}
              sx={{
                border: "2px dashed #73573f",
                borderRadius: "8px",
                backgroundColor: "#fff",
                minHeight: "150px",
                alignItems: "center",
                justifyContent:
                  formData.images.length === 0 ? "center" : "flex-start",
                cursor: "pointer",
                "&:hover": {
                  backgroundColor: "#f9f9f9",
                },
              }}
            >
              {imagePreviews.length > 0 ? (
                imagePreviews.map((preview, index) => (
                  <Box key={index} position="relative" minWidth="160px">
                    <Image
                      src={preview}
                      alt={`Preview ${index + 1}`}
                      width={160}
                      height={120}
                      style={{
                        objectFit: "cover",
                        borderRadius: "8px",
                        width: "100%",
                        height: "120px",
                      }}
                    />
                    <Button
                      onClick={() => removeImage(index)}
                      variant="contained"
                      size="small"
                      color="error"
                      sx={{
                        position: "absolute",
                        top: 5,
                        right: 5,
                        minWidth: "24px",
                        width: "24px",
                        height: "24px",
                        borderRadius: "50%",
                        padding: 0,
                        fontSize: "14px",
                      }}
                    >
                      ×
                    </Button>
                  </Box>
                ))
              ) : (
                <Typography color="#777" textAlign="center">
                  Drag & Drop or Paste images here
                </Typography>
              )}
            </Box>
          </Box>

          <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
            <Button
              type="submit"
              variant="contained"
              disabled={loading}
              sx={{
                backgroundColor: "#73573f",
                "&:hover": {
                  backgroundColor: "#031a33",
                },
                height: "3rem",
                cursor: "pointer",
              }}
            >
              {loading ? (
                <CircularProgress size={24} color="inherit" />
              ) : (
                "Add Product"
              )}
            </Button>
          </Box>
        </Box>
      </form>
    </Box>
  );
};

export default AddProduct;
