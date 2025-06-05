import type { ReactNode } from "react";
import Link from "next/link";

export default function RegisterLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-4">
      <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-md text-center">
        <h1 className="text-3xl font-bold text-center text-primary mb-8">
          AgriConnect Registration
        </h1>
        {children}
      </div>
    </div>
  );
}
