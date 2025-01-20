document.addEventListener('DOMContentLoaded', () => {
    // Simular empresas (estos datos pueden venir del backend)
    const empresas = ['Empresa 1', 'Empresa 2', 'Empresa 3'];
    
    // Simular usuarios (estos datos pueden venir del backend)
    const usuarios = [
        { username: 'usuario1' },
        { username: 'usuario2' },
        { username: 'usuario3' }
    ];

    const empresaList = document.getElementById('empresa-list');
    const userList = document.getElementById('user-list');
    
    // Función para mostrar empresas
    const mostrarEmpresas = () => {
        empresaList.innerHTML = '';
        empresas.forEach((empresa, index) => {
            const li = document.createElement('li');
            li.textContent = empresa;
            const deleteButton = document.createElement('button');
            deleteButton.textContent = 'X';
            deleteButton.addEventListener('click', () => eliminarEmpresa(index));
            li.appendChild(deleteButton);
            empresaList.appendChild(li);
        });
    };

    // Función para mostrar usuarios
    const mostrarUsuarios = () => {
        userList.innerHTML = '';
        usuarios.forEach((usuario, index) => {
            const li = document.createElement('li');
            li.textContent = usuario.username;
            const deleteButton = document.createElement('button');
            deleteButton.textContent = 'X';
            deleteButton.addEventListener('click', () => eliminarUsuario(index));
            li.appendChild(deleteButton);
            userList.appendChild(li);
        });
    };

    // Función para eliminar empresa
    const eliminarEmpresa = (index) => {
        empresas.splice(index, 1);
        mostrarEmpresas(); // Actualizamos la lista después de eliminar
    };

    // Función para eliminar usuario
    const eliminarUsuario = (index) => {
        usuarios.splice(index, 1);
        mostrarUsuarios(); // Actualizamos la lista después de eliminar
    };

    // Función para añadir empresa
    document.getElementById('add-empresa').addEventListener('click', () => {
        const empresaName = document.getElementById('empresa-name').value;
        if (empresaName) {
            empresas.push(empresaName);
            document.getElementById('empresa-name').value = ''; // Limpiar el input
            mostrarEmpresas(); // Actualizamos la lista de empresas
        }
    });

    // Inicializar la lista de empresas y usuarios
    mostrarEmpresas();
    mostrarUsuarios();
});