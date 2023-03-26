export type AuthPosts = {
  email: string;
  id: string;
  image: string;
  name: string;
  posts: {
    createdAt: string;
    id: string;
    comment: string;
    comments?: {
      createdAt: string;
      id: string;
      postId: string;
      title: string;
      userId: string;
    }[];
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
    response: string;
  }[];
};
