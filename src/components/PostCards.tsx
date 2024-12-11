import { useEffect, useState } from "react";
import RatingStars from "./RatingStars";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import VerticalIcon from "./VerticalIcon";
import { MapPinIcon } from "lucide-react";
import Loading from "./Loading";


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
          try{
            const response = await fetch(`api/posts`);
            const data = await response.json();
            setPosts(data);
          }catch(error){
            console.error(error);
          }finally{
            setIsLoading(false);
          }
          break;
        case userId:
          try{
            const response = await fetch(`api/getPostsRouter/${userId}`, { method: "GET" });
            const data = await response.json();
            setPosts(data);
          }catch(error){
            console.error(error);
          }finally{
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
      <div className="mx-auto grid w-full h-full max-w-5xl gap-4 p-3 md:grid-cols-2 ">
        {posts && posts.posts.length > 0 ? (
          posts.posts.map((post, index) => (
            <Card key={index}>
              <CardHeader>
                {post.images && (
                  <img src={post.images[0].signedUrl} alt="User Image" />
                )}
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2  ">
                  <div className="flex flex-row space-x-2">
                    <CardTitle>{post.username}</CardTitle>
                    <div className="w-36">
                      <RatingStars rating={5} onChange={() => {}} />
                    </div>
                  </div>
                  <div className="justify-self-end">
                    {userId === post.authorId && <VerticalIcon postId={post.id} userId={userId}/>}
                  </div>
                </div>
                <div className="flex flex-row">
                  <MapPinIcon
                    size={16}
                    strokeWidth={1.75}
                    className="text-sky-700"
                  />
                  <p className="text-sm text-sky-700 ">
                    <span>{post.provincia}</span>
                  </p>
                </div>
                <div className="line-clamp-4">{post.description}</div>
              </CardContent>
            </Card>
          ))
        ) : (
          <div>Sin publicaciones encontradas.</div>
        )}
      </div>
    </>
  );
}
