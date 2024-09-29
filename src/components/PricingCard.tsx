// src/components/PricingCard.tsx

'use client';

import React from 'react';
import { Check } from 'lucide-react';
import { motion } from 'framer-motion';

interface PricingCardProps {
    title: string;
    price: string;
    period?: string;
    description: string;
    features: string[];
    iconColor: string;
    buttonText: string;
    buttonGradient: string;
    isPopular?: boolean;
}

const PricingCard: React.FC<PricingCardProps> = ({
                                                     title,
                                                     price,
                                                     period = '',
                                                     description,
                                                     features,
                                                     iconColor,
                                                     buttonText,
                                                     buttonGradient,
                                                     isPopular = false,
                                                 }) => {
    return (
        <motion.div
            className={`w-full md:w-1/3 bg-gray-800 rounded-3xl shadow-2xl transform hover:scale-105 transition-transform duration-300 relative`}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
        >
            {isPopular && (
                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-purple-500 dark:bg-purple-700 text-white px-4 py-1 rounded-full text-sm font-semibold shadow-md">
                    Most Popular
                </div>
            )}
            <div className="p-8">
                <h3 className="text-3xl font-semibold text-center text-gray-200 mb-4">
                    {title}
                </h3>
                <p className="text-center text-4xl font-bold text-white mb-2">
                    {price}
                    <span className="text-xl font-medium">{period}</span>
                </p>
                <p className="text-center text-gray-400 mb-6">
                    {description}
                </p>
                <ul className="space-y-4 mb-8">
                    {features.map((feature, index) => (
                        <li key={index} className="flex items-center">
                            <Check className={`w-6 h-6 ${iconColor} mr-2 flex-shrink-0`} />
                            <span className="text-gray-300">{feature}</span>
                        </li>
                    ))}
                </ul>
                <button
                    className={`w-full bg-gradient-to-r ${buttonGradient} text-white py-3 px-6 rounded-full hover:opacity-90 transition-opacity duration-300 font-semibold`}
                >
                    {buttonText}
                </button>
            </div>
        </motion.div>
    );
};

export default PricingCard;
