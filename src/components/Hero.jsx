import React from 'react';

export default function Hero() {
  return (
    <section className="hero container" id="home">
      <p className="eyebrow reveal">Computer Science Undergraduate · VIT Chennai</p>
      <h1 className="reveal">Practical software,<br />built with care.</h1>
      <div className="hero__footer reveal">
        <p>I'm Shobhit, a software engineering student focused on mobile applications, backend systems, and becoming a sharper problem solver every day.</p>
        <div className="hero__actions">
          <a className="button button--small" href="/resume.pdf" download="Shobhit_Jajoo_Resume.pdf">
  Resume <span aria-hidden="true">→</span>
</a>
          <a className="text-link" href="#projects">View projects <span aria-hidden="true">↘</span></a>
        </div>
      </div>
      <ul className="social-list reveal" aria-label="Social profiles">
        <li><a href="https://github.com/shobhit-jajoo" target="_blank" rel="noreferrer">GitHub <span aria-hidden="true">↗</span></a></li>
        <li><a href="https://www.linkedin.com/in/shobhit-jajoo/" target="_blank" rel="noreferrer">LinkedIn <span aria-hidden="true">↗</span></a></li>
        <li><a href="https://leetcode.com/u/shobhitjajoo/" target="_blank" rel="noreferrer">LeetCode <span aria-hidden="true">↗</span></a></li>
      </ul>
    </section>
  );
}