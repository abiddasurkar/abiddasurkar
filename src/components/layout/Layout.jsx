import React, { useEffect, useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Navbar from '../common/Navbar';
import Footer from '../common/Footer';
import ScrollToTop from '../common/ScrollToTop';

const Layout = () => {
  const location = useLocation();
  const [isPageLoaded, setIsPageLoaded] = useState(false);
  
  // Handle page load and route change animations
  useEffect(() => {
    setIsPageLoaded(false);
    
    const timer = setTimeout(() => {
      setIsPageLoaded(true);
    }, 100);
    
    // Scroll to top on route change except when there's a hash in URL
    if (!location.hash) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
    
    return () => clearTimeout(timer);
  }, [location.pathname]);
  
  return (
    <div className="font-sans min-h-screen flex flex-col bg-gradient-to-br from-gray-50 to-gray-100">
      <Navbar />
      
      <main className={`flex-grow transition-opacity duration-500 ${isPageLoaded ? 'opacity-100' : 'opacity-0'}`}>
        <Outlet />
      </main>
      
      <Footer />
      
      {/* Scroll to top button */}
      <ScrollToTop />
      
      {/* Background decorative elements */}
      <div className="fixed -z-10 top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-blue-100 rounded-full opacity-20 blur-3xl animate-pulse-slow"></div>
        <div className="absolute bottom-1/3 right-1/4 w-96 h-96 bg-purple-100 rounded-full opacity-20 blur-3xl animate-pulse-slower"></div>
      </div>
    </div>
  );
};

export default Layout;