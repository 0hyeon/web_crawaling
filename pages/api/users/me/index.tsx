import { NextApiRequest, NextApiResponse } from "next";
import withHandler, { ResponseType } from "@libs/server/withHandler";
import client from "@libs/server/clients";
import { withApiSession } from "@libs/server/withSession";

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>
) {
  try {
    if (req.method === "GET") {
      const profile = await client.user.findFirst({
        where: { name: String(req.session.user?.id) },
      });

      if (!profile) {
        return res.status(404).json({ ok: false, error: "Profile not found" });
      }

      res.json({
        ok: true,
        profile,
      });
    }
  } catch (error) {
    console.error("Error in handler:", error);
    res.status(500).json({ ok: false, error: "Internal server error" });
  }
}

export default withApiSession(
  withHandler({
    methods: ["GET"],
    handler,
  })
);
