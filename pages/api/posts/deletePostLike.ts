import type { NextApiRequest, NextApiResponse } from "next";
import { authOptions } from "../auth/[...nextauth]";
import { getServerSession } from "next-auth/next";
import prisma from "../../../prisma/client";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "DELETE") {
    const session = await getServerSession(req, res, authOptions);
    if (!session) {
      return res.status(401).json({ message: "Please sign in" });
    }

    //Get auth current
    try {
      const likeId = req.body;
      const result = await prisma.like.delete({
        where: {
          id: likeId,
        },
      });
      res.status(200).json(result);
    } catch (err) {
      res.status(403).json({ message: "Error deleting like" });
    }
  }
}
