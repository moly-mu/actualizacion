import Swal from "sweetalert2"; // Importar SweetAlert2

const OfferTable4 = ({ currentOffers, paginate, currentPage, filteredOffersLength, offersPerPage, handleApplyToOffer, handleViewDescription }) => {
    return (
        <div className="max-w-6xl mx-auto">
            <table className="min-w-full bg-white">
                <thead>
                    <tr className="border-b">
                        <th className="px-4 py-2 text-left">Logo</th>
                        <th className="px-4 py-2 text-left">Título</th>
                        <th className="px-4 py-2 text-left">Compañía</th>
                        <th className="px-4 py-2 text-left">Ubicación</th>
                        <th className="px-4 py-2 text-left">Salario</th>
                        <th className="px-4 py-2 text-left">Fecha de creación</th>
                        <th className="px-4 py-2 text-left">Acción</th>
                    </tr>
                </thead>
                <tbody>
                    {currentOffers.length > 0 ? (
                        currentOffers.map((offer, index) => (
                            <tr key={index} className="border-b">
                                <td className="px-4 py-2">
                                    <img src="/logo.png" alt="Logo" className="w-12 h-12" />
                                </td>
                                <td className="px-4 py-2">
                                    <button
                                        onClick={() => handleViewDescription(offer.description)}
                                        className="text-blue-600 hover:underline"
                                    >
                                        {offer.title}
                                    </button>
                                </td>
                                <td className="px-4 py-2">{offer.company || 'N/A'}</td>
                                <td className="px-4 py-2">{offer.location || 'N/A'}</td>
                                <td className="px-4 py-2">{offer.salary || 'N/A'}</td>
                                <td className="px-4 py-2">{new Date(offer.fechaCreacion).toLocaleDateString()}</td>
                                <td className="px-4 py-2">
                                    <button
                                        onClick={() => handleApplyToOffer(offer.id)}
                                        className="px-4 py-2 bg-blue-600 text-white rounded-lg"
                                    >
                                        Aplicar
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
                        {Array.from({ length: Math.ceil(filteredOffersLength / offersPerPage) }, (_, index) => (
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

export default OfferTable4;
