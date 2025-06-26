# Admin UID Management

This document explains how to manage admin UIDs in the project.

## Current Setup

The admin access control is now centralized in `src/lib/admin-config.ts`. This makes it easy to add or remove admin users without touching multiple files.

## How to Add a New Admin

1. **Get the User's UID**:

   - The user needs to sign up/login to your Firebase app
   - You can find their UID in the Firebase Console under Authentication > Users
   - Or you can get it programmatically from the user object after they sign in

2. **Add the UID to the Configuration**:
   - Open `src/lib/admin-config.ts`
   - Add the new UID to the `ADMIN_UIDS` array:

```typescript
export const ADMIN_UIDS = [
  "ubbOR0RvBJSujmqUoCXjBvxHbTp2", // Current admin UID
  "new-admin-uid-here", // Add new admin UID here
];
```

3. **Test the Access**:
   - The new admin should be able to log in and access the admin panel
   - They will see the admin navbar and have access to all admin features

## How to Remove an Admin

1. **Remove the UID**:

   - Open `src/lib/admin-config.ts`
   - Remove the UID from the `ADMIN_UIDS` array

2. **The user will lose access immediately**:
   - They will be redirected to the login page
   - They won't be able to access any admin features

## Security Features

- **Centralized Control**: All admin UIDs are managed in one place
- **Immediate Effect**: Changes take effect immediately without restart
- **Access Denied Messages**: Non-admin users get clear error messages
- **Automatic Redirects**: Unauthorized users are redirected appropriately

## Files Involved

- `src/lib/admin-config.ts` - Main configuration file
- `src/hooks/useAdminAuth.ts` - Custom hook for admin authentication
- `src/components/admin/AdminNavbar.tsx` - Admin navigation bar
- `src/app/admin/page.tsx` - Admin login page
- `src/app/admin/dashboard/page.tsx` - Admin dashboard

## Best Practices

1. **Keep UIDs Secure**: Don't commit UIDs to public repositories
2. **Regular Review**: Periodically review the admin list
3. **Use Environment Variables**: For production, consider using environment variables
4. **Document Changes**: Keep track of who has admin access

## Troubleshooting

- **User can't access admin panel**: Check if their UID is in the `ADMIN_UIDS` array
- **Login works but no access**: Verify the UID is correct (case-sensitive)
- **Multiple admins needed**: Simply add more UIDs to the array

## Future Enhancements

Consider implementing:

- Role-based permissions (super admin, content admin, etc.)
- Admin user management interface
- Audit logs for admin actions
- Environment variable configuration for production
