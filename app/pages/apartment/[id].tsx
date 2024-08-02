import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

interface Apartment {
  id: number;
  name: string;
  description: string;
  price: number;
  location: string;
  amenities: string[];
  images: string[];
}

const ApartmentDetails = () => {
  const router = useRouter();
  const { id } = router.query;
  const [apartment, setApartment] = useState<Apartment | null>(null);

  useEffect(() => {
    if (id) {
      fetch(`/api/apartments/${id}`)
        .then((response) => response.json())
        .then((data) => setApartment(data));
    }
  }, [id]);

  if (!apartment) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">{apartment.name}</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Image
          src={apartment.images[0]}
          alt={apartment.name}
          className="w-full h-96 object-cover rounded-md"
        />
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
};

export default ApartmentDetails;
