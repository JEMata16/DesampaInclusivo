import { CalendarIcon } from "lucide-react";
import { Button } from "./ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Calendar } from "./ui/calendar";

export default function CalendarFormBtn() {
    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button variant="outline">
                    <span>Seleccione una fecha</span>
                    <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
                <Calendar mode="single" selected={new Date()} />
            </PopoverContent>
        </Popover>

    );

}