"use client";
import { motion } from "framer-motion";

type ToggleProps = {
  deletePost: () => void;
  setToggle: (toggle: boolean) => void;
};

export default function Toggle({ deletePost, setToggle }: ToggleProps) {
  return (
    <div
      className="transition ease-in-out fixed backdrop-blur-[2px] w-full h-full z-20 left-0 top-0 flex justify-center items-center"
      onClick={(e) => setToggle(false)}
    >
      <motion.div
        animate={{ opacity: 1, scale: 1 }}
        initial={{ opacity: 0, scale: 0.2 }}
        transition={{ ease: "easeOut" }}
      >
        <div className=" bg-white border-slate-300 p-8 rounded-lg flex flex-col gap-6 dark:bg-slate-800 border dark:border-slate-700 antialiased">
          <h2 className="text-xl text-black dark:text-slate-50 font-semibold">
            You want to permenantly unsay it?
          </h2>
          <button
            className="active:scale-95 inline-flex items-center justify-center rounded-md text-sm font-bold transition-colors focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 disabled:opacity-50 dark:focus:ring-slate-400 disabled:pointer-events-none dark:focus:ring-offset-slate-900 bg-slate-900 text-white hover:bg-slate-800 dark:bg-slate-200 dark:text-slate-900 dark:hover:bg-slate-100 h-10 py-2 px-4"
            onClick={deletePost}
          >
            Unsay
          </button>
        </div>
      </motion.div>
    </div>
  );
}
