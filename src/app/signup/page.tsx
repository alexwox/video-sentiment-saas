"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { signupSchema, SignupSchemaType } from "~/schemas/auth";

export default function SignupPage() {
  const [error, setError] = useState<string | null>(null);

  const form = useForm<SignupSchemaType>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  async function onSubmit(data: SignupSchemaType) {}

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
                {form.formState.errors.name && (
                  <p className="mt-1 text-sm text-red-500">
                    {form.formState.errors.name.message}
                  </p>
                )}
              </div>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
}
