import React, { useState } from 'react';
import { Mail, Send, Copy, Check, MessageSquare, MapPin } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from './Icons';
import { personalData } from '../data/portfolioData';

export default function Contact({ onCopyEmail, copied }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [sent, setSent] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.message) return;
    
    // Construct mailto
    const subject = encodeURIComponent(`Portfolio Message from ${formData.name}`);
    const body = encodeURIComponent(
      `Hi Ojas,\n\n${formData.message}\n\nFrom: ${formData.name} (${formData.email})`
    );
    window.location.href = `mailto:${personalData.email}?subject=${subject}&body=${body}`;
    setSent(true);
    setTimeout(() => setSent(false), 5000);
  };

  return (
    <section id="contact" className="section">
      <div className="container">
        <div className="contact-card-wrapper">
          <div className="contact-grid">
            {/* Left: Contact Info */}
            <div className="contact-info">
              <div className="section-tag" style={{ marginBottom: '16px' }}>
                <MessageSquare size={14} />
                <span>Contact & Connect</span>
              </div>

              <h2 className="contact-info-title">Let's build something together.</h2>
              <p className="contact-info-text">
                Whether you want to discuss a project, talk about algorithms or mathematics, collaborate on an open-source tool, or just say hello — my inbox is always open!
              </p>

              <div className="contact-details-list">
                {/* Email Item */}
                <div className="contact-detail-item">
                  <div className="contact-icon-box">
                    <Mail size={20} />
                  </div>
                  <div style={{ flexGrow: 1 }}>
                    <div className="contact-detail-label">Email</div>
                    <div className="contact-detail-value">{personalData.email}</div>
                  </div>
                  <button
                    onClick={onCopyEmail}
                    className="btn btn-ghost"
                    style={{ padding: '6px 10px', fontSize: '0.82rem' }}
                    title="Copy Email"
                  >
                    {copied ? <Check size={16} style={{ color: 'var(--accent)' }} /> : <Copy size={16} />}
                  </button>
                </div>

                {/* LinkedIn Item */}
                <a
                  href={personalData.socials.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="contact-detail-item"
                >
                  <div className="contact-icon-box">
                    <LinkedinIcon size={20} />
                  </div>
                  <div>
                    <div className="contact-detail-label">LinkedIn</div>
                    <div className="contact-detail-value">linkedin.com/in/ojasj</div>
                  </div>
                </a>

                {/* GitHub Item */}
                <a
                  href={personalData.socials.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="contact-detail-item"
                >
                  <div className="contact-icon-box">
                    <GithubIcon size={20} />
                  </div>
                  <div>
                    <div className="contact-detail-label">GitHub</div>
                    <div className="contact-detail-value">github.com/ojasjoshi-007</div>
                  </div>
                </a>

                {/* Location */}
                <div className="contact-detail-item">
                  <div className="contact-icon-box">
                    <MapPin size={20} />
                  </div>
                  <div>
                    <div className="contact-detail-label">Location</div>
                    <div className="contact-detail-value">{personalData.location}</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right: Quick Direct Message Form */}
            <div className="contact-interactive-box">
              <h3 style={{ fontSize: '1.2rem', fontWeight: 700, color: 'var(--text-primary)' }}>
                Send a Quick Message
              </h3>

              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <div className="form-group">
                  <label htmlFor="name" className="form-label">Your Name</label>
                  <input
                    id="name"
                    type="text"
                    required
                    placeholder="e.g. Alex"
                    className="form-input"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="email" className="form-label">Your Email</label>
                  <input
                    id="email"
                    type="email"
                    required
                    placeholder="alex@example.com"
                    className="form-input"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="message" className="form-label">Message</label>
                  <textarea
                    id="message"
                    required
                    placeholder="What would you like to discuss or collaborate on?"
                    className="form-textarea"
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  />
                </div>

                <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>
                  <Send size={16} />
                  <span>Send Message via Email</span>
                </button>

                {sent && (
                  <div style={{ color: 'var(--accent)', fontSize: '0.85rem', textAlign: 'center' }}>
                    Opening your email client... Looking forward to connecting!
                  </div>
                )}
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
