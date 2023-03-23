import type { NextApiRequest, NextApiResponse } from "next";
import { authOptions } from "../auth/[...nextauth]";
import { getServerSession } from "next-auth/next";
import prisma from "../../../prisma/client";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const session = await getServerSession(req, res, authOptions);
    if (!session) {
      return res.status(401).json({ message: "Please sign in" });
    }

    if (session.user?.email) {
      //Get the user
      const prismaUser = await prisma.user.findUnique({
        where: {
          email: session?.user?.email,
        },
      });

      if (prismaUser) {
        var commentLike = false;
        const commentId: string = req.body.id;

        //Check if user already has a like
        try {
          const like = await prisma.like.findFirst({
            where: {
              userId: prismaUser?.id,
              commentId: commentId,
            },
          });
          if (like === null) {
            commentLike = false;
          } else {
            commentLike = true;
            res.status(403).json({ message: "Error" });
          }
        } catch (err) {
          res.status(403).json({ message: "Error" });
        }

        if (commentLike === false) {
          //Add like
          try {
            const result = await prisma.like.create({
              data: {
                commentId,
                isPostLike: false,
                isCommentLike: true,
                userId: prismaUser.id,
              },
            });
            res.status(200).json(result.id);
          } catch (err) {
            res.status(403).json({ message: "Error liking post" });
          }
        }
      }
    } else {
      return res.status(401).json({ message: "Please sign in" });
    }
  }
}
