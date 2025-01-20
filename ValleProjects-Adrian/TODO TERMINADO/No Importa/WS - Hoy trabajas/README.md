# Documento Explicativo del Programa: Flujo de Trabajo y Ejecución

## Descripción General

Este programa automatiza la extracción de ofertas de empleo desde la página web [hoytrabajas.com](https://hoytrabajas.com) utilizando Puppeteer, una biblioteca de Node.js. Después de recopilar la información de las ofertas, los datos se guardan en un archivo Excel, facilitando su consulta y análisis.

## Cómo Funciona

### Flujo del Programa

1. **Inicialización**:
   - Se importan las bibliotecas necesarias: `puppeteer` para la automatización del navegador, `xlsx` para la creación del archivo Excel, y `fs` y `path` para la gestión de archivos y directorios.

2. **Lanzamiento del Navegador**:
   - Se inicia una instancia de Chromium en modo "headless" (sin interfaz gráfica) y se abre una nueva pestaña.

3. **Navegación a la Página de Ofertas**:
   - El programa accede a la URL específica de las ofertas de empleo en Bogotá y espera hasta que se complete la carga de la página.

4. **Extracción de Enlaces**:
   - Se seleccionan todos los enlaces de las ofertas de empleo disponibles en la página principal y se almacenan en un array.

5. **Recopilación de Detalles de Cada Oferta**:
   - Para cada enlace de oferta:
     - Se navega a la URL de la oferta.
     - Se extraen el título de la oferta y el número de vacantes disponibles.
     - Se registra el enlace a la oferta.

6. **Almacenamiento de Datos**:
   - Los detalles de cada oferta se almacenan en un array que se convierte en una hoja de cálculo.

7. **Creación de Archivo Excel**:
   - Se crea un libro de trabajo Excel y se agrega la hoja con la información recopilada.
   - El archivo se nombra con la fecha actual y se guarda en una carpeta "Registro".

8. **Salida de Consola**:
   - Se imprimen los detalles de cada oferta en la consola para referencia inmediata.


![Diagrama de Flujo](C:\Users\Admin\Desktop\scrape1\mi-scraper\diagrama.png)

### Estructura del Código

- **Importación de Módulos**: Se cargan las bibliotecas necesarias.
- **Función Asíncrona**: Todo el proceso se ejecuta dentro de una función anónima asíncrona para permitir el uso de `await`.
- **Manejo de Promesas**: Las operaciones de navegación y extracción de datos se manejan utilizando promesas, lo que garantiza que el programa espera a que cada tarea se complete antes de continuar.

## Cómo Iniciar el Programa

Para ejecutar el programa, sigue estos pasos:

1. **Instalación de Node.js**:
   - Asegúrate de tener Node.js instalado en tu sistema. Puedes descargarlo desde [nodejs.org](https://nodejs.org).

2. **Configuración del Proyecto**:
   - Crea una nueva carpeta para tu proyecto y navega a ella en la terminal.
   - Inicializa un nuevo proyecto de Node.js:
     ```bash
     npm init -y
     ```

3. **Instalación de Dependencias**:
   - Instala las bibliotecas necesarias ejecutando:
     ```bash
     npm install puppeteer xlsx
     ```

4. **Creación del Archivo**:
   - Crea un archivo JavaScript (por ejemplo, `scraper.js`) y copia el código del programa en este archivo.

5. **Ejecución del Programa**:
   - En la terminal, ejecuta el programa con el siguiente comando:
     ```bash
     node scraper.js
     ```

6. **Revisión de Resultados**:
   - Después de que el programa se ejecute, revisa la consola para ver los detalles de las ofertas extraídas.
   - El archivo Excel generado se guardará en la carpeta "Registro", con un nombre que incluye la fecha de ejecución.

## Conclusión

Este programa proporciona una solución eficiente para la recolección y almacenamiento de información sobre ofertas de empleo. Su estructura permite una fácil adaptación y modificación, ofreciendo una herramienta útil para quienes buscan automatizar el scraping de datos desde sitios web.