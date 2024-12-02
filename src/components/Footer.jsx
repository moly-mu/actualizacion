
const Footer = () => {
  return (
    <footer className="bg-white py-8 border-t border-gray-300">
      <div className="container mx-auto flex flex-col space-y-8">
        
        <div className="flex flex-col md:flex-row justify-between items-center md:items-start">
         
          <div className="text-left md:order-1">
            <h1 className="text-2xl font-bold text-[#00102D] text-center md:text-left">
              <span className="text-[#00102D]">UDT</span> TALENTO
            </h1>
            <p className="text-sm text-[#00102D] text-center md:text-left">
              Conectando talento con el mundo laboral
            </p>
          </div>

          <div className="flex space-x-8 text-blue-800 text-sm md:order-3">
            <a href="#" className="hover:underline">Volver al inicio</a>
            <a href="#" className="hover:underline">Contacto</a>
            <a href="#" className="hover:underline">Preguntas y respuestas</a>
            <a href="#" className="hover:underline">Cookies</a>
          </div>
        </div>

        <hr className="border-gray-300" />
        
        <div className="flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-blue-800 text-left md:order-1">
            2024 | UDT - Todos los derechos reservados
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
