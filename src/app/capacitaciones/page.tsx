
import { auth } from "@clerk/nextjs/server";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { CalendarIcon, ClockIcon, MapPinIcon, Link as LinkIcon } from "lucide-react";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import Image from "next/image";

export const revalidate = 60


type Data = {
    capcs: Capc[]
    image: string | null
}
type Capc = {
    id: number;
    name: string;
    description: string;
    link?: string;
    date: string;
    time: string;
    image:
    {
        fileName: string;
        signedUrl: string;
    }

};

export default async function Capacitaciones() {
    const { orgRole } = await auth();
    const result = await fetch("http://localhost:3000/api/training");
    const data: Data = await result.json();

    return (
        <div className="min-h-screen bg-gradient-to-r from-primary-50 to-purple-50 pt-4">
            <div className="mx-auto w-full max-w-6xl">
                {orgRole === "admin" ? "" :
                    <Link
                        href="/capacitaciones/agregar"
                        className="rounded-md w-[220px] border bg-blue-600 text-white py-2 mb-4 flex items-center justify-center hover:bg-blue-700 transition duration-300 ml-3"
                    >
                        + Agregar Capacitación
                    </Link>
                }
                <div className="grid w-full gap-6 grid-cols-1 md:grid-cols-2">
                    {data.capcs && data.capcs.length > 0 ? (
                        [...data.capcs]
                            .sort((a, b) => { // Ordenado por fecha y hora, eventos pasados al final
                                const now = new Date();
                                const dateTimeA = new Date(`${a.date}T${a.time}`);
                                const dateTimeB = new Date(`${b.date}T${b.time}`);
                                
                                const isPastA = dateTimeA < now;
                                const isPastB = dateTimeB < now;

                                if (isPastA && !isPastB) return 1;
                                if (!isPastA && isPastB) return -1;

                                return dateTimeA.getTime() - dateTimeB.getTime();
                            })
                            .map((capc) => (
                                <Card
                                    key={capc.id}
                                    className="rounded-2xl shadow-lg bg-white bg-opacity-95 overflow-hidden flex flex-col w-full min-h-[370px]"
                                >
                                    <div className="w-full aspect-[4/2] bg-gray-100 flex items-center justify-center overflow-hidden">
                                        <Image
                                            src={capc.image.signedUrl}
                                            alt={capc.name}
                                            className="object-cover w-full h-full"
                                            width={500}
                                            height={300}
                                            priority
                                        />
                                    </div>
                                    <CardContent className="flex flex-col gap-1 px-4 pb-4 flex-1">
                                        <span className="font-semibold text-primary-700 text-lg mt-3 mb-1">{capc.name}</span>
                                        <div className="flex flex-col gap-0 mb-0">
                                            <span className="flex items-center text-black text-base">
                                                <CalendarIcon size={16} className="mr-1" />
                                                {format((capc.date).slice(0, 10), "PPP", { locale: es })}
                                            </span>
                                            <span className="flex items-center text-black text-base">
                                                <ClockIcon size={16} className="mr-1" />
                                                {capc.time}
                                            </span>
                                        </div>
                                        {capc.link && (
                                            <a
                                                href={capc.link}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="font-semibold flex items-center text-primary-600 hover:underline mb-2"
                                            >
                                                <span className="flex items-center text-base">
                                                    <LinkIcon size={16} className="mr-1" />
                                                    Haz clic aquí para redirigirte a la capacitación
                                                </span>
                                            </a>
                                        )}
                                        <div className="flex-1" />
                                        <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-4 text-gray-800 text-base font-medium shadow-inner border border-blue-100 mt-2 text-center">
                                            {capc.description ? capc.description : "Sin detalles adicionales"}
                                        </div>
                                    </CardContent>
                                </Card>
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
                                ¡Aún no hay capacitaciones!
                            </h2>
                            <p className="text-lg font-semibold text-gray-700 mb-4 text-center">
                                Aquí podrás encontrar todas las capacitaciones disponibles.
                            </p>
                            {orgRole === "admin" ? "" :
                                <Link
                                    href="/capacitaciones/agregar"
                                    className="bg-primary-600 hover:bg-primary-700 text-white px-6 py-3 rounded-lg font-medium transition-all shadow-lg"
                                >
                                    Agregar Capacitación
                                </Link>
                            }
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
