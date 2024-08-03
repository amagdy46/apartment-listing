import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Apartment, PrismaClient } from "@prisma/client";
import { FaBed, FaRuler, FaShower } from "react-icons/fa";

const prisma = new PrismaClient();

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
                  <div className="flex items-center justify-between flex-wrap">
                    <div>
                      <Link href={`/apartment/${apartment.id}`}>
                        <p className="text-indigo-500 inline-flex items-center md:mb-2 lg:mb-0">
                          View Details
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
                    </div>
                    <div className="flex  text-gray-500">
                      <span className="px-3 border-r-2">
                        ${apartment.price}
                      </span>
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
