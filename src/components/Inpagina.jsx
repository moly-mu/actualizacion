import { useState } from "react";
import Navbar from "./Navbar";
import HeroSection from "./HeroSection";
import MainSection from "./MainSection";
import Footer from "./Footer";
import LoginModal from "./LoginModal";
import { gsap } from "gsap";

const Inpagina = () => {
  const [showLogin, setShowLogin] = useState(false);

  const handleLoginClick = () => {
    setShowLogin(true);
    gsap.to(".main-content", { filter: "blur(8px)", duration: 0.5 });
  };

  const handleCloseLogin = () => {
    setShowLogin(false);
    gsap.to(".main-content", { filter: "blur(0px)", duration: 0.5 });
  };

  return (
    <div className="font-sans text-blue-800">
      <Navbar onLoginClick={handleLoginClick} />
      <HeroSection />
      <div className="main-content">
        <MainSection onLoginClick={handleLoginClick} />
        <Footer />
      </div>
      {showLogin && <LoginModal onClose={handleCloseLogin} />}
    </div>
  );
};

export default Inpagina;
