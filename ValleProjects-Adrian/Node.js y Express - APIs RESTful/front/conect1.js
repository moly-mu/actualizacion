async function fetchUsuarios() {
    try {
        const response = await fetch('http://localhost:3000/');
        const data = await response.json();
        const usuariosList = document.getElementById('usuarios');

        data.forEach(usuario => {
            const li = document.createElement('li');
            
            li.textContent = ` ${usuario.id}, ${usuario.nombre}, ${usuario.precio}, ${usuario.cantidad}`;
             // Cambia 'name' al campo adecuado de tu base de datos
            usuariosList.appendChild(li);
        });
    } catch (error) {
        console.error('Error al obtener usuarios:', error);
    }
}

fetchUsuarios();


async function fetchUsuarios() {
    try {
        const response = await fetch('http://localhost:3000/');
        const data = await response.json();
        const tbody = document.querySelector("#usuarios tbody"); // Seleccionamos el tbody de la tabla

        // Limpiamos el tbody antes de agregar nuevos datos
        tbody.innerHTML = '';

        data.forEach(usuario => {
            const row = document.createElement('tr'); // Creamos una nueva fila

            // Agregamos celdas a la fila
            row.innerHTML = `
                <td>${usuario.id}</td>
                <td>${usuario.nombre}</td>
                <td>${usuario.precio}</td>
                <td>${usuario.cantidad}</td>
            `;
            tbody.appendChild(row); // Agregamos la fila al tbody
        });
    } catch (error) {
        console.error('Error al obtener usuarios:', error);
    }
}

fetchUsuarios();