// pages/index.js
"use client";
import React, { useState } from 'react';
import axios from 'axios';
import { useDropzone } from 'react-dropzone';
import { saveAs } from 'file-saver';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';

export default function IconsFast() {
    const [svgFile, setSvgFile] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [downloadLink, setDownloadLink] = useState(null);

    const onDrop = (acceptedFiles) => {
        if (acceptedFiles.length > 0) {
            setSvgFile(acceptedFiles[0]);
            setError('');
            setDownloadLink(null); // Reset download link
        }
    };

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: 'image/svg+xml',
        multiple: false,
    });

    const handleSubmit = async (e) => {
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
            <NavBar />

            {/* Hero Section */}
            <header className="flex-grow bg-gradient-to-r from-yellow-400 to-red-600 text-white">
                <div className="max-w-7xl mx-auto px-6 py-20 flex flex-col items-center justify-center text-center">
                    <h1 className="text-5xl md:text-7xl font-extrabold mb-6">
                        Convert Your SVGs in One Click
                    </h1>
                    <p className="text-xl md:text-3xl mb-12">
                        Transform your SVG files into all the icons you need in seconds.
                    </p>

                    {/* Conversion Interface */}
                    <div className="bg-white text-gray-800 rounded-xl shadow-2xl p-10 w-full max-w-md">
                        <form onSubmit={handleSubmit} className="space-y-8">
                            <div
                                {...getRootProps()}
                                className={`border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition 
                                ${isDragActive ? 'border-yellow-400 bg-yellow-50' : 'border-gray-300 bg-gray-50 hover:border-yellow-400'}`}
                            >
                                <input {...getInputProps()} />
                                {isDragActive ? (
                                    <p className="text-yellow-400 font-semibold">
                                        Drop the SVG file here...
                                    </p>
                                ) : (
                                    <p className="text-gray-500">
                                        Drag and drop an SVG file here, or click to select
                                    </p>
                                )}
                            </div>
                            {svgFile && (
                                <p className="text-sm text-center text-gray-700">
                                    Selected File: <span className="font-medium">{svgFile.name}</span>
                                </p>
                            )}
                            <button
                                type="submit"
                                disabled={loading}
                                className={`w-full font-bold py-3 px-6 rounded-md  
                                ${loading
                                    ? 'bg-gray-400 cursor-not-allowed'
                                    : 'bg-gradient-to-r from-yellow-400 to-red-600 hover:from-yellow-500 hover:to-red-700'}`
                                }
                            >
                                <span className="inline-block transform transition-transform duration-300 group-hover:scale-105">
                                    {loading ? 'Generating Icons...' : 'Generate Icons'}
                                </span>
                            </button>
                        </form>
                        {error && <p className="mt-6 text-sm text-red-600 text-center">{error}</p>}
                        {/* Optional Download Link */}
                        {/* {downloadLink && (
                            <a
                                href={downloadLink}
                                download="icons.zip"
                                className="mt-6 inline-block bg-green-500 text-white px-6 py-3 rounded hover:bg-green-600 transition text-center w-full"
                            >
                                Download File
                            </a>
                        )} */}
                    </div>
                </div>
            </header>

            {/* Features Section */}
            <section className="bg-gray-100 py-16">
                <div className="max-w-7xl mx-auto px-6">
                    <h2 className="text-4xl font-bold text-center mb-12">Why Choose IconsFast?</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                        <div className="text-center p-6 bg-white rounded-lg shadow hover:shadow-lg transition">
                            <svg
                                className="w-16 h-16 mx-auto mb-6 text-yellow-500"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                            <h3 className="text-2xl font-semibold mb-3">Fast</h3>
                            <p>Get your icons converted in just a few seconds.</p>
                        </div>
                        <div className="text-center p-6 bg-white rounded-lg shadow hover:shadow-lg transition">
                            <svg
                                className="w-16 h-16 mx-auto mb-6 text-yellow-500"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17v-6h6v6" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 13l3 3 3-3" />
                            </svg>
                            <h3 className="text-2xl font-semibold mb-3">Simplicity</h3>
                            <p>Intuitive interface for hassle-free usage.</p>
                        </div>
                        <div className="text-center p-6 bg-white rounded-lg shadow hover:shadow-lg transition">
                            <svg
                                className="w-16 h-16 mx-auto mb-6 text-yellow-500"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                            </svg>
                            <h3 className="text-2xl font-semibold mb-3">Secure</h3>
                            <p>Your files are processed securely and confidentially.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <Footer />
        </div>
    );
}
