"use server";

import Link from "next/link";
import SignOutButton from "~/components/client/signout";

export default async function HomePage() {
  return (
    <main className="">
      <nav className="flex h-16 items-center justify-between border-b border-gray-200 px-10">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-md bg-gray-800 text-white">
            SA
          </div>
          <span className="text-lg font-medium">Sentiment Analyis</span>
        </div>
        <SignOutButton />
      </nav>
      <div className="">Youre in</div>
    </main>
  );
}
