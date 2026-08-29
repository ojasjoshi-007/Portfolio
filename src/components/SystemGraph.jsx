import React, { useState } from 'react';
import { Network, Activity, Cpu, Atom, Code2, Globe, Terminal, Sparkles, Layers, ArrowUpRight, Zap } from 'lucide-react';
import { systemTopology } from '../data/portfolioData';

export default function SystemGraph() {
  const [selectedNode, setSelectedNode] = useState(systemTopology.nodes[0]); // default to Core
  const [hoveredNode, setHoveredNode] = useState(null);

  const nodeIcons = {
    core: <Cpu size={18} />,
    physix: <Atom size={18} />,
    algorithms: <Code2 size={18} />,
    web: <Globe size={18} />,
    math: <Zap size={18} />,
    systems: <Terminal size={18} />,
    human: <Activity size={18} />
  };

  // Node positions on a responsive 600x360 coordinates space
  const positions = {
    core: { x: 300, y: 170 },
    physix: { x: 490, y: 90 },
    algorithms: { x: 130, y: 80 },
    web: { x: 480, y: 250 },
    math: { x: 340, y: 50 },
    systems: { x: 140, y: 240 },
    human: { x: 300, y: 310 }
  };

  const isConnected = (nodeId) => {
    if (!selectedNode && !hoveredNode) return false;
    const target = hoveredNode || selectedNode;
    if (target.id === nodeId) return true;
    return systemTopology.links.some(
      (l) => (l.source === target.id && l.target === nodeId) || (l.target === target.id && l.source === nodeId)
    );
  };

  return (
    <section id="system-graph" className="section">
      <div className="container">
        <div className="section-header">
          <div className="section-tag">
            <Network size={14} />
            <span>Digital Twin Topology</span>
          </div>
          <h2 className="section-title">Living System Map</h2>
          <p className="section-description">
            Explore my skills, projects, and coursework as interconnected nodes of a living computational engine with <strong>PhysiX</strong> at the simulation core.
          </p>
        </div>

        {/* System Topology Canvas & Inspector Box */}
        <div className="topology-card">
          {/* Top Bar with System Telemetry status */}
          <div className="topology-header">
            <div className="topology-status">
              <span className="status-dot"></span>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.82rem', fontWeight: 600, color: 'var(--text-primary)' }}>
                SYSTEM_TOPOLOGY::ACTIVE_NODES: {systemTopology.nodes.length}
              </span>
            </div>
            <div className="topology-tip">
              <span>Click or hover any node to inspect subsystem telemetry</span>
            </div>
          </div>

          <div className="topology-workspace">
            {/* Interactive SVG Network Graph */}
            <div className="topology-svg-wrapper">
              <svg className="topology-svg" viewBox="0 0 600 360">
                {/* Background grid */}
                <defs>
                  <radialGradient id="nodeGlow" cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stopColor="var(--accent)" stopOpacity="0.3" />
                    <stop offset="100%" stopColor="transparent" stopOpacity="0" />
                  </radialGradient>
                </defs>

                {/* Connecting Links */}
                {systemTopology.links.map((link, idx) => {
                  const p1 = positions[link.source];
                  const p2 = positions[link.target];
                  const active =
                    (selectedNode && (selectedNode.id === link.source || selectedNode.id === link.target)) ||
                    (hoveredNode && (hoveredNode.id === link.source || hoveredNode.id === link.target));

                  return (
                    <g key={idx}>
                      <line
                        x1={p1.x}
                        y1={p1.y}
                        x2={p2.x}
                        y2={p2.y}
                        stroke={active ? 'var(--accent)' : 'var(--border-card-hover)'}
                        strokeWidth={active ? 2.2 : 1.2}
                        strokeDasharray={link.source === 'math' ? '4 4' : 'none'}
                        className={active ? 'active-pulse-line' : ''}
                      />
                    </g>
                  );
                })}

                {/* Nodes */}
                {systemTopology.nodes.map((node) => {
                  const pos = positions[node.id];
                  const isSelected = selectedNode?.id === node.id;
                  const isHovered = hoveredNode?.id === node.id;
                  const connected = isConnected(node.id);

                  return (
                    <g
                      key={node.id}
                      className="graph-node-group"
                      onClick={() => setSelectedNode(node)}
                      onMouseEnter={() => setHoveredNode(node)}
                      onMouseLeave={() => setHoveredNode(null)}
                      style={{ cursor: 'pointer' }}
                    >
                      {/* Outer pulse aura if selected */}
                      {isSelected && (
                        <circle
                          cx={pos.x}
                          cy={pos.y}
                          r={node.size / 2 + 12}
                          fill="none"
                          stroke={node.color}
                          strokeWidth="1.5"
                          opacity="0.6"
                          className="pulse-aura"
                        />
                      )}

                      {/* Main Node Circle */}
                      <circle
                        cx={pos.x}
                        cy={pos.y}
                        r={node.size / 2}
                        fill="#0b1220"
                        stroke={isSelected || isHovered ? node.color : connected ? 'var(--text-secondary)' : 'var(--border-card)'}
                        strokeWidth={isSelected || isHovered ? 2.5 : 1.5}
                        filter={isSelected ? 'drop-shadow(0 0 10px rgba(16, 185, 129, 0.4))' : 'none'}
                      />

                      {/* Node Center Dot */}
                      <circle
                        cx={pos.x}
                        cy={pos.y}
                        r={node.id === 'core' ? 6 : 4}
                        fill={node.color}
                      />

                      {/* Node Label */}
                      <text
                        x={pos.x}
                        y={pos.y + node.size / 2 + 16}
                        textAnchor="middle"
                        fill={isSelected ? '#f8fafc' : 'var(--text-secondary)'}
                        fontSize={node.id === 'core' ? 12 : 11}
                        fontWeight={isSelected ? 700 : 500}
                        fontFamily="var(--font-mono)"
                      >
                        {node.name.split(' ')[0]}
                      </text>
                    </g>
                  );
                })}
              </svg>
            </div>

            {/* Subsystem Telemetry Inspector Panel */}
            <div className="node-inspector-panel">
              <div className="inspector-badge-row">
                <span
                  className="inspector-badge"
                  style={{
                    color: selectedNode.color,
                    borderColor: `${selectedNode.color}40`,
                    background: `${selectedNode.color}15`
                  }}
                >
                  {selectedNode.category}
                </span>
                <span className="inspector-id">ID: #{selectedNode.id.toUpperCase()}</span>
              </div>

              <h3 className="inspector-title" style={{ color: selectedNode.color }}>
                {selectedNode.name}
              </h3>

              <p className="inspector-summary">{selectedNode.summary}</p>

              <div className="inspector-telemetry-box">
                <div className="telemetry-label">ACTIVE TELEMETRY STREAM</div>
                <div className="telemetry-value">{selectedNode.metrics}</div>
              </div>

              {/* Interconnected links for this node */}
              <div className="inspector-connections">
                <div className="telemetry-label">INTERCONNECTED SUBSYSTEMS</div>
                <div className="connections-pills">
                  {systemTopology.links
                    .filter((l) => l.source === selectedNode.id || l.target === selectedNode.id)
                    .map((l, i) => {
                      const otherId = l.source === selectedNode.id ? l.target : l.source;
                      const otherNode = systemTopology.nodes.find((n) => n.id === otherId);
                      return (
                        <button
                          key={i}
                          onClick={() => setSelectedNode(otherNode)}
                          className="connection-pill-btn"
                          title={l.label}
                        >
                          <span style={{ color: otherNode?.color }}>•</span>
                          <span>{otherNode?.name.split(' ')[0]}</span>
                          <span className="pill-relation">({l.label})</span>
                        </button>
                      );
                    })}
                </div>
              </div>

              {/* Action trigger based on selected node */}
              {selectedNode.id === 'physix' && (
                <a href="#projects" className="btn btn-primary" style={{ width: '100%', marginTop: '16px', fontSize: '0.85rem' }}>
                  <Atom size={16} />
                  <span>Launch PhysiX Simulation Lab</span>
                </a>
              )}
              {selectedNode.id === 'algorithms' && (
                <a href="#skills" className="btn btn-secondary" style={{ width: '100%', marginTop: '16px', fontSize: '0.85rem' }}>
                  <Code2 size={16} />
                  <span>Inspect DSA & C++ Toolkit</span>
                </a>
              )}
              {selectedNode.id === 'web' && (
                <a href="#journey" className="btn btn-secondary" style={{ width: '100%', marginTop: '16px', fontSize: '0.85rem' }}>
                  <Globe size={16} />
                  <span>View ARENA Chapter Work</span>
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
