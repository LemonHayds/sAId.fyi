"use client";

import Post from "../../components/postcards/Post";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import AddComment from "@/app/components/postcards/AddComment";
import Comment from "@/app/components/postcards/Comment";
import { PacmanLoader } from "react-spinners";

type URL = {
  params: {
    slug: string;
  };
};

var userId = "";

//Fetch post
const fetchDetails = async (slug: string) => {
  const userResponse = await axios.get("/api/auth/getUser");
  userId = userResponse.data;
  const response = await axios.get(`/api/posts/${slug}`);
  console.log(response);
  return response.data;
};

export default function PostDetail(url: URL) {
  const { data, isLoading } = useQuery({
    queryKey: ["detail-post"],
    queryFn: () => fetchDetails(url.params.slug),
  });
  if (isLoading)
    return (
      <div className="flex justify-center items-center mt-6">
        <PacmanLoader color="#64748B" size={20} />
      </div>
    );

  return (
    <main className="mx-4 md:mx-48 xl:mx-96 mt-6">
      <h1 className="text-center sm:text-left text-4xl font-extrabold text-black dark:text-slate-50">
        What's been sAId.
      </h1>
      <Post
        id={data.id}
        avatar={data.user.image}
        name={data.user.name}
        comment={data.comment}
        comments={data.comments}
        createdAt={data.createdAt}
        likes={data.likes}
        prompt={data.prompt}
        itSaid={data.response}
        userId={userId}
      />
      <AddComment id={data?.id} />
      {data?.comments?.map((comment: any) => (
        <Comment
          id={comment.id}
          comment={comment.comment}
          name={comment?.user?.name}
          createdAt={comment.createdAt}
          avatar={comment.user?.image}
          likes={comment?.likes}
          userId={userId}
        />
      ))}
    </main>
  );
}
