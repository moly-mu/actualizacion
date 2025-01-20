import React from "react";
import Swal from "sweetalert2"; // Importar SweetAlert2

const parseDate = (dateString) => {
    const parsedDate = Date.parse(dateString);
    if (!isNaN(parsedDate)) {
        return new Date(parsedDate).toLocaleDateString();
    }

    const match = dateString.match(/(\d{1,2})\s(\w+)\s(\d{4})/);
    if (match) {
        const day = match[1];
        const month = match[2];
        const year = match[3];

        const months = {
            Ene: "01",
            Feb: "02",
            Mar: "03",
            Abr: "04",
            May: "05",
            Jun: "06",
            Jul: "07",
            Ago: "08",
            Sep: "09",
            Oct: "10",
            Nov: "11",
            Dic: "12"
        };

        const formattedDate = `${year}-${months[month]}-${day}`;
        return new Date(formattedDate).toLocaleDateString();
    }

    return "N/A";
};

const AllOffersTable = ({ currentOffers, paginate, currentPage, filteredOffersLength, offersPerPage, handleApplyToOffer, handleViewDescription, showLogos }) => {
    return (
        <div className="max-w-6xl mx-auto">
            <table className="min-w-full bg-white">
                <thead>
                    <tr className="border-b">
                        {showLogos && <th className="px-4 py-2 text-left">Logo</th>}
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
                                {showLogos && (
                                    <td className="px-4 py-2">
                                        <img src={offer.logo} alt="Logo" className="w-12 h-12" />
                                    </td>
                                )}
                                <td className="px-4 py-2">
                                    <button
                                        onClick={() => handleViewDescription(offer.Description || offer.description)}
                                        className="text-blue-600 hover:underline"
                                    >
                                        {offer.Title || offer.title || 'N/A'}
                                    </button>
                                </td>
                                <td className="px-4 py-2">{offer.Location || offer.location || 'N/A'}</td>
                                <td className="px-4 py-2">
                                    {offer.ClosingDate || offer.closingDate ? parseDate(offer.ClosingDate || offer.closingDate) : 'N/A'}
                                </td>
                                <td className="px-4 py-2">{offer.Vacancies || offer.vacancies || 'N/A'}</td>
                                <td className="px-4 py-2">{offer.Salary || offer.salary || 'N/A'}</td>
                                <td className="px-4 py-2">
                                    {offer.Link || offer.link ? (
                                        <button
                                            onClick={() => window.open(offer.Link || offer.link, "_blank")}
                                            className="px-4 py-2 bg-blue-600 text-white rounded-lg"
                                        >
                                            Conocer
                                        </button>
                                    ) : (
                                        <button
                                            onClick={() => handleApplyToOffer(offer.id)}
                                            className="px-4 py-2 bg-blue-600 text-white rounded-lg"
                                        >
                                            Aplicar
                                        </button>
                                    )}
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

export default AllOffersTable;