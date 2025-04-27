import { create } from "zustand";
import { IAuthUser } from "@/lib/services/session/interface"; // or wherever your UserSession type is

interface AuthState {
  user: IAuthUser | null;
  isAdmin: boolean;
  setUser: (user: IAuthUser | null) => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isAdmin: false,
  setUser: (user) => set({
    user,
    isAdmin: user?.role === "admin"
  }),
}));