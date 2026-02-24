import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import {
  HiAnnotation,
  HiArrowNarrowUp,
  HiDocumentText,
  HiOutlineUserGroup,
} from 'react-icons/hi';
import { Table, TableHead, TableBody,TableHeadCell,TableRow,TableCell } from 'flowbite-react';
import { Link } from 'react-router-dom';



export default function DashComp() {
    const [users, setUsers] = useState([]);
  const [comments, setComments] = useState([]);
  const [posts, setPosts] = useState([]);
  const [totalUsers, setTotalUsers] = useState(0);
    const { mode } = useSelector((state) => state.theme);

  const [totalPosts, setTotalPosts] = useState(0);
  const [totalComments, setTotalComments] = useState(0);
  const [lastMonthUsers, setLastMonthUsers] = useState(0);
  const [lastMonthPosts, setLastMonthPosts] = useState(0);
  const [lastMonthComments, setLastMonthComments] = useState(0);
  const { currentUser } = useSelector((state) => state.user);


  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await fetch(
          `http://localhost:2068/api/user/getusers?limit=5`,
          {
            credentials: 'include',
          }
        );
        const data = await res.json();
        if (res.ok) {
          setUsers(data.users);
          setTotalUsers(data.totalUsers);
          setLastMonthUsers(data.lastMonthUsers);
        }
      } catch (error) {
        console.log(error.message);
      }
    };
    const fetchPosts = async () => {
      try {
        const res = await fetch(
          `http://localhost:2068/api/post/getposts?limit=5`,
          {
            credentials: 'include',
          }
        );
        const data = await res.json();
        if (res.ok) {
          setPosts(data.posts);
          setTotalPosts(data.totalPosts);
          setLastMonthPosts(data.lastMonthPosts);
        }
      } catch (error) {
        console.log(error.message);
      }
    };
    const fetchComments = async () => {
      try {
        const res = await fetch(
          `http://localhost:2068/api/comment/getcomments?limit=5`,
          {
            credentials: 'include',
          }
        );
        const data = await res.json();
        if (res.ok) {
          setComments(data.comment || []);
          setTotalComments(data.totalComments);
          setLastMonthComments(data.lastMonthComments);
        }
      } catch (error) {
        console.log(error.message);
      }
    };
    if (currentUser.isAdmin) {
      fetchUsers();
      fetchPosts();
      fetchComments();
    }
  }, [currentUser]);


//   return (
//   <div className="p-6 max-w-7xl mx-auto">

//     {/* ===== TOP STATS ===== */}
//     <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">

//       {/* CARD */}
//       <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-lg hover:shadow-xl transition-all p-6 border border-gray-100 dark:border-slate-700">
//         <div className="flex justify-between items-center">
//           <div>
//             <h3 className="text-gray-900 dark:text-gray-900 uppercase text-sm tracking-wide">
//               Total Users
//             </h3>
//             <p className="text-3xl font-bold mt-2 text-black dark:text-black">
//               {totalUsers}
//             </p>
//           </div>
//           <div className="bg-teal-500/20 p-4 rounded-full">
//             <HiOutlineUserGroup className="text-teal-600 text-3xl" />
//           </div>
//         </div>

//         <div className="flex items-center gap-2 mt-4 text-sm">
//           <span className="flex items-center text-green-500 font-medium">
//             <HiArrowNarrowUp className="mr-1" />
//             {lastMonthUsers}
//           </span>
//           <span className="text-gray-700 dark:text-gray-700">
//             vs last month
//           </span>
//         </div>
//       </div>

//       {/* CARD */}
//       <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-lg hover:shadow-xl transition-all p-6 border border-gray-100 dark:border-slate-700">
//         <div className="flex justify-between items-center">
//           <div>
//             <h3 className="text-gray-900 dark:text-gray-900 uppercase text-sm tracking-wide">
//               Total Comments
//             </h3>
//             <p className="text-3xl font-bold mt-2 text-black dark:text-black">
//               {totalComments}
//             </p>
//           </div>
//           <div className="bg-indigo-500/20 p-4 rounded-full">
//             <HiAnnotation className="text-indigo-600 text-3xl" />
//           </div>
//         </div>

//         <div className="flex items-center gap-2 mt-4 text-sm">
//           <span className="flex items-center text-green-500 font-medium">
//             <HiArrowNarrowUp className="mr-1" />
//             {lastMonthComments}
//           </span>
//           <span className="text-gray-700 dark:text-gray-700">
//             vs last month
//           </span>
//         </div>
//       </div>

//       {/* CARD */}
//       <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-lg hover:shadow-xl transition-all p-6 border border-gray-100 dark:border-slate-700">
//         <div className="flex justify-between items-center">
//           <div>
//             <h3 className="text-gray-900 dark:text-gray-900  uppercase text-sm tracking-wide">
//               Total Posts
//             </h3>
//             <p className="text-3xl font-semibold mt-2 text-black dark:text-black">
//               {totalPosts}
//             </p>
//           </div>
//           <div className="bg-lime-500/20 p-4 rounded-full">
//             <HiDocumentText className="text-lime-600 text-3xl" />
//           </div>
//         </div>

//         <div className="flex items-center gap-2 mt-4 text-sm">
//           <span className="flex items-center text-green-500 font-medium">
//             <HiArrowNarrowUp className="mr-1" />
//             {lastMonthPosts}
//           </span>
//           <span className="text-gray-500 dark:text-gray-400">
//             vs last month
//           </span>
//         </div>
//       </div>

//     </div>

//     {/* ===== TABLE SECTION ===== */}
//     <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-8">

//       {/* RECENT USERS */}
//       <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-lg border border-gray-100 dark:border-slate-700">
//         <div className="flex justify-between items-center p-5 border-b dark:border-slate-700">
//           <h2 className="font-semibold text-black dark:text-black">
//             Recent Users
//           </h2>
//           <Link
//             to="/dashboard?tab=users"
//             className="text-sm text-purple-600 hover:underline"
//           >
//             See all →
//           </Link>
//         </div>

//         <div className="p-4 overflow-x-auto">
//           <Table hoverable>
//             <TableHead className="bg-gray-50 dark:bg-slate-800 text-gray-600 dark:text-gray-300 text-xs uppercase">
//               <TableRow>
//                 <TableHeadCell>User</TableHeadCell>
//                 <TableHeadCell>Username</TableHeadCell>
//               </TableRow>
//             </TableHead>

//             <TableBody className="divide-y dark:divide-slate-700">
//               {users?.map((user) => (
//                 <TableRow
//                   key={user._id}
//                   className="hover:bg-gray-50 dark:hover:bg-slate-800 transition"
//                 >
//                   <TableCell>
//                     <img
//                       src={user.profilePhotoUrl}
//                       alt="user"
//                       className="w-10 h-10 rounded-full object-cover"
//                     />
//                   </TableCell>
//                   <TableCell className="font-medium text-gray-700 dark:text-gray-700">
//                     {user.username}
//                   </TableCell>
//                 </TableRow>
//               ))}
//             </TableBody>
//           </Table>
//         </div>
//       </div>

//       {/* RECENT COMMENTS */}
//       <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-lg border border-gray-100 dark:border-slate-700">
//         <div className="flex justify-between items-center p-5 border-b dark:border-slate-700">
//           <h2 className="font-semibold  text-black dark:text-black">
//             Recent Comments
//           </h2>
//           <Link
//             to="/dashboard?tab=comments"
//             className="text-sm text-purple-600 hover:underline"
//           >
//             See all →
//           </Link>
//         </div>

//         <div className="p-4 overflow-x-auto">
//           <Table hoverable>
//             <TableHead className="bg-gray-50 dark:bg-slate-800 text-gray-600 dark:text-gray-300 text-xs uppercase">
//               <TableRow>
//                 <TableHeadCell>Comment</TableHeadCell>
//                 <TableHeadCell>Likes</TableHeadCell>
//               </TableRow>
//             </TableHead>

//             <TableBody className="divide-y dark:divide-slate-700">
//               {comments?.map((comment) => (
//                 <TableRow
//                   key={comment._id}
//                   className="hover:bg-gray-50 dark:hover:bg-slate-800 transition"
//                 >
//                   <TableCell className="max-w-xs">
//                     <p className="line-clamp-2text-gray-700 dark:text-gray-700">
//                       {comment.content}
//                     </p>
//                   </TableCell>
//                   <TableCell className="font-medium text-gray-700 dark:text-gray-700">
//                     {comment.numberOfLikes}
//                   </TableCell>
//                 </TableRow>
//               ))}
//             </TableBody>
//           </Table>
//         </div>
//       </div>

//       {/* RECENT POSTS */}
//       <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-lg border border-gray-100 dark:border-slate-700">
//         <div className="flex justify-between items-center p-5 border-b dark:border-slate-700">
//           <h2 className="font-semibold text-black dark:text-black">
//             Recent Posts
//           </h2>
//           <Link
//             to="/dashboard?tab=posts"
//             className="text-sm text-purple-600 hover:underline"
//           >
//             See all →
//           </Link>
//         </div>

//         <div className="p-4 overflow-x-auto">
//           <Table hoverable>
//             <TableHead className="bg-gray-50 dark:bg-slate-800 text-gray-600 dark:text-gray-300 text-xs uppercase">
//               <TableRow>
//                 <TableHeadCell>Post</TableHeadCell>
//                 <TableHeadCell>Title</TableHeadCell>
//                 <TableHeadCell>Category</TableHeadCell>
//               </TableRow>
//             </TableHead>

//             <TableBody className="divide-y dark:divide-slate-700">
//               {posts?.map((post) => (
//                 <TableRow
//                   key={post._id}
//                   className="hover:bg-gray-50 dark:hover:bg-slate-800 transition"
//                 >
//                   <TableCell>
//                     <img
//                       src={post.image}
//                       alt="post"
//                       className="w-14 h-10 rounded-lg object-cover"
//                     />
//                   </TableCell>
//                   <TableCell className="font-mediumtext-gray-700 dark:text-gray-800 max-w-[160px] line-clamp-1">
//                     {post.title}
//                   </TableCell>
//                   <TableCell className="text-sm text-gray-500 dark:text-gray-400">
//                     {post.category}
//                   </TableCell>
//                 </TableRow>
//               ))}
//             </TableBody>
//           </Table>
//         </div>
//       </div>

//     </div>
//   </div>
// );

// return (
//   <div className="p-6 max-w-7xl mx-auto bg-slate-50 min-h-screen">

//     {/* ===== TOP STATS ===== */}
//     <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">

//       {/* CARD */}
//       <div className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 p-6 border border-slate-200">
//         <div className="flex justify-between items-center">
//           <div>
//             <h3 className="text-slate-500 uppercase text-sm tracking-wide font-medium">
//               Total Users
//             </h3>
//             <p className="text-3xl font-bold mt-2 text-slate-900">
//               {totalUsers}
//             </p>
//           </div>
//           <div className="bg-teal-100 p-4 rounded-full">
//             <HiOutlineUserGroup className="text-teal-600 text-3xl" />
//           </div>
//         </div>

//         <div className="flex items-center gap-2 mt-4 text-sm">
//           <span className="flex items-center text-green-600 font-medium">
//             <HiArrowNarrowUp className="mr-1" />
//             {lastMonthUsers}
//           </span>
//           <span className="text-slate-500">vs last month</span>
//         </div>
//       </div>

//       {/* CARD */}
//       <div className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 p-6 border border-slate-200">
//         <div className="flex justify-between items-center">
//           <div>
//             <h3 className="text-slate-500 uppercase text-sm tracking-wide font-medium">
//               Total Comments
//             </h3>
//             <p className="text-3xl font-bold mt-2 text-slate-900">
//               {totalComments}
//             </p>
//           </div>
//           <div className="bg-indigo-100 p-4 rounded-full">
//             <HiAnnotation className="text-indigo-600 text-3xl" />
//           </div>
//         </div>

//         <div className="flex items-center gap-2 mt-4 text-sm">
//           <span className="flex items-center text-green-600 font-medium">
//             <HiArrowNarrowUp className="mr-1" />
//             {lastMonthComments}
//           </span>
//           <span className="text-slate-500">vs last month</span>
//         </div>
//       </div>

//       {/* CARD */}
//       <div className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 p-6 border border-slate-200">
//         <div className="flex justify-between items-center">
//           <div>
//             <h3 className="text-slate-500 uppercase text-sm tracking-wide font-medium">
//               Total Posts
//             </h3>
//             <p className="text-3xl font-bold mt-2 text-slate-900">
//               {totalPosts}
//             </p>
//           </div>
//           <div className="bg-lime-100 p-4 rounded-full">
//             <HiDocumentText className="text-lime-600 text-3xl" />
//           </div>
//         </div>

//         <div className="flex items-center gap-2 mt-4 text-sm">
//           <span className="flex items-center text-green-600 font-medium">
//             <HiArrowNarrowUp className="mr-1" />
//             {lastMonthPosts}
//           </span>
//           <span className="text-slate-500">vs last month</span>
//         </div>
//       </div>

//     </div>

//     {/* ===== TABLE SECTION ===== */}
//     <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-8">

//       {/* RECENT USERS */}
//       <div className="bg-white rounded-2xl shadow-md border border-slate-200">
//         <div className="flex justify-between items-center p-5 border-b border-slate-200">
//           <h2 className="font-semibold text-slate-800">
//             Recent Users
//           </h2>
//           <Link
//             to="/dashboard?tab=users"
//             className="text-sm text-purple-600 hover:underline"
//           >
//             See all →
//           </Link>
//         </div>

//         <div className="p-4 overflow-x-auto">
//           <Table hoverable>
//             <TableHead className="bg-slate-50 text-slate-600 text-xs uppercase">
//               <TableRow>
//                 <TableHeadCell>User</TableHeadCell>
//                 <TableHeadCell>Username</TableHeadCell>
//               </TableRow>
//             </TableHead>

//             <TableBody className="divide-y divide-slate-200">
//               {users?.map((user) => (
//                 <TableRow
//                   key={user._id}
//                   className="hover:bg-slate-50 transition"
//                 >
//                   <TableCell>
//                     <img
//                       src={user.profilePhotoUrl}
//                       alt="user"
//                       className="w-10 h-10 rounded-full object-cover"
//                     />
//                   </TableCell>
//                   <TableCell className="font-medium text-slate-700">
//                     {user.username}
//                   </TableCell>
//                 </TableRow>
//               ))}
//             </TableBody>
//           </Table>
//         </div>
//       </div>

//       {/* RECENT COMMENTS */}
//       <div className="bg-white rounded-2xl shadow-md border border-slate-200">
//         <div className="flex justify-between items-center p-5 border-b border-slate-200">
//           <h2 className="font-semibold text-slate-800">
//             Recent Comments
//           </h2>
//           <Link
//             to="/dashboard?tab=comments"
//             className="text-sm text-purple-600 hover:underline"
//           >
//             See all →
//           </Link>
//         </div>

//         <div className="p-4 overflow-x-auto">
//           <Table hoverable>
//             <TableHead className="bg-slate-50 text-slate-600 text-xs uppercase">
//               <TableRow>
//                 <TableHeadCell>Comment</TableHeadCell>
//                 <TableHeadCell>Likes</TableHeadCell>
//               </TableRow>
//             </TableHead>

//             <TableBody className="divide-y divide-slate-200">
//               {comments?.map((comment) => (
//                 <TableRow
//                   key={comment._id}
//                   className="hover:bg-slate-50 transition"
//                 >
//                   <TableCell className="max-w-xs">
//                     <p className="line-clamp-2 text-slate-700">
//                       {comment.content}
//                     </p>
//                   </TableCell>
//                   <TableCell className="font-medium text-slate-700">
//                     {comment.numberOfLikes}
//                   </TableCell>
//                 </TableRow>
//               ))}
//             </TableBody>
//           </Table>
//         </div>
//       </div>

//       {/* RECENT POSTS */}
//       <div className="bg-white rounded-2xl shadow-md border border-slate-200">
//         <div className="flex justify-between items-center p-5 border-b border-slate-200">
//           <h2 className="font-semibold text-slate-800">
//             Recent Posts
//           </h2>
//           <Link
//             to="/dashboard?tab=posts"
//             className="text-sm text-purple-600 hover:underline"
//           >
//             See all →
//           </Link>
//         </div>

//         <div className="p-4 overflow-x-auto">
//           <Table hoverable>
//             <TableHead className="bg-slate-50 text-slate-600 text-xs uppercase">
//               <TableRow>
//                 <TableHeadCell>Post</TableHeadCell>
//                 <TableHeadCell>Title</TableHeadCell>
//                 <TableHeadCell>Category</TableHeadCell>
//               </TableRow>
//             </TableHead>

//             <TableBody className="divide-y divide-slate-200">
//               {posts?.map((post) => (
//                 <TableRow
//                   key={post._id}
//                   className="hover:bg-slate-50 transition"
//                 >
//                   <TableCell>
//                     <img
//                       src={post.image}
//                       alt="post"
//                       className="w-14 h-10 rounded-lg object-cover"
//                     />
//                   </TableCell>
//                   <TableCell className="font-medium text-slate-700 max-w-[160px] line-clamp-1">
//                     {post.title}
//                   </TableCell>
//                   <TableCell className="text-sm text-slate-500">
//                     {post.category}
//                   </TableCell>
//                 </TableRow>
//               ))}
//             </TableBody>
//           </Table>
//         </div>
//       </div>

//     </div>
//   </div>
// );


return (
  <div
    className={`p-6 max-w-7xl mx-auto min-h-screen ${
      mode === "dark"
        ? "bg-slate-900"
        : "bg-slate-50"
    }`}
  >

    {/* ===== TOP STATS ===== */}
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">

      {/* CARD */}
      <div
        className={`rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 p-6 border ${
          mode === "dark"
            ? "bg-slate-800 border-slate-700 hover:shadow-slate-950/40"
            : "bg-white border-slate-200"
        }`}
      >
        <div className="flex justify-between items-center">
          <div>
            <h3
              className={`uppercase text-sm tracking-wide font-medium ${
                mode === "dark" ? "text-slate-400" : "text-slate-500"
              }`}
            >
              Total Users
            </h3>
            <p
              className={`text-3xl font-bold mt-2 ${
                mode === "dark" ? "text-slate-100" : "text-slate-900"
              }`}
            >
              {totalUsers}
            </p>
          </div>

          <div
            className={`p-4 rounded-full ${
              mode === "dark"
                ? "bg-teal-500/10"
                : "bg-teal-100"
            }`}
          >
            <HiOutlineUserGroup
              className={`text-3xl ${
                mode === "dark" ? "text-teal-400" : "text-teal-600"
              }`}
            />
          </div>
        </div>

        <div className="flex items-center gap-2 mt-4 text-sm">
          <span className="flex items-center text-green-600 font-medium">
            <HiArrowNarrowUp className="mr-1" />
            {lastMonthUsers}
          </span>
          <span
            className={mode === "dark" ? "text-slate-400" : "text-slate-500"}
          >
            vs last month
          </span>
        </div>
      </div>

      {/* CARD */}
      <div
        className={`rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 p-6 border ${
          mode === "dark"
            ? "bg-slate-800 border-slate-700 hover:shadow-slate-950/40"
            : "bg-white border-slate-200"
        }`}
      >
        <div className="flex justify-between items-center">
          <div>
            <h3
              className={`uppercase text-sm tracking-wide font-medium ${
                mode === "dark" ? "text-slate-400" : "text-slate-500"
              }`}
            >
              Total Comments
            </h3>
            <p
              className={`text-3xl font-bold mt-2 ${
                mode === "dark" ? "text-slate-100" : "text-slate-900"
              }`}
            >
              {totalComments}
            </p>
          </div>

          <div
            className={`p-4 rounded-full ${
              mode === "dark"
                ? "bg-indigo-500/10"
                : "bg-indigo-100"
            }`}
          >
            <HiAnnotation
              className={`text-3xl ${
                mode === "dark" ? "text-indigo-400" : "text-indigo-600"
              }`}
            />
          </div>
        </div>

        <div className="flex items-center gap-2 mt-4 text-sm">
          <span className="flex items-center text-green-600 font-medium">
            <HiArrowNarrowUp className="mr-1" />
            {lastMonthComments}
          </span>
          <span
            className={mode === "dark" ? "text-slate-400" : "text-slate-500"}
          >
            vs last month
          </span>
        </div>
      </div>

      {/* CARD */}
      <div
        className={`rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 p-6 border ${
          mode === "dark"
            ? "bg-slate-800 border-slate-700 hover:shadow-slate-950/40"
            : "bg-white border-slate-200"
        }`}
      >
        <div className="flex justify-between items-center">
          <div>
            <h3
              className={`uppercase text-sm tracking-wide font-medium ${
                mode === "dark" ? "text-slate-400" : "text-slate-500"
              }`}
            >
              Total Posts
            </h3>
            <p
              className={`text-3xl font-bold mt-2 ${
                mode === "dark" ? "text-slate-100" : "text-slate-900"
              }`}
            >
              {totalPosts}
            </p>
          </div>

          <div
            className={`p-4 rounded-full ${
              mode === "dark"
                ? "bg-lime-500/10"
                : "bg-lime-100"
            }`}
          >
            <HiDocumentText
              className={`text-3xl ${
                mode === "dark" ? "text-lime-400" : "text-lime-600"
              }`}
            />
          </div>
        </div>

        <div className="flex items-center gap-2 mt-4 text-sm">
          <span className="flex items-center text-green-600 font-medium">
            <HiArrowNarrowUp className="mr-1" />
            {lastMonthPosts}
          </span>
          <span
            className={mode === "dark" ? "text-slate-400" : "text-slate-500"}
          >
            vs last month
          </span>
        </div>
      </div>
    </div>

    {/* ===== TABLE SECTION ===== */}
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-8">

      {/* RECENT USERS */}
      <div
        className={`rounded-2xl shadow-md border ${
          mode === "dark"
            ? "bg-slate-800 border-slate-700"
            : "bg-white border-slate-200"
        }`}
      >
        <div
          className={`flex justify-between items-center p-5 border-b ${
            mode === "dark"
              ? "border-slate-700"
              : "border-slate-200"
          }`}
        >
          <h2
            className={`font-semibold ${
              mode === "dark" ? "text-slate-100" : "text-slate-800"
            }`}
          >
            Recent Users
          </h2>
          <Link
            to="/dashboard?tab=users"
            className="text-sm text-purple-600 hover:underline"
          >
            See all →
          </Link>
        </div>

        <div className="p-4 overflow-x-auto">
          <Table hoverable>
            <TableHead
              className={
                mode === "dark"
                  ? "bg-slate-700 text-slate-300 text-xs uppercase"
                  : "bg-slate-50 text-slate-600 text-xs uppercase"
              }
            >
              <TableRow>
                <TableHeadCell>User</TableHeadCell>
                <TableHeadCell>Username</TableHeadCell>
              </TableRow>
            </TableHead>

            <TableBody className={`divide-y ${mode === "dark" ? "divide-slate-700" : "divide-slate-200"}`}>
              {users?.map((user) => (
                <TableRow
                  key={user._id}
                  className={mode === "dark" ? "hover:bg-slate-700" : "hover:bg-slate-50"}
                >
                  <TableCell>
                    <img
                      src={user.profilePhotoUrl}
                      alt="user"
                      className="w-10 h-10 rounded-full object-cover"
                    />
                  </TableCell>
                  <TableCell className={`font-medium ${mode === "dark" ? "text-slate-300" : "text-slate-700"}`}>
                    {user.username}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>

      {/* RECENT COMMENTS */}
      <div
        className={`rounded-2xl shadow-md border ${
          mode === "dark"
            ? "bg-slate-800 border-slate-700"
            : "bg-white border-slate-200"
        }`}
      >
        <div
          className={`flex justify-between items-center p-5 border-b ${
            mode === "dark"
              ? "border-slate-700"
              : "border-slate-200"
          }`}
        >
          <h2
            className={`font-semibold ${
              mode === "dark" ? "text-slate-100" : "text-slate-800"
            }`}
          >
            Recent Comments
          </h2>
          <Link
            to="/dashboard?tab=comments"
            className="text-sm text-purple-600 hover:underline"
          >
            See all →
          </Link>
        </div>

        <div className="p-4 overflow-x-auto">
          <Table hoverable>
            <TableHead
              className={
                mode === "dark"
                  ? "bg-slate-700 text-slate-300 text-xs uppercase"
                  : "bg-slate-50 text-slate-600 text-xs uppercase"
              }
            >
              <TableRow>
                <TableHeadCell>Comment</TableHeadCell>
                <TableHeadCell>Likes</TableHeadCell>
              </TableRow>
            </TableHead>

            <TableBody className={`divide-y ${mode === "dark" ? "divide-slate-700" : "divide-slate-200"}`}>
              {comments?.map((comment) => (
                <TableRow
                  key={comment._id}
                  className={mode === "dark" ? "hover:bg-slate-700" : "hover:bg-slate-50"}
                >
                  <TableCell className="max-w-xs">
                    <p className={`line-clamp-2 ${mode === "dark" ? "text-slate-300" : "text-slate-700"}`}>
                      {comment.content}
                    </p>
                  </TableCell>
                  <TableCell className={`font-medium ${mode === "dark" ? "text-slate-300" : "text-slate-700"}`}>
                    {comment.numberOfLikes}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>

      {/* RECENT POSTS */}
      <div
        className={`rounded-2xl shadow-md border ${
          mode === "dark"
            ? "bg-slate-800 border-slate-700"
            : "bg-white border-slate-200"
        }`}
      >
        <div
          className={`flex justify-between items-center p-5 border-b ${
            mode === "dark"
              ? "border-slate-700"
              : "border-slate-200"
          }`}
        >
          <h2
            className={`font-semibold ${
              mode === "dark" ? "text-slate-100" : "text-slate-800"
            }`}
          >
            Recent Posts
          </h2>
          <Link
            to="/dashboard?tab=posts"
            className="text-sm text-purple-600 hover:underline"
          >
            See all →
          </Link>
        </div>

        <div className="p-4 overflow-x-auto">
          <Table hoverable>
            <TableHead
              className={
                mode === "dark"
                  ? "bg-slate-700 text-slate-300 text-xs uppercase"
                  : "bg-slate-50 text-slate-600 text-xs uppercase"
              }
            >
              <TableRow>
                <TableHeadCell>Post</TableHeadCell>
                <TableHeadCell>Title</TableHeadCell>
                <TableHeadCell>Category</TableHeadCell>
              </TableRow>
            </TableHead>

            <TableBody className={`divide-y ${mode === "dark" ? "divide-slate-700" : "divide-slate-200"}`}>
              {posts?.map((post) => (
                <TableRow
                  key={post._id}
                  className={mode === "dark" ? "hover:bg-slate-700" : "hover:bg-slate-50"}
                >
                  <TableCell>
                    <img
                      src={post.image}
                      alt="post"
                      className="w-14 h-10 rounded-lg object-cover"
                    />
                  </TableCell>
                  <TableCell className={`font-medium max-w-40 line-clamp-1 ${mode === "dark" ? "text-slate-300" : "text-slate-700"}`}>
                    {post.title}
                  </TableCell>
                  <TableCell className={`text-sm ${mode === "dark" ? "text-slate-400" : "text-slate-500"}`}>
                    {post.category}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>

    </div>
  </div>
);
}
