import type { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "../../../utils/dbConnect";
import Apartment from "../../../models/Apartment";

dbConnect();

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { id } = req.query;

  if (req.method === "GET") {
    try {
      const apartment = await Apartment.findById(id);
      if (!apartment) {
        return res.status(404).json({ message: "Apartment not found" });
      }
      res.status(200).json(apartment);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
};
