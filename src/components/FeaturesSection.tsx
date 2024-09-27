// src/components/Features.jsx

import React from 'react';
import { CheckCircle, Sliders, Lock } from 'lucide-react';
import { motion } from 'framer-motion'; // Remove if not using animations

const featuresData = [
    {
        id: 1,
        icon: <CheckCircle size={48} className="text-purple-600 mx-auto mb-4" />,
        title: 'Fast',
        description: 'Get your icons converted in just a few seconds.',
    },
    {
        id: 2,
        icon: <Sliders size={48} className="text-purple-600 mx-auto mb-4" />,
        title: 'Simplicity',
        description: 'Intuitive interface for hassle-free usage.',
    },
    {
        id: 3,
        icon: <Lock size={48} className="text-purple-600 mx-auto mb-4" />,
        title: 'Secure',
        description: 'Your files are processed securely and confidentially.',
    },
];

const Features = () => {
    return (
        <section id="features" className="bg-gray-900 py-16 text-white">
            <div className="max-w-7xl mx-auto px-6">
                <motion.h2
                    className="text-4xl font-bold text-center mb-12 text-white"
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, ease: 'easeOut' }}
                    viewport={{ once: true }}
                >
                    Why Choose IconsFast?
                </motion.h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                    {featuresData.map((feature) => (
                        <motion.div
                            key={feature.id}
                            className="bg-gray-800 text-center p-6 rounded-lg shadow hover:shadow-xl transition-shadow duration-300"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: feature.id * 0.2 }}
                            viewport={{ once: true }}
                        >
                            {feature.icon}
                            <h3 className="text-2xl font-semibold mb-3">
                                {feature.title}
                            </h3>
                            <p>{feature.description}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Features;
