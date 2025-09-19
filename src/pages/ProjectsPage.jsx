import React from 'react';
import ProjectCard from '../components/common/ProjectCard';
import { projects } from '../data/projects';

const ProjectsPage = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-20">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-12 text-gray-800">All Projects</h2>
        <div className="grid md:grid-cols-2 gap-8">
          {projects.map(project => (
            <ProjectCard
              key={project.id}
              project={project}
              onClick={() => {
                // Could navigate to individual project detail page
                console.log(`View details for ${project.title}`);
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProjectsPage;