import { optimizeProfile } from '../utils/promptUtils.js';
import { generatePDF } from '../utils/pdfUtils.js';
import { saveProfileToDB } from '../utils/fileUtils.js';
import { TempProfile } from '../../models/ia/tempIA.js';

const iaImproveController = {
  optimizarCV: async (req, res) => {
    try {
      const cvData = {
        fullName: req.body.fullName,
        email: req.body.email,
        phone: req.body.phone,
        portfolio: req.body.portfolio,
        professionalProfile: req.body.professionalProfile,
        technicalSkills: req.body.technicalSkills || [],
        softSkills: req.body.softSkills || [],
        experiences: req.body.experiences || [],
        educations: req.body.educations || [],
        projects: req.body.projects || [],
        references: req.body.references || []
      };

      // Guarda el perfil temporal en la base de datos
      const tempProfileId = await saveProfileToDB(cvData);

      // Optimizar el perfil utilizando el ID del perfil temporal
      const optimizedProfile = await optimizeProfile(tempProfileId);

      // Combinar los datos originales con los datos optimizados
      const combinedProfile = {
        ...cvData,
        ...optimizedProfile
      };

      // Generar PDF con el perfil combinado
      const pdfBuffer = await generatePDF(combinedProfile);

      // Modificar el nombre del PDF aquí
      const pdfFileName = `CV_Mejorado.pdf`;

      // Enviar el PDF generado como respuesta
      res.setHeader('Content-Disposition', `attachment; filename=${pdfFileName}`);
      res.setHeader('Content-Type', 'application/pdf');
      res.send(pdfBuffer);

      // eliminar el perfil temporal de la base de datos después de enviar el PDF
      await TempProfile.findByIdAndDelete(tempProfileId);

    } catch (error) {
      console.error("Error al optimizar el CV:", error.message);
      res.status(500).send("Hubo un problema al optimizar el CV.");
    }
  }
};

export { iaImproveController };