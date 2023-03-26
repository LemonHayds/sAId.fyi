"use client";

import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { AuthPosts } from "../types/AuthPosts";
import EditPost from "./EditPost";
import { PacmanLoader } from "react-spinners";
import EndOfTheLine from "../components/ui/EndOfTheLine";

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
          key={post.id}
          id={post.id}
          name={data.name}
          avatar={data.image}
          comment={post.comment}
          comments={post.comments}
          createdAt={post.createdAt}
          likes={post.likes}
          prompt={post.prompt}
          itSaid={post.response}
        />
      ))}
      <EndOfTheLine />
    </div>
  );
}
