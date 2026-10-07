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

  const projects = [
    {
      number: '01',
      category: 'Machine Learning',
      title: 'AI-Powered Credit Risk & Scoring System',
      description: [
        'Built an interpretable 0–1000 credit-risk scoring system to estimate loan default probability from customer financial and credit-history data.',
        'Engineered behavioural and financial features from multiple credit-history tables and compared Logistic Regression, Random Forest, and XGBoost models.',
        'Added SHAP-based explanations to make model predictions easier to understand and exposed predictions through a FastAPI backend with a Streamlit dashboard.'
      ],
      tags: ['Python', 'XGBoost', 'FastAPI', 'Streamlit'],
      github: '#'
    },

    {
      number: '02',
      category: 'Mobile App',
      title: 'Cinema Movie Display Application',
      description: [
        'Built a mobile application using the TMDB API to fetch real-time movie information including posters, ratings, trailers, and show details.',
        'Displays currently running and upcoming movies with search, filtering, and detailed movie views.',
        'Implemented optimized API calls and image caching to improve loading performance and reduce unnecessary data usage.'
      ],
      tags: ['Flutter', 'Dart', 'TMDB API'],
      github: 'https://github.com/shobhit-jajoo'
    },

    {
      number: '03',
      category: 'Android',
      title: 'Android Media Controller',
      description: [
        'Built an Android application in Java and Kotlin that reads information from the device media session to detect what is currently playing.',
        'Displays active track information and provides playback controls such as play, pause, next, and previous.',
        'Worked with Android media-session and lifecycle behaviour to keep the controller synchronized with active media playback.'
      ],
      tags: ['Java', 'Kotlin', 'Android'],
      github: 'https://github.com/shobhit-jajoo/music-controller'
    },

    {
      number: '04',
      category: 'Systems / C++',
      title: 'Search Engine Optimization Tool',
      description: [
        'Built a C++ search engine using an inverted index and ranked query retrieval for fast document searching.',
        'Implemented tokenization, indexing, and ranking mechanisms for a collection of 1,000+ documents and search queries.',
        'Optimized the underlying data structures to reduce average query response time.'
      ],
      tags: ['C++', 'Data Structures', 'Algorithms'],
      github: 'https://github.com/shobhit-jajoo/searchX'
    },

    {
      number: '05',
      category: 'Algorithms',
      title: 'Healthcare Workforce Optimization Engine',
      description: [
        'Developed a staff scheduling engine that considers availability, workload, certifications, and role requirements.',
        'Implemented a priority-aware scheduling algorithm to reduce conflicts and distribute workload more effectively.',
        'Automated a scheduling workflow that would otherwise require significant manual assignment effort.'
      ],
      tags: ['C++', 'Algorithms', 'Optimization'],
      github: 'https://github.com/shobhit-jajoo/nurse-routing-engine'
    }
  ];

  return (
    <section
      className="section container"
      id="projects"
      aria-labelledby="projects-title"
    >
      <div className="section-heading reveal">
        <p className="eyebrow">01 / Selected work</p>

        <h2 id="projects-title">
          Featured projects
        </h2>

        <p>
          A selection of things I have built while exploring
          mobile development, machine learning, backend systems,
          and algorithms.
        </p>
      </div>

      <div className="projects">
        {projects.map((project) => (
          <article
            className="project reveal"
            key={project.number}
          >
            <p className="project__number">
              {project.number}
            </p>

            <div className="project__body">

              <p className="project__category">
                {project.category}
              </p>

              <h3>
                {project.title}
              </h3>

              <ul style={listStyle}>
                {project.description.map((item, index) => (
                  <li key={index}>
                    {item}
                  </li>
                ))}
              </ul>

              <ul className="tag-list">
                {project.tags.map((tag) => (
                  <li key={tag}>
                    {tag}
                  </li>
                ))}
              </ul>

            </div>

            <a
              className="project__link"
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`View ${project.title} on GitHub`}
            >
              GitHub
              <span aria-hidden="true">↗</span>
            </a>

          </article>
        ))}
      </div>
    </section>
  );
}
