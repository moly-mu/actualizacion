## Flujo de la Aplicación

1. **Carga Inicial**: Cuando la aplicación se inicia, `main.jsx` renderiza el componente `App`.
2. **Carga de Tasas de Cambio**: En `App.jsx`, se hace una llamada a la API para obtener las tasas de cambio, que se almacenan en el estado `exchangeRate`.
3. **Formulario de Transacción**: El usuario puede ingresar una nueva transacción o editar una existente en `TransactionForm.jsx`.
   - Al enviar el formulario, se utiliza `dispatch` para actualizar el estado global a través de `ExpenseContext`.
4. **Lista de Transacciones**: `TransactionList.jsx` muestra las transacciones actuales y permite al usuario editarlas o eliminarlas.
5. **Conversión de Moneda**: Al ingresar un monto y seleccionar una moneda, el monto se convierte utilizando las tasas de cambio obtenidas.

## Cómo Ejecutar el Proyecto

1. **Instalar Dependencias**: Asegúrate de tener Node.js instalado. Luego, en la carpeta del proyecto, ejecuta:
   ```bash
   npm install

2. **Ejecutar la Aplicación**: Para iniciar la aplicación, ejecuta:

   ```bash
   npm run dev

3. **Abrir en el Navegador**: La aplicación debería estar disponible en http://localhost:3000 (o el puerto especificado en la consola).