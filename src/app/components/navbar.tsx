// components/Navbar.js
import React from 'react';

const Navbar = () => {
    return (
        <nav className="bg-white shadow-md">
            <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
                <div className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-red-600">
                    IconsFast
                </div>
                <div className="flex space-x-6">
                    <a href="#features" className="text-gray-600 hover:underline hover:scale-105 px-3 py-2 rounded-md transition">
                        Features
                    </a>
                    <a href="#" className="text-gray-600 hover:underline hover:scale-105 px-3 py-2 rounded-md transition">
                        Pricing
                    </a>
                    <button className="px-4 py-2 bg-gradient-to-r from-yellow-400 to-red-600 text-white rounded-md hover:from-yellow-500 hover:to-red-700 transition">
                        Login
                    </button>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
