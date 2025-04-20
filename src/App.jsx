import React, { useState, useRef } from "react";
import "./assets/css/index.css";
import Experience from "./pages/Experience/Experience";
import Contact from "./pages/Contact/Contact";
import Projects from "./pages/Projects/Projects";
import Header from "./pages/Header/Header";
import Hero from "./pages/Hero/Hero";
import Skills from "./pages/Skills/Skills";
import Education from "./pages/Education/Education";
import { Route, Routes } from "react-router-dom";

export default function App() {
  const [isOnePage, setIsOnePage] = useState(true); // Toggle between modes

  // Section refs for scrolling
  const heroRef = useRef(null);
  const skillsRef = useRef(null);
  const experienceRef = useRef(null);
  const educationRef = useRef(null);
  const contactRef = useRef(null);

  const scrollToSection = (ref) => {
    if (ref && ref.current) {
      ref.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
<Header
  isOnePage={isOnePage}
  scrollToSection={scrollToSection}
  refs={{ heroRef, skillsRef, experienceRef, educationRef, contactRef }}
/>

      {isOnePage ? (
        <>
          <div ref={heroRef}>
            <Hero />
          </div>
          <div ref={skillsRef}>
            <Skills />
          </div>
          <div ref={experienceRef}>
            <Experience />
          </div>
          <div ref={educationRef}>
            <Education />
          </div>
          <div ref={contactRef}>
            <Contact />
          </div>
        </>
      ) : (
        <Routes>
          <Route path="/" element={<Hero />} />
          <Route path="/skills" element={<Skills />} />
          <Route path="/experience" element={<Experience />} />
          <Route path="/education" element={<Education />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/projects" element={<Projects />} />
        </Routes>
      )}
    </>
  );
}
