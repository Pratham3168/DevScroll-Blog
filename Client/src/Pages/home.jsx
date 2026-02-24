// import { Link } from 'react-router-dom';
// import { useEffect, useState } from 'react';
// import PostCard from '../Components/PostCard';

// export default function home() {
//   const [posts, setPosts] = useState([]);

//   useEffect(() => {
//     const fetchPosts = async () => {
//       const res = await fetch(
//         `http://localhost:2068/api/post/getPosts`
//       );
//       const data = await res.json();
//       setPosts(data.posts);
//     };
//     fetchPosts();
//   }, []);
//   return (
//     <div>
//       <div className='flex flex-col gap-6 p-10  px-3 max-w-6xl mx-auto '>
//         <h1 className='text-3xl font-bold lg:text-6xl pt-10'>
//           Welcome to my Blog
//         </h1>
//         <p className='text-gray-500 text-xs sm:text-sm'>
//           Welcome to my blog! Here you'll find a wide range of articles,
//           tutorials, and resources designed to help you grow as a developer.
//           Whether you're interested in web development, software engineering,
//           programming languages, or best practices in the tech industry, there's
//           something here for everyone. Dive in and explore the content to expand
//           your knowledge and skills.
//         </p>
//         <Link
//           to='/search'
//           className='text-xs sm:text-sm text-teal-500 font-bold hover:underline'
//         >
//           View all posts
//         </Link>
//         <div className='p-3 bg-amber-100 dark:bg-slate-700'>
//         </div>
//       </div>

//       <div className='max-w-6xl mx-auto p-3 flex flex-col gap-8 py-3'>
//         {posts && posts.length > 0 && (
//           <div className='flex flex-col gap-6'>
//             <h2 className='text-2xl font-semibold text-center'>Recent Posts</h2>
//             <div className='flex flex-wrap gap-3'>
//               {posts.map((post) => (
//                 <PostCard key={post._id} post={post} />
//               ))}
//             </div>
//             <Link
//               to={'/search'}
//               className='text-lg text-teal-500 hover:underline text-center'
//             >
//               View all posts
//             </Link>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }






import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  HiArrowRight,
  HiCode,
  HiLightningBolt,
  HiGlobe,
} from "react-icons/hi";
import { useSelector } from "react-redux";
import { API_BASE } from "../utils";

export default function Home() {
  const [posts, setPosts] = useState([]);
    const { mode } = useSelector((state) => state.theme);


  useEffect(() => {
    const fetchPosts = async () => {
      const res = await fetch(
        `${API_BASE}/api/post/getPosts`
      );
      const data = await res.json();
      setPosts(data.posts);
    };
    fetchPosts();
  }, []);

//   return (
//     <div className="bg-gradient-to-br from-slate-50 via-white to-slate-100 min-h-screen">

//       {/* ================= HERO ================= */}
//       <section className="relative overflow-hidden">
//         <div className="absolute inset-0 bg-gradient-to-r from-teal-200/40 via-indigo-200/40 to-purple-200/40 blur-3xl"></div>

//         <div className="relative max-w-7xl mx-auto px-6 py-24 text-center flex flex-col items-center gap-8">

//           <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight text-slate-900">
//             Build. Learn. <span className="text-teal-600">Grow.</span>
//           </h1>

//           <p className="max-w-3xl text-lg text-slate-600">
//             A modern developer blog sharing tutorials, real-world projects,
//             performance tips, and practical insights to help you level up your
//             coding journey.
//           </p>

//           <div className="flex gap-6 mt-4">
//             <Link
//               to="/search"
//               className="flex items-center gap-2 px-8 py-3 rounded-full bg-gradient-to-r from-teal-600 to-indigo-600 text-white font-semibold shadow-lg hover:shadow-xl hover:scale-105 transition"
//             >
//               Explore Articles <HiArrowRight />
//             </Link>

//             <Link
//               to="/about"
//               className="px-8 py-3 rounded-full border border-slate-300 text-slate-700 font-semibold hover:bg-slate-100 transition"
//             >
//               About 
//             </Link>
//           </div>
//         </div>
//       </section>

//       {/* ================= FEATURES ================= */}
//       <section className="max-w-7xl mx-auto px-6 py-20 grid sm:grid-cols-2 lg:grid-cols-3 gap-10">

//         <div className="bg-white rounded-3xl shadow-md hover:shadow-2xl transition-all duration-300 p-10 text-center border border-slate-100">
//           <div className="bg-teal-100 p-4 rounded-full inline-block mb-6">
//             <HiCode className="text-teal-600 text-3xl" />
//           </div>
//           <h3 className="text-xl font-semibold text-slate-800 mb-3">
//             Clean & Scalable Code
//           </h3>
//           <p className="text-slate-600">
//            Learn practical coding patterns, architecture tips, and best practices used in real production environments.
//           </p>
//         </div>

//         <div className="bg-white rounded-3xl shadow-md hover:shadow-2xl transition-all duration-300 p-10 text-center border border-slate-100">
//           <div className="bg-indigo-100 p-4 rounded-full inline-block mb-6">
//             <HiLightningBolt className="text-indigo-600 text-3xl" />
//           </div>
//           <h3 className="text-xl font-semibold text-slate-800 mb-3">
//             Performance Focused
//           </h3>
//           <p className="text-slate-600">
// Discover techniques to improve speed, scalability, and overall application performance.          </p>
//         </div>

//         <div className="bg-white rounded-3xl shadow-md hover:shadow-2xl transition-all duration-300 p-10 text-center border border-slate-100">
//           <div className="bg-purple-100 p-4 rounded-full inline-block mb-6">
//             <HiGlobe className="text-purple-600 text-3xl" />
//           </div>
//           <h3 className="text-xl font-semibold text-slate-800 mb-3">
//             Real-World Projects
//           </h3>
//           <p className="text-slate-600">
// Step-by-step tutorials that help you build complete, production-ready applications.          </p>
//         </div>

//       </section>

//       {/* ================= RECENT POSTS ================= */}
//       <section className="max-w-7xl mx-auto px-6 py-24">
//         {posts && posts.length > 0 && (
//           <div className="flex flex-col gap-14">

//             <div className="text-center">
//               <h2 className="text-4xl font-bold text-slate-900">
//                 Recent Posts
//               </h2>
//               <p className="text-slate-500 mt-4 text-lg">
//                 Fresh insights and tutorials for modern developers.
//               </p>
//             </div>

//             {/* FIXED CARD GRID */}
//             <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-12">
//               {posts.slice(0, 6).map((post) => (
//                 <div
//                   key={post._id}
//                   className="bg-white rounded-3xl shadow-md hover:shadow-2xl transition-all duration-300 overflow-hidden group flex flex-col border border-slate-100"
//                 >
//                   {/* Image */}
//                   <div className="overflow-hidden">
//                     <img
//                       src={post.image}
//                       alt="post"
//                       className="w-full h-60 object-cover group-hover:scale-110 transition duration-700"
//                     />
//                   </div>

//                   {/* Content */}
//                   <div className="p-8 flex flex-col flex-1">

//                     <span className="text-xs font-semibold uppercase tracking-wide text-teal-600 bg-teal-50 px-4 py-1 rounded-full w-fit mb-4">
//                       {post.category}
//                     </span>

//                     <h3 className="text-xl font-semibold text-slate-800 line-clamp-2 group-hover:text-teal-600 transition mb-6">
//                       {post.title}
//                     </h3>

//                     {/* BUTTON FIX */}
//                     <Link
//                       to={`/post/${post.slug}`}
//                       className="mt-auto text-center px-6 py-3 rounded-xl bg-gradient-to-r from-slate-900 to-slate-800 text-white font-medium hover:from-teal-600 hover:to-indigo-600 transition-all duration-300 shadow-md hover:shadow-xl"
//                     >
//                       Read Article
//                     </Link>

//                   </div>
//                 </div>
//               ))}
//             </div>

//             <Link
//               to="/search"
//               className="mx-auto mt-12 px-10 py-4 bg-gradient-to-r from-teal-600 to-indigo-600 text-white rounded-full font-semibold shadow-lg hover:shadow-xl hover:scale-105 transition transform"
//             >
//               View All Articles
//             </Link>

//           </div>
//         )}
//       </section>

//       {/* ================= CTA ================= */}
//       <section className="bg-gradient-to-r from-teal-600 to-indigo-600 py-20 text-center text-white">
//         <h2 className="text-4xl font-bold mb-6">
//           Ready to Elevate Your Development Skills?
//         </h2>
//         <p className="text-lg mb-8 opacity-90">
//           Start learning today and build powerful, scalable applications.
//         </p>
//         <Link
//           to="/search"
//           className="px-10 py-4 bg-white text-teal-600 font-semibold rounded-full shadow-lg hover:scale-105 transition transform"
//         >
//           Start Reading
//         </Link>
//       </section>

//     </div>
//   );


return (
  <div className={`${mode === "light" ? "bg-gradient-to-br from-slate-50 via-white to-slate-100" : "bg-gray-900"} min-h-screen transition-colors`}>

    {/* ================= HERO ================= */}
    <section className="relative overflow-hidden">
      <div className={`absolute inset-0 blur-3xl ${
        mode === "light" 
          ? "bg-gradient-to-r from-teal-200/40 via-indigo-200/40 to-purple-200/40"
          : "bg-gradient-to-r from-teal-800/40 via-indigo-800/40 to-purple-800/40"
      }`}></div>

      <div className="relative max-w-7xl mx-auto px-6 py-24 text-center flex flex-col items-center gap-8">
        <h1 className={`${mode === "light" ? "text-slate-900" : "text-gray-100"} text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight`}>
          Build. Learn. <span className="text-teal-500">Grow.</span>
        </h1>

        <p className={`${mode === "light" ? "text-slate-600" : "text-gray-300"} max-w-3xl text-lg`}>
          A modern developer blog sharing tutorials, real-world projects,
          performance tips, and practical insights to help you level up your
          coding journey.
        </p>

        <div className="flex gap-6 mt-4">
          <Link
            to="/search"
            className="flex items-center gap-2 px-8 py-3 rounded-full bg-gradient-to-r from-teal-600 to-indigo-600 text-white font-semibold shadow-lg hover:shadow-xl hover:scale-105 transition"
          >
            Explore Articles <HiArrowRight />
          </Link>

          <Link
            to="/about"
            className={`px-8 py-3 rounded-full border font-semibold transition ${
              mode === "light" ? "border-slate-300 text-slate-700 hover:bg-slate-100" : "border-gray-700 text-gray-300 hover:bg-gray-800"
            }`}
          >
            About
          </Link>
        </div>
      </div>
    </section>

    {/* ================= FEATURES ================= */}
    <section className="max-w-7xl mx-auto px-6 py-20 grid sm:grid-cols-2 lg:grid-cols-3 gap-10">
      {[ // feature cards
        { icon: HiCode, title: "Clean & Scalable Code", text: "Learn practical coding patterns, architecture tips, and best practices used in real production environments.", colorBg: "bg-teal-100", colorText: "text-teal-600" },
        { icon: HiLightningBolt, title: "Performance Focused", text: "Discover techniques to improve speed, scalability, and overall application performance.", colorBg: "bg-indigo-100", colorText: "text-indigo-600" },
        { icon: HiGlobe, title: "Real-World Projects", text: "Step-by-step tutorials that help you build complete, production-ready applications.", colorBg: "bg-purple-100", colorText: "text-purple-600" }
      ].map((card, i) => (
        <div
          key={i}
          className={`rounded-3xl shadow-md transition-all duration-300 p-10 text-center border ${
            mode === "light" ? "bg-white border-slate-100 hover:shadow-2xl" : "bg-gray-800 border-gray-700 hover:shadow-xl"
          }`}
        >
          <div className={`${card.colorBg} p-4 rounded-full inline-block mb-6`}>
            <card.icon className={`${card.colorText} text-3xl`} />
          </div>
          <h3 className={`${mode === "light" ? "text-slate-800" : "text-gray-100"} text-xl font-semibold mb-3`}>
            {card.title}
          </h3>
          <p className={`${mode === "light" ? "text-slate-600" : "text-gray-300"}`}>
            {card.text}
          </p>
        </div>
      ))}
    </section>

    {/* ================= RECENT POSTS ================= */}
    <section className="max-w-7xl mx-auto px-6 py-24">
      {posts && posts.length > 0 && (
        <div className="flex flex-col gap-14">
          <div className="text-center">
            <h2 className={`${mode === "light" ? "text-slate-900" : "text-gray-100"} text-4xl font-bold`}>
              Recent Posts
            </h2>
            <p className={`${mode === "light" ? "text-slate-500" : "text-gray-300"} mt-4 text-lg`}>
              Fresh insights and tutorials for modern developers.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-12">
            {posts.slice(0, 6).map((post) => (
              <div
                key={post._id}
                className={`rounded-3xl transition-all duration-300 overflow-hidden group flex flex-col border ${
                  mode === "light" ? "bg-white border-slate-100 shadow-md hover:shadow-2xl" : "bg-gray-800 border-gray-700 shadow-md hover:shadow-xl"
                }`}
              >
                <div className="overflow-hidden">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-60 object-cover group-hover:scale-110 transition duration-700"
                  />
                </div>

                <div className="p-8 flex flex-col flex-1">
                  <span className={`text-xs font-semibold uppercase tracking-wide px-4 py-1 rounded-full w-fit mb-4 ${
                    mode === "light" ? "text-teal-600 bg-teal-50" : "text-teal-400 bg-teal-900/30"
                  }`}>
                    {post.category}
                  </span>

                  <h3 className={`text-xl font-semibold line-clamp-2 mb-6 transition-colors ${
                    mode === "light" ? "text-slate-800 group-hover:text-teal-600" : "text-gray-100 group-hover:text-teal-400"
                  }`}>
                    {post.title}
                  </h3>

                  <Link
                    to={`/post/${post.slug}`}
                    className={`mt-auto text-center px-6 py-3 rounded-xl font-medium shadow-md hover:shadow-xl transition-all duration-300 ${
                      mode === "light" 
                        ? "bg-gradient-to-r from-slate-900 to-slate-800 text-white hover:from-teal-600 hover:to-indigo-600"
                        : "bg-gradient-to-r from-gray-700 to-gray-800 text-white hover:from-teal-500 hover:to-indigo-700"
                    }`}
                  >
                    Read Article
                  </Link>
                </div>
              </div>
            ))}
          </div>

          <Link
            to="/search"
            className={`mx-auto mt-12 px-10 py-4 rounded-full font-semibold shadow-lg hover:shadow-xl hover:scale-105 transition transform ${
              mode === "light" ? "bg-gradient-to-r from-teal-600 to-indigo-600 text-white" : "bg-gradient-to-r from-teal-500 to-indigo-700 text-white"
            }`}
          >
            View All Articles
          </Link>
        </div>
      )}
    </section>

    {/* ================= CTA ================= */}
    <section className={`py-20 text-center ${mode === "light" ? "bg-gradient-to-r from-teal-600 to-indigo-600 text-white" : "bg-gradient-to-r from-teal-800 to-indigo-900 text-gray-100"}`}>
      <h2 className="text-4xl font-bold mb-6">
        Ready to Elevate Your Development Skills?
      </h2>
      <p className="text-lg mb-8 opacity-90">
        Start learning today and build powerful, scalable applications.
      </p>
      <Link
        to="/search"
        className={`${mode === "light" ? "bg-white text-teal-600" : "bg-gray-900 text-teal-400"} px-10 py-4 font-semibold rounded-full shadow-lg hover:scale-105 transition transform`}
      >
        Start Reading
      </Link>
    </section>

  </div>
);

}