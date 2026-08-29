import React from 'react';
import { Code2, Layout, Cpu, Terminal, Activity, BookOpen, Film, GraduationCap, Compass } from 'lucide-react';
import { personalData } from '../data/portfolioData';

export default function About() {
  const iconMap = {
    Code2: <Code2 size={20} className="hobby-icon" />,
    Layout: <Layout size={20} className="hobby-icon" />,
    Cpu: <Cpu size={20} className="hobby-icon" />,
    Terminal: <Terminal size={20} className="hobby-icon" />,
    Activity: <Activity size={20} className="hobby-icon" />,
    BookOpen: <BookOpen size={20} className="hobby-icon" />,
    Film: <Film size={20} className="hobby-icon" />
  };

  return (
    <section id="about" className="section">
      <div className="container">
        <div className="section-header">
          <div className="section-tag">
            <Compass size={14} />
            <span>About Me</span>
          </div>
          <h2 className="section-title">Behind the Code</h2>
          <p className="section-description">
            A genuine look at my background as a Computer Science student, what drives my curiosity, and what I do when I step away from the keyboard.
          </p>
        </div>

        <div className="about-grid">
          {/* Main narrative & Pillars */}
          <div className="about-text-card">
            {personalData.aboutText.map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}

            <h3 style={{ fontSize: '1.15rem', fontWeight: 700, color: 'var(--text-primary)', marginTop: '12px' }}>
              What Excites Me Most
            </h3>

            <div className="about-pillars">
              {personalData.interests.map((pillar, idx) => (
                <div key={idx} className="pillar-item">
                  <div className="pillar-title">
                    {iconMap[pillar.icon] || <Code2 size={16} />}
                    <span>{pillar.title}</span>
                  </div>
                  <div className="pillar-desc">{pillar.desc}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Education & Hobbies */}
          <div className="about-side-cards">
            {/* Education Card */}
            <div className="edu-badge-card">
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px', color: 'var(--accent)' }}>
                <GraduationCap size={20} />
                <span style={{ fontSize: '0.85rem', fontWeight: 600, fontFamily: 'var(--font-mono)' }}>EDUCATION</span>
              </div>
              <div className="edu-university">{personalData.college}</div>
              <div className="edu-degree">{personalData.degree}</div>
              <div className="edu-year">{personalData.university} • Class of {personalData.graduationYear}</div>
            </div>

            {/* Beyond Code / Hobbies */}
            <div className="side-card">
              <div className="side-card-title">
                <span>Beyond The Screen</span>
              </div>
              <div className="hobby-list">
                {personalData.hobbies.map((hobby, idx) => (
                  <div key={idx} className="hobby-item">
                    <div className="hobby-icon">
                      {iconMap[hobby.icon] || <Activity size={18} />}
                    </div>
                    <div>
                      <div className="hobby-name">{hobby.name}</div>
                      <div className="hobby-detail">{hobby.detail}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
