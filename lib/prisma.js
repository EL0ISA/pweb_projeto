// lib/prisma.js
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export { prisma }; // Certifique-se de usar export named, não default

export default prisma;