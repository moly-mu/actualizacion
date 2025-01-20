import React from 'react';
import { useNavigate } from 'react-router-dom';

const Home = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/');
    };

    return (
        <div style={{ position: 'relative', textAlign: 'center' }}>
            <button 
                onClick={handleLogout} 
                style={{
                    position: 'absolute',
                    top: '0.1px',
                    left: '-200px',
                    backgroundColor: '#f44336',
                    color: 'white',
                    border: 'none',
                    padding: '10px 20px',
                    cursor: 'pointer',
                    borderRadius: '5px'
                }}
            >
                Cerrar Sesión
            </button>
            <h2>Felicidades iniciaste sesión</h2>
            <img 
                src="https://media.everskies.com/y3SDeEByaHBSTp_an66h.png" 
                alt="imagen de bienvenida"
                style={{ width: '300px', height: 'auto' }} 
            />
        </div>
    );
};

export default Home;
