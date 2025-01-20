# Documento del Proyecto: Lista de Compras

## Descripción

Este proyecto es una aplicación sencilla para gestionar una lista de compras. Permite al usuario agregar y eliminar productos de la lista mediante una interfaz web.

## Flujo del Código

### JavaScript

1. **Inicialización**:
   - Se inicializa un array vacío llamado `listaDeCompras` para almacenar los productos.

2. **Agregar Producto**:
   - La función `agregarProducto()` se activa cuando el usuario hace clic en el botón "Agregar".
   - Se obtiene el valor del input (campo de texto) donde el usuario escribe el nombre del producto.
   - Se verifica si el valor no está vacío (eliminando espacios innecesarios).
   - Si el valor es válido, se agrega al array `listaDeCompras` y se limpia el input.
   - Finalmente, se llama a la función `mostrarLista()` para actualizar la visualización de la lista.

3. **Mostrar Lista**:
   - La función `mostrarLista()` se encarga de renderizar la lista de productos en la interfaz.
   - Se limpia el contenido del elemento donde se muestra la lista (`listaDiv`).
   - Se recorre el array `listaDeCompras`, creando un nuevo elemento `div` para cada producto y añadiendo un botón "Eliminar".
   - Cada botón tiene un evento `onclick` que llama a la función `eliminarProducto()` con el índice del producto.

4. **Eliminar Producto**:
   - La función `eliminarProducto(indice)` elimina el producto del array según el índice proporcionado.
   - Se verifica que el índice esté dentro del rango válido.
   - Tras eliminar el producto, se vuelve a llamar a `mostrarLista()` para actualizar la vista.

5. **Evento de Click**:
   - Se agrega un listener al botón "Agregar" que ejecuta la función `agregarProducto()` cuando es clicado.