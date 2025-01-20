// src/database.js
import { PrismaClient } from '@prisma/client';
import { getConfig } from "../config";
import dotenv from 'dotenv';

// Cargar las variables de entorno
dotenv.config();

const config = getConfig();

// Crear una instancia del cliente de Prisma
const prisma = new PrismaClient();

// Conectar y verificar la conexión
const checkConnection = async () => {
  try {
    await prisma.$connect();
    console.log("Conexión a MySQL conectada correctamente.");
  } catch (error) {
    console.error("No se puede conectar a MySQLDB:", error);
  }
};

// Llamar a la función para verificar la conexión
checkConnection();

export default prisma;
