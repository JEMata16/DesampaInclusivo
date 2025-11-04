"use client";

import { Trash2 } from "lucide-react";

interface CapDeleteBtnProps {
  id: number;
  onDelete: () => void;
}

const CapDeleteBtn: React.FC<CapDeleteBtnProps> = ({ id }) => {
  const handleDelete = async () => {
    if (!confirm("¿Estás seguro de que deseas eliminar esta capacitación?")) return;
    await fetch(`/api/training/${id}`, {
      method: "DELETE",
    });
    window.location.reload();
  };

  return (
    <button
      className="absolute top-2 right-2 rounded-full p-2 bg-gray-100 hover:bg-gray-200 shadow transition"
      type="button"
      onClick={handleDelete}
    >
      <Trash2 className="h-5 w-5 text-red-600" />
    </button>
  );
};

export default CapDeleteBtn;