"use client";

import Post from "../postcards/Post";
import axios from "axios";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useInView } from "react-intersection-observer";
import { PostsType } from "../../types/Posts";
import { PacmanLoader } from "react-spinners";
import { useEffect, Fragment, useState } from "react";
import { TbRobotOff } from "react-icons/tb";

export default function TopTodayPosts() {
  const { ref, inView } = useInView();
  const [userId, setUserId] = useState("");
  const [refetchLoading, setRefetchLoading] = useState(false);

  const {
    isLoading,
    isError,
    data,
    error,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
    refetch,
  } = useInfiniteQuery<PostsType>(
    ["posts"],
    async ({ pageParam = "" }) => {
      const userResponse = await axios.get("/api/auth/getUser");
      setUserId(userResponse.data);
      const res = await axios.get(
        "/api/posts/getTopTodayPosts?cursor=" + pageParam
      );
      return res.data;
    },
    {
      getNextPageParam: (lastPage) => lastPage.nextId ?? false,
    }
  );

  useEffect(() => {
    async function awaitRefetch() {
      setRefetchLoading(true);
      await refetch();
      setRefetchLoading(false);
    }
    awaitRefetch();
  }, []);

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView]);

  if (isLoading || refetchLoading)
    return (
      <div className="flex justify-center items-center mt-6 mr-4">
        <PacmanLoader color="#64748B" size={20} />
      </div>
    );
  else
    return (
      <div>
        {data?.pages.map((page) => (
          <Fragment key={page.nextId ?? "lastPage"}>
            {page.posts.map((post) => (
              <Post
                key={post.id}
                id={post.id}
                name={post.user.name}
                avatar={post.user.image}
                comment={post.comment}
                comments={post.comments}
                createdAt={post.createdAt}
                likes={post.likes}
                prompt={post.prompt}
                itSaid={post.response}
                userId={userId}
              />
            ))}
          </Fragment>
        ))}
        {isFetchingNextPage && (
          <div className="flex justify-center items-center mt-6">
            <PacmanLoader color="#64748B" size={20} />
          </div>
        )}
        {hasNextPage === false && (
          <div className="flex justify-center items-center">
            <p className="text-slate-50/50 text-lg">
              <TbRobotOff />
            </p>
          </div>
        )}
        <span ref={ref} className="w-full mt-8 invisible">
          Intersection observer marker
        </span>
      </div>
    );
}
