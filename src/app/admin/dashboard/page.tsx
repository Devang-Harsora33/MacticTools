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
import { Trash2, RefreshCw } from "lucide-react";

interface Contact {
  id: string;
  name: string;
  email: string;
  message: string;
  createdAt: string;
  phone?: string;
  subject?: string;
  date?: string | Date | { toDate: () => Date };
  timestamp?: string | Date | { toDate: () => Date };
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
  const [refreshing, setRefreshing] = useState<boolean>(false);

  const formatDate = (dateValue: string | Date | { toDate: () => Date } | undefined): string => {
    if (!dateValue) return "";
    
    let date: Date;
    
    // Handle different date formats
    if (dateValue instanceof Date) {
      date = dateValue;
    } else if (typeof dateValue === "object" && "toDate" in dateValue && typeof dateValue.toDate === "function") {
      // Firestore Timestamp
      date = dateValue.toDate();
    } else if (typeof dateValue === "string") {
      // Handle string dates - common formats: MM/DD/YYYY, DD/MM/YYYY, etc.
      const parts = dateValue.split(/[/-]/);
      if (parts.length === 3) {
        // Assume MM/DD/YYYY format (US format from toLocaleDateString)
        const month = parseInt(parts[0], 10);
        const day = parseInt(parts[1], 10);
        const year = parseInt(parts[2], 10);
        date = new Date(year, month - 1, day);
        
        // Validate the date
        if (
          date.getFullYear() === year &&
          date.getMonth() === month - 1 &&
          date.getDate() === day
        ) {
          // Valid date
        } else {
          // Try DD/MM/YYYY format instead
          const day2 = parseInt(parts[0], 10);
          const month2 = parseInt(parts[1], 10);
          const year2 = parseInt(parts[2], 10);
          date = new Date(year2, month2 - 1, day2);
        }
      } else {
        // Try standard Date parsing
        date = new Date(dateValue);
        if (isNaN(date.getTime())) {
          return dateValue; // Return as-is if can't parse
        }
      }
    } else {
      return String(dateValue);
    }
    
    // Format as DD/MM/YYYY
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  const fetchContacts = async () => {
    try {
      setLoading(true);
      const querySnapshot = await getDocs(collection(db, "contacts"));
      const contactsData = querySnapshot.docs.map((doc) => {
        const data = doc.data() as Omit<Contact, "id">;
        return {
          id: doc.id,
          ...data,
          date: formatDate(data.date || data.timestamp),
        };
      });
      setContacts(contactsData);
    } catch (error) {
      console.error("Error fetching contacts:", error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    if (!authLoading && isAdminUser) {
      fetchContacts();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [authLoading, isAdminUser]);

  const handleRefresh = async () => {
    setRefreshing(true);
    await fetchContacts();
  };

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
      <Box display="flex" alignItems="center" justifyContent="space-between" mb={2}>
        <Typography variant="h4" fontWeight="bold">
          Admin Dashboard - Contacts
        </Typography>
        <IconButton
          onClick={handleRefresh}
          disabled={loading || refreshing}
          color="primary"
          sx={{
            "&:hover": {
              backgroundColor: "action.hover",
            },
          }}
          aria-label="Refresh data"
        >
          <RefreshCw
            size={20}
            color="white"
            style={{
              animation: refreshing ? "spin 1s linear infinite" : "none",
            }}
          />
        </IconButton>
      </Box>

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
