// pages/index.js
"use client"
import React, { useState } from 'react';
import axios from 'axios';
import { useDropzone } from 'react-dropzone';
import { saveAs } from 'file-saver';

export default function Home() {
    const [svgFile, setSvgFile] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const onDrop = (acceptedFiles) => {
        if (acceptedFiles.length > 0) {
            setSvgFile(acceptedFiles[0]);
            setError('');
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
            setError('Veuillez télécharger un fichier SVG.');
            return;
        }

        setLoading(true);
        setError('');

        try {
            const formData = new FormData();
            formData.append('svg', svgFile);

            const response = await axios.post('/api/generate-icons', formData, {
                responseType: 'blob',
            });

            // Créer un objet Blob à partir de la réponse
            const blob = new Blob([response.data], { type: 'application/zip' });
            saveAs(blob, 'icons.zip');

            setLoading(false);
        } catch (err) {
            console.error(err);
            setError('Erreur lors de la génération des icônes.');
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
            <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md">
                <h1 className="text-2xl font-bold mb-6 text-center text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-red-600">
                    Générateur d'Icônes
                </h1>
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div
                        {...getRootProps()}
                        className={`border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition 
                        ${isDragActive ? 'border-blue-400 bg-blue-50' : 'border-gray-300 bg-gray-50 hover:border-gradient-to-r from-yellow-400 to-red-600'}`}
                    >
                        <input {...getInputProps()} />
                        {isDragActive ? (
                            <p className="text-blue-500">
                                Déposez le fichier SVG ici...
                            </p>
                        ) : (
                            <p className="text-gray-500">
                                Glissez et déposez un fichier SVG ici, ou cliquez pour sélectionner
                            </p>
                        )}
                    </div>
                    {svgFile && (
                        <p className="text-sm text-center text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-red-600">
                            Fichier sélectionné : <span className="font-medium">{svgFile.name}</span>
                        </p>
                    )}
                    <button
                        type="submit"
                        disabled={loading}
                        className={`group w-full font-bold py-2 px-4 rounded-md  
                        ${loading
                            ? 'bg-gray-400 cursor-not-allowed'
                            : 'bg-gradient-to-r from-yellow-400 to-red-600 hover:from-yellow-500 hover:to-red-700'}`
                        }
                    >
                    <span className="inline-block transform transition-transform duration-300 group-hover:scale-105">
                        {loading ? 'Génération en cours...' : 'Générer les Icônes'}
                    </span>
                    </button>
                </form>
                {error && <p className="mt-4 text-sm text-red-600">{error}</p>}
            </div>
        </div>
    );
}
