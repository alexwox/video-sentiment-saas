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

  return <div>SignOutButton</div>;
}

export default SignOutButton;
