import React from 'react';

export default function Skills() {
  return (
    <>
      <section className="section container" id="skills" aria-labelledby="skills-title">
        <div className="section-heading reveal">
          <p className="eyebrow">03 / Toolkit</p>
          <h2 id="skills-title">Skills</h2>
        </div>
        <div className="skills-grid reveal">
          <div>
            <h3>Languages</h3>
            <p>Python · C · C++ · Kotlin</p>
          </div>
          <div>
            <h3>Web Development</h3>
            <p>HTML · CSS · JavaScript · React</p>
          </div>
          <div>
            <h3>Databases</h3>
            <p>SQL · MongoDB</p>
          </div>
          <div>
            <h3>Tools & Concepts</h3>
            <p>Git · REST APIs · Data Structures & Algorithms · Android Development</p>
          </div>
        </div>
      </section>

      <section className="section container highlights" aria-label="Highlights">
        <div className="highlight reveal"><strong>100+</strong><span>LeetCode problems</span></div>
        <div className="highlight reveal"><strong>9.1</strong><span>CGPA</span></div>
        <div className="highlight reveal"><strong>10+</strong><span>Projects</span></div>
        <div className="highlight reveal"><strong>2028</strong><span>Expected graduation</span></div>
      </section>
    </>
  );
}