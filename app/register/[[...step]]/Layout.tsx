import type { ReactNode } from "react";

export default function RegisterLayout({ children }: { children: ReactNode }) {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-4 bg-background">
      <div className="w-full max-w-lg p-6 md:p-8 bg-card rounded-xl shadow-2xl">
        <h1 className="text-3xl font-bold text-center text-primary mb-8">
          AgriConnect Registration
        </h1>
        {children}
      </div>
    </main>
  );
}
