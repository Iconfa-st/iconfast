"use client";
import {useEffect, useState} from "react";
import IconsList from "@/app/components/dashboard/IconsList";
import Navbar from "@/app/components/Navbar";
import Exporter from "@/app/components/dashboard/Exporter";

export default function Dashboard() {
    const [svgFile, setSvgFile] = useState<File | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [downloadLink, setDownloadLink] = useState<string | null>(null);

    return (
        <div className="flex flex-col min-h-screen">
            <Navbar/>
            <div className={"flex gap-3 items-center justify-center px-10 py-20"}>
                <div className={"h-[70vh] w-full"}>
                    <IconsList
                        svgFile={svgFile}
                        setSvgFile={setSvgFile}
                        setError={setError}
                        setDownloadLink={setDownloadLink}
                    />
                </div>
                <div className={"h-[70vh] w-1/3"}>
                    <Exporter
                        loading={loading}
                        setLoading={setLoading}
                        setError={setError}
                        setDownloadLink={setDownloadLink}
                        svgFile={svgFile}
                    />
                </div>
            </div>
        </div>
    )
}