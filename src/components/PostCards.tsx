import { Suspense, useEffect } from "react";
import RatingStars from "./RatingStars";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { useAuth } from "@clerk/nextjs";

export default function PostCards() {
    const {userId} = useAuth();
    useEffect(() => {
      // fetch data
      const fetchData = async () => {
        
        const response = await fetch(`api/getPostsRouter/${userId}`);
        const data = await response.json();
        console.log(data);
      }

      fetchData();
    });
  return (
    <Suspense fallback={<div>Loading...</div>}>
    <Card>
      <CardHeader>
        <img
          src="https://img-cdn.pixlr.com/image-generator/history/65bb506dcb310754719cf81f/ede935de-1138-4f66-8ed7-44bd16efc709/medium.webp"
          alt="Shoes"
        ></img>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2  ">
          <div className="flex flex-row space-x-2">
            <CardTitle>NAME</CardTitle>
            <div className="w-36"><RatingStars rating={5} onChange={() => {}} /></div>
          </div>
          <div className="justify-self-end"><span>ICON</span></div>
        </div>
        <div>LOCATION</div>
        <div className="line-clamp-4">DESCRIPTION</div>
      </CardContent>
    </Card>
    </Suspense>
  );
}



