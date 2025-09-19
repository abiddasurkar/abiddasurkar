import React, { useState } from 'react';
import { ExternalLink, Zap, Github, ArrowRight, Calendar, Clock, Users } from 'lucide-react';

const ProjectCard = ({ project, onClick, viewMode = 'grid' }) => {
  const [isHovered, setIsHovered] = useState(false);
  const Icon = project.icon;
  
  // List View Layout
  if (viewMode === 'list') {
    return (
      <div 
        className="group bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-all duration-300 cursor-pointer border border-gray-100 flex flex-col md:flex-row gap-6 items-start"
        onClick={onClick}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Icon/Image Section */}
        <div className="flex-shrink-0">
          <div className={`p-4 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl transition-transform duration-300 ${isHovered ? 'rotate-6 scale-105' : ''}`}>
            <Icon className="text-white" size={32} />
          </div>
        </div>
        
        {/* Content Section */}
        <div className="flex-grow">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-3">
            <h3 className="text-xl font-bold text-gray-800 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-blue-600 group-hover:to-purple-600 transition-all duration-500">
              {project.title}
            </h3>
            
            {/* Project Metadata */}
            <div className="flex items-center gap-4 mt-2 md:mt-0">
              {project.date && (
                <div className="flex items-center text-sm text-gray-500">
                  <Calendar size={14} className="mr-1" />
                  {project.date}
                </div>
              )}
              {project.duration && (
                <div className="flex items-center text-sm text-gray-500">
                  <Clock size={14} className="mr-1" />
                  {project.duration}
                </div>
              )}
            </div>
          </div>
          
          <p className="text-gray-600 mb-4 leading-relaxed">
            {project.description}
          </p>
          
          {/* Tech Stack */}
          <div className="flex flex-wrap gap-2 mb-4">
            {project.tech.split(', ').map((tech, idx) => (
              <span 
                key={idx} 
                className="px-3 py-1 bg-gradient-to-r from-blue-50 to-purple-50 text-blue-700 rounded-full text-sm font-medium border border-blue-100"
              >
                {tech}
              </span>
            ))}
          </div>
          
          {/* Highlights */}
          <div className="space-y-1 mb-4">
            {project.highlights.slice(0, 2).map((highlight, idx) => (
              <div key={idx} className="flex items-start text-sm text-gray-600">
                <Zap size={14} className="text-yellow-500 mr-2 mt-0.5 flex-shrink-0" />
                <span>{highlight}</span>
              </div>
            ))}
          </div>
        </div>
        
        {/* Action Section */}
        <div className="flex-shrink-0 flex flex-col items-end gap-3">
          <div className="flex items-center text-blue-600 group-hover:text-blue-700 font-medium text-sm transition-colors duration-300">
            View details
            <ArrowRight size={16} className="ml-1 group-hover:translate-x-1 transition-transform duration-300" />
          </div>
          
          {/* External links */}
          <div className="flex space-x-2">
            {project.githubUrl && (
              <a 
                href={project.githubUrl} 
                onClick={(e) => e.stopPropagation()}
                target="_blank" 
                rel="noopener noreferrer"
                className="p-2 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors duration-300"
                aria-label="View code on GitHub"
              >
                <Github size={18} className="text-gray-700" />
              </a>
            )}
            
            {project.liveUrl && (
              <a 
                href={project.liveUrl} 
                onClick={(e) => e.stopPropagation()}
                target="_blank" 
                rel="noopener noreferrer"
                className="p-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg hover:from-blue-600 hover:to-purple-600 transition-all duration-300 shadow-sm hover:shadow-md"
                aria-label="View live project"
              >
                <ExternalLink size={18} className="text-white" />
              </a>
            )}
          </div>
        </div>
      </div>
    );
  }

  // Grid View Layout (Original with enhancements)
  return (
    <div 
      className="group bg-white rounded-2xl shadow-lg p-6 hover:shadow-2xl transition-all duration-500 cursor-pointer border border-gray-100 overflow-hidden relative h-full flex flex-col"
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        transform: isHovered ? 'translateY(-8px) scale(1.02)' : 'translateY(0) scale(1)'
      }}
    >
      {/* Gradient accent bar */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500"></div>
      
      {/* Project status badge */}
      {project.status && (
        <div className="absolute top-4 right-4">
          <span className={`px-3 py-1 rounded-full text-xs font-medium ${
            project.status === 'Completed' 
              ? 'bg-green-100 text-green-800' 
              : project.status === 'In Progress'
              ? 'bg-blue-100 text-blue-800'
              : 'bg-yellow-100 text-yellow-800'
          }`}>
            {project.status}
          </span>
        </div>
      )}
      
      {/* Header with icon and title */}
      <div className="flex items-center mb-5">
        <div className={`p-3 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl mr-4 transition-transform duration-300 ${isHovered ? 'rotate-12 scale-110' : ''}`}>
          <Icon className="text-white" size={28} />
        </div>
        <h3 className="text-xl font-bold text-gray-800 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-blue-600 group-hover:to-purple-600 transition-all duration-500">
          {project.title}
        </h3>
      </div>
      
      {/* Description */}
      <p className="text-gray-600 mb-5 leading-relaxed transition-all duration-300 group-hover:text-gray-800 flex-grow">
        {project.description}
      </p>
      
      {/* Project metadata (grid view only) */}
      {(project.date || project.duration || project.team) && (
        <div className="flex items-center gap-4 mb-4 text-sm text-gray-500">
          {project.date && (
            <div className="flex items-center">
              <Calendar size={14} className="mr-1" />
              {project.date}
            </div>
          )}
          {project.duration && (
            <div className="flex items-center">
              <Clock size={14} className="mr-1" />
              {project.duration}
            </div>
          )}
          {project.team && (
            <div className="flex items-center">
              <Users size={14} className="mr-1" />
              {project.team}
            </div>
          )}
        </div>
      )}
      
      {/* Tech stack badges */}
      <div className="mb-5">
        <div className="flex flex-wrap gap-2">
          {project.tech.split(', ').map((tech, idx) => (
            <span 
              key={idx} 
              className="px-3 py-1 bg-gradient-to-r from-blue-50 to-purple-50 text-blue-700 rounded-full text-sm font-medium border border-blue-100 transition-all duration-300 group-hover:border-blue-200 group-hover:from-blue-100 group-hover:to-purple-100 group-hover:shadow-sm"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>
      
      {/* Project highlights */}
      <div className="space-y-2 mb-6">
        {project.highlights.map((highlight, idx) => (
          <div key={idx} className="flex items-start text-sm text-gray-600 group-hover:text-gray-700 transition-colors duration-300">
            <Zap size={14} className="text-yellow-500 mr-2 mt-0.5 flex-shrink-0" />
            <span>{highlight}</span>
          </div>
        ))}
      </div>
      
      {/* Action area */}
      <div className="flex justify-between items-center pt-4 border-t border-gray-100 group-hover:border-gray-200 transition-colors duration-300 mt-auto">
        <div className="flex items-center text-blue-600 group-hover:text-blue-700 font-medium text-sm transition-colors duration-300">
          View details
          <ArrowRight size={16} className="ml-1 group-hover:translate-x-1 transition-transform duration-300" />
        </div>
        
        {/* External links */}
        <div className="flex space-x-2">
          {project.githubUrl && (
            <a 
              href={project.githubUrl} 
              onClick={(e) => e.stopPropagation()}
              target="_blank" 
              rel="noopener noreferrer"
              className="p-2 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors duration-300 group/github"
              aria-label="View code on GitHub"
            >
              <Github size={18} className="text-gray-700 group-hover/github:text-gray-900 transition-colors duration-300" />
            </a>
          )}
          
          {project.liveUrl && (
            <a 
              href={project.liveUrl} 
              onClick={(e) => e.stopPropagation()}
              target="_blank" 
              rel="noopener noreferrer"
              className="p-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg hover:from-blue-600 hover:to-purple-600 transition-all duration-300 group/live shadow-sm hover:shadow-md"
              aria-label="View live project"
            >
              <ExternalLink size={18} className="text-white" />
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;