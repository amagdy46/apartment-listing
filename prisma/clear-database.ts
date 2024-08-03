const { PrismaClient: client } = require("@prisma/client");

const prismaClient = new client();

async function clearDatabase() {
  try {
    // Delete all apartments
    await prismaClient.apartment.deleteMany();

    console.log("Database cleared successfully");
  } catch (error) {
    console.error("Error clearing database:", error);
  } finally {
    await prismaClient.$disconnect();
  }
}

clearDatabase();
