/**
 * Portfolio & Digital Twin Data for Ojas Joshi
 * Computer Science / Engineering Student & Developer
 * 
 * Living System Architecture & Interconnected Topology Data
 */

export const personalData = {
  name: "Ojas Joshi",
  headline: "Computer Science Student & Developer",
  systemStatus: "ONLINE • RUNNING v1.0",
  coreVersion: "2026.8",
  status: "Open to learning & collaborations",
  location: "Mumbai, India",
  college: "SIES Graduate School of Technology",
  university: "University of Mumbai",
  degree: "B.Tech in Computer Engineering",
  graduationYear: "2025 – 2029",
  email: "ojasj33@gmail.com",
  socials: {
    github: "https://github.com/ojasjoshi-007",
    linkedin: "https://www.linkedin.com/in/ojasj",
    email: "mailto:ojasj33@gmail.com",
  },
  heroSummary:
    "I'm a Computer Engineering student living at the intersection of clean software engineering, algorithmic problem solving, physical simulation, and mathematics.",
  aboutText: [
    "Welcome to my interactive Digital Twin. I'm Ojas, a Computer Engineering undergraduate based in Mumbai with an insatiable appetite for understanding how computation, mathematics, and systems weave together.",
    "My engineering universe is treated not as isolated skills, but as an interconnected living ecosystem: from low-level systems in C and algorithmic rigor in C++, to computational kinematics in PhysiX and high-performance web engineering with React.",
    "Beyond the screen, athletic pursuits in football, badminton, and pickleball along with cinema storytelling provide cognitive balance to my technical work."
  ],
  systemTelemetry: [
    { label: "Core Node", value: "Ojas.CS_v1.0" },
    { label: "Base Institute", value: "SIES GST (Mumbai Univ)" },
    { label: "Primary Simulation", value: "PhysiX 2D Kinematics" },
    { label: "Current Focus", value: "DSA in C++ & Full-Stack" },
    { label: "Leadership Node", value: "ARENA Web Dev Coord" }
  ],
  interests: [
    {
      title: "Problem Solving & DSA",
      desc: "Practicing graph algorithms, dynamic programming, and data structures in C++ and Python.",
      icon: "Code2",
      nodeId: "algorithms"
    },
    {
      title: "Physics & Kinematics Simulation",
      desc: "Building interactive classical mechanics simulators like PhysiX with real physics equations.",
      icon: "Atom",
      nodeId: "physix"
    },
    {
      title: "Web Architecture & React",
      desc: "Engineering reactive web tools, state systems, and interfaces for the ARENA student chapter.",
      icon: "Layout",
      nodeId: "web"
    },
    {
      title: "Systems & Theory",
      desc: "Exploring memory layout, pointers, operating systems, linear algebra, and discrete math.",
      icon: "Cpu",
      nodeId: "systems"
    }
  ],
  hobbies: [
    { name: "Sports", detail: "Football, badminton, swimming & pickleball", icon: "Activity" },
    { name: "Reading", detail: "CS literature, non-fiction & engineering essays", icon: "BookOpen" },
    { name: "Cinema", detail: "Appreciating storytelling, screenplay & cinematic direction", icon: "Film" }
  ]
};

export const skillsData = {
  categories: [
    {
      name: "Programming Languages",
      description: "Core languages powering algorithms, systems, and scripting",
      skills: [
        { name: "C++", badge: "Primary for DSA & Problem Solving", level: "Active Focus" },
        { name: "C", badge: "Low-level Concepts & Memory", level: "Foundational" },
        { name: "Python", badge: "Automation, Scripting & 100 Days Challenge", level: "Proficient" },
        { name: "JavaScript", badge: "Modern ES6+ & Interactive Web", level: "Active Focus" }
      ]
    },
    {
      name: "Web Development & Graphics",
      description: "Frontend libraries, rendering canvases, and tooling",
      skills: [
        { name: "React", badge: "Component-driven Web Apps", level: "Active Focus" },
        { name: "HTML5 Canvas", badge: "2D Kinematics Simulation Graphics", level: "Proficient" },
        { name: "CSS3", badge: "Cyber HUDs & Responsive Design", level: "Proficient" },
        { name: "Vite", badge: "Fast Bundling & Tooling", level: "Proficient" }
      ]
    },
    {
      name: "Tools & Systems",
      description: "Development workflow and environment tooling",
      skills: [
        { name: "Git", badge: "Version Control & Branching", level: "Proficient" },
        { name: "GitHub", badge: "Open Source Repositories", level: "Active Focus" },
        { name: "VS Code", badge: "Primary Development Environment", level: "Daily Driver" },
        { name: "Linux / CLI", badge: "Bash Shell & POSIX Tooling", level: "Exploring" }
      ]
    },
    {
      name: "Computer Science Fundamentals",
      description: "Core academic, algorithmic, and mathematical pillars",
      skills: [
        { name: "Data Structures", badge: "Arrays, Trees, Graphs, Linked Lists", level: "Active Focus" },
        { name: "Algorithms", badge: "Sorting, Searching, Recursion & Greedy", level: "Active Focus" },
        { name: "Object-Oriented Programming", badge: "Classes, Inheritance, Modular Design", level: "Proficient" },
        { name: "Computational Math & Physics", badge: "Kinematics, Vector Math & Discrete Systems", level: "Active Interest" }
      ]
    }
  ]
};

export const projectsData = [
  {
    id: "physix",
    title: "PhysiX — Interactive STEM Physics Laboratory",
    tagline: "Interactive Classical Mechanics & 2D Kinematics Simulation Platform",
    category: "STEM Physics & Web Simulation",
    featured: true,
    description:
      "A high-precision Classical Mechanics and Physics Laboratory platform designed for students, educators, and science enthusiasts. Built with modern web technologies, mathematical kinematics models, and sleek cyber-academic aesthetics.",
    highlights: [
      "Calibrated Projectile Motion Lab: High-precision 2D kinematics simulation with launch angle, initial velocity, ground elevation offsets (h₀, d₀), and scale calibration (12px = 1m).",
      "Real-Time Telemetry HUD: Floating glassmorphic HUD dynamically tracking instantaneous flight time (t), altitude (y), horizontal distance (x), and total speed (v).",
      "Dynamic Velocity Vectors: Real-time vector decomposition displaying total velocity v (Cyan), horizontal component vx (Green), and vertical component vy (Amber).",
      "Planetary Gravity Presets: Instant gravity simulation for Earth (9.8 m/s²), Moon (1.62 m/s²), Mars (3.72 m/s²), and Jupiter (24.79 m/s²).",
      "Ghost Comparison Trails: Multi-launch ghost trail retention with launch parameter tags for visual comparison across varying angles and elevations.",
      "Target Challenge Mode: Interactive bullseye target placement with collision hit detection, particle splash effects, and scoring."
    ],
    features: [
      {
        title: "2D Kinematics Engine",
        desc: "Accurate physical equations x(t) = v₀·cos(θ)·t and y(t) = h₀ + v₀·sin(θ)·t - ½g·t² computed on each animation frame."
      },
      {
        title: "Planetary Gravity",
        desc: "Toggle between Earth (9.8m/s²), Moon (1.62m/s²), Mars (3.72m/s²), and Jupiter (24.79m/s²)."
      },
      {
        title: "Vector Decomposition",
        desc: "Live visual decomposition of resultant velocity vector into orthogonal vx and vy components."
      },
      {
        title: "Target Challenge",
        desc: "Gamified target hit-testing with distance-based accuracy scoring and dynamic particle explosions."
      }
    ],
    tech: ["React", "JavaScript", "HTML5 Canvas", "Vite", "CSS3", "Kinematics Math"],
    github: "https://github.com/ojasjoshi-007/PhysiX",
    live: null,
    image: "physix"
  }
];

export const journeyData = {
  milestones: [
    {
      period: "August 2026 – Present",
      title: "Web Development Coordinator",
      organization: "ARENA SIESGST Chapter",
      badge: "Leadership & Technical Team",
      description:
        "Contributing as a core technical team member, building web interfaces for college events, running student tech sessions, and collaborating on chapter initiatives."
    },
    {
      period: "2025 – 2029",
      title: "B.Tech in Computer Engineering",
      organization: "SIES Graduate School of Technology (University of Mumbai)",
      badge: "Undergraduate Journey",
      description:
        "Deepening understanding of core Computer Science: Data Structures, Algorithms, Computer Architecture, Mathematics, Object-Oriented Programming, and Operating Systems."
    },
    {
      period: "2024 – 2025",
      title: "100 Days of Code & Python Milestone",
      organization: "Self-Driven Learning & Certification",
      badge: "Milestone",
      description:
        "Completed 100 consecutive days of Python programming challenges, building practical projects, mastering OOP, file I/O, recursion, and problem solving."
    },
    {
      period: "2023 – 2025",
      title: "HSC Science (PCM & CS) & Competitive Math",
      organization: "SS High School & Jr College / Vidyalankar",
      badge: "Foundation",
      description:
        "Formed strong analytical foundation in Physics, Chemistry, Mathematics (JEE / CET), and Computer Science fundamentals."
    }
  ],
  currentFocus: [
    {
      topic: "Data Structures & Algorithms in C++",
      status: "In Progress",
      notes: "Solving LeetCode problems on Trees, Graphs, Recursion & Dynamic Programming."
    },
    {
      topic: "Systems & Memory Architecture",
      status: "Exploring",
      notes: "Understanding how memory, caching, and operating system kernels interact with user programs."
    },
    {
      topic: "Interactive Simulations & Full-Stack React",
      status: "Active",
      notes: "Building simulation applications like PhysiX, state management, and modern component architecture."
    },
    {
      topic: "Discrete Mathematics & Physics Modeling",
      status: "Coursework",
      notes: "Connecting graph theory, kinematics math, and linear algebra to computing applications."
    }
  ]
};
