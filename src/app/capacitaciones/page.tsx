import { auth } from "@clerk/nextjs/server";
import { CalendarIcon, ClockIcon, MapPinIcon } from "lucide-react";
import Link from "next/link";
import VerticalIcon from "~/components/VerticalIcon";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";


export default async function Capacitaciones() {
    const { orgRole } = await auth();

    return (
        <main className="flex flex-col static min-h-screen bg-gray-200">
            { orgRole === "admin" ? "" : 
            <Link href="/capacitaciones/agregar" className="rounded-full w-[250px] border bg-blue-500 text-white py-2 mt-2 flex items-center justify-center hover:bg-blue-700 transition duration-300">+ Agregar Capacitacion</Link>}
            <>
                <div className="mx-auto grid w-full h-full max-w-5xl gap-4 p-3 md:grid-cols-2 ">
                    <Card>
                        <CardHeader><img alt="IMAGE" src="https://fps.cdnpk.net/images/home/subhome-ai.webp?w=649&h=649" /></CardHeader>
                        <CardContent>
                            <CardTitle>Nombre Capacitación</CardTitle>
                            <div className="mb-4 grid items-start pb-4 last:mb-0 last:pb-0">
                                <div className="flex">
                                    <CalendarIcon className="h-4 w-4 translate-y-[3px]" />
                                    <p className="ml-2">24/5/2025</p>
                                </div>
                                <div className="flex">
                                    <ClockIcon className="h-4 w-4 translate-y-[3px]" />
                                    <p className="ml-2">2:00 pm</p>
                                </div>
                                <button className="rounded-full border border-gray-600 px-4 py-2 mt-2 hover:bg-blue-600 hover:text-white hover:border-blue-600 transition duration-300">Ver más</button>
                            </div>
                        </CardContent>
                    </Card>
                    
                </div>
            </>
        </main>
    );
}