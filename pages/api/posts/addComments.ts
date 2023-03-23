import type { NextApiRequest, NextApiResponse } from "next";
import { authOptions } from "../auth/[...nextauth]";
import { getServerSession } from "next-auth/next";
import prisma from "../../../prisma/client";

type CommentProps = {
  comment: string;
  postId: string;
};

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
          email: session.user?.email,
        },
      });

      if (prismaUser) {
        //Add comment
        try {
          const { comment, postId }: CommentProps = req.body.data;

          if (!comment.length) {
            return res.status(401).json({ message: "Comment too short" });
          }

          const result = await prisma.comment.create({
            data: {
              comment,
              userId: prismaUser?.id,
              postId: postId,
            },
          });
          res.status(200).json(result);
        } catch (err) {
          res.status(403).json({ message: "Error deleting post" });
        }
      } else {
        return res.status(401).json({ message: "Please sign in" });
      }
    } else {
      return res.status(401).json({ message: "Please sign in" });
    }
  }
}
