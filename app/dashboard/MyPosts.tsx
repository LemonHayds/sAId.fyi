"use client";

import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { AuthPosts } from "../types/AuthPosts";
import EditPost from "./EditPost";
import { PacmanLoader } from "react-spinners";
import { TbRobotOff } from "react-icons/tb";

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
      <div className="flex justify-center items-center mt-6">
        <div>
          <p className="text-slate-50/50 text-sm mr-1">End of the line</p>
        </div>
        <div className="text-slate-50/50 text-md">
          <TbRobotOff />
        </div>
      </div>
    </div>
  );
}
