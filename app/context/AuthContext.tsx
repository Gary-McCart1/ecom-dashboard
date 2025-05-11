"use client";
import { createContext, useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Loading from "../loading";
import { getAccessToken} from "../utils/auth"; // Import only necessary auth utility functions

interface AuthContextType {
    isAuthenticated: boolean;
    loading: boolean;
    login: (username: string, password: string) => Promise<boolean>;
    logout: () => Promise<boolean>; // Updated logout to return a promise
    refresh: () => Promise<string | null>;
    setIsAuthenticated: (auth: boolean) => void; // Consider removing this if state is managed internally
}

const AuthContext = createContext<AuthContextType>({
    isAuthenticated: false,
    loading: true,
    login: async () => false,
    logout: async () => false, // Updated logout to return a promise
    refresh: async () => null,
    setIsAuthenticated: () => {},
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    const login = async (username: string, password: string): Promise<boolean> => {
        setLoading(true);
        const success = await (await import("../utils/auth")).loginUser(username, password);
        setLoading(false);
        if (success) {
            setIsAuthenticated(true);
            return true;
        }
        return false;
    };

    const logout = async (): Promise<boolean> => {
        setLoading(true);
        const success = await (await import("../utils/auth")).logoutUser();
        setLoading(false);
        setIsAuthenticated(false);
        router.push("/login");
        return success;
    };

    const refresh = async (): Promise<string | null> => {
        const newToken = await (await import("../utils/auth")).refreshToken();
        if (newToken) {
            setIsAuthenticated(true);
        } else {
            setIsAuthenticated(false);
            router.push("/login"); // Redirect if refresh fails
        }
        return newToken;
    };

    useEffect(() => {
        const checkAuthOnLoad = async () => {
            setLoading(true);
            const token = getAccessToken();
            if (token) {
                // Consider a lightweight check if the token exists,
                // the backend will handle the actual verification on protected routes.
                setIsAuthenticated(true);
            } else {
                setIsAuthenticated(false);
            }
            setLoading(false);
        };

        checkAuthOnLoad();
    }, [router]);

    if (loading) {
        return <Loading />;
    }

    return (
        <AuthContext.Provider value={{ isAuthenticated, loading, login, logout, refresh, setIsAuthenticated }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);