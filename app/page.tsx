import Image from "next/image";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

interface Apartment {
  id: number;
  name: string;
  description: string;
  price: number;
  location: string;
  amenities: string[];
  images: string[];
}

async function getApartment(id: string): Promise<Apartment | null> {
  return await prisma.apartment.findUnique({
    where: { id: parseInt(id) },
  });
}

export default async function ApartmentDetails({
  params,
}: {
  params: { id: string };
}) {
  const apartment = await getApartment(params.id);

  if (!apartment) {
    return <div>Apartment not found</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">{apartment.name}</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="relative w-full h-96">
          <Image
            src={apartment.images[0]}
            alt={apartment.name}
            layout="fill"
            objectFit="cover"
            className="rounded-md"
          />
        </div>
        <div>
          <p className="text-gray-700">{apartment.description}</p>
          <p className="text-gray-500">${apartment.price}</p>
          <p className="text-gray-500">{apartment.location}</p>
          <h2 className="text-xl font-semibold mt-4">Amenities</h2>
          <ul className="list-disc list-inside">
            {apartment.amenities.map((amenity, index) => (
              <li key={index}>{amenity}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
