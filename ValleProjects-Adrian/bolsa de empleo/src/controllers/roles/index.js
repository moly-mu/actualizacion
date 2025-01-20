import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Obtener todos los roles
const getData = async (req, res) => {
	try {
		const data = await prisma.role.findMany(); // findMany en Prisma
		res.json(data);
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};

// Obtener un rol por ID
    const getDataById = async (req, res) => {
	const { id } = req.params;
	try {
		const data = await prisma.role.findUnique({
			where: { id: parseInt(id) }, // findUnique en Prisma
		});
		if (!data) {
			return res.status(404).json({ message: "Role no encontrado" });
		}
		res.json(data);
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};

// Crear un nuevo rol
const postData = async (req, res) => {
	const { role_name } = req.body;
	try {
		const newPost = await prisma.role.create({
			data: { name: role_name }, // create en Prisma
		});
		res.status(201).json(newPost);
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};

// Actualizar un rol por ID
const updateDataById = async (req, res) => {
	const { id } = req.params;
	const { role_name } = req.body;
	try {
		const data = await prisma.role.findUnique({
			where: { id: parseInt(id) }, // findUnique en Prisma
		});
		if (!data) {
			return res.status(404).json({ message: "Role no encontrado" });
		}
		const updatedData = await prisma.role.update({
			where: { id: parseInt(id) }, // findUnique en Prisma
			data: { name: role_name }, // actualiza el rol
		});
		res.json(updatedData);
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};

export { getData, getDataById, postData, updateDataById };
