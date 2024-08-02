import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";

interface Apartment {
  id: number;
  name: string;
  description: string;
  price: number;
  location: string;
  amenities: string[];
  images: string[];
}

const Home = () => {
  const [apartments, setApartments] = useState<Apartment[]>([]);

  useEffect(() => {
    fetch("/api/apartments")
      .then((response) => response.json())
      .then((data) => setApartments(data));
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Apartment Listings</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {apartments.map((apartment) => (
          <div key={apartment.id} className="border rounded-lg p-4">
            <Image
              src={apartment.images[0]}
              alt={apartment.name}
              className="w-full h-48 object-cover rounded-md mb-4"
            />
            <h2 className="text-xl font-semibold">{apartment.name}</h2>
            <p className="text-gray-700">{apartment.description}</p>
            <p className="text-gray-500">${apartment.price}</p>
            <Link href={`/apartment/${apartment.id}`}>
              <a className="text-blue-500 hover:underline mt-2 block">
                View Details
              </a>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
