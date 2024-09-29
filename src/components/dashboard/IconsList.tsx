import React, {useEffect, useState} from 'react';
import {motion} from "framer-motion";
import {Accept, useDropzone} from "react-dropzone";
import IconsCard from "@/components/dashboard/IconsCard";
import {Svg} from "@/app/types";

interface IconsListProps {
    svgFile: File | null;
    setSvgFile: (file: File | null) => void;
    setError: (error: string) => void;
    setDownloadLink: (link: string | null) => void;
}

export default function IconsList(props: IconsListProps) {
    const [icons, setIcons] = useState<Svg[]>();
    const [clickableDropzone, setClickableDropzone] = useState(true);
    const [selectedIcon, setSelectedIcon] = useState<Svg | null>(null);

    useEffect(() => {
        fetchIcons();
    }, []);

    const fetchIcons = () => {
        fetch('/api/get-icons?userid=1')
            .then(response => response.json())
            .then(data => {
                setIcons(data);
            })
    };

    const onDrop = (acceptedFiles: File[]) => {
        if (acceptedFiles.length > 0) {
            const formData = new FormData();
            formData.append('svg', acceptedFiles[0]);
            fetch('/api/insert-icons', {
                method: 'POST',
                body: formData,
            })
                .then((response) => {
                    response.status === 200 && fetchIcons();
                    return response.json();
                })
                .then((data) => {
                    setSelectedIcon(data);
                })
                .catch(error => {
                    console.error('Error:', error);
                });

            handleSelectIcon(acceptedFiles[0]);
        }
    };

    const handleSelectIcon = (svg: File | null) => {
        props.setSvgFile(svg);
        props.setError('');
        props.setDownloadLink(null);
    };

    const {getRootProps, getInputProps, isDragActive} = useDropzone({
        onDrop,
        accept: {'image/svg+xml': []} as Accept,
        multiple: false,
        noClick: !clickableDropzone,
    });

    return (
        <>
            <div
                {...(getRootProps() as any)}
                className={`border-2 border-dashed rounded-xl p-8 min-h-full flex flex-wrap gap-3
                            ${!icons?.length && 'items-center justify-center'} text-center cursor-pointer transition 
                            ${isDragActive ? 'border-cyan-400 bg-cyan-50' : 'border-gray-300 bg-gray-50 hover:border-cyan-400'}`}
            >
                <input {...getInputProps()} />
                {icons?.length ? icons?.map((icon) => (
                        <IconsCard
                            selected={selectedIcon?.svgid === icon.svgid}
                            key={icon.svgid}
                            icon={icon}
                            onMouseEnter={() => setClickableDropzone(false)}
                            onMouseLeave={() => setClickableDropzone(true)}
                            onClick={() => {
                                setSelectedIcon(selectedIcon === icon ? null : icon);
                                handleSelectIcon(selectedIcon === icon ? null : new File([icon.content], icon.name, {type: 'image/svg+xml'}));
                            }}
                        />
                    ))
                    : isDragActive ? (
                        <motion.p
                            className="text-cyan-400 font-semibold"
                            initial={{scale: 1}}
                            animate={{scale: 1.05}}
                            transition={{repeat: Infinity, duration: 0.6, repeatType: 'mirror'}}
                        >
                            Drop the SVG file here...
                        </motion.p>
                    ) : (
                        <motion.p
                            className="text-gray-500"
                            initial={{opacity: 0}}
                            animate={{opacity: 1}}
                            transition={{duration: 0.5, delay: 0.2}}
                        >
                            Drag and drop an SVG file here, or click to select
                        </motion.p>
                    )}
            </div>
        </>
    )
}