import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(req: NextRequest) {

  await runMiddleware(req, res, cors);
  try {
    const apartments = await prisma.apartment.findMany();
    return NextResponse.json(apartments);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch apartments" },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  await runMiddleware(req, res, cors);
  try {
    const { name, description, price, location, amenities, images } =
      await req.json();
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
    return NextResponse.json(apartment, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to create apartment" },
      { status: 500 }
    );
  }
}
