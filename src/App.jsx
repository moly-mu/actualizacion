

import MainSection from "./components/MainSection"
import HeroSection from "./components/Hero";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";


const JobSection = () => {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto text-center">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
          <div className="card bg-white shadow-lg rounded-lg p-5 flex flex-col">
            <img
              src="/src/assets/Shipping Solutions 3D Scene 1 (1).png"
              alt="Delivery"
              className="mx-auto"
            />
            <p className="mt-4 text-lg font-medium">Repartidor fines de semana</p>
          </div>
          <div className="card bg-white shadow-lg rounded-lg p-5 flex flex-col">
            <img
              src="/src/assets/Advancing Healthcare With Electronic Prescription 3D Scene 1 (1).png"
              alt="Doctor"
              className="mx-auto"
            />
            <p className="mt-4 text-lg font-medium">Médico a domicilio</p>
          </div>
          <div className="card bg-white shadow-lg rounded-lg p-5 flex flex-col">
            <img
              src="/src/assets/Course 1 (1).png"
              alt="Teacher"
              className="mx-auto"
            />
            <p className="mt-4 text-lg font-medium">Docente particular</p>
          </div>
        </div>
        <MainSection />
      </div>
    </section>
  );
};

const WhyChooseUs = () => {
  return (
    <section className="py-16">
      <div className="container mx-auto flex flex-col md:flex-row items-center justify-between">
        <div className="flex-1 md:pr-8">
          <h2 className="text-5xl md:text-6xl font-bold text-left mb-6 leading-tight tracking-tight">
            ¿Por qué elegirnos?
          </h2>
          <p className="mt-7 text-2xl leading-relaxed text-left max-w-[600px]">
            Gracias a nuestra inteligencia artificial, tendrá una mejor experiencia a la hora de crear su perfil y encontrar ofertas que se ajusten a sus experiencias.
          </p>
        </div>

        <div className="flex-1 flex justify-center md:justify-end mt-4 md:mt-0">
          <img
            src="/src/assets/A Female Customer Service Person Sits In Front Of The Phone And Provides Online Consultation 3D Illustration 1.png"
            alt="Help"
            className="w-85 h-auto md:ml-4"
          />
        </div>
      </div>
    </section>
  );
};

const  App = () => {

    return (
      <div className="font-sans text-[#00102D]">
        <Navbar />
        <HeroSection />
        <JobSection />
        <WhyChooseUs />
        <Footer />
      </div>
  );
};

export default App;
