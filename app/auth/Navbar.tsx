import Link from "next/link";
import { authOptions } from "../../pages/api/auth/[...nextauth]";
import { getServerSession } from "next-auth/next";
import SignInButton from "./SignInButton";
import Avatar from "./Avatar";
import { ThemeToggle } from "../components/ui/ThemeToggle";
import { WhatIsSaid } from "../components/ui/WhatIsSaid";

export default async function Nav() {
  const session = await getServerSession(authOptions);

  return (
    <nav className="z-50 backdrop-blur-sm bg-white/75 dark:bg-slate-900/50 border-b border-slate-300 dark:border-slate-700 shadow-sm flex justify-between items-center py-4 px-4 md:px-48 xl:px-96">
      <Link
        href={"/"}
        className="active:scale-95 inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 disabled:opacity-50 dark:focus:ring-slate-400 disabled:pointer-events-none dark:focus:ring-offset-slate-900 p-1 px-4"
      >
        <h1 className="font-extrabold tracking-wide text-xl text-black dark:text-slate-100 underline-offset-4 hover:underline">
          sAId.
        </h1>
      </Link>

      <ul className="flex items-center gap-3">
        <WhatIsSaid />
        <ThemeToggle />
        {!session?.user && <SignInButton />}
        {session?.user && <Avatar image={session.user?.image || null} />}
      </ul>
    </nav>
  );
}
