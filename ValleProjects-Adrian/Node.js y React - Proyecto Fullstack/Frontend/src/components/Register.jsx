import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Register = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');

    const handleRegister = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post('http://localhost:5000/auth/register', { username, password });
            setMessage(res.data.message);
        } catch (error) {
            setMessage('Error en el registro');
        }
    };

    return (
        <div>
            <h2>Registro</h2>
            <form onSubmit={handleRegister}>
                <input type="text" placeholder="Usuario" value={username} onChange={(e) => setUsername(e.target.value)} required />
                <input type="password" placeholder="Contraseña" value={password} onChange={(e) => setPassword(e.target.value)} required />
                <button type="submit">Registrar</button>
            </form>
            {message && <p>{message}</p>}
            <Link to="/">
                <button>Regresar</button>
            </Link>
        </div>
    );
};

export default Register;