import {PrismaNeon} from '@prisma/adapter-neon';
import { PrismaClient } from '../generated/prisma/client'; // prisma new v condition
import dotenv from 'dotenv';

dotenv.config();

// creation de client prisma avec Neon Adapter
const adapter = new PrismaNeon({
    connectionString: process.env.DATABASE_URL,
});

const prisma = new PrismaClient({
    adapter,
    log: ['query', 'info', 'warn', 'error'], 
});
 
export default prisma;