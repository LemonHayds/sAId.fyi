export type PostType = {
  id: string;
  comment: string;
  updatedAt?: string;
  likes: number;
  prompt: string;
  response: string;
  user: {
    email: string;
    id: string;
    image: string;
    name: string;
  };
  comments: {
    createdAt?: string;
    id: string;
    postId: string;
    title: string;
    userId: string;
    user: {
      email: string;
      id: string;
      image: string;
      name: string;
    };
  }[];
};
