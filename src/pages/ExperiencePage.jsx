import React from 'react';
import { Calendar, Code, Zap } from 'lucide-react';
import { experience } from '../data/experience';
import { skillCategories } from '../data/skills';

const ExperiencePage = () => {
  return (
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
};

export default ExperiencePage;