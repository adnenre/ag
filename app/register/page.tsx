"use client";
import Link from "next/link";

const RegisterPage = () => {
  return (
    <div className="flex flex-col justify-center items-center">
      <div className="mx-auto w-48 h-48 mb-6">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          className="text-yellow-500"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
          />
        </svg>
      </div>

      <h1 className="text-2xl font-bold text-gray-800 mb-2">
        Registration Currently Closed
      </h1>

      <p className="text-gray-600 mb-6 text-center">
        We're working hard to give you the best experience.
      </p>

      <div className="border-t pt-6">
        <p className="text-sm text-gray-500 mb-4 text-center">
          In the meantime, you can:
        </p>
        <Link
          href="/"
          className="inline-block px-6 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
        >
          Return to Homepage
        </Link>
      </div>
    </div>
  );
};

export default RegisterPage;
