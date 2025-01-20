import pdf from 'html-pdf';

const inlineStyles = `
    @import url('https://fonts.googleapis.com/css2?family=STIX+Two+Text:wght@400;500;600;700&display=swap');
    
    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
        font-family: 'STIX Two Text', serif;
    }

    body {
        background: #f5f5f5;
        padding: 2rem;
        line-height: 1.6;
    }

    .cv-container {
        max-width: 900px;
        margin: 0 auto;
        background: white;
        padding: 3rem;
        box-shadow: 0 4px 24px rgba(0,0,0,0.08);
        border-radius: 12px;
    }

    .header {
        text-align: center;
        margin-bottom: 3rem;
        padding-bottom: 1.5rem;
        border-bottom: 3px solid #2196F3;
        background: linear-gradient(to bottom, #fff, #f8f9fa);
        border-radius: 8px;
        padding: 2rem;
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    .contact-info {
        display: flex;
        gap: 1rem;
        align-items: center;
        justify-content: center;
        flex-wrap: wrap;
    }

    .contact-info .tooltip {
        margin: 0 0.5rem;
    }

    .header h1 {
        color: #1976D2;
        margin-bottom: 0.5rem;
    }

    .header p {
        color: #666;
    }

    .section {
        margin-bottom: 2rem;
    }

    .section h2 {
        color: #1976D2;
        margin-bottom: 1.5rem;
        padding-bottom: 0.8rem;
        border-bottom: 2px solid #eee;
        font-size: 1.8rem;
    }

    .skills-container {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
        gap: 1rem;
    }

    .skill-category {
        background: linear-gradient(to bottom right, #f8f9fa, #fff);
        padding: 1.5rem;
        border-radius: 8px;
        box-shadow: 0 2px 12px rgba(0,0,0,0.04);
        border: 1px solid #eee;
    }

    .skill-category h3 {
        color: #1976D2;
        margin-bottom: 1rem;
        font-size: 1.2rem;
    }

    .experience-item, .education-item {
        margin-bottom: 1.5rem;
        padding: 1.5rem;
        border-left: 4px solid #2196F3;
        background: #fff;
        box-shadow: 0 2px 12px rgba(0,0,0,0.04);
        border-radius: 8px;
        transition: transform 0.2s ease, box-shadow 0.2s ease;
    }

    .experience-item:hover, .education-item:hover {
        transform: translateY(-2px);
        box-shadow: 0 4px 16px rgba(0,0,0,0.08);
    }

    .tooltip {
        position: relative;
        display: inline-block;
        cursor: help;
    }

    .tooltip .tooltiptext {
        visibility: hidden;
        width: 250px;
        background-color: #333;
        color: #fff;
        padding: 8px 12px;
        border-radius: 8px;
        font-size: 0.9rem;
        box-shadow: 0 4px 16px rgba(0,0,0,0.15);
        position: absolute;
        z-index: 1;
        bottom: 125%;
        left: 50%;
        margin-left: -125px;
        opacity: 0;
        transition: opacity 0.3s;
    }

    .tooltip:hover .tooltiptext {
        visibility: visible;
        opacity: 1;
    }

    input, textarea {
        width: 100%;
        padding: 12px;
        margin: 8px 0;
        border: 2px solid #eee;
        border-radius: 6px;
        font-size: 1rem;
        transition: border-color 0.3s ease;
    }

    input:focus, textarea:focus {
        border-color: #2196F3;
        outline: none;
        box-shadow: 0 0 0 3px rgba(33, 150, 243, 0.1);
    }

    textarea {
        resize: vertical;
        min-height: 100px;
    }

    .skill-input {
        margin-bottom: 10px;
    }

    .add-btn {
        background: linear-gradient(to bottom right, #2196F3, #1976D2);
        color: white;
        border: none;
        padding: 10px 20px;
        border-radius: 6px;
        cursor: pointer;
        margin-top: 15px;
        font-weight: 500;
        transition: transform 0.2s ease;
    }

    .add-btn:hover {
        transform: translateY(-1px);
        background: linear-gradient(to bottom right, #1E88E5, #1565C0);
    }

    .delete-btn {
        background: #ff4444;
        color: white;
        border: none;
        padding: 6px 12px;
        border-radius: 6px;
        cursor: pointer;
        margin-left: 10px;
        transition: background-color 0.2s ease;
    }

    .delete-btn:hover {
        background: #cc0000;
    }

    .reference-item {
        margin-bottom: 1.5rem;
        padding: 1.5rem;
        background: linear-gradient(to bottom right, #f8f9fa, #fff);
        border-radius: 8px;
        border-left: 4px solid #2196F3;
        box-shadow: 0 2px 12px rgba(0,0,0,0.04);
    }

            .reference-item input {
        margin-bottom: 8px;
    }

    #defaultText {
        color: #666;
        font-style: italic;
        padding: 1rem;
        background: #f8f9fa;
        border-radius: 6px;
        text-align: center;
    }

    .button-container {
        display: flex;
        gap: 1rem;
        justify-content: center;
        margin-top: 2rem;
    }

    .action-btn {
        background: linear-gradient(to bottom right, #2196F3, #1976D2);
        color: white;
        border: none;
        padding: 1rem 2rem;
        border-radius: 6px;
        cursor: pointer;
        font-weight: 500;
        transition: all 0.2s ease;
        font-size: 1rem;
    }

        .action-btn:hover {
        transform: translateY(-2px);
        box-shadow: 0 4px 12px rgba(33, 150, 243, 0.2);
    }

    .preview-modal {
        display: none;
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0,0,0,0.8);
        z-index: 1000;
        padding: 2rem;
        overflow-y: auto;
    }

    .preview-content {
        background: white;
        max-width: 900px;
        margin: 0 auto;
        padding: 3rem;
        border-radius: 12px;
        position: relative;
    }

    .close-preview {
        position: absolute;
        top: 1rem;
        right: 1rem;
        background: none;
        border: none;
        font-size: 1.5rem;
        cursor: pointer;
        color: #666;
    }

    .date-range {
        display: flex;
        align-items: center;
        gap: 10px;
        margin: 8px 0;
    }

    .date-range span {
        line-height: 1;
    }

    .date-input {
        flex: 1;
        padding: 12px;
        border: 2px solid #eee;
        border-radius: 6px;
        font-size: 1rem;
        transition: border-color 0.3s ease;
    }

    .date-input:focus {
        border-color: #2196F3;
        outline: none;
        box-shadow: 0 0 0 3px rgba(33, 150, 243, 0.1);
    }

    .experience-item input {
        margin-bottom: 8px;
    }

    .experience-item input:first-of-type {
        margin-bottom: 8px;
    }
`;

async function generatePDF(profile) {
    const content = `
        <html>
        <head>
            <style>
                ${inlineStyles}
            </style>
        </head>
        <body>
            <div class="cv-container">
                <div class="header">
    <div class="tooltip">
        <span>${profile.fullName || 'Nombre Completo'}</span>
    </div>
    <div class="contact-info">
        <div class="tooltip">
            <span>${profile.email || 'Correo Electrónico'}</span>
        </div>
        <span>&#xb7;</span>
        <div class="tooltip">
            <span>${profile.phone || 'Teléfono'}</span>
        </div>
        <span>&#xb7;</span>
        <div class="tooltip">
            <span>${profile.portfolio || 'Portafolio'}</span>
        </div>
    </div>
</div>
<div class="section">
    <h2>Perfil Profesional</h2>
    <p>${profile.professionalProfile || 'Descripción del perfil profesional'}</p>
</div>

                <div class="section">
                    <h2>Habilidades Técnicas</h2>
                    <ul>
                        ${profile.technicalSkills ? profile.technicalSkills.map(skill => `
                            <li>${skill}</li>
                        `).join('') : '<li>No hay habilidades técnicas disponibles.</li>'}
                    </ul>
                </div>
                <div class="section">
                    <h2>Habilidades Blandas</h2>
                    <ul>
                        ${profile.softSkills ? profile.softSkills.map(skill => `
                            <li>${skill}</li>
                        `).join('') : '<li>No hay habilidades blandas disponibles.</li>'}
                    </ul>
                </div>
                <div class="section">
    <h2>Experiencia Profesional</h2>
    ${profile.experiences && profile.experiences.length > 0 ? profile.experiences.map(exp => `
        <div class="entry">
            <strong>${exp.role || 'Cargo'} - ${exp.company || 'Empresa'}</strong><br>
            ${exp.startDate ? `${exp.startDate} - ${exp.endDate}` : 'Fechas no disponibles'}<br>
            ${exp.description || 'Descripción no disponible'}
        </div>
    `).join('') : '<p>No hay información de experiencia profesional disponible.</p>'}
</div>

<div class="section">
    <h2>Formación Académica</h2>
    ${profile.educations && profile.educations.length > 0 ? profile.educations.map(edu => `
        <div class="entry">
            <strong>${edu.title || 'Título'} - ${edu.institution || 'Institución'}</strong><br>
            ${edu.startDate ? `${edu.startDate} - ${edu.endDate}` : 'Fechas no disponibles'}<br>
            ${edu.description || 'Descripción no disponible'}
        </div>
    `).join('') : '<p>No hay información de formación académica disponible.</p>'}
</div>

                <div class="section">
                    <h2>Proyectos Destacados</h2>
                    ${profile.projects && profile.projects.length > 0 ? profile.projects.map(proj => `
                        <div class="entry">
                            <strong>${proj.name || 'Nombre del proyecto'}</strong><br>
                            ${proj.description || 'Descripción no disponible'}
                        </div>
                    `).join('') : '<p>No hay información de proyectos disponibles.</p>'}
                </div>
                <div class="section">
                    <h2>Referencias</h2>
                    ${profile.references && profile.references.length > 0 ? profile.references.map(ref => `
                        <div class="entry">
                            <strong>${ref.name || 'Nombre'} (${ref.relation || 'Relación'})</strong><br>
                            Teléfono: ${ref.phone || 'No disponible'}<br>
                            Email: ${ref.email || 'No disponible'}
                        </div>
                    `).join('') : '<p>Disponibles bajo solicitud</p>'}
                </div>
            </div>
        </body>
        </html>
    `;

    return new Promise((resolve, reject) => {
        pdf.create(content).toBuffer((err, buffer) => {
            if (err) {
                reject(err);
            } else {
                resolve(buffer);
            }
        });
    });
}

export { generatePDF };
