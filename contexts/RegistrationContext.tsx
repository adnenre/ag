// src/context/RegistrationContext.tsx
"use client";

import type { ConfirmationResult, User } from "firebase/auth";
import React, {
  createContext,
  useState,
  useContext,
  ReactNode,
  Dispatch,
  SetStateAction,
} from "react";

export type UserType = "farmer" | "agent";

export interface RegistrationData {
  currentLogicalStep:
    | "user-type"
    | "location-select"
    | "phone-auth"
    | "otp-verify"
    | "details"
    | "completed";
  phoneNumber: string; // Full phone number including country code
  confirmationResult: ConfirmationResult | null;
  firebaseUser: User | null;
  userType: UserType | null;
  name: string;
  email: string;
  location: string;
  // Farmer specific
  farmSize?: string;
  crops?: string[];
  // Agent specific
  agencyName?: string;
  specialization?: string;
}

interface RegistrationContextProps {
  formData: RegistrationData;
  setFormData: Dispatch<SetStateAction<RegistrationData>>;
  resetForm: () => void;
}

const initialState: RegistrationData = {
  currentLogicalStep: "user-type", // Start with user-type selection
  phoneNumber: "",
  confirmationResult: null,
  firebaseUser: null,
  userType: null,
  name: "",
  email: "",
  location: "",
};

const RegistrationContext = createContext<RegistrationContextProps | undefined>(
  undefined
);

export const RegistrationProvider = ({ children }: { children: ReactNode }) => {
  const [formData, setFormData] = useState<RegistrationData>(initialState);

  const resetForm = () => {
    setFormData(initialState);
  };

  return (
    <RegistrationContext.Provider value={{ formData, setFormData, resetForm }}>
      {children}
    </RegistrationContext.Provider>
  );
};

export const useRegistrationContext = () => {
  const context = useContext(RegistrationContext);
  if (context === undefined) {
    throw new Error(
      "useRegistrationContext must be used within a RegistrationProvider"
    );
  }
  return context;
};
