import React, { useState } from 'react';
import {
  FolderGit2,
  ExternalLink,
  Sparkles,
  Atom,
  Activity,
  Compass,
  Layers,
  Target,
  Globe2,
  Gauge,
  CheckCircle2,
  Cpu
} from 'lucide-react';
import { GithubIcon } from './Icons';
import { projectsData } from '../data/portfolioData';

export default function Projects() {
  const project = projectsData[0]; // PhysiX spotlight
  const [selectedPlanet, setSelectedPlanet] = useState('Earth');

  const planetGravity = {
    Earth: { g: '9.80 m/s²', maxH: '31.2 m', range: '124.8 m', time: '5.04 s' },
    Moon: { g: '1.62 m/s²', maxH: '188.8 m', range: '755.2 m', time: '30.5 s' },
    Mars: { g: '3.72 m/s²', maxH: '82.2 m', range: '328.8 m', time: '13.3 s' },
    Jupiter: { g: '24.79 m/s²', maxH: '12.3 m', range: '49.3 m', time: '1.99 s' }
  };

  const featureCards = [
    {
      icon: <Gauge size={18} style={{ color: 'var(--accent)' }} />,
      title: 'Calibrated Kinematics Engine',
      desc: 'High-precision 2D projectile motion with initial velocity v₀, launch angle θ, and ground elevation offsets (h₀, d₀) calibrated at 12px = 1m.'
    },
    {
      icon: <Activity size={18} style={{ color: 'var(--accent)' }} />,
      title: 'Real-Time Telemetry HUD',
      desc: 'Floating telemetry monitor reporting flight time (t), instant altitude (y), horizontal distance (x), and magnitude velocity (v).'
    },
    {
      icon: <Compass size={18} style={{ color: 'var(--accent)' }} />,
      title: 'Dynamic Vector Decomposition',
      desc: 'Visual real-time vector arrows breaking down total velocity v (Cyan) into horizontal vx (Green) and vertical vy (Amber) components.'
    },
    {
      icon: <Globe2 size={18} style={{ color: 'var(--accent)' }} />,
      title: 'Planetary Gravity Presets',
      desc: 'Simulate classical motion across Earth (9.8m/s²), Moon (1.62m/s²), Mars (3.72m/s²), and Jupiter (24.79m/s²) with a single click.'
    },
    {
      icon: <Layers size={18} style={{ color: 'var(--accent)' }} />,
      title: 'Ghost Comparison Trails',
      desc: 'Retains previous trajectory paths with labeled launch parameters to visually compare physics under different angles and elevations.'
    },
    {
      icon: <Target size={18} style={{ color: 'var(--accent)' }} />,
      title: 'Interactive Target Challenge',
      desc: 'Interactive bullseye targets with precision collision hit detection, particle splash explosions, and score tracking.'
    }
  ];

  return (
    <section id="projects" className="section">
      <div className="container">
        <div className="section-header">
          <div className="section-tag">
            <Atom size={14} />
            <span>Featured Project Spotlight</span>
          </div>
          <h2 className="section-title">PhysiX — Interactive Physics Lab</h2>
          <p className="section-description">
            A deep dive into my flagship open-source project: an interactive Classical Mechanics and 2D Kinematics Laboratory platform.
          </p>
        </div>

        {/* Spotlight Showcase Container */}
        <div className="spotlight-card">
          {/* Top Interactive Simulation Mockup & Telemetry Preview */}
          <div className="physix-hero-banner">
            <div className="physix-viewport">
              {/* Header HUD Bar */}
              <div className="physix-top-bar">
                <div className="physix-logo-tag">
                  <Atom size={16} className="atom-spin" />
                  <span>PhysiX v1.0 • Kinematics Engine</span>
                </div>
                <div className="physix-planet-picker">
                  {Object.keys(planetGravity).map((p) => (
                    <button
                      key={p}
                      onClick={() => setSelectedPlanet(p)}
                      className={`planet-btn ${selectedPlanet === p ? 'active' : ''}`}
                    >
                      {p}
                    </button>
                  ))}
                </div>
              </div>

              {/* Trajectory Simulation Visual Canvas */}
              <div className="simulation-canvas-area">
                {/* Mathematical Grid lines */}
                <div className="sim-grid-lines"></div>

                {/* Trajectory Arc SVG */}
                <svg className="trajectory-svg" viewBox="0 0 700 200" preserveAspectRatio="none">
                  {/* Ghost comparison trail */}
                  <path
                    d="M 50 170 Q 250 20 550 170"
                    fill="none"
                    stroke="rgba(148, 163, 184, 0.25)"
                    strokeWidth="2"
                    strokeDasharray="4 4"
                  />
                  {/* Main Active Projectile Path */}
                  <path
                    d="M 50 170 Q 300 40 600 170"
                    fill="none"
                    stroke="var(--accent)"
                    strokeWidth="3.5"
                  />
                  {/* Origin Cannon & Target */}
                  <circle cx="50" cy="170" r="8" fill="#38bdf8" />
                  <circle cx="600" cy="170" r="10" fill="#ef4444" stroke="#fff" strokeWidth="2" />
                  <circle cx="600" cy="170" r="5" fill="#fff" />
                  {/* Projectile at apex */}
                  <circle cx="300" cy="40" r="6" fill="#34d399" className="pulse-circle" />
                </svg>

                {/* Live Floating Telemetry HUD */}
                <div className="telemetry-hud-card">
                  <div className="hud-header">
                    <span className="status-dot"></span>
                    <span>LIVE TELEMETRY ({selectedPlanet.toUpperCase()})</span>
                  </div>
                  <div className="hud-grid">
                    <div className="hud-item">
                      <span className="hud-lbl">Gravity (g)</span>
                      <span className="hud-val accent">{planetGravity[selectedPlanet].g}</span>
                    </div>
                    <div className="hud-item">
                      <span className="hud-lbl">Max Height (H)</span>
                      <span className="hud-val">{planetGravity[selectedPlanet].maxH}</span>
                    </div>
                    <div className="hud-item">
                      <span className="hud-lbl">Range (R)</span>
                      <span className="hud-val">{planetGravity[selectedPlanet].range}</span>
                    </div>
                    <div className="hud-item">
                      <span className="hud-lbl">Time of Flight (T)</span>
                      <span className="hud-val">{planetGravity[selectedPlanet].time}</span>
                    </div>
                  </div>
                </div>

                {/* Velocity Vector Visual Legend */}
                <div className="vector-legend">
                  <span className="vector-pill cyan">v (Total Vector)</span>
                  <span className="vector-pill green">v_x = v₀·cos(θ)</span>
                  <span className="vector-pill amber">v_y = v₀·sin(θ) - g·t</span>
                </div>
              </div>
            </div>
          </div>

          {/* Project Details Content */}
          <div className="spotlight-body">
            <div className="spotlight-meta-row">
              <span className="project-category-tag">{project.category}</span>
              <span className="spotlight-badge">Featured Undergraduate Project</span>
            </div>

            <h3 className="spotlight-title">{project.title}</h3>
            <p className="spotlight-tagline">{project.tagline}</p>
            <p className="spotlight-desc">{project.description}</p>

            {/* Core Feature Grid */}
            <h4 className="spotlight-subheading">Key Laboratory Features & Modules</h4>
            <div className="features-subgrid">
              {featureCards.map((feat, fIdx) => (
                <div key={fIdx} className="feature-module-item">
                  <div className="feat-header">
                    {feat.icon}
                    <span className="feat-title">{feat.title}</span>
                  </div>
                  <p className="feat-desc">{feat.desc}</p>
                </div>
              ))}
            </div>

            {/* Engineering Highlights */}
            <h4 className="spotlight-subheading" style={{ marginTop: '28px' }}>
              Mathematical & Engineering Takeaways
            </h4>
            <ul className="project-highlights">
              {project.highlights.map((hl, hIdx) => (
                <li key={hIdx} className="project-highlight-item">
                  <span className="highlight-bullet">▸</span>
                  <span>{hl}</span>
                </li>
              ))}
            </ul>

            {/* Tech Stack Pills */}
            <div className="spotlight-footer">
              <div className="project-tech-list">
                {project.tech.map((t, tIdx) => (
                  <span key={tIdx} className="tech-pill">
                    {t}
                  </span>
                ))}
              </div>

              {/* Action Buttons */}
              <div className="project-actions">
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-primary"
                >
                  <GithubIcon size={18} />
                  <span>View PhysiX on GitHub</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
