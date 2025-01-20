
# Guía de Funcionamiento y Ejecución del Sistema de Verificación de Teléfono con Firebase

Este documento explica cómo funciona el sistema de autenticación con verificación telefónica implementado, el flujo del programa y los pasos necesarios para ejecutarlo. También se incluyen detalles sobre los cambios realizados para optimizar la seguridad y la organización del código.

## 1. Descripción General

El proyecto permite verificar la identidad de un usuario mediante su número de teléfono utilizando Firebase Authentication. Este sistema es útil para evitar inicios de sesión fraudulentos y autenticar que un usuario es real. El flujo incluye la generación de un código OTP (One Time Password), que el usuario debe ingresar para confirmar su identidad.

El proyecto se divide en tres principales archivos:

- **`index.html`**: Contiene la interfaz visual que solicita el número de teléfono y el código de verificación.  
- **`verify-phone.js`**: Implementa la lógica de conexión a Firebase y la verificación del número de teléfono.  
- **`.env`**: Almacena las claves privadas de configuración de Firebase de forma segura.  

---

## 2. Flujo del Programa

1. **Inicio**: El usuario accede al formulario de la página `index.html`.
2. **Ingreso del Número de Teléfono**:
   - El usuario escribe su número de teléfono en el campo proporcionado.
   - Al hacer clic en el botón "Enviar Código", se inicializa la función de Firebase que genera un código OTP y lo envía al teléfono indicado.
3. **Ingreso del Código OTP**:
   - El usuario recibe el código en su teléfono.
   - El código es ingresado en el segundo formulario de la página.
4. **Verificación del Código**:
   - Firebase valida si el código ingresado coincide con el OTP enviado.
   - Si el código es válido, se muestra un mensaje de éxito.
   - Si no es válido, el sistema muestra un mensaje de error.
5. **Seguridad**:
   - Los datos sensibles de configuración de Firebase se almacenan en un archivo `.env` para proteger las claves y evitar exponerlas en el cliente.

---

## 3. Instrucciones de Ejecución

### 1. Pre-requisitos
- Tener instalado [Node.js](https://nodejs.org/).  
- Instalar las dependencias del proyecto ejecutando:  
  ```bash
  npm install

### 2. Configuración del Entorno
- Crear un archivo `.env` en la raíz del proyecto.

### 3. Ejecutar el Proyecto
- Inicia un servidor local para servir `index.html`. Por ejemplo, usando `http-server`:  
  ```bash
  npx http-server

### 4. Verificación del Sistema
1. Ingresa un número de teléfono válido en el formulario.  
2. Recibe el código OTP.  
3. Ingresa el código en el formulario y verifica los resultados.