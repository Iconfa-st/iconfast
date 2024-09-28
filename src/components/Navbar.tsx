// components/Navbar.js
import React from 'react';

interface NavbarProps {
    authenticated?: boolean;
}

const Navbar = (props: NavbarProps) => {
    return (
        <nav className="bg-gray-800 shadow-md text-white">
            <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
                {/* Logo */}
                <div onClick={() => window.location.href="/"} className="text-3xl font-bold hover:cursor-pointer">
                    Icons<span className="text-purple-600">Fast</span>
                </div>

                {/* Navigation Links */}
                <div className="flex space-x-6 items-center">
                    <a href="#features" className="transition-colors duration-300 hover:underline">
                        Features
                    </a>
                    <a href="#pricing" className="transition-colors duration-300 hover:underline">
                        Pricing
                    </a>
                    <a href="/dashboard" className="transition-colors duration-300 hover:underline">
                        Dashboard
                    </a>
                    {props.authenticated ? (
                            <button onClick={() => (window.location.href = "/auth/signout")}
                                    className="px-4 py-2 text-purple-600 border-2 border-purple-600 border-solid font-semibold rounded-md transition-colors duration-300">
                                Logout
                            </button>
                        )
                        : (
                            <button onClick={() => (window.location.href = "/auth/signin")}
                                    className="px-4 py-2 text-purple-600 border-2 border-purple-600 border-solid font-semibold rounded-md transition-colors duration-300">
                                Login
                            </button>
                        )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
