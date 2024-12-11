"use client";
import PostForm from "~/components/PostForm";


export default function EditPostPage({params}: {params: {id: string}}) {
    const postId = params.id;

    return (
        <PostForm mode="edit" postId={postId} />
    );
    
}