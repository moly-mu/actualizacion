import { useState, useEffect } from "react";
import AllOffersTable from "./oferts/AllOffersTable";
import OfferTable1 from "./oferts/OfferTable1";
import OfferTable2 from "./oferts/OfferTable2";
import OfferTable3 from "./oferts/OfferTable3";
import OfferTable4 from "./oferts/OfferTable4";
import Swal from "sweetalert2";
import PropTypes from 'prop-types';

const OfferTablesController = ({ offers }) => {
    const [filteredOffers, setFilteredOffers] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedJobBoard, setSelectedJobBoard] = useState("Todos");
    const [currentPage, setCurrentPage] = useState(1);
    const offersPerPage = 10;

    const jobBoards = ["Todos", "TRABAJOS.COM", "ELEMPLEO", "HOYTRABAJAS", "UDC"];

    useEffect(() => {
        filterOffers();
    }, [searchTerm, selectedJobBoard, offers]);

    const filterOffers = () => {
        let filtered = offers;

        // Filtrar por término de búsqueda
        if (searchTerm) {
            filtered = filtered.filter(offer =>
                (offer.Title && offer.Title.toLowerCase().includes(searchTerm.toLowerCase())) ||
                (offer.Description && offer.Description.toLowerCase().includes(searchTerm.toLowerCase())) ||
                (offer.title && offer.title.toLowerCase().includes(searchTerm.toLowerCase())) ||
                (offer.description && offer.description.toLowerCase().includes(searchTerm.toLowerCase()))
            );
        }

        // Filtrar por bolsa de empleo seleccionada
        if (selectedJobBoard !== "Todos") {
            filtered = filtered.filter(offer => offer.JobBoard === selectedJobBoard);
        }

        // Si "Todos" está seleccionado, no filtrar por JobBoard, mostrar todas las ofertas
        if (selectedJobBoard === "Todos") {
            filtered = offers; // Mostrar todas las ofertas sin filtro de bolsa
        }

        setFilteredOffers(filtered);
        setCurrentPage(1); // Reiniciar la paginación después de filtrar
    };

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
    };

    const handleJobBoardChange = (event) => {
        setSelectedJobBoard(event.target.value);
    };

    const handleApplyToOffer = async (offerId) => {
        const token = localStorage.getItem("token");

        const result = await Swal.fire({
            title: "¿Quieres aplicar a esta oferta?",
            showCancelButton: true,
            confirmButtonText: "Aplicar",
            cancelButtonText: "Cancelar",
            confirmButtonColor: "#3b82f6",
        });

        if (result.isConfirmed && offerId) {
            try {
                const response = await fetch(`http://localhost:5000/api/jobs/${offerId}/apply`, {
                    method: "POST",
                    headers: {
                        "Authorization": `Bearer ${token}`,
                        "Content-Type": "application/json",
                    },
                });

                if (response.status === 200) {
                    Swal.fire("Aplicación exitosa", "Has aplicado a la oferta correctamente.", "success");
                } else if (response.status === 400) {
                    Swal.fire("Ya aplicado", "Ya has aplicado a esta oferta.", "info");
                } else {
                    Swal.fire("Error", "Hubo un problema al aplicar a la oferta.", "error");
                }
            } catch (error) {
                Swal.fire("Error", "Hubo un problema al aplicar a la oferta.", "error");
            }
        }
    };

    const handleViewDescription = (description) => {
        if (!description) {
            Swal.fire({
                title: "Descripción de la oferta",
                text: "No hay descripción disponible para esta oferta.",
                confirmButtonText: "Cerrar",
                confirmButtonColor: "#3b82f6",
            });
        } else {
            Swal.fire({
                title: "Descripción de la oferta",
                html: description.split('\n').map((line, index) => `<p key=${index}>${line}</p>`).join(''),
                confirmButtonText: "Cerrar",
                confirmButtonColor: "#3b82f6",
            });
        }
    };

    // Obtener las ofertas actuales
    const indexOfLastOffer = currentPage * offersPerPage;
    const indexOfFirstOffer = indexOfLastOffer - offersPerPage;
    const currentOffers = filteredOffers.slice(indexOfFirstOffer, indexOfLastOffer);

    // Cambiar de página
    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    const renderTable = () => {
        if (selectedJobBoard === "Todos") {
            return (
                <AllOffersTable
                    currentOffers={currentOffers}
                    paginate={paginate}
                    currentPage={currentPage}
                    filteredOffersLength={filteredOffers.length}
                    offersPerPage={offersPerPage}
                    handleApplyToOffer={handleApplyToOffer}
                    handleViewDescription={handleViewDescription}
                    searchTerm={searchTerm}
                    showLogos={false}
                />
            );
        }
        switch (selectedJobBoard) {
            case "TRABAJOS.COM":
                return (
                    <OfferTable1
                        currentOffers={currentOffers}
                        paginate={paginate}
                        currentPage={currentPage}
                        filteredOffersLength={filteredOffers.length}
                        offersPerPage={offersPerPage}
                        handleViewDescription={handleViewDescription}
                        handleApplyToOffer={handleApplyToOffer}
                        searchTerm={searchTerm}
                    />
                );
            case "ELEMPLEO":
                return (
                    <OfferTable2
                        currentOffers={currentOffers}
                        paginate={paginate}
                        currentPage={currentPage}
                        filteredOffersLength={filteredOffers.length}
                        offersPerPage={offersPerPage}
                        handleViewDescription={handleViewDescription}
                        handleApplyToOffer={handleApplyToOffer}
                        searchTerm={searchTerm}
                    />
                );
            case "HOYTRABAJAS":
                return (
                    <OfferTable3
                        currentOffers={currentOffers}
                        paginate={paginate}
                        currentPage={currentPage}
                        filteredOffersLength={filteredOffers.length}
                        offersPerPage={offersPerPage}
                        handleViewDescription={handleViewDescription}
                        handleApplyToOffer={handleApplyToOffer}
                        searchTerm={searchTerm}
                    />
                );
            case "UDC":
                return (
                    <OfferTable4
                        currentOffers={currentOffers}
                        paginate={paginate}
                        currentPage={currentPage}
                        filteredOffersLength={filteredOffers.length}
                        offersPerPage={offersPerPage}
                        handleViewDescription={handleViewDescription}
                        handleApplyToOffer={handleApplyToOffer}
                        searchTerm={searchTerm}
                    />
                );
            default:
                return null;
        }
    };

    return (
        <div className="max-w-6xl mx-auto">
            {/* Barra de búsqueda */}
            <div className="flex justify-between mb-4">
                <input
                    type="text"
                    placeholder="Buscar..."
                    value={searchTerm}
                    onChange={handleSearchChange}
                    className="px-4 py-2 border rounded-lg w-full mr-4"
                />
                {/* Selección de bolsa de empleo */}
                <div className="flex items-center space-x-4">
                    {jobBoards.map((board, index) => (
                        <label key={index} className="flex items-center">
                            <input
                                type="radio"
                                value={board}
                                checked={selectedJobBoard === board}
                                onChange={handleJobBoardChange}
                                className="mr-2"
                            />
                            {board}
                        </label>
                    ))}
                </div>
            </div>

            {/* Render de la tabla correspondiente */}
            {renderTable()}
        </div>
    );
};

// Definir las PropTypes para el componente
OfferTablesController.propTypes = {
    offers: PropTypes.arrayOf(
        PropTypes.shape({
            Title: PropTypes.string,
            Description: PropTypes.string,
            title: PropTypes.string,
            description: PropTypes.string,
            JobBoard: PropTypes.string,
        })
    ).isRequired,
};

export default OfferTablesController;
