import React, { useEffect, useState } from "react";
import Swal from "sweetalert2"; // Importar SweetAlert2

const OfferTable3 = ({ searchTerm }) => {
    const [offers, setOffers] = useState([]);
    const [filteredOffers, setFilteredOffers] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const offersPerPage = 10;

    useEffect(() => {
        const fetchOffers = async () => {
            try {
                const response = await fetch("http://localhost:5000/api/jsonjobs/jobs3");
                const data = await response.json();
                setOffers(data);
                setFilteredOffers(data); // Inicialmente mostrar todas las ofertas
            } catch (error) {
                console.error("Error fetching offers:", error);
            }
        };

        fetchOffers();
    }, []);

    useEffect(() => {
        filterOffers();
    }, [searchTerm, offers]);

    const filterOffers = () => {
        let filtered = offers;

        if (searchTerm) {
            filtered = filtered.filter(offer =>
                offer.title.toLowerCase().includes(searchTerm.toLowerCase())
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

    return (
        <div className="max-w-6xl mx-auto">
            <table className="min-w-full bg-white">
                <thead>
                    <tr className="border-b">
                        <th className="px-4 py-2 text-left">Logo</th>
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
                                    <img src="/logoempresa2.png" alt="Logo" className="w-12 h-12" />
                                </td>
                                <td className="px-4 py-2">
                                    <button
                                        onClick={() => handleViewDescription(offer.description)}
                                        className="text-blue-600 hover:underline"
                                    >
                                        {offer.title}
                                    </button>
                                </td>
                                <td className="px-4 py-2">{offer.location}</td>
                                <td className="px-4 py-2">{offer.closingDate}</td>
                                <td className="px-4 py-2">{offer.vacancies}</td>
                                <td className="px-4 py-2">{offer.salary}</td>
                                <td className="px-4 py-2">
                                    <button
                                        onClick={() => handleApplyToOffer(offer.link)}
                                        className="px-4 py-2 bg-blue-600 text-white rounded-lg"
                                    >
                                        Conocer
                                    </button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="7" className="px-4 py-2 text-center text-gray-500">
                                No hay ofertas disponibles para esta categoría.
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

export default OfferTable3;