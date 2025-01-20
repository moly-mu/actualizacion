const { MongoClient } = require('mongodb');
const moment = require('moment'); // Utilizamos la librería Moment.js para manejar fechas más fácilmente

// URL de conexión a la base de datos de MongoDB
const url = process.env.MONGO_URL; // URL de conexión a MongoDB desde el archivo .env
const dbName = process.env.DB_NAME; // Nombre de la base de datos desde el archivo .env
const collectionName = process.env.COLLECTION_NAME; // Nombre de la colección desde el archivo .env

// Función para convertir las fechas al formato Date
function parsearFecha(fecha) {
  // Si el formato es "Vence 27 Nov 2024"
  const regexFechaTexto = /^Vence (\d{1,2}) ([A-Za-záéíóúÁÉÍÓÚ]+) (\d{4})$/;
  const match = fecha.match(regexFechaTexto);
  if (match) {
    const [_, dia, mes, anio] = match;
    // Configurar Moment.js para manejar meses en español
    moment.locale('es'); // Esto asegura que Moment.js interprete correctamente los nombres de los meses en español
    const fechaParseada = moment(`${dia} ${mes} ${anio}`, 'D MMM YYYY'); // Utilizamos Moment.js para parsear la fecha
    return fechaParseada.isValid() ? fechaParseada.toDate() : null;
  }

  // Si el formato es "27/11/2024"
  const fechaParseada = moment(fecha, 'DD/MM/YYYY');
  return fechaParseada.isValid() ? fechaParseada.toDate() : null;
}

// Función para eliminar ofertas expiradas
async function eliminarOfertasExpiradas() {
  const client = new MongoClient(url);

  try {
    await client.connect();
    console.log('Conectado a la base de datos');

    // Obtener la base de datos y la colección
    const db = client.db(dbName);
    const collection = db.collection(collectionName);

    // Obtener la fecha actual, estableciendo la hora a las 00:00:00 para evitar comparar horas
    const fechaActual = moment().startOf('day').toDate(); // Esto asegura que solo se compare la fecha sin horas

    // Consultar todas las ofertas laborales con el campo ClosingDate
    const ofertas = await collection.find({ "ClosingDate": { $exists: true } }).toArray();

    // Filtrar y eliminar las ofertas expiradas
    const ofertasExpiradas = ofertas.filter(oferta => {
      const fechaClosing = parsearFecha(oferta.ClosingDate);
      return fechaClosing && fechaClosing < fechaActual; // Si la fecha de cierre es menor a la fecha actual
    });

    // Si hay ofertas expiradas, eliminarlas de la base de datos
    if (ofertasExpiradas.length > 0) {
      const idsExpirados = ofertasExpiradas.map(oferta => oferta._id);
      const result = await collection.deleteMany({ _id: { $in: idsExpirados } });
      console.log(`${result.deletedCount} ofertas laborales expiradas eliminadas.`);
    } else {
      console.log('No hay ofertas expiradas.');
    }

  } catch (error) {
    console.error('Error al conectar o eliminar ofertas', error);
  } finally {
    // Cerrar la conexión
    await client.close();
  }
}

// Llamar a la función para eliminar las ofertas expiradas
eliminarOfertasExpiradas();