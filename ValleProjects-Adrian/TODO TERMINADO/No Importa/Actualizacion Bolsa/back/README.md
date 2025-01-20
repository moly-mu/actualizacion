# API de Gestión de Empleos y Empresas


## Descripción

Esta API proporciona un conjunto de endpoints para gestionar empleos, usuarios (empleados) y empresas. Permite a las empresas publicar ofertas de empleo, a los usuarios postularse a ellas y gestionar sus aplicaciones, y a ambas partes iniciar sesión y gestionar sus perfiles.

## Endpoints

http://localhost:5000/api/users/update/

### Trabajos

- **Obtener todos los trabajos:**
  - **GET**: `http://localhost:5000/api/jobs`
- **Obtener un trabajo por su ID:**
  - **GET**: `http://localhost:5000/api/jobs/:jobId`
- **Crear un nuevo trabajo:**

  - **POST**: `http://localhost:5000/api/jobs/create` (Requiere token de autenticación)

  **Cuerpo de la solicitud (JSON):**

  ```json
  {
    "title": "",
    "description": "",
    "company": "",
    "salary":"",
    "location": ""
  }
  ```

- **Postular a un trabajo:**
  - **POST**: `http://localhost:5000/api/jobs/:jobId/apply` (Requiere token de autenticación)

  
- **Actualizar un trabajo por su ID:**
  - **PUT**: `http://localhost:5000/api/jobs/:jobId` (Requiere token de autenticación)
- **Eliminar un trabajo por su ID:**
  - **DELETE**: `http://localhost:5000/api/jobs/:jobId` (Requiere token de autenticación)
- **Obtener las postulaciones de un trabajo:**
  - **GET**: `http://localhost:5000/api/jobs/:jobId/applications` (Requiere token de autenticación)
- **Actualizar el estado de una solicitud de trabajo:**
  - **PUT**: `http://localhost:5000/api/jobs/:jobId/applications/:applicationId/status` (Requiere token de autenticación)

### Usuarios

- **Registrar un usuario:**
  POST: http://localhost:5000/api/auth/register/user
  - Cuerpo de la solicitud (JSON):
    ```json
    {
      "primerNombre": "",
      "segundoNombre": "",
      "primerApellido": "",
      "segundoApellido": "",
      "tipoDocumento": "",
      "numeroDocumento": "",
      "email": "",
      "password": ""
    }
    ```
- **Iniciar sesión como usuario:**
  POST: http://localhost:5000/api/auth/login/user
  - Cuerpo de la solicitud (JSON):
    ```json
    {
      "email": "",
      "password": ""
    }
    ```

### Empresas

- **Registrar una empresa:**
  POST: http://localhost:5000/api/auth/register/company
  - Cuerpo de la solicitud (JSON):
    ```json
    {
      "email": "",
      "password": "",
      "razonSocial": "",
      "nit": "",
      "sector": "",
      "telefono": "",
      "nombreEmpresa": "",
      "ubicacion": ""
    }
    ```
- **Iniciar sesión como empresa:**
  POST: http://localhost:5000/api/auth/login/company
  - Cuerpo de la solicitud (JSON):
    ```json
    {
      "email": "",
      "password": ""
    }
    ```



#### pendiente

- filtrado - Parcialmente Terminado
- ia - Terminado 
- mongo
- hoja de vida (tablas)
- ajustar hojas de vidas a trabajos mediante ia
- mejorar diseño
- estructurar mejor el proyecto y definir un solo diseño para producción