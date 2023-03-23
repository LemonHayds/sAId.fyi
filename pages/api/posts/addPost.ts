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
      return res
        .status(401)
        .json({ message: "You need to sign in before you can say anything" });
    }

    if (session.user?.email) {
      const comment: string = req.body.comment;
      const prompt: string = req.body.prompt;
      const itSaid: string = req.body.selectedItSaid;

      //Get user
      const prismaUser = await prisma.user.findUnique({
        where: { email: session?.user?.email },
      });

      if (prismaUser?.id) {
        //Check post
        if (comment.length > 300)
          return res.status(403).json({
            message:
              "Comment too long. Please make sure it's under 300 characters",
          });
        if (!comment.length) {
          return res.status(403).json({ message: "Your comment is empty 🤷‍♂️" });
        }

        //Create post
        try {
          const result = await prisma.post.create({
            data: {
              prompt,
              comment,
              response: itSaid,
              userId: prismaUser.id,
            },
          });
          res.status(200).json(result);
        } catch (err) {
          res.status(403).json({ message: "Error creating post" });
        }
      } else {
        return res.status(403).json({ message: "Error creating post" });
      }
    } else {
      return res.status(403).json({ message: "Error creating post" });
    }
  }
}
