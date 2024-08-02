import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    const apartments = await prisma.apartment.findMany();
    res.status(200).json(apartments);
  } else if (req.method === "POST") {
    const { name, description, price, location, amenities, images } = req.body;
    const apartment = await prisma.apartment.create({
      data: {
        name,
        description,
        price,
        location,
        amenities,
        images,
      },
    });
    res.status(201).json(apartment);
  } else {
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
