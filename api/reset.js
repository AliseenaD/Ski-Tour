import pkg from "@prisma/client";
const { PrismaClient } = pkg;
const prisma = new PrismaClient();

async function resetSequence() {
  try {
    await prisma.$executeRaw`SELECT setval('"ReviewItem_id_seq"', (SELECT MAX(id) FROM "ReviewItem"))`;
    console.log("Sequence reset completed successfully!");
  } catch (error) {
    console.error("Error resetting sequence:", error);
  } finally {
    await prisma.$disconnect();
  }
}

resetSequence();