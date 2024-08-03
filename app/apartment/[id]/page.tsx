import { PrismaClient } from "@prisma/client";
import ApartmentSlider from "../../components/ApartmentSlider";
import { FaBed, FaRuler, FaShower } from "react-icons/fa";

const prisma = new PrismaClient();

interface Apartment {
  id: number;
  name: string;
  description: string;
  price: number;
  bedrooms: number;
  bathrooms: number;
  space: number; // in sqft
  location: string;
  amenities: string[];
  images: string[];
}

// Fetch apartment data on the server
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
      <div className="flex flex-col  gap-4">
        <div>
          <ApartmentSlider images={apartment.images} name={apartment.name} />
        </div>
        <div>
          <h1 className="text-3xl font-bold mb-8">{apartment.name}</h1>

          <div className="flex  mb-4 text-gray-500">
            <span className="pr-3 border-r-2">${apartment.price}</span>
            <div className="flex items-center align-middle px-3 border-r-2">
              <span className="mr-2">{apartment.bedrooms}</span>
              <FaBed />
            </div>
            <div className="flex items-center align-middle px-3 border-r-2">
              <span className="mr-2">{apartment.bathrooms}</span>
              <FaShower />
            </div>
            <div className="flex items-center align-middle px-3">
              <span className="mr-2">
                {apartment.space}M<sup>2</sup>
              </span>
              <FaRuler />
            </div>
          </div>
          <p className="text-gray-700 mb-4">{apartment.description}</p>
          <div className="mb-4">
            <h2 className="text-xl font-semibold">Amenities</h2>
            <ul className="list-disc list-inside">
              {apartment.amenities.map((amenity, index) => (
                <li key={index}>{amenity}</li>
              ))}
            </ul>
          </div>
          <div className="flex space-x-4">
            <button className="bg-red-500 text-white px-4 py-2 rounded-md">
              Call
            </button>
            <button className="bg-blue-500 text-white px-4 py-2 rounded-md">
              Email
            </button>
            <button className="bg-green-500 text-white px-4 py-2 rounded-md">
              WhatsApp
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
