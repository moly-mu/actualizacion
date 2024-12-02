
const HeroSection = () => {
  return (
    <header className="bg-white py-8">
      <div className="container mx-auto flex flex-col md:flex-row items-center justify-between">
        
        <div className="flex-1 md:pr-8">
          <h1 className="text-5xl font-bold text-left leading-snug">
            ¿Buscas <span className="text-blue-700">empleo</span>? Conéctate 
            con cientos de oportunidades laborales que se ajustan a tus habilidades
            y aspiraciones.
          </h1>
        </div>

        
        <div className="flex-1 flex justify-center md:justify-end mt-6 md:mt-0">
          <img
            src="/src/assets/Email Marketing 3D Animated Icon 1 (1).png"
            alt="Ilustración de empleo"
            className="w-90 h-auto"
          />
        </div>
      </div>
    </header>
  );
};

export default HeroSection;
