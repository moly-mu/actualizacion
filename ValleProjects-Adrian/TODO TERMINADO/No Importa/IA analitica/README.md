# Proyecto de Análisis de CV y Ofertas de Trabajo

## VERIFICA PRIMERAMENTE EL CONSUMO DE TOKENS EN EL ARCHIVO PROMPTUTILS.JS (NO ESTOY SEGURO SI SU CONSUMO ES EL ESPERADO).

Este proyecto está diseñado para analizar currículums y comparar la relevancia de ofertas de trabajo utilizando el modelo de OpenAI GPT-4. El análisis busca identificar qué ofertas de trabajo son relevantes para cada currículum, basándose en la descripción del trabajo y el contenido del currículum.

## Estructura del Proyecto

El proyecto consta de los siguientes archivos:

- **`index.js`**: El punto de entrada del proyecto. Ejecuta el proceso de análisis.
- **`processJobs.js`**: Contiene la lógica principal para cargar y analizar los currículums y las ofertas de trabajo.
- **`fileUtils.js`**: Proporciona funciones utilitarias para manejar archivos.
- **`promptUtils.js`**: Maneja la interacción con la API de OpenAI para generar respuestas sobre la relevancia de trabajos para un currículum.

## Instalación

Para instalar y ejecutar este proyecto, sigue estos pasos:

1. Clona este repositorio o descarga los archivos.
2. Instala las dependencias necesarias utilizando npm:

    ```bash
    npm install
    ```

3. Crea un archivo `.env` en la raíz del proyecto y agrega tu clave de API de OpenAI:

    ```text
    OPENAI_API_KEY=tu_clave_de_api_aqui
    ```

4. Coloca los currículums en formato `.txt` en la carpeta `cv/` y las ofertas de trabajo en formato `.json` en la carpeta `jobs/`.

5. Ejecuta el proyecto:

    ```bash
    node index.js
    ```

## Descripción del Proyecto

### Archivos de Entrada

- **Currículums (`cv/`)**: Los currículums deben estar en formato `.txt`. Cada archivo representa un currículum individual.
- **Ofertas de Trabajo (`jobs/`)**: Las ofertas de trabajo deben estar en formato `.json`. Cada archivo puede contener uno o más trabajos, con los siguientes campos:
    - **`Title`**: El título del trabajo.
    - **`Description`**: Descripción del trabajo.
    - **`Keyword`**: Palabras clave relacionadas con el trabajo (opcional).
    - **`Location`**: Ubicación del trabajo.
    - **`ClosingDate`**: Fecha de cierre de la oferta.
    - **`Link`**: Enlace a la oferta de trabajo.

### Flujo de Ejecución

1. El script `index.js` ejecuta la función `processJobsAndCVs` que procesa los currículums y las ofertas de trabajo.
2. La función `processJobsAndCVs` carga todos los archivos `.json` de la carpeta `jobs/` y los archivos `.txt` de la carpeta `cv/`.
3. Para cada currículum, se realiza una consulta a la API de OpenAI para determinar la relevancia de cada oferta de trabajo.
4. La relevancia de cada oferta se evalúa con un mensaje generado por OpenAI, que compara el currículum con la descripción del trabajo.
5. Los resultados relevantes se guardan en un archivo `results.json`.

### Funciones Principales

- **`queryOpenAI(prompt)`**: Envía una solicitud a la API de OpenAI para obtener una respuesta sobre la relevancia de un trabajo para un currículum.
- **`queryOpenAIRetry(prompt, retries = 0)`**: Realiza una solicitud a la API con reintentos en caso de error.
- **`processJobsAndCVs()`**: El proceso principal que carga los currículums y trabajos, realiza el análisis de relevancia, y guarda los resultados.
- **`loadFilesByExtension(directoryPath, extension)`**: Carga los archivos de una carpeta con una extensión específica.

### Archivos de Salida

- **`results.json`**: Un archivo que contiene los resultados del análisis. Cada entrada en el archivo incluye:
    - **`cv`**: El nombre del archivo de currículum.
    - **`job`**: Los detalles de la oferta de trabajo relevante.
    - **`relevance`**: "Sí" o "No", dependiendo de si la oferta es relevante para el currículum.
    - **`reasoning`**: El razonamiento proporcionado por OpenAI sobre la relevancia.

## Configuración y Personalización

- **API Key de OpenAI**: La clave de API de OpenAI es necesaria para realizar consultas al modelo GPT-4. Asegúrate de incluirla en el archivo `.env` como `OPENAI_API_KEY=tu_clave_de_api_aqui`.
- **Máximo de reintentos**: Si la API de OpenAI falla, el sistema intentará realizar la solicitud hasta tres veces antes de continuar con el siguiente trabajo.
- **Límites de tasa**: Se incluye un retraso entre las solicitudes a la API para evitar sobrepasar los límites de tasa de OpenAI.