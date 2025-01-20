// Importamos las librerías necesarias
const { MongoClient } = require('mongodb');
const fs = require('fs');
const path = require('path');

// URL de conexión a la base de datos de MongoDB
const url = process.env.MONGO_URL; // URL de conexión a MongoDB desde el archivo .env
const dbName = process.env.DB_NAME; // Nombre de la base de datos desde el archivo .env
const collectionName = process.env.COLLECTION_NAME; // Nombre de la colección desde el archivo .env

// Función para leer todos los archivos .json en una carpeta
function leerArchivosJSON(carpeta) {
  const archivos = fs.readdirSync(carpeta); // Leer los archivos de la carpeta

  // Filtrar solo los archivos con extensión .json
  const archivosJson = archivos.filter(archivo => archivo.endsWith('.json'));

  const ofertas = [];
  archivosJson.forEach(archivo => {
    const archivoPath = path.join(carpeta, archivo); // Ruta completa del archivo
    const contenidoArchivo = fs.readFileSync(archivoPath, 'utf-8');
    const datos = JSON.parse(contenidoArchivo);
    ofertas.push(...datos); // Agregar las ofertas del archivo al array principal

    // Eliminar el archivo después de procesarlo
    fs.unlinkSync(archivoPath); // Eliminar el archivo .json de la carpeta
    console.log(`Archivo eliminado: ${archivo}`); // Mostrar un mensaje en consola
  });

  return ofertas;
}

// Función para conectar a MongoDB e insertar las ofertas
async function insertarOfertas() {
  const carpeta = path.join(__dirname, 'Registro'); // Ruta de la carpeta con los archivos .json

  const ofertas = leerArchivosJSON(carpeta); // Cargar las ofertas desde los archivos .json

  // Conectar a la base de datos
  const client = new MongoClient(url);

  try {
    await client.connect();
    console.log('Conectado a la base de datos');

    // Obtener la base de datos y la colección
    const db = client.db(dbName);
    const collection = db.collection(collectionName);

    // Insertar las ofertas laborales
    const result = await collection.insertMany(ofertas);
    console.log(`${result.insertedCount} ofertas laborales insertadas.`);
  } catch (error) {
    console.error('Error al conectar o insertar datos', error);
  } finally {
    // Cerrar la conexión
    await client.close();
  }
}

// Llamar a la función para insertar las ofertas
insertarOfertas();
