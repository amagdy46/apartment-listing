import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { id } = req.query;

  if (req.method === "GET") {
    const apartment = await prisma.apartment.findUnique({
      where: { id: Number(id) },
    });
    if (apartment) {
      res.status(200).json(apartment);
    } else {
      res.status(404).json({ message: "Apartment not found" });
    }
  } else {
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
