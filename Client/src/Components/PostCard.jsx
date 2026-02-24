// import { Link } from 'react-router-dom';

// export default function PostCard({ post }) {
//   return (
//     <div className='group relative border border-teal-500 hover:border-2 h-[400px] overflow-hidden rounded-lg md:w-[430px] transition-all mx-auto'>
//       <Link to={`/post/${post.slug}`}>
//         <img
//           src={post.image}
//           alt='post cover'
//           className='h-[260px] w-full  object-cover group-hover:h-[200px] transition-all duration-300 z-20'
//         />
//       </Link>
//       <div className='p-3 flex flex-col gap-2'>
//         <p className='text-lg font-semibold line-clamp-2'>{post.title}</p>
//         <span className='italic text-sm'>{post.category}</span>
//         <Link
//           to={`/post/${post.slug}`}
//           className='z-10 group-hover:bottom-0 absolute bottom-[-200px] left-0 right-0 border border-teal-500 text-teal-500 hover:bg-teal-500 hover:text-white transition-all duration-300 text-center py-2 rounded-md !rounded-tl-none m-2'
//         >
//           Read article
//         </Link>
//       </div>
//     </div>
//   );
// }



import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

export default function PostCard({ post }) {
  const { mode } = useSelector((state) => state.theme);
  // return (
  //   <div className="group relative bg-white border border-teal-200 hover:border-teal-400  hover:shadow-xl h-[400px] overflow-hidden rounded-xl md:w-[430px] transition-all duration-300 mx-auto">

  //     {/* Gradient Border Effect */}
  //     <div className="absolute inset-0 rounded-xl bg-linear-to-r from-teal-500 to-indigo-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10 blur-sm"></div>

  //     <Link to={`/post/${post.slug}`}>
  //       <img
  //         src={post.image}
  //         alt="post cover"
  //         className="h-[260px] w-full object-cover group-hover:h-[200px] transition-all duration-300"
  //       />
  //     </Link>

  //     <div className="p-4 flex flex-col gap-2">

  //       <p className="text-lg font-semibold line-clamp-2 text-gray-800">
  //         {post.title}
  //       </p>

  //       <span className="italic text-sm text-teal-600 font-medium">
  //         {post.category}
  //       </span>

  //       <Link
  //         to={`/post/${post.slug}`}
  //         className="z-10 group-hover:bottom-4 absolute bottom-[-200px] left-4 right-4 bg-gradient-to-r from-teal-600 to-indigo-600 text-white transition-all duration-300 text-center py-2 rounded-md shadow-md hover:from-teal-700 hover:to-indigo-700"
  //       >
  //         Read Article
  //       </Link>

  //     </div>
  //   </div>
  // );





return (
  <div
    className={`group relative border h-[400px] overflow-hidden rounded-xl md:w-[430px] transition-all duration-300 mx-auto
      ${mode === "dark"
        ? "bg-gray-900 border-gray-700"
        : "bg-white border-teal-200 hover:border-teal-400 hover:shadow-xl"
      }`}
  >
    {/* Gradient Border Effect */}
    <div
      className={`absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10 blur-sm
        ${mode === "dark"
          ? "bg-gradient-to-r from-teal-500 to-indigo-500/50"
          : "bg-linear-to-r from-teal-500 to-indigo-500"
        }`}
    ></div>

    <Link to={`/post/${post.slug}`}>
      <img
        src={post.image}
        alt="post cover"
        className="h-[260px] w-full object-cover group-hover:h-[200px] transition-all duration-300"
      />
    </Link>

    <div className="p-4 flex flex-col gap-2">
      <p
        className={`text-lg font-semibold line-clamp-2 ${
          mode === "dark" ? "text-gray-100" : "text-gray-800"
        }`}
      >
        {post.title}
      </p>

      <span
        className={`italic text-sm font-medium ${
          mode === "dark" ? "text-teal-400" : "text-teal-600"
        }`}
      >
        {post.category}
      </span>

      {/* Read Article button remains unchanged */}
      <Link
        to={`/post/${post.slug}`}
        className="z-10 group-hover:bottom-4 absolute bottom-[-200px] left-4 right-4 bg-gradient-to-r from-teal-600 to-indigo-600 text-white transition-all duration-300 text-center py-2 rounded-md shadow-md hover:from-teal-700 hover:to-indigo-700"
      >
        Read Article
      </Link>
    </div>
  </div>
);

}