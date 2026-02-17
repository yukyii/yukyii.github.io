import { useState, useEffect } from 'react';
import { Navigation } from './components/Navigation';
import { HomePage } from './components/HomePage';
import { Resume } from './components/Resume';
import { About } from './components/About';
import Projects from './components/Projects';
import Footer from './components/Footer';

export default function App() {
  const [activeSection, setActiveSection] = useState('Home');
  const [isScrolling, setIsScrolling] = useState(false);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId.toLowerCase());
    if (element) {
      setIsScrolling(true);
      element.scrollIntoView({ behavior: 'smooth' });
      
      setTimeout(() => {
        setIsScrolling(false);
      }, 800);
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      if (isScrolling) return;
      
      const sections = ['home', 'resume', 'about', 'projects'];
      const scrollPosition = window.scrollY + 100; 

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section.charAt(0).toUpperCase() + section.slice(1));
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); 

    return () => window.removeEventListener('scroll', handleScroll);
  }, [isScrolling]);

  return (
    <div className="bg-background">
      <Navigation 
        activeSection={activeSection} 
        setActiveSection={setActiveSection}
        onSectionClick={scrollToSection}
      />
      <main>
        <section id="home">
          <HomePage activeSection={activeSection} />
        </section>
        <section id="resume">
          <Resume />
        </section>
        <section id="about">
          <About />
        </section>
        <section id="projects">
          <Projects 
          activeSection={activeSection}
          onMouseEnterFooter={() => setActiveSection('Projects')}
          onMouseLeaveFooter={() => {}}
        />
        </section>
      </main>
      <Footer
        activeSection={activeSection}
        onMouseEnterFooter={() => setActiveSection('Footer')}
        onMouseLeaveFooter={() => {}}
      />
    </div>
  );
}