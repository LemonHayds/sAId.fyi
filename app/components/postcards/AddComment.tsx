"use client";

import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import toast from "react-hot-toast";

type PostProps = {
  id?: string;
};

type Comment = {
  postId?: string;
  comment: string;
};

export default function AddComment({ id }: PostProps) {
  const [comment, setComment] = useState("");
  const [disabled, setDisabled] = useState(false);
  const queryClient = useQueryClient();

  let commentToastId: string = "saymore";

  const { mutate } = useMutation(
    async (data: Comment) => axios.post("/api/posts/addComments", { data }),
    {
      onSuccess: (data) => {
        setComment("");
        setDisabled(false);
        queryClient.invalidateQueries(["detail-post"]);
        toast.success("Comment added successfully", { id: commentToastId });
      },
      onError: (error) => {
        setDisabled(false);
        if (error instanceof AxiosError) {
          toast.error("You must be signed in to comment", {
            id: commentToastId,
          });
        }
      },
    }
  );

  const submitComment = async (e: React.FormEvent) => {
    e.preventDefault();
    setDisabled(true);
    commentToastId = toast.loading("Saying", { id: commentToastId });
    mutate({ comment, postId: id });
  };

  return (
    <form
      onSubmit={submitComment}
      className="mt-4 mb-8 px-8 py-6 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 shadow-md antialiased rounded-lg"
    >
      <h3 className="ml-1 text-black dark:text-white lg:text-left font-bold tracking-tighter text-xl md:text-xl lg:text-xl">
        Say more
      </h3>
      <div className="flex flex-col my-2">
        <textarea
          onChange={(e) => setComment(e.target.value)}
          value={comment}
          name="comment"
          className="relative px-3.5 py-3 text-sm rounded-md focus:bg-slate-100/50 bg-slate-50 dark:bg-slate-800 dark:focus:bg-slate-700/50  backdrop-blur-sm border border-slate-300 dark:border-slate-700 text-black dark:text-white focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 disabled:opacity-50 dark:focus:ring-slate-400 disabled:pointer-events-none dark:focus:ring-offset-slate-900"
        />
      </div>
      <div className="flex justify-between gap-2">
        <p
          className={`text-sm ml-1 ${
            comment.length > 300 ? "text-red-600" : "text-slate-500"
          }`}
        >
          {`${comment.length}/300`}
        </p>
        <button
          disabled={disabled}
          className="active:scale-95 inline-flex items-center justify-center rounded-md text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 disabled:opacity-50 dark:focus:ring-slate-400 disabled:pointer-events-none dark:focus:ring-offset-slate-900 
          bg-slate-900 text-white hover:bg-slate-800 dark:bg-slate-200 dark:text-slate-900 dark:hover:bg-slate-100
          h-10 py-2 px-4 font-bold"
          type="submit"
        >
          Say it
        </button>
      </div>
    </form>
  );
}
