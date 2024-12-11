import * as React from "react";
import { Drawer, DrawerContent, DrawerTrigger } from "./ui/drawer";
import { EllipsisVerticalIcon, Pencil, Trash2 } from "lucide-react";
import { Command, CommandItem, CommandList } from "./ui/command";
import { DialogTitle } from "./ui/dialog";
import { useRouter } from "next/navigation";
import { useAuth } from "@clerk/nextjs";

type VerticalIconProps = {
  postId: string;
  userId: string | null | undefined;
};

export default function VerticalIcon({ postId, userId }: VerticalIconProps) {
  const [open, setOpen] = React.useState(false);
  const isDesktop = window.matchMedia("(min-width: 768px)").matches;
  const router = useRouter();
  const handleMouseEnter = () => {
    setOpen(true);
  };

  const handleMouseLeave = () => {
    setOpen(false);
  };

  //Edit Post
  const handleEditPost = () => {
    router.push(`/publicaciones/editar/${postId}`);
  };

  //Delete Post
  const handleDeletePost = () => {
    fetch(`api/posts/${postId}`, {method: "DELETE", headers: { userId: userId ?? "" }});
    window.location.reload();
  };

  if (isDesktop) {
    return (
      <div
        className="relative"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <button className="rounded-full p-1 hover:bg-slate-200">
          <EllipsisVerticalIcon className="h-6 w-6" />
        </button>

        {open && (
          <div className="absolute right-0 top-full z-10 w-48 rounded-lg bg-white shadow-lg">
            <ul>
              <li className="flex items-center cursor-pointer p-2 hover:bg-gray-100 space-x-2" onClick={handleEditPost}>
                <Pencil className="mr-2 h-4 w-4" />
                Editar Publicación
              </li>
              <li className="flex items-center cursor-pointer p-2 hover:bg-gray-100" onClick={handleDeletePost}>
                <Trash2 className="mr-2 h-4 w-4" />
                Borrar publicación
              </li>
            </ul>
          </div>
        )}
      </div>
    );
  }
  return (
    <Drawer open={open} onOpenChange={setOpen} modal={true}>
      <DrawerTrigger asChild>
        <button className="rounded-full p-1 hover:bg-slate-200">
          <EllipsisVerticalIcon />
        </button>
      </DrawerTrigger>

      <DrawerContent className="mx-auto w-auto">
        <div className="hidden">
          <DialogTitle>Acciones</DialogTitle>
        </div>
        <Command>
          <div className="mt-6">
            <CommandList>
              <CommandItem onClick={handleEditPost}>
                <Pencil className="mr-2 h-4 w-4" />
                <span>Editar Publicación</span>
              </CommandItem>
              <CommandItem onClick={handleDeletePost}>
                <Trash2 className="mr-2 h-4 w-4" />
                <span>Borrar Publicacion</span>
              </CommandItem>
            </CommandList>
          </div>
        </Command>
      </DrawerContent>
    </Drawer>
  );
}
