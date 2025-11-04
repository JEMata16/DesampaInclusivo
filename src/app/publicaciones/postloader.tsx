"use client";

import { useEffect, useState } from "react";
import { useMyContext } from "~/utils/posts/layoutContext";
import PostCards from "~/components/PostCards";
import Loading from "~/components/Loading";

export default function ClientPostLoader({ userId }: { userId: string | null }) {
  const { value } = useMyContext(); // true = "Mis Publicaciones"
  const [data, setData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      setIsLoading(true);
      try {
        const endpoint =
          value && userId
            ? `/api/getPostsRouter/${userId}`
            : `/api/posts`;

        const res = await fetch((endpoint), {
            next: { revalidate: 30 },
        });
        const json = await res.json();
        setData(json);
      } catch (err) {
        console.error("Error fetching posts:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPosts();
  }, [value, userId]);

  if (isLoading) return <Loading />;

  return <PostCards initialPosts={data?.posts ?? []} userId={userId} />;
}
