import { useEffect, useState } from "react";
import RatingStars from "./RatingStars";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { MapPinIcon, Pencil, Trash2 } from "lucide-react";
import Loading from "./Loading";
import Image from "next/image";


type Data = {
  posts: Posts[];
  image: string | null;
};
type Posts = {
  id: string;
  description: string;
  provincia: string;
  canton: string;
  rating: number;
  authorId: string;
  username: string;
  images: [
    {
      fileName: string;
      signedUrl: string;
    },
  ];
  createdAt: string;
};
export default function PostCards({ userId }: { userId: string | null | undefined }) {
  const [posts, setPosts] = useState<Data | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // fetch data
    const fetchData = async () => {
      setIsLoading(true);
      switch (userId) {
        case null:
          try {
            const response = await fetch(`api/posts`);
            const data = await response.json();
            setPosts(data);
          } catch (error) {
            console.error(error);
          } finally {
            setIsLoading(false);
          }
          break;
        case userId:
          try {
            const response = await fetch(`api/getPostsRouter/${userId}`, { method: "GET" });
            const data = await response.json();
            setPosts(data);
          } catch (error) {
            console.error(error);
          } finally {
            setIsLoading(false);
          }
          break;
      }
    };

    fetchData();
  }, [userId]);

  if (isLoading)
    return (

      <Loading />
    );
  return (
    <>
      <div className="min-h-screen bg-gradient-to-r from-primary-50 to-purple-50 py-6">
        <div className="mx-auto grid w-full gap-6 grid-cols-1 md:grid-cols-2">
          {posts && posts.posts.length > 0 ? (
            posts.posts
            .slice()
            .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
            .map((post, index) => (
              <Card
                key={index}
                className="relative rounded-2xl shadow-lg bg-white bg-opacity-95 overflow-hidden flex flex-col w-full"
              >
                {userId === post.authorId && (
                  <div className="absolute top-4 right-4 flex flex-col gap-2 z-10">
                    <button
                      className="rounded-full p-2 bg-gray-100 hover:bg-gray-200 shadow transition"
                      title="Editar publicación"
                      onClick={() => window.location.href = `/publicaciones/editar/${post.id}`}
                    >
                      <Pencil className="h-5 w-5 text-blue-600" />
                    </button>
                    <button
                      className="rounded-full p-2 bg-gray-100 hover:bg-gray-200 shadow transition"
                      title="Eliminar publicación"
                      onClick={async () => {
                        await fetch(`api/posts/${post.id}`, {
                          method: "DELETE",
                          headers: { userId: userId ?? "" }
                        });
                        window.location.reload();
                      }}
                    >
                      <Trash2 className="h-5 w-5 text-red-600" />
                    </button>
                  </div>
                )}
                {/* Image */}
                <div className="w-full aspect-[4/2] bg-gray-100 flex items-center justify-center overflow-hidden">
                  <Image
                    src={post.images[0].signedUrl}
                    alt="Imagen de la publicación"
                    className="object-cover w-full h-full"
                    width={500}
                    height={625}
                    priority={index < 2}
                  />
                </div>
                {/* User and actions */}
                <div className="flex items-center justify-between px-4 pt-3">
                  <div className="flex items-center gap-2">
                    {/* Optional: User avatar */}
                    {/* <Avatar src={post.avatarUrl} alt={post.username} /> */}
                    <span className="font-semibold text-primary-600">{post.username}</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="flex items-center text-sky-700 text-base">
                      <MapPinIcon size={16} className="mr-1" />
                      {post.provincia}
                    </span>
                  </div>
                </div>
                {/* Content */}
                <CardContent className="flex flex-col gap-2 px-4 pb-4">
                  <div className="flex items-center gap-2 mt-2 mb-4">
                    <RatingStars rating={post.rating} onChange={() => { }} />
                  </div>
                  <div className="text-gray-700 text-sm line-clamp-4">{post.description}</div>
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
                ¡Aún no has realizado ninguna publicación!
              </h2>
              <p className="text-lg font-semibold text-gray-700 mb-4 text-center">
                No dudes en compartir tus experiencias y apoyar a la comunidad.
              </p>
              <a
                href="/publicaciones/agregar"
                className="bg-primary-600 hover:bg-primary-700 text-white px-6 py-3 rounded-lg font-medium transition-all shadow-lg"
              >
                Publicar mi experiencia
              </a>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
