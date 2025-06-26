"use client";
import React, { useState, useEffect } from "react";
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { useAdminAuth } from "@/hooks/useAdminAuth";
import {
  Typography,
  CircularProgress,
  Box,
  IconButton,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button,
} from "@mui/material";
import { DataGrid, GridColDef, GridPaginationModel } from "@mui/x-data-grid";
import { Trash2 } from "lucide-react";

interface Contact {
  id: string;
  name: string;
  email: string;
  message: string;
  createdAt: string;
  phone?: string;
  subject?: string;
}

export default function AdminDashboard() {
  const { isAdminUser, loading: authLoading } = useAdminAuth();
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [paginationModel, setPaginationModel] = useState<GridPaginationModel>({
    pageSize: 10,
    page: 0,
  });

  const [openDialog, setOpenDialog] = useState(false);
  const [selectedId, setSelectedId] = useState<string | null>(null);

  useEffect(() => {
    if (!authLoading && isAdminUser) {
      const fetchContacts = async () => {
        try {
          const querySnapshot = await getDocs(collection(db, "contacts"));
          const contactsData = querySnapshot.docs.map((doc) => ({
            id: doc.id,
            ...(doc.data() as Omit<Contact, "id">),
          }));
          setContacts(contactsData);
        } catch (error) {
          console.error("Error fetching contacts:", error);
        } finally {
          setLoading(false);
        }
      };

      fetchContacts();
    }
  }, [authLoading, isAdminUser]);

  // Show loading while checking authentication
  if (authLoading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="50vh"
      >
        <CircularProgress />
      </Box>
    );
  }

  // Don't render if not admin
  if (!isAdminUser) {
    return null;
  }

  const handleDelete = async () => {
    if (!selectedId) return;

    try {
      await deleteDoc(doc(db, "contacts", selectedId));
      setContacts((prev) => prev.filter((c) => c.id !== selectedId));
    } catch (error) {
      console.error("Error deleting contact:", error);
    } finally {
      setOpenDialog(false);
      setSelectedId(null);
    }
  };

  const columns: GridColDef[] = [
    { field: "date", headerName: "Date", flex: 1 },
    { field: "name", headerName: "Name", flex: 1 },
    { field: "email", headerName: "Email", flex: 2 },
    { field: "message", headerName: "Message", flex: 2 },
    { field: "phone", headerName: "Phone", flex: 1 },
    { field: "subject", headerName: "Subject", flex: 1 },
    {
      field: "actions",
      headerName: "Actions",
      flex: 0.5,
      sortable: false,
      filterable: false,
      renderCell: (params) => (
        <IconButton
          onClick={() => {
            setSelectedId(params.row.id);
            setOpenDialog(true);
          }}
          color="error"
        >
          <Trash2 size={18} />
        </IconButton>
      ),
    },
  ];

  return (
    <Box sx={{ paddingTop: 8, paddingBottom: 8 }}>
      <Typography variant="h4" fontWeight="bold" gutterBottom>
        Admin Dashboard - Contacts
      </Typography>

      {loading ? (
        <Box display="flex" justifyContent="center" mt={4}>
          <CircularProgress />
        </Box>
      ) : (
        <Box sx={{ height: 600, width: "100%", mt: 4 }}>
          <DataGrid
            rows={contacts}
            columns={columns}
            paginationModel={paginationModel}
            onPaginationModelChange={setPaginationModel}
            pageSizeOptions={[5, 10, 20]}
            disableRowSelectionOnClick
          />
        </Box>
      )}

      {/* Confirm Delete Dialog */}
      <Dialog
        open={openDialog}
        onClose={() => setOpenDialog(false)}
        aria-labelledby="confirm-delete-title"
      >
        <DialogTitle id="confirm-delete-title">Confirm Delete</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this contact entry? This action
            cannot be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
          <Button color="error" onClick={handleDelete}>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
