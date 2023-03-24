import type { NextApiRequest, NextApiResponse } from "next";
import { authOptions } from "../auth/[...nextauth]";
import { getServerSession } from "next-auth/next";
import prisma from "../../../prisma/client";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    const session = await getServerSession(req, res, authOptions);

    if (session?.user?.email) {
      //Get user
      const prismaUser = await prisma.user.findUnique({
        where: { email: session?.user?.email },
      });

      //Return user session
      if (prismaUser) {
        try {
          const user = prismaUser?.id;
          res.status(200).json(user);
        } catch (err) {
          res.status(403).json({ message: "Error retrieving posts" });
        }
      }
    } else if (!session) {
      res.status(200).json("anonymous_user");
    }
  }
}
