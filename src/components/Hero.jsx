import React from 'react';
import { Mail, ArrowDown, Copy, Check, Terminal, ExternalLink, Sparkles } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from './Icons';
import { personalData } from '../data/portfolioData';

export default function Hero({ onCopyEmail, copied }) {
  return (
    <section id="hero" className="section hero-section">
      <div className="container">
        <div className="hero-grid">
          {/* Left Column: Text & Intro */}
          <div className="hero-content">
            <div className="hero-badge-pill">
              <Sparkles size={14} style={{ color: 'var(--accent)' }} />
              <span>
                <strong>{personalData.degree}</strong> @ {personalData.college}
              </span>
            </div>

            <h1 className="hero-title">
              Hi, I'm <span className="name-highlight">{personalData.name}</span>.
            </h1>

            <div className="hero-subtitle">
              <span>&gt;</span>
              <span>{personalData.headline}</span>
            </div>

            <p className="hero-text">{personalData.heroSummary}</p>

            <div className="hero-actions">
              <a href="#projects" className="btn btn-primary">
                View My Projects
                <ArrowDown size={16} />
              </a>

              <a href="#contact" className="btn btn-secondary">
                Get In Touch
              </a>

              <button
                onClick={onCopyEmail}
                className="btn btn-ghost"
                title="Copy email to clipboard"
                aria-label="Copy email address"
              >
                {copied ? (
                  <>
                    <Check size={16} style={{ color: 'var(--accent)' }} />
                    <span style={{ color: 'var(--accent)' }}>Email Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy size={16} />
                    <span>Copy Email</span>
                  </>
                )}
              </button>
            </div>

            <div className="hero-socials">
              <a
                href={personalData.socials.github}
                target="_blank"
                rel="noopener noreferrer"
                className="social-icon-btn"
                aria-label="GitHub Profile"
              >
                <GithubIcon size={20} />
              </a>
              <a
                href={personalData.socials.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="social-icon-btn"
                aria-label="LinkedIn Profile"
              >
                <LinkedinIcon size={20} />
              </a>
              <a
                href={personalData.socials.email}
                className="social-icon-btn"
                aria-label="Send an Email"
              >
                <Mail size={20} />
              </a>
            </div>
          </div>

          {/* Right Column: Authentic CS Student Terminal Card */}
          <div className="hero-visual">
            <div className="hero-card">
              <div className="terminal-header">
                <div className="terminal-dots">
                  <span className="terminal-dot red"></span>
                  <span className="terminal-dot yellow"></span>
                  <span className="terminal-dot green"></span>
                </div>
                <div className="terminal-title">ojas@dev-workstation:~</div>
                <Terminal size={14} style={{ color: 'var(--text-muted)' }} />
              </div>

              <div className="terminal-body">
                <div className="terminal-line">
                  <span className="t-prompt">$</span>
                  <span className="t-cmd">whoami --verbose</span>
                </div>

                <div className="terminal-output">
                  <div style={{ marginBottom: '4px' }}>
                    <span className="t-key">Name: </span>
                    <span className="t-val">Ojas Joshi</span>
                  </div>
                  <div style={{ marginBottom: '4px' }}>
                    <span className="t-key">Education: </span>
                    <span className="t-val">SIES GST ({personalData.graduationYear})</span>
                  </div>
                  <div style={{ marginBottom: '4px' }}>
                    <span className="t-key">Role: </span>
                    <span className="t-val accent">Web Dev Coordinator @ ARENA</span>
                  </div>
                  <div style={{ marginBottom: '4px' }}>
                    <span className="t-key">Languages: </span>
                    <span className="t-val string">["C++", "C", "Python", "JavaScript"]</span>
                  </div>
                  <div>
                    <span className="t-key">Interests: </span>
                    <span className="t-val string">["DSA", "Systems", "React", "Discrete Math"]</span>
                  </div>
                </div>

                <div className="terminal-line" style={{ marginTop: '12px' }}>
                  <span className="t-prompt">$</span>
                  <span className="t-cmd">cat current_status.txt</span>
                </div>

                <div style={{ color: 'var(--text-secondary)', fontSize: '0.82rem', paddingLeft: '8px' }}>
                  &gt; Building projects, solving algorithms in C++, & collaborating with the tech team.
                </div>

                <div className="terminal-status-row">
                  <span className="status-dot"></span>
                  <span>Terminal ready • Mumbai, IN</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
