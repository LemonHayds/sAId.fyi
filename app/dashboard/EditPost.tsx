"use client";

import { useState } from "react";
import Toggle from "./Toggle";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import toast from "react-hot-toast";
import { motion } from "framer-motion";
import Accordion from "../components/postcards/PostAccordion";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ModeCommentIcon from "@mui/icons-material/ModeComment";
import Link from "next/link";
import DeleteIcon from "@mui/icons-material/Delete";

type EditProps = {
  id: string;
  avatar: string;
  name: string;
  comment: string;
  comments?: {
    id: string;
    postId: string;
    userId: string;
  }[];
};

export default function EditPost({
  avatar,
  name,
  comment,
  comments,
  id,
}: EditProps) {
  //Toggle
  const [toggle, setToggle] = useState(false);
  let deleteToastID: string = "bye";
  const queryClient = useQueryClient();

  //Delete post
  const { mutate } = useMutation(
    async (id: string) =>
      await axios.delete(`/api/posts/deletePost`, { data: id }),
    {
      onError: (error) => {
        console.log(error);
        toast.error("Error unsaying", { id: deleteToastID });
      },
      onSuccess: (data) => {
        toast.success("Unsaid successfully", { id: deleteToastID });
        queryClient.invalidateQueries(["auth-posts"]);
      },
    }
  );

  const deletePost = () => {
    deleteToastID = toast.loading("Unsaying", { id: deleteToastID });
    mutate(id);
  };

  return (
    <>
      <motion.div
        animate={{ opacity: 1, scale: 1 }}
        initial={{ opacity: 0, scale: 0.5 }}
        transition={{ ease: "easeOut" }}
      >
        <div className="my-8">
          <div className=" bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 shadow-lg antialiased rounded-lg">
            <Accordion title={`${name} said`} content={comment} />
            <Accordion title={"It said"} content={comment} />

            <div className="py-8 px-10">
              <p className="text-black dark:text-slate-50 text-md">{comment}</p>
            </div>

            <div className="flex px-8 pb-5 gap-4 items-center justify-between">
              <div className="flex-1">
                <div className="flex gap-8">
                  <div className="text-sm font-medium text-black dark:text-slate-50 cursor-pointer">
                    0 <FavoriteBorderIcon />
                  </div>
                  <Link
                    href={`/post/${id}`}
                    className="text-sm font-medium text-black dark:text-slate-50"
                  >
                    {comments?.length} <ModeCommentIcon />
                  </Link>
                </div>
              </div>
              <div>
                <button
                  className="text-sm font-bold text-black/50 hover:text-red-600 dark:text-slate-50/30 dark:hover:text-red-600"
                  onClick={() => setToggle(true)}
                >
                  <DeleteIcon />
                </button>
              </div>
            </div>
            {toggle && <Toggle setToggle={setToggle} deletePost={deletePost} />}
          </div>
        </div>
      </motion.div>
    </>
  );
}
