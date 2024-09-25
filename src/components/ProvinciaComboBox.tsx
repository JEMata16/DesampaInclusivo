"use client";

import * as React from "react"

import { Button } from "./ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "./ui/command"
import {
  Drawer,
  DrawerContent,
  DrawerTrigger,
} from "./ui/drawer"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "./ui/popover"


// PROVINCIA COMBOBOX 
type Status = {
  value: string
  label: string
}

const provincias: Status[] = [
  {
    value: "alajuela",
    label: "Alajuela",
  },
  {
    value: "cartago",
    label: "Cartago",
  },
  {
    value: "guanacaste",
    label: "Guanacaste",
  },
  {
    value: "heredia",
    label: "Heredia",
  },
  {
    value: "limon",
    label: "Limón",
  },
  {
    value: "puntarenas",
    label: "Puntarenas",
  },
  {
    value: "san-jose",
    label: "San José",
  },
]


export function ProvinciaComboBox() {
  const [open, setOpen] = React.useState(false)
  const isDesktop = window.matchMedia("(min-width: 768px)").matches
  const [selectedStatus, setSelectedStatus] = React.useState<Status | null>(
    null
  )

  if (isDesktop) {
    return (
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button variant="outline" className="w-[250px] justify-start">
            {selectedStatus ? <>{selectedStatus.label}</> : <>+ Seleccionar Provincia</>}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[200px] p-0" align="start">
          <StatusList setOpen={setOpen} setSelectedStatus={setSelectedStatus} />
        </PopoverContent>
      </Popover>
    )
  }

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <Button variant="outline" className="w-[150px] justify-start">
          {selectedStatus ? <>{selectedStatus.label}</> : <>+ Seleccionar</>}
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <div className="mt-4 border-t">
          <StatusList setOpen={setOpen} setSelectedStatus={setSelectedStatus} />
        </div>
      </DrawerContent>
    </Drawer>
  )
}

function StatusList({
  setOpen,
  setSelectedStatus,
}: {
  setOpen: (open: boolean) => void
  setSelectedStatus: (status: Status | null) => void
}) {
  return (
    <Command>
      <CommandInput placeholder="Filter status..." />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        <CommandGroup>
          {provincias.map((status) => (
            <CommandItem
              key={status.value}
              value={status.value}
              onSelect={(value) => {
                setSelectedStatus(
                  provincias.find((priority) => priority.value === value) || null
                )
                setOpen(false)
              }}
            >
              {status.label}
            </CommandItem>
          ))}
        </CommandGroup>
      </CommandList>
    </Command>
  )
}
// END PROVINCIA COMBOBOX

// CANTON COMBOBOX
export function CantonComboBox() {
  const [open, setOpen] = React.useState(false)
  const isDesktop = window.matchMedia("(min-width: 768px)").matches
  const [selectedStatus, setSelectedStatus] = React.useState<Status | null>(
    null
  )

  if (isDesktop) {
    return (
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button variant="outline" className="w-[250px] justify-start">
            {selectedStatus ? <>{selectedStatus.label}</> : <>+ Seleccionar Cantón</>}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[250px] p-0" align="start">
          <CantonesList setOpen={setOpen} setSelectedStatus={setSelectedStatus} />
        </PopoverContent>
      </Popover>
    )
  }

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <Button variant="outline" className="w-[150px] justify-start">
          {selectedStatus ? <>{selectedStatus.label}</> : <>+ Set status</>}
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <div className="mt-4 border-t">
          <CantonesList setOpen={setOpen} setSelectedStatus={setSelectedStatus} />
        </div>
      </DrawerContent>
    </Drawer>
  )
}

function CantonesList({
  setOpen,
  setSelectedStatus,
}: {
  setOpen: (open: boolean) => void
  setSelectedStatus: (status: Status | null) => void
}) {
  const [cantones, setCantones] = React.useState<Status[]>([])
  React.useEffect(() => {
    
      const fetchCantones = async () => {
        const response = await fetch(`https://ubicaciones.paginasweb.cr/provincia/1/cantones.json`)
        const data = await response.json()
        const jsonData = Object.entries(data).map(([value, label]) => ({ value, label: label as string }));
        setCantones(jsonData);
      };
   

    fetchCantones();
  } , []);
 

  return (
    <Command>
      <CommandInput placeholder="Filter status..." />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        <CommandGroup>
          {cantones.map((status) => (
            <CommandItem
              key={status.value}
              value={status.value}
              onSelect={(label) => {
                setSelectedStatus(
                  cantones.find((priority) => priority.label === label) || null
                )
                setOpen(false)
              }}
            >
              {status.label}
            </CommandItem>
          ))}
        </CommandGroup>
      </CommandList>
    </Command>
  )
}
// END CANTON COMBOBOX

