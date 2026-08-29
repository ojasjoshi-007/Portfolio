import React from 'react';
import { Wrench, Code, Globe, Terminal, Binary, Sparkles } from 'lucide-react';
import { skillsData } from '../data/portfolioData';

export default function Skills() {
  const categoryIcons = {
    "Programming Languages": <Code size={20} style={{ color: 'var(--accent)' }} />,
    "Web Development": <Globe size={20} style={{ color: 'var(--accent)' }} />,
    "Tools & Systems": <Terminal size={20} style={{ color: 'var(--accent)' }} />,
    "Computer Science Fundamentals": <Binary size={20} style={{ color: 'var(--accent)' }} />
  };

  return (
    <section id="skills" className="section">
      <div className="container">
        <div className="section-header">
          <div className="section-tag">
            <Wrench size={14} />
            <span>Skills & Toolkit</span>
          </div>
          <h2 className="section-title">What I Build & Learn With</h2>
          <p className="section-description">
            Technologies and concepts I actively use in my coursework, personal projects, and competitive programming.
          </p>
        </div>

        <div className="skills-grid">
          {skillsData.categories.map((cat, idx) => (
            <div key={idx} className="skill-category-card">
              <div className="category-header">
                <div className="category-title">
                  {categoryIcons[cat.name] || <Sparkles size={18} />}
                  <span>{cat.name}</span>
                </div>
                <div className="category-desc">{cat.description}</div>
              </div>

              <div className="skill-items-list">
                {cat.skills.map((skill, sIdx) => (
                  <div key={sIdx} className="skill-item-row">
                    <div className="skill-name-col">
                      <span className="skill-name">{skill.name}</span>
                      <span className="skill-badge-text">{skill.badge}</span>
                    </div>
                    <span className="skill-level-tag">{skill.level}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
