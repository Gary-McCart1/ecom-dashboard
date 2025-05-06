"use client";
import { createContext, useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation"; // Add this import for routing
import Loading from "../loading";

interface AuthContextType {
  isAuthenticated: boolean;
  loading: boolean;
  setIsAuthenticated: (auth: boolean) => void;
}

const AuthContext = createContext<AuthContextType>({
  isAuthenticated: false,
  loading: true,
  setIsAuthenticated: () => {},
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const router = useRouter(); // Using router for redirect

  useEffect(() => {
    const verify = async () => {
      try {
        const res = await fetch("http://localhost:8000/api/verify/", {
          method: "GET",
          credentials: "include",
        });

        if (!res.ok) {
          // Token invalid, so redirect to login
          setIsAuthenticated(false);
          router.push("/login"); // Redirect to login
        } else {
          // Token is valid
          setIsAuthenticated(true);
        }
      } catch (err) {
        console.error("Auth init error:", err);
        setIsAuthenticated(false);
        router.push("/login"); // Redirect to login on error
      } finally {
        setLoading(false);
      }
    };

    verify();
  }, [router]); // This only runs once on mount

  if (loading) {
    return <Loading />;
  }

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, loading, setIsAuthenticated }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
