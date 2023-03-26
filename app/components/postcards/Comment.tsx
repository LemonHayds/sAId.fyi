"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import SmartToyIcon from "@mui/icons-material/SmartToy";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import axios from "axios";

type CommentProps = {
  id: string;
  comment: string;
  name: string;
  createdAt: string;
  avatar: string;
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
  userId: string;
};

export default function Comment({
  id,
  comment,
  name,
  createdAt,
  avatar,
  likes,
  userId,
}: CommentProps) {
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
          toastPostID = toast.loading("Unliking comment", { id: toastPostID });
          try {
            await axios.delete("/api/posts/deleteCommentLike", {
              data: alreadyLikedRowId,
            });
            setAlreadyLikedRowId("");
          } catch (error) {
            toast.error("Error unliking comment", { id: toastPostID });
            setLoading(false);
            return;
          }
          toast.success("Comment unliked 💔", { id: toastPostID });
          setLoading(false);
        }
      } else {
        //Like (add row)
        setLiked(true);
        setLikesCount(likesCount + 1);
        if (alreadyLikedRowId === "") {
          setLoading(true);
          toastPostID = toast.loading("Liking comment", { id: toastPostID });
          try {
            const result = await axios.post("/api/posts/addCommentLike", {
              id,
            });
            setAlreadyLikedRowId(result.data);
          } catch (error) {
            toast.error("Error liking comment", { id: toastPostID });
            setLoading(false);
            setLikesCount(likesCount);
            setLiked(false);

            return;
          }
          toast.success("Comment liked ❤️", { id: toastPostID });
          setLoading(false);
        }
      }
    }
  };

  return (
    <div key={id}>
      <motion.div
        animate={{ opacity: 1, scale: 1 }}
        initial={{ opacity: 0, scale: 0.2 }}
        transition={{ ease: "easeOut" }}
      >
        <div
          id={id}
          className="my-6 p-8 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 shadow-lg antialiased rounded-lg"
        >
          <div className="flex items-center gap-2">
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
            <h3 className="font-semibold text-black dark:text-slate-50">
              {name}
            </h3>
          </div>
          <div className="pt-6 pb-8 px-3 text-sm text-black dark:text-slate-50">
            {comment}
          </div>
          <div className="text-sm font-medium text-black dark:text-slate-50 cursor-pointer">
            <div className="flex justify-between items-center">
              <div className="flex">
                <div className="flex justify-center items-center mr-1">
                  {likesCount}
                </div>
                <div className="relative" onClick={() => handleLike()}>
                  <div className=" absolute">
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
                          <FavoriteIcon />
                        </motion.div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
              <div>
                <div className="text-xs text-black/50 dark:text-slate-50/50 font-normal text-right">
                  {`${createdDate} at ${createdTime}`}
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
