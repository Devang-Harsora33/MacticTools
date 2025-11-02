"use client";

import React, { useEffect, useState } from "react";
import {
  collection,
  getDocs,
  deleteDoc,
  doc,
  updateDoc,
} from "firebase/firestore";
import { db, storage } from "@/lib/firebase";
import { ref, deleteObject, listAll } from "firebase/storage";
import {
  Box,
  Typography,
  CircularProgress,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  IconButton,
} from "@mui/material";
import {
  DataGrid,
  GridColDef,
  GridRenderCellParams,
  GridPaginationModel,
} from "@mui/x-data-grid";
import Image from "next/image";
import { Trash2, Plus, X } from "lucide-react";
import dayjs from "dayjs";

interface SizeQuantity {
  size: string;
  quantity: string;
}

interface Product {
  id: string;
  name: string;
  description?: string;
  category: string;
  sizesAndQuantities?: SizeQuantity[];
  createdAt: string;
  updatedAt: string;
  images: string[];
}

const ProductsPage = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [paginationModel, setPaginationModel] = useState<GridPaginationModel>({
    pageSize: 20,
    page: 0,
  });

  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [editName, setEditName] = useState("");
  const [editDescription, setEditDescription] = useState("");
  const [editCategory, setEditCategory] = useState("");
  const [editSizesAndQuantities, setEditSizesAndQuantities] = useState<SizeQuantity[]>([]);

  const fetchProducts = async () => {
    try {
      const snapshot = await getDocs(collection(db, "products"));
      const productsData = snapshot.docs.map((doc) => {
        const data = doc.data();
        return {
          id: doc.id,
          name: data.name,
          description: data.description || "",
          category: data.category,
          sizesAndQuantities: data.sizesAndQuantities || [],
          createdAt: data.createdAt?.toDate()
            ? dayjs(data.createdAt.toDate()).format("DD-MM-YYYY HH:mm")
            : "",
          updatedAt: data.updatedAt?.toDate()
            ? dayjs(data.updatedAt.toDate()).format("DD-MM-YYYY HH:mm")
            : "",
          images: data.images || [],
        } as Product;
      });
      setProducts(productsData);
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchProducts();
  }, []);

  const handleEdit = (product: Product) => {
    setSelectedProduct(product);
    setEditName(product.name);
    setEditDescription(product.description || "");
    setEditCategory(product.category);
    setEditSizesAndQuantities(product.sizesAndQuantities || []);
    setEditDialogOpen(true);
  };

  const addSizeQuantity = () => {
    setEditSizesAndQuantities((prev) => [...prev, { size: "", quantity: "" }]);
  };

  const removeSizeQuantity = (index: number) => {
    setEditSizesAndQuantities((prev) => prev.filter((_, i) => i !== index));
  };

  const updateSizeQuantity = (index: number, field: "size" | "quantity", value: string) => {
    setEditSizesAndQuantities((prev) =>
      prev.map((item, i) => (i === index ? { ...item, [field]: value } : item))
    );
  };

  const handleDelete = (product: Product) => {
    setSelectedProduct(product);
    setDeleteDialogOpen(true);
  };

  const confirmDelete = async () => {
    if (selectedProduct) {
      try {
        // Delete all images from the product's folder in Firebase Storage
        if (selectedProduct.images && selectedProduct.images.length > 0) {
          try {
            // Extract storage path from Firebase Storage URL
            // URL format: https://firebasestorage.googleapis.com/v0/b/{bucket}/o/{encodedPath}?alt=media&token=...
            const imageUrl = selectedProduct.images[0];
            const urlMatch = imageUrl.match(/\/o\/([^?]+)/);
            
            if (urlMatch && urlMatch[1]) {
              // Decode the URL-encoded path
              const encodedPath = urlMatch[1];
              const storagePath = decodeURIComponent(encodedPath);
              
              // Extract folder path (everything except the filename)
              const lastSlashIndex = storagePath.lastIndexOf("/");
              
              if (lastSlashIndex > 0) {
                const folderPath = storagePath.substring(0, lastSlashIndex);
                const folderRef = ref(storage, folderPath);

                // List all files in the folder
                const result = await listAll(folderRef);

                // Delete each file in the folder
                await Promise.all(result.items.map((item) => deleteObject(item)));
              } else if (storagePath) {
                // If no folder structure, delete the file directly
                await deleteObject(ref(storage, storagePath));
              }
            } else {
              // If URL doesn't match expected format, try to extract path directly
              console.warn("Could not extract storage path from URL, attempting direct deletion");
            }
          } catch (error) {
            console.error("Error deleting images from storage:", error);
            // Continue with Firestore deletion even if storage deletion fails
          }
        }

        // Delete document from Firestore
        await deleteDoc(doc(db, "products", selectedProduct.id));
        setDeleteDialogOpen(false);
        setSelectedProduct(null);
        fetchProducts();
      } catch (error) {
        console.error("Error deleting product:", error);
      }
    }
  };

  const confirmEdit = async () => {
    if (selectedProduct) {
      await updateDoc(doc(db, "products", selectedProduct.id), {
        name: editName,
        description: editDescription,
        category: editCategory,
        sizesAndQuantities: editSizesAndQuantities,
        // Keep images as-is (not editable)
        updatedAt: new Date(),
      });
      setEditDialogOpen(false);
      setSelectedProduct(null);
      fetchProducts();
    }
  };

  const columns: GridColDef[] = [
    {
      field: "srNo",
      headerName: "Sr No.",
      width: 90,
      sortable: false,
      renderCell: (params) => {
        const index =
          paginationModel.page * paginationModel.pageSize +
          (params.api.getSortedRowIds().indexOf(params.id) ?? 0) +
          1;
        return index;
      },
    },
    {
      field: "images",
      headerName: "Image",
      flex: 1,
      sortable: false,
      renderCell: (params: GridRenderCellParams) => (
        <Box
          position="relative"
          width={80}
          height={80}
          sx={{ borderRadius: 1, overflow: "hidden" }}
        >
          {params.value?.[0] && (
            <Image
              src={params.value[0]}
              alt="Product"
              fill
              style={{ objectFit: "cover" }}
            />
          )}
        </Box>
      ),
    },
    { field: "name", headerName: "Name", flex: 1 },
    { field: "category", headerName: "Category", flex: 1 },
    // { field: "inStock", headerName: "In Stock", flex: 1, type: "boolean" },
    { field: "createdAt", headerName: "Created At", flex: 1 },
    { field: "updatedAt", headerName: "Updated At", flex: 1 },
    {
      field: "actions",
      headerName: "Actions",
      flex: 1,
      sortable: false,
      renderCell: (params: GridRenderCellParams) => (
        <Box display="flex" gap={1} sx={{ pt: 1 }}>
          <Button
            variant="outlined"
            size="small"
            onClick={() => handleEdit(params.row)}
          >
            Edit
          </Button>
          <IconButton
            color="error"
            onClick={() => handleDelete(params.row)}
            size="small"
          >
            <Trash2 size={18} />
          </IconButton>
        </Box>
      ),
    },
  ];

  return (
    <Box sx={{ paddingTop: 8, paddingBottom: 8 }}>
      <Typography variant="h4" fontWeight="bold" gutterBottom>
        Products
      </Typography>

      {loading ? (
        <Box display="flex" justifyContent="center" mt={4}>
          <CircularProgress />
        </Box>
      ) : (
        <Box sx={{ height: 600, width: "100%", mt: 4 }}>
          <DataGrid
            rows={products}
            columns={columns}
            paginationModel={paginationModel}
            onPaginationModelChange={setPaginationModel}
            pageSizeOptions={[10, 20, 50]}
            disableRowSelectionOnClick
          />
        </Box>
      )}

      {/* Edit Dialog */}
      <Dialog
        open={editDialogOpen}
        onClose={() => setEditDialogOpen(false)}
        maxWidth="md"
        sx={{ fontFamily: "SF Pro Display" }}
        fullWidth
      >
        <DialogTitle sx={{ fontFamily: "SF Pro Display", pb: 1 }}>
          Edit Product
        </DialogTitle>

        <DialogContent sx={{ pt: 1, fontFamily: "SF Pro Display" }}>
          <Box display="flex" flexDirection="column" gap={3} mt={1}>
            <TextField
              label="Product Name"
              value={editName}
              onChange={(e) => setEditName(e.target.value)}
              fullWidth
              variant="outlined"
              required
            />
            <TextField
              label="Category"
              value={editCategory}
              onChange={(e) => setEditCategory(e.target.value)}
              fullWidth
              variant="outlined"
              required
            />
            <TextField
              label="Description"
              value={editDescription}
              onChange={(e) => setEditDescription(e.target.value)}
              fullWidth
              variant="outlined"
              multiline
              rows={4}
              required
            />

            {/* Sizes and Quantities Section */}
            <Box>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  mb: 2,
                }}
              >
                <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                  Sizes and Quantities
                </Typography>
                <Button
                  variant="outlined"
                  size="small"
                  startIcon={<Plus size={16} />}
                  onClick={addSizeQuantity}
                  sx={{
                    textTransform: "none",
                  }}
                >
                  Add
                </Button>
              </Box>

              {editSizesAndQuantities.length === 0 ? (
                <Box
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
                </Box>
              ) : (
                <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                  {editSizesAndQuantities.map((item, index) => (
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
                      />
                      <TextField
                        label="Quantity"
                        fullWidth
                        value={item.quantity}
                        onChange={(e) =>
                          updateSizeQuantity(index, "quantity", e.target.value)
                        }
                        placeholder="e.g., 10, 20, 30"
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
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 2 }}>
          <Button variant="text" onClick={() => setEditDialogOpen(false)}>
            Cancel
          </Button>
          <Button variant="contained" onClick={confirmEdit}>
            Save
          </Button>
        </DialogActions>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog
        open={deleteDialogOpen}
        onClose={() => setDeleteDialogOpen(false)}
        PaperProps={{
          sx: {
            borderRadius: 2,
            p: 1,
          },
        }}
      >
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          <Typography sx={{ mt: 1 }}>
            Are you sure you want to delete this product{" "}
            <strong>{selectedProduct?.name}</strong>? This action cannot be
            undone.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => setDeleteDialogOpen(false)}
            sx={{ color: "#1976d2" }}
          >
            CANCEL
          </Button>
          <Button onClick={confirmDelete} sx={{ color: "#d32f2f" }}>
            DELETE
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default ProductsPage;
