const getModeloJson = () => {
    return {
        "Title": "Título no disponible",
        "Description": "Descripción no disponible",
        "ClosingDate": getClosingDate(), // Usamos la función aquí
        "Location": "Ubicación no disponible",
        "Vacancies": "Número de vacantes no disponible",
        "Keyword": ["Palabra clave no disponible"],
        "Salary": "Salario no disponible",
        "job_board": " ",
        "Link": " "
    };
};

const getClosingDate = () => {
    const today = new Date();
    const closingDate = new Date(today);
    closingDate.setMonth(today.getMonth() + 1);

    const day = String(closingDate.getDate()).padStart(2, '0');
    const month = String(closingDate.getMonth() + 1).padStart(2, '0'); // Enero es 0
    const year = closingDate.getFullYear();

    return `${day}/${month}/${year}`;
};

module.exports = getModeloJson;