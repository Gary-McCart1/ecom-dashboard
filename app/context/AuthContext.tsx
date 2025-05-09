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
      const storedAuth = localStorage.getItem("isAuthenticated");

      if (storedAuth === "true") {
        setIsAuthenticated(true);
        setLoading(false);
        return;
      }

      try {
        const res = await fetch(
          "https://foamhead-a8f24bda0c5b.herokuapp.com/api/verify/",
          {
            method: "GET",
            credentials: "include",
          }
        );

        if (!res.ok) {
          // Token invalid, so redirect to login
          setIsAuthenticated(false);
          localStorage.setItem("isAuthenticated", "false");
          router.push("/login");
        } else {
          // Token is valid
          setIsAuthenticated(true);
          localStorage.setItem("isAuthenticated", "true");
        }
      } catch (err) {
        console.error("Auth init error:", err);
        setIsAuthenticated(false);
        localStorage.setItem("isAuthenticated", "false");
        router.push("/login");
      } finally {
        setLoading(false);
      }
    };

    verify();
  }, [router]);
  // This only runs once on mount

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
