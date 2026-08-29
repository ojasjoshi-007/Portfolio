import React from 'react';
import { ArrowUp, Heart, Code2 } from 'lucide-react';
import { personalData } from '../data/portfolioData';

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="footer">
      <div className="container footer-content">
        <div className="footer-text">
          Designed & built with curiosity by <strong>{personalData.name}</strong> •{' '}
          <span>{personalData.degree}</span> @ {personalData.college}
        </div>

        <div className="footer-links">
          <a
            href={personalData.socials.github}
            target="_blank"
            rel="noopener noreferrer"
            style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}
          >
            GitHub
          </a>
          <a
            href={personalData.socials.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}
          >
            LinkedIn
          </a>
          <button onClick={scrollToTop} className="back-to-top-btn" aria-label="Back to Top">
            <span>Back to top</span>
            <ArrowUp size={14} />
          </button>
        </div>
      </div>
    </footer>
  );
}
