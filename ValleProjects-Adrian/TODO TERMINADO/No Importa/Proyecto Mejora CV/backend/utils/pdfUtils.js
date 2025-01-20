import pdf from 'html-pdf';
import { promises as fs } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function generatePDF(profile) {
    const content = `
        <html>
        <head>
            <style>
                ${await loadStyles()}
            </style>
        </head>
        <body>
            <div class="cv-container">
                <div class="header">
                    <div class="tooltip">
                        <span>${profile.fullName}</span>
                    </div>
                    <div class="contact-info">
                        <div class="tooltip">
                            <span>${profile.email}</span>
                        </div>
                        <span>&#xb7;</span>
                        <div class="tooltip">
                            <span>${profile.phone}</span>
                        </div>
                        <span>&#xb7;</span>
                        <div class="tooltip">
                            <span>${profile.portfolio}</span>
                        </div>
                    </div>
                </div>
                <div class="section">
                    <h2>Perfil Profesional</h2>
                    <p>${profile.professionalProfile}</p>
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
                    ${profile.experience && profile.experience.length > 0 ? profile.experience.map(exp => `
                        <div class="entry">
                            <strong>${exp.position} - ${exp.company}</strong><br>
                            ${exp.startDate ? `${exp.startDate} - ${exp.endDate}` : ''}<br>
                            ${exp.description}
                        </div>
                    `).join('') : '<p>No hay información de experiencia profesional disponible.</p>'}
                </div>
                <div class="section">
                    <h2>Formación Académica</h2>
                    ${profile.education && profile.education.length > 0 ? profile.education.map(edu => `
                        <div class="entry">
                            <strong>${edu.degree} - ${edu.institution}</strong><br>
                            ${edu.startDate ? `${edu.startDate} - ${edu.endDate}` : ''}<br>
                            ${edu.description}
                        </div>
                    `).join('') : '<p>No hay información de formación académica disponible.</p>'}
                </div>
                <div class="section">
                    <h2>Proyectos Destacados</h2>
                    ${profile.projects && profile.projects.length > 0 ? profile.projects.map(proj => `
                        <div class="entry">
                            <strong>${proj.name}</strong><br>
                            ${proj.description}
                        </div>
                    `).join('') : '<p>No hay información de proyectos disponibles.</p>'}
                </div>
                <div class="section">
                    <h2>Referencias</h2>
                    ${profile.references && profile.references.length > 0 ? profile.references.map(ref => `
                        <div class="entry">
                            <strong>${ref.name}</strong><br>
                            ${ref.position} ${ref.phone ? `| ${ref.phone}` : ''} ${ref.email ? `| ${ref.email}` : ''}
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

// Función para cargar los estilos CSS desde el archivo styles.css
async function loadStyles() {
    // Actualiza esta ruta según la estructura de tus carpetas
    const stylesPath = path.join(__dirname, '../../frontend/styles/styles.css');
    try {
        const styles = await fs.readFile(stylesPath, 'utf8');
        return styles;
    } catch (error) {
        console.error("Error al cargar los estilos CSS:", error);
        throw error;
    }
}

export { generatePDF };