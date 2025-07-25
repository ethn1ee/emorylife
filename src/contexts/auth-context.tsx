"use client";

import { authClient } from "@/lib/auth";
import { api } from "@/trpc/react";
import { type User } from "@prisma/client";
import { createContext, useEffect, useState, type ReactNode } from "react";
import { toast } from "sonner";

type AuthContextType = {
  session: ReturnType<typeof authClient.useSession>["data"];
  user: User | null;
  isSessionLoading: ReturnType<typeof authClient.useSession>["isPending"];
  refresh: () => Promise<void>;
  error: ReturnType<typeof authClient.useSession>["error"];
};

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined,
);

type AuthProviderProps = {
  children: ReactNode;
};

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const {
    data: session,
    isPending,
    error,
    refetch: refetchSession,
  } = authClient.useSession();
  const [isMounted, setIsMounted] = useState(false);

  const { data: user, isLoading } = api.user.getById.useQuery(
    session?.user.id ?? "",
    {
      enabled: !!session,
    },
  );

  const utils = api.useUtils();

  const refresh = async () => {
    refetchSession();
    await utils.user.invalidate();
  };

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (isMounted && error) {
      toast.error("There was an error fetching your session", {
        description: "Please try again later",
        position: "top-center",
      });
      console.error("Error fetching session:", error);
    }
  }, [error, isMounted]);

  const value: AuthContextType = {
    session: isMounted ? session : null,
    user: user ?? null,
    refresh,
    isSessionLoading: isMounted ? isPending || isLoading : true,
    error: isMounted ? error : null,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
