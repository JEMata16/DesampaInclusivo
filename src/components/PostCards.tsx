import { useEffect, useState } from "react";
import RatingStars from "./RatingStars";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { useAuth } from "@clerk/nextjs";
import VerticalIcon from "./VerticalIcon";
import { MapPinIcon } from "lucide-react";

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
  images: [
    {
      fileName: string;
      signedUrl: string;
    },
  ];
};
export default function PostCards() {
  const [posts, setPosts] = useState<Data | null>(null);
  const { userId } = useAuth();

  useEffect(() => {
    // fetch data
    const fetchData = async () => {
      const response = await fetch(`api/getPostsRouter/${userId}`);
      const data = await response.json();
      console.log(data);
      setPosts(data);
    };

    fetchData();
  }, [userId]);

  if (!posts) return <div>Loading...</div>;
  return (
    <section>
      {posts.posts.map((post, index) => (
        <Card key={index}>
          <CardHeader>
            {post.images && (
              <img src={post.images[0].signedUrl} alt="User Image" />
            )}
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2  ">
              <div className="flex flex-row space-x-2">
                <CardTitle>{post.authorId}</CardTitle>
                <div className="w-36">
                  <RatingStars rating={5} onChange={() => {}} />
                </div>
              </div>
              <div className="justify-self-end">
                <VerticalIcon />
              </div>
            </div>
            <div className="flex flex-row">
              <MapPinIcon size={16} strokeWidth={1.75} className="text-sky-700"/>
              <p className="text-sm text-sky-700 ">
                <span>{post.provincia}</span>
              </p>
            </div>
            <div className="line-clamp-4">{post.description}</div>
          </CardContent>
        </Card>
      ))}
    </section>
  );
}
