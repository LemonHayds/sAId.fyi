import prisma from "@/prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    console.log(req.query.details);
    const details = req.query.details?.toString();
    //Get specific post
    try {
      const data = await prisma.post.findUnique({
        where: {
          id: details,
        },
        include: {
          user: true,
          likes: true,
          comments: {
            orderBy: {
              createdAt: "desc",
            },
            include: {
              user: true,
              likes: true,
            },
          },
        },
      });
      res.status(200).json(data);
    } catch (err) {
      res.status(403).json({ message: "Error retrieving post" });
    }
  }
}
