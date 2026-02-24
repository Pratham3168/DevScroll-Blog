





import { 
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeadCell,
  TableRow,
  Modal,
  Button,
  ModalBody
} from "flowbite-react";

import { HiOutlineExclamationCircle } from "react-icons/hi";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

export default function DashPost() {

  const { currentUser } = useSelector((state) => state.user);

  const [userPosts, setUserPosts] = useState([]);
  const [showModal, setShowModal] = useState(false);
    const { mode } = useSelector((state) => state.theme);

  const [postIdToDelete, setPostIdToDelete] = useState(null);
  const [showMore, setShowMore] = useState(false);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await fetch(
          `http://localhost:2068/api/post/getposts?userId=${currentUser._id}`
        );
        const data = await res.json();

        if (res.ok) {
          setUserPosts(data.posts);
          if (data.posts.length === 9) {
            setShowMore(true);
          } else {
            setShowMore(false);
          }
        }
      } catch (err) {
        console.log(err);
      }
    };

    if (currentUser?.isAdmin) {
      fetchPosts();
    }
  }, [currentUser]);

  const handleDeletePost = async () => {
    try {
      const res = await fetch(
        `http://localhost:2068/api/post/deletepost/${postIdToDelete}/${currentUser._id}`,
        { method: "DELETE", credentials: 'include' }
      );

      if (res.ok) {
        setUserPosts((prev) =>
          prev.filter((post) => post._id !== postIdToDelete)
        );
        setShowModal(false);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleShowMore = async () => {
    try {
      const startIndex = userPosts.length;

      const res = await fetch(
        `http://localhost:2068/api/post/getposts?userId=${currentUser._id}&startIndex=${startIndex}`
      );

      const data = await res.json();

      if (res.ok) {
        setUserPosts((prev) => [...prev, ...data.posts]);

        if (data.posts.length < 9) {
          setShowMore(false);
        }
      }
    } catch (err) {
      console.log(err);
    }
  };

// return (
//   <div className="flex-1 p-4 sm:p-6 min-h-screen bg-gray-50 ">

//     {currentUser?.isAdmin && userPosts.length > 0 ? (

//       <div>  {/* <-- THIS WAS MISSING */}

//         {/* Table Wrapper */}
//         <div className="w-full overflow-x-auto rounded-xl border border-gray-200">

//           <Table hoverable className="w-full min-w-max">

//             <TableHead className="bg-gray-50">
//               <TableRow>
//                 <TableHeadCell>Date</TableHeadCell>
//                 <TableHeadCell>Thumbnail</TableHeadCell>
//                 <TableHeadCell>Title</TableHeadCell>
//                 <TableHeadCell>Category</TableHeadCell>
//                 <TableHeadCell className="text-center">
//                   Actions
//                 </TableHeadCell>
//               </TableRow>
//             </TableHead>

//             <TableBody className="divide-y">
//               {userPosts.map((post) => (
//                 <TableRow
//                   key={post._id}
//                   className="bg-white hover:!bg-gray-100 transition"
//                 >
//                   <TableCell className="text-gray-600 whitespace-nowrap">
//                     {new Date(post.updatedAt).toLocaleDateString()}
//                   </TableCell>

//                   <TableCell>
//                     <Link to={`/post/${post.slug}`}>
//                       <img
//                         src={post.image}
//                         alt={post.title}
//                         className="w-20 sm:w-24 h-12 sm:h-14 object-cover rounded-lg shadow-sm hover:scale-105 transition"
//                       />
//                     </Link>
//                   </TableCell>

//                   <TableCell className="font-semibold text-gray-800 whitespace-nowrap">
//                     <Link
//                       to={`/post/${post.slug}`}
//                       className="hover:text-teal-500 transition"
//                     >
//                       {post.title}
//                     </Link>
//                   </TableCell>

//                   <TableCell>
//                     <span className="px-3 py-1 text-xs font-medium bg-teal-100 text-teal-700 rounded-full whitespace-nowrap">
//                       {post.category}
//                     </span>
//                   </TableCell>

//                   <TableCell>
//                     <div className="flex justify-center gap-3 sm:gap-4 whitespace-nowrap">
//                       <button
//                         onClick={() => {
//                           setShowModal(true);
//                           setPostIdToDelete(post._id);
//                         }}
//                         className="text-red-500 hover:text-red-700 font-medium transition"
//                       >
//                         Delete
//                       </button>

//                       <Link
//                         to={`/update-post/${post._id}`}
//                         className="text-teal-500 hover:text-teal-700 font-medium transition"
//                       >
//                         Edit
//                       </Link>
//                     </div>
//                   </TableCell>

//                 </TableRow>
//               ))}
//             </TableBody>

//           </Table>
//         </div>
//         {showMore && (
//   <div className="flex justify-center mt-8">
//     <button
//       onClick={handleShowMore}
//       className="group inline-flex items-center gap-2 px-6 py-2.5 rounded-full 
//                  border border-gray-300 bg-white text-gray-700 
//                  font-medium text-sm shadow-sm
//                  hover:bg-gray-50 hover:shadow-md
//                  transition-all duration-200"
//     >
//       Show More
//       <svg
//         className="w-4 h-4 transition-transform duration-200 group-hover:translate-y-0.5"
//         fill="none"
//         stroke="currentColor"
//         strokeWidth="2"
//         viewBox="0 0 24 24"
//       >
//         <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
//       </svg>
//     </button>
//   </div>
// )}
//       </div>  

//     ) : (
//       <div className="flex flex-col items-center justify-center py-20 text-center">
//         <h3 className="text-lg sm:text-xl font-semibold text-gray-700">
//           No posts yet
//         </h3>
//         <p className="text-gray-500 mt-2">
//           Start by creating your first blog post.
//         </p>
//       </div>
//     )}

//      <Modal
//             show={showModal}
//             onClose={() => setShowModal(false)}
//             size="md"
//             popup
//           >
//             <ModalBody className="bg-white text-gray-900 border rounded-2xl">
//               <div className="text-center p-5 pt-10 w-full ">
//                 <h3 className="text-2xl font-bold mb-5 text-gray-900">
//                   Are you sure?
//                 </h3>
//                 <p className="mb-5 text-gray-600">
//                   Do you really want to delete this Post? This process cannot be
//                   undone.
//                 </p>
    
//                 <div className="flex gap-1 justify-around">
//                   <button
//                     onClick={handleDeletePost}
//                     className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition mr-2"
//                   >
//                     Delete
//                   </button>
    
//                   <button
//                     onClick={() => setShowModal(false)}
//                     className="bg-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-400 transition"
//                   >
//                     Cancel
//                   </button>
//                 </div>
//               </div>
//             </ModalBody>
//           </Modal>


//   </div>
  
// );


return (
  <div
    className={`flex-1 p-4 sm:p-6 min-h-screen ${
      mode === "dark" ? "bg-gray-900" : "bg-gray-50"
    }`}
  >
    {currentUser?.isAdmin && userPosts.length > 0 ? (
      <div>
        {/* Table Wrapper */}
        <div
          className={`w-full overflow-x-auto rounded-xl border ${
            mode === "dark" ? "border-gray-700" : "border-gray-200"
          }`}
        >
          <Table hoverable className="w-full min-w-max">
            <TableHead
              className={`${
                mode === "dark" ? "bg-gray-800 text-gray-300" : "bg-gray-50 text-gray-700"
              }`}
            >
              <TableRow>
                <TableHeadCell>Date</TableHeadCell>
                <TableHeadCell>Thumbnail</TableHeadCell>
                <TableHeadCell>Title</TableHeadCell>
                <TableHeadCell>Category</TableHeadCell>
                <TableHeadCell className="text-center">Actions</TableHeadCell>
              </TableRow>
            </TableHead>

            <TableBody className={`divide-y ${mode === "dark" ? "divide-gray-700" : "divide-gray-200"}`}>
              {userPosts.map((post) => (
                <TableRow
                  key={post._id}
                  className={`transition ${
                    mode === "dark"
                      ? "bg-gray-800 hover:bg-gray-200"
                      : "bg-white hover:bg-gray-100 "
                  }`}
                >
                  <TableCell className={`${mode === "dark" ? "text-gray-200" : "text-gray-600"} whitespace-nowrap`}>
                    {new Date(post.updatedAt).toLocaleDateString()}
                  </TableCell>

                  <TableCell>
                    <Link to={`/post/${post.slug}`}>
                      <img
                        src={post.image}
                        alt={post.title}
                        className="w-20 sm:w-24 h-12 sm:h-14 object-cover rounded-lg shadow-sm hover:scale-105 transition"
                      />
                    </Link>
                  </TableCell>

                  <TableCell
                    className={`font-semibold whitespace-nowrap ${
                      mode === "dark" ? "text-gray-100" : "text-gray-800"
                    }`}
                  >
                    <Link
                      to={`/post/${post.slug}`}
                      className="hover:text-teal-500 transition"
                    >
                      {post.title}
                    </Link>
                  </TableCell>

                  <TableCell>
                    <span
                      className={`px-3 py-1 text-xs font-medium rounded-full whitespace-nowrap ${
                        mode === "dark"
                          ? "bg-teal-700 text-teal-100"
                          : "bg-teal-100 text-teal-700"
                      }`}
                    >
                      {post.category}
                    </span>
                  </TableCell>

                  <TableCell>
                    <div className="flex justify-center gap-3 sm:gap-4 whitespace-nowrap">
                      <button
                        onClick={() => {
                          setShowModal(true);
                          setPostIdToDelete(post._id);
                        }}
                        className="text-red-500 hover:text-red-700 font-medium transition"
                      >
                        Delete
                      </button>

                      <Link
                        to={`/update-post/${post._id}`}
                        className="text-teal-500 hover:text-teal-700 font-medium transition"
                      >
                        Edit
                      </Link>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        {showMore && (
          <div className="flex justify-center mt-8">
            <button
              onClick={handleShowMore}
              className={`group inline-flex items-center gap-2 px-6 py-2.5 rounded-full border font-medium text-sm shadow-sm transition-all duration-200 ${
                mode === "dark"
                  ? "border-gray-600 bg-gray-800 text-gray-200 hover:bg-gray-700 hover:shadow-md"
                  : "border-gray-300 bg-white text-gray-700 hover:bg-gray-50 hover:shadow-md"
              }`}
            >
              Show More
              <svg
                className="w-4 h-4 transition-transform duration-200 group-hover:translate-y-0.5"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
            </button>
          </div>
        )}
      </div>
    ) : (
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <h3 className={`${mode === "dark" ? "text-gray-200" : "text-gray-700"} text-lg sm:text-xl font-semibold`}>
          No posts yet
        </h3>
        <p className={`${mode === "dark" ? "text-gray-400" : "text-gray-500"} mt-2`}>
          Start by creating your first blog post.
        </p>
      </div>
    )}

    <Modal
      show={showModal}
      onClose={() => setShowModal(false)}
      size="md"
      popup
    >
      <ModalBody
        className={`border rounded-2xl ${
          mode === "dark" ? "bg-gray-800 text-gray-200" : "bg-white text-gray-900"
        }`}
      >
        <div className="text-center p-5 pt-10 w-full">
          <h3 className="text-2xl font-bold mb-5">
            Are you sure?
          </h3>
          <p className={`${mode === "dark" ? "text-gray-300" : "text-gray-600"} mb-5`}>
            Do you really want to delete this Post? This process cannot be undone.
          </p>

          <div className="flex gap-1 justify-around">
            <button
              onClick={handleDeletePost}
              className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition mr-2"
            >
              Delete
            </button>

            <button
              onClick={() => setShowModal(false)}
              className={`px-4 py-2 rounded-lg transition ${
                mode === "dark"
                  ? "bg-gray-700 text-gray-200 hover:bg-gray-600"
                  : "bg-gray-300 text-gray-700 hover:bg-gray-400"
              }`}
            >
              Cancel
            </button>
          </div>
        </div>
      </ModalBody>
    </Modal>
  </div>
);
}