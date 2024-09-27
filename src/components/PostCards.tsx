
import { Suspense, useEffect, useState } from "react";
import RatingStars from "./RatingStars";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { useAuth } from "@clerk/nextjs";

type Data = {
  posts: Posts[];
  image: string | null;
}
type Posts = {
  id: string;
  description: string;
  provincia: string;
  canton: string;
  rating: number;
  image: string;
  authorId: string;
};
export default function PostCards() {
  const [posts, setPosts] = useState<Data | null>(null);
  const [image, setImage] = useState<string | null>(null);
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
            {/* {image && <img src={image} alt="User Image" />} */}
            <CardTitle>{post.provincia}</CardTitle>
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
                <span>ICON</span>
              </div>
            </div>
            <div>LOCATION</div>
            <div className="line-clamp-4">{post.description}</div>
          </CardContent>
        </Card>
      ))}
    </section>
  );
}
