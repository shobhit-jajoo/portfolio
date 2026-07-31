import React, { useState } from 'react';

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="site-header" id="top">
      <nav className="nav container" aria-label="Main navigation">
        <a className="brand" href="#home">Shobhit Jajoo<span aria-hidden="true">.</span></a>
        
        <button 
          className="menu-toggle" 
          type="button" 
          aria-expanded={isOpen} 
          onClick={() => setIsOpen(!isOpen)}
        >
          <span className="sr-only">{isOpen ? 'Close navigation' : 'Open navigation'}</span>
          <i></i><i></i>
        </button>

        <div className={`nav__menu ${isOpen ? 'is-open' : ''}`} id="site-menu">
          <ul className="nav__links">
            <li><a href="#projects" onClick={() => setIsOpen(false)}>Projects</a></li>
            <li><a href="#about" onClick={() => setIsOpen(false)}>About</a></li>
            <li><a href="#skills" onClick={() => setIsOpen(false)}>Skills</a></li>
            <li><a href="#education" onClick={() => setIsOpen(false)}>Education</a></li>
            <li><a href="#contact" onClick={() => setIsOpen(false)}>Contact</a></li>
          </ul>
          <a className="button button--small" href="/resume.pdf" download="Shobhit_Jajoo_Resume.pdf">
  Resume <span aria-hidden="true">→</span>
</a>
        </div>
      </nav>
    </header>
  );
}