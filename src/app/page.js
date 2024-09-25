// pages/index.js
"use client"
import React, { useState } from 'react';
import axios from 'axios';
import { useDropzone } from 'react-dropzone';
import JSZip from 'jszip';
import { saveAs } from 'file-saver';
import styles from './Home.Module.css';

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
        <div className={styles.container}>
            <h1>Générateur d'Icônes</h1>
            <form onSubmit={handleSubmit} className={styles.form}>
                <div {...getRootProps()} className={styles.dropzone}>
                    <input {...getInputProps()} />
                    {isDragActive ? (
                        <p>Déposez le fichier SVG ici...</p>
                    ) : (
                        <p>Glissez et déposez un fichier SVG ici, ou cliquez pour sélectionner</p>
                    )}
                </div>
                {svgFile && <p>Fichier sélectionné : {svgFile.name}</p>}
                <button type="submit" disabled={loading}>
                    {loading ? 'Génération en cours...' : 'Générer les Icônes'}
                </button>
            </form>
            {error && <p className={styles.error}>{error}</p>}
        </div>
    );
}
