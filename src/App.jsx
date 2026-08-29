import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Journey from './components/Journey';
import Contact from './components/Contact';
import Footer from './components/Footer';
import { personalData } from './data/portfolioData';
import { CheckCircle2 } from 'lucide-react';

export default function App() {
  const [copied, setCopied] = useState(false);
  const [showToast, setShowToast] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(personalData.email);
    setCopied(true);
    setShowToast(true);

    setTimeout(() => {
      setCopied(false);
    }, 3000);

    setTimeout(() => {
      setShowToast(false);
    }, 4000);
  };

  return (
    <div className="app">
      {/* Background Dot Pattern */}
      <div className="bg-grid-overlay"></div>

      {/* Navigation Header */}
      <Navbar />

      {/* Main Content Sections */}
      <main>
        <Hero onCopyEmail={handleCopyEmail} copied={copied} />
        <About />
        <Skills />
        <Projects />
        <Journey />
        <Contact onCopyEmail={handleCopyEmail} copied={copied} />
      </main>

      {/* Footer */}
      <Footer />

      {/* Toast Notification */}
      {showToast && (
        <div className="toast-container" role="status" aria-live="polite">
          <CheckCircle2 size={18} style={{ color: 'var(--accent)' }} />
          <span>Email <strong>{personalData.email}</strong> copied to clipboard!</span>
        </div>
      )}
    </div>
  );
}
