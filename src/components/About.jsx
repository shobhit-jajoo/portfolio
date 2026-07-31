import React from 'react';

export default function About() {
  return (
    <section className="section section--split container" id="about" aria-labelledby="about-title">
      <div className="section-heading reveal">
        <p className="eyebrow">02 / About</p>
        <h2 id="about-title">Still curious<br />about how things work.</h2>
      </div>
      <div className="prose reveal">
        <p>I'm a Computer Science undergraduate at VIT Chennai. I enjoy taking a practical idea and working through the details until it becomes useful software.</p>
        <p>Right now, that means building mobile applications and growing my backend development skills. As an active member of the Newton School of Coding Club, I regularly participate in peer learning and collaborative development.</p>
        <p>I am also learning system design and regularly solving DSA problems—both are good training for thinking clearly about constraints.</p>
      </div>
    </section>
  );
}