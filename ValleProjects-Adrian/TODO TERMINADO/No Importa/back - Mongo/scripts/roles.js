import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
    try {
        // Crear un rol para "usuario"
        const usuarioRole = await prisma.role.create({
            data: {
                name: "usuario",
            },
        });

        console.log("Rol de usuario creado:", usuarioRole);

        // Crear un rol para "empresa"
        const empresaRole = await prisma.role.create({
            data: {
                name: "empresa",
            },
        });

        console.log("Rol de empresa creado:", empresaRole);
    } catch (error) {
        console.error("Error al insertar roles:", error);
    } finally {
        await prisma.$disconnect();
    }
}

main();