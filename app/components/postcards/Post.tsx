"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import SmartToyIcon from "@mui/icons-material/SmartToy";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ModeCommentIcon from "@mui/icons-material/ModeComment";
import Accordion from "./PostAccordion";
import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

type PostProps = {
  id: string;
  name: string;
  avatar: string;
  comment: string;
  comments: string[];
  createdAt: string;
  likes: {
    createdAt?: string;
    id: string;
    postId: string;
    commentId: string;
    userId: string;
    user: {
      email: string;
      id: string;
      image: string;
      name: string;
    };
  }[];
  prompt: string;
  itSaid: string;
  userId: string;
};

export default function Post({
  id,
  name,
  avatar,
  comment,
  comments,
  createdAt,
  likes,
  prompt,
  itSaid,
  userId,
}: PostProps) {
  const created = new Date(createdAt);
  const createdDate = created.toLocaleDateString("en-US");
  const createdTime = created.toLocaleTimeString("en-US");
  let toastPostID: string = id;

  const [liked, setLiked] = useState(false);
  const [alreadyLikedRowId, setAlreadyLikedRowId] = useState("");
  const [loading, setLoading] = useState(false);
  const [likesCount, setLikesCount] = useState(likes.length);

  //Check likes to see if current user is already present
  useEffect(() => {
    const id = userId;
    for (var i = 0; i < likes.length; i++) {
      if (likes[i].userId === id) {
        setLiked(true);
        setAlreadyLikedRowId(likes[i].id);
      }
    }
  }, []);

  //Like and unlike functionality
  const handleLike = async () => {
    if (loading === false) {
      if (liked === true) {
        //Unlike (delete row)
        setLiked(false);
        if (likesCount === 0) {
          setLikesCount(0);
        } else if (likesCount === 1) {
          setLikesCount(0);
        } else if (likesCount >= 2) {
          setLikesCount(likesCount - 1);
        }
        if (alreadyLikedRowId) {
          setLoading(true);
          toastPostID = toast.loading("Unliking post", { id: toastPostID });
          try {
            await axios.delete("/api/posts/deletePostLike", {
              data: alreadyLikedRowId,
            });
            setAlreadyLikedRowId("");
          } catch (error) {
            toast.error("Error unliking post", { id: toastPostID });
            setLoading(false);
            return;
          }
          toast.success("Post unliked 💔", { id: toastPostID });
          setLoading(false);
        }
      } else {
        //Like (add row)
        setLiked(true);
        setLikesCount(likesCount + 1);
        if (alreadyLikedRowId === "") {
          setLoading(true);
          toastPostID = toast.loading("Liking post", { id: toastPostID });
          try {
            const result = await axios.post("/api/posts/addPostLike", { id });
            setAlreadyLikedRowId(result.data);
          } catch (error) {
            toast.error("You must be signed in to like posts", {
              id: toastPostID,
            });
            setLoading(false);
            setLikesCount(likesCount);
            setLiked(false);

            return;
          }
          toast.success("Post liked ❤️", { id: toastPostID });
          setLoading(false);
        }
      }
    }
  };

  return (
    <motion.div
      animate={{ opacity: 1, scale: 1 }}
      initial={{ opacity: 0, scale: 0.5 }}
      transition={{ ease: "easeOut" }}
    >
      <div className="my-8">
        <div>
          <div className="bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 shadow-lg antialiased rounded-lg">
            <Accordion title={`${name} said`} content={prompt} />
            <Accordion title={"It said"} content={itSaid} />

            <div className="relative pt-8 pb-9 px-8 sm:px-10">
              <p className="text-black dark:text-slate-50 text-md">{comment}</p>
              <div className="absolute bottom-0 right-8 flex items-end">
                <p className="text-xs text-black/50 dark:text-slate-50/50 font-normal text-right">{`${createdDate} at ${createdTime}`}</p>
                &nbsp;
              </div>
            </div>

            <div className="flex px-6 sm:px-8 pb-5 gap-4 items-center justify-between">
              <div className="flex-1 items-center">
                <div className="flex gap-6">
                  <div className="text-sm font-medium text-black dark:text-slate-50 cursor-pointer">
                    <div className="flex mr-3 ">
                      <div className="flex justify-center items-center mr-1">
                        {likesCount}
                      </div>
                      <div className="relative" onClick={() => handleLike()}>
                        <div className=" absolute ">
                          <FavoriteBorderIcon />
                        </div>
                        <div className="relative">
                          {liked === true && (
                            <div className="absolute text-red-500 flex justify-center items-center">
                              <motion.div
                                animate={{ opacity: 1, scale: 1 }}
                                initial={{ opacity: 0, scale: 0.1 }}
                                transition={{ ease: "easeOut" }}
                              >
                                <FavoriteIcon className="text-md" />
                              </motion.div>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                  <Link
                    href={`/post/${id}`}
                    className="text-sm font-medium text-black dark:text-slate-50"
                  >
                    <div className="flex mr-3">
                      <div className="flex justify-center items-center mr-1">
                        {comments?.length}
                      </div>
                      <div className="relative">
                        <div className="absolute">
                          <ModeCommentIcon />
                        </div>
                      </div>
                    </div>
                  </Link>
                </div>
              </div>

              <div className="grow flex justify-end items-center gap-2">
                <h3 className="flex justify-between items-center text-black font-medium dark:text-slate-50 text-xs lg:text-sm">
                  <p className="text-right">{name}</p>
                </h3>
                {avatar ? (
                  <Image
                    width={64}
                    height={64}
                    src={avatar}
                    className="w-6 rounded-full m-1"
                    alt=""
                    priority
                  />
                ) : (
                  <SmartToyIcon
                    sx={{ fontSize: 35 }}
                    className="text-black dark:text-slate-100 p-1"
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
