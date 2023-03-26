"use client";

import { useState, useRef } from "react";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import toast from "react-hot-toast";

type AccordionProps = {
  title: string;
  content: string;
};

export default function Accordion({ title, content }: AccordionProps) {
  const [active, setActive] = useState(false);
  const [height, setHeight] = useState("0px");
  const [rotate, setRotate] = useState("transform duration-700 ease");
  const contentSpace = useRef<HTMLDivElement>(null);

  function toggleAccordion() {
    setActive((prevState) => !prevState);
    // @ts-ignore
    setHeight(active ? "0px" : `${contentSpace.current.scrollHeight}px`);
    setRotate(
      active
        ? "transform duration-700 ease"
        : "transform duration-700 ease rotate-180"
    );
  }

  function copyText() {
    navigator.clipboard.writeText(content);
    toast.success("Content copied");
  }

  return (
    <div className="flex flex-col w-full">
      <button
        className="py-5 px-6 sm:px-8 border-slate-300 dark:border-slate-700 cursor-pointer focus:outline-none flex items-center justify-between"
        onClick={toggleAccordion}
      >
        <h2 className="inline-block text-black dark:text-white font-semibold text-md sm:text-xl">
          {title}.
        </h2>
        <p className="flex gap-2 text-black dark:text-slate-50/60">
          <ExpandMoreIcon className={`${rotate} inline-block `} />
        </p>
      </button>
      <div className="border-b border-slate-300 dark:border-slate-700">
        <div
          ref={contentSpace}
          style={{ maxHeight: `${height}` }}
          className={`transition-max-height duration-700 ease-in-out overflow-hidden`}
        >
          <div className="relative px-3.5 py-3 text-sm rounded-md mb-6 mt-0.5 focus:bg-slate-100/50 bg-slate-100/75 dark:bg-slate-900/50 dark:focus:bg-slate-700/50 border border-slate-300 dark:border-slate-700 text-black dark:text-white focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 disabled:opacity-50 dark:focus:ring-slate-400 disabled:pointer-events-none dark:focus:ring-offset-slate-900 mx-5 sm:mx-8">
            <div
              className="flex justify-end absolute top-1 right-1 text-black/25 hover:text-black dark:text-slate-50/25 dark:hover:text-slate-100 cursor-pointer"
              onClick={() => copyText()}
            >
              <ContentCopyIcon className="p-1" />
            </div>
            <p className="pl-2 pr-4 break-words whitespace-pre-wrap">
              {content}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
