"use server";

import Link from "next/link";
import SignOutButton from "~/components/client/signout";
import { auth } from "~/server/auth";
import { db } from "~/server/db";

export default async function HomePage() {
  const session = await auth();
  const quota = await db.apiQuota.findUniqueOrThrow({
    where: {
      userId: session?.user.id,
    },
  });
  return (
    <div className="">
      <nav className="flex h-16 items-center justify-between border-b border-gray-200 px-10">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-md bg-gray-800 text-white">
            SA
          </div>
          <span className="text-lg font-medium">Sentiment Analyis</span>
        </div>
        <SignOutButton />
      </nav>
      <main className="sm:p10 flex min-h-screen w-full flex-col gap-6 p-4 md:flex-row">
        <div className="flex h-fit w-full flex-col gap-3 md:w-1/2"></div>
        <div className="hidden border-l border-slate-200 md:block"></div>
        <div className="flex h-fit w-full flex-col gap-3 md:w-1/2">
          <h2 className="text-lg font-medium text-slate-800">API</h2>
          <div className="mt-3 flex h-fit w-full flex-col rounded-xl bg-gray-100 bg-opacity-70 p-4">
            <span className="text-sm">Secret Key</span>
            <span className="text-sm text-gray-500">
              Use this key when calling our API to authorize your request.
              DANGER! DO NOT SHARE PUBLICALLY!
            </span>
          </div>
        </div>
      </main>
      <div className="">Youre in</div>
    </div>
  );
}
