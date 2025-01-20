import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post('http://localhost:5000/auth/login', { username, password });
            localStorage.setItem('token', res.data.token);
            window.location.href = '/home'; // Redirigir a la página principal
        } catch (error) {
            setMessage('Credenciales incorrectas');
        }
    };

    return (
        <div>
            <h2>Iniciar Sesión</h2>
            <form onSubmit={handleLogin}>
                <input type="text" placeholder="Usuario" value={username} onChange={(e) => setUsername(e.target.value)} required />
                <input type="password" placeholder="Contraseña" value={password} onChange={(e) => setPassword(e.target.value)} required />
                <button type="submit">Iniciar Sesión</button>
            </form>
            {message && <p>{message}</p>}
            <Link to="/">
                <button>Regresar</button>
            </Link>
        </div>
    );
};

export default Login;