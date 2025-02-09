
import { auth } from "@clerk/nextjs/server";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { CalendarIcon, ClockIcon, MapPinIcon } from "lucide-react";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";

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

        <div className="flex flex-col static">
            {orgRole === "admin" ? "" :
                <Link href="/capacitaciones/agregar" className="rounded-full w-[250px] border bg-blue-500 text-white py-2 mt-2 flex items-center justify-center hover:bg-blue-700 transition duration-300">+ Agregar Capacitacion</Link>}
            <>
                {data.capcs ? data.capcs.map((capc) => (
                    <div key={capc.id} className="mx-auto grid w-full h-full max-w-5xl gap-4 p-3 md:grid-cols-2 ">
                        <Card key={capc.id}>
                            <CardHeader>
                                <img alt="IMAGE" src={capc.image.signedUrl} /></CardHeader>
                            <CardContent>
                                <CardTitle className="pb-2">{capc.name}</CardTitle>
                                <div className="mb-4 grid items-start pb-4 gap-2 last:mb-0 last:pb-0">
                                    <div className="flex">
                                        <CalendarIcon className="h-4 w-4 translate-y-[3px]" />
                                        <p className="ml-2">{format((capc.date).slice(0, 10), "PPP", { locale: es })}</p>
                                    </div>
                                    <div className="flex">
                                        <ClockIcon className="h-4 w-4 translate-y-[3px]" />
                                        <p className="ml-2">{capc.time}</p>
                                    </div>
                                    <button className="rounded-full border border-gray-600 px-4 py-2 mt-2 hover:bg-blue-600 hover:text-white hover:border-blue-600 transition duration-300">Ver más</button>
                                </div>
                            </CardContent>
                        </Card>

                    </div>
                )) : <div>No hay capacitaciones</div>}
            </>

        </div>

    );
}

