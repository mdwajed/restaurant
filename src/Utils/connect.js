import { PrismaClient } from "@prisma/client";

const prismaClientSingleton = () => {
  return new PrismaClient();
};

// Attach PrismaClient to globalThis in development to prevent multiple instances
const prisma = globalThis.prismaGlobal ?? prismaClientSingleton();

export default prisma;

// If not in production, store PrismaClient instance in globalThis
if (process.env.NODE_ENV !== "production") {
  globalThis.prismaGlobal = prisma;
}
