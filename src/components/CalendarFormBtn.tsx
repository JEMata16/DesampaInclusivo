import { CalendarIcon } from "lucide-react";
import { Button } from "./ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Calendar } from "./ui/calendar";
import { ChangeEvent } from "react";
import { format } from "date-fns";

type Props = {
    selected?: Date | undefined
    onSelect: ( day: Date | undefined) => void
    
};

export default function CalendarFormBtn({ selected, onSelect }: Props) {

    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button variant="outline" className="flex-row-reverse">
                    <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                    {selected ? (
                       format(selected, "dd/MM/yyyy")
                    ): (
                        <span className="text-gray-800 opacity-60">Seleccione una fecha</span>
                    )}
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
                <Calendar mode="single" selected={selected} onSelect={onSelect} />
            </PopoverContent>
        </Popover>

    );

}