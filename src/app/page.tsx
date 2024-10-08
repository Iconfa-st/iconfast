// pages/index.tsx
"use client";
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { saveAs } from 'file-saver';
import NavBar from '@/components/Navbar';
import Footer from '@/components/Footer';
import PricingSection from "@/components/PricingSection";
import { motion } from 'framer-motion';
import FeaturesSection from "@/components/FeaturesSection";
import IconsList from "@/components/dashboard/IconsList";
import {checkAuth} from "@/utils/auth/auth";


export default function IconsFast() {
    const [svgFile, setSvgFile] = useState<File | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [downloadLink, setDownloadLink] = useState<string | null>(null);
    const [authenticated, setAuthenticated] = useState(false);

    useEffect(() => {
        checkAuth().then((res) => {
            setAuthenticated(!!res);
        });
    }, []);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!svgFile) {
            setError('Please upload an SVG file.');
            return;
        }

        setLoading(true);
        setError('');
        setDownloadLink(null);

        try {
            const formData = new FormData();
            formData.append('svg', svgFile);

            const response = await axios.post('/api/generate-icons', formData, {
                responseType: 'blob',
            });

            // Create a Blob from the response
            const blob = new Blob([response.data], { type: 'application/zip' });
            saveAs(blob, 'icons.zip');

            setLoading(false);
            // Optional: Provide download link
            // const url = URL.createObjectURL(blob);
            // setDownloadLink(url);
        } catch (err) {
            console.error(err);
            setError('An error occurred while generating icons.');
            setLoading(false);
        }
    };

    return (
        <div className="flex flex-col min-h-screen">
            {/* Navigation Bar */}
            <NavBar authenticated={authenticated}/>

            {/* Hero Section */}
            <motion.header
                className="flex-grow bg-gray-900 text-white"
                initial={{ opacity: 0, y: -50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: 'easeOut' }}
            >
                <div className="max-w-7xl mx-auto px-6 py-20 flex flex-col items-center justify-center text-center">
                    <motion.h1
                        className="text-5xl md:text-7xl font-extrabold mb-6"
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ duration: 0.6, delay: 0.2, ease: 'easeOut' }}
                    >
                        Convert Your SVGs in <span className="text-purple-600">One Click</span>
                    </motion.h1>
                    <motion.p
                        className="text-xl md:text-3xl mb-12"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.6, delay: 0.4, ease: 'easeOut' }}
                    >
                        Transform your SVG files into all the icons you need in seconds.
                    </motion.p>

                    {/* Conversion Interface */}
                    <div>
                        <IconsList svgFile={svgFile} setSvgFile={setSvgFile} setError={setError} setDownloadLink={setDownloadLink} />
                    </div>

                    {svgFile && (
                        <motion.p
                            className="text-sm text-center text-gray-700 mt-4"
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.8 }}
                        >
                            Selected File: <span className="font-medium">{svgFile.name}</span>
                        </motion.p>
                    )}

                    <form onSubmit={handleSubmit} className="w-full max-w-md mt-6">
                        <motion.button
                            type="submit"
                            disabled={loading}
                            className={`w-full font-bold py-3 px-6 rounded-md text-white 
                                ${loading
                                ? 'bg-gray-400 cursor-not-allowed'
                                : 'bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700'}`
                            }
                            whileHover={!loading ? { scale: 1.05 } : undefined}
                            whileTap={!loading ? { scale: 0.95 } : undefined}
                        >
                            <span className="inline-block transform transition-transform duration-300 group-hover:scale-105">
                                {loading ? 'Generating Icons...' : 'Generate Icons'}
                            </span>
                        </motion.button>
                    </form>

                    {error && (
                        <p className="mt-4 text-sm text-red-600 text-center">
                            {error}
                        </p>
                    )}

                    {/* Optional Download Link */}
                    {/* {downloadLink && (
                        <motion.a
                            href={downloadLink}
                            download="icons.zip"
                            className="mt-6 inline-block bg-green-500 text-white px-6 py-3 rounded hover:bg-green-600 transition text-center w-full"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            Download File
                        </motion.a>
                    )} */}
                </div>
            </motion.header>

            {/* Features Section */}
            <FeaturesSection/>

            {/* Pricing Section */}
            <PricingSection/>

            {/* Footer */}
            <Footer/>
        </div>
    );
}
