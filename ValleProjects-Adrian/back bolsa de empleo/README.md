# API de Gestión de Empleos y Empresas

## Descripción

Esta API proporciona un conjunto de endpoints para gestionar empleos, usuarios (empleados) y empresas. Permite a las empresas publicar ofertas de empleo, a los usuarios postularse a ellas y gestionar sus aplicaciones, y a ambas partes iniciar sesión y gestionar sus perfiles.

## Endpoints

### Trabajos

- **Obtener todos los trabajos:**
  GET: http://localhost:5000/api/jobs
- **Crear un nuevo trabajo:**
  POST: http://localhost:5000/api/jobs/create
- **Postular a un trabajo:**
  POST: http://localhost:5000/api/jobs/${jobId}/apply (Requiere token de autenticación)
- **Obtener las postulaciones de un trabajo:**
  GET: http://localhost:5000/api/jobs/${job.id}/applications

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
