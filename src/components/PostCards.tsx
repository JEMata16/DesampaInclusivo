"use client";

import useSWR from "swr";
import Loading from "./Loading";
import RatingStars from "./RatingStars";
import { Card, CardContent } from "./ui/card";
import { MapPinIcon, Pencil } from "lucide-react";
import Image from "next/image";
import PostDeleteBtn from "./PostDeleteBtn";
import { Protect } from "@clerk/nextjs";

const fetcher = (url: string) => fetch(url).then((r) => r.json());

interface PostCardsProps {
  initialPosts?: any;
  userId: string | null;
}

export default function PostCards({ initialPosts, userId }: PostCardsProps) {
  // Determine endpoint
  const endpoint = userId ? `/api/getPostsRouter/${userId}` : `/api/posts`;

  // SWR caching with optional fallback from SSR or parent data
  const {
    data: fetchedData,
    error,
    isLoading,
    mutate,
  } = useSWR(endpoint, fetcher, {
    revalidateOnFocus: false,
    dedupingInterval: 60000, // 1-minute cache
    fallbackData: initialPosts,
    keepPreviousData: true,
  });

  // Use consistent naming
  const posts = fetchedData?.posts || [];

  if (isLoading) return <Loading />;
  if (error) return <div>Error loading posts</div>;

  const handlePostDelete = (postId: string) => {
    mutate(
      (prev: any) =>
        prev
          ? {
              ...prev,
              posts: prev.posts.filter((p: any) => p.id !== postId),
            }
          : prev,
      false
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-primary-50 to-purple-50 py-6">
      <div className="mx-auto grid w-full gap-6 grid-cols-1 md:grid-cols-2">
        {posts.length > 0 ? (
          posts
            .slice()
            .sort(
              (a: any, b: any) =>
                new Date(b.createdAt).getTime() -
                new Date(a.createdAt).getTime()
            )
            .map((post: any, index: number) => (
              <Card
                key={post.id}
                className="relative rounded-2xl shadow-lg bg-white bg-opacity-95 overflow-hidden flex flex-col w-full"
              >
                {/* Edit/Delete buttons for author */}
                {userId === post.authorId && (
                  <div className="absolute top-4 right-4 flex flex-col gap-2 z-10">
                    <button
                      className="rounded-full p-2 bg-gray-100 hover:bg-gray-200 shadow transition"
                      title="Editar publicación"
                      onClick={() =>
                        (window.location.href = `/publicaciones/editar/${post.id}`)
                      }
                    >
                      <Pencil className="h-5 w-5 text-blue-600" />
                    </button>
                    <PostDeleteBtn
                      postId={post.id}
                      userId={userId}
                      onDelete={handlePostDelete}
                    />
                  </div>
                )}

                {/* Delete for admin/muni */}
                {userId !== post.authorId && (
                  <Protect
                    condition={(has) =>
                      has({ role: "org:muni" }) || has({ role: "org:admin" })
                    }
                  >
                    <PostDeleteBtn
                      postId={post.id}
                      userId={userId}
                      onDelete={handlePostDelete}
                    />
                  </Protect>
                )}

                {/* Image */}
                <div className="w-full aspect-[4/2] bg-gray-100 flex items-center justify-center overflow-hidden">
                  <Image
                    src={post.images?.[0]?.signedUrl || "/placeholder.jpg"}
                    alt="Imagen de la publicación"
                    className="object-cover w-full h-full"
                    width={500}
                    height={625}
                    priority={index < 2}
                  />
                </div>

                {/* User info and location */}
                <div className="flex items-center justify-between px-4 pt-3">
                  <span className="font-semibold text-primary-600">
                    {post.username}
                  </span>
                  <span className="flex items-center text-sky-700 text-base">
                    <MapPinIcon size={16} className="mr-1" />
                    {post.provincia}, {post.canton}
                  </span>
                </div>

                {/* Content */}
                <CardContent className="flex flex-col gap-2 px-4 pb-4">
                  <div className="flex items-center gap-2 mt-2 mb-4">
                    <RatingStars rating={post.rating} onChange={() => {}} />
                  </div>
                  <div className="text-gray-700 text-sm line-clamp-4">
                    {post.description}
                  </div>
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
              ¡Aún no hay publicaciones!
            </h2>
            <p className="text-lg font-semibold text-gray-700 mb-4 text-center">
              Comparte tus experiencias y apoya a la comunidad.
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
  );
}
