import { Button, Spinner } from 'flowbite-react';
import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import CommentSection from '../Components/CommentSection';
import PostCard from '../Components/PostCard';
import { API_BASE } from '../utils';


export default function PostPage() {


    const {postSlug} = useParams();
    const [loading, setLoading] = useState(true);
    const [error,setError] = useState(false);
    const [post,setPost] = useState(null);
    const [recentPosts, setRecentPosts] = useState(null);


    useEffect(() => {

        const fetchPost = async () => {
            try{
                setLoading(true);

                // Validate API_BASE is set
                if (!API_BASE || API_BASE === 'undefined') {
                    console.error("API URL is not configured", { API_BASE });
                    setError(true);
                    setLoading(false);
                    return;
                }

                const res = await fetch(`${API_BASE}/api/post/getposts?slug=${postSlug}`);
                
                let data;
                try {
                    data = await res.json();
                } catch (err) {
                    console.error("Failed to parse post response:", err, res.status);
                    setError(true);
                    setLoading(false);
                    return;
                }

                if(!res.ok){
                    console.error("Post fetch error:", { status: res.status, message: data?.message });
                    setError(true);
                    setLoading(false);
                    return ;
                }

                // Validate response has posts array
                if(!data.posts || !Array.isArray(data.posts)) {
                    console.error("Invalid post response structure:", data);
                    setError(true);
                    setLoading(false);
                    return;
                }

                // Check if post was found
                if(data.posts.length === 0) {
                    console.warn("Post not found:", { slug: postSlug });
                    setError(true);
                    setLoading(false);
                    return;
                }

                setPost(data.posts[0]);
                setLoading(false);
                setError(false);
            }catch(error){
                console.error("Network error fetching post:", error);
                setError(true);
                setLoading(false);
            }
        };
        fetchPost();

    },[postSlug]);


     useEffect(() => {
    try {
      const fetchRecentPosts = async () => {
        const res = await fetch(
          `${API_BASE}/api/post/getposts?limit=3`
        );
        const data = await res.json();
        if (res.ok) {
          setRecentPosts(data.posts);
        }
      };
      fetchRecentPosts();
    } catch (error) {
      console.log(error.message);
    }
  }, []);




   if (loading)
    return (
      <div className='flex justify-center items-center min-h-screen'>
        <Spinner size='xl' />
      </div>
    );
  return (
    <main className='p-3 flex flex-col max-w-8xl mx-auto min-h-screen'>
      <h1 className='text-5xl mt-10 p-3 text-center font-serif max-w-5xl mx-auto lg:text-4xl'>
        {post && post.title}
      </h1>
      <Link
        to={`/search?category=${post && post.category}`}
        className='self-center mt-5'
      >
        <Button color='gray' pill size='xs'>
          {post && post.category}
        </Button>
      </Link>
      <img
        src={post && post.image}
        alt={post && post.title}
        className='mt-10 p-3 max-h-[600px] w-full object-cover'
      />
      <div className='flex justify-between p-3 border-b border-slate-500 mx-auto w-full max-w-2xl text-xs'>
        <span>{post && new Date(post.createdAt).toLocaleDateString()}</span>
        <span className='italic'>
          {post && (post.content.length / 1000).toFixed(0)} mins read
        </span>
      </div>
      <div
        className='p-3 max-w-4xl mx-auto w-full post-content'
        dangerouslySetInnerHTML={{ __html: post && post.content }}
        
      ></div>
      <CommentSection postId = {post._id}/>


       <div className='flex flex-col justify-center items-center mb-5'>
        <h1 className='text-xl mt-5'>Recent articles</h1>
        <div className='flex flex-wrap gap-5 mt-5 justify-center'>
          {recentPosts &&
            recentPosts.map((post) => <PostCard key={post._id} post={post} />)}
        </div>
      </div>

      
      

      
    </main>
  );
}

