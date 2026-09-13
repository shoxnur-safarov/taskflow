"use client";

import { createContext, useContext, useEffect, useState } from "react";
import api from "@/lib/api";

interface User {
    id: number;
    fullName: string;
    email: string;
}

interface Workspace {
    id: number;
    name: string;
    description: string | null;
}

interface AuthContextType {
    user: User | null;
    workspaces: Workspace[];
    currentWorkspace: Workspace | null;
    setCurrentWorkspace: (ws: Workspace) => void;
    isLoading: boolean;
    refetch: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [workspaces, setWorkspaces] = useState<Workspace[]>([]);
    const [currentWorkspace, setCurrentWorkspace] = useState<Workspace | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    const fetchData = async () => {
        try {
            const meRes = await api.get("/auth/me");
            setUser(meRes.data.user);

            const wsRes = await api.get("/workspaces");
            setWorkspaces(wsRes.data.workspaces);
            if (wsRes.data.workspaces.length > 0) {
                setCurrentWorkspace(wsRes.data.workspaces[0]);
            }
        } catch {
            setUser(null);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        fetchData();
    }, []);

    return (
        <AuthContext.Provider
            value={{ user, workspaces, currentWorkspace, setCurrentWorkspace, isLoading, refetch: fetchData }}
        >
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (!context) throw new Error("useAuth must be used within AuthProvider");
    return context;
}