"use client";
import PostForm from "~/components/PostForm";
import { use } from 'react';

export default function EditPostPage({ params }: { params: Promise<{ id: string }> }) {
  const paramsValue = use(params);

  return (
    <PostForm mode="edit" postId={paramsValue.id} />
  );
}