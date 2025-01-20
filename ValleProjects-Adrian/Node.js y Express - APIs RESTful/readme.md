# JavaScript Básico
Funcionamiento
Este programa funciona como una lista de compras; es decir, el programa puede agregar el nombre del producto, el valor y la cantidad de unidades del mismo. Por otra parte, el programa es capaz de editar una de esas listas usando la ID como referencia. Además, puede eliminar una lista usando la ID como referencia.

**Ejecución**

Para poder ejecutar el programa, primeramente debes enlazar la base de datos en database usando tus credenciales. Por otra parte, es importante cambiar en routes el nombre de la tabla de datos por el nombre de tu tabla. Además, claramente tienes que enlazar correctamente el servidor con el puerto correcto y modificarlo en connect. También debes descargar los "node_modules". Ya para finalizar, la tabla debe tener:

**id** como llave principal, que debe ser entero con un aumento de número automático y que no se pueda repetir.
**nombre** como un varchar de 20 caracteres o más, que tiene que ser un campo obligatorio en caso de querer llenar la lista.
**precio** como un float, que tiene que ser un campo obligatorio en caso de querer llenar la lista.
**cantidad** como un int, que tiene que ser un campo obligatorio en caso de querer llenar la lista.


