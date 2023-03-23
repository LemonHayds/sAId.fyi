export type PostsType = {
  pages: {
    page: Page;
  };
  posts: Post[];
  nextId: string;
};

type Page = {
  page: {};
};

type Post = {
  comment: string;
  id: string;
  createdAt: string;
  likes: [];
  prompt: string;
  response: string;
  comments: [];
  user: {
    name: string;
    image: string;
  };
};
