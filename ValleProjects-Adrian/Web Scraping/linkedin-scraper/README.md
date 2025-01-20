# Guía de Uso del Programa de Scraping con Puppeteer

## 1. Introducción
Este documento describe el funcionamiento de un programa de scraping en JavaScript utilizando la biblioteca Puppeteer. El propósito del programa es extraer información clave de ofertas de trabajo publicadas en LinkedIn. El script abre un navegador en modo headless (sin interfaz gráfica), navega a la página del trabajo especificada por una URL, extrae los datos relevantes y finalmente cierra el navegador.

## 2. Requisitos Previos
Para ejecutar este programa, es necesario tener instalado lo siguiente:

1. [Node.js](https://nodejs.org/) – Se recomienda la versión LTS más reciente.
2. Puppeteer – Se puede instalar mediante npm.
3. Acceso a una URL válida de una oferta de trabajo en LinkedIn.

## 3. Instalación
1. Instala Node.js desde el sitio oficial si aún no lo tienes instalado.
2. Una vez instalado Node.js, abre una terminal o consola de comandos.
3. Navega a la carpeta donde deseas guardar el archivo de scraping.
4. Ejecuta el siguiente comando para inicializar un nuevo proyecto de Node.js:
   ```bash
   npm init -y
5. Instala Puppeteer ejecutando el siguiente comando:
   ```bash
   npm install puppeteer
   ```

## 4. Explicación del Código
El script consta de los siguientes componentes principales:

1. **Importación de Puppeteer**: Se importa la biblioteca Puppeteer para poder controlar el navegador.
2. **Función `scrapeLinkedInJob`**: Esta función toma una URL de LinkedIn Jobs, abre una nueva página en el navegador y extrae información clave de la oferta de trabajo.
3. **Evaluación de la página**: Se usa `page.evaluate` para ejecutar código JavaScript dentro del contexto de la página y extraer datos utilizando selectores CSS.
4. **Cierre del navegador**: Después de obtener los datos, el navegador se cierra.
5. **Manejo de resultados**: Se imprime el resultado en la consola una vez que los datos han sido extraídos.

## 5. Instrucciones para la Ejecución
1. Asegúrate de haber seguido todos los pasos de instalación.
2. Crea un archivo `.js` con el código proporcionado.
3. Reemplaza la URL de la oferta de trabajo de LinkedIn por la que desees analizar.
4. Ejecuta el script con el siguiente comando en la terminal:
   ```bash
   node nombre_del_archivo.js
5. Si la ejecución es exitosa, verás los datos extraídos impresos en la consola.

## 6. Manejo de Errores
Si ocurre algún error durante la ejecución del programa, se capturará y mostrará en la consola. Los errores más comunes podrían estar relacionados con la URL de LinkedIn, o con la carga del navegador en modo headless. Asegúrate de que la URL es válida y de que no existen bloqueos de acceso a la página de LinkedIn.
