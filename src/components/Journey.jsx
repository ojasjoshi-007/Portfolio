import React from 'react';
import { Route, Sparkles, BookOpenCheck, Flame, Compass } from 'lucide-react';
import { journeyData } from '../data/portfolioData';

export default function Journey() {
  return (
    <section id="journey" className="section">
      <div className="container">
        <div className="section-header">
          <div className="section-tag">
            <Route size={14} />
            <span>Journey & Growth</span>
          </div>
          <h2 className="section-title">Where I've Been & What I'm Learning</h2>
          <p className="section-description">
            A transparent view of my progression as a Computer Science undergraduate, the milestones I've hit, and the topics I'm currently studying.
          </p>
        </div>

        <div className="journey-grid">
          {/* Left Column: Milestones Timeline */}
          <div>
            <h3 style={{ fontSize: '1.2rem', fontWeight: 700, marginBottom: '24px', color: 'var(--text-primary)' }}>
              Milestones & Leadership
            </h3>
            <div className="timeline-list">
              {journeyData.milestones.map((item, idx) => (
                <div key={idx} className="timeline-item">
                  <div className="timeline-period">{item.period}</div>
                  <h4 className="timeline-title">{item.title}</h4>
                  <div className="timeline-org">{item.organization}</div>
                  <span className="timeline-badge">{item.badge}</span>
                  <p className="timeline-desc">{item.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Current Focus & What I'm Digging Into */}
          <div>
            <div className="focus-card">
              <div className="focus-card-header">
                <div className="focus-card-title">
                  <Flame size={20} style={{ color: 'var(--accent)' }} />
                  <span>Current Learning Focus</span>
                </div>
                <div className="focus-card-desc">
                  Topics I am actively diving into every week alongside my coursework.
                </div>
              </div>

              <div className="focus-list">
                {journeyData.currentFocus.map((focus, idx) => (
                  <div key={idx} className="focus-item">
                    <div className="focus-item-top">
                      <span className="focus-topic">{focus.topic}</span>
                      <span className="focus-status-badge">{focus.status}</span>
                    </div>
                    <p className="focus-notes">{focus.notes}</p>
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
