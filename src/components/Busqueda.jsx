import { Link } from "react-router-dom";

const Busqueda = () => {
    return (
            <div className="min-h-screen flex flex-col">
                
                <div className="navbar bg-white shadow-md p-4 sticky top-0 z-50">
                    <div className="flex items-center justify-between max-w-screen-lg mx-auto">
                        
                        <div className="flex items-center">
                            <Link to="/">
                                <img
                                    src="/src/assets/Captura de pantalla 2024-11-18 045933.png"
                                    alt="Logo"
                                    className="w-32 h-auto"
                                />
                            </Link>
                        </div>
    
                        
                        <div className="flex items-center gap-4">
                            <Link to="/Reg">
                                <button
                                    className="text-sm font-medium text-gray-700 hover:text-blue-500 transition">
                                    Cerrar sesión
                                </button>
                            </Link>
    
                            <Link to="/Reg">
                                <button
                                    className="px-4 py-2 bg-[#00102D] text-white rounded-lg hover:bg-[#00102dd8]">
                                    Ir a mi perfil
                                </button>
                            </Link>
                        </div>
                    </div>
                </div>

           
            <main className="flex flex-col items-center py-12 px-4 bg-gray-50">
                <div className="relative text-center mb-8">
                    <div className="flex items-center justify-center">
                        
                        <h2 className="text-3xl sm:text-5xl font-bold text-gray-800">
                            Filtra tus búsquedas para un mejor resultado
                        </h2>
                    </div>
                </div>

                <div className="flex flex-col md:flex-row gap-8 justify-center w-full max-w-7xl">
                    
                    <div className="bg-white p-6 rounded-lg shadow-md w-full md:w-1/3">
                        <h3 className="text-lg font-semibold text-gray-700 mb-4">
                            Categorías
                        </h3>
                        <ul className="space-y-2">
                            {[
                                "Tecnología de la información",
                                "Diseño y Creatividad",
                                "Marketing y Ventas",
                                "Administración y Finanzas",
                                "Ciencia",
                                "Atención al cliente",
                                "Educación y Capacitación",
                                "Salud y Bienestar",
                                "Logística y Operaciones",
                                "Construcción y manufactura",
                            ].map((categoria, index) => (
                                <li key={index}>
                                    <input
                                        type="checkbox"
                                        id={`categoria-${index}`}
                                        className="mr-2"
                                    />
                                    <label htmlFor={`categoria-${index}`}>
                                        {categoria}
                                    </label>
                                </li>
                            ))}
                        </ul>

                        <h3 className="text-lg font-semibold text-gray-700 mt-6">
                            Modalidad del trabajo
                        </h3>
                        <select className="w-full border rounded-lg px-4 py-2">
                            <option>Todas</option>
                            <option>Remoto</option>
                            <option>Presencial</option>
                        </select>

                        <h3 className="text-lg font-semibold text-gray-700 mt-6">
                            Fecha de publicación
                        </h3>
                        <select className="w-full border rounded-lg px-4 py-2">
                            <option>En cualquier momento</option>
                            <option>Últimas 24 horas</option>
                        </select>

                        <h3 className="text-lg font-semibold text-gray-700 mt-6">
                            Ubicación del cliente
                        </h3>
                        <select className="w-full border rounded-lg px-4 py-2">
                            <option>Todas las regiones</option>
                            <option>Colombia</option>
                            <option>Otras</option>
                        </select>

                        <h3 className="text-lg font-semibold text-gray-700 mt-6">
                            Idioma
                        </h3>
                        <div className="flex space-x-4 mt-4">
                            <button className="px-10 py-2 border rounded-lg">
                                Español
                            </button>
                            <button className="px-10 py-2 border rounded-lg">
                                Inglés
                            </button>
                        </div>
                    </div>

                   
                    <div className="flex-1 space-y-6">
                       
                        <div className="w-full border rounded-lg px-4 py-3 shadow-md">
                            <input
                                type="text"
                                placeholder="Buscar ofertas laborales..."
                                className="w-full border-none focus:outline-none"
                            />
                        </div>

                        
                        <div className="space-y-4">
                            {[1, 2, 3, 4, 5].map((item) => (
                                <div
                                    key={item}
                                    className="bg-white p-4 rounded-lg shadow-md">
                                    <p>Oferta laboral {item}</p>
                                </div>
                            ))}
                        </div>

                        
                        <div className="flex justify-center mt-4">
                            <nav className="flex space-x-2">
                                {[...Array(10)].map((_, i) => (
                                    <button
                                        key={i}
                                        className="px-3 py-1 text-sm border rounded-lg hover:bg-gray-200">
                                        {i + 1}
                                    </button>
                                ))}
                            </nav>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default Busqueda;
