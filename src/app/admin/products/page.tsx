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
import { Trash2 } from "lucide-react";
import dayjs from "dayjs";

interface Product {
  id: string;
  name: string;
  category: string;
  inStock: boolean;
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
  const [editCategory, setEditCategory] = useState("");
  const [editImage, setEditImage] = useState("");
  const [editInStock, setEditInStock] = useState(true);

  const fetchProducts = async () => {
    try {
      const snapshot = await getDocs(collection(db, "products"));
      const productsData = snapshot.docs.map((doc) => {
        const data = doc.data();
        return {
          id: doc.id,
          name: data.name,
          category: data.category,
          inStock: data.inStock,
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
    setEditCategory(product.category);
    setEditImage(product.images?.[0] || "");
    setEditInStock(product.inStock);
    setEditDialogOpen(true);
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
          // Get the folder path from the first image URL
          const imagePath = selectedProduct.images[0];
          const folderPath = imagePath.substring(0, imagePath.lastIndexOf("/"));
          const folderRef = ref(storage, folderPath);

          // List all files in the folder
          const result = await listAll(folderRef);

          // Delete each file in the folder
          await Promise.all(result.items.map((item) => deleteObject(item)));

          // Delete the folder itself
          await deleteObject(folderRef);
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
        category: editCategory,
        inStock: editInStock,
        images: editImage ? [editImage] : [],
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
    { field: "inStock", headerName: "In Stock", flex: 1, type: "boolean" },
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
        maxWidth="sm"
        sx={{ fontFamily: "SF Pro Display" }}
        fullWidth
      >
        <DialogTitle sx={{ fontFamily: "SF Pro Display", pb: 1 }}>
          Edit Product
        </DialogTitle>

        <DialogContent sx={{ pt: 1, fontFamily: "SF Pro Display" }}>
          <Box display="flex" flexDirection="column" gap={3} mt={1}>
            <TextField
              label="Name"
              value={editName}
              onChange={(e) => setEditName(e.target.value)}
              fullWidth
              variant="outlined"
            />
            <TextField
              label="Category"
              value={editCategory}
              onChange={(e) => setEditCategory(e.target.value)}
              fullWidth
              variant="outlined"
            />
            {/* Optional: Add image URL input back if needed
      <TextField
        label="Image URL"
        value={editImage}
        onChange={(e) => setEditImage(e.target.value)}
        fullWidth
        variant="outlined"
      />
      */}
            <Box display="flex" alignItems="center" gap={2}>
              <Typography variant="body1">In Stock:</Typography>
              <input
                type="checkbox"
                checked={editInStock}
                onChange={(e) => setEditInStock(e.target.checked)}
                style={{ transform: "scale(1.3)", cursor: "pointer" }}
              />
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
