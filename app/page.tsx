"use client";

import AddPost from "./components/postcards/AddPost";
import { useState } from "react";
import AllPosts from "./components/filteredposts/AllPosts";
import MostLikedPosts from "./components/filteredposts/MostLikedPosts";
import TopTodayPosts from "./components/filteredposts/TopTodayPosts";

export default function Home() {
  const [filter, setFilter] = useState("recent");

  function setRecent() {
    if (filter === "recent") return;
    setFilter("recent");
  }

  function setMostLiked() {
    if (filter === "mostLiked") return;
    setFilter("mostLiked");
  }

  function setTopToday() {
    if (filter === "topToday") return;
    setFilter("topToday");
  }

  return (
    <>
      <main className="min-h-screen mx-4 md:mx-48 xl:mx-96 mt-6">
        <AddPost />
        <div className="flex items-center flex-col 2xl:flex-row 2xl:justify-between mt-4">
          <div>
            <h1 className="flex ml-1 text-center 2xl:text-left text-4xl font-extrabold text-black dark:text-slate-50">
              What everyone's sAId.
            </h1>
          </div>
          <div className="mt-4 2xl:mt-0">
            <ul className="flex justify-center flex-wrap">
              <li className="">
                <button
                  className={`{${
                    filter === "recent"
                      ? "inline-block text-black border-black dark:text-slate-50 dark:border-slate-50 py-4 px-4 text-sm font-medium text-center border-b-2"
                      : "inline-block text-border-gray-300 text-black/60 hover:border-slate-900/50 dark:hover:border-slate-50/50 dark:hover:text-slate-50/50 dark:text-slate-50/50 py-4 px-4 text-sm font-medium text-center border-transparent border-b-2"
                  }`}
                  onClick={() => setRecent()}
                >
                  Recent
                </button>
              </li>
              <li className="mx-2">
                <button
                  className={`{${
                    filter === "mostLiked"
                      ? "inline-block text-black border-black dark:text-slate-50 dark:border-slate-50 py-4 px-4 text-sm font-medium text-center border-b-2"
                      : "inline-block text-border-gray-300 text-black/60 hover:border-slate-900/50 dark:hover:border-slate-50/50 dark:hover:text-slate-50/50 dark:text-slate-50/50 py-4 px-4 text-sm font-medium text-center border-transparent border-b-2"
                  }`}
                  onClick={() => setMostLiked()}
                >
                  Most Liked
                </button>
              </li>
              <li className="">
                <button
                  className={`{${
                    filter === "topToday"
                      ? "inline-block text-black border-black dark:text-slate-50 dark:border-slate-50 py-4 px-4 text-sm font-medium text-center border-b-2"
                      : "inline-block text-border-gray-300 text-black/60 hover:border-slate-900/50 dark:hover:border-slate-50/50 dark:hover:text-slate-50/50 dark:text-slate-50/50 py-4 px-4 text-sm font-medium text-center border-transparent border-b-2"
                  }`}
                  onClick={() => setTopToday()}
                >
                  Top Today
                </button>
              </li>
            </ul>
          </div>
        </div>
        {filter === "recent" && <AllPosts />}
        {filter === "mostLiked" && <MostLikedPosts />}
        {filter === "topToday" && <TopTodayPosts />}
      </main>
    </>
  );
}
