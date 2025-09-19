import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAppContext } from '../../context/AppContext';

const Navbar = () => {
  const { user } = useAppContext();
  const location = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Detect scroll for navbar style change
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);

  const navItems = [
    { path: '/', label: 'Home', icon: '🏠' },
    { path: '/about', label: 'About', icon: '👤' },
    { path: '/projects', label: 'Projects', icon: '💼' },
    { path: '/experience', label: 'Experience', icon: '📈' },
    { path: '/contact', label: 'Contact', icon: '📞' }
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <>
      <nav className={`fixed w-full top-0 z-50 transition-all duration-500 ${isScrolled 
        ? 'bg-gradient-to-r from-indigo-900/95 to-purple-900/95 backdrop-blur-md py-2 shadow-xl' 
        : 'bg-gradient-to-r from-indigo-900 to-purple-900 py-4'
      }`}>
        <div className="max-w-6xl mx-auto px-4 flex justify-between items-center">
          {/* Logo/Name */}
          <Link 
            to="/" 
            className="text-xl font-bold bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent flex items-center space-x-2"
          >
            <span className="text-white text-2xl">✨</span>
            <span>{user.name}</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-1">
            {navItems.map(item => (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center space-x-1 hover:text-blue-300 transition-all duration-300 px-4 py-2 rounded-lg group ${
                  isActive(item.path) 
                    ? 'text-blue-300 bg-white/10 backdrop-blur-sm' 
                    : 'text-white/90'
                }`}
              >
                <span className="text-sm opacity-80 group-hover:opacity-100">{item.icon}</span>
                <span className="text-sm font-medium">{item.label}</span>
              </Link>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <button 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden flex flex-col space-y-1.5 p-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors"
            aria-label="Toggle navigation menu"
          >
            <span className={`w-6 h-0.5 bg-white transition-transform duration-300 ${isMobileMenuOpen ? 'rotate-45 translate-y-2' : ''}`}></span>
            <span className={`w-6 h-0.5 bg-white transition-opacity duration-300 ${isMobileMenuOpen ? 'opacity-0' : 'opacity-100'}`}></span>
            <span className={`w-6 h-0.5 bg-white transition-transform duration-300 ${isMobileMenuOpen ? '-rotate-45 -translate-y-2' : ''}`}></span>
          </button>
        </div>

        {/* Mobile Navigation */}
        <div className={`md:hidden bg-indigo-900/95 backdrop-blur-lg transition-all duration-500 overflow-hidden ${isMobileMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
          <div className="flex flex-col space-y-2 p-4">
            {navItems.map(item => (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center space-x-3 hover:text-blue-300 transition-all duration-300 px-4 py-3 rounded-lg text-lg ${
                  isActive(item.path) 
                    ? 'text-blue-300 bg-white/10' 
                    : 'text-white/90'
                }`}
              >
                <span className="text-lg">{item.icon}</span>
                <span className="font-medium">{item.label}</span>
              </Link>
            ))}
          </div>
        </div>
      </nav>
      
      {/* Spacer to prevent content from being hidden behind fixed navbar */}
      <div className="h-16 md:h-20"></div>
    </>
  );
};

export default Navbar;