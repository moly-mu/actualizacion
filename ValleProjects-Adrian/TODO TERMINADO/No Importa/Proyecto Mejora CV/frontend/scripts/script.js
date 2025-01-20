function addSkill(containerId) {
    const container = document.getElementById(containerId);
    const skillInput = document.createElement('div');
    skillInput.className = 'skill-input';
    skillInput.innerHTML = `
        <input type="text" placeholder="Nueva habilidad">
        <button class="delete-btn" onclick="this.parentElement.remove()">×</button>
    `;
    container.appendChild(skillInput);
}

function addExperience() {
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
}

function addEducation() {
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
}

function addProject() {
    const container = document.getElementById('projects');
    const projectItem = document.createElement('div');
    projectItem.className = 'experience-item';
    projectItem.innerHTML = `
        <input type="text" placeholder="Nombre del Proyecto">
        <textarea placeholder="• Descripción breve del proyecto&#10;• Tecnologías utilizadas&#10;• Resultados medibles"></textarea>
        <button class="delete-btn" onclick="this.parentElement.remove()">×</button>
    `;
    container.appendChild(projectItem);
}

function addReference() {
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
}

function removeReference(button) {
    button.parentElement.remove();
    const container = document.getElementById('referencesList');
    const defaultText = document.getElementById('defaultText');
    if (container.children.length === 0) {
        defaultText.style.display = 'block';
    }
}

function showPreview() {
    const previewModal = document.getElementById('previewModal');
    const previewContent = document.getElementById('previewContent');
    const cvContent = document.querySelector('.cv-container').cloneNode(true);
    const referencesList = cvContent.querySelector('#referencesList');
    const referenceInputs = referencesList.querySelectorAll('input');
    const hasFilledReference = Array.from(referenceInputs).some(input => input.value.trim());

    if (!hasFilledReference) {
        const defaultText = document.createElement('p');
        defaultText.textContent = 'Disponibles bajo solicitud';
        referencesList.innerHTML = '';
        referencesList.appendChild(defaultText);
    }

    cvContent.querySelectorAll('input, textarea').forEach(input => {
        const span = document.createElement('span');
        span.textContent = input.value || '';

        if (!input.value) {
            if (input.closest('.contact-info')) {
                const container = input.closest('.tooltip');
                const dot = container.nextElementSibling;
                if (dot && dot.textContent === '·') {
                    dot.remove();
                }
                container.remove();
                return;
            }
            input.parentNode.removeChild(input);
            return;
        }

        if (input.id === 'fullName') {
            span.style.fontSize = '2rem';
            span.style.fontWeight = 'bold';
            span.style.display = 'block';
            span.style.marginBottom = '0.5rem';
        }

        if (['experience', 'education', 'projects', 'references'].some(id => input.closest(`#${id}`))) {
            span.style.display = 'block';
            span.style.marginBottom = '0.5rem';
        }

        input.parentNode.replaceChild(span, input);
    });

    cvContent.querySelectorAll('.section').forEach(section => {
        if (section.id !== 'references') {
            const hasContent = Array.from(section.querySelectorAll('span')).some(span => span.textContent.trim());
            if (!hasContent) {
                section.remove();
            }
        }
    });

    cvContent.querySelectorAll('.delete-btn, .add-btn, .button-container').forEach(btn => btn.remove());

    previewContent.innerHTML = '';
    previewContent.appendChild(cvContent);
    previewModal.style.display = 'block';
}

async function downloadPDF() {
    // Reunir los datos del CV con manejo de valores nulos
    const cvData = {
        fullName: document.getElementById('fullName')?.value || '',
        email: document.getElementById('email')?.value || '',
        phone: document.getElementById('phone')?.value || '',
        portfolio: document.getElementById('portfolio')?.value || '',
        professionalProfile: document.getElementById('professionalProfile')?.value || '',
        technicalSkills: Array.from(document.querySelectorAll('#technicalSkills .skill-input input')).map(input => input.value) || [],
        softSkills: Array.from(document.querySelectorAll('#softSkills .skill-input input')).map(input => input.value) || [],
        experience: Array.from(document.querySelectorAll('#experience .experience-item')).map(item => ({
            position: item.querySelector('input[placeholder="Cargo"]')?.value || '',
            company: item.querySelector('input[placeholder="Empresa"]')?.value || '',
            startDate: item.querySelector('.date-input:nth-child(1)')?.value || '',
            endDate: item.querySelector('.date-input:nth-child(3)')?.value || '',
            description: item.querySelector('textarea')?.value || '',
        })) || [],
        education: Array.from(document.querySelectorAll('#education .education-item')).map(item => ({
            degree: item.querySelector('input[placeholder="Título"]')?.value || '',
            institution: item.querySelector('input[placeholder="Institución"]')?.value || '',
            startDate: item.querySelector('.date-input:nth-child(1)')?.value || '',
            endDate: item.querySelector('.date-input:nth-child(3)')?.value || '',
            description: item.querySelector('textarea')?.value || '',
        })) || [],
        projects: Array.from(document.querySelectorAll('#projects .experience-item')).map(item => ({
            name: item.querySelector('input[placeholder="Nombre del Proyecto"]')?.value || '',
            description: item.querySelector('textarea')?.value || '',
        })) || [],
        references: Array.from(document.querySelectorAll('#referencesList .reference-item')).map(item => ({
            name: item.querySelector('input[placeholder="Nombre Completo"]')?.value || '',
            position: item.querySelector('input[placeholder="Cargo, Empresa"]')?.value || '',
            phone: item.querySelector('input[placeholder="Teléfono (ej: +57 300 123 4567)"]')?.value || '',
            email: item.querySelector('input[placeholder="Correo electrónico"]')?.value || '',
        })) || [],
    };

    try {
        const response = await fetch('/optimizar-cv', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ cvData })
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
}

function closePreview() {
    document.getElementById('previewModal').style.display = 'none';
}

window.onclick = function (event) {
    const modal = document.getElementById('previewModal');
    if (event.target === modal) {
        closePreview();
    }
};