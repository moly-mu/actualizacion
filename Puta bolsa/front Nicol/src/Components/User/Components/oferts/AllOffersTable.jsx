import React, { useEffect, useState } from "react";
import axios from "axios"; // Importar Axios
import Swal from "sweetalert2"; // Importar SweetAlert2

const AllOffers = ({ searchTerm }) => {
    const [offers, setOffers] = useState([]);
    const [filteredOffers, setFilteredOffers] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const offersPerPage = 10;

    useEffect(() => {
        const fetchOffers = async () => {
            // Verificar si las ofertas están almacenadas en localStorage
            const storedOffers = localStorage.getItem("offers");

            if (storedOffers) {
                // Si están en localStorage, cargarlas
                const offersData = JSON.parse(storedOffers);
                setOffers(offersData);
                setFilteredOffers(offersData); // Inicialmente mostrar todas las ofertas
            } else {
                // Si no están, hacer la solicitud al backend
                try {
                    const response = await axios.get("http://localhost:5000/api/dbjobs/", {
                        headers: {
                            'Cache-Control': 'no-cache', // Evitar que la solicitud sea almacenada en caché
                            'Pragma': 'no-cache', // Para navegadores antiguos
                            'Expires': '0' // Deshabilitar expiración
                        }
                    });

                    if (response.status === 200) {
                        const offersData = response.data; // Todas las ofertas

                        // Guardar las ofertas en localStorage
                        localStorage.setItem("offers", JSON.stringify(offersData));

                        // Establecer las ofertas en el estado
                        setOffers(offersData);
                        setFilteredOffers(offersData);
                    }
                } catch (error) {
                    console.error("Error fetching offers:", error);
                    Swal.fire("Error", "No se pudieron cargar las ofertas", "error"); // Mostrar alerta si hay error
                }
            }
        };

        fetchOffers();
    }, []); // Solo se ejecuta una vez al cargar el componente

    useEffect(() => {
        filterOffers();
    }, [searchTerm, offers]); // Se ejecuta cuando cambia el término de búsqueda o las ofertas

    const filterOffers = () => {
        let filtered = offers;

        if (searchTerm) {
            filtered = filtered.filter(offer =>
                offer.Title.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }

        setFilteredOffers(filtered);
        setCurrentPage(1); // Resetear la paginación al filtrar
    };

    // Obtener las ofertas actuales
    const indexOfLastOffer = currentPage * offersPerPage;
    const indexOfFirstOffer = indexOfLastOffer - offersPerPage;
    const currentOffers = filteredOffers.slice(indexOfFirstOffer, indexOfLastOffer);

    // Cambiar de página
    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    // Función para mostrar la descripción de un trabajo
    const handleViewDescription = (description) => {
        Swal.fire({
            title: "Descripción del trabajo",
            text: description || "Descripción no disponible.",
            icon: "info",
            confirmButtonText: "Cerrar",
        });
    };

    // Función para redirigir a la página del trabajo
    const handleApplyToOffer = (link) => {
        window.open(link, "_blank"); // Abre el enlace en una nueva pestaña
    };

    return (
        <div className="max-w-6xl ml-32 mx-auto">
            <table className="min-w-full bg-white">
                <thead>
                    <tr className="border-b">
                        <th className="px-4 py-2 text-left">Título</th>
                        <th className="px-4 py-2 text-left">Ubicación</th>
                        <th className="px-4 py-2 text-left">Fecha de cierre</th>
                        <th className="px-4 py-2 text-left">Vacantes</th>
                        <th className="px-4 py-2 text-left">Salario</th>
                        <th className="px-4 py-2 text-left">Acción</th>
                    </tr>
                </thead>
                <tbody>
                    {currentOffers.length > 0 ? (
                        currentOffers.map((offer, index) => (
                            <tr key={index} className="border-b">
                                <td className="px-4 py-2">
                                    <button
                                        onClick={() => handleViewDescription(offer.Description)}
                                        className="text-blue-600 hover:underline"
                                    >
                                        {offer.Title || 'N/A'}
                                    </button>
                                </td>
                                <td className="px-4 py-2">{offer.Location || 'N/A'}</td>
                                <td className="px-4 py-2">{offer.ClosingDate || 'N/A'}</td>
                                <td className="px-4 py-2">{offer.Vacancies || 'N/A'}</td>
                                <td className="px-4 py-2">{offer.Salary || 'N/A'}</td>
                                <td className="px-4 py-2">
                                    <button
                                        onClick={() => handleApplyToOffer(offer.Link)}
                                        className="px-4 py-2 bg-blue-600 text-white rounded-lg"
                                    >
                                        Conocer
                                    </button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="6" className="px-4 py-2 text-center text-gray-500">
                                No hay ofertas disponibles.
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>

            {/* Paginación */}
            <div className="flex justify-center mt-4">
                <nav>
                    <ul className="flex list-none">
                        {Array.from({ length: Math.ceil(filteredOffers.length / offersPerPage) }, (_, index) => (
                            <li key={index} className="mx-1">
                                <button
                                    onClick={() => paginate(index + 1)}
                                    className={`px-3 py-1 rounded ${currentPage === index + 1 ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-700"}`}
                                >
                                    {index + 1}
                                </button>
                            </li>
                        ))}
                    </ul>
                </nav>
            </div>
        </div>
    );
};

export default AllOffers;
