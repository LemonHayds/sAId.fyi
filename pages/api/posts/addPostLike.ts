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
    if (!session || !session.user?.email) {
      return res
        .status(401)
        .json({ message: "You need to sign in to like posts" });
    }

    if (session?.user?.email) {
      //Get the user
      const prismaUser = await prisma.user.findUnique({
        where: {
          email: session?.user?.email,
        },
      });

      if (prismaUser?.id) {
        var postLiked = false;
        const postId: string = req.body.id;

        //Check if user already has a like
        try {
          const like = await prisma.like.findFirst({
            where: {
              userId: prismaUser?.id,
              postId: postId,
            },
          });
          if (like === null) {
            postLiked = false;
          } else {
            postLiked = true;
            res.status(403).json({ message: "Error" });
          }
        } catch (err) {
          res.status(403).json({ message: "Error" });
        }

        if (postLiked === false) {
          //Add like
          try {
            const result = await prisma.like.create({
              data: {
                postId,
                isPostLike: true,
                isCommentLike: false,
                userId: prismaUser.id,
              },
            });
            res.status(200).json(result.id);
          } catch (err) {
            res
              .status(403)
              .json({ message: "You must be signed in to like posts" });
          }
        } else {
        }
      }
    }
  }
}
