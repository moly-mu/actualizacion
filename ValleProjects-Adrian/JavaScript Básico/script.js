// Inicializar la lista de compras
let listaDeCompras = [];

// Función para agregar un producto
function agregarProducto() {
    const input = document.getElementById("productoInput");
    const producto = input.value.trim();
    if (producto) {
        listaDeCompras.push(producto);
        input.value = '';
        mostrarLista();
    }
}

// Función para mostrar la lista de compras
function mostrarLista() {
    const listaDiv = document.getElementById("lista");
    listaDiv.innerHTML = ''; // Limpiar lista antes de mostrar

    listaDeCompras.forEach((producto, index) => {
        const productoDiv = document.createElement("div");
        productoDiv.className = "producto";
        productoDiv.innerHTML = `
            ${producto} 
            <button onclick="eliminarProducto(${index})">Eliminar</button>
        `;
        listaDiv.appendChild(productoDiv);
    });
}

// Función para eliminar un producto
function eliminarProducto(indice) {
    if (indice >= 0 && indice < listaDeCompras.length) {
        listaDeCompras.splice(indice, 1);
        mostrarLista();
    }
}

// Event listener para el botón
document.getElementById("agregarBtn").addEventListener("click", agregarProducto);