import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { MapPin, Mail, Phone } from 'lucide-react';
import { useAppContext } from '../context/AppContext';
import ProjectCard from '../components/common/ProjectCard';
import { projects } from '../data/projects';

const HomePage = () => {
  const { user } = useAppContext();
  const navigate = useNavigate();

  const featuredProjects = projects.slice(0, 4);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      <div className="max-w-6xl mx-auto px-4 py-20">
        {/* Hero Section */}
        <div className="text-center mb-20">
          <div className="relative">
            <h1 className="text-6xl font-bold bg-gradient-to-r from-indigo-600 via-purple-600 to-blue-600 bg-clip-text text-transparent mb-6">
              {user.name}
            </h1>
            <p className="text-2xl text-gray-700 mb-4 font-medium">
              {user.title}
            </p>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto mb-8 leading-relaxed">
              3+ years of expertise in React, Next.js, and Azure cloud deployment. 
              Specialized in modernizing enterprise applications, performance optimization, 
              and building scalable frontend solutions.
            </p>
            
            <div className="flex justify-center space-x-6 mb-12">
              <div className="flex items-center text-gray-600">
                <MapPin size={18} className="mr-2 text-blue-600" />
                <span>{user.location}</span>
              </div>
              <div className="flex items-center text-gray-600">
                <Mail size={18} className="mr-2 text-blue-600" />
                <span>{user.email}</span>
              </div>
              <div className="flex items-center text-gray-600">
                <Phone size={18} className="mr-2 text-blue-600" />
                <span>{user.phone}</span>
              </div>
            </div>

            <div className="flex justify-center space-x-4">
              <Link 
                to="/projects"
                className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-3 rounded-lg hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1"
              >
                View Projects
              </Link>
              <Link 
                to="/contact"
                className="border-2 border-blue-600 text-blue-600 px-8 py-3 rounded-lg hover:bg-blue-600 hover:text-white transition-all duration-300"
              >
                Get In Touch
              </Link>
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
            {featuredProjects.map(project => (
              <ProjectCard
                key={project.id}
                project={project}
                onClick={() => navigate(`/projects`)}
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
};

export default HomePage;