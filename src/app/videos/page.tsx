"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "~/components/ui/button";
import { PlusCircle } from "lucide-react";
import Image from "next/image";
import { usePathname } from "next/navigation";

type Video = {
    key: string;
    url: string;
    title: string;
}

export default function VideosPage() {
    const [videos, setVideos] = useState<Video[]>([]);
    const pathname = usePathname();
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
        <section className="min-h-screen bg-gradient-to-r from-primary-50 to-purple-50 py-4">
            <div className="max-w-5xl mx-auto px-4">
                {pathname !== "/videos/agregar" && (
                    <Button variant="upload" size={"sm"} className="rounded-md w-[160px] border bg-blue-600 text-white py-2 mt-2 mb-4 flex items-center justify-center hover:bg-blue-700 transition duration-300 ml-3">
                        <Link href="/videos/agregar">+ Agregar Vídeo</Link>
                    </Button>
                )}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {videos.length > 0 ? (
                        videos.map((video) => (
                            <div
                                key={video.key}
                                className="bg-white rounded-xl shadow-md p-4 flex flex-col items-center"
                            >
                                <video
                                    controls
                                    className="w-full rounded-lg mb-3 bg-black"
                                    style={{ maxHeight: 340 }}
                                >
                                    <source src={video.url} type="video/mp4" />
                                    ¡Lo sentimos! Tu navegador no soporta el video.
                                </video>
                                <div className="w-full text-left font-bold text-blue-700 text-md break-all mb-2">{video.title}</div>
                            </div>
                        ))
                    ) : (
                        <div className="col-span-full w-full flex flex-col items-center justify-center min-h-[60vh] p-8 bg-white bg-opacity-90 rounded-2xl shadow-xl">
                            <Image
                                src="/Nodata.png"
                                alt="Sin datos"
                                width={500}
                                height={500}
                                className="mb-1"
                            />
                            <h2 className="text-2xl font-bold text-primary-600 mb-4 text-center">
                                ¡Aún no hay vídeos!
                            </h2>
                            <p className="text-lg font-semibold text-gray-700 mb-4 text-center">
                                Aquí podrás encontrar todos los vídeos disponibles.
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
}