import { useState } from "react";
import { Trash2 } from "lucide-react";

interface DeleteButtonProps {
  postId: string;
  userId: string | null | undefined;
  onDelete: (postId: string) => void;
}

const PostDeleteBtn: React.FC<DeleteButtonProps> = ({ postId, userId, onDelete }) => {
  const [isConfirming, setIsConfirming] = useState(false);

  const handlePostDelete = async () => {
    await fetch(`api/posts/${postId}`, {
      method: "DELETE",
      headers: { userId: userId ?? "" },
    });
    onDelete(postId);
  };

  return (
    <div className="flex flex-col gap-2 z-10">
      {isConfirming ? (
        <>
        <div className="bg-white p-4 rounded shadow-md">
          <span>¿Estás seguro de que deseas eliminar esta publicación?</span>
          <div className="flex gap-2">
            <button
              className="rounded-full p-2 bg-red-600 text-white hover:bg-red-700 transition"
              onClick={handlePostDelete}
            >
              Confirmar
            </button>
            <button
              className="rounded-full p-2 bg-gray-100 hover:bg-gray-200 transition"
              onClick={() => setIsConfirming(false)}
            >
              Cancelar
            </button>
          </div>
          </div>
        </>
      ) : (
        <button
          className="rounded-full p-2 bg-gray-100 hover:bg-gray-200 shadow transition"
          title="Eliminar publicación"
          onClick={() => setIsConfirming(true)}
        >
          <Trash2 className="h-5 w-5 text-red-600" />
        </button>
      )}
    </div>
  );
};

export default PostDeleteBtn;