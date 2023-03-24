"use client";

import Link from "next/link";
import Image from "next/image";
import SmartToyIcon from "@mui/icons-material/SmartToy";
type User = {
  image: string | null;
};

export default function SignOutButton({ image }: User) {
  return (
    <li className="flex gap-8 items-center">
      <Link
        href={"/dashboard"}
        className="mr-2 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 disabled:opacity-50 dark:focus:ring-slate-400 disabled:pointer-events-none dark:focus:ring-offset-slate-900 rounded-full
        active:scale-95"
      >
        <div className="rounded-full hover:bg-slate-200/50 hover:dark:bg-slate-700/50">
          {image ? (
            <div className="flex justify-center items-center rounded-full hover:bg-slate-200/50 hover:dark:bg-slate-700/50">
              <Image
                width={64}
                height={64}
                src={image}
                className="w-9 rounded-full m-1"
                alt=""
                priority
              />
            </div>
          ) : (
            <SmartToyIcon
              sx={{ fontSize: 35 }}
              className="text-black dark:text-slate-100 m-1"
            />
          )}
        </div>
      </Link>
    </li>
  );
}
