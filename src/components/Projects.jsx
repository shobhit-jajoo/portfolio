import React from 'react';

export default function Projects() {
  const listStyle = {
    margin: '12px 0 24px',
    paddingLeft: '20px',
    color: 'var(--muted)',
    fontSize: '16px',
    display: 'flex',
    flexDirection: 'column',
    gap: '8px'
  };

  return (
    <section className="section container" id="projects" aria-labelledby="projects-title">
      <div className="section-heading reveal">
        <p className="eyebrow">01 / Selected work</p>
        <h2 id="projects-title">Featured projects</h2>
        <p>A few things I have made while learning how useful software comes together.</p>
      </div>
      <div className="projects">
        
        <article className="project reveal">
          <p className="project__number">01</p>
          <div className="project__body">
            <h3>Cinema Movie Display Application</h3>
            <ul style={listStyle}>
              <li>Integrated TMDB API to fetch real-time movie data including posters, ratings, trailers, and show details[cite: 1].</li>
              <li>Displays currently running and upcoming movies with search, filters, and detailed views[cite: 1].</li>
              <li>Achieved 40% faster load time and 30% reduction in data usage through optimized API calls and image caching[cite: 1].</li>
            </ul>
            <ul className="tag-list"><li>Mobile App</li><li>TMDB API</li></ul>
          </div>
          <a className="project__link" href="https://github.com/shobhit-jajoo" target="_blank" rel="noreferrer">GitHub <span aria-hidden="true">↗</span></a>
        </article>

        <article className="project reveal">
          <p className="project__number">02</p>
          <div className="project__body">
            <h3>Search Engine Optimization Tool</h3>
            <ul style={listStyle}>
              <li>Built a C++ search engine with an inverted index and ranked query retrieval for low latency[cite: 1].</li>
              <li>Implemented efficient indexing, tokenization, and ranking mechanisms to handle 1,000+ documents and queries[cite: 1].</li>
              <li>Reduced average query response time by 35% using optimized data structures[cite: 1].</li>
            </ul>
            <ul className="tag-list"><li>C++</li><li>Data Structures</li></ul>
          </div>
          <a className="project__link" href="https://github.com/shobhit-jajoo/searchX" target="_blank" rel="noreferrer">GitHub <span aria-hidden="true">↗</span></a>
        </article>

        <article className="project reveal">
          <p className="project__number">03</p>
          <div className="project__body">
            <h3>Healthcare Workforce Optimization</h3>
            <ul style={listStyle}>
              <li>Developed a healthcare staff scheduling engine considering availability, workload, certifications, and role requirements[cite: 1].</li>
              <li>Uses a custom priority-aware scheduling algorithm to minimize conflicts and ensure balanced workload distribution[cite: 1].</li>
              <li>Reduced manual assignment time by 60%, supporting scheduling for 500+ patients and 200+ healthcare staff[cite: 1].</li>
            </ul>
            <ul className="tag-list"><li>C++</li><li>Algorithms</li></ul>
          </div>
          <a className="project__link" href="https://github.com/shobhit-jajoo/nurse-routing-engine" target="_blank" rel="noreferrer">GitHub <span aria-hidden="true">↗</span></a>
        </article>

        <article className="project reveal">
          <p className="project__number">04</p>
          <div className="project__body">
            <h3>Music Control App</h3>
            <ul style={listStyle}>
              <li>Developed an Android music player with playback, next/previous controls, and playlist management[cite: 1].</li>
              <li>Implemented background playback using Foreground Service for uninterrupted music[cite: 1].</li>
              <li>Persisted playback state and optimized activity lifecycle and media session handling for better performance[cite: 1].</li>
            </ul>
            <ul className="tag-list"><li>Kotlin</li><li>Android</li></ul>
          </div>
          <a className="project__link" href="https://github.com/shobhit-jajoo/music-controller" target="_blank" rel="noreferrer">GitHub <span aria-hidden="true">↗</span></a>
        </article>

      </div>
    </section>
  );
}