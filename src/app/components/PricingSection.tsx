// src/components/PricingSection.tsx

'use client';
import {motion} from 'framer-motion';
import React from 'react';
import PricingCard from "@/app/components/PricingCard";

const pricingData = [
    {
        title: 'Free',
        price: '€0',
        period: '',
        description: '1 conversion per month',
        features: ['SVG to PNG, ICO, ICNS'],
        iconColor: 'text-green-500',
        buttonText: 'Get Started',
        buttonGradient: 'from-green-400 to-teal-500',
        isPopular: false,
    },
    {
        title: 'Basic',
        price: '€4,49',
        period: '',
        description: '20 conversions (use them when you want)',
        features: ['SVG to PNG, ICO, ICNS', 'Advanced Features'],
        iconColor: 'text-purple-500',
        buttonText: 'Choose Basic',
        buttonGradient: 'from-purple-500 to-indigo-600',
        isPopular: true,
    },
    {
        title: 'Unlimited',
        price: '€14,49',
        period: '/month',
        description: 'Unlimited conversions per month',
        features: ['All Conversion Types', 'Advanced Analytics', 'Custom Integrations'],
        iconColor: 'text-pink-500',
        buttonText: 'Choose Unlimited',
        buttonGradient: 'from-pink-500 to-red-500',
        isPopular: false,
    },
];

const PricingSection: React.FC = () => {
    return (
        <section id="pricing" className="bg-gray-900 py-20">
            <div className="max-w-7xl mx-auto px-6">
                <motion.h2
                    className="text-5xl font-extrabold text-center text-gray-100 mb-4"
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, ease: 'easeOut' }}
                    viewport={{ once: true }}
                >
                    Pricing Plans
                </motion.h2>
                <motion.p
                    className="text-center text-lg text-gray-300 mb-16"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ duration: 0.6, delay: 0.2, ease: 'easeOut' }}
                    viewport={{ once: true }}
                >
                    Choose the plan that fits your needs and start converting your SVGs effortlessly.
                </motion.p>
                <div className="flex flex-col md:flex-row justify-center items-center gap-12">
                    {pricingData.map((plan, index) => (
                        <PricingCard key={index} {...plan} />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default PricingSection;
