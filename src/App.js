import React, { useState } from 'react';
import { Home, DollarSign, ShoppingCart, Plane, MessageCircle, BarChart3, User, Mail, Github, ExternalLink, MapPin, Phone, Award, Calendar, Code, Database, Cloud, Layers, Monitor, Zap } from 'lucide-react';

const App = () => {
  const [currentPage, setCurrentPage] = useState('home');

  // Enhanced project data with 2025 trends for Gulf opportunities
  const projects = [
    {
      id: 'enterprise-dashboard',
      title: 'Enterprise Banking Dashboard',
      description: 'Modernized legacy banking system with React + Next.js and Azure deployment',
      icon: DollarSign,
      tech: 'React, Next.js, Kendo React, Azure, Docker',
      highlights: ['Migrated 16+ legacy pages', 'Improved performance by 25%', 'OAuth 2.0 integration']
    },
    {
      id: 'ai-powered-analytics',
      title: 'AI-Powered Analytics Dashboard',
      description: 'ML-driven insights with predictive analytics and real-time AI recommendations',
      icon: BarChart3,
      tech: 'React, TensorFlow.js, WebGL, WebAssembly, Python API',
      highlights: ['ML model integration', 'Edge AI computing', 'Predictive insights']
    },
    {
      id: 'blockchain-fintech',
      title: 'Blockchain FinTech Platform',
      description: 'Decentralized finance platform with crypto wallets and smart contracts',
      icon: Database,
      tech: 'React, Web3.js, Ethereum, Solidity, MetaMask',
      highlights: ['Smart contract integration', 'Crypto wallet support', 'DeFi protocols']
    },
    {
      id: 'ar-vr-experience',
      title: 'AR/VR Data Visualization',
      description: '3D immersive data experiences using WebXR and Three.js',
      icon: Monitor,
      tech: 'React, Three.js, WebXR, A-Frame, WebGL',
      highlights: ['Immersive 3D interfaces', 'VR data exploration', 'Spatial computing']
    },
    {
      id: 'iot-dashboard',
      title: 'IoT Smart City Dashboard',
      description: 'Real-time monitoring of smart city infrastructure with edge computing',
      icon: Cloud,
      tech: 'React, MQTT, Edge Computing, 5G APIs, Digital Twins',
      highlights: ['Real-time IoT data', '5G integration', 'Edge processing']
    },
    {
      id: 'voice-ai-interface',
      title: 'Voice-Controlled AI Interface',
      description: 'Conversational UI with voice commands and natural language processing',
      icon: MessageCircle,
      tech: 'React, WebRTC, Speech API, LLM Integration, WebSockets',
      highlights: ['Voice recognition', 'AI conversations', 'Multimodal UX']
    }
  ];

  // Enhanced skills for 2025 Gulf market with future tech
  const skillCategories = [
    {
      title: 'Frontend Development',
      skills: ['React 18+', 'Next.js 15', 'TypeScript', 'JavaScript ES2024+', 'Redux Toolkit', 'Server Components', 'React Query', 'Vite', 'SWC']
    },
    {
      title: 'UI/UX & Modern Styling',
      skills: ['Tailwind CSS 4.0', 'Material-UI v6', 'Framer Motion', 'React Spring', 'CSS Container Queries', 'View Transitions API', 'Web Components', 'Design Tokens']
    },
    {
      title: 'Cloud & DevOps (2025)',
      skills: ['Azure', 'AWS Lambda Edge', 'Docker', 'Kubernetes', 'Terraform', 'GitHub Actions', 'Edge Computing', 'CDN Optimization', 'Serverless']
    },
    {
      title: 'Emerging Technologies',
      skills: ['WebAssembly', 'WebXR/AR/VR', 'Web3.js', 'TensorFlow.js', 'WebGPU', 'Service Workers', 'Progressive Web Apps', 'Edge AI']
    },
    {
      title: 'Data & AI Integration',
      skills: ['GraphQL', 'tRPC', 'Prisma', 'Supabase', 'LLM APIs', 'Machine Learning', 'Real-time Analytics', 'Vector Databases']
    },
    {
      title: 'Gulf Region Expertise',
      skills: ['Arabic RTL Support', 'Islamic Calendar', 'Multi-currency', 'Sharia-compliant UI', 'MENA Localization', 'Gulf Banking Standards']
    }
  ];

  // Experience data
  const experience = [
    {
      title: 'Frontend Developer',
      company: 'Synechron, Pune',
      duration: 'Nov 2022 – Present',
      roles: 'React Developer | Next.js Developer | UI Engineer',
      achievements: [
        'Migrated 16+ legacy jQuery pages to React + Next.js SPA with Kendo React components',
        'Improved React/Next.js app performance by 25% using React.memo, useMemo, and dynamic imports',
        'Deployed containerized apps on Azure VMs with Docker and CI/CD pipelines',
        'Built responsive dashboards using AG Grid, Highcharts, and Nivo for data visualization',
        'Integrated OAuth 2.0, JWT, and LDAP authentication with RBAC',
        'Achieved 100% accuracy in automated document extraction systems'
      ]
    }
  ];

  // Navigation component with new sections
  const Navbar = () => (
    <nav className="bg-gradient-to-r from-indigo-900 to-purple-900 text-white p-4 sticky top-0 z-50 backdrop-blur-sm">
      <div className="max-w-6xl mx-auto flex justify-between items-center">
        <h1 className="text-xl font-bold bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">
          Abid Dasurkar
        </h1>
        <div className="flex space-x-4 overflow-x-auto">
          {['home', 'about', 'projects', 'ai-showcase', 'gulf-ready', 'visa-profile', 'experience', 'contact'].map(page => (
            <button
              key={page}
              onClick={() => setCurrentPage(page)}
              className={`capitalize hover:text-blue-300 transition-all duration-300 px-3 py-1 rounded-lg whitespace-nowrap text-sm ${
                currentPage === page ? 'text-blue-300 bg-white/10' : ''
              }`}
            >
              {page === 'ai-showcase' ? 'AI/ML' : page === 'gulf-ready' ? 'Gulf Ready' : page === 'visa-profile' ? 'Visa Profile' : page}
            </button>
          ))}
        </div>
      </div>
    </nav>
  );

  // Project card component
  const ProjectCard = ({ project, onClick }) => {
    const Icon = project.icon;
    return (
      <div 
        className="bg-white rounded-xl shadow-lg p-6 hover:shadow-2xl transition-all duration-500 cursor-pointer transform hover:-translate-y-2 border border-gray-100"
        onClick={onClick}
      >
        <div className="flex items-center mb-4">
          <div className="p-3 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg mr-4">
            <Icon className="text-white" size={28} />
          </div>
          <h3 className="text-xl font-semibold text-gray-800">{project.title}</h3>
        </div>
        <p className="text-gray-600 mb-4 leading-relaxed">{project.description}</p>
        
        <div className="space-y-3">
          <div className="flex flex-wrap gap-2">
            {project.tech.split(', ').map((tech, idx) => (
              <span key={idx} className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-sm font-medium">
                {tech}
              </span>
            ))}
          </div>
          
          <div className="space-y-1">
            {project.highlights.map((highlight, idx) => (
              <div key={idx} className="flex items-center text-sm text-gray-600">
                <Zap size={12} className="text-yellow-500 mr-2" />
                {highlight}
              </div>
            ))}
          </div>
        </div>
        
        <div className="flex justify-end mt-4">
          <ExternalLink size={20} className="text-blue-500" />
        </div>
      </div>
    );
  };

  // HomePage component
  const HomePage = () => (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      <div className="max-w-6xl mx-auto px-4 py-20">
        {/* Hero Section */}
        <div className="text-center mb-20">
          <div className="relative">
            <h1 className="text-6xl font-bold bg-gradient-to-r from-indigo-600 via-purple-600 to-blue-600 bg-clip-text text-transparent mb-6">
              Abid Dasurkar
            </h1>
            <p className="text-2xl text-gray-700 mb-4 font-medium">
              Senior Frontend Developer
            </p>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto mb-8 leading-relaxed">
              3+ years of expertise in React, Next.js, and Azure cloud deployment. 
              Specialized in modernizing enterprise applications, performance optimization, 
              and building scalable frontend solutions.
            </p>
            
            <div className="flex justify-center space-x-6 mb-12">
              <div className="flex items-center text-gray-600">
                <MapPin size={18} className="mr-2 text-blue-600" />
                <span>Pune, India</span>
              </div>
              <div className="flex items-center text-gray-600">
                <Mail size={18} className="mr-2 text-blue-600" />
                <span>abiddasurkar@gmail.com</span>
              </div>
              <div className="flex items-center text-gray-600">
                <Phone size={18} className="mr-2 text-blue-600" />
                <span>+91-8275434589</span>
              </div>
            </div>

            <div className="flex justify-center space-x-4">
              <button 
                onClick={() => setCurrentPage('projects')}
                className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-3 rounded-lg hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1"
              >
                View Projects
              </button>
              <button 
                onClick={() => setCurrentPage('contact')}
                className="border-2 border-blue-600 text-blue-600 px-8 py-3 rounded-lg hover:bg-blue-600 hover:text-white transition-all duration-300"
              >
                Get In Touch
              </button>
            </div>
          </div>
        </div>

        {/* Key Achievements */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <div className="text-center p-6 bg-white rounded-xl shadow-lg">
            <div className="text-3xl font-bold text-blue-600 mb-2">25%</div>
            <div className="text-gray-600">Performance Improvement</div>
          </div>
          <div className="text-center p-6 bg-white rounded-xl shadow-lg">
            <div className="text-3xl font-bold text-green-600 mb-2">100%</div>
            <div className="text-gray-600">Document Processing Accuracy</div>
          </div>
          <div className="text-center p-6 bg-white rounded-xl shadow-lg">
            <div className="text-3xl font-bold text-purple-600 mb-2">16+</div>
            <div className="text-gray-600">Legacy Pages Modernized</div>
          </div>
        </div>

        {/* Featured Projects */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">Featured Projects</h2>
          <div className="grid md:grid-cols-2 gap-8">
            {projects.map(project => (
              <ProjectCard
                key={project.id}
                project={project}
                onClick={() => setCurrentPage(project.id)}
              />
            ))}
          </div>
        </div>

        {/* Tech Stack with 2025 trends */}
        <div className="text-center">
          <h2 className="text-3xl font-bold mb-8 text-gray-800">Technical Expertise (2025 Ready)</h2>
          <div className="flex flex-wrap justify-center gap-4 mb-8">
            {['React 18+', 'Next.js 15', 'TypeScript', 'Azure', 'WebAssembly', 'WebXR', 'AI/ML', 'Web3'].map((tech, idx) => (
              <span key={idx} className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-full font-medium shadow-lg">
                {tech}
              </span>
            ))}
          </div>
          
          {/* Gulf-specific badges */}
          <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-xl p-6">
            <h3 className="text-xl font-semibold mb-4 text-gray-800">Gulf Region Ready</h3>
            <div className="flex flex-wrap justify-center gap-3">
              {['Arabic RTL', 'Islamic Calendar', 'Sharia-compliant UI', 'MENA Banking', 'Multi-currency', 'Gulf Standards'].map((skill, idx) => (
                <span key={idx} className="px-4 py-2 bg-green-100 text-green-800 rounded-lg text-sm font-medium">
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  // AboutPage component
  const AboutPage = () => (
    <div className="min-h-screen bg-gray-50 py-20">
      <div className="max-w-4xl mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-12 text-gray-800">About Me</h2>
        <div className="bg-white rounded-xl shadow-lg p-8">
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <div className="w-64 h-64 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full mx-auto mb-6 flex items-center justify-center">
                <User size={120} className="text-white" />
              </div>
            </div>
            <div>
              <h3 className="text-2xl font-semibold mb-4 text-gray-800">Frontend Developer</h3>
              <p className="text-gray-600 mb-6 leading-relaxed">
                Experienced Frontend Developer with 3+ years of expertise in React, Next.js, and cloud deployment. 
                Proven track record in building scalable enterprise applications, modernizing legacy systems, 
                and implementing CI/CD automation. Specialized in performance optimization, UI/UX engineering, 
                and Azure cloud infrastructure with Docker containerization.
              </p>
              
              <div className="space-y-3 mb-6">
                <div className="flex items-center">
                  <User className="mr-3 text-blue-600" size={20} />
                  <span className="font-medium">Abid Dasurkar</span>
                </div>
                <div className="flex items-center">
                  <Mail className="mr-3 text-blue-600" size={20} />
                  <span>abiddasurkar@gmail.com</span>
                </div>
                <div className="flex items-center">
                  <Github className="mr-3 text-blue-600" size={20} />
                  <span>linkedin.com/in/abiddasurkar</span>
                </div>
                <div className="flex items-center">
                  <MapPin className="mr-3 text-blue-600" size={20} />
                  <span>Pune, India</span>
                </div>
              </div>

              <div className="mb-6">
                <h4 className="font-semibold mb-3 text-gray-800">Education</h4>
                <div className="space-y-2 text-sm">
                  <div>
                    <div className="font-medium">B.E. Information Technology</div>
                    <div className="text-gray-600">University of Mumbai (2019-2022) • CGPA: 8.7/10</div>
                  </div>
                  <div>
                    <div className="font-medium">Diploma in IT</div>
                    <div className="text-gray-600">MSBTE (2017-2019) • 77%</div>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="font-semibold mb-3 text-gray-800">Certifications</h4>
                <div className="space-y-1 text-sm text-gray-600">
                  <div className="flex items-center">
                    <Award size={16} className="mr-2 text-yellow-500" />
                    Meta Front-End Developer Professional Certificate
                  </div>
                  <div className="flex items-center">
                    <Award size={16} className="mr-2 text-yellow-500" />
                    React – Complete Guide 2024 (Udemy)
                  </div>
                  <div className="flex items-center">
                    <Award size={16} className="mr-2 text-yellow-500" />
                    Angular Training (Synechron)
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  // Simple placeholder pages for now
  const ProjectsPage = () => (
    <div className="min-h-screen bg-gray-50 py-20">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-12 text-gray-800">All Projects</h2>
        <div className="grid md:grid-cols-2 gap-8">
          {projects.map(project => (
            <ProjectCard
              key={project.id}
              project={project}
              onClick={() => setCurrentPage(project.id)}
            />
          ))}
        </div>
      </div>
    </div>
  );

  const AIShowcasePage = () => (
    <div className="min-h-screen bg-gray-50 py-20 flex items-center justify-center">
      <div className="text-center">
        <h2 className="text-4xl font-bold mb-4">AI/ML Showcase</h2>
        <p className="text-lg text-gray-600 mb-8">Coming soon - Advanced AI integrations</p>
        <button 
          onClick={() => setCurrentPage('home')}
          className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
        >
          Back to Home
        </button>
      </div>
    </div>
  );

  const GulfReadyPage = () => (
    <div className="min-h-screen bg-gray-50 py-20 flex items-center justify-center">
      <div className="text-center">
        <h2 className="text-4xl font-bold mb-4">Gulf Region Ready</h2>
        <p className="text-lg text-gray-600 mb-8">Specialized for MENA markets</p>
        <button 
          onClick={() => setCurrentPage('home')}
          className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
        >
          Back to Home
        </button>
      </div>
    </div>
  );

  const VisaProfilePage = () => (
    <div className="min-h-screen bg-gray-50 py-20 flex items-center justify-center">
      <div className="text-center">
        <h2 className="text-4xl font-bold mb-4">Visa Sponsorship Profile</h2>
        <p className="text-lg text-gray-600 mb-8">Ready for immediate relocation</p>
        <button 
          onClick={() => setCurrentPage('home')}
          className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
        >
          Back to Home
        </button>
      </div>
    </div>
  );

  const ExperiencePage = () => (
    <div className="min-h-screen bg-gray-50 py-20">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-12 text-gray-800">Professional Experience</h2>
        
        {experience.map((exp, idx) => (
          <div key={idx} className="bg-white rounded-xl shadow-lg p-8 mb-8">
            <div className="flex justify-between items-start mb-4 flex-wrap">
              <div>
                <h3 className="text-2xl font-bold text-gray-800">{exp.title}</h3>
                <p className="text-lg text-blue-600 font-medium">{exp.company}</p>
                <p className="text-gray-600 italic">{exp.roles}</p>
              </div>
              <div className="flex items-center text-gray-600">
                <Calendar size={18} className="mr-2" />
                <span>{exp.duration}</span>
              </div>
            </div>
            <ul className="space-y-3">
              {exp.achievements.map((achievement, i) => (
                <li key={i} className="flex items-start">
                  <Zap size={16} className="text-yellow-500 mr-3 mt-1 flex-shrink-0" />
                  <span className="text-gray-700">{achievement}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}

        <div>
          <h3 className="text-2xl font-bold text-center mb-8 text-gray-800">Technical Skills</h3>
          <div className="grid md:grid-cols-2 gap-6">
            {skillCategories.map((category, idx) => (
              <div key={idx} className="bg-white rounded-xl shadow-lg p-6">
                <h4 className="text-lg font-semibold mb-4 text-gray-800 flex items-center">
                  <Code size={20} className="mr-2 text-blue-600" />
                  {category.title}
                </h4>
                <div className="flex flex-wrap gap-2">
                  {category.skills.map((skill, i) => (
                    <span key={i} className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  const ContactPage = () => (
    <div className="min-h-screen bg-gray-50 py-20">
      <div className="max-w-2xl mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-12 text-gray-800">Contact Me</h2>
        <div className="bg-white rounded-xl shadow-lg p-8">
          <form className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Name</label>
              <input type="text" className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
              <input type="email" className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Message</label>
              <textarea rows={5} className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"></textarea>
            </div>
            <button 
              type="submit" 
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 px-6 rounded-lg hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1"
            >
              Send Message
            </button>
          </form>
          
          <div className="mt-8 pt-8 border-t border-gray-200">
            <div className="grid md:grid-cols-2 gap-4 text-center">
              <div className="flex items-center justify-center">
                <Mail className="mr-2 text-blue-600" size={20} />
                <span>abiddasurkar@gmail.com</span>
              </div>
              <div className="flex items-center justify-center">
                <Phone className="mr-2 text-blue-600" size={20} />
                <span>+91-8275434589</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  // Main render function
  const renderCurrentPage = () => {
    switch(currentPage) {
      case 'home': return <HomePage />;
      case 'about': return <AboutPage />;
      case 'projects': return <ProjectsPage />;
      case 'ai-showcase': return <AIShowcasePage />;
      case 'gulf-ready': return <GulfReadyPage />;
      case 'visa-profile': return <VisaProfilePage />;
      case 'experience': return <ExperiencePage />;
      case 'contact': return <ContactPage />;
      default: return <HomePage />;
    }
  };

  return (
    <div className="font-sans">
      <Navbar />
      {renderCurrentPage()}
      
      <footer className="bg-gradient-to-r from-gray-900 to-gray-800 text-white py-12">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">Abid Dasurkar</h3>
              <p className="text-gray-300 mb-4">
                Frontend Developer specializing in React, Next.js, and Azure cloud solutions.
              </p>
              <div className="flex space-x-4">
                <Github className="hover:text-blue-400 cursor-pointer transition-colors" size={20} />
                <Mail className="hover:text-blue-400 cursor-pointer transition-colors" size={20} />
              </div>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-gray-300">
                <li><button onClick={() => setCurrentPage('about')} className="hover:text-blue-400 transition-colors">About</button></li>
                <li><button onClick={() => setCurrentPage('projects')} className="hover:text-blue-400 transition-colors">Projects</button></li>
                <li><button onClick={() => setCurrentPage('experience')} className="hover:text-blue-400 transition-colors">Experience</button></li>
                <li><button onClick={() => setCurrentPage('contact')} className="hover:text-blue-400 transition-colors">Contact</button></li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold mb-4">Contact Info</h4>
              <ul className="space-y-2 text-gray-300 text-sm">
                <li className="flex items-center">
                  <Mail size={16} className="mr-2" />
                  abiddasurkar@gmail.com
                </li>
                <li className="flex items-center">
                  <Phone size={16} className="mr-2" />
                  +91-8275434589
                </li>
                <li className="flex items-center">
                  <MapPin size={16} className="mr-2" />
                  Pune, India
                </li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 Abid Dasurkar. Built with React & Tailwind CSS.</p>
            <p className="text-sm mt-2">Frontend Developer Portfolio - Showcasing 3+ Years of Experience</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;