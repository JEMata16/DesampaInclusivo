import { useEffect, useState } from "react";
import RatingStars from "./RatingStars";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import VerticalIcon from "./VerticalIcon";
import { MapPinIcon } from "lucide-react";
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
            <Card key={index} className="max-h-screen">
              <CardHeader>
                {post.images && (
                  <div className="container sm">  <Image src={post.images[0].signedUrl} alt="User Image" className="object-cover" width={500} height={100} /></div>
                
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
          <div className="flex items-center justify-center h-full p-6 bg-gray-100 rounded-lg shadow-md">
            <p className="text-lg font-semibold text-gray-700">
              ¡Aún no ha realizado ninguna publicación! No dude en compartir sus experiencias y ayudar a la comunidad.
            </p>
          </div>
        )}
      </div>
    </>
  );
}
