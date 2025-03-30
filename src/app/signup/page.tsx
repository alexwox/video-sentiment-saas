"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { registerUser } from "~/actions/auth";
import { signupSchema, SignupSchemaType } from "~/schemas/auth";

export default function SignupPage() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const form = useForm<SignupSchemaType>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  async function onSubmit(data: SignupSchemaType) {
    try {
      setLoading(true);
      const result = await registerUser(data);

      if (result.error) {
        setError(result.error);
        return;
      }

      // Sign in after registration
      const signInResult = await signIn("credentials", {
        redirect: false,
        email: data.email,
        password: data.password,
      });

      if (!signInResult?.error) {
        router.push("/");
      }
    } catch (error) {
      setError("Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-white">
      <nav className="flex h-16 items-center justify-between border-b border-gray-200 px-10">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-md bg-gray-800 text-white">
            SA
          </div>
          <span className="text-lg font-medium">Sentiment Analyis</span>
        </div>
      </nav>
      <main className="flex h-[calc(100vh-4rem)] items-center justify-center">
        <div className="w-full max-w-md space-y-8">
          <div className="text-center">
            <h2 className="text-2xl font-bold">Create an account</h2>
            <p className="mt-2 text-sm text-gray-600">
              Signup to get started with Sentiment analysis
            </p>
          </div>
          <form
            className="mt-8 space-y-6"
            onSubmit={form.handleSubmit(onSubmit)}
          >
            {error && (
              <div className="rounded-md bg-red-50 p-4 text-sm text-red-500">
                {error}
              </div>
            )}

            <div className="space-y-4">
              <div className="">
                <label htmlFor="" className="text-sm font-medium">
                  Full Name
                </label>
                <input
                  {...form.register("name")}
                  type="text"
                  placeholder="John Doe"
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-sm placeholder-gray-400 shadow-sm focus:border-gray-500 focus:outline-none"
                />
                {form.formState.errors.name && (
                  <p className="mt-1 text-sm text-red-500">
                    {form.formState.errors.name.message}
                  </p>
                )}
              </div>
              <div className="">
                <label htmlFor="" className="text-sm font-medium">
                  Email
                </label>
                <input
                  {...form.register("email")}
                  type="text"
                  placeholder="you@example.com"
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-sm placeholder-gray-400 shadow-sm focus:border-gray-500 focus:outline-none"
                />
                {form.formState.errors.email && (
                  <p className="mt-1 text-sm text-red-500">
                    {form.formState.errors.email.message}
                  </p>
                )}
              </div>
              <div className="">
                <label htmlFor="" className="text-sm font-medium">
                  Password
                </label>
                <input
                  {...form.register("password")}
                  type="password"
                  placeholder="*********"
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-sm placeholder-gray-400 shadow-sm focus:border-gray-500 focus:outline-none"
                />
                {form.formState.errors.password && (
                  <p className="mt-1 text-sm text-red-500">
                    {form.formState.errors.password.message}
                  </p>
                )}
              </div>
              <div className="">
                <label htmlFor="" className="text-sm font-medium">
                  Confirm Password
                </label>
                <input
                  {...form.register("confirmPassword")}
                  type="password"
                  placeholder="*********"
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-sm placeholder-gray-400 shadow-sm focus:border-gray-500 focus:outline-none"
                />
                {form.formState.errors.confirmPassword && (
                  <p className="mt-1 text-sm text-red-500">
                    {form.formState.errors.confirmPassword.message}
                  </p>
                )}
              </div>
            </div>
            <button
              type="submit"
              disabled={loading}
              className="flex w-full justify-center rounded-md bg-gray-800 px-4 py-2 font-medium text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 disabled:opacity-50"
            >
              {" "}
              {loading ? "Creating account..." : "Create account"}{" "}
            </button>
            <p className="text-center text-sm text-gray-600">
              {" "}
              Already have an account?{" "}
              <Link
                href={"/login"}
                className="font-medium text-gray-800 hover:text-gray-700"
              >
                Sign in
              </Link>
            </p>
          </form>
        </div>
      </main>
    </div>
  );
}
