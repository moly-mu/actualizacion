import React, { useState } from 'react';
import './styles/styles.css';
import { showPreview, downloadPDF, closePreview } from './utils/hvd';

const ProfileForm = ({ user }) => {
  const [cvData, setCvData] = useState({
    fullName: '',
    email: '',
    phone: '',
    portfolio: '',
    professionalProfile: '',
    technicalSkills: [],
    softSkills: [],
    experiences: [],
    educations: [],
    projects: [],
    references: [],
  });

  const handleShowPreview = () => {
    showPreview(cvData);
  };

  const handleDownloadPDF = () => {
    downloadPDF(cvData);
  };

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setCvData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  const handleSkillChange = (type, index, value) => {
    const skillsType = type === 'technical' ? 'technicalSkills' : 'softSkills';
    const newSkills = [...cvData[skillsType]];
    newSkills[index] = value;
    setCvData((prevData) => ({
      ...prevData,
      [skillsType]: newSkills,
    }));
  };

  const handleExperienceChange = (index, key, value) => {
    const newExperiences = [...cvData.experiences];
    newExperiences[index][key] = value;
    setCvData((prevData) => ({
      ...prevData,
      experiences: newExperiences,
    }));
  };

  const handleEducationChange = (index, key, value) => {
    const newEducations = [...cvData.educations];
    newEducations[index][key] = value;
    setCvData((prevData) => ({
      ...prevData,
      educations: newEducations,
    }));
  };

  const handleProjectChange = (index, key, value) => {
    const newProjects = [...cvData.projects];
    newProjects[index][key] = value;
    setCvData((prevData) => ({
      ...prevData,
      projects: newProjects,
    }));
  };

  const handleReferenceChange = (index, key, value) => {
    const newReferences = [...cvData.references];
    newReferences[index][key] = value;
    setCvData((prevData) => ({
      ...prevData,
      references: newReferences,
    }));
  };

  const addSkill = (type) => {
    const skillsType = type === 'technical' ? 'technicalSkills' : 'softSkills';
    setCvData((prevData) => ({
      ...prevData,
      [skillsType]: [...prevData[skillsType], ''],
    }));
  };

  const removeSkill = (type, index) => {
    const skillsType = type === 'technical' ? 'technicalSkills' : 'softSkills';
    const newSkills = cvData[skillsType].filter((_, i) => i !== index);
    setCvData((prevData) => ({
      ...prevData,
      [skillsType]: newSkills,
    }));
  };

  const addExperience = () => {
    setCvData((prevData) => ({
      ...prevData,
      experiences: [
        ...prevData.experiences,
        { role: '', company: '', startDate: '', endDate: '', description: '' },
      ],
    }));
  };

  const removeExperience = (index) => {
    const newExperiences = cvData.experiences.filter((_, i) => i !== index);
    setCvData((prevData) => ({
      ...prevData,
      experiences: newExperiences,
    }));
  };

  const addEducation = () => {
    setCvData((prevData) => ({
      ...prevData,
      educations: [
        ...prevData.educations,
        { title: '', institution: '', startDate: '', endDate: '', description: '' },
      ],
    }));
  };

  const removeEducation = (index) => {
    const newEducations = cvData.educations.filter((_, i) => i !== index);
    setCvData((prevData) => ({
      ...prevData,
      educations: newEducations,
    }));
  };

  const addProject = () => {
    setCvData((prevData) => ({
      ...prevData,
      projects: [...prevData.projects, { name: '', description: '' }],
    }));
  };

  const removeProject = (index) => {
    const newProjects = cvData.projects.filter((_, i) => i !== index);
    setCvData((prevData) => ({
      ...prevData,
      projects: newProjects,
    }));
  };

  const addReference = () => {
    setCvData((prevData) => ({
      ...prevData,
      references: [
        ...prevData.references,
        { name: '', relation: '', phone: '', email: '' },
      ],
    }));
  };

  const removeReference = (index) => {
    const newReferences = cvData.references.filter((_, i) => i !== index);
    setCvData((prevData) => ({
      ...prevData,
      references: newReferences,
    }));
  };

  return (
    <div className="space-y-12 p-16 rounded-3xl shadow-2xl max-w-7xl mx-auto">
      <h2 className="text-5xl font-extrabold text-gray-800 mb-10 text-center tracking-wide">Formulario de Hoja de Vida</h2>
      <form className="space-y-8">
        <div className="cv-container">
          <div className="header">
            <div className="tooltip">
              <input
                type="text"
                placeholder="Tu Nombre Completo"
                id="fullName"
                value={cvData.fullName}
                onChange={handleInputChange}
              />
              <span className="tooltiptext">Usa tu nombre completo de forma profesional</span>
            </div>
            <div className="contact-info">
              <div className="tooltip">
                <input
                  type="email"
                  placeholder="correo@ejemplo.com"
                  id="email"
                  value={cvData.email}
                  onChange={handleInputChange}
                />
                <span className="tooltiptext">Usa un correo profesional, preferiblemente basado en tu nombre</span>
              </div>
              <span>&#xb7;</span>
              <div className="tooltip">
                <input
                  type="tel"
                  placeholder="+XX XXXXXXXXXX"
                  id="phone"
                  value={cvData.phone}
                  onChange={handleInputChange}
                />
                <span className="tooltiptext">Incluye tu código de país y número en formato internacional</span>
              </div>
              <span>&#xb7;</span>
              <div className="tooltip">
                <input
                  type="url"
                  placeholder="enlace a tu portafolio/LinkedIn"
                  id="portfolio"
                  value={cvData.portfolio}
                  onChange={handleInputChange}
                />
                <span className="tooltiptext">Asegúrate de que el enlace esté actualizado y sea relevante</span>
              </div>
            </div>
          </div>

          <div className="section">
            <h2>Perfil Profesional</h2>
            <textarea
              id="professionalProfile"
              placeholder="Describe tu perfil profesional en 2-3 líneas. Ejemplo: 'Profesional con X años de experiencia en [campo], especializado en [área específica]. Destaca por [logros principales] y busca [objetivo profesional].'"
              value={cvData.professionalProfile}
              onChange={handleInputChange}
            ></textarea>
          </div>

          <div className="section">
            <h2>Habilidades</h2>
            <div className="skills-container">
              <div className="skill-category">
                <h3>Habilidades Técnicas</h3>
                <div id="technicalSkills">
                  {cvData.technicalSkills.map((skill, index) => (
                    <div key={index} className="skill-input">
                      <input
                        type="text"
                        placeholder="Nueva habilidad técnica"
                        value={skill}
                        onChange={(e) => handleSkillChange('technical', index, e.target.value)}
                      />
                      <button
                        type="button"
                        className="delete-btn"
                        onClick={() => removeSkill('technical', index)}
                      >
                        ×
                      </button>
                    </div>
                  ))}
                </div>
                <button
                  type="button"
                  className="add-btn"
                  onClick={() => addSkill('technical')}
                >
                  + Agregar Habilidad Técnica
                </button>
              </div>
              <div className="skill-category">
                <h3>Habilidades Blandas</h3>
                <div id="softSkills">
                  {cvData.softSkills.map((skill, index) => (
                    <div key={index} className="skill-input">
                      <input
                        type="text"
                        placeholder="Nueva habilidad blanda"
                        value={skill}
                        onChange={(e) => handleSkillChange('soft', index, e.target.value)}
                      />
                      <button
                        type="button"
                        className="delete-btn"
                        onClick={() => removeSkill('soft', index)}
                      >
                        ×
                      </button>
                    </div>
                  ))}
                </div>
                <button
                  type="button"
                  className="add-btn"
                  onClick={() => addSkill('soft')}
                >
                  + Agregar Habilidad Blanda
                </button>
              </div>
            </div>
          </div>

          <div className="section">
            <h2>Experiencia Profesional</h2>
            <div id="experience">
              {cvData.experiences.map((experience, index) => (
                <div key={index} className="experience-item">
                  <input
                    type="text"
                    placeholder="Cargo"
                    value={experience.role}
                    onChange={(e) => handleExperienceChange(index, 'role', e.target.value)}
                  />
                  <input
                    type="text"
                    placeholder="Empresa"
                    value={experience.company}
                    onChange={(e) => handleExperienceChange(index, 'company', e.target.value)}
                  />
                  <div className="date-range">
                    <input
                      type="date"
                      placeholder="Fecha inicio"
                      className="date-input"
                      value={experience.startDate}
                      onChange={(e) => handleExperienceChange(index, 'startDate', e.target.value)}
                    />
                    <span>-</span>
                    <input
                      type="date"
                      placeholder="Fecha fin"
                      className="date-input"
                      value={experience.endDate}
                      onChange={(e) => handleExperienceChange(index, 'endDate', e.target.value)}
                    />
                  </div>
                  <textarea
                    placeholder="• Describe tus logros cuantificables
                    • Otro logro importante
                    • Un logro más"
                    value={experience.description}
                    onChange={(e) => handleExperienceChange(index, 'description', e.target.value)}
                  ></textarea>
                  <button
                    type="button"
                    className="delete-btn"
                    onClick={() => removeExperience(index)}
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
            <button type="button" className="add-btn" onClick={addExperience}>
              + Agregar Experiencia
            </button>
          </div>

          <div className="section">
            <h2>Formación Académica</h2>
            <div id="education">
              {cvData.educations.map((education, index) => (
                <div key={index} className="education-item">
                  <input
                    type="text"
                    placeholder="Título"
                    value={education.title}
                    onChange={(e) => handleEducationChange(index, 'title', e.target.value)}
                  />
                  <input
                    type="text"
                    placeholder="Institución"
                    value={education.institution}
                    onChange={(e) => handleEducationChange(index, 'institution', e.target.value)}
                  />
                  <div className="date-range">
                    <input
                      type="date"
                      placeholder="Fecha inicio"
                      className="date-input"
                      value={education.startDate}
                      onChange={(e) => handleEducationChange(index, 'startDate', e.target.value)}
                    />
                    <span>-</span>
                    <input
                      type="date"
                      placeholder="Fecha fin"
                      className="date-input"
                      value={education.endDate}
                      onChange={(e) => handleEducationChange(index, 'endDate', e.target.value)}
                    />
                  </div>
                  <textarea
                    placeholder="• Logro académico relevante
                    • Proyecto destacado"
                    value={education.description}
                    onChange={(e) => handleEducationChange(index, 'description', e.target.value)}
                  ></textarea>
                  <button
                    type="button"
                    className="delete-btn"
                    onClick={() => removeEducation(index)}
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
            <button type="button" className="add-btn" onClick={addEducation}>
              + Agregar Formación
            </button>
          </div>

          <div className="section">
            <h2>Proyectos Destacados</h2>
            <div id="projects">
              {cvData.projects.map((project, index) => (
                <div key={index} className="experience-item">
                  <input
                    type="text"
                    placeholder="Nombre del Proyecto"
                    value={project.name}
                    onChange={(e) => handleProjectChange(index, 'name', e.target.value)}
                  />
                  <textarea
                    placeholder="• Descripción breve del proyecto
                    • Tecnologías utilizadas
                    • Resultados medibles"
                    value={project.description}
                    onChange={(e) => handleProjectChange(index, 'description', e.target.value)}
                  ></textarea>
                  <button
                    type="button"
                    className="delete-btn"
                    onClick={() => removeProject(index)}
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
            <button type="button" className="add-btn" onClick={addProject}>
              + Agregar Proyecto
            </button>
          </div>

          <div className="section">
            <h2>Referencias</h2>
            <div id="references">
              <p id="defaultText">Disponibles bajo solicitud</p>
              <div id="referencesList">
                {cvData.references.map((reference, index) => (
                  <div key={index} className="reference-item">
                    <input
                      type="text"
                      placeholder="Nombre de la Referencia"
                      value={reference.name}
                      onChange={(e) => handleReferenceChange(index, 'name', e.target.value)}
                    />
                    <input
                      type="text"
                      placeholder="Relación"
                      value={reference.relation}
                      onChange={(e) => handleReferenceChange(index, 'relation', e.target.value)}
                    />
                    <input
                      type="tel"
                      placeholder="Teléfono"
                      value={reference.phone}
                      onChange={(e) => handleReferenceChange(index, 'phone', e.target.value)}
                    />
                    <input
                      type="email"
                      placeholder="Correo Electrónico"
                      value={reference.email}
                      onChange={(e) => handleReferenceChange(index, 'email', e.target.value)}
                    />
                    <button
                      type="button"
                      className="delete-btn"
                      onClick={() => removeReference(index)}
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
            </div>
            <button type="button" className="add-btn" onClick={addReference}>
              + Agregar Referencia
            </button>
          </div>

          <div className="button-container">
            <button type="button" className="action-btn" onClick={handleShowPreview}>
              Vista Previa
            </button>
            <button type="button" className="action-btn" onClick={handleDownloadPDF}>
              Descargar PDF
            </button>
          </div>

          <div className="preview-modal" id="previewModal">
            <div className="preview-content">
              <button type="button" className="close-preview" onClick={closePreview}>
                ×
              </button>
              <div id="previewContent"></div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default ProfileForm;