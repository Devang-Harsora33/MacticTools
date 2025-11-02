// Admin UID configuration
// Add your admin UIDs here
export const ADMIN_UIDS = [
  "hvkHbcSP0hauuDjKtJp8e656u5K2", // Current admin UID
  // Add more admin UIDs here as needed
  // "your-new-admin-uid-here",
];

// Function to check if a user is an admin
export const isAdmin = (uid: string | undefined): boolean => {
  if (!uid) return false;
  return ADMIN_UIDS.includes(uid);
};

// Function to get admin UIDs (for debugging purposes)
export const getAdminUids = (): string[] => {
  return [...ADMIN_UIDS];
}; 