import React, {useEffect, useState} from 'react';
import {motion} from "framer-motion";
import {Accept, useDropzone} from "react-dropzone";
import IconsCard from "@/components/dashboard/IconsCard";
import {Svg} from "@/app/types";
import axios from 'axios';
import { saveAs } from 'file-saver';

interface ExporterProps {
    loading: boolean;
    svgFile: File | null;
    setLoading: (loading: boolean) => void;
    setError: (error: string) => void;
    setDownloadLink: (link: string | null) => void;
}

export default function Exporter(props: ExporterProps) {
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!props.svgFile) {
            props.setError('Please upload an SVG file.');
            return;
        }

        props.setLoading(true);
        props.setError('');
        props.setDownloadLink(null);

        try {
            const formData = new FormData();
            formData.append('svg', props.svgFile);

            const response = await axios.post('/api/generate-icons', formData, {
                responseType: 'blob',
            });

            // Create a Blob from the response
            const blob = new Blob([response.data], { type: 'application/zip' });
            saveAs(blob, 'icons.zip');

            props.setLoading(false);
            // Optional: Provide download link
            // const url = URL.createObjectURL(blob);
            // setDownloadLink(url);
        } catch (err) {
            console.error(err);
            props.setError('An error occurred while generating icons.');
            props.setLoading(false);
        }
    };

    return (
        <>
            <div
                className={`border-2 border-dashed rounded-xl p-8 min-h-[70vh] flex flex-col gap-3`}
            >
                {props.svgFile && (
                    <motion.p
                        className="text-sm text-center text-gray-700 mt-4"
                        initial={{opacity: 0, y: -10}}
                        animate={{opacity: 1, y: 0}}
                        transition={{duration: 0.5, delay: 0.8}}
                    >
                        Selected File: <span className="font-medium">{props.svgFile.name}</span>
                    </motion.p>
                )}

                <form onSubmit={handleSubmit} className="w-full max-w-md mt-6">
                    <motion.button
                        type="submit"
                        disabled={props.loading || !props.svgFile}
                        className={`w-full font-bold py-3 px-6 rounded-md text-white 
                                ${props.loading || !props.svgFile
                            ? 'bg-gray-400 cursor-not-allowed'
                            : 'bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700'}`
                        }
                        whileHover={!props.loading ? {scale: 1.05} : undefined}
                        whileTap={!props.loading ? {scale: 0.95} : undefined}
                    >
                            <span
                                className="inline-block transform transition-transform duration-300 group-hover:scale-105">
                                {props.loading ? 'Generating Icons...' : 'Generate Icons'}
                            </span>
                    </motion.button>
                </form>
            </div>
        </>
    )
}