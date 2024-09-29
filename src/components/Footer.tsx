// components/Footer.js
import React from 'react';

const Footer = () => {
    return (
        <footer className="bg-gradient-to-r from-blue-800 to-purple-600 text-white py-8">
            <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center">
                <p className="mb-4 md:mb-0">&copy; {new Date().getFullYear()} IconsFast. All rights reserved.</p>
                <div className="flex space-x-6">
                    <a href="#" className="hover:text-cyan-400 transition-colors duration-300">
                        Privacy Policy
                    </a>
                    <a href="#" className="hover:text-cyan-400 transition-colors duration-300">
                        Terms of Service
                    </a>
                    <a href="#" className="hover:text-cyan-400 transition-colors duration-300">
                        Contact
                    </a>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
