import React, { useState, useEffect } from "react";
import Image from "next/image";
import { PrismaClient } from "@prisma/client";
import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";

const prisma = new PrismaClient();

interface Apartment {
  id: number;
  name: string;
  description: string;
  price: number;
  bedrooms: number;
  bathrooms: number;
  space: number;
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

  const [sliderRef, instanceRef] = useKeenSlider<HTMLDivElement>({
    loop: true,
    mode: "free-snap",
    slides: { perView: 1 },
  });

  if (!apartment) {
    return <div>Apartment not found</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-1">
          <div ref={sliderRef} className="keen-slider">
            {apartment.images.map((image, index) => (
              <div
                key={index}
                className="keen-slider__slide relative w-full h-96 mb-4"
              >
                <Image
                  src={image}
                  alt={`${apartment.name} - ${index + 1}`}
                  layout="fill"
                  objectFit="cover"
                  className="rounded-md"
                />
              </div>
            ))}
          </div>
        </div>
        <div className="flex-1 p-4">
          <h1 className="text-3xl font-bold mb-2">{apartment.name}</h1>
          <p className="text-xl text-gray-600 mb-4">
            EGP {apartment.price.toLocaleString()}
          </p>
          <div className="flex items-center mb-4">
            <span className="text-gray-600 mr-4">
              <i className="fas fa-bed"></i> {apartment.bedrooms} Bedrooms
            </span>
            <span className="text-gray-600 mr-4">
              <i className="fas fa-bath"></i> {apartment.bathrooms} Bathrooms
            </span>
            <span className="text-gray-600">
              <i className="fas fa-ruler-combined"></i> {apartment.space} sqft
            </span>
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
