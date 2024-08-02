import type { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "../../../utils/dbConnect";
import Apartment from "../../../models/Apartment";

dbConnect();

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "GET") {
    try {
      const apartments = await Apartment.find();
      res.status(200).json(apartments);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  } else if (req.method === "POST") {
    try {
      const apartment = new Apartment(req.body);
      const savedApartment = await apartment.save();
      res.status(201).json(savedApartment);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
};
