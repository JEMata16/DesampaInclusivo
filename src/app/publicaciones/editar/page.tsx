import { useRouter } from "next/navigation";


export default function EditPostPage({params}: {params: {postId: string}}) {
    const router = useRouter();
    const {postId} = params;
    
}