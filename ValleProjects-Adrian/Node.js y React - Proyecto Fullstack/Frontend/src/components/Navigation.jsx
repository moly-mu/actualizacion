import React from 'react';
import { Link } from 'react-router-dom';

const Navigation = () => {
    return (
        <div>
            <h2>Bienvenido</h2>
            <div>
                <Link to="/register">
                    <button>Registrarse</button>
                </Link>
                <Link to="/login">
                    <button>Iniciar Sesión</button>
                </Link>
            </div>
        </div>
    );
};

export default Navigation;