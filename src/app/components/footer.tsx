// components/Footer.js
import React from 'react';

const Footer = () => {
    return (
        <footer className="bg-gray-800 text-gray-300 py-6">
            <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center">
                <p>&copy; {new Date().getFullYear()} IconsFast. All rights reserved.</p>
                <div className="flex space-x-4 mt-4 md:mt-0">
                    <a href="#" className="hover:text-white transition">
                        Privacy Policy
                    </a>
                    <a href="#" className="hover:text-white transition">
                        Terms of Service
                    </a>
                    <a href="#" className="hover:text-white transition">
                        Contact
                    </a>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
