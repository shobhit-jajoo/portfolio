import React from 'react';

export default function Education() {
  return (
    <section className="section container" id="education" aria-labelledby="education-title">
      <div className="section-heading reveal">
        <p className="eyebrow">04 / Education & Certifications</p>
        <h2 id="education-title">Education</h2>
      </div>
      
      <article className="education reveal">
        <p className="education__date">2024 — 2028</p>
        <div>
          <h3>VIT Chennai</h3>
          <p>Bachelor of Technology · Computer Science</p>
        </div>
        <p className="education__grade">CGPA <strong>9.1</strong></p>
      </article>

      <article className="education reveal">
        <p className="education__date">2024</p>
        <div>
          <h3>Class XII</h3>
          <p>High School</p>
        </div>
        <p className="education__grade">Score <strong>92%</strong></p>
      </article>

      <article className="education reveal">
        <p className="education__date">2022</p>
        <div>
          <h3>Class X</h3>
          <p>Secondary School</p>
        </div>
        <p className="education__grade">Score <strong>93.5%</strong></p>
      </article>

      <article className="education reveal" style={{ borderBottom: 'none' }}>
        <p className="education__date">Certifications</p>
        <div>
          <h3>HackerRank Verified</h3>
          <p>SQL (Intermediate) & Problem Solving (Basic)</p>
        </div>
      </article>
    </section>
  );
}