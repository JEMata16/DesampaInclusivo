"use client";
import { useRouter } from "next/navigation";
import PostForm from "~/components/PostForm";


export default function EditPostPage({params}: {params: {id: string}}) {
    const router = useRouter();
    const postId = params.id;

    return (
        <PostForm mode="edit" postId={postId} />
    );
    
}