import React from 'react';
import { Link } from 'react-router-dom';
import { Github, Mail, Phone, MapPin } from 'lucide-react';
import { useAppContext } from '../../context/AppContext';

const Footer = () => {
  const { user } = useAppContext();

  const quickLinks = [
    { path: '/about', label: 'About' },
    { path: '/projects', label: 'Projects' },
    { path: '/experience', label: 'Experience' },
    { path: '/contact', label: 'Contact' }
  ];

  return (
    <footer className="bg-gradient-to-r from-gray-900 to-gray-800 text-white py-12">
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">{user.name}</h3>
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
              {quickLinks.map(link => (
                <li key={link.path}>
                  <Link 
                    to={link.path} 
                    className="hover:text-blue-400 transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4">Contact Info</h4>
            <ul className="space-y-2 text-gray-300 text-sm">
              <li className="flex items-center">
                <Mail size={16} className="mr-2" />
                {user.email}
              </li>
              <li className="flex items-center">
                <Phone size={16} className="mr-2" />
                {user.phone}
              </li>
              <li className="flex items-center">
                <MapPin size={16} className="mr-2" />
                {user.location}
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; 2024 {user.name}. Built with React & Tailwind CSS.</p>
          <p className="text-sm mt-2">Frontend Developer Portfolio - Showcasing 3+ Years of Experience</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;