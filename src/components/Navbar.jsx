import React, { useState, useEffect } from 'react';
import { Menu, X, Terminal, ArrowUpRight } from 'lucide-react';
import { personalData } from '../data/portfolioData';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);

      const sections = ['hero', 'about', 'skills', 'projects', 'journey', 'contact'];
      const scrollPosition = window.scrollY + 100;

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { label: 'About', href: '#about', id: 'about' },
    { label: 'Skills', href: '#skills', id: 'skills' },
    { label: 'Projects', href: '#projects', id: 'projects' },
    { label: 'Journey', href: '#journey', id: 'journey' },
    { label: 'Contact', href: '#contact', id: 'contact' },
  ];

  return (
    <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
      <div className="container nav-container">
        <a href="#hero" className="nav-logo" aria-label="Go to top">
          <span className="nav-logo-badge">OJ</span>
          <span>{personalData.name}</span>
        </a>

        {/* Desktop Navigation */}
        <ul className="nav-links">
          {navItems.map((item) => (
            <li key={item.id}>
              <a
                href={item.href}
                className={`nav-link ${activeSection === item.id ? 'active' : ''}`}
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>

        {/* Status indicator */}
        <div className="nav-status">
          <span className="status-dot"></span>
          <span>{personalData.status}</span>
        </div>

        {/* Mobile menu toggle button */}
        <button
          className="mobile-menu-btn"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle Navigation Menu"
        >
          {isOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {isOpen && (
        <div className="mobile-drawer">
          {navItems.map((item) => (
            <a
              key={item.id}
              href={item.href}
              className="mobile-nav-link"
              onClick={() => setIsOpen(false)}
            >
              {item.label}
            </a>
          ))}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', paddingTop: '8px' }}>
            <span className="status-dot"></span>
            <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
              {personalData.status}
            </span>
          </div>
        </div>
      )}
    </nav>
  );
}
