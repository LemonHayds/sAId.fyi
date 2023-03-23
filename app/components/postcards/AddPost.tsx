"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import axios, { AxiosError } from "axios";
import toast from "react-hot-toast";
import CloseIcon from "@mui/icons-material/Close";
import Compose from "../ui/Compose";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Typewriter, Cursor } from "react-simple-typewriter";
import { motion } from "framer-motion";
import Spinner from "../ui/Spinner";

export default function AddPost() {
  const [prompt, setPrompt] = useState("");
  const [responseLoading, setResponseLoading] = useState(false);

  const [itSaid, setItSaid] = useState([]);
  const [selectedItSaid, setSelectedItSaid] = useState(itSaid[0]);
  const [typewriterSpeed, setTypewriterSpeed] = useState(30);

  const [comment, setComment] = useState("");
  const [postDisabled, setPostDisabled] = useState(false);
  const [hidden, setHidden] = useState(true);

  const queryClient = useQueryClient();
  let toastPostID: string = "hello";

  function nextItSaid() {
    if (itSaid.indexOf(selectedItSaid) + 1 === 3) return;
    const nextItSaid = itSaid.indexOf(selectedItSaid) + 1;
    setSelectedItSaid(itSaid[nextItSaid]);
  }

  function closeAddPost() {
    setHidden(true);
    setComment("");
    setPrompt("");
    setItSaid([]);
    setResponseLoading(false);
  }

  function prevItSaid() {
    if (itSaid.indexOf(selectedItSaid) + 1 === 1) return;
    const prevSaid = itSaid.indexOf(selectedItSaid) - 1;
    setSelectedItSaid(itSaid[prevSaid]);
  }

  //Generate response
  const generateResponse = async () => {
    setResponseLoading(true);
    try {
      const response = await axios.post("/api/ai/getResponse", { prompt });
      const itSaidMessage = response.data.choices[0].message.content;
      setItSaid(itSaid.concat(itSaidMessage));
      setSelectedItSaid(itSaidMessage.trim());
      setResponseLoading(false);
    } catch (error) {
      setResponseLoading(false);
      console.log(error);
    }
  };

  //Create a post
  const { mutate } = useMutation(
    async (comment: string) =>
      await axios.post("/api/posts/addPost", {
        comment: comment.trim(),
        prompt: prompt.trim(),
        selectedItSaid,
        published: true,
      }),
    {
      onError: (error) => {
        if (error instanceof AxiosError) {
          toast.error(error?.response?.data.message, { id: toastPostID });
        }
        setPostDisabled(false);
      },
      onSuccess: (data) => {
        setComment("");
        setPrompt("");
        setItSaid([]);
        queryClient.invalidateQueries(["posts"]);
        toast.success("You said it 🔥", { id: toastPostID });
        setPostDisabled(false);
        setHidden(true);
      },
    }
  );

  const submitPost = async (e: React.FormEvent) => {
    e.preventDefault();
    setPostDisabled(true);
    mutate(comment);
    toastPostID = toast.loading("Saying", { id: toastPostID });
  };

  return (
    <div>
      {hidden === true && <Compose setHidden={setHidden} />}
      {hidden === false && (
        <motion.div
          animate={{ opacity: 1, scale: 1 }}
          initial={{ opacity: 0, scale: 0.5 }}
          transition={{ ease: "easeOut" }}
        >
          <div>
            <form
              onSubmit={submitPost}
              className="mb-8 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 shadow-lg antialiased rounded-lg"
            >
              <div className="relative px-4 sm:px-8 py-4 sm:py-6">
                <button
                  className="h-min absolute right-3 top-3 text-black/70 hover:text-black dark:text-slate-50/50 dark:hover:text-slate-50 hover:cursor-pointer"
                  onClick={() => closeAddPost()}
                >
                  <CloseIcon />
                </button>
                <div className="flex flex-col">
                  <h1 className="ml-1 text-black dark:text-white lg:text-left font-extrabold text-xl md:text-xl lg:text-xl">
                    You said.
                  </h1>
                  <textarea
                    onChange={(e) => setPrompt(e.target.value)}
                    name="comment"
                    value={prompt}
                    placeholder="Enter your promt"
                    className="relative px-3.5 py-3 text-sm rounded-md my-2 focus:bg-slate-100/50 bg-slate-50 dark:bg-slate-700/25 dark:focus:bg-slate-700/50  border border-slate-300 dark:border-slate-700 text-black dark:text-white focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 disabled:opacity-50 dark:focus:ring-slate-400 disabled:pointer-events-none dark:focus:ring-offset-slate-900"
                  ></textarea>
                  <div className="flex justify-between">
                    <p
                      className={`text-sm pl-1 ${
                        prompt.length > 300 ? "text-red-600" : "text-slate-500"
                      }`}
                    >{`${prompt.length}/300`}</p>
                    <div className="flex gap-4 items-center">
                      {/* 
                      <div className="flex gap-1 items-center justify-end text-sm text-black/50 hover:text-black dark:text-slate-500 dark:hover:text-slate-50 cursor-pointer">
                        <div className="">Advanced</div>
                        <div className=" text-sm">
                          <ExpandMoreIcon />
                        </div>
                      </div>
                      */}
                      <div>
                        <button
                          type="button"
                          disabled={
                            prompt.length < 2 ||
                            prompt.length > 300 ||
                            itSaid.length === 3 ||
                            responseLoading == true ||
                            postDisabled
                          }
                          className="active:scale-95 inline-flex items-center justify-center rounded-md text-sm font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 disabled:opacity-50 dark:focus:ring-slate-400 disabled:pointer-events-none dark:focus:ring-offset-slate-900 bg-slate-900 text-white hover:bg-slate-800 dark:bg-slate-200 dark:text-slate-900 dark:hover:bg-slate-100 h-10 py-2 px-4"
                          onClick={() => generateResponse()}
                        >
                          {itSaid.length === 0 && !responseLoading && (
                            <>Generate Response</>
                          )}
                          {itSaid.length > 0 &&
                            itSaid.length < 3 &&
                            !responseLoading && (
                              <>{`Generate Response (${
                                itSaid.length + 1
                              }/3)`}</>
                            )}
                          {itSaid.length === 3 && !responseLoading && (
                            <>Responses Generated (3/3)</>
                          )}

                          {responseLoading && (
                            <>
                              Generating &nbsp;&nbsp;
                              <Spinner />
                            </>
                          )}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col">
                  <div className="flex justify-between relative">
                    <div className="pb-2">
                      <h1
                        className={`${
                          itSaid.length < 1
                            ? "text-black/50 dark:text-slate-50/40 font-extrabold text-xl ml-1 transition-all"
                            : "text-black dark:text-slate-50 text-xl ml-1 font-extrabold transition-all"
                        }`}
                      >
                        It said.
                      </h1>
                    </div>
                  </div>

                  <div
                    className="relative whitespace-pre-wrap px-3.5 py-3 text-sm rounded-md mb-2 focus:bg-slate-100/50 bg-slate-100/75 dark:bg-slate-900/50 dark:focus:bg-slate-700/50 border border-slate-300 dark:border-slate-700 text-black dark:text-slate-50"
                    onMouseDown={() => setTypewriterSpeed(0)}
                    onMouseUp={() => setTypewriterSpeed(20)}
                  >
                    {itSaid.length === 0 && (
                      <div className="opacity-30">
                        <Cursor />
                      </div>
                    )}
                    {itSaid.indexOf(selectedItSaid) === 0 && (
                      <Typewriter
                        words={["", selectedItSaid]}
                        loop={1}
                        typeSpeed={typewriterSpeed}
                        deleteSpeed={150}
                        delaySpeed={100}
                        cursor
                      />
                    )}
                    {itSaid.indexOf(selectedItSaid) === 1 && (
                      <Typewriter
                        words={["", selectedItSaid]}
                        loop={1}
                        typeSpeed={typewriterSpeed}
                        deleteSpeed={150}
                        delaySpeed={100}
                        cursor
                      />
                    )}
                    {itSaid.indexOf(selectedItSaid) === 2 && (
                      <Typewriter
                        words={["", selectedItSaid]}
                        loop={1}
                        typeSpeed={typewriterSpeed}
                        deleteSpeed={150}
                        delaySpeed={100}
                        cursor
                      />
                    )}
                  </div>
                  <div className="flex justify-end items-center text-sm">
                    <div className="flex items-center">
                      <button
                        className="text-black/50 hover:text-black dark:text-slate-500 dark:hover:text-slate-50 cursor-pointer text-sm disabled:pointer-events-none disabled:opacity-50"
                        onClick={() => prevItSaid()}
                        disabled={itSaid.indexOf(selectedItSaid) <= 0}
                        type="button"
                      >
                        <ChevronLeftIcon />
                      </button>
                      <div className="text-slate-500 text-sm">
                        {`${itSaid.indexOf(selectedItSaid) + 1}/${
                          itSaid.length
                        } `}
                      </div>
                      <button
                        className="text-black/50 hover:text-black dark:text-slate-500 dark:hover:text-slate-50 cursor-pointer text-sm disabled:pointer-events-none disabled:opacity-50"
                        onClick={() => nextItSaid()}
                        disabled={
                          itSaid.indexOf(selectedItSaid) === itSaid.length - 1
                        }
                        type="button"
                      >
                        <ChevronRightIcon />
                      </button>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col mt-2">
                  <h1
                    className={`${
                      itSaid.length < 1
                        ? "text-black/50 dark:text-slate-50/40 font-extrabold text-xl ml-1 transition-all"
                        : "text-black dark:text-slate-50 text-xl ml-1 font-extrabold transition-all"
                    }`}
                  >
                    Your comment.
                  </h1>
                  <textarea
                    onChange={(e) => setComment(e.target.value)}
                    name="comment"
                    value={comment}
                    placeholder="Thoughts?"
                    className="px-3.5 py-3 text-sm rounded-md my-2 focus:bg-slate-100/50 bg-slate-50 dark:bg-slate-700/25 dark:focus:bg-slate-700/50  border border-slate-300 dark:border-slate-700 text-black dark:text-white focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 disabled:opacity-50 dark:focus:ring-slate-400 disabled:pointer-events-none dark:focus:ring-offset-slate-900"
                    disabled={itSaid.length < 1}
                  ></textarea>
                  <div className="flex justify-between">
                    <p
                      className={`text-sm pl-1 ${
                        comment.length > 300 ? "text-red-600" : "text-slate-500"
                      }`}
                    >{`${comment.length}/300`}</p>
                    <button
                      type="submit"
                      disabled={itSaid.length < 1 || postDisabled === true}
                      className="active:scale-95 inline-flex items-center justify-center rounded-md text-sm font-bold transition-colors focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 disabled:opacity-50 dark:focus:ring-slate-400 disabled:pointer-events-none dark:focus:ring-offset-slate-900 bg-slate-900 text-white hover:bg-slate-800 dark:bg-slate-200 dark:text-slate-900 dark:hover:bg-slate-100 h-10 py-2 px-4"
                    >
                      Post
                    </button>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </motion.div>
      )}
    </div>
  );
}
