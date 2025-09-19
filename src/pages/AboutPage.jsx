import React, { useState } from 'react';
import { Mail, Github, Linkedin, MapPin, Award, Download, Calendar, BookOpen, ChevronDown, ChevronUp, ExternalLink, User } from 'lucide-react';
import { useAppContext } from '../context/AppContext';
import { education, certifications, skills } from '../data/experience';

const AboutPage = () => {
  const { user } = useAppContext();
  const [activeTab, setActiveTab] = useState('skills');
  const [expandedCert, setExpandedCert] = useState(false);
  const [imageError, setImageError] = useState(false); // Define imageError state

// Paths to files in public folder
const resumePath = process.env.PUBLIC_URL + '/AbidDasurkar_Frontend_NextJS_Developer.pdf';
const resumeFileName = 'AbidDasurkar_Frontend_NextJS_Developer.pdf';
const profileImagePath = process.env.PUBLIC_URL + '/user.jpg';

  
  // Toggle certifications expansion
  const toggleCertifications = () => {
    setExpandedCert(!expandedCert);
  };

  // Handle image loading errors - Define this function
  const handleImageError = () => {
    setImageError(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-16 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            About <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Me</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Get to know my journey, skills, and what drives me as a developer
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="grid lg:grid-cols-3 gap-8 p-8">
            {/* Profile Section */}
            <div className="lg:col-span-1">
              <div className="text-center lg:text-left mb-8">
{/* Profile Image */}
<div className="relative inline-block mb-6">
  <div className="w-56 h-56 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full mx-auto flex items-center justify-center shadow-lg overflow-hidden">
    {imageError ? (
      // Fallback if image fails to load
      <div className="w-full h-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center">
        <span className="text-white text-4xl font-bold">
          {user.name.split(' ').map(n => n[0]).join('')}
        </span>
      </div>
    ) : (
      <img
  src={profileImagePath}
  alt={`${user.name} - ${user.title}`}
  className="w-full h-full object-cover"
  onLoad={() => console.log("✅ Image loaded:", profileImagePath)}
  onError={(e) => {
    console.error("❌ Image failed to load:", profileImagePath, e);
    setImageError(true);
  }}
  loading="lazy"
/>
    )}
  </div>
  <div className="absolute -bottom-2 -right-2 bg-blue-500 text-white px-4 py-1 rounded-full text-sm font-medium shadow-md">
    {user.title}
  </div>
</div>

                <h2 className="text-2xl font-bold text-gray-800 mb-2">{user.name}</h2>
                <p className="text-gray-600 mb-6">{user.tagline || "Frontend Developer & UI/UX Enthusiast"}</p>

                {/* Contact Info */}
                <div className="space-y-3 mb-6">
                  <a href={`mailto:${user.email}`} className="flex items-center text-gray-700 hover:text-blue-600 transition-colors group">
                    <Mail className="mr-3 text-blue-500 group-hover:scale-110 transition-transform" size={20} />
                    <span>{user.email}</span>
                  </a>
                  {user.github && (
                    <a href={user.github} target="_blank" rel="noopener noreferrer" className="flex items-center text-gray-700 hover:text-blue-600 transition-colors group">
                      <Github className="mr-3 text-blue-500 group-hover:scale-110 transition-transform" size={20} />
                      <span>GitHub Profile</span>
                    </a>
                  )}
                  {user.linkedin && (
                    <a href={user.linkedin} target="_blank" rel="noopener noreferrer" className="flex items-center text-gray-700 hover:text-blue-600 transition-colors group">
                      <Linkedin className="mr-3 text-blue-500 group-hover:scale-110 transition-transform" size={20} />
                      <span>LinkedIn Profile</span>
                    </a>
                  )}
                  <div className="flex items-center text-gray-700">
                    <MapPin className="mr-3 text-blue-500" size={20} />
                    <span>{user.location}</span>
                  </div>
                </div>

                {/* Download Resume Button */}
                <a 
                  href={resumePath} 
                  download={resumeFileName}
                  className="block w-full bg-gradient-to-r from-blue-500 to-purple-500 text-white py-3 px-6 rounded-lg font-medium hover:from-blue-600 hover:to-purple-600 transition-all duration-300 transform hover:-translate-y-1 shadow-md hover:shadow-lg flex items-center justify-center"
                >
                  <Download size={20} className="mr-2" />
                  Download Resume
                </a>
              </div>
            </div>

            {/* Content Section */}
            <div className="lg:col-span-2">
              {/* Bio Section */}
              <div className="mb-8">
                <h3 className="text-2xl font-semibold text-gray-800 mb-4 border-b border-gray-200 pb-2">My Story</h3>
                <p className="text-gray-600 leading-relaxed mb-4">
                  {user.bio || `Experienced Frontend Developer with 3+ years of expertise in React, Next.js, and cloud deployment. 
                  Proven track record in building scalable enterprise applications, modernizing legacy systems, 
                  and implementing CI/CD automation. Specialized in performance optimization, UI/UX engineering, 
                  and Azure cloud infrastructure with Docker containerization.`}
                </p>
                <p className="text-gray-600 leading-relaxed">
                  Passionate about creating intuitive user experiences and solving complex problems through clean, 
                  efficient code. Always eager to learn new technologies and methodologies to stay at the forefront 
                  of web development.
                </p>
              </div>

              {/* Skills & Education Tabs */}
              <div className="mb-8">
                <div className="flex border-b border-gray-200 mb-6">
                  <button
                    onClick={() => setActiveTab('skills')}
                    className={`px-4 py-2 font-medium text-sm transition-all duration-300 ${
                      activeTab === 'skills' 
                        ? 'text-blue-600 border-b-2 border-blue-600' 
                        : 'text-gray-500 hover:text-gray-700'
                    }`}
                  >
                    Skills & Expertise
                  </button>
                  <button
                    onClick={() => setActiveTab('education')}
                    className={`px-4 py-2 font-medium text-sm transition-all duration-300 ${
                      activeTab === 'education' 
                        ? 'text-blue-600 border-b-2 border-blue-600' 
                        : 'text-gray-500 hover:text-gray-700'
                    }`}
                  >
                    Education
                  </button>
                </div>

                {/* Skills Tab */}
                {activeTab === 'skills' && (
                  <div className="grid md:grid-cols-2 gap-6 animate-fadeIn">
                    {skills.map((skillCategory, index) => (
                      <div key={index} className="bg-gray-50 rounded-lg p-4">
                        <h4 className="font-semibold text-gray-800 mb-3 flex items-center">
                          <skillCategory.icon className="mr-2 text-blue-500" size={18} />
                          {skillCategory.category}
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {skillCategory.items.map((skill, idx) => (
                            <span 
                              key={idx} 
                              className="px-3 py-1 bg-white border border-gray-200 rounded-full text-sm text-gray-700 shadow-sm hover:shadow-md transition-shadow"
                            >
                              {skill}
                            </span>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* Education Tab */}
                {activeTab === 'education' && (
                  <div className="space-y-6 animate-fadeIn">
                    {education.map((edu, idx) => (
                      <div key={idx} className="flex items-start">
                        <div className="bg-blue-100 p-3 rounded-lg mr-4">
                          <BookOpen className="text-blue-600" size={20} />
                        </div>
                        <div className="flex-1">
                          <h4 className="font-semibold text-gray-800">{edu.degree}</h4>
                          <p className="text-gray-600">{edu.institution}</p>
                          <div className="flex items-center text-sm text-gray-500 mt-1">
                            <Calendar size={14} className="mr-1" />
                            {edu.duration} • {edu.score}
                          </div>
                          {edu.description && (
                            <p className="text-gray-600 text-sm mt-2">{edu.description}</p>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Certifications Section */}
              <div>
                <h3 className="text-2xl font-semibold text-gray-800 mb-4 border-b border-gray-200 pb-2">Certifications</h3>
                <div className={`space-y-3 ${expandedCert ? '' : 'max-h-48 overflow-hidden'}`}>
                  {certifications.map((cert, idx) => (
                    <div key={idx} className="flex items-center justify-between bg-gray-50 p-4 rounded-lg hover:bg-gray-100 transition-colors">
                      <div className="flex items-center">
                        <Award size={20} className="text-yellow-500 mr-3 flex-shrink-0" />
                        <span className="text-gray-700">{cert.name}</span>
                      </div>
                      {cert.url && (
                        <a 
                          href={cert.url} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:text-blue-800 ml-2 flex items-center"
                          aria-label={`View ${cert.name} certification`}
                        >
                          <ExternalLink size={16} />
                        </a>
                      )}
                    </div>
                  ))}
                </div>
                {certifications.length > 3 && (
                  <button
                    onClick={toggleCertifications}
                    className="flex items-center text-blue-600 hover:text-blue-800 mt-4 text-sm font-medium transition-colors"
                  >
                    {expandedCert ? (
                      <>
                        <ChevronUp size={16} className="mr-1" />
                        Show Less
                      </>
                    ) : (
                      <>
                        <ChevronDown size={16} className="mr-1" />
                        Show All ({certifications.length})
                      </>
                    )}
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Animation styles */}
      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.5s ease-out;
        }
      `}</style>
    </div>
  );
};

export default AboutPage;