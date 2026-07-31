import React, { useEffect } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Projects from './components/Projects';
import About from './components/About';
import Skills from './components/Skills';
import Education from './components/Education';
import Contact from './components/Contact';
import Footer from './components/Footer';
import './style.css';

function App() {
  // Handles scroll spy and reveal animations
  useEffect(() => {
    const progress = document.querySelector('.progress__value');
    const header = document.querySelector('.site-header');
    const backToTop = document.querySelector('.back-to-top');

    const updateScrollUI = () => {
      const top = window.scrollY;
      const height = document.documentElement.scrollHeight - window.innerHeight;
      if (progress) progress.style.width = `${height ? (top / height) * 100 : 0}%`;
      if (header) header.classList.toggle('is-scrolled', top > 8);
      if (backToTop) backToTop.classList.toggle('is-visible', top > 650);
    };

    window.addEventListener('scroll', updateScrollUI, { passive: true });
    updateScrollUI();

    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          revealObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });

    document.querySelectorAll('.reveal').forEach((el) => revealObserver.observe(el));

    return () => {
      window.removeEventListener('scroll', updateScrollUI);
      revealObserver.disconnect();
    };
  }, []);

  // Smoothly scroll to the top of the page when the arrow is clicked
  const handleScrollToTop = (e) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      <div className="progress" aria-hidden="true"><div className="progress__value"></div></div>
      <Header />
      <main id="top">
        <Hero />
        <Projects />
        <About />
        <Skills />
        <Education />
        <Contact />
      </main>
      <Footer />
      <a 
        className="back-to-top" 
        href="#top" 
        onClick={handleScrollToTop}
        aria-label="Back to top"
      >
        ↑
      </a>
    </>
  );
}

export default App;