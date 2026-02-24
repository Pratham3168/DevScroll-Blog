import { Alert, Button, Modal, ModalBody, TextInput, Textarea } from "flowbite-react";
import { ToastContainer } from "react-toastify";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { handleError, API_BASE } from "../utils";
import Comment from "./Comments";

export default function CommentSection({ postId }) {
  const { currentUser, token } = useSelector((state) => state.user); // Get token from Redux
  const { mode } = useSelector((state) => state.theme);
  const [comment, setComment] = useState("");
  const [commentError, setCommentError] = useState(null);
  const [comments, setComments] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [commentToDelete, setCommentToDelete] = useState(null);
  const navigate = useNavigate();
  const buildAuthHeaders = () => {
    const headers = {};
    if (token) {
      headers.Authorization = `Bearer ${token}`;
    }
    return headers;
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (comment.length > 200) {
      setCommentError("Comment must be less than 200 characters");
      return;
    }

    // Validate API_BASE is set
    if (!API_BASE || API_BASE === 'undefined') {
      const errorMsg = "API URL is not configured. Please check environment variables.";
      console.error(errorMsg, { API_BASE });
      setCommentError(errorMsg);
      return;
    }

    try {
      const headers = {
        "Content-Type": "application/json",
      };

      // Add Authorization header with token
      if (token) {
        headers["Authorization"] = `Bearer ${token}`;
      }

      const res = await fetch(`${API_BASE}/api/comment/create`, {
        method: "POST",
        credentials: "include", // Still include cookies as fallback
        headers,
        body: JSON.stringify({
          content: comment,
          postId,
          userId: currentUser._id,
        }),
      });

      let data = null;
      try {
        data = await res.json();
      } catch (err) {
        console.error("Failed to parse comment response:", err, res.status);
        setCommentError("Server returned invalid response");
        return;
      }

      if (!res.ok) {
        console.error("Comment API error:", { status: res.status, message: data?.message });
        setCommentError(data?.message || `Failed to post comment (${res.status})`);
        return;
      }

      // Validate response includes required fields
      if (!data || !data._id) {
        console.error("Response missing comment ID:", data);
        setCommentError("Failed to post comment: invalid response");
        return;
      }

      setComment("");
      setCommentError(null);
      setComments([
        { 
          ...data, 
          likes: data.likes || [], 
          numberOfLikes: data.likes?.length ?? data.numberOfLikes ?? 0 
        },
        ...comments,
      ]);
      console.log("Comment posted successfully");
    } catch (error) {
      console.error("Network error posting comment:", error);
      setCommentError(error.message || "Failed to post comment");
    }
  };

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const res = await fetch(
          `${API_BASE}/api/comment/getComment?postId=${postId}`,
          {
            credentials: 'include',
            headers: buildAuthHeaders(),
          }
        );
        const data = await res.json();
        if (res.ok) {
            setComments(
              data.map((c) => ({
                ...c,
                likes: c.likes || [],
                numberOfLikes: c.likes?.length ?? c.numberOfLikes ?? 0,
              }))
            );
        }
      } catch (err) {
        console.log(err);
      }
    };

    fetchComments();
  }, [postId]);


  const handleLike = async (commentId) => {
    try {
      if (!currentUser) {
        navigate('/sign-in');
        return;
      }
      const res = await fetch(
        `${API_BASE}/api/comment/likeComment/${commentId}`,
        {
          method: 'PUT',
          credentials: 'include',
          headers: buildAuthHeaders(),
        }
      );
      if (res.ok) {
        const data = await res.json();
        setComments(
          comments.map((comment) =>
            comment._id === commentId
              ? {
                  ...comment,
                  likes: data.likes,
                  numberOfLikes: data.likes.length,
                }
              : comment
          )
        );
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleEdit = async (comment, editedContent) => {
    setComments(
      comments.map((c) =>
        c._id === comment._id ? { ...c, content: editedContent } : c
      )
    );
  };

  const handleDelete = async (commentId) => {
    setShowModal(false);
    try {
      if (!currentUser) {
        navigate('/sign-in');
        return;
      }
      const res = await fetch(
        `${API_BASE}/api/comment/deleteComment/${commentId}`,
        {
          method: 'DELETE',
          credentials: 'include',
          headers: buildAuthHeaders(),
        }
      );
      if (res.ok) {
        const data = await res.json();
        setComments(comments.filter((comment) => comment._id !== commentId));
      }
    } catch (error) {
      console.log(error.message);
    }
  };


  // return (
  //   <div className="max-w-3xl mx-auto w-full px-4">
  //     <ToastContainer />

  //     {/* User Info */}
  //     {currentUser ? (
  //       <div className="flex items-center gap-3 my-6 text-sm">
  //         <img
  //           className="h-8 w-8 object-cover rounded-full ring-2 ring-teal-500"
  //           src={currentUser.profilePhotoUrl}
  //           alt="profile"
  //         />
  //         <div className="flex flex-col leading-tight">
  //           <span className="text-gray-500 text-xs">Signed in as</span>
  //           <Link
  //             to={"/dashboard?tab=profile"}
  //             className="text-teal-600 font-medium hover:underline"
  //           >
  //             @{currentUser.username}
  //           </Link>
  //         </div>
  //       </div>
  //     ) : (
  //       <div className="my-6 p-4 rounded-lg bg-teal-50 border border-teal-200 text-sm flex justify-between items-center">
  //         <span className="text-teal-700">
  //           You must be signed in to comment.
  //         </span>
  //         <Link
  //           className="text-white bg-teal-600 px-3 py-1 rounded-md hover:bg-teal-700 transition"
  //           to={"/signin"}
  //         >
  //           Sign In
  //         </Link>
  //       </div>
  //     )}

  //     {/* Comment Form */}
  //     {currentUser && (
  //       <form
  //         onSubmit={handleSubmit}
  //         className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm"
  //       >
  //         <Textarea
  //           placeholder="Write your comment..."
  //           rows="3"
  //           maxLength="200"
  //           onChange={(e) => setComment(e.target.value)}
  //           value={comment}
  //           className="w-full rounded-lg border-gray-300 focus:ring-2 focus:ring-teal-500 focus:border-teal-500 text-sm"
  //         />

  //         <div className="flex justify-between items-center mt-4">
  //           <p
  //             className={`text-xs ${
  //               200 - comment.length <= 20 ? "text-red-500" : "text-gray-500"
  //             }`}
  //           >
  //             {200 - comment.length} characters remaining
  //           </p>

  //           <Button
  //             type="submit"
  //             className=" text-black border rounded-md px-3 py-2"
  //             disabled={!comment.trim()}
  //           >
  //             Submit
  //           </Button>
  //         </div>

  //         {commentError && (
  //           <Alert color="failure" className="mt-3">
  //             {commentError}
  //           </Alert>
  //         )}
  //       </form>
  //     )}

  //     {/* Comments List */}
  //     {comments.length === 0 ? (
  //       <p className='text-sm my-5'>No comments yet!</p>
  //     ) : (
  //       <>
  //         <div className='text-sm my-5 flex items-center gap-1'>
  //           <p>Comments</p>
  //           <div className='border border-gray-400 py-1 px-2 rounded-sm'>
  //             <p>{comments.length}</p>
  //           </div>
  //         </div>
  //         {comments.map((comment) => (
  //           <Comment
  //             key={comment._id}
  //             comment={comment}
  //             onLike={handleLike}
  //             onEdit={handleEdit}
  //             onDelete={(commentId) => {
  //               setShowModal(true);
  //               setCommentToDelete(commentId);
  //             }}
              
  //           />
  //         ))}
  //       </>
  //     )}
  //     <Modal
  //           show={showModal}
  //           onClose={() => setShowModal(false)}
  //           size="md"
  //           popup
  //         >
  //           <ModalBody className="bg-white text-gray-900 border rounded-2xl">
  //             <div className="text-center p-5 pt-10 w-full ">
  //               <h3 className="text-2xl font-bold mb-5 text-gray-900">
  //                 Are you sure?
  //               </h3>
  //               <p className="mb-5 text-gray-600">
  //                 Do you really want to delete this Comment? This process cannot be
  //                 undone.
  //               </p>
    
  //               <div className="flex gap-1 justify-around">
  //                 <button
  //                   onClick={() => handleDelete(commentToDelete)}
  //                   className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition mr-2"
  //                 >
  //                   Delete
  //                 </button>
    
  //                 <button
  //                   onClick={() => setShowModal(false)}
  //                   className="bg-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-400 transition"
  //                 >
  //                   Cancel
  //                 </button>
  //               </div>
  //             </div>
  //           </ModalBody>
  //         </Modal>
  //   </div>
  // );


return (
  <div className={`max-w-3xl mx-auto w-full px-4 transition-colors duration-300
    ${mode === "dark" ? "text-gray-100" : "text-gray-900"}`}
  >
    <ToastContainer />

    {/* User Info */}
    {currentUser ? (
      <div className="flex items-center gap-3 my-6 text-sm">
        <img
          className="h-8 w-8 object-cover rounded-full ring-2 ring-teal-500"
          src={currentUser.profilePhotoUrl}
          alt="profile"
        />
        <div className="flex flex-col leading-tight">
          <span
            className={`text-xs transition-colors duration-300 ${
              mode === "dark" ? "text-gray-400" : "text-gray-500"
            }`}
          >
            Signed in as
          </span>
          <Link
            to={"/dashboard?tab=profile"}
            className="text-teal-600 font-medium hover:underline"
          >
            @{currentUser.username}
          </Link>
        </div>
      </div>
    ) : (
      <div className={`my-6 p-4 rounded-lg border flex justify-between items-center text-sm transition-colors duration-300
        ${mode === "dark"
          ? "bg-gray-800 border-gray-700 text-gray-100"
          : "bg-teal-50 border-teal-200 text-teal-700"
        }`}
      >
        <span>You must be signed in to comment.</span>
        <Link
          className="text-white bg-teal-600 px-3 py-1 rounded-md hover:bg-teal-700 transition"
          to={"/signin"}
        >
          Sign In
        </Link>
      </div>
    )}

    {/* Comment Form */}
    {currentUser && (
      <form
        onSubmit={handleSubmit}
        className={`rounded-xl p-5 shadow-sm border transition-colors duration-300
          ${mode === "dark" ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"}`}
      >
        <Textarea
          placeholder="Write your comment..."
          rows="3"
          maxLength="200"
          onChange={(e) => setComment(e.target.value)}
          value={comment}
          className={`w-full rounded-lg transition-colors duration-300
            ${mode === "dark"
              ? "bg-gray-700 text-gray-100 border-gray-600 focus:ring-teal-500 focus:border-teal-500"
              : "bg-white text-gray-900 border-gray-300 focus:ring-teal-500 focus:border-teal-500"
            } text-sm`}
        />

        <div className="flex justify-between items-center mt-4">
          <p className={`text-xs transition-colors duration-300
            ${200 - comment.length <= 20
              ? "text-red-500"
              : mode === "dark"
              ? "text-gray-400"
              : "text-gray-500"
            }`}
          >
            {200 - comment.length} characters remaining
          </p>

          <Button
            type="submit"
            className={`border rounded-md px-3 py-2 transition-colors duration-300
              ${mode === "dark" ? "text-black bg-gray-200" : "text-black bg-white"}`}
            disabled={!comment.trim()}
          >
            Submit
          </Button>
        </div>

        {commentError && (
          <Alert color="failure" className="mt-3">
            {commentError}
          </Alert>
        )}
      </form>
    )}

    {/* Comments List */}
    {comments.length === 0 ? (
      <p className={`text-sm my-5 transition-colors duration-300
        ${mode === "dark" ? "text-gray-400" : ""}`}
      >
        No comments yet!
      </p>
    ) : (
      <>
        <div className='text-sm my-5 flex items-center gap-1'>
          <p>Comments</p>
          <div className='border border-gray-400 py-1 px-2 rounded-sm'>
            <p>{comments.length}</p>
          </div>
        </div>
        {comments.map((comment) => (
          <Comment
            key={comment._id}
            comment={comment}
            onLike={handleLike}
            onEdit={handleEdit}
            onDelete={(commentId) => {
              setShowModal(true);
              setCommentToDelete(commentId);
            }}
          />
        ))}
      </>
    )}

    {/* Delete Modal */}
    <Modal
      show={showModal}
      onClose={() => setShowModal(false)}
      size="md"
      popup
    >
      <ModalBody
        className={`transition-colors duration-300 rounded-2xl
          ${mode === "dark" ? "bg-gray-800 text-gray-100 border-gray-700" : "bg-white text-gray-900 border-gray-200"}`}
      >
        <div className="text-center p-5 pt-10 w-full">
          <h3
            className={`text-2xl font-bold mb-5 transition-colors duration-300 ${
              mode === "dark" ? "text-gray-100" : "text-gray-900"
            }`}
          >
            Are you sure?
          </h3>
          <p className={`mb-5 transition-colors duration-300
            ${mode === "dark" ? "text-gray-300" : "text-gray-600"}`}
          >
            Do you really want to delete this Comment? This process cannot be undone.
          </p>

          <div className="flex gap-1 justify-around">
            <button
              onClick={() => handleDelete(commentToDelete)}
              className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition mr-2"
            >
              Delete
            </button>

            <button
              onClick={() => setShowModal(false)}
              className={`px-4 py-2 rounded-lg transition-colors duration-300
                ${mode === "dark"
                  ? "bg-gray-600 text-gray-100 hover:bg-gray-500"
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
