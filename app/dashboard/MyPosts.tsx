"use client";

import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { AuthPosts } from "../types/AuthPosts";
import EditPost from "./EditPost";
import { PacmanLoader } from "react-spinners";

const getAuthPosts = async () => {
  const response = await axios.get("/api/posts/authPosts");
  return response.data;
};

export default function MyPosts() {
  const { data, isLoading } = useQuery<AuthPosts>({
    queryFn: getAuthPosts,
    queryKey: ["auth-posts"],
  });

  if (isLoading)
    return (
      <div className="flex justify-center items-center mt-4">
        <PacmanLoader color="#64748B" size={20} />
      </div>
    );

  return (
    <div>
      {data?.posts?.map((post) => (
        <EditPost
          id={post.id}
          avatar={data.image}
          comment={post.comment}
          name={data.name}
          comments={post.comments}
          key={post.id}
        />
      ))}
    </div>
  );
}
