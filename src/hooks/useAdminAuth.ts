import { useState, useEffect } from 'react';
import { onAuthStateChanged, User } from 'firebase/auth';
import { auth } from '@/lib/firebase';
import { isAdmin } from '@/lib/admin-config';
import { useRouter } from 'next/navigation';

export const useAdminAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [isAdminUser, setIsAdminUser] = useState<boolean | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      
      if (user) {
        const adminStatus = isAdmin(user.uid);
        setIsAdminUser(adminStatus);
        
        if (!adminStatus) {
          // Redirect non-admin users
          router.replace('/not-found');
        }
      } else {
        setIsAdminUser(false);
        // Redirect to login if not authenticated
        router.replace('/admin');
      }
      
      setLoading(false);
    });

    return () => unsubscribe();
  }, [router]);

  return {
    user,
    isAdminUser,
    loading,
  };
}; 