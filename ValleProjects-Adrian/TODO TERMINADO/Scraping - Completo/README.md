
# Documentación del Proyecto

## 1. Descripción General del Proyecto

Este proyecto está diseñado para realizar scraping de sitios web de ofertas de empleo en Colombia. El scraping extrae información relevante sobre vacantes de empleo (como el título, la descripción, la ubicación, el salario, etc.) y la almacena en una base de datos MongoDB utilizando el modelo de `vacante.js`.

## 2. Estructura del Proyecto

El proyecto está dividido en diferentes scripts y módulos que realizan tareas específicas:

1. **`vacante.js`**: Contiene el modelo de datos para la base de datos MongoDB donde se almacenan las vacantes de empleo.
2. **`vacantesService.js`**: Maneja las operaciones con la base de datos, como insertar nuevas vacantes y obtener vacantes existentes.
3. **Scrapers (`hoytrabajas.js`, `elempleo.js`, `colombiatrabajos.js`)**: Son responsables de realizar scraping en los sitios web de empleo y extraer los datos de las vacantes.
4. **`main.js`**: Inicia un servidor Express para servir la API y manejar peticiones de los usuarios.
5. **`modelojson.js`**: Función que devuelve la estructura básica de los datos de una vacante para que pueda ser utilizada en los scrapers.

## 3. Flujo del Proyecto

### 1. Iniciar el Proyecto

1. **Instalar dependencias**:  
   Antes de ejecutar el proyecto, asegúrate de tener las dependencias necesarias. En la raíz del proyecto, ejecuta:
   ```bash
   npm install
   ```

2. **Conectar con la base de datos MongoDB**:  
   Asegúrate de que MongoDB esté corriendo o de tener configurada una base de datos en la nube (por ejemplo, MongoDB Atlas). La conexión se realiza dentro del archivo `vacante.js`, a través de Mongoose. Ademas recuerda que debes renombra el archivo `.env.example` a `.env` y complétalo con la información correspondiente. Esto permitirá que las variables de entorno se activen correctamente.

3. **Iniciar el servidor**:  
   Para iniciar el servidor, ejecuta:
   ```bash
   node main.js
   ```
   Esto pondrá en marcha el servidor Express que sirve la API.

### 2. Realizar el Scraping

1. **Iniciar el navegador Puppeteer**:  
   Los scrapers de cada sitio web (como `hoytrabajas.js`, `elempleo.js` y `colombiatrabajos.js`) utilizan Puppeteer para abrir un navegador, navegar a la página de empleo y extraer los datos.

2. **Ejecutar el scraper**:  
   Para cada sitio web de ofertas de empleo, los scrapers siguen este flujo:
   - Inician el navegador con Puppeteer.
   - Navegan a la página principal del sitio de empleo.
   - Recogen todas las URLs de las ofertas de empleo disponibles.
   - Para cada URL, navegan a la página de detalle de la oferta y extraen los datos relevantes (título, descripción, fecha de cierre, etc.).
   - Almacenan los datos extraídos en el modelo de vacante y los insertan en la base de datos.

### 3. Almacenar los Datos

- Después de realizar el scraping y obtener la información de las vacantes, los datos se insertan en la base de datos MongoDB utilizando el modelo de `vacante.js`.
- En el archivo `vacantesService.js`, las vacantes se insertan usando el método `insertarVacantesDesdeJSON(filePath)` o se obtienen con el método `obtenerVacantes()`. 

### 4. Flujo de Datos

1. **Scraper -> Modelo JSON**:  
   Los scrapers (`hoytrabajas.js`, `elempleo.js`, `colombiatrabajos.js`) extraen datos de las páginas web y los convierten en objetos JSON que siguen la estructura definida en `vacante.js` (título, descripción, fecha de cierre, etc.).

2. **Modelo JSON -> Base de Datos**:  
   Una vez que los datos son extraídos, se insertan en la base de datos MongoDB utilizando el modelo definido en `vacante.js`. Este modelo define la estructura y validaciones para las vacantes.

3. **Base de Datos -> API**:  
   El servidor Express en `main.js` sirve como interfaz entre el frontend y la base de datos. Proporciona rutas API para obtener y mostrar las vacantes almacenadas en la base de datos.

## 5. Flujo de Ejecución

1. **Iniciar el servidor**:  
   Al ejecutar `main.js`, el servidor Express se inicia y está listo para recibir solicitudes.

2. **Realizar el scraping**:  
   Puedes ejecutar manualmente los scrapers para cada uno de los sitios de empleo (hoytrabajas, elempleo, colombiatrabajos) desde la consola de Node.js. Esto extraerá los datos y los insertará en la base de datos.

3. **Consultar los datos**:  
   Desde la API, puedes consultar las vacantes almacenadas utilizando las rutas definidas en `main.js`. Estas rutas devuelven las vacantes en formato JSON.

---

## 6. Cómo Ejecutar el Proyecto

### Paso 1: Instalar dependencias

En la raíz del proyecto, ejecuta el siguiente comando para instalar todas las dependencias:

```bash
npm install
```

### Paso 2: Iniciar el servidor

Inicia el servidor con el siguiente comando:

```bash
node main.js
```

### Paso 3: Realizar scraping

Para realizar el scraping y guardar las vacantes, ejecuta uno de los scrapers en la consola de Node.js. Por ejemplo, para ejecutar el scraper de `hoytrabajas`:

```bash
node hoytrabajas.js
```

---

## 7. Consideraciones Adicionales

- **MongoDB**: Asegúrate de tener acceso a una base de datos MongoDB para almacenar las vacantes. Puedes usar una base de datos local o configurar una en la nube con servicios como MongoDB Atlas.
- **Puppeteer**: Los scrapers dependen de Puppeteer, por lo que asegúrate de tenerlo instalado correctamente y de que tu entorno de desarrollo tenga acceso a Chrome o Chromium.
