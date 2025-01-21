
---

# API de Gestión de Empleos y Empresas

## Descripción

Esta API proporciona un conjunto de endpoints para gestionar empleos, usuarios (empleados) y empresas. Permite a las empresas publicar ofertas de empleo, a los usuarios postularse a ellas y gestionar sus aplicaciones, y a ambas partes iniciar sesión y gestionar sus perfiles.

## Paso a Paso: Configuración del Backend

### 1. Instalación de dependencias  
Ve al directorio `back` del proyecto para instalar las dependencias necesarias. Usa el siguiente comando:  
```
npm i
```  
Esto instalará todas las dependencias requeridas para que el proyecto funcione correctamente.

---

### 2. Migración de la base de datos  
Una vez que las dependencias estén instaladas, ejecuta el siguiente comando para realizar la migración de la base de datos:  
```
npx prisma migrate dev
```  
La consola te pedirá que ingreses un nombre para la migración. Puedes darle cualquier nombre pero, generalmente para simplificar puedes usar `y`.

---

### 3. Configuración del archivo `.env`  
Renombra el archivo `.env.example` a `.env` y complétalo con la información correspondiente para cada campo. Esto permitirá que las variables de entorno se activen correctamente.

- **Generación de claves**  
  Ve al directorio `scripts` y ejecuta dos veces el archivo `secret.js`. Esto generará las claves necesarias para las variables:  
  - `SECRETKEY_USER`  
  - `SECRETKEY_COMPANY`  

- **Configuración del puerto**  
  Define el puerto en el archivo `.env` ingresando:  
  ```
  PORT=5000
  ```

- **Configuración de la URI de MongoDB**  
  Agrega la URI de tu base de datos MongoDB en el archivo `.env`. Por ejemplo:  
  ```
  MONGO_URI=mongodb://localhost:27017/<nombre_de_tu_base_de_datos>
  ```  
  *(Reemplaza `<nombre_de_tu_base_de_datos>` con el nombre real de tu base de datos.)*

---

### 4. Activar MongoDB y sus herramientas  
Para activar las variables de entorno y asegurarte de que MongoDB está funcionando:  
- Abre una terminal y escribe:  
  ```
  mongod
  ```  
  Esto iniciará el servidor MongoDB.  
- En otra terminal, escribe:  
  ```
  mongosh
  ```  
  Esto abrirá el shell de MongoDB para interactuar con la base de datos.  

Si no tienes MongoDB instalado, puedes usar el siguiente video para instalarlo:  
[Guía de instalación de MongoDB](https://youtu.be/eKXIxSZrJfw?si=AwKi57UcKzp_gEFr)

---

### 5. Creación de roles en la base de datos  
Desde el directorio `scripts`, ejecuta el archivo `roles.js` para generar los roles necesarios:  
```
node roles.js
```

---

### 6. Creación de perfiles de usuario y empresa  (opcional)
En el mismo directorio `scripts`, ejecuta el archivo `usr.js` para generar los perfiles de usuario y empresa:  
```
node usr.js
```

---

### 7. Inserción de ofertas de trabajo  
Dirígete a la carpeta `ofertas` y ejecuta el archivo `trabajos.mjs` para insertar las ofertas de trabajo de otras bolsas de empleo en la base de datos MongoDB:  
```
node trabajos.mjs
```

---

### 8. Iniciar el proyecto  
Finalmente, vuelve al directorio `back` y ejecuta el siguiente comando:  
```
npm run dev
```  
Esto iniciará el proyecto correctamente.

## Endpoints

### Trabajos

- **Obtener todos los trabajos de las bolsas de empleo ( NO UDC ):**

  - **GET**: `http://localhost:5000/api/dbjobs/`

- **Obtener todos los trabajos:**

  - **GET**: `http://localhost:5000/api/jobs`

- **Obtener un trabajo por su ID:**

  - **GET**: `http://localhost:5000/api/jobs/:jobId`

- **Crear un nuevo trabajo:**

  - **POST**: `http://localhost:5000/api/jobs/create` (Requiere token de autenticación empresa)

  **Cuerpo de la solicitud (JSON):**

  ```json
  {
    "title": "",
    "description": "",
    "company": "",
    "salary": "",
    "location": ""
  }
  ```

- **Postular a un trabajo:**

  - **POST**: `http://localhost:5000/api/jobs/:jobId/apply` (Requiere token de autenticación usuario)

  **Cuerpo de la solicitud (JSON):**

  ```json
  {
    "status": "pendiente - aceptado - rechazado",
    "hojaDeVida": ""
  }
  ```

- **Actualizar un trabajo por su ID:**

  - **PUT**: `http://localhost:5000/api/jobs/:jobId` (Requiere token de autenticación empresa)

  **Cuerpo de la solicitud (JSON):**

  ```json
  {
    "title": "",
    "description": "",
    "company": "",
    "location": "",
    "salary": ""
  }
  ```

- **Eliminar un trabajo por su ID:**

  - **DELETE**: `http://localhost:5000/api/jobs/:jobId` (Requiere token de autenticación empresa)

- **Obtener las postulaciones de un trabajo:**

  - **GET**: `http://localhost:5000/api/jobs/:jobId/applications` (Requiere token de autenticación empresa)

- **Actualizar el estado de una solicitud de trabajo:**

  - **PUT**: `http://localhost:5000/api/jobs/applications/:id/status` (Requiere token de autenticación empresa)

  **Cuerpo de la solicitud (JSON):**

  ```json
  {
    "status": ""
  }
  ```

- **Obtener el trabajo por ID de empresa:**

  - **GET**: `http://localhost:5000/api/jobs/empresa/jobs` (Requiere token de autenticación empresa)

- **Obtener el trabajo aplicado por usuario:**
  - **GET**: `http://localhost:5000/api/jobs/user/aply` (Requiere token de autenticación usuario)

### Usuarios

- **Registrar un usuario:**

  - **POST**: `http://localhost:5000/api/auth/register/user`

  **Cuerpo de la solicitud (JSON):**

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

  - **POST**: `http://localhost:5000/api/auth/login/user`

  **Cuerpo de la solicitud (JSON):**

  ```json
  {
    "email": "",
    "password": ""
  }
  ```

- **Actualizar la imagen de perfil:**

  - **PUT**: `http://localhost:5000/api/users/update/picture/:userId` (Requiere token de autenticación usuario)

  **Cuerpo de la solicitud (JSON):**

  ```json
  {
    "imagenPerfil": ""
  }
  ```

- **Actualizar la información básica del perfil:**

  - **PUT**: `http://localhost:5000/api/users/update/basic/:userId` (Requiere token de autenticación usuario)

  **Cuerpo de la solicitud (JSON):** 

  ```json
  {
    "primerNombre": "",
    "segundoNombre": "",
    "primerApellido": "",
    "segundoApellido": ""
  }
  ```

- **Actualizar la hoja de vida:**

  - **PUT**: `http://localhost:5000/api/users/update/cv/:userId` (Requiere token de autenticación usuario)

  **Cuerpo de la solicitud (JSON):**

  ```json
  {
    "hojaDeVida": ""
  }
  ```

- **Obtener la hoja de vida del usuario:**

  - **GET**: `http://localhost:5000/api/users/resumeu/:userId` (Requiere token de autenticación usuario)

- **Obtener la hoja de vida del usuario para empresa:**

  - **GET**: `http://localhost:5000/api/users/resumee/:userId` (Requiere token de autenticación empresa)

- **Obtener los datos del usuario:**

  - **GET**: `http://localhost:5000/api/users/profile` (Requiere token de autenticación usuario)

- **Obtener la imagen de perfil del usuario:**
  - **GET**: `http://localhost:5000/api/users/profilepic` (Requiere token de autenticación usuario)

### Empresas

- **Registrar una empresa:**

  - **POST**: `http://localhost:5000/api/auth/register/company`

  **Cuerpo de la solicitud (JSON):**

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

  - **POST**: `http://localhost:5000/api/auth/login/company`

  **Cuerpo de la solicitud (JSON):**

  ```json
  {
    "email": "",
    "password": ""
  }
  ```

- **Obtener el perfil de la empresa:**

  - **GET**: `http://localhost:5000/api/company/perfil` (Requiere token de autenticación empresa)

- **Obtener la imagen de perfil de la empresa:**

  - **GET**: `http://localhost:5000/api/company/per` 
  (Requiere token de autenticación empresa)

- **Actualizar el perfil de la empresa:**

  - **PUT**: `http://localhost:5000/api/company/perfil` (Requiere token de autenticación empresa)

  **Cuerpo de la solicitud (JSON):**

  ```json
  {
    "razonSocial": "",
    "sector": "",
    "telefono": "",
    "nombreEmpresa": "",
    "ubicacion": ""
  }
  ```

- **Actualizar la imagen de perfil de la empresa:**

  - **PUT**: `http://localhost:5000/api/company/perfil/imagen` (Requiere token de autenticación empresa)

  **Cuerpo de la solicitud (JSON):**

  ```json
  {
    "imagenPerfil": ""
  }
  ```

  **Optimización de CV utilizando IA:**

  - **POST**: `http://localhost:5000/api/iaImprove/optimizar-cv` (Requiere token de autenticación usuario)

  **Cuerpo de la solicitud (JSON):**
   ```json
  {
  "fullName": "Juan Pérez",
  "email": "juan.perez@example.com",
  "phone": "+57 300 123 4567",
  "portfolio": "https://portfolio.juanperez.com",
  "professionalProfile": "Desarrollador Full-Stack con experiencia en ...",
  "technicalSkills": ["JavaScript", "React", "Node.js"],
  "softSkills": ["Trabajo en equipo", "Comunicación efectiva"],
  "experiences": [
    {
      "company": "Tech Solutions S.A.",
      "position": "Desarrollador Front-End",
      "startDate": "2020-01-01",
      "endDate": "2022-01-01",
      "description": "Responsable del desarrollo y mantenimiento de aplicaciones web..."
    }
  ],
  "educations": [
    {
      "institution": "Universidad Nacional de Colombia",
      "degree": "Ingeniería de Sistemas",
      "startDate": "2015-01-01",
      "endDate": "2019-12-01",
      "description": "Estudios en ingeniería de software, bases de datos, y más..."
    }
  ],
  "projects": [
    {
      "title": "Aplicación de Gestión de Tareas",
      "description": "Una aplicación web para gestionar tareas y proyectos...",
      "link": "https://github.com/juanperez/task-manager"
    }
  ],
  "references": [
    {
      "name": "María García",
      "relationship": "Gerente de Proyecto",
      "contactInfo": "maria.garcia@example.com"
    }
  ]
  }
  ```
---