"use client";

import React from "react";
import Link from "next/link";
import { Product } from "@/types/product";
import {
  TextField,
  InputAdornment,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Box,
  Typography,
  Pagination,
  Stack,
  Chip,
  Skeleton,
} from "@mui/material";
import { Search as SearchIcon } from "@mui/icons-material";
import Image from "next/image";

interface ProductsClientProps {
  initialProducts: Product[];
}

export default function ProductsClient({
  initialProducts,
}: ProductsClientProps) {
  const [products, setProducts] = React.useState<Product[]>(initialProducts);
  const [searchQuery, setSearchQuery] = React.useState("");
  const [category, setCategory] = React.useState("");
  const [sortBy, setSortBy] = React.useState("");
  const [currentPage, setCurrentPage] = React.useState(1);
  const [loading, setLoading] = React.useState(false);

  const itemsPerPage = 9;
  const [categories, setCategories] = React.useState<string[]>([]);

  React.useEffect(() => {
    const uniqueCategories = Array.from(
      new Set(
        initialProducts
          .map((product) => product.category)
          .filter((cat): cat is string => cat !== undefined)
      )
    );
    setCategories(uniqueCategories);
  }, [initialProducts]);

  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesCategory = category ? product.category === category : true;
    return matchesSearch && matchesCategory;
  });

  // Sort products based on selected option
  const sortedProducts = React.useMemo(() => {
    const sorted = [...filteredProducts];
    switch (sortBy) {
      case "A-Z":
        sorted.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case "Z-A":
        sorted.sort((a, b) => b.name.localeCompare(a.name));
        break;
      case "RATING":
        sorted.sort((a, b) => (b.rating || 0) - (a.rating || 0));
        break;
      default:
        break;
    }
    return sorted;
  }, [filteredProducts, sortBy]);

  const totalPages = Math.ceil(sortedProducts.length / itemsPerPage);
  const startIdx = (currentPage - 1) * itemsPerPage;
  const currentProducts = sortedProducts.slice(
    startIdx,
    startIdx + itemsPerPage
  );

  const renderSkeletons = () => {
    return Array.from({ length: itemsPerPage }).map((_, index) => (
      <div
        key={index}
        className="bg-[#fdfbf7] rounded-3xl shadow-lg overflow-hidden w-[23rem]"
      >
        <Skeleton variant="rectangular" width="100%" height={256} />
        <Box sx={{ p: 3 }}>
          <Skeleton variant="text" width="60%" height={30} />
          <Skeleton variant="text" width="40%" height={20} sx={{ my: 1 }} />
          <Skeleton variant="text" width="90%" height={20} />
          <Box sx={{ mt: 2 }}>
            <Skeleton variant="rectangular" width="50%" height={36} />
          </Box>
        </Box>
      </div>
    ));
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        bgcolor: "#fdfbf7",
        pt: { xs: 12, sm: 15 },
        pb: { xs: 20, sm: 20 },
      }}
    >
      <nav
        className="absolute top-[7rem] sm:top-[11rem] left-[1rem] sm:left-[4rem] font-sf-pro rounded-md px-4 py-2 z-50"
        aria-label="Breadcrumb"
      >
        <ol className="flex items-center space-x-2 text-md text-[#73573f]">
          <li>
            <Link href="/" className="hover:underline font-medium">
              Home
            </Link>
          </li>
          <li>/</li>
          <li className="font-sf-pro-semibold" aria-current="page">
            Products
          </li>
        </ol>
      </nav>

      <Box
        sx={{ maxWidth: "lg", mx: "auto", px: { xs: 1, sm: 2, md: 3, lg: 4 } }}
      >
        {/* Header */}
        <Box sx={{ textAlign: "center", mb: { xs: 2, sm: 4 } }}>
          <Typography
            variant="h3"
            component="h1"
            gutterBottom
            sx={{
              color: "#73573f",
              pt: { xs: "5rem", md: "0" },
              fontSize: { xs: "2rem", sm: "2.5rem", md: "3rem" },
            }}
          >
            Our Products
          </Typography>
          <Typography
            variant="h6"
            sx={{
              color: "#73573f",
              fontSize: { xs: "1rem", sm: "1.25rem" },
            }}
          >
            Discover our premium selection of products
          </Typography>
        </Box>

        {/* Search and Category Filter */}
        <Box sx={{ mb: { xs: 2, sm: 4 } }}>
          <Box
            sx={{
              display: "flex",
              flexDirection: { xs: "column", sm: "row" },
              gap: 2,
            }}
          >
            <Box sx={{ flex: 1 }}>
              <TextField
                fullWidth
                size="medium"
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setCurrentPage(1);
                }}
                placeholder="Search products..."
                sx={{
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": { borderColor: "#73573f" },
                    "&:hover fieldset": { borderColor: "#73573f" },
                    "&.Mui-focused fieldset": { borderColor: "#73573f" },
                  },
                  "& .MuiInputAdornment-root": { color: "#73573f" },
                }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon />
                    </InputAdornment>
                  ),
                }}
              />
            </Box>

            <Box
              sx={{
                display: "flex",
                flexDirection: { xs: "column", sm: "row" },
                gap: 2,
                justifyContent: { xs: "stretch", sm: "flex-end" },
              }}
            >
              {/* Category */}
              <FormControl
                sx={{ minWidth: { xs: "100%", sm: 120 } }}
                size="medium"
              >
                <InputLabel
                  sx={{
                    color: "#73573f",
                    "&.Mui-focused": { color: "#73573f" },
                  }}
                >
                  Category
                </InputLabel>
                <Select
                  value={category}
                  onChange={(e) => {
                    setCategory(e.target.value);
                    setCurrentPage(1);
                  }}
                  label="Category"
                  sx={{
                    "& .MuiOutlinedInput-notchedOutline": {
                      borderColor: "#73573f",
                    },
                    "&:hover .MuiOutlinedInput-notchedOutline": {
                      borderColor: "#73573f",
                    },
                    "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                      borderColor: "#73573f",
                    },
                  }}
                >
                  <MenuItem value="">All Categories</MenuItem>
                  {categories.map((cat) => (
                    <MenuItem key={cat} value={cat}>
                      {cat}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              {/* Sort By */}
              <FormControl
                sx={{ minWidth: { xs: "100%", sm: 120 } }}
                size="medium"
              >
                <InputLabel
                  sx={{
                    color: "#73573f",
                    "&.Mui-focused": { color: "#73573f" },
                  }}
                >
                  Sort By
                </InputLabel>
                <Select
                  value={sortBy}
                  onChange={(e) => {
                    setSortBy(e.target.value);
                    setCurrentPage(1);
                  }}
                  label="Sort By"
                  sx={{
                    "& .MuiOutlinedInput-notchedOutline": {
                      borderColor: "#73573f",
                    },
                    "&:hover .MuiOutlinedInput-notchedOutline": {
                      borderColor: "#73573f",
                    },
                    "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                      borderColor: "#73573f",
                    },
                  }}
                >
                  <MenuItem value="">Default</MenuItem>
                  <MenuItem value="A-Z">Alphabetical (A-Z)</MenuItem>
                  <MenuItem value="Z-A">Alphabetical (Z-A)</MenuItem>
                  <MenuItem value="RATING">Rating (High to Low)</MenuItem>
                </Select>
              </FormControl>
            </Box>
          </Box>
        </Box>

        {/* Active Filters */}
        <Box sx={{ mb: 3 }}>
          <Stack direction="row" spacing={1}>
            {category && (
              <Chip
                label={`Category: ${category}`}
                onDelete={() => setCategory("")}
              />
            )}
            {sortBy && (
              <Chip label={`Sort: ${sortBy}`} onDelete={() => setSortBy("")} />
            )}
          </Stack>
        </Box>

        {/* Product Grid */}
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
            gap: { xs: 3, sm: 3 },
          }}
        >
          {loading ? (
            renderSkeletons()
          ) : currentProducts.length > 0 ? (
            currentProducts.map((product) => (
              <div
                key={product.id}
                className="group bg-[#fdfbf7] rounded-3xl shadow-lg overflow-hidden w-full max-w-[25rem] transform transition-all duration-500 hover:scale-105 hover:shadow-2xl"
              >
                <div className="relative h-[29rem] sm:h-[27rem] md:h-[29rem] overflow-hidden">
                  {/* Default Image */}
                  <Image
                    src={
                      product.images?.[0] ||
                      product.imageUrl ||
                      "https://firebasestorage.googleapis.com/v0/b/macticbrothers-4527f.firebasestorage.app/o/products%2FL_Profile%2F1746206858134-L_profile%20(1).png?alt=media&token=fc65371b-781b-4880-852a-b275e1138cbd"
                    }
                    alt={product.name}
                    fill
                    className="object-contain transition-opacity duration-700 opacity-100 group-hover:opacity-0"
                  />

                  {/* Hover Image */}
                  {product.images?.[1] && (
                    <Image
                      src={product.images[1]}
                      alt={`${product.name} - Hover`}
                      fill
                      className="object-cover transition-opacity duration-700 opacity-0 group-hover:opacity-100"
                    />
                  )}

                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="absolute bottom-0 left-0 right-0 p-4 transform translate-y-full group-hover:translate-y-0 transition-transform duration-500">
                    <Link href={`/products/${product.id}`}>
                      <button 
                        className="w-full bg-[#fdfbf7] text-[#73573f] py-2 px-4 rounded-full font-medium hover:bg-gray-100 transition-colors duration-300"
                        suppressHydrationWarning
                      >
                        Quick View
                      </button>
                    </Link>
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-lg font-bold text-[#73573f] group-hover:text-[#73573f] transition-colors duration-300">
                      {product.name}
                    </h3>
                    <span className="text-sm font-medium text-[#73573f] bg-indigo-50 px-3 py-1 rounded-full">
                      New
                    </span>
                  </div>
                  <p className="text-[#3a3a3a] text-sm mb-4 line-clamp-2">
                    {product.description}
                  </p>
                  <div className="flex justify-between items-center">
                    <Link
                      href={`/products/${product.id}`}
                      className="text-[#73573f] hover:text-[#73573f] font-medium group-hover:translate-x-1 transition-transform duration-300"
                    >
                      View Details →
                    </Link>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <Typography variant="body1" sx={{ textAlign: "center", mt: 5 }}>
              No products found.
            </Typography>
          )}
        </Box>

        {/* Pagination */}
        {!loading && totalPages > 1 && (
          <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
            <Pagination
              variant="outlined"
              shape="rounded"
              count={totalPages}
              page={currentPage}
              onChange={(_, page) => setCurrentPage(page)}
              sx={{
                "& .MuiPaginationItem-root": {
                  color: "#73573f",
                  borderColor: "#73573f",
                  borderRadius: "3rem",
                },
                "& .MuiPaginationItem-root.Mui-selected": {
                  backgroundColor: "#73573f",

                  color: "#fff",
                  "&:hover": {
                    backgroundColor: "#73573f",
                  },
                },
              }}
            />
          </Box>
        )}
      </Box>
    </Box>
  );
}