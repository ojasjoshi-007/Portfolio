import React, { useState, useRef, useEffect } from 'react';
import { Terminal, Send, Trash2, Bot, Sparkles, CheckCircle2, ShieldCheck } from 'lucide-react';
import { personalData, projectsData, skillsData, journeyData } from '../data/portfolioData';

// Helper to filter out any internal model thought reasoning or <think> tags
function cleanAIResponse(raw) {
  if (!raw) return '';
  let text = raw;
  // 1. Remove <think>...</think> and <thought>...</thought> tags
  text = text.replace(/<(?:think|thought)>[\s\S]*?<\/(?:think|thought)>/gi, '');
  // 2. Remove accidental thinking preambles if a reasoning model leaked thoughts
  text = text.replace(
    /^\s*(?:Okay|Hmm|Looking at my|Thinking|Thought Process|Quick mental scan|\*Quick mental scan)[\s\S]*?(?=\n\n(?:Hey|Hi|Hello|PhysiX|[#A-Z*]|Ojas|⚛️|💻|🎓|⚽|📬|I am|I'm|Sure|Welcome|Thanks|Great))/i,
    ''
  );
  return text.trim();
}

export default function DigitalTwinTerminal() {
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      content:
        "⚡ OJAS_DIGITAL_TWIN v1.0 [CS Engine]\nStatus: ONLINE • Connected to OpenRouter AI Engine\nI am Ojas Joshi's AI Digital Twin. Ask me anything about my flagship project PhysiX, my C++ and React stack, coursework at SIES GST, ARENA coordinator work, or sports and cinema!\n\nType any question or click a command below."
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const terminalScreenRef = useRef(null);

  // Scroll ONLY the internal terminal container, NEVER the browser page!
  const scrollTerminalToBottom = () => {
    if (terminalScreenRef.current) {
      terminalScreenRef.current.scrollTop = terminalScreenRef.current.scrollHeight;
    }
  };

  useEffect(() => {
    scrollTerminalToBottom();
  }, [messages, isLoading]);

  const quickCommands = [
    { label: '/physix', prompt: 'Tell me about your flagship project PhysiX and what physics principles it simulates.' },
    { label: '/skills', prompt: 'What programming languages, frameworks, and CS fundamentals do you specialize in?' },
    { label: '/journey', prompt: 'What is your background as a student at SIES GST and what are you exploring next?' },
    { label: '/sports', prompt: 'What sports and hobbies do you enjoy outside of programming?' },
    { label: '/contact', prompt: 'How can I connect with you or view your GitHub?' },
    { label: '/status', prompt: 'Give me a quick status update on what you are currently building and learning.' }
  ];

  // Dynamic offline fallback knowledge engine in case of network disconnection
  const getFallbackResponse = (query) => {
    const q = query.toLowerCase();
    if (q.includes('physix') || q.includes('physics') || q.includes('kinematics') || q.includes('projectile')) {
      return (
        "⚛️ **PhysiX — Interactive STEM Physics Laboratory** is my flagship project!\n\n" +
        "• It's an interactive 2D classical mechanics and kinematics laboratory built with React, HTML5 Canvas, and Vite.\n" +
        "• Features high-precision projectile motion simulation, planetary gravity presets (Earth, Moon, Mars, Jupiter), real-time telemetry HUD ($t, y, x, v$), vector decomposition, and ghost trails.\n" +
        "• Explore the code on GitHub: https://github.com/ojasjoshi-007/PhysiX"
      );
    }
    if (q.includes('skill') || q.includes('language') || q.includes('c++') || q.includes('stack') || q.includes('react')) {
      return (
        "💻 **My Technical Toolkit**:\n\n" +
        "• **Languages**: C++ (Primary for DSA & competitive problem solving), C (Low-level systems & memory), Python (100 Days of Code & automation), JavaScript (Modern ES6+).\n" +
        "• **Web & Canvas**: React, HTML5 Canvas (Kinematics simulations), CSS3, Vite.\n" +
        "• **Tools & Systems**: Git, GitHub, VS Code, Linux CLI & POSIX.\n" +
        "• **CS Fundamentals**: Data Structures & Algorithms, Object-Oriented Design, Discrete Math & Kinematics."
      );
    }
    if (q.includes('arena') || q.includes('college') || q.includes('sies') || q.includes('journey') || q.includes('status')) {
      return (
        "🎓 **Academics & Leadership Status**:\n\n" +
        "• Pursuing B.Tech in Computer Engineering at SIES Graduate School of Technology (University of Mumbai, Class of 2025–2029).\n" +
        "• Serving as the **Web Development Coordinator** for the ARENA SIESGST student chapter, coordinating events and web platforms.\n" +
        "• Active focus: LeetCode/DSA in C++, full-stack React architecture, and discrete mathematics."
      );
    }
    if (q.includes('sport') || q.includes('hobby') || q.includes('cinema') || q.includes('movie') || q.includes('football')) {
      return (
        "⚽ **Life Beyond The Screen**:\n\n" +
        "• **Sports**: Enthusiastic about football, badminton, swimming, and pickleball.\n" +
        "• **Cinema**: Passionate cinephile who appreciates thoughtful screenplays and cinematic storytelling.\n" +
        "• **Reading**: Technical literature, non-fiction, and computer science essays."
      );
    }
    if (q.includes('contact') || q.includes('email') || q.includes('github') || q.includes('linkedin')) {
      return (
        "📬 **Connect with Me**:\n\n" +
        `• Email: ${personalData.email}\n` +
        `• GitHub: ${personalData.socials.github}\n` +
        `• LinkedIn: ${personalData.socials.linkedin}\n` +
        `• Location: ${personalData.location}`
      );
    }
    return (
      `Hey! I'm Ojas Joshi's AI Digital Twin at SIES GST. I love C++, building software like PhysiX, solving algorithmic problems, and web engineering.\n\n` +
      `What would you like to know about my projects, stack, or journey?`
    );
  };

  const handleSendMessage = async (textToSend) => {
    const messageText = textToSend || input;
    if (!messageText.trim() || isLoading) return;

    if (messageText.trim() === '/clear') {
      setMessages([
        {
          role: 'assistant',
          content: '⚡ Terminal cleared. Digital Twin is ready for new prompts.'
        }
      ]);
      setInput('');
      return;
    }

    const updatedMessages = [...messages, { role: 'user', content: messageText }];
    setMessages(updatedMessages);
    setInput('');
    setIsLoading(true);

    const apiKey =
      import.meta.env.VITE_OPENROUTER_API_KEY ||
      import.meta.env.OPENROUTER_API_KEY ||
      '';

    const systemPrompt = `You are the authentic AI Digital Twin of Ojas Joshi, a Computer Science & Engineering undergraduate at SIES Graduate School of Technology (University of Mumbai, Class of 2025-2029).

CRITICAL OUTPUT RULE:
- Output ONLY your direct final response to the user.
- NEVER output your internal monologue, thoughts, analysis, planning, or reasoning notes.
- NEVER start with phrases like "Okay, the user...", "Looking at my persona...", or "*Quick mental scan*".
- Jump straight into your direct answer as Ojas Joshi.

Background Knowledge about Ojas:
- Role: Computer Science Student & Developer at SIES GST (Navi Mumbai / Mumbai University)
- Leadership: Web Development Coordinator @ ARENA SIESGST chapter
- Flagship Project: PhysiX (Interactive STEM Physics & 2D Kinematics Laboratory at https://github.com/ojasjoshi-007/PhysiX). Features 2D projectile motion simulation, real-time telemetry HUD, 4 planetary gravity presets (Earth, Moon, Mars, Jupiter), vector decomposition, and ghost trails.
- Core Languages & Tools: C++ (primary for DSA & algorithms), C (low-level concepts), Python (100 Days of Code), JavaScript (ES6+), React, HTML5 Canvas, Git, GitHub (ojasjoshi-007), Linux.
- Interests: Problem solving, CS fundamentals, discrete math, systems programming, and physical simulation.
- Sports & Hobbies: Football, badminton, swimming, pickleball, cinema, and reading.
- Contact: Email ojasj33@gmail.com, GitHub https://github.com/ojasjoshi-007, LinkedIn https://www.linkedin.com/in/ojasj.

Keep responses concise, friendly, authentic, and styled cleanly for a developer terminal.`;

    if (!apiKey) {
      setTimeout(() => {
        const fallback = getFallbackResponse(messageText);
        setMessages((prev) => [...prev, { role: 'assistant', content: fallback }]);
        setIsLoading(false);
      }, 400);
      return;
    }

    // Direct chat models prioritized to prevent reasoning monologues
    const candidateModels = [
      'liquid/lfm-2.5-2.6b:free',
      'minimax/minimax-m2.7:free',
      'openrouter/free'
    ];

    let success = false;

    for (const modelName of candidateModels) {
      try {
        const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${apiKey}`
          },
          body: JSON.stringify({
            model: modelName,
            messages: [
              { role: 'system', content: systemPrompt },
              ...updatedMessages
                .filter((m) => m.role === 'user' || m.role === 'assistant')
                .slice(-6)
            ],
            temperature: 0.7,
            max_tokens: 300
          })
        });

        if (response.ok) {
          const data = await response.json();
          const rawReply = data.choices?.[0]?.message?.content;
          const cleanedReply = cleanAIResponse(rawReply);
          if (cleanedReply) {
            setMessages((prev) => [...prev, { role: 'assistant', content: cleanedReply }]);
            success = true;
            break;
          }
        }
      } catch (err) {
        console.warn(`Model ${modelName} attempt failed:`, err);
      }
    }

    if (!success) {
      const fallback = getFallbackResponse(messageText);
      setMessages((prev) => [...prev, { role: 'assistant', content: fallback }]);
    }

    setIsLoading(false);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <section id="digital-twin" className="section">
      <div className="container">
        <div className="section-header">
          <div className="section-tag">
            <Bot size={14} />
            <span>AI Digital Twin</span>
          </div>
          <h2 className="section-title">Terminal Intelligence [ojas-twin]</h2>
          <p className="section-description">
            Chat with my interactive AI digital twin powered by OpenRouter. Ask any question about my journey, PhysiX, C++, algorithms, or hobbies!
          </p>
        </div>

        {/* Cyber Terminal Container */}
        <div className="terminal-chat-wrapper">
          {/* Header */}
          <div className="terminal-chat-header">
            <div className="terminal-dots">
              <span className="terminal-dot red"></span>
              <span className="terminal-dot yellow"></span>
              <span className="terminal-dot green"></span>
            </div>

            <div className="terminal-chat-title">
              <Terminal size={14} style={{ color: 'var(--accent)' }} />
              <span>ojas@digital-twin:~ (OpenRouter AI Engine • Live)</span>
            </div>

            <div className="terminal-chat-actions">
              <button
                onClick={() => setMessages([{ role: 'assistant', content: '⚡ Terminal cleared. Ready for input.' }])}
                className="terminal-clear-btn"
                title="Clear Terminal Screen"
                aria-label="Clear chat"
              >
                <Trash2 size={14} />
                <span>Clear</span>
              </button>
            </div>
          </div>

          {/* Quick Command Chips */}
          <div className="terminal-chips-bar">
            {quickCommands.map((cmd) => (
              <button
                key={cmd.label}
                onClick={() => handleSendMessage(cmd.prompt)}
                disabled={isLoading}
                className="terminal-chip-btn"
              >
                <span className="chip-cmd">{cmd.label}</span>
              </button>
            ))}
          </div>

          {/* Terminal Screen (Internal Scrolling Container Only) */}
          <div ref={terminalScreenRef} className="terminal-screen">
            {messages.map((msg, index) => (
              <div key={index} className={`terminal-msg-row ${msg.role}`}>
                <div className="msg-prefix">
                  {msg.role === 'user' ? (
                    <span className="user-prompt">guest@terminal:~$</span>
                  ) : (
                    <span className="twin-prompt">ojas_twin&gt;</span>
                  )}
                </div>
                <div className="msg-content">
                  <pre>{msg.content}</pre>
                </div>
              </div>
            ))}

            {isLoading && (
              <div className="terminal-msg-row assistant">
                <div className="msg-prefix">
                  <span className="twin-prompt">ojas_twin&gt;</span>
                </div>
                <div className="msg-content">
                  <span className="terminal-typing-cursor">▌ Synthesizing digital twin neural response...</span>
                </div>
              </div>
            )}
          </div>

          {/* Terminal Command Input Bar */}
          <div className="terminal-input-bar">
            <span className="t-prompt">$</span>
            <input
              type="text"
              placeholder="Ask anything about PhysiX, C++, coursework, or type a command..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              disabled={isLoading}
              className="terminal-text-input"
            />
            <button
              onClick={() => handleSendMessage()}
              disabled={isLoading || !input.trim()}
              className="terminal-send-btn"
              aria-label="Execute prompt"
            >
              <Send size={15} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
