import React, { useState } from 'react';
import '../styles/styles.css';

export const showPreview = (data) => {
  const previewModal = document.getElementById('previewModal');
  if (previewModal) {
    previewModal.style.display = 'block';
    const previewContent = document.getElementById('previewContent');
    if (previewContent) {
      previewContent.innerHTML = `
        <div class="cv-preview">
          <h2>Vista Previa del CV</h2>
          <div class="section">
            <h3>Nombre Completo</h3>
            <p>${data.fullName || 'N/A'}</p>
          </div>
          <div class="section">
            <h3>Correo Electrónico</h3>
            <p>${data.email || 'N/A'}</p>
          </div>
          <div class="section">
            <h3>Teléfono</h3>
            <p>${data.phone || 'N/A'}</p>
          </div>
          <div class="section">
            <h3>Portafolio</h3>
            <p>${data.portfolio || 'N/A'}</p>
          </div>
          <div class="section">
            <h3>Perfil Profesional</h3>
            <p>${data.professionalProfile || 'N/A'}</p>
          </div>
          <div class="section">
            <h3>Habilidades Técnicas</h3>
            <ul>
              ${data.technicalSkills.map(skill => `<li>${skill}</li>`).join('')}
            </ul>
          </div>
          <div class="section">
            <h3>Habilidades Blandas</h3>
            <ul>
              ${data.softSkills.map(skill => `<li>${skill}</li>`).join('')}
            </ul>
          </div>
          <div class="section">
            <h3>Experiencia Profesional</h3>
            <ul>
              ${data.experiences.map(exp => `
                <li>
                  <strong>${exp.role}</strong> en ${exp.company} (${exp.startDate} - ${exp.endDate})
                  <p>${exp.description}</p>
                </li>
              `).join('')}
            </ul>
          </div>
          <div class="section">
            <h3>Formación Académica</h3>
            <ul>
              ${data.educations.map(edu => `
                <li>
                  <strong>${edu.title}</strong> en ${edu.institution} (${edu.startDate} - ${edu.endDate})
                  <p>${edu.description}</p>
                </li>
              `).join('')}
            </ul>
          </div>
          <div class="section">
            <h3>Proyectos Destacados</h3>
            <ul>
              ${data.projects.map(proj => `
                <li>
                  <strong>${proj.name}</strong>
                  <p>${proj.description}</p>
                </li>
              `).join('')}
            </ul>
          </div>
          <div class="section">
            <h3>Referencias</h3>
            <ul>
              ${data.references.map(ref => `
                <li>
                  <strong>${ref.name}</strong> (${ref.relation})
                  <p>Teléfono: ${ref.phone}</p>
                  <p>Email: ${ref.email}</p>
                </li>
              `).join('')}
            </ul>
          </div>
        </div>
      `;
    }
  }
};

export const closePreview = () => {
  const previewModal = document.getElementById('previewModal');
  if (previewModal) {
    previewModal.style.display = 'none';
  }
};

export const downloadPDF = async (cvData) => {
  try {
    console.log('Sending cvData:', cvData);
    const response = await fetch('http://localhost:5000/api/iaImprove/optimizar-cv', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(cvData),
    });

    if (!response.ok) {
      throw new Error('Error al optimizar CV: ' + response.statusText);
    }

    const blob = await response.blob();
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.style.display = 'none';
    a.href = url;
    a.download = 'optimized_cv.pdf';
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
  } catch (error) {
    console.error('Error al optimizar CV:', error.message);
    alert('Error al optimizar el CV: ' + error.message);
  }
};

const addSkill = (containerId) => {
  const container = document.getElementById(containerId);
  const skillInput = document.createElement('div');
  skillInput.className = 'skill-input';
  skillInput.innerHTML = `
    <input type="text" placeholder="Nueva habilidad">
    <button class="delete-btn" onclick="this.parentElement.remove()">×</button>
  `;
  container.appendChild(skillInput);
};

const addExperience = () => {
  const container = document.getElementById('experience');
  const experienceItem = document.createElement('div');
  experienceItem.className = 'experience-item';
  experienceItem.innerHTML = `
    <input type="text" placeholder="Cargo">
    <input type="text" placeholder="Empresa">
    <div class="date-range">
      <input type="date" placeholder="Fecha inicio" class="date-input">
      <span>-</span>
      <input type="date" placeholder="Fecha fin" class="date-input">
    </div>
    <textarea placeholder="• Describe tus logros cuantificables&#10;• Otro logro importante&#10;• Un logro más"></textarea>
    <button class="delete-btn" onclick="this.parentElement.remove()">×</button>
  `;
  container.appendChild(experienceItem);
};

const addEducation = () => {
  const container = document.getElementById('education');
  const educationItem = document.createElement('div');
  educationItem.className = 'education-item';
  educationItem.innerHTML = `
    <input type="text" placeholder="Título">
    <input type="text" placeholder="Institución">
    <div class="date-range">
      <input type="date" placeholder="Fecha inicio" class="date-input">
      <span>-</span>
      <input type="date" placeholder="Fecha fin" class="date-input">
    </div>
    <textarea placeholder="• Logro académico relevante&#10;• Proyecto destacado"></textarea>
    <button class="delete-btn" onclick="this.parentElement.remove()">×</button>
  `;
  container.appendChild(educationItem);
};

const addProject = () => {
  const container = document.getElementById('projects');
  const projectItem = document.createElement('div');
  projectItem.className = 'experience-item';
  projectItem.innerHTML = `
    <input type="text" placeholder="Nombre del Proyecto">
    <textarea placeholder="• Descripción breve del proyecto&#10;• Tecnologías utilizadas&#10;• Resultados medibles"></textarea>
    <button class="delete-btn" onclick="this.parentElement.remove()">×</button>
  `;
  container.appendChild(projectItem);
};

const addReference = () => {
  const container = document.getElementById('referencesList');
  const defaultText = document.getElementById('defaultText');
  defaultText.style.display = 'none';
  const referenceItem = document.createElement('div');
  referenceItem.className = 'reference-item';
  referenceItem.innerHTML = `
    <input type="text" placeholder="Nombre Completo">
    <input type="text" placeholder="Cargo, Empresa">
    <input type="tel" placeholder="Teléfono (ej: +57 300 123 4567)">
    <input type="email" placeholder="Correo electrónico">
    <button class="delete-btn" onclick="removeReference(this)">×</button>
  `;
  container.appendChild(referenceItem);
};

const removeReference = (button) => {
  button.parentElement.remove();
  const container = document.getElementById('referencesList');
  const defaultText = document.getElementById('defaultText');
  if (container.children.length === 0) {
    defaultText.style.display = 'block';
  }
};

const Hdv = () => {
  const [skills ] = useState({ technicalSkills: [], softSkills: [] });
  const [experience ] = useState([]);
  const [education ] = useState([]);
  const [projects ] = useState([]);
  const [references ] = useState([]);
  const [cvData, setCvData] = useState({
    fullName: '',
    email: '',
    phone: '',
    portfolio: '',
    professionalProfile: '',
  });

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!cvData.fullName || !cvData.email || !cvData.phone || !cvData.portfolio || !cvData.professionalProfile) {
      alert('Por favor, rellena todos los campos obligatorios.');
      return;
    }

    const completeCvData = {
      ...cvData,
      technicalSkills: skills.technicalSkills,
      softSkills: skills.softSkills,
      experiences: experience,
      educations: education,
      projects: projects,
      references: references,
    };

    console.log('completeCvData:', completeCvData); // Verifica los datos antes de enviarlos
    await downloadPDF(completeCvData);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        {/* Campos para ingresar datos del CV */}
        <input
          type="text"
          value={cvData.fullName}
          onChange={(e) => setCvData({ ...cvData, fullName: e.target.value })}
          placeholder="Nombre Completo"
          required
        />
        <input
          type="email"
          value={cvData.email}
          onChange={(e) => setCvData({ ...cvData, email: e.target.value })}
          placeholder="Correo Electrónico"
          required
        />
        <input
          type="tel"
          value={cvData.phone}
          onChange={(e) => setCvData({ ...cvData, phone: e.target.value })}
          placeholder="Teléfono"
          required
        />
        <input
          type="url"
          value={cvData.portfolio}
          onChange={(e) => setCvData({ ...cvData, portfolio: e.target.value })}
          placeholder="Portafolio"
          required
        />
        <textarea
          value={cvData.professionalProfile}
          onChange={(e) => setCvData({ ...cvData, professionalProfile: e.target.value })}
          placeholder="Perfil Profesional"
          required
        ></textarea>

        <div>
          <h3>Habilidades Técnicas</h3>
          <div id="technicalSkillsContainer"></div>
          <button type="button" className="add-btn" onClick={() => addSkill('technicalSkillsContainer')}>
            Añadir Habilidad Técnica
          </button>
        </div>

        <div>
          <h3>Habilidades Blandas</h3>
          <div id="softSkillsContainer"></div>
          <button type="button" className="add-btn" onClick={() => addSkill('softSkillsContainer')}>
            Añadir Habilidad Blanda
          </button>
        </div>

        <div id="experience">
          <h3>Experiencia Profesional</h3>
          <button type="button" className="add-btn" onClick={addExperience}>
            Añadir Experiencia
          </button>
        </div>

        <div id="education">
          <h3>Formación Académica</h3>
          <button type="button" className="add-btn" onClick={addEducation}>
            Añadir Educación
          </button>
        </div>

        <div id="projects">
          <h3>Proyectos Destacados</h3>
          <button type="button" className="add-btn" onClick={addProject}>
            Añadir Proyecto
          </button>
        </div>

        <div id="referencesList">
          <h3>Referencias</h3>
          <div id="defaultText">Añade tus referencias aquí.</div>
          <button type="button" className="add-btn" onClick={addReference}>
            Añadir Referencia
          </button>
        </div>

        <div className="button-container">
          <button type="button" className="action-btn" onClick={() => showPreview(cvData)}>
            Vista Previa
          </button>
          <button type="submit" className="action-btn">
            Descargar CV Optimizado
          </button>
        </div>
      </form>

      <div className="preview-modal" id="previewModal">
        <div className="preview-content">
          <button className="close-preview" onClick={closePreview}>
            ×
          </button>
          <div id="previewContent"></div>
        </div>
      </div>
    </div>
  );
};

export default Hdv;