import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(req: NextRequest, res: NextResponse) {
  const id = req.nextUrl.pathname.split("/").pop();

  try {
    const apartment = await prisma.apartment.findUnique({
      where: { id: Number(id) },
    });
    if (apartment) {
      return NextResponse.json(apartment);
    } else {
      return NextResponse.json(
        { error: "Apartment not found" },
        { status: 404 }
      );
    }
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch apartment" },
      { status: 500 }
    );
  }
}
