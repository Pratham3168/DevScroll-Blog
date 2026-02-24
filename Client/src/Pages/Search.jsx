import { Button, Select, TextInput } from 'flowbite-react';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import PostCard from '../Components/PostCard';
import { useSelector } from 'react-redux';
import { API_BASE } from '../utils';

export default function Search() {
  const [sidebarData, setSidebarData] = useState({
  searchTerm: '',
  sort: 'desc',
  category: '',
});

  console.log(sidebarData);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showMore, setShowMore] = useState(false);
    const { mode } = useSelector((state) => state.theme);

  const location = useLocation();

  const navigate = useNavigate();

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const searchTermFromUrl = urlParams.get('searchTerm');
    const sortFromUrl = urlParams.get('sort');
    const categoryFromUrl = urlParams.get('category');
    if (searchTermFromUrl || sortFromUrl || categoryFromUrl) {
      setSidebarData({
  searchTerm: searchTermFromUrl || '',
  sort: sortFromUrl || 'desc',
  category: categoryFromUrl || '',
});
    }

    const fetchPosts = async () => {
      setLoading(true);
      const searchQuery = urlParams.toString();
      const res = await fetch(
        `${API_BASE}/api/post/getposts?${searchQuery}`
      );
      if (!res.ok) {
        setLoading(false);
        return;
      }
      if (res.ok) {
        const data = await res.json();
        setPosts(data.posts);
        setLoading(false);
        if (data.posts.length === 9) {
          setShowMore(true);
        } else {
          setShowMore(false);
        }
      }
    };
    fetchPosts();
  }, [location.search]);

  const handleChange = (e) => {
  if (e.target.id === 'searchTerm') {
    setSidebarData({ ...sidebarData, searchTerm: e.target.value });
  }

  if (e.target.id === 'sort') {
    setSidebarData({ ...sidebarData, sort: e.target.value });
  }

  if (e.target.id === 'category') {
    setSidebarData({ ...sidebarData, category: e.target.value });
  }
};

  const handleSubmit = (e) => {
    e.preventDefault();
    const urlParams = new URLSearchParams(location.search);
    urlParams.set('searchTerm', sidebarData.searchTerm);
    urlParams.set('sort', sidebarData.sort);
    if (sidebarData.category) {
  urlParams.set('category', sidebarData.category);
} else {
  urlParams.delete('category');
}
    const searchQuery = urlParams.toString();
    navigate(`/search?${searchQuery}`);
  };

  const handleShowMore = async () => {
    const numberOfPosts = posts.length;
    const startIndex = numberOfPosts;
    const urlParams = new URLSearchParams(location.search);
    urlParams.set('startIndex', startIndex);
    const searchQuery = urlParams.toString();
    const res = await fetch(
      `${API_BASE}/api/post/getposts?${searchQuery}`
    );
    if (!res.ok) {
      return;
    }
    if (res.ok) {
      const data = await res.json();
      setPosts([...posts, ...data.posts]);
      if (data.posts.length === 9) {
        setShowMore(true);
      } else {
        setShowMore(false);
      }
    }
  };

  // return (
  //   <div className='flex flex-col md:flex-row'>
  //     <div className='p-7 border-b md:border-r md:min-h-screen border-gray-500'>
  //       <form className='flex flex-col gap-8' onSubmit={handleSubmit}>
  //         <div className='flex   items-center gap-2'>
  //           <label className='whitespace-nowrap font-semibold'>
  //             Search Term:
  //           </label>
  //           <TextInput
  //             placeholder='Search...'
  //             id='searchTerm'
  //             type='text'
  //             value={sidebarData.searchTerm}
  //             onChange={handleChange}
  //           />
  //         </div>
  //         <div className='flex items-center gap-2'>
  //           <label className='font-semibold'>Sort:</label>
  //           <Select onChange={handleChange} value={sidebarData.sort} id='sort'>
  //             <option value='desc'>Latest</option>
  //             <option value='asc'>Oldest</option>
  //           </Select>
  //         </div>
  //         <div className='flex items-center gap-2'>
  //           <label className='font-semibold'>Category:</label>
  //           <Select
  //             onChange={handleChange}
  //             value={sidebarData.category}
  //             id='category'
  //           >
  //               <option value=''>All</option>
  //             <option value='uncategorized'>Uncategorized</option>
  //             <option value='reactjs'>React.js</option>
  //             <option value='nextjs'>Next.js</option>
  //             <option value='javascript'>JavaScript</option>
  //           </Select>
  //         </div>
  //         <Button type='submit' outline gradientDuoTone='purpleToPink'>
  //           Apply Filters
  //         </Button>
  //       </form>
  //     </div>
  //     <div className='w-full'>
  //       <h1 className='text-3xl font-semibold sm:border-b border-gray-500 p-3 mt-5 '>
  //         Posts results:
  //       </h1>
  //       <div className='p-7 flex flex-wrap gap-4'>
  //         {!loading && posts.length === 0 && (
  //           <p className='text-xl text-gray-500'>No posts found.</p>
  //         )}
  //         {loading && <p className='text-xl text-gray-500'>Loading...</p>}
  //         {!loading &&
  //           posts &&
  //           posts.map((post) => <PostCard key={post._id} post={post} />)}
  //         {showMore && (
  //           <button
  //             onClick={handleShowMore}
  //             className='text-teal-500 text-lg hover:underline p-7 w-full'
  //           >
  //             Show More
  //           </button>
  //         )}
  //       </div>
  //     </div>
  //   </div>
  // );

// return (
//   <div className="min-h-screen bg-gray-50">
//     <div className="max-w-7xl flex flex-col md:flex-row">

//       {/* Sidebar - Small */}
//       <aside className="w-full md:max-w-1/4 border-b md:border-b-0 md:border-r border-gray-200 p-6 bg-white">
//         <h2 className="text-xl font-bold mb-6 text-gray-800">
//           Filter Posts
//         </h2>

//         <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
          
//           <div className="flex flex-col gap-2">
//             <label className="text-sm font-semibold text-gray-600">
//               Search Term
//             </label>
//             <TextInput
//               placeholder="Search posts..."
//               id="searchTerm"
//               type="text"
//               value={sidebarData.searchTerm}
//               onChange={handleChange}
//             />
//           </div>

//           <div className="flex flex-col gap-2">
//             <label className="text-sm font-semibold text-gray-600">
//               Sort By
//             </label>
//             <Select
//               onChange={handleChange}
//               value={sidebarData.sort}
//               id="sort"
//             >
//               <option value="desc">Latest</option>
//               <option value="asc">Oldest</option>
//             </Select>
//           </div>

//           <div className="flex flex-col gap-2">
//             <label className="text-sm font-semibold text-gray-600">
//               Category
//             </label>
//             <Select
//               onChange={handleChange}
//               value={sidebarData.category}
//               id="category"
//             >
//               <option value="">All</option>
//               <option value="uncategorized">Uncategorized</option>
//               <option value="reactjs">React.js</option>
//               <option value="nextjs">Next.js</option>
//               <option value="javascript">JavaScript</option>
//             </Select>
//           </div>

//           <Button
//             type="submit"
            
//             className="mt-3 w-full py-2 rounded-full bg-gradient-to-r from-teal-600 to-indigo-600 text-white font-medium hover:from-teal-700 hover:to-indigo-700 transition duration-200"
//           >
//             Apply Filters
//           </Button>
//         </form>
//       </aside>

//       {/* Posts Section - Bigger */}
//       <main className="flex-1 p-8">
//         <h1 className="text-3xl font-bold text-gray-800 mb-2">
//           Post Results
//         </h1>
//         <p className="text-gray-500 mb-8">
//           Explore filtered blog posts
//         </p>

//         <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-8">
          
//           {!loading && posts.length === 0 && (
//             <p className="text-gray-500">No posts found.</p>
//           )}

//           {loading && (
//             <p className="text-gray-500">Loading posts...</p>
//           )}

//           {!loading &&
//             posts &&
//             posts.map((post) => (
//               <PostCard key={post._id} post={post} />
//             ))}
//         </div>

//         {showMore && (
//           <div className="flex justify-center mt-12">
//             <button
//               onClick={handleShowMore}
//               className="px-6 py-2 rounded-full border border-teal-500 text-teal-500 hover:bg-teal-500 hover:text-white transition duration-200"
//             >
//               Show More
//             </button>
//           </div>
//         )}
//       </main>
//     </div>
//   </div>
// );







return (
  <div className={`min-h-screen transition-colors ${mode === "light" ? "bg-gray-50" : "bg-gray-900"}`}>
    <div className="max-w-7xl flex flex-col md:flex-row">

      {/* Sidebar */}
      <aside className={`w-full md:max-w-1/4 border-b md:border-b-0 md:border-r p-6 transition-colors
                         ${mode === "light" ? "bg-white border-gray-200" : "bg-gray-800 border-gray-700"}`}>
        <h2 className={`text-xl font-bold mb-6 transition-colors ${mode === "light" ? "text-gray-800" : "text-gray-100"}`}>
          Filter Posts
        </h2>

        <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
          
          <div className="flex flex-col gap-2">
            <label className={`text-sm font-semibold transition-colors ${mode === "light" ? "text-gray-600" : "text-gray-300"}`}>
              Search Term
            </label>
            <TextInput
              placeholder="Search posts..."
              id="searchTerm"
              type="text"
              value={sidebarData.searchTerm}
              onChange={handleChange}
              className={mode === "dark" ? "bg-gray-700 text-gray-200 border-gray-600 focus:ring-teal-500 focus:border-teal-500" : ""}
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className={`text-sm font-semibold transition-colors ${mode === "light" ? "text-gray-600" : "text-gray-300"}`}>
              Sort By
            </label>
            <Select
              onChange={handleChange}
              value={sidebarData.sort}
              id="sort"
              className={mode === "dark" ? "bg-gray-700 text-gray-200 border-gray-600 focus:ring-teal-500 focus:border-teal-500" : ""}
            >
              <option value="desc">Latest</option>
              <option value="asc">Oldest</option>
            </Select>
          </div>

          <div className="flex flex-col gap-2">
            <label className={`text-sm font-semibold transition-colors ${mode === "light" ? "text-gray-600" : "text-gray-300"}`}>
              Category
            </label>
            <Select
              onChange={handleChange}
              value={sidebarData.category}
              id="category"
              className={mode === "dark" ? "bg-gray-700 text-gray-200 border-gray-600 focus:ring-teal-500 focus:border-teal-500" : ""}
            >
              <option value="">All</option>
              <option value="uncategorized">Uncategorized</option>
              <option value="reactjs">React.js</option>
              <option value="nextjs">Next.js</option>
              <option value="javascript">JavaScript</option>
            </Select>
          </div>

          <Button
            type="submit"
            className={`mt-3 w-full py-2 rounded-full font-medium transition duration-200
                        ${mode === "light" 
                          ? "bg-gradient-to-r from-teal-600 to-indigo-600 text-white hover:from-teal-700 hover:to-indigo-700" 
                          : "bg-gradient-to-r from-teal-500 to-indigo-700 text-white hover:from-teal-600 hover:to-indigo-800"}`}
          >
            Apply Filters
          </Button>
        </form>
      </aside>

      {/* Posts Section */}
      <main className={`flex-1 p-8 transition-colors ${mode === "light" ? "" : "text-gray-200"}`}>
        <h1 className={`text-3xl font-bold mb-2 transition-colors ${mode === "light" ? "text-gray-800" : "text-gray-100"}`}>
          Post Results
        </h1>
        <p className={`mb-8 transition-colors ${mode === "light" ? "text-gray-500" : "text-gray-400"}`}>
          Explore filtered blog posts
        </p>

        <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-8">
          
          {!loading && posts.length === 0 && (
            <p className={`transition-colors ${mode === "light" ? "text-gray-500" : "text-gray-400"}`}>No posts found.</p>
          )}

          {loading && (
            <p className={`transition-colors ${mode === "light" ? "text-gray-500" : "text-gray-400"}`}>Loading posts...</p>
          )}

          {!loading &&
            posts &&
            posts.map((post) => (
              <PostCard key={post._id} post={post} mode={mode} />
            ))}
        </div>

        {showMore && (
          <div className="flex justify-center mt-12">
            <button
              onClick={handleShowMore}
              className={`px-6 py-2 rounded-full border transition duration-200
                          ${mode === "light" 
                            ? "border-teal-500 text-teal-500 hover:bg-teal-500 hover:text-white"
                            : "border-teal-400 text-teal-400 hover:bg-teal-600 hover:text-white"}`}
            >
              Show More
            </button>
          </div>
        )}
      </main>
    </div>
  </div>
);
}