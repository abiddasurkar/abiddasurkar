import React from 'react';
import { Mail, Phone } from 'lucide-react';
import { useAppContext } from '../context/AppContext';

const ContactPage = () => {
  const { user, contactForm, updateContactForm, resetContactForm } = useAppContext();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    updateContactForm({ [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission here
    console.log('Form submitted:', contactForm);
    alert('Message sent successfully!');
    resetContactForm();
  };

  return (
    <div className="min-h-screen bg-gray-50 py-20">
      <div className="max-w-2xl mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-12 text-gray-800">Contact Me</h2>
        <div className="bg-white rounded-xl shadow-lg p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Name</label>
              <input 
                type="text" 
                name="name"
                value={contactForm.name}
                onChange={handleInputChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
              <input 
                type="email" 
                name="email"
                value={contactForm.email}
                onChange={handleInputChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Message</label>
              <textarea 
                rows={5} 
                name="message"
                value={contactForm.message}
                onChange={handleInputChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
            </div>
            <button 
              type="submit" 
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 px-6 rounded-lg hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1"
            >
              Send Message
            </button>
          </form>
          
          <div className="mt-8 pt-8 border-t border-gray-200">
            <div className="grid md:grid-cols-2 gap-4 text-center">
              <div className="flex items-center justify-center">
                <Mail className="mr-2 text-blue-600" size={20} />
                <span>{user.email}</span>
              </div>
              <div className="flex items-center justify-center">
                <Phone className="mr-2 text-blue-600" size={20} />
                <span>{user.phone}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;