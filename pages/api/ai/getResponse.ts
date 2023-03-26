import type { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";

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

    const systemMessage = {
      role: "system",
      content: "",
    };

    const apiMessage = {
      role: "user",
      content: req.body.prompt,
    };

    const apiRequestBody = {
      model: "gpt-3.5-turbo",
      messages: [systemMessage, apiMessage],
    };

    try {
      //Fetch response
      await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
          Authorization: "Bearer " + process.env.OPENAI_API_KEY,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(apiRequestBody),
      })
        .then((data) => {
          return data.json();
        })
        .then((data) => {
          res.status(200).json(data);
        });
    } catch (err) {
      res.status(403).json({ message: "Error fetching response from AI" });
    }
  }
}
