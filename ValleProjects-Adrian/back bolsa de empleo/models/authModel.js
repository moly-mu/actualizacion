const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Buscar un usuario por correo electrónico
async function findUserByEmail(email) {
    return await prisma.usuarioInfo.findUnique({
        where: { correoElectronico: email },
        include: { role: true },
    });
}

// Crear un nuevo usuario
async function createUser(data) {
    // Solo se crea el usuario con el rol de "usuario"
    return await prisma.usuarioInfo.create({
        data: {
            ...data,
            roleId: 1,  // Asumiendo que el ID de "usuario" es 1
        },
    });
}

// Buscar un rol por nombre
async function findRoleByName(roleName) {
    return await prisma.role.findUnique({
        where: { name: roleName },
    });
}

// Buscar una empresa por correo electrónico
async function findCompanyByEmail(email) {
    return await prisma.empresa.findFirst({
        where: {
            email: email,
        },
    });
}


// Crear una nueva empresa
async function createCompany(data) {
    // Solo se crea el usuario con el rol de "usuario"
    return await prisma.empresa.create({
        data: {
            ...data,
            roleId: 2,  // Asumiendo que el ID de "usuario" es 1
        },
    });
}


// Crear una relación de empresa en la tabla Empresa
async function createEmpresa(data) {
    return await prisma.empresa.create({
        data,
    });
}

module.exports = {
    findUserByEmail,
    createUser,
    findRoleByName,
    findCompanyByEmail,
    createCompany,
    createEmpresa,
};
