import moment from 'moment';
import { useEffect, useState } from 'react';
import { FaThumbsUp } from 'react-icons/fa';
import { useSelector } from 'react-redux';
import { Button, Textarea } from 'flowbite-react';
import { API_BASE } from '../utils';

export default function Comment({ comment ,onLike ,onEdit ,onDelete}) {
  const [user, setUser] = useState({});
  const [isEditing, setIsEditing] = useState(false);
  const {mode} = useSelector((state) => state.theme);
  const [editedContent, setEditedContent] = useState(comment.content);
  const { currentUser, token } = useSelector((state) => state.user);
  const buildAuthHeaders = () => {
    const headers = {};
    if (token) {
      headers.Authorization = `Bearer ${token}`;
    }
    return headers;
  };
  useEffect(() => {
    const getUser = async () => {
      try {
        const res = await fetch(
          `${API_BASE}/api/user/${comment.userId}`,
          {
            credentials: 'include',
            headers: buildAuthHeaders(),
          }
        );
        const data = await res.json();
        if (res.ok) {
          setUser(data);
        }
      } catch (error) {
        console.log(error.message);
      }
    };
    getUser();
  }, [comment]);

  const handleEdit = () => {
    setIsEditing(true);
    setEditedContent(comment.content);
  };

  const handleSave = async () => {
    try {
      const res = await fetch(
        `${API_BASE}/api/comment/editComment/${
          comment._id
        }`,
        {
          method: 'PUT',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json',
            ...buildAuthHeaders(),
          },
          body: JSON.stringify({
            content: editedContent,
          }),
        }
      );
      if (res.ok) {
        setIsEditing(false);
        onEdit(comment, editedContent);
      }
    } catch (error) {
      console.log(error.message);
    }
  };
  const likeCount = comment.likes?.length ?? comment.numberOfLikes ?? 0;
  // return (
  //   <div className='flex p-4 border-b dark:border-gray-600 text-sm'>
  //     <div className='flex-shrink-0 mr-3'>
  //       <img
  //         className='w-9 h-9 rounded-full bg-gray-200'
  //         src={user.profilePhotoUrl}
  //         alt={user.username}
  //       />
  //     </div>
  //     <div className='flex-1'>
  //       <div className='flex items-center mb-1'>
  //         <span className='font-bold mr-1 text-xs truncate'>
  //           {user ? `@${user.username}` : 'anonymous user'}
  //         </span>
  //         <span className='text-gray-500 text-xs'>
  //           {moment(comment.createdAt).fromNow()}
  //         </span>
  //       </div>
  //       {isEditing ? (
  //         <>
  //           <Textarea
  //             className='mb-2'
  //             value={editedContent}
  //             onChange={(e) => setEditedContent(e.target.value)}
  //           />
  //           <div className='flex justify-end gap-2 text-xs'>
  //             <Button
  //               type='button'
  //               size='sm'
  //               className='border text-black  '
  //               onClick={handleSave}
  //             >
  //               Save
  //             </Button>
  //             <Button
  //               type='button'
  //               size='sm'
  //               className='border text-black  '
                
  //               onClick={() => setIsEditing(false)}
  //             >
  //               Cancel
  //             </Button>
  //           </div>
  //         </>
  //       ) : (
  //         <>
  //           <p className='text-gray-500 pb-2'>{comment.content}</p>
  //           <div className='flex items-center pt-2 text-xs border-t dark:border-gray-700 max-w-fit gap-2'>
  //             <button
  //               type='button'
  //               onClick={() => onLike(comment._id)}
  //               className={`text-gray-400 hover:text-blue-500 ${
  //                 currentUser && comment.likes?.includes(currentUser._id) && '!text-blue-500'
  //               }`}
  //             >
  //               <FaThumbsUp className='text-sm' />
  //             </button>
  //             <p className='text-gray-400'>
  //               {likeCount} {likeCount === 1 ? 'like' : 'likes'}
  //             </p>
  //             {currentUser &&
  //               (currentUser._id === comment.userId || currentUser.isAdmin) && (
  //                 <>
  //                   <button
  //                     type='button'
  //                     onClick={handleEdit}
  //                     className='text-gray-400 hover:text-blue-500'
  //                   >
  //                     Edit
  //                   </button>
  //                   <button
  //                     type='button'
  //                     onClick={() => onDelete(comment._id)}
  //                     className='text-gray-400 hover:text-red-500'
  //                   >
  //                     Delete
  //                   </button>
  //                 </>
  //               )}
  //           </div>
  //         </>
  //       )}
  //     </div>
  //   </div>

  // );




return (
  <div
    className={`flex p-4 border-b text-sm transition-colors duration-300
      ${mode === "dark" ? "border-gray-600 text-gray-100" : "border-gray-200 text-gray-900"}`}
  >
    {/* User Avatar */}
    <div className="flex-shrink-0 mr-3">
      <img
        className={`w-9 h-9 rounded-full transition-colors duration-300
          ${mode === "dark" ? "bg-gray-700" : "bg-gray-200"}`}
        src={user.profilePhotoUrl}
        alt={user.username}
      />
    </div>

    {/* Comment Content */}
    <div className="flex-1">
      <div className="flex items-center mb-1">
        <span className="font-bold mr-1 text-xs truncate">
          {user ? `@${user.username}` : "anonymous user"}
        </span>
        <span className={`text-xs transition-colors duration-300
          ${mode === "dark" ? "text-gray-400" : "text-gray-500"}`}
        >
          {moment(comment.createdAt).fromNow()}
        </span>
      </div>

      {isEditing ? (
        <>
          <Textarea
            className={`mb-2 transition-colors duration-300
              ${mode === "dark" ? "bg-gray-700 text-gray-100 border-gray-600" : "bg-white text-gray-900 border-gray-300"}`}
            value={editedContent}
            onChange={(e) => setEditedContent(e.target.value)}
          />
          <div className="flex justify-end gap-2 text-xs">
            <Button
              type="button"
              size="sm"
              className={`border transition-colors duration-300
                ${mode === "dark" ? "text-gray-100 border-gray-600 bg-gray-700 hover:bg-gray-600" : "text-black border-gray-300 bg-white hover:bg-gray-100"}`}
              onClick={handleSave}
            >
              Save
            </Button>
            <Button
              type="button"
              size="sm"
              className={`border transition-colors duration-300
                ${mode === "dark" ? "text-gray-100 border-gray-600 bg-gray-700 hover:bg-gray-600" : "text-black border-gray-300 bg-white hover:bg-gray-100"}`}
              onClick={() => setIsEditing(false)}
            >
              Cancel
            </Button>
          </div>
        </>
      ) : (
        <>
          <p className={`pb-2 transition-colors duration-300
            ${mode === "dark" ? "text-gray-200" : "text-gray-500"}`}
          >
            {comment.content}
          </p>

          <div
            className={`flex items-center pt-2 text-xs max-w-fit gap-2 border-t transition-colors duration-300
              ${mode === "dark" ? "border-gray-700" : "border-gray-200"}`}
          >
            <button
              type="button"
              onClick={() => onLike(comment._id)}
              className={`transition-colors duration-300 ${
                currentUser && comment.likes?.includes(currentUser._id)
                  ? "text-blue-500"
                  : mode === "dark"
                  ? "text-gray-400 hover:text-blue-400"
                  : "text-gray-400 hover:text-blue-500"
              }`}
            >
              <FaThumbsUp className="text-sm" />
            </button>
            <p className={`transition-colors duration-300 ${
              mode === "dark" ? "text-gray-400" : "text-gray-400"
            }`}>
              {likeCount} {likeCount === 1 ? "like" : "likes"}
            </p>

            {currentUser &&
              (currentUser._id === comment.userId || currentUser.isAdmin) && (
                <>
                  <button
                    type="button"
                    onClick={handleEdit}
                    className={`transition-colors duration-300 ${
                      mode === "dark" ? "text-gray-400 hover:text-blue-400" : "text-gray-400 hover:text-blue-500"
                    }`}
                  >
                    Edit
                  </button>
                  <button
                    type="button"
                    onClick={() => onDelete(comment._id)}
                    className={`transition-colors duration-300 ${
                      mode === "dark" ? "text-gray-400 hover:text-red-500" : "text-gray-400 hover:text-red-500"
                    }`}
                  >
                    Delete
                  </button>
                </>
              )}
          </div>
        </>
      )}
    </div>
  </div>
);


}
