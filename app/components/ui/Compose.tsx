"use client";

import KeyboardIcon from "@mui/icons-material/Keyboard";
import { motion } from "framer-motion";

export default function AddPost({ setHidden }: any) {
  return (
    <div className="flex justify-center mr-2">
      <motion.div
        animate={{ opacity: 1, scale: 1 }}
        initial={{ opacity: 0, scale: 0.5 }}
        transition={{ ease: "easeOut" }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.9 }}
      >
        <div
          className="flex justify-center items-center w-fit h-fit px-4 py-2 hover:cursor-pointer  hover:text-black text-black/70 dark:text-slate-50/50 dark:hover:text-slate-50 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 shadow-md rounded-full"
          onClick={() => setHidden(false)}
        >
          <div className="animate-pulse flex justify-center items-center">
            <div>Have something to say?</div>
            <KeyboardIcon className="ml-2" />
          </div>
        </div>
      </motion.div>
    </div>
  );
}
