import React, { useState, useEffect, useRef } from 'react';
import {
  Atom,
  Play,
  RotateCcw,
  Gauge,
  Activity,
  Compass,
  Layers,
  Target,
  Globe2,
  Sparkles,
  Zap,
  Sliders,
  ExternalLink
} from 'lucide-react';
import { GithubIcon } from './Icons';
import { projectsData } from '../data/portfolioData';

export default function Projects() {
  const project = projectsData[0]; // PhysiX
  const canvasRef = useRef(null);

  // Simulation parameters
  const [angle, setAngle] = useState(45); // degrees
  const [velocity, setVelocity] = useState(38); // m/s
  const [elevation, setElevation] = useState(10); // m
  const [planet, setPlanet] = useState('Earth');
  const [isSimulating, setIsSimulating] = useState(false);
  const [ghostTrails, setGhostTrails] = useState([]);
  const [currentTelemetry, setCurrentTelemetry] = useState({
    time: 0,
    x: 0,
    y: 0,
    speed: 0
  });

  const planetGravities = {
    Earth: 9.8,
    Moon: 1.62,
    Mars: 3.72,
    Jupiter: 24.79
  };

  const g = planetGravities[planet];

  // Theoretical physics calculations
  const rad = (angle * Math.PI) / 180;
  const vx0 = velocity * Math.cos(rad);
  const vy0 = velocity * Math.sin(rad);

  const timeOfFlight = (vy0 + Math.sqrt(vy0 * vy0 + 2 * g * elevation)) / g;
  const maxRange = vx0 * timeOfFlight;
  const maxHeight = elevation + (vy0 * vy0) / (2 * g);

  // Canvas drawing & animation loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationFrameId;
    let startTime = null;

    // Fixed canvas coordinates
    const scale = 2.4; // pixels per meter
    const originX = 60;
    const groundY = canvas.height - 40;

    const render = (timestamp) => {
      // Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw mathematical coordinate grid
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.04)';
      ctx.lineWidth = 1;
      for (let x = 0; x < canvas.width; x += 30) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
        ctx.stroke();
      }
      for (let y = 0; y < canvas.height; y += 30) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
        ctx.stroke();
      }

      // Draw Ground plane
      ctx.strokeStyle = 'rgba(148, 163, 184, 0.3)';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(0, groundY);
      ctx.lineTo(canvas.width, groundY);
      ctx.stroke();

      // Draw Elevation Cliff / Launch Stand
      const startPixelY = groundY - elevation * scale;
      ctx.fillStyle = '#1e293b';
      ctx.fillRect(originX - 30, startPixelY, 30, elevation * scale);
      ctx.strokeStyle = 'rgba(16, 185, 129, 0.4)';
      ctx.strokeRect(originX - 30, startPixelY, 30, elevation * scale);

      // Draw Ghost Trails
      ghostTrails.forEach((trail) => {
        ctx.strokeStyle = 'rgba(148, 163, 184, 0.15)';
        ctx.lineWidth = 1.5;
        ctx.setLineDash([4, 4]);
        ctx.beginPath();
        trail.forEach((pt, i) => {
          const px = originX + pt.x * scale;
          const py = groundY - pt.y * scale;
          if (i === 0) ctx.moveTo(px, py);
          else ctx.lineTo(px, py);
        });
        ctx.stroke();
        ctx.setLineDash([]);
      });

      // Draw Current Parabolic Trajectory Line
      ctx.strokeStyle = isSimulating ? 'var(--accent)' : 'rgba(16, 185, 129, 0.4)';
      ctx.lineWidth = 2.5;
      ctx.beginPath();
      const steps = 100;
      for (let i = 0; i <= steps; i++) {
        const t = (i / steps) * timeOfFlight;
        const x = vx0 * t;
        const y = elevation + vy0 * t - 0.5 * g * t * t;
        const px = originX + x * scale;
        const py = groundY - Math.max(0, y) * scale;
        if (i === 0) ctx.moveTo(px, py);
        else ctx.lineTo(px, py);
      }
      ctx.stroke();

      // Handle Live Simulation Animation
      if (isSimulating) {
        if (!startTime) startTime = timestamp;
        const elapsed = (timestamp - startTime) / 1000 * 1.5; // playback speed factor
        const simTime = Math.min(elapsed, timeOfFlight);

        const currentX = vx0 * simTime;
        const currentY = Math.max(0, elevation + vy0 * simTime - 0.5 * g * simTime * simTime);
        const currentVx = vx0;
        const currentVy = vy0 - g * simTime;
        const speed = Math.sqrt(currentVx * currentVx + currentVy * currentVy);

        setCurrentTelemetry({
          time: simTime.toFixed(2),
          x: currentX.toFixed(1),
          y: currentY.toFixed(1),
          speed: speed.toFixed(1)
        });

        const projPixelX = originX + currentX * scale;
        const projPixelY = groundY - currentY * scale;

        // Draw Projectile Ball
        ctx.fillStyle = '#34d399';
        ctx.shadowColor = 'rgba(16, 185, 129, 0.8)';
        ctx.shadowBlur = 10;
        ctx.beginPath();
        ctx.arc(projPixelX, projPixelY, 6, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0;

        // Dynamic Velocity Vectors on Projectile
        // Total Vector (Cyan)
        ctx.strokeStyle = '#38bdf8';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(projPixelX, projPixelY);
        ctx.lineTo(projPixelX + currentVx * 0.8, projPixelY - currentVy * 0.8);
        ctx.stroke();

        // Horizontal Vector (Green)
        ctx.strokeStyle = '#34d399';
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.moveTo(projPixelX, projPixelY);
        ctx.lineTo(projPixelX + currentVx * 0.8, projPixelY);
        ctx.stroke();

        // Vertical Vector (Amber)
        ctx.strokeStyle = '#fbbf24';
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.moveTo(projPixelX, projPixelY);
        ctx.lineTo(projPixelX, projPixelY - currentVy * 0.8);
        ctx.stroke();

        if (elapsed >= timeOfFlight) {
          setIsSimulating(false);
          // Save trail to ghost list
          const completedTrail = [];
          for (let i = 0; i <= 60; i++) {
            const t = (i / 60) * timeOfFlight;
            completedTrail.push({
              x: vx0 * t,
              y: Math.max(0, elevation + vy0 * t - 0.5 * g * t * t)
            });
          }
          setGhostTrails((prev) => [...prev.slice(-3), completedTrail]);
        } else {
          animationFrameId = requestAnimationFrame(render);
        }
      } else {
        // Draw Static Launcher Cannon
        ctx.fillStyle = '#38bdf8';
        ctx.beginPath();
        ctx.arc(originX, startPixelY, 7, 0, Math.PI * 2);
        ctx.fill();
      }
    };

    render(performance.now());
    return () => cancelAnimationFrame(animationFrameId);
  }, [angle, velocity, elevation, planet, isSimulating]);

  const handleLaunch = () => {
    setIsSimulating(false);
    setTimeout(() => {
      setIsSimulating(true);
    }, 50);
  };

  const handleResetTrails = () => {
    setGhostTrails([]);
    setIsSimulating(false);
    setCurrentTelemetry({ time: 0, x: 0, y: 0, speed: 0 });
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
            <span>Flagship Project Core</span>
          </div>
          <h2 className="section-title">PhysiX — Interactive STEM Physics Lab</h2>
          <p className="section-description">
            The centerpiece of my portfolio: a high-precision 2D Classical Mechanics and Kinematics Laboratory platform. Try the live interactive physics engine below!
          </p>
        </div>

        {/* Live Interactive Physics Lab Box */}
        <div className="spotlight-card">
          <div className="physix-hero-banner">
            <div className="physix-viewport">
              {/* Top Controls Bar */}
              <div className="physix-top-bar">
                <div className="physix-logo-tag">
                  <Atom size={18} className="atom-spin" />
                  <span>PhysiX v1.0 • Kinematics Simulation Core</span>
                </div>

                <div className="physix-planet-picker">
                  {Object.keys(planetGravities).map((p) => (
                    <button
                      key={p}
                      onClick={() => setPlanet(p)}
                      className={`planet-btn ${planet === p ? 'active' : ''}`}
                    >
                      {p} ({planetGravities[p]} m/s²)
                    </button>
                  ))}
                </div>
              </div>

              {/* Simulation Canvas Viewport */}
              <div className="simulation-canvas-area" style={{ height: '300px', position: 'relative' }}>
                <canvas
                  ref={canvasRef}
                  width={720}
                  height={300}
                  style={{ width: '100%', height: '100%', display: 'block' }}
                />

                {/* Floating Real-Time Telemetry HUD */}
                <div className="telemetry-hud-card">
                  <div className="hud-header">
                    <span className="status-dot"></span>
                    <span>{isSimulating ? 'SIMULATION IN FLIGHT' : `CALCULATED SPECS (${planet.toUpperCase()})`}</span>
                  </div>
                  <div className="hud-grid">
                    <div className="hud-item">
                      <span className="hud-lbl">Time of Flight (T)</span>
                      <span className="hud-val accent">
                        {isSimulating ? `${currentTelemetry.time} s` : `${timeOfFlight.toFixed(2)} s`}
                      </span>
                    </div>
                    <div className="hud-item">
                      <span className="hud-lbl">Max Altitude (H)</span>
                      <span className="hud-val">
                        {isSimulating ? `${currentTelemetry.y} m` : `${maxHeight.toFixed(1)} m`}
                      </span>
                    </div>
                    <div className="hud-item">
                      <span className="hud-lbl">Range Distance (R)</span>
                      <span className="hud-val">
                        {isSimulating ? `${currentTelemetry.x} m` : `${maxRange.toFixed(1)} m`}
                      </span>
                    </div>
                    <div className="hud-item">
                      <span className="hud-lbl">Velocity |v|</span>
                      <span className="hud-val accent">
                        {isSimulating ? `${currentTelemetry.speed} m/s` : `${velocity} m/s`}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Dynamic Vector Decomposition Legend */}
                <div className="vector-legend">
                  <span className="vector-pill cyan">v (Velocity)</span>
                  <span className="vector-pill green">v_x = {vx0.toFixed(1)} m/s</span>
                  <span className="vector-pill amber">v_y0 = {vy0.toFixed(1)} m/s</span>
                </div>
              </div>

              {/* Interactive Parameter Control Sliders */}
              <div className="simulation-controls-row">
                <div className="slider-control-group">
                  <div className="slider-label-row">
                    <span className="slider-title">Launch Angle (θ)</span>
                    <span className="slider-value">{angle}°</span>
                  </div>
                  <input
                    type="range"
                    min="15"
                    max="85"
                    value={angle}
                    onChange={(e) => setAngle(Number(e.target.value))}
                    className="physix-range-slider"
                  />
                </div>

                <div className="slider-control-group">
                  <div className="slider-label-row">
                    <span className="slider-title">Initial Velocity (v₀)</span>
                    <span className="slider-value">{velocity} m/s</span>
                  </div>
                  <input
                    type="range"
                    min="10"
                    max="65"
                    value={velocity}
                    onChange={(e) => setVelocity(Number(e.target.value))}
                    className="physix-range-slider"
                  />
                </div>

                <div className="slider-control-group">
                  <div className="slider-label-row">
                    <span className="slider-title">Elevation Offset (h₀)</span>
                    <span className="slider-value">{elevation} m</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="35"
                    value={elevation}
                    onChange={(e) => setElevation(Number(e.target.value))}
                    className="physix-range-slider"
                  />
                </div>

                {/* Action Buttons */}
                <div className="sim-buttons-group">
                  <button onClick={handleLaunch} className="btn btn-primary" style={{ padding: '10px 18px' }}>
                    <Play size={16} />
                    <span>{isSimulating ? 'Re-Launch' : 'Fire Cannon'}</span>
                  </button>
                  <button onClick={handleResetTrails} className="btn btn-secondary" style={{ padding: '10px 14px' }} title="Reset comparison trails">
                    <RotateCcw size={16} />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Project Details Content */}
          <div className="spotlight-body">
            <div className="spotlight-meta-row">
              <span className="project-category-tag">{project.category}</span>
              <span className="spotlight-badge">Undergraduate Flagship</span>
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
              Mathematical & Architectural Highlights
            </h4>
            <ul className="project-highlights">
              {project.highlights.map((hl, hIdx) => (
                <li key={hIdx} className="project-highlight-item">
                  <span className="highlight-bullet">▸</span>
                  <span>{hl}</span>
                </li>
              ))}
            </ul>

            {/* Tech Stack Pills & Action Link */}
            <div className="spotlight-footer">
              <div className="project-tech-list">
                {project.tech.map((t, tIdx) => (
                  <span key={tIdx} className="tech-pill">
                    {t}
                  </span>
                ))}
              </div>

              <div className="project-actions">
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-primary"
                >
                  <GithubIcon size={18} />
                  <span>View PhysiX on GitHub (ojasjoshi-007/PhysiX)</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
