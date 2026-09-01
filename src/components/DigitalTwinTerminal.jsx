import React, { useState, useRef, useEffect } from 'react';
import { Terminal, Send, Trash2, Bot, Sparkles, CheckCircle2, ShieldCheck, RefreshCw } from 'lucide-react';
import { personalData, projectsData, skillsData, journeyData } from '../data/portfolioData';

// Helper to filter out any internal model thought reasoning or <think> tags
function cleanAIResponse(raw) {
  if (!raw) return '';
  let text = typeof raw === 'string' ? raw : String(raw);
  // 1. Remove closed <think>...</think> and <thought>...</thought> tags
  text = text.replace(/<(?:think|thought)>[\s\S]*?<\/(?:think|thought)>/gi, '');
  // 2. Remove unclosed thinking tags if truncated
  text = text.replace(/<(?:think|thought)>[\s\S]*$/gi, '');
  // 3. Remove accidental thinking preambles if a reasoning model leaked thoughts
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
        "⚡ OJAS_DIGITAL_TWIN v1.0 [CS Engine]\nStatus: ONLINE • Connected to OpenRouter Multi-Model AI Engine\nI am Ojas Joshi's AI Digital Twin. As a Computer Engineering student at SIES GST, ask me anything about my flagship project PhysiX, my C++ and React stack, coursework, ARENA coordinator work, or sports and cinema!\n\nType any question or click a command below."
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
    { label: '/student', prompt: "I'm a Computer Engineering student too! What is your background at SIES GST and what are you exploring?" },
    { label: '/arena', prompt: 'What is your role as Web Development Coordinator for ARENA SIESGST?' },
    { label: '/sports', prompt: 'What sports and hobbies do you enjoy outside of programming?' },
    { label: '/contact', prompt: 'How can I connect with you or view your GitHub?' }
  ];

  // Dynamic offline fallback knowledge engine in case of network disconnection
  const getFallbackResponse = (query) => {
    const q = query.toLowerCase();

    // 1. Fellow student / Computer Engineering / SIES GST / academics
    if (
      q.includes('student') ||
      q.includes('computer engineering') ||
      q.includes('college') ||
      q.includes('sies') ||
      q.includes('university') ||
      q.includes('coursework') ||
      q.includes('studying') ||
      q.includes('academic') ||
      q.includes('degree')
    ) {
      return (
        "🎓 **Computer Engineering at SIES GST (Mumbai University)**\n\n" +
        "• **Degree**: B.Tech in Computer Engineering (Class of 2025–2029) at SIES Graduate School of Technology, Navi Mumbai.\n" +
        "• **Current Focus**: Mastering Data Structures & Algorithms (Trees, Graphs, DP) in C++, Full-Stack React web apps, Discrete Mathematics, and Computer Architecture.\n" +
        "• **College Leadership**: Serving as the **Web Development Coordinator** for the ARENA SIESGST student chapter.\n" +
        "• Great connecting with fellow engineering students! Feel free to ask about PhysiX or my coding journey."
      );
    }

    // 2. PhysiX / Physics simulation / Kinematics
    if (q.includes('physix') || q.includes('physics') || q.includes('kinematics') || q.includes('projectile') || q.includes('simulation')) {
      return (
        "⚛️ **PhysiX — Interactive STEM Physics Laboratory** is my flagship project!\n\n" +
        "• Interactive 2D classical mechanics and kinematics laboratory built with React, HTML5 Canvas, and Vite.\n" +
        "• **Features**:\n" +
        "  - High-precision projectile motion: x(t) = v₀·cos(θ)·t and y(t) = h₀ + v₀·sin(θ)·t - ½g·t²\n" +
        "  - Planetary gravity presets: Earth (9.8 m/s²), Moon (1.62 m/s²), Mars (3.72 m/s²), Jupiter (24.79 m/s²)\n" +
        "  - Real-time telemetry HUD (t, y, x, v) with live vector decomposition (Cyan total, Green vx, Amber vy)\n" +
        "  - Ghost trails with parameter tags for visual trajectory comparison\n" +
        "• GitHub Repo: https://github.com/ojasjoshi-007/PhysiX"
      );
    }

    // 3. Technical Skills / Stack / Languages / C++ / React
    if (
      q.includes('skill') ||
      q.includes('language') ||
      q.includes('c++') ||
      q.includes('stack') ||
      q.includes('react') ||
      q.includes('python') ||
      q.includes('dsa') ||
      q.includes('algorithm')
    ) {
      return (
        "💻 **My Technical Stack & Toolkit**:\n\n" +
        "• **Languages**: C++ (Primary for DSA & problem solving), C (Low-level memory & systems), Python (Automation & 100 Days of Code), JavaScript (Modern ES6+).\n" +
        "• **Web & Graphics**: React, HTML5 Canvas (Kinematics & visual simulations), CSS3, Vite.\n" +
        "• **Tools & Systems**: Git, GitHub, VS Code, Linux CLI & POSIX.\n" +
        "• **Core Disciplines**: Data Structures & Algorithms, Object-Oriented Design, Discrete Math & Classical Kinematics."
      );
    }

    // 4. ARENA / Leadership / Student Chapter
    if (q.includes('arena') || q.includes('coordinator') || q.includes('leadership') || q.includes('chapter')) {
      return (
        "⚡ **ARENA SIESGST — Web Development Coordinator**\n\n" +
        "• Serving as the Web Development Coordinator for the ARENA student chapter at SIES Graduate School of Technology.\n" +
        "• Responsible for engineering chapter web platforms, collaborating with the technical committee, and coordinating student tech events."
      );
    }

    // 5. Sports / Hobbies / Cinema / Outside code
    if (q.includes('sport') || q.includes('hobby') || q.includes('cinema') || q.includes('movie') || q.includes('football') || q.includes('badminton')) {
      return (
        "⚽ **Life Beyond The Screen**:\n\n" +
        "• **Sports**: Active enthusiast of football, badminton, swimming, and pickleball.\n" +
        "• **Cinema**: Passionate cinephile who appreciates thoughtful screenplays and cinematic storytelling.\n" +
        "• **Reading**: Technical literature, non-fiction, and computer science essays."
      );
    }

    // 6. Contact / Links
    if (q.includes('contact') || q.includes('email') || q.includes('github') || q.includes('linkedin') || q.includes('reach')) {
      return (
        "📬 **Connect with Me**:\n\n" +
        `• Email: ${personalData.email}\n` +
        `• GitHub: ${personalData.socials.github}\n` +
        `• LinkedIn: ${personalData.socials.linkedin}\n` +
        `• Location: ${personalData.location}`
      );
    }

    // Default friendly assistant response
    return (
      `Hey! I'm Ojas Joshi's AI Digital Twin at SIES GST. I love C++, building software like PhysiX, solving algorithmic problems, and web engineering.\n\n` +
      `What would you like to know about my projects, stack, or journey as a Computer Engineering student?`
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

    const systemPrompt = `You are the authentic AI Digital Twin of Ojas Joshi, a Computer Engineering undergraduate at SIES Graduate School of Technology (University of Mumbai, Class of 2025–2029).

CRITICAL INSTRUCTIONS:
- You represent Ojas Joshi directly. Speak in the first person ("I", "my").
- Stick strictly to Ojas's actual profile, background, and projects.
- Never output reasoning tokens, internal thoughts, or metacommentary. Output only your direct message.

OJAS JOSHI PROFILE:
- Degree: B.Tech in Computer Engineering at SIES Graduate School of Technology, Nerul, Navi Mumbai (Mumbai University, Class of 2025–2029).
- Role: Web Development Coordinator @ ARENA SIESGST student chapter.
- Flagship Project: PhysiX — an interactive 2D Classical Mechanics & Kinematics laboratory built with React, HTML5 Canvas, and Vite (https://github.com/ojasjoshi-007/PhysiX). Features projectile motion physics, planetary gravity presets (Earth, Moon, Mars, Jupiter), real-time telemetry HUD, vector decomposition, and ghost trails.
- Core Stack: C++ (DSA & competitive problem solving), C (systems/memory), Python (automation & 100 Days of Code), JavaScript (ES6+), React, CSS3, HTML5 Canvas, Git/GitHub, Linux.
- Academics & Focus: Practicing Data Structures & Algorithms (Trees, Graphs, DP) in C++, Full-Stack React web apps, discrete mathematics, and systems architecture.
- Beyond Tech: Football, badminton, swimming, pickleball, cinema, and reading.
- Contact: Email ojasj33@gmail.com, GitHub https://github.com/ojasjoshi-007, LinkedIn https://www.linkedin.com/in/ojasj.

Keep responses concise, friendly, authentic, and formatted cleanly for a developer terminal.`;

    if (!apiKey) {
      setTimeout(() => {
        const fallback = getFallbackResponse(messageText);
        setMessages((prev) => [...prev, { role: 'assistant', content: fallback }]);
        setIsLoading(false);
      }, 300);
      return;
    }

    // Robust, verified free models with fast latency & solid persona adherence
    const candidateModels = [
      'inclusionai/ling-3.0-flash-fin:free',
      'minimax/minimax-m2.7:free',
      'minimax/minimax-m3:free',
      'openrouter/free',
      'nvidia/nemotron-3.5-lightning:free'
    ];

    let success = false;

    for (const modelName of candidateModels) {
      try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 7500);

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
            temperature: 0.6,
            max_tokens: 650
          }),
          signal: controller.signal
        });

        clearTimeout(timeoutId);

        if (response.ok) {
          const data = await response.json();
          const choice = data.choices?.[0];
          const rawReply =
            choice?.message?.content ||
            choice?.text ||
            (typeof choice?.message === 'string' ? choice.message : '');

          const cleanedReply = cleanAIResponse(rawReply);
          if (cleanedReply && cleanedReply.length > 0) {
            setMessages((prev) => [...prev, { role: 'assistant', content: cleanedReply }]);
            success = true;
            break;
          }
        }
      } catch (err) {
        console.warn(`Model ${modelName} attempt failed:`, err.message || err);
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
            Chat with my interactive AI digital twin. Ask any question about my journey as a Computer Engineering student, PhysiX, C++, algorithms, or hobbies!
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
                onClick={() =>
                  setMessages([
                    {
                      role: 'assistant',
                      content: '⚡ Terminal reset. Digital Twin is ready for new prompts.'
                    }
                  ])
                }
                className="terminal-clear-btn"
                title="Reset Terminal Screen"
                aria-label="Clear chat"
              >
                <Trash2 size={14} />
                <span>Reset</span>
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
              placeholder="Ask anything about PhysiX, C++, CE coursework, or click a command..."
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
