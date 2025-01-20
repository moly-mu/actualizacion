## Flujo de Ejecución

### Paso 1: Inicialización del Servidor

1. **Ejecución del Servidor**
   - Cuando ejecutas `node server.js` en la terminal, el servidor Express se inicia en el puerto 3000.
   - Se muestra en la consola el mensaje: `Servidor corriendo en http://localhost:3000`.

### Paso 2: Manejo de Solicitudes

2. **Solicitud a la Ruta Raíz**
   - Cuando accedes a `http://localhost:3000` desde un navegador:
     - El servidor responde a la solicitud GET en la ruta raíz (`/`).
     - Se envía el archivo `index.html` al navegador.

### Paso 3: Carga del Cliente

3. **Carga de Recursos Estáticos**
   - El navegador carga el archivo HTML (`index.html`).
   - Se incluyen automáticamente los recursos estáticos:
     - **styles.css**: Aplica el estilo definido para la página.
     - **script.js**: Se ejecuta el script JavaScript que muestra un mensaje en la consola cuando el DOM está listo.

### Paso 4: Comportamiento del Cliente

4. **Interacción del Usuario**
   - El usuario puede interactuar con la página, pero en esta versión básica, solo se mostrará un mensaje en la consola.
   - Al cerrar el servidor (por ejemplo, presionando `Ctrl + C` en la terminal), el servidor deja de estar disponible.

### Paso 5: Comportamiento al Apagar el Servidor

5. **Acceso Después de Apagar el Servidor**
   - Si intentas acceder nuevamente a `http://localhost:3000` después de apagar el servidor, el navegador mostrará un error de conexión (por ejemplo, "No se puede acceder a este sitio").
   - Esto confirma que la página no está disponible sin el servidor corriendo.