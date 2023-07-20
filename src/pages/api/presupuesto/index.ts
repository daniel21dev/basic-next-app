import type { NextApiRequest, NextApiResponse } from "next";
import { dbConnect } from "@/db";
import { IPresupuesto, Presupuesto } from "@/models/Presupuesto";

type Data =
  | {
      msg: string;
    }
  | IPresupuesto;

export default function hanlder(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  switch (req.method) {
    case "POST":
      return createPresupuesto(req, res);

    default:
      return res.status(405).send({ msg: `Method ${req.method} Not Allowed` });
  }
}

async function createPresupuesto(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  await dbConnect();
  const { presupuesto } = req.body;
  console.log(presupuesto);

  const newPresupuesto = new Presupuesto(presupuesto);

  const savedPresupuesto = await newPresupuesto.save();

  return res.status(201).json(savedPresupuesto);
}
