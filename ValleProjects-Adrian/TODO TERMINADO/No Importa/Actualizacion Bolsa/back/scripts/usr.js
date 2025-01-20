import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
    try {
        // Crear dos usuarios con diferentes datos
        const usuario1 = await prisma.usuarioInfo.create({
            data: {
                primerNombre: "Luis",
                segundoNombre: "Felipe",
                primerApellido: "Martínez",
                segundoApellido: "Ríos",
                tipoDocumento: "CC",
                numeroDocumento: "123987456",
                correoElectronico: "luis.martinez@example.com",
                contrasena: "password456",
                roleId: 1,
            },
        });

        const usuario2 = await prisma.usuarioInfo.create({
            data: {
                primerNombre: "Marta",
                segundoNombre: "Isabel",
                primerApellido: "González",
                segundoApellido: "Jiménez",
                tipoDocumento: "CC",
                numeroDocumento: "456123789",
                correoElectronico: "marta.gonzalez@example.com",
                contrasena: "password456",
                roleId: 1,
            },
        });

        console.log("Usuarios creados:", usuario1, usuario2);

        // Crear dos empresas con diferentes datos
        const empresa1 = await prisma.empresa.create({
            data: {
                email: "empresa3@example.com",
                password: "empresa456",
                razonSocial: "Empresa Tres S.A.S.",
                nit: "321654987",
                sector: "Educación",
                telefono: "3111234567",
                nombreEmpresa: "Educación Tres",
                ubicacion: "Calle 3 # 45-67, Cali",
                roleId: 2,
            },
        });

        const empresa2 = await prisma.empresa.create({
            data: {
                email: "empresa4@example.com",
                password: "empresa456",
                razonSocial: "Empresa Cuatro S.A.S.",
                nit: "654321987",
                sector: "Finanzas",
                telefono: "3117654321",
                nombreEmpresa: "Finanzas Cuatro",
                ubicacion: "Calle 4 # 89-01, Barranquilla",
                roleId: 2, 
            },
        });

        console.log("Empresas creadas:", empresa1, empresa2);

    } catch (error) {
        console.error("Error al insertar usuarios y empresas:", error);
    } finally {
        await prisma.$disconnect();
    }
}

main();
