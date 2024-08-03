const { PrismaClient } = require("@prisma/client");
const { faker } = require("@faker-js/faker");
const prisma = new PrismaClient();

async function main() {
  for (let i = 0; i < 10; i++) {
    await prisma.apartment.create({
      data: {
        name: faker.location.street(),
        description: faker.lorem.sentence(),
        price: parseFloat(faker.commerce.price()),
        location: `${faker.location.city()}, ${faker.location.state()}`,
        bedrooms: faker.number.int({ min: 1, max: 5 }),
        bathrooms: faker.number.int({ min: 1, max: 3 }),
        space: faker.number.int({ min: 70, max: 300 }),
        amenities: faker.helpers.arrayElements(
          ["Pool", "Gym", "Wi-Fi", "Parking", "Pet-friendly"],
          3
        ),
        images: Array.from({ length: 10 }, () =>
          faker.image.urlLoremFlickr({
            category: "city",
            keyword: "apartment",
            width: 640,
            height: 480,
          })
        ),
      },
    });
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
