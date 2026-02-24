





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
import { FiCheck } from "react-icons/fi";
import { FaCheck, FaTimes } from "react-icons/fa";

export default function DashComments() {

  const { currentUser } = useSelector((state) => state.user);

  const [comments, setComments] = useState([]);
  const [showModal, setShowModal] = useState(false);
    const { mode } = useSelector((state) => state.theme);

  const [commentIdToDelete, setCommentIdToDelete] = useState(null);
  const [showMore, setShowMore] = useState(false);

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const res = await fetch(
          `http://localhost:2068/api/comment/getcomments`,
          {credentials: 'include'}
        );
        const data = await res.json();

        if (res.ok) {
          setComments(data.comment || []);
          if (data.comment && data.comment.length === 9) {
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
      fetchComments();
    }
  }, [currentUser]);


  const handleShowMore = async () => {
    try {
      const startIndex = comments.length;

      const res = await fetch(
        `http://localhost:2068/api/comment/getcomments?startIndex=${startIndex}`
      );

      const data = await res.json();

      if (res.ok) {
        setComments((prev) => [...prev, ...(data.comment || [])]);

        if (data.comment && data.comment.length < 9) {
          setShowMore(false);
        }
      }
    } catch (err) {
      console.log(err);
    }
  };


  const handleDeleteComment = async () => {

    try{

      const res = await fetch(`http://localhost:2068/api/comment/deleteComment/${commentIdToDelete}`, {
        method:'DELETE',
        credentials:'include',
      });
      const data = await res.json();
      if(res.ok){
        setComments((prev) => prev.filter((comment) => comment._id !== commentIdToDelete));
        setShowModal(false);
      }
      else{
        console.log(data.message);
      }

    }
    catch(err){
      console.log(err);
    }

  }

// return (
//   <div className="flex-1 p-4 sm:p-6 min-h-screen bg-gray-50 ">

//     {currentUser?.isAdmin && comments.length > 0 ? (

//       <div>  {/* <-- THIS WAS MISSING */}

//         {/* Table Wrapper */}
//         <div className="w-full overflow-x-auto rounded-xl border border-gray-200">

//           <Table hoverable className="w-full min-w-max">

//             <TableHead className="bg-gray-50">
//               <TableRow>
//                 <TableHeadCell>Date Updated</TableHeadCell>
//                 <TableHeadCell>Comment Content</TableHeadCell>
//                 <TableHeadCell>Likes</TableHeadCell>
//                 <TableHeadCell>PostId</TableHeadCell>
//                 <TableHeadCell>userId</TableHeadCell>
//                 <TableHeadCell>Delete</TableHeadCell>
//               </TableRow>
//             </TableHead>

//             <TableBody className="divide-y">
//               {comments.map((comment) => (
//                 <TableRow
//                   key={comment._id}
//                   className="bg-white hover:!bg-gray-100 transition"
//                 >
//                   <TableCell className="text-gray-600 whitespace-nowrap">
//                     {new Date(comment.updatedAt).toLocaleDateString()}
//                   </TableCell>

                  

//                   <TableCell className="font-semibold text-gray-800 whitespace-nowrap">
//                       {comment.content}
//                   </TableCell>

//                   <TableCell>
//                       {comment.numberOfLikes}
              
//                   </TableCell>

//                   <TableCell>
//                      {comment.postId}
              
//                   </TableCell>
//                   <TableCell>
//                      {comment.userId}
              
//                   </TableCell>

//                   <TableCell>
//                     <div className="flex justify-center gap-3 sm:gap-4 whitespace-nowrap items-center">
//                       <button
//                         onClick={() => {
//                           setShowModal(true);
//                           setCommentIdToDelete(comment._id);
//                         }}
//                         className="text-red-500 justify-center items-center text-center hover:text-red-700 font-medium transition"
//                       >
//                         Delete
//                       </button>
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
//           No comments yet
//         </h3>
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
//                   Do you really want to Remove this Comment? This action cannot be
//                   undone.
//                 </p>
    
//                 <div className="flex gap-1 justify-around">
//                   <button
//                     onClick={handleDeleteComment}
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
  <div className={`flex-1 p-4 sm:p-6 min-h-screen ${mode === 'dark' ? 'bg-gray-900' : 'bg-gray-50'}`}>

    {currentUser?.isAdmin && comments.length > 0 ? (
      <div>

        {/* Table Wrapper */}
        <div className={`w-full overflow-x-auto rounded-xl border ${mode === 'dark' ? 'border-gray-700' : 'border-gray-200'}`}>
          <Table className="w-full min-w-max">

            <TableHead className={`${mode === 'dark' ? 'bg-gray-800 text-gray-300' : 'bg-gray-50 text-gray-700'}`}>
              <TableRow>
                <TableHeadCell>Date Updated</TableHeadCell>
                <TableHeadCell>Comment Content</TableHeadCell>
                <TableHeadCell>Likes</TableHeadCell>
                <TableHeadCell>PostId</TableHeadCell>
                <TableHeadCell>UserId</TableHeadCell>
                <TableHeadCell>Delete</TableHeadCell>
              </TableRow>
            </TableHead>

            <TableBody className={`${mode === 'dark' ? 'divide-gray-700 text-gray-200' : 'divide-gray-200 text-gray-800'} divide-y`}>
              {comments.map((comment) => (
                <TableRow
                  key={comment._id}
                  className={`${mode === 'dark' ? 'bg-gray-800' : 'bg-white'} transition-none`}
                >
                  <TableCell className="whitespace-nowrap">
                    {new Date(comment.updatedAt).toLocaleDateString()}
                  </TableCell>

                  <TableCell className="font-semibold whitespace-nowrap">
                    {comment.content}
                  </TableCell>

                  <TableCell>
                    {comment.numberOfLikes}
                  </TableCell>

                  <TableCell>
                    {comment.postId}
                  </TableCell>

                  <TableCell>
                    {comment.userId}
                  </TableCell>

                  <TableCell>
                    <div className="flex justify-center gap-3 sm:gap-4 whitespace-nowrap items-center">
                      <button
                        onClick={() => {
                          setShowModal(true);
                          setCommentIdToDelete(comment._id);
                        }}
                        className="text-red-500 justify-center items-center text-center font-medium transition-none"
                      >
                        Delete
                      </button>
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
                mode === 'dark'
                  ? 'border-gray-600 bg-gray-800 text-gray-200 hover:bg-gray-700 hover:shadow-md'
                  : 'border-gray-300 bg-white text-gray-700 hover:bg-gray-50 hover:shadow-md'
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
        <h3 className={`${mode === 'dark' ? 'text-gray-200' : 'text-gray-700'} text-lg sm:text-xl font-semibold`}>
          No comments yet
        </h3>
      </div>
    )}

    <Modal
      show={showModal}
      onClose={() => setShowModal(false)}
      size="md"
      popup
    >
      <ModalBody className={`border rounded-2xl ${mode === 'dark' ? 'bg-gray-800 text-gray-200' : 'bg-white text-gray-900'}`}>
        <div className="text-center p-5 pt-10 w-full">
          <h3 className="text-2xl font-bold mb-5">
            Are you sure?
          </h3>
          <p className={`${mode === 'dark' ? 'text-gray-300' : 'text-gray-600'} mb-5`}>
            Do you really want to remove this comment? This action cannot be undone.
          </p>

          <div className="flex gap-1 justify-around">
            <button
              onClick={handleDeleteComment}
              className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition mr-2"
            >
              Delete
            </button>

            <button
              onClick={() => setShowModal(false)}
              className={`px-4 py-2 rounded-lg transition ${
                mode === 'dark'
                  ? 'bg-gray-700 text-gray-200 hover:bg-gray-600'
                  : 'bg-gray-300 text-gray-700 hover:bg-gray-400'
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