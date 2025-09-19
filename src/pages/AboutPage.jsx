import React from 'react';
import { User, Mail, Github, MapPin, Award } from 'lucide-react';
import { useAppContext } from '../context/AppContext';
import { education, certifications } from '../data/experience';

const AboutPage = () => {
  const { user } = useAppContext();

  return (
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
              <h3 className="text-2xl font-semibold mb-4 text-gray-800">{user.title}</h3>
              <p className="text-gray-600 mb-6 leading-relaxed">
                Experienced Frontend Developer with 3+ years of expertise in React, Next.js, and cloud deployment. 
                Proven track record in building scalable enterprise applications, modernizing legacy systems, 
                and implementing CI/CD automation. Specialized in performance optimization, UI/UX engineering, 
                and Azure cloud infrastructure with Docker containerization.
              </p>
              
              <div className="space-y-3 mb-6">
                <div className="flex items-center">
                  <User className="mr-3 text-blue-600" size={20} />
                  <span className="font-medium">{user.name}</span>
                </div>
                <div className="flex items-center">
                  <Mail className="mr-3 text-blue-600" size={20} />
                  <span>{user.email}</span>
                </div>
                <div className="flex items-center">
                  <Github className="mr-3 text-blue-600" size={20} />
                  <span>{user.github}</span>
                </div>
                <div className="flex items-center">
                  <MapPin className="mr-3 text-blue-600" size={20} />
                  <span>{user.location}</span>
                </div>
              </div>

              <div className="mb-6">
                <h4 className="font-semibold mb-3 text-gray-800">Education</h4>
                <div className="space-y-2 text-sm">
                  {education.map((edu, idx) => (
                    <div key={idx}>
                      <div className="font-medium">{edu.degree}</div>
                      <div className="text-gray-600">{edu.institution} ({edu.duration}) • {edu.score}</div>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="font-semibold mb-3 text-gray-800">Certifications</h4>
                <div className="space-y-1 text-sm text-gray-600">
                  {certifications.map((cert, idx) => (
                    <div key={idx} className="flex items-center">
                      <Award size={16} className="mr-2 text-yellow-500" />
                      {cert}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;