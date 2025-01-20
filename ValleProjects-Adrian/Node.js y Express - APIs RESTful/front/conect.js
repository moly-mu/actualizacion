async function fetchUsuarios() {
    try {
        const response = await fetch('http://localhost:3000/');
        const data = await response.json();
        const usuariosList = document.getElementById('usuarios');
        usuariosList.innerHTML = ''; // Limpia la tabla

        data.forEach(usuario => {
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td>${usuario.id}</td>
                <td>${usuario.nombre}</td>
                <td>${usuario.precio}</td>
                <td>${usuario.cantidad}</td>
                <td>
                    <button class="edit-btn" data-id="${usuario.id}">Modificar</button>
                    <button class="delete-btn" data-id="${usuario.id}">Eliminar</button>
                </td>
            `;
            usuariosList.appendChild(tr);
        });

        // Agregar event listeners para los botones de modificar y eliminar
        document.querySelectorAll('.delete-btn').forEach(button => {
            button.addEventListener('click', (e) => {
                const id = e.target.dataset.id;
                deleteUsuario(id);
            });
        });

        document.querySelectorAll('.edit-btn').forEach(button => {
            button.addEventListener('click', (e) => {
                const id = e.target.dataset.id;
                editUsuario(id);
            });
        });
    } catch (error) {
        console.error('Error al obtener usuarios:', error);
    }
}

async function deleteUsuario(id) {
    try {
        const response = await fetch(`http://localhost:3000/eliminar/${id}`, {
            method: 'DELETE'
        });

        if (response.ok) {
            fetchUsuarios(); // Recargar la lista
        } else {
            console.error('Error al eliminar usuario');
        }
    } catch (error) {
        console.error('Error:', error);
    }
}

async function editUsuario(id) {
    const nombre = prompt('Nuevo nombre:');
    const precio = prompt('Nuevo precio:');
    const cantidad = prompt('Nueva cantidad:');

    if (nombre && precio && cantidad) {
        const usuario = { nombre, precio, cantidad };

        try {
            const response = await fetch(`http://localhost:3000/modificar/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(usuario)
            });

            if (response.ok) {
                fetchUsuarios(); // Recargar la lista
            } else {
                console.error('Error al modificar usuario');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    }
}

document.getElementById('usuarioForm').addEventListener('submit', async (e) => {
    e.preventDefault(); // Evita que el formulario se envíe de forma tradicional

    const nombre = document.getElementById('nombre').value;
    const precio = document.getElementById('precio').value;
    const cantidad = document.getElementById('cantidad').value;

    const usuario = { nombre, precio, cantidad };

    try {
        const response = await fetch('http://localhost:3000/agregar', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(usuario)
        });

        if (response.ok) {
            document.getElementById('usuarioForm').reset(); // Reinicia el formulario
            fetchUsuarios(); // Vuelve a cargar la lista de usuarios
        } else {
            console.error('Error al agregar usuario');
        }
    } catch (error) {
        console.error('Error:', error);
    }
});

fetchUsuarios(); // Carga los usuarios al iniciar
