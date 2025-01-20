## Flujo de Optimización de CV

- **A**: Usuario llena formulario de CV
- **B**: Frontend envía datos al backend
- **C**: `index.js`: Configura servidor y maneja ruta `/optimizar-cv`
- **D**: `fileUtils.js`: Genera y guarda archivo JSON del CV
- **E**: `promptUtils.js`: Lee y procesa el archivo JSON
- **F**: `promptUtils.js`: Envía datos a OpenAI para optimización
- **G**: `openai.js`: Respuesta con perfil optimizado
- **H**: `promptUtils.js`: Valida y procesa respuesta
- **I**: `pdfUtils.js`: Genera PDF con perfil optimizado
- **J**: Frontend: Descarga PDF

---

## Flujo de Vista Previa del CV

- **A**: Usuario hace clic en "Vista Previa"
- **B**: Frontend muestra vista previa del CV
- **B**: Si no hay referencias, muestra "Disponibles bajo solicitud"
- **D**: Vista Previa Completa