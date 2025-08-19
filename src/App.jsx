// eslint-disable-next-line no-unused-vars
import { motion, useScroll, useTransform } from 'framer-motion';
import { useState, useEffect } from 'react';
import './App.css';

const portfolioData = {
  name: 'Saurabh Prajapati',
  title: '🚀 Front-End Developer / Web designer (React)',
  contact: {
    email: 'saurabhprajapti8469@gmail.com',
    phone: '8732943066',
    linkedin: 'https://www.linkedin.com/in/saurabh-prajapati-201a92167/',
  },
  summary:
    'Front-End Developer / Web designer with 2.5 years of experience building dynamic and high-performance web applications using React.js. Skilled in translating UI/UX designs into responsive, functional components and handling API integrations with Fetch API and Axios. Focused on creating clean, scalable, and user-friendly interfaces that enhance user experience.',
  skills: [
    { category: 'Core Technologies', details: 'React.js, JavaScript (ES6+), Expo(React native)', icon: '⚛️' },
    { category: 'State Management', details: 'Redux, Context API', icon: '🔄' },
    { category: 'API Integration', details: 'Fetch API, Axios', icon: '🌐' },
    { category: 'UI Frameworks', details: 'Tailwind CSS, Bootstrap, Material-UI, Nativewind(expo app)', icon: '🎨' },
    { category: 'UI/UX Tools', details: 'Figma, Adobe XD', icon: '🎯' },
    { category: 'Performance Optimization & Code Quality', details: 'ESLint, Husky', icon: '⚡' },
    { category: 'Version Control & CI/CD', details: 'Git, GitHub, GitLab, Vercel', icon: '🔧' },
    { category: 'AI tools', details: 'lovable,github copilot ,cursor,windsurf, kiro,bolt', icon: '🤖' },
  ],
  experience: [
    {
      company: 'Secret Spirit Solutions',
      period: 'March 2023 – Present',
      responsibilities: [
        'Developed pixel-perfect UI from Figma designs with responsiveness across devices.',
        'Optimized web app performance through lazy loading, code splitting, and efficient rendering.',
        'Conducted cross-browser testing and debugging to ensure seamless user experience.',
        'Integrated APIs using Fetch API and Axios improving data flow in applications.',
      ],
    },
  ],
  projects: [
    {
      title: 'Yliway (LinkedIn Alternative Platform)',
      subtitle: 'Frontend Development (React, MUI)',
      techStack: ['React.js', 'Figma', 'Bootstrap', 'MUI', 'HTML', 'CSS'],
      description: [
        'Designed the complete UI for Yliway 3.0 in Figma, covering all pages for both desktop and mobile views with responsive breakpoints.',
        'Initially developed multiple platform interfaces (Main Platform, Business, and Learning Institute) using React Bootstrap and Plain Bootstrap, ensuring consistency and responsiveness.',
        'Upgraded the platform to Yliway 4.0 by replacing Bootstrap with MUI (Material UI) for a modern, scalable component structure across all platforms.',
        'Built responsive designs from 320px to 1200px, optimized for various screen sizes and devices.',
        'Created email templates compatible across platforms (Gmail, Outlook, Yopmail), enhancing communication workflows.',
      ],
      gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      icon: '💼'
    },
    {
      title: 'Roho',
      subtitle: 'Browser-based Dialer Application',
      techStack: ['React.js', 'Tailwind CSS', 'JsSIP', 'Axios', 'Redux'],
      description: [
        'Designed and developed a browser-based dialer application using JsSIP, embedded within the Roho platform as a widget.',
        'The dialer mimics a mobile phone dialer, allowing users to make web-based voice calls to customers securely via token-based authentication.',
        'Built the entire frontend interface using React and Tailwind CSS, ensuring a responsive and modern UI.',
        'Integrated REST APIs using Axios for real-time data exchange and call functionalities.',
        'Ensured the widget activates after user login/signup and remains integrated within Roho\'s main platform as a modular feature.',
      ],
      gradient: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
      icon: '📞'
    },
    {
      title: 'VN Casting.com',
      subtitle: 'Casting Management Platform',
      techStack: ['React.js', 'HTML', 'CSS', 'JavaScript', 'Expo'],
      description: [
        'Developed a comprehensive casting management system consisting of a public-facing website for casting opportunities and a private portal for talent profile management and submissions.',
        'Designed interactive UI components to improve user engagement and streamline navigation.',
        'Integrated real-time APIs using Fetch API for dynamic content updates and data-driven UI experiences.',
        'Ensured clean separation between public and private workflows to maintain security and usability',
      ],
      gradient: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
      icon: '🎬'
    },
    {
      title: 'Zoopup.com',
      subtitle: 'Freelance Marketplace',
      techStack: ['HTML', 'CSS', 'jQuery', 'Bootstrap'],
      description: [
        'Developed and optimized the UI',
        'Ensured full cross-browser compatibility and mobile responsiveness using Bootstrap grid and utilities.',
        'Optimized front-end structure for improved performance and minimal layout shift.',
      ],
      gradient: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
      icon: '🛍️'
    },
    {
      title: 'Tap2Health',
      subtitle: 'Health & Wellness Platform',
      techStack: ['HTML', 'CSS'],
      description: [
        'Transformed Figma UI designs into responsive, production-ready web pages.',
        'Ensured pixel-perfect layout and styling across all breakpoints.',
        'Focused on page speed optimization and web accessibility improvements to enhance overall UX.',
        'Delivered clean, maintainable code following best frontend practices.',
      ],
      gradient: 'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)',
      icon: '🏥'
    },
  ],
  education: [
    {
      institution: 'M.G Panchal Science College, Pilvai, Vijapur - Mehsana',
      degrees: ['B.Sc Chemistry (2020)', 'M.Sc Chemistry (2022)'],
    },
  ],
  training: [
    {
      course: 'Front-End Development Training',
      institution: 'DIT Academy (December 2022)',
    },
  ],
  languages: ['🏆 Gujarati', '🏆 Hindi', '🌍 English'],
};

// Scroll to section utility
const scrollToSection = (sectionId) => {
  const element = document.getElementById(sectionId);
  if (element) {
    element.scrollIntoView({ behavior: 'smooth' });
  }
};

// Navigation Component
const Navigation = () => {
  const [activeSection, setActiveSection] = useState('hero');
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['hero', 'skills', 'projects', 'experience', 'education'];
      const scrollPosition = window.scrollY + 100;
      
      // Calculate scroll progress
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = (window.scrollY / totalHeight) * 100;
      setScrollProgress(progress);

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
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
    { id: 'hero', label: 'Home', icon: '🏠' },
    { id: 'skills', label: 'Skills', icon: '💡' },
    { id: 'projects', label: 'Projects', icon: '🚀' },
    { id: 'experience', label: 'Experience', icon: '💼' },
    { id: 'education', label: 'Education', icon: '🎓' },
  ];

  return (
    <motion.nav 
      className="navigation"
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8 }}
    >
      <div 
        className="nav-progress" 
        style={{ '--progress': `${scrollProgress}%` }}
      />
      <div className="nav-container">
        {navItems.map((item, index) => (
          <motion.button
            key={item.id}
            className={`nav-item ${activeSection === item.id ? 'active' : ''}`}
            onClick={() => scrollToSection(item.id)}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <span className="nav-icon">{item.icon}</span>
            <span className="nav-label">{item.label}</span>
          </motion.button>
        ))}
      </div>
    </motion.nav>
  );
};

// Hero Section
const Hero = () => {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 500], [0, 150]);

  return (
    <section id="hero" className="hero-section">
      <motion.div 
        className="hero-background"
        style={{ y }}
      />
      <div className="hero-content">   
        <motion.h1 
          className="hero-name"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          {portfolioData.name}
        </motion.h1>
        
        <motion.p 
          className="hero-title"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          {portfolioData.title}
        </motion.p>
        
        <motion.p 
          className="hero-summary"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          {portfolioData.summary}
        </motion.p>
        
        <motion.div 
          className="hero-contact"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          <motion.a 
            href={`mailto:${portfolioData.contact.email}`}
            className="contact-btn"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
          >
            📧 Email
          </motion.a>
          <motion.a 
            href={portfolioData.contact.linkedin} 
            target="_blank" 
            rel="noopener noreferrer"
            className="contact-btn"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
          >
            💼 LinkedIn
          </motion.a>
        </motion.div>

        <motion.div
          className="scroll-indicator"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          onClick={() => scrollToSection('skills')}
        >
          <div className="scroll-arrow">↓</div>
          <span>Scroll to explore</span>
        </motion.div>
      </div>
    </section>
  );
};

// Skills Section
const Skills = () => (
  <section id="skills" className="skills-section">
    <div className="section-container">
      <motion.h2 
        className="section-title"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        Skills & Expertise
      </motion.h2>
      
      <div className="skills-grid">
        {portfolioData.skills.map((skill, i) => (
          <motion.div
            className="skill-card glass-card"
            key={i}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, delay: i * 0.1 }}
            whileHover={{ 
              scale: 1.05, 
              rotateY: 5,
              transition: { duration: 0.2 }
            }}
          >
            <div className="skill-icon">{skill.icon}</div>
            <h3 className="skill-category">{skill.category}</h3>
            <p className="skill-details">{skill.details}</p>
          </motion.div>
        ))}
      </div>
      
      <motion.div
        className="scroll-indicator"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.5 }}
        onClick={() => scrollToSection('projects')}
      >
        <div className="scroll-arrow">↓</div>
      </motion.div>
    </div>
  </section>
);

// Project Card Component
const ProjectCard = ({ project, index }) => {
  return (
    <motion.div
      className="project-card glass-card"
      initial={{ opacity: 0, y: 100 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.8, delay: index * 0.2 }}
      whileHover={{ 
        scale: 1.02,
        transition: { duration: 0.3 }
      }}
    >
      <div className="project-header">
        <div className="project-icon">{project.icon}</div>
        <div className="project-title-section">
          <h3 className="project-title">{project.title}</h3>
          <p className="project-subtitle">{project.subtitle}</p>
        </div>
      </div>
      
      <div className="project-content">
        <ul className="project-description">
          {project.description.map((point, i) => (
            <motion.li 
              key={i}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              {point}
            </motion.li>
          ))}
        </ul>
        
        <div className="project-tech-stack">
          {project.techStack.map((tech, i) => (
            <motion.span 
              key={i} 
              className="tech-tag"
              initial={{ opacity: 0, scale: 0 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: i * 0.05 }}
              whileHover={{ scale: 1.1 }}
            >
              {tech}
            </motion.span>
          ))}
        </div>
      </div>
      
      <div 
        className="project-gradient-bg" 
        style={{ background: project.gradient }}
      />
    </motion.div>
  );
};

// Projects Section
const Projects = () => {
  return (
    <section id="projects" className="projects-section">
      <div className="section-container">
        <motion.h2 
          className="section-title"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          Featured Projects
        </motion.h2>
        
        <div className="projects-grid">
          {portfolioData.projects.map((project, i) => (
            <ProjectCard key={i} project={project} index={i} />
          ))}
        </div>
        
        <motion.div
          className="scroll-indicator"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          onClick={() => scrollToSection('experience')}
        >
          <div className="scroll-arrow">↓</div>
        </motion.div>
      </div>
    </section>
  );
};

// Experience Section
const Experience = () => (
  <section id="experience" className="experience-section">
    <div className="section-container">
      <motion.h2 
        className="section-title"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        Professional Experience
      </motion.h2>
      
      <div className="experience-timeline">
        {portfolioData.experience.map((exp, i) => (
          <motion.div
            key={i}
            className="experience-card glass-card"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: i * 0.2 }}
          >
            <div className="experience-header">
              <h3 className="company-name">{exp.company}</h3>
              <span className="experience-period">{exp.period}</span>
            </div>
            <ul className="responsibilities-list">
              {exp.responsibilities.map((resp, j) => (
                <motion.li 
                  key={j}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: j * 0.1 }}
                >
                  {resp}
                </motion.li>
              ))}
            </ul>
          </motion.div>
        ))}
      </div>
      
      <motion.div
        className="scroll-indicator"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.5 }}
        onClick={() => scrollToSection('education')}
      >
        <div className="scroll-arrow">↓</div>
      </motion.div>
    </div>
  </section>
);

// Education & Additional Info Section
const Education = () => (
  <section id="education" className="education-section">
    <div className="section-container">
      <motion.h2 
        className="section-title"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        Education & More
      </motion.h2>
      
      <div className="education-grid">
        <motion.div
          className="education-card glass-card"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h3 className="card-title">🎓 Education</h3>
          {portfolioData.education.map((edu, i) => (
            <div key={i} className="education-item">
              <h4>{edu.institution}</h4>
              {edu.degrees.map((degree, j) => (
                <p key={j} className="degree">{degree}</p>
              ))}
            </div>
          ))}
        </motion.div>
        
        <motion.div
          className="training-card glass-card"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <h3 className="card-title">📚 Training</h3>
          {portfolioData.training.map((train, i) => (
            <div key={i} className="training-item">
              <h4>{train.course}</h4>
              <p>{train.institution}</p>
            </div>
          ))}
        </motion.div>
        
        <motion.div
          className="languages-card glass-card"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <h3 className="card-title">🌍 Languages</h3>
          <div className="languages-list">
            {portfolioData.languages.map((lang, i) => (
              <motion.span 
                key={i} 
                className="language-tag"
                whileHover={{ scale: 1.1 }}
              >
                {lang}
              </motion.span>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  </section>
);

// Main App Component
const App = () => {
  return (
    <div className="app">
      <Navigation />
      <main className="main-content">
        <Hero />
        <Skills />
        <Projects />
        <Experience />
        <Education />
      </main>
    </div>
  );
};

export default App;