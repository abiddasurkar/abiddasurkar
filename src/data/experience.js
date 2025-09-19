import { 
  Briefcase, 
  GraduationCap, 
  Award, 
  Code, 
  Settings, 
  BarChart3, 
  TestTube,
  Smartphone,
  Cloud,
  BookOpen
} from 'lucide-react';

export const experience = [
  {
    id: 1,
    title: 'Frontend Developer',
    company: 'Synechron Technologies',
    location: 'Pune, India',
    duration: 'Nov 2022 – Present',
    employmentType: 'Full-time',
    roles: ['React Developer', 'Next.js Specialist', 'UI Engineer'],
    achievements: [
      'Migrated 16+ legacy jQuery pages to React + Next.js SPA with Kendo React components, reducing load time by 40%',
      'Improved React/Next.js app performance by 25% using React.memo, useMemo, and dynamic imports',
      'Deployed containerized apps on Azure VMs with Docker and CI/CD pipelines, reducing deployment time by 60%',
      'Built responsive dashboards using AG Grid, Highcharts, and Nivo for data visualization with real-time updates',
      'Integrated OAuth 2.0, JWT, and LDAP authentication with Role-Based Access Control (RBAC)',
      'Achieved 100% accuracy in automated document extraction systems using AI-powered OCR solutions',
      'Mentored 3 junior developers in React best practices and modern JavaScript patterns'
    ],
    technologies: [
      'React', 'Next.js', 'TypeScript', 'JavaScript', 'HTML5', 'CSS3', 
      'Tailwind CSS', 'Kendo UI', 'AG Grid', 'Highcharts', 'Nivo',
      'Azure', 'Docker', 'CI/CD', 'OAuth 2.0', 'JWT', 'REST APIs'
    ],
    icon: Briefcase,
    companyUrl: 'https://www.synechron.com',
    highlight: true
  },
  {
    id: 2,
    title: 'Frontend Developer Intern',
    company: 'Tech Solutions Inc',
    location: 'Mumbai, India',
    duration: 'Jun 2022 – Oct 2022',
    employmentType: 'Internship',
    roles: ['React Intern', 'UI Development'],
    achievements: [
      'Developed responsive user interfaces for client projects using React and Material-UI',
      'Collaborated with senior developers to implement new features and fix bugs',
      'Participated in code reviews and agile development processes',
      'Built reusable component library that improved development efficiency by 30%'
    ],
    technologies: [
      'React', 'JavaScript', 'Material-UI', 'CSS3', 'Git'
    ],
    icon: Briefcase,
    highlight: false
  }
];

export const education = [
  {
    id: 1,
    degree: 'B.E. Information Technology',
    institution: 'University of Mumbai',
    location: 'Mumbai, India',
    duration: '2019-2022',
    score: 'CGPA: 8.7/10',
    courses: [
      'Advanced Web Technologies',
      'Data Structures & Algorithms',
      'Database Management Systems',
      'Software Engineering',
      'Cloud Computing'
    ],
    achievements: [
      'Dean\'s List for Academic Excellence (2020, 2021)',
      'First Place in University Web Development Competition',
      'Active member of Coding Club and Tech Society'
    ],
    icon: GraduationCap,
    institutionUrl: 'https://www.mu.ac.in'
  },
  {
    id: 2,
    degree: 'Diploma in Information Technology',
    institution: 'MSBTE (Maharashtra State Board of Technical Education)',
    location: 'Mumbai, India',
    duration: '2017-2019',
    score: '77%',
    courses: [
      'Web Development Fundamentals',
      'Programming in C & C++',
      'Computer Networks',
      'Object-Oriented Programming'
    ],
    achievements: [
      'Top 5% of graduating class',
      'Completed industrial training at local software company'
    ],
    icon: GraduationCap,
    institutionUrl: 'https://msbte.org.in'
  }
];

export const certifications = [
  {
    id: 1,
    name: 'Meta Front-End Developer Professional Certificate',
    issuer: 'Meta via Coursera',
    date: '2023',
    credentialUrl: 'https://coursera.org/verify/professional-cert/your-credential-id',
    skills: ['React', 'Advanced CSS', 'UI/UX Design', 'Version Control'],
    icon: Award
  },
  {
    id: 2,
    name: 'React – Complete Guide 2024',
    issuer: 'Udemy',
    date: '2024',
    credentialUrl: 'https://udemy.com/certificate/your-certificate-id',
    skills: ['React Hooks', 'Redux', 'Context API', 'React Router'],
    icon: Award
  },
  {
    id: 3,
    name: 'Angular Training Certification',
    issuer: 'Synechron',
    date: '2023',
    credentialUrl: null,
    skills: ['Angular', 'TypeScript', 'RxJS', 'Angular Material'],
    icon: Award
  },
  {
    id: 4,
    name: 'AWS Cloud Practitioner Essentials',
    issuer: 'Amazon Web Services',
    date: '2023',
    credentialUrl: 'https://aws.amazon.com/verification',
    skills: ['Cloud Computing', 'AWS Services', 'Cloud Architecture'],
    icon: Award
  }
];

export const skills = [
  {
    category: "Frontend Development",
    icon: Code,
    items: [
      "React", "Next.js", "TypeScript", "JavaScript", "HTML5", "CSS3",
      "Tailwind CSS", "Material-UI", "Kendo UI", "Redux", "Context API"
    ]
  },
  {
    category: "Backend & DevOps",
    icon: Settings,
    items: [
      "Node.js", "Express", "REST APIs", "GraphQL", "Azure",
      "Docker", "CI/CD", "Git", "JWT", "OAuth 2.0"
    ]
  },
  {
    category: "Data Visualization",
    icon: BarChart3,
    items: [
      "AG Grid", "Highcharts", "Nivo", "Chart.js", "D3.js"
    ]
  },
  {
    category: "Testing & Tools",
    icon: TestTube,
    items: [
      "Jest", "React Testing Library", "Cypress", "Postman",
      "Webpack", "Vite", "ESLint", "Prettier"
    ]
  },
  {
    category: "Mobile Development",
    icon: Smartphone,
    items: [
      "React Native", "Ionic", "PWA", "Responsive Design"
    ]
  },
  {
    category: "Cloud & Infrastructure",
    icon: Cloud,
    items: [
      "Azure", "AWS", "Docker", "CI/CD Pipelines", "Serverless"
    ]
  }
];

export const projects = [
  {
    id: 1,
    title: "Enterprise Dashboard",
    description: "A comprehensive analytics dashboard for financial data visualization with real-time updates.",
    technologies: ["React", "Next.js", "TypeScript", "AG Grid", "Highcharts", "Tailwind CSS"],
    category: "Web Application",
    liveUrl: "https://dashboard.example.com",
    githubUrl: "https://github.com/yourusername/enterprise-dashboard",
    image: "/images/dashboard-project.jpg",
    features: [
      "Real-time data updates",
      "Interactive charts and graphs",
      "Role-based access control",
      "Responsive design for all devices"
    ],
    status: "Completed",
    date: "2023-11-15"
  },
  {
    id: 2,
    title: "Document Processing System",
    description: "AI-powered document extraction and processing system with high accuracy rate.",
    technologies: ["React", "Next.js", "Python", "Azure AI", "Docker"],
    category: "AI/ML Application",
    githubUrl: "https://github.com/yourusername/document-processor",
    image: "/images/document-project.jpg",
    features: [
      "OCR document extraction",
      "Machine learning classification",
      "Automated workflow",
      "Cloud deployment"
    ],
    status: "Completed",
    date: "2023-08-20"
  },
  {
    id: 3,
    title: "E-commerce Platform",
    description: "Modern e-commerce platform with seamless checkout and inventory management.",
    technologies: ["React", "Node.js", "MongoDB", "Stripe API", "Redux"],
    category: "Web Application",
    liveUrl: "https://ecommerce.example.com",
    githubUrl: "https://github.com/yourusername/ecommerce-platform",
    features: [
      "Shopping cart functionality",
      "Payment processing integration",
      "Admin dashboard",
      "Product search and filtering"
    ],
    status: "In Progress",
    date: "2024-01-10"
  }
];