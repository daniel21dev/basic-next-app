import type { NextApiRequest, NextApiResponse } from "next";
import { dbConnect } from "@/db";
import { ConfigOrigenAhorro, IConfigOrigenAhorro } from "@/models";

type Data =
  | {
      msg: string;
    }
  | IConfigOrigenAhorro;

export default function hanlder(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  switch (req.method) {
    case "GET":
      return getOrigenConfig(req, res);

    default:
      return res.status(405).send({ msg: `Method ${req.method} Not Allowed` });
  }
}

async function getOrigenConfig(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  await dbConnect();
  console.log("req.query");

  const origenesAhorro = await ConfigOrigenAhorro.findOne({}).lean();

  return res.status(201).json(origenesAhorro as any);
}
