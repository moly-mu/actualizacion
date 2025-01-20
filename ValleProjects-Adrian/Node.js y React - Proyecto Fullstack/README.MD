# Proyecto de Autenticación con React y Node.js

## Descripción

Este proyecto es una aplicación de autenticación simple construida con React en el frontend y Node.js en el backend. Utiliza SQLite como base de datos para almacenar los usuarios.


## Cómo Funciona el Código

### Frontend (React)

1. **Navegación Principal** (`Navigation.jsx`):
    - Contiene botones para el registro y el inicio de sesión.

2. **Registro** (`Register.jsx`):
    - Permite a los usuarios registrarse enviando una solicitud `POST` al backend.
    - Almacena el nombre de usuario y la contraseña en la base de datos.

3. **Inicio de Sesión** (`Login.jsx`):
    - Permite a los usuarios iniciar sesión enviando una solicitud `POST` al backend.
    - Genera y almacena un token en `localStorage`.

4. **Página de Inicio** (`Home.jsx`):
    - Muestra una imagen de bienvenida y permite cerrar sesión.

### Backend (Node.js)

1. **Configurar la Base de Datos** (`database.js`):
    - Configura la conexión a la base de datos SQLite usando Sequelize.

2. **Modelo de Usuario** (`user.js`):
    - Define el modelo de usuario en Sequelize.

3. **Controlador de Autenticación** (`authController.js`):
    - Contiene las funciones para registrar e iniciar sesión.

4. **Rutas de Autenticación** (`authRoutes.js`):
    - Define las rutas para registrar e iniciar sesión.

5. **Servidor** (`server.js`):
    - Configura y arranca el servidor, y sincroniza la base de datos.

## Flujo de la Aplicación

1. El usuario accede a la página principal y elige registrarse o iniciar sesión.
2. Dependiendo de la elección, el usuario es redirigido a la página de registro o inicio de sesión.
3. Al registrarse, los datos del usuario se envían al backend, que los almacena en la base de datos.
4. Al iniciar sesión, el backend verifica las credenciales y genera un token JWT.
5. El usuario es redirigido a la página de inicio después de iniciar sesión.
6. El usuario puede cerrar sesión y volver a la página principal.

## Cómo Ejecutar el Proyecto

### Backend

1. Navega a la carpeta `backend`:
    ```bash
    cd backend
    ```

2. Instala las dependencias:
    ```bash
    npm install
    ```

3. Ejecuta el servidor:
    ```bash
    node server.js
    ```

### Frontend

1. Navega a la carpeta `frontend`:
    ```bash
    cd ../frontend
    ```

2. Instala las dependencias:
    ```bash
    npm install
    ```

3. Ejecuta el servidor de desarrollo:
    ```bash
    npm run dev
    ```

4. Abre tu navegador y navega a `http://localhost:5173/`.