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
  id?: number
}

const provincias: Status[] = [
  {
    value: "alajuela",
    label: "Alajuela",
    id: 2,
  },
  {
    value: "cartago",
    label: "Cartago",
    id: 3,
  },
  {
    value: "guanacaste",
    label: "Guanacaste",
    id: 5,
  },
  {
    value: "heredia",
    label: "Heredia",
    id: 4,
  },
  {
    value: "limon",
    label: "Limón",
    id: 7,
  },
  {
    value: "puntarenas",
    label: "Puntarenas",
    id: 6,
  },
  {
    value: "san-jose",
    label: "San José",
    id: 1,
  },
]

export function ProvinciaComboBox({ onProvinciaSelect }: { onProvinciaSelect: (data:{id: number | undefined, name: string | undefined}) => void }) {
  const [open, setOpen] = React.useState(false)
  const isDesktop = window.matchMedia("(min-width: 768px)").matches
  const [selectedStatus, setSelectedStatus] = React.useState<Status | null>(null)

  const handleSelectProvincia = (provincia: Status | null) => {
    setSelectedStatus(provincia)
    onProvinciaSelect({ name: provincia?.label, id: provincia?.id})
    setOpen(false)
  }

  if (isDesktop) {
    return (
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button variant="outline" className="w-[250px] justify-start">
            {selectedStatus ? <>{selectedStatus.label}</> : <>+ Seleccionar Provincia</>}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[200px] p-0" align="start">
          <StatusList setOpen={setOpen} setSelectedStatus={handleSelectProvincia} />
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
          <StatusList setOpen={setOpen} setSelectedStatus={handleSelectProvincia} />
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

// CANTON COMBOBOX
export function CantonComboBox({ provinceId, onCantonSelect }: { provinceId: number | undefined, onCantonSelect: (data: {name: string | undefined}) => void }) {
  const [open, setOpen] = React.useState(false)
  const isDesktop = window.matchMedia("(min-width: 768px)").matches
  const [selectedStatus, setSelectedStatus] = React.useState<Status | null>(null)

  const handleSelectCanton = (canton: Status | null) => {
    setSelectedStatus(canton)
    onCantonSelect({ name: canton?.label })
    setOpen(false)
  }
  if (isDesktop) {
    return (
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button variant="outline" className="w-[250px] justify-start">
            {selectedStatus ? <>{selectedStatus.label}</> : <>+ Seleccionar Cantón</>}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[250px] p-0" align="start">
          <CantonesList setOpen={setOpen} setSelectedStatus={handleSelectCanton} provinceId={provinceId} />
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
          <CantonesList setOpen={setOpen} setSelectedStatus={handleSelectCanton} provinceId={provinceId} />
        </div>
      </DrawerContent>
    </Drawer>
  )
}

function CantonesList({
  setOpen,
  setSelectedStatus,
  provinceId,
}: {
  setOpen: (open: boolean) => void
  setSelectedStatus: (status: Status | null) => void
  provinceId: number | undefined
}) {
  const [cantones, setCantones] = React.useState<Status[]>([])

  React.useEffect(() => {
    if (!provinceId) return

    const fetchCantones = async () => {
      const response = await fetch(`https://ubicaciones.paginasweb.cr/provincia/${provinceId}/cantones.json`)
      const data = await response.json()
      const jsonData = Object.entries(data).map(([value, label]) => ({ value, label: label as string }))
      setCantones(jsonData)
    }

    fetchCantones()
  }, [provinceId])

  return (
    <Command>
      <CommandInput placeholder="Filter status..." />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        <CommandGroup>
          {cantones.map((status) => (
            <CommandItem
              key={status.value}
              value={status.label}
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

