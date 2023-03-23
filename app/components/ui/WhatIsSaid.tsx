"use client";

import InfoIcon from "@mui/icons-material/Info";
import Link from "next/link";

export function WhatIsSaid() {
  return (
    <Link
      href={"/whatissaid"}
      title="What is sAId?"
      className="flex justify-center items-center "
    >
      <button className="rounded-md hover:bg-slate-200/50 hover:dark:bg-slate-700/50 p-2">
        <div className="text-black dark:text-slate-50">
          <InfoIcon />
        </div>
      </button>
    </Link>
  );
}
