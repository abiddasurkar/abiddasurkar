import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Github, Mail, Phone, MapPin, Linkedin, Twitter, ExternalLink, Heart } from 'lucide-react';
import { useAppContext } from '../../context/AppContext';

const Footer = () => {
  const { user } = useAppContext();
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());

  const quickLinks = [
    { path: '/about', label: 'About' },
    { path: '/projects', label: 'Projects' },
    { path: '/experience', label: 'Experience' },
    { path: '/contact', label: 'Contact' }
  ];

  const socialLinks = [
    { icon: Github, href: user.githubUrl, label: 'GitHub' },
    { icon: Linkedin, href: user.linkedinUrl, label: 'LinkedIn' },
    { icon: Twitter, href: user.twitterUrl, label: 'Twitter' },
    { icon: Mail, href: `mailto:${user.email}`, label: 'Email' }
  ];

  // Update year on component mount
  useEffect(() => {
    setCurrentYear(new Date().getFullYear());
  }, []);

  return (
    <footer className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white pt-16 pb-8 overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500"></div>
      <div className="absolute -bottom-20 -right-20 w-40 h-40 rounded-full bg-blue-500/10 blur-3xl"></div>
      <div className="absolute -top-20 -left-20 w-40 h-40 rounded-full bg-purple-500/10 blur-3xl"></div>
      
      <div className="max-w-6xl mx-auto px-4 relative z-10">
        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {/* Brand section */}
          <div className="md:col-span-1">
            <h3 className="text-2xl font-bold mb-4 bg-gradient-to-r from-blue-300 to-purple-300 bg-clip-text text-transparent">
              {user.name}
            </h3>
            <p className="text-gray-300 mb-6 leading-relaxed">
              {user.tagline || "Frontend Developer specializing in React, Next.js, and Azure cloud solutions."}
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((social, index) => (
                social.href && (
                  <a
                    key={index}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-700 hover:bg-gradient-to-r hover:from-blue-600 hover:to-purple-600 transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg group"
                    aria-label={social.label}
                  >
                    <social.icon size={18} className="group-hover:text-white transition-colors" />
                  </a>
                )
              ))}
            </div>
          </div>
          
          {/* Quick Links */}
          <div className="md:col-span-1">
            <h4 className="text-lg font-semibold mb-6 pb-2 border-b border-gray-700 inline-block">Quick Links</h4>
            <ul className="space-y-3">
              {quickLinks.map(link => (
                <li key={link.path}>
                  <Link 
                    to={link.path} 
                    className="flex items-center text-gray-300 hover:text-blue-400 transition-all duration-300 group py-1"
                  >
                    <ExternalLink size={14} className="mr-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                    <span className="group-hover:translate-x-1 transition-transform">{link.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Contact Info */}
          <div className="md:col-span-1">
            <h4 className="text-lg font-semibold mb-6 pb-2 border-b border-gray-700 inline-block">Get In Touch</h4>
            <ul className="space-y-4">
              <li className="flex items-start">
                <Mail size={18} className="mr-3 mt-1 text-blue-400 flex-shrink-0" />
                <a href={`mailto:${user.email}`} className="text-gray-300 hover:text-blue-400 transition-colors break-all">
                  {user.email}
                </a>
              </li>
              <li className="flex items-start">
                <Phone size={18} className="mr-3 mt-1 text-blue-400 flex-shrink-0" />
                <a href={`tel:${user.phone}`} className="text-gray-300 hover:text-blue-400 transition-colors">
                  {user.phone}
                </a>
              </li>
              <li className="flex items-start">
                <MapPin size={18} className="mr-3 mt-1 text-blue-400 flex-shrink-0" />
                <span className="text-gray-300">{user.location}</span>
              </li>
            </ul>
          </div>
        </div>
        
        {/* Copyright section */}
        <div className="border-t border-gray-700 pt-8 text-center">
          <p className="text-gray-400 mb-2 flex items-center justify-center">
            &copy; {currentYear} {user.name}. All rights reserved.
          </p>
          <p className="text-sm text-gray-500 flex items-center justify-center">
            Made with <Heart size={14} className="mx-1 text-red-500 fill-current" /> using React & Tailwind CSS
          </p>
          
          {/* Back to top button */}
          <button 
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="mt-6 mx-auto flex items-center justify-center w-10 h-10 rounded-full bg-gray-700 hover:bg-gradient-to-r hover:from-blue-600 hover:to-purple-600 transition-all duration-300 transform hover:-translate-y-1"
            aria-label="Back to top"
          >
            ↑
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;