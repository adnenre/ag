"use client";

import type React from "react";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
} from "react";
import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "@/lib/firebase";
import { useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";

interface UserData {
  id: string;
  name: string;
  email: string;
  phoneNumber: string;
  role: string;
  location: string;
  createdAt?: string;
}

interface AuthContextType {
  isAuthenticated: boolean;
  user: UserData | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
  isAuthenticated: false,
  user: null,
  loading: true,
  login: async () => {},
  logout: async () => {},
});

export const useAuth = () => useContext(AuthContext);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();
  const router = useRouter();

  // Login function
  const login = useCallback(
    async (email: string, password: string) => {
      try {
        // Authenticate user
        const userCredential = await signInWithEmailAndPassword(
          auth,
          email,
          password
        );
        const firebaseUser = userCredential.user;
        console.log("###############################################");
        console.log(firebaseUser);
        console.log("###############################################");
        // Try to get user data from Firestore
        try {
          const userDoc = await getDoc(doc(db, "users", firebaseUser.uid));

          if (userDoc.exists()) {
            const userData = userDoc.data();

            // Set user data
            setUser({
              id: firebaseUser.uid,
              name: userData.name || firebaseUser.displayName || "User",
              email: userData.email || firebaseUser.email || "",
              phoneNumber:
                userData.phoneNumber || firebaseUser.phoneNumber || "",
              location: userData.location || "",
              role: userData.role || "user",
              createdAt: userData.createdAt || "",
            });

            // Redirect based on role
            if (userData.role === "admin") {
              router.push("/admin");
            } else {
              router.push("/profile");
            }
          } else {
            // If user document doesn't exist
            setUser({
              id: firebaseUser.uid,
              name: firebaseUser.displayName || "User",
              email: firebaseUser.email || "",
              phoneNumber: firebaseUser.phoneNumber || "",
              role: "user",
              location: firebaseUser.location,
              createdAt: new Date().toISOString(),
            });
            router.push("/profile");
          }
        } catch (firestoreError) {
          console.error("Firestore error:", firestoreError);
          // If we can't access Firestore, just use auth data
          setUser({
            id: firebaseUser.uid,
            name: firebaseUser.displayName || "User",
            email: firebaseUser.email || "",
            phoneNumber: firebaseUser.phoneNumber || "",
            location: firebaseUser.location,
            role: "user",
          });
          router.push("/profile");
        }

        setIsAuthenticated(true);
        toast({
          title: "Sign in successful",
          description: "Welcome back!",
        });
      } catch (error: any) {
        console.error("Login error:", error);
        setIsAuthenticated(false);

        // Handle specific Firebase error codes
        let errorMessage = "Please check your credentials and try again.";

        if (error.code === "auth/user-not-found") {
          errorMessage =
            "No account found with this email. Please register first.";
        } else if (error.code === "auth/wrong-password") {
          errorMessage = "Incorrect password. Please try again.";
        } else if (error.code === "auth/invalid-email") {
          errorMessage = "Invalid email format.";
        } else if (error.code === "auth/too-many-requests") {
          errorMessage =
            "Too many failed login attempts. Please try again later.";
        } else if (error.message?.includes("offline")) {
          errorMessage =
            "You appear to be offline. Please check your internet connection.";
        }

        toast({
          variant: "destructive",
          title: "Sign in failed",
          description: errorMessage,
        });

        throw error;
      }
    },
    [router, toast]
  );

  // Logout function
  const logout = useCallback(async () => {
    try {
      await signOut(auth);
      setUser(null);
      setIsAuthenticated(false);
      router.push("/");
      toast({
        title: "Signed out",
        description: "You have been successfully signed out.",
      });
    } catch (error) {
      console.error("Logout error:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to sign out. Please try again.",
      });
    }
  }, [router, toast]);

  // Listen for auth state changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        console.log("currentUser", currentUser);
        setIsAuthenticated(true);

        try {
          const userDoc = await getDoc(doc(db, "users", currentUser.uid));
          console.log("userDoc", userDoc);
          if (userDoc.exists()) {
            const userData = userDoc.data();
            setUser({
              id: currentUser.uid,
              name: userData.name || currentUser.displayName || "User",
              email: userData.email || currentUser.email || "",
              phoneNumber:
                userData.phoneNumber || currentUser.phoneNumber || "",
              role: userData.role || "user",
              location: userData.location || currentUser.location || "",
              createdAt: userData.createdAt,
            });
          }
        } catch (error) {
          console.error("Error fetching user data:", error);
          // If we can't access Firestore, just use auth data
        }
      } else {
        setIsAuthenticated(false);
        setUser(null);
      }

      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, user, loading, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
}
