"use client";

import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";

import React from "react";

function SignOutButton() {
  const router = useRouter();
  const handleSignOut = async () => {
    await signOut({
      redirect: false,
    });
    router.push("/login");
  };

  return (
    <button
      onClick={handleSignOut}
      className="flex h-8 items-center justify-center gap-2 rounded-md border border-gray-200 bg-white px-3 text-sm text-gray-600 transition-colors hover:bg-gray-50"
    >
      Logout
    </button>
  );
}

export default SignOutButton;
