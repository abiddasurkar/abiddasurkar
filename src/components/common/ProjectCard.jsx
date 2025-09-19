import React from 'react';
import { ExternalLink, Zap } from 'lucide-react';

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

export default ProjectCard;