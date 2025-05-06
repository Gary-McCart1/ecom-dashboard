// components/ProtectedRoute.tsx
"use client"
import { useAuth } from '../context/AuthContext';
import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react';
import Loading from '../loading';

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated } = useAuth();
  const router = useRouter();

  useEffect(() => {
    // If user is not authenticated, redirect to login page
    if (!isAuthenticated) {
      router.push('/login');
    }
  }, [isAuthenticated, router]);

  if (!isAuthenticated) {
    return <Loading /> // Show loading while checking auth status
  }

  return <>{children}</>;
};

export default ProtectedRoute;
