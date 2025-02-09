"use client";
import { useEffect, useState } from "react";

type Video = {
    key: string;
    url: string;
}

export default function VideosPage() {
    const [videos, setVideos] = useState<Video[]>([]);
    useEffect(() => {
        const fetchVideos = async () => {
            const response = await fetch(`/api/videos`);
            const data = await response.json();
            console.log(data);
            setVideos(data);
        }
        fetchVideos();
    }, []);
    return (
        <>
        <h1>Videos</h1>

        {videos.map((video) => (
            <div key={video.key}>
                <video controls>
                    <source src={video.url} type="video/mp4" />
                    Your browser does not support the video tag.
                </video>
            </div>
        ))} 
        </>
        
    );
}