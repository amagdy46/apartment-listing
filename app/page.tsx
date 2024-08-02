import React from "react";
import Link from "next/link";
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

// Fetch apartment listings on the server
async function getApartments(): Promise<Apartment[]> {
  return await prisma.apartment.findMany();
}

export default async function HomePage() {
  const apartments = await getApartments();

  return (
    <section className="text-gray-600 body-font bg-white">
      <div className="container px-5 py-24 mx-auto">
        <div className="flex flex-wrap -m-4">
          {apartments.map((apartment) => (
            <div key={apartment.id} className="p-4 md:w-1/3">
              <div className="h-full border-2 border-gray-200 border-opacity-60 rounded-lg overflow-hidden">
                <div className="relative w-full h-48">
                  <Image
                    src={apartment.images[0]}
                    alt={apartment.name}
                    layout="fill"
                    objectFit="cover"
                    className="lg:h-48 md:h-36 w-full object-cover object-center"
                  />
                </div>
                <div className="p-6">
                  <h2 className="tracking-widest text-xs title-font font-medium text-gray-400 mb-1">
                    {apartment.location}
                  </h2>
                  <h1 className="title-font text-lg font-medium text-gray-900 mb-3">
                    {apartment.name}
                  </h1>
                  <p className="leading-relaxed mb-3">
                    {apartment.description}
                  </p>
                  <div className="flex items-center flex-wrap">
                    <Link href={`/apartment/${apartment.id}`}>
                      <p className="text-indigo-500 inline-flex items-center md:mb-2 lg:mb-0">
                        Learn More
                        <svg
                          className="w-4 h-4 ml-2"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth="2"
                          fill="none"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="M5 12h14"></path>
                          <path d="M12 5l7 7-7 7"></path>
                        </svg>
                      </p>
                    </Link>
                    <span className="text-gray-400 mr-3 inline-flex items-center lg:ml-auto md:ml-0 ml-auto leading-none text-sm">
                      ${apartment.price}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
