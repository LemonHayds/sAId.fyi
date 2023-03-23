import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../prisma/client";

var today = new Date();
today.setUTCHours(0, 0, 0, 0);

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    const limit = 5;
    const cursor = req.query.cursor ?? "";
    const cursorObj = cursor === "" ? undefined : { id: cursor as string };

    //Fetch top today posts
    try {
      const posts = await prisma.post.findMany({
        take: limit,
        cursor: cursorObj,
        skip: cursor === "" ? 0 : 1,
        where: {
          published: true,
          createdAt: {
            gte: today,
          },
        },
        include: {
          user: true,
          comments: true,
          likes: true,
        },
        orderBy: {
          likes: {
            _count: "desc",
          },
        },
      });
      const nextId = posts.length === limit ? posts[limit - 1].id : undefined;
      res.status(200).json({
        posts,
        nextId,
      });
    } catch (err) {
      res.status(403).json({ message: "Error fetching posts" });
    }
  }
}
