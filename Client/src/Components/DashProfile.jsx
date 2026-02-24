import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { HiEye, HiEyeOff } from "react-icons/hi";
import { handleError, handleSuccess, API_BASE } from "../utils";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import {
  updateStart,
  updateFailure,
  updateSuccess,
  deleteUserFailure,
  deleteUserStart,
  deleteUserSuccess,
  signoutSuccess,
} from "../redux/user/userSlice";
import { Link } from "react-router-dom";
import { Modal, ModalBody } from "flowbite-react";

export default function DashProfile() {
  const { currentUser } = useSelector((state) => state.user);
  const { mode } = useSelector((state) => state.theme);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({});
  const [imageFile, setImageFile] = useState(null);
  const [imageFileUrl, setImageFileUrl] = useState(null);
  const [imageFileUploading, setImageFileUploading] = useState(false);
  const [imageFileUploadProgress, setImageFileUploadProgress] = useState(null);
  const [imageFileUploadError, setImageFileUploadError] = useState(null);
  const [updateUserError, setUpdateUserError] = useState(null);
  const [updateUserSuccess, setUpdateUserSuccess] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const dispatch = useDispatch();

  const filePickerRef = useRef();

  const handleImageChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      const allowedTypes = [
        "image/jpeg",
        "image/jpg",
        "image/png",
        "image/webp",
      ];

      if (!allowedTypes.includes(file.type)) {
        handleError("Only JPG, JPEG, PNG, and WEBP files are allowed");
        return;
      }
      setImageFile(file);
      setImageFileUrl(URL.createObjectURL(file));
    }
  };

  useEffect(() => {
    if (imageFile) {
      uploadImage();
    }
  }, [imageFile]);

  const uploadImage = async () => {
    if (imageFileUploading) return;
    if (!imageFile) return;

    try {
      setImageFileUploading(true);
      setImageFileUploadError(null);
      setImageFileUploadProgress(0);

      const data = new FormData();
      data.append("file", imageFile);
      data.append(
        "upload_preset",
        import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET,
      );

      // 🔥 Simulated smooth progress
      let fakeProgress = 0;

      const progressInterval = setInterval(() => {
        fakeProgress += Math.floor(Math.random() * 10) + 1;

        if (fakeProgress >= 95) {
          fakeProgress = 95;
          clearInterval(progressInterval);
        }

        setImageFileUploadProgress(fakeProgress);
      }, 400);

      const response = await axios.post(
        `https://api.cloudinary.com/v1_1/${import.meta.env.VITE_CLOUDINARY_CLOUD_NAME}/image/upload`,
        data,
      );

      clearInterval(progressInterval);

      const imageUrl = response.data.secure_url;

      setImageFileUploadProgress(100);

      setImageFileUrl(imageUrl);

      setFormData((prev) => ({
        ...prev,
        profilePhotoUrl: imageUrl,
      }));

      setTimeout(() => {
        setImageFileUploading(false);
      }, 400);
    } catch (error) {
      setImageFileUploadError("Image upload failed");
      setImageFileUploading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setUpdateUserError(null);
    setUpdateUserSuccess(null);
    if (Object.keys(formData).length === 0) {
      const msg = "No Changes Made";
      setUpdateUserError(msg);
      handleError(msg);
      return;
    }

    if (imageFileUploading) {
      const msg = "Please wait for the image to upload";
      setUpdateUserError(msg);
      handleError(msg);
      return;
    }

    try {
      dispatch(updateStart());
      const res = await fetch(
        `${API_BASE}/api/user/update/${currentUser._id}`,
        {
          method: "PUT",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        },
      );

      const data = await res.json();
      if (!res.ok) {
        dispatch(updateFailure(data.message));
        setUpdateUserError(data.message);
        handleError(data.message);
      } else {
        dispatch(updateSuccess(data));
        const msg = "User's profile updated successfully";
        setUpdateUserSuccess(msg);
        handleSuccess(msg);
      }
    } catch (error) {
      dispatch(updateFailure(error.message));
      setUpdateUserError(error.message);
      handleError(error.message);
    }
  };

  const handleDeleteAccount = async () => {
    setShowModal(false);
    try {
      dispatch(deleteUserStart());
      const res = await fetch(
        `${API_BASE}/api/user/delete/${currentUser._id}`,
        {
          method: "DELETE",
          credentials: "include",
        },
      );
      const data = await res.json();
      if (!res.ok) {
        dispatch(deleteUserFailure(data.message));
        handleError(data.message);
      } else {
        dispatch(deleteUserSuccess());
        const msg = "User account deleted successfully";
        handleSuccess(msg);
      }
    } catch (error) {
      dispatch(deleteUserFailure(error.message));
      handleError(error.message);
    }
  };

  const handleSignOut = async () => {
    try {
      const res = await fetch(`${API_BASE}/api/user/signout`, {
        method: "POST",
        credentials: "include",
      });
      const data = await res.json();
      if (!res.ok) {
        handleError(data.message);
      } else {
        dispatch(signoutSuccess());
        const msg = "User signed out successfully";
        handleSuccess(msg);
      }
    } catch (error) {
      console.log(error);
      handleError("Something went wrong ");
    }
  };

  // return (
  //   <div className="max-w-lg mx-auto p-3 w-full">
  //     <h1 className="my-7 text-center font-semibold text-3xl">Profile</h1>

  //     <form onSubmit={handleSubmit} className="flex flex-col gap-6">
  //       {/** hidden image picker working using useRef */}
  //       <input
  //         type="file"
  //         accept=".jpg,.jpeg,.png,.webp"
  //         ref={filePickerRef}
  //         onChange={handleImageChange}
  //         hidden
  //       />

  //       {/* Profile Image */}
  //       <div
  //         className="relative w-32 h-32 self-center cursor-pointer shadow-md overflow-hidden rounded-full"
  //         onClick={() => filePickerRef.current.click()}
  //       >
  //         {imageFileUploading && (
  //           <div className="absolute inset-0 flex items-center justify-center bg-black/30 backdrop-blur-sm rounded-full">
  //             <div className="w-20 h-20">
  //               <CircularProgressbar
  //                 value={imageFileUploadProgress}
  //                 text={`${imageFileUploadProgress}%`}
  //               />
  //             </div>
  //           </div>
  //         )}
  //         <img
  //           src={imageFileUrl || currentUser.profilePhotoUrl}
  //           alt="user"
  //           className="rounded-full w-full h-full object-cover border-4 border-gray-300"
  //         />
  //       </div>

  //       {/* Username */}
  //       <input
  //         type="text"
  //         id="username"
  //         placeholder="Username"
  //         defaultValue={currentUser.username}
  //         onChange={handleChange}
  //         className="border border-gray-300 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
  //       />

  //       {/* Email */}
  //       <input
  //         type="email"
  //         id="email"
  //         placeholder="Email"
  //         defaultValue={currentUser.email}
  //         onChange={handleChange}
  //         className="border border-gray-300 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
  //       />

  //       {/* Password */}
  //       <div className="relative">
  //         <input
  //           type={showPassword ? "text" : "password"}
  //           id="password"
  //           placeholder="Password"
  //           onChange={handleChange}
  //           className="w-full border border-gray-300 p-2 pr-10 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
  //         />

  //         <button
  //           type="button"
  //           onClick={() => setShowPassword(!showPassword)}
  //           className="absolute inset-y-0 right-3 flex items-center text-gray-500 hover:text-gray-700"
  //         >
  //           {showPassword ? <HiEyeOff size={20} /> : <HiEye size={20} />}
  //         </button>
  //       </div>

  //       {/* Update Button */}
  //       <button
  //         type="submit"
  //         className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
  //       >
  //         Update Profile
  //       </button>

  //       {currentUser.isAdmin && (
  //         <Link
  //           to="/create-post"
  //           className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition text-center block"
  //         >
  //           Create Post
  //         </Link>
  //       )}
  //     </form>

  //     {/* Bottom Actions */}
  //     <div className="text-red-500 flex justify-between mt-5">
  //       <span
  //         className="cursor-pointer hover:underline"
  //         onClick={() => setShowModal(true)}
  //       >
  //         Delete Account
  //       </span>

  //       <span
  //         className="cursor-pointer hover:underline"
  //         onClick={handleSignOut}
  //       >
  //         Sign Out
  //       </span>
  //     </div>
  //     <ToastContainer />

  //     <Modal
  //       show={showModal}
  //       onClose={() => setShowModal(false)}
  //       size="md"
  //       popup
  //     >
  //       <ModalBody className="bg-white text-gray-900 border rounded-2xl">
  //         <div className="text-center p-5 pt-10 w-full ">
  //           <h3 className="text-2xl font-bold mb-5 text-gray-900">
  //             Are you sure?
  //           </h3>
  //           <p className="mb-5 text-gray-600">
  //             Do you really want to delete your account? This process cannot be
  //             undone.
  //           </p>

  //           <div className="flex gap-1 justify-around">
  //             <button
  //               onClick={handleDeleteAccount}
  //               className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition mr-2"
  //             >
  //               Delete
  //             </button>

  //             <button
  //               onClick={() => setShowModal(false)}
  //               className="bg-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-400 transition"
  //             >
  //               Cancel
  //             </button>
  //           </div>
  //         </div>
  //       </ModalBody>
  //     </Modal>
  //   </div>
  // );

  // return (
  //   <div
  //     className={`max-w-lg mx-auto p-4 w-full ${mode === "dark" ? "bg-gray-900" : "bg-white"}`}
  //   >
  //     <h1 className="my-7 text-center font-bold text-4xl bg-gradient-to-r from-teal-600 to-indigo-600 bg-clip-text text-transparent">
  //       Profile
  //     </h1>

  //     <form
  //       onSubmit={handleSubmit}
  //       className={`flex flex-col gap-6 p-6 rounded-2xl shadow-lg border ${mode === "dark" ? "bg-gray-800 border-teal-600" : "bg-white border-teal-100"}`}
  //     >
  //       {/* Hidden Image Picker */}
  //       <input
  //         type="file"
  //         accept=".jpg,.jpeg,.png,.webp"
  //         ref={filePickerRef}
  //         onChange={handleImageChange}
  //         hidden
  //       />

  //       {/* Profile Image */}
  //       <div
  //         className="relative w-32 h-32 self-center cursor-pointer overflow-hidden rounded-full group"
  //         onClick={() => filePickerRef.current.click()}
  //       >
  //         {imageFileUploading && (
  //           <div className="absolute inset-0 flex items-center justify-center bg-black/30 backdrop-blur-sm rounded-full">
  //             <div className="w-20 h-20">
  //               <CircularProgressbar
  //                 value={imageFileUploadProgress}
  //                 text={`${imageFileUploadProgress}%`}
  //               />
  //             </div>
  //           </div>
  //         )}

  //         <img
  //           src={imageFileUrl || currentUser.profilePhotoUrl}
  //           alt="user"
  //           className="rounded-full w-full h-full object-cover border-4 border-teal-400 group-hover:border-indigo-500 transition"
  //         />
  //       </div>

  //       {/* Username */}
  //       <input
  //         type="text"
  //         id="username"
  //         placeholder="Username"
  //         defaultValue={currentUser.username}
  //         onChange={handleChange}
  //         className={`border p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-400 focus:border-teal-400 transition ${mode === "dark" ? "bg-gray-700 text-white border-gray-600" : "bg-white text-gray-900 border-teal-200"}`}
  //       />

  //       {/* Email */}
  //       <input
  //         type="email"
  //         id="email"
  //         placeholder="Email"
  //         defaultValue={currentUser.email}
  //         onChange={handleChange}
  //         className={`border p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-400 focus:border-teal-400 transition ${mode === "dark" ? "bg-gray-700 text-white border-gray-600" : "bg-white text-gray-900 border-teal-200"}`}
  //       />

  //       {/* Password */}
  //       <div className="relative">
  //         <input
  //           type={showPassword ? "text" : "password"}
  //           id="password"
  //           placeholder="Password"
  //           onChange={handleChange}
  //           className={`w-full border p-2 pr-10 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-400 focus:border-teal-400 transition ${mode === "dark" ? "bg-gray-700 text-white border-gray-600" : "bg-white text-gray-900 border-teal-200"}`}
  //         />

  //         <button
  //           type="button"
  //           onClick={() => setShowPassword(!showPassword)}
  //           className="absolute inset-y-0 right-3 flex items-center text-teal-600 hover:text-indigo-600 transition"
  //         >
  //           {showPassword ? <HiEyeOff size={20} /> : <HiEye size={20} />}
  //         </button>
  //       </div>

  //       {/* Update Button */}
  //       <button
  //         type="submit"
  //         className="w-full bg-gradient-to-r from-teal-600 to-indigo-600 text-white py-2 rounded-lg hover:from-teal-700 hover:to-indigo-700 transition shadow-md"
  //       >
  //         Update Profile
  //       </button>

  //       {currentUser.isAdmin && (
  //         <Link
  //           to="/create-post"
  //           className="w-full bg-gradient-to-r from-emerald-500 to-cyan-500 text-white py-2 rounded-lg hover:from-emerald-600 hover:to-cyan-600 transition duration-300 shadow-md hover:shadow-lg text-center block font-medium"
  //         >
  //           Create Post
  //         </Link>
  //       )}
  //     </form>

  //     {/* Bottom Actions */}
  //     <div className="flex justify-between mt-6 text-sm font-medium">
  //       <span
  //         className={`cursor-pointer transition ${mode === "dark" ? "text-red-400 hover:text-red-500" : "text-red-500 hover:text-red-600"}`}
  //         onClick={() => setShowModal(true)}
  //       >
  //         Delete Account
  //       </span>

  //       <span
  //         className={`cursor-pointer transition ${mode === "dark" ? "text-cyan-400 hover:text-cyan-500" : "text-teal-600 hover:text-indigo-600"}`}
  //         onClick={handleSignOut}
  //       >
  //         Sign Out
  //       </span>
  //     </div>

  //     <ToastContainer />

  //     {/* Modal */}
  //     <Modal
  //       show={showModal}
  //       onClose={() => setShowModal(false)}
  //       size="md"
  //       popup
  //     >
  //       <ModalBody
  //         className={`text-gray-900 border border-teal-100 rounded-2xl shadow-xl ${mode === "dark" ? "bg-gray-800" : "bg-white"}`}
  //       >
  //         <div className="text-center p-6">
  //           <h3 className="text-2xl font-bold mb-4 bg-gradient-to-r from-teal-600 to-indigo-600 bg-clip-text text-transparent">
  //             Are you sure?
  //           </h3>

  //           <p
  //             className={`mb-6 ${mode === "dark" ? "text-gray-300" : "text-gray-600"}`}
  //           >
  //             Do you really want to delete your account? This process cannot be
  //             undone.
  //           </p>

  //           <div className="flex gap-4 justify-center">
  //             <button
  //               onClick={handleDeleteAccount}
  //               className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition"
  //             >
  //               Delete
  //             </button>

  //             <button
  //               onClick={() => setShowModal(false)}
  //               className="bg-gray-200 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-300 transition"
  //             >
  //               Cancel
  //             </button>
  //           </div>
  //         </div>
  //       </ModalBody>
  //     </Modal>
  //   </div>
  // );

  return (
    <div className={`max-w-lg mx-auto p-4 w-full`}>
      <h1 className="my-7 text-center font-bold text-4xl bg-gradient-to-r from-teal-600 to-indigo-600 bg-clip-text text-transparent">
        Profile
      </h1>

      <form
        onSubmit={handleSubmit}
        className={`flex flex-col gap-6 p-6 rounded-2xl shadow-lg border ${
          mode === "dark"
            ? "bg-gradient-to-br from-gray-900 to-gray-900 border-gray-700 shadow-2xl shadow-black/40"
            : "bg-white border-teal-100"
        }`}
      >
        {/* Hidden Image Picker */}
        <input
          type="file"
          accept=".jpg,.jpeg,.png,.webp"
          ref={filePickerRef}
          onChange={handleImageChange}
          hidden
        />

        {/* Profile Image */}
        <div
          className="relative w-32 h-32 self-center cursor-pointer overflow-hidden rounded-full group"
          onClick={() => filePickerRef.current.click()}
        >
          {imageFileUploading && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/40 backdrop-blur-sm rounded-full">
              <div className="w-20 h-20">
                <CircularProgressbar
                  value={imageFileUploadProgress}
                  text={`${imageFileUploadProgress}%`}
                />
              </div>
            </div>
          )}

          <img
            src={imageFileUrl || currentUser.profilePhotoUrl}
            alt="user"
            className={`rounded-full w-full h-full object-cover border-4 transition ${
              mode === "dark"
                ? "border-teal-500 group-hover:border-indigo-400 shadow-lg shadow-black/40"
                : "border-teal-400 group-hover:border-indigo-500"
            }`}
          />
        </div>

        {/* Username */}
        <input
          type="text"
          id="username"
          placeholder="Username"
          defaultValue={currentUser.username}
          onChange={handleChange}
          className={`border p-2 rounded-lg focus:outline-none focus:ring-2 transition ${
            mode === "dark"
              ? "bg-gray-900 text-gray-100 border-gray-700 placeholder-gray-400 focus:ring-teal-500 focus:border-teal-500"
              : "bg-white text-gray-900 border-teal-200 focus:ring-teal-400 focus:border-teal-400"
          }`}
        />

        {/* Email */}
        <input
          type="email"
          id="email"
          placeholder="Email"
          defaultValue={currentUser.email}
          onChange={handleChange}
          className={`border p-2 rounded-lg focus:outline-none focus:ring-2 transition ${
            mode === "dark"
              ? "bg-gray-900 text-gray-100 border-gray-700 placeholder-gray-400 focus:ring-teal-500 focus:border-teal-500"
              : "bg-white text-gray-900 border-teal-200 focus:ring-teal-400 focus:border-teal-400"
          }`}
        />

        {/* Password */}
        <div className="relative">
          <input
            type={showPassword ? "text" : "password"}
            id="password"
            placeholder="Password"
            onChange={handleChange}
            className={`w-full border p-2 pr-10 rounded-lg focus:outline-none focus:ring-2 transition ${
              mode === "dark"
                ? "bg-gray-900 text-gray-100 border-gray-700 placeholder-gray-400 focus:ring-teal-500 focus:border-teal-500"
                : "bg-white text-gray-900 border-teal-200 focus:ring-teal-400 focus:border-teal-400"
            }`}
          />

          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute inset-y-0 right-3 flex items-center text-teal-600 hover:text-indigo-600 transition"
          >
            {showPassword ? <HiEyeOff size={20} /> : <HiEye size={20} />}
          </button>
        </div>

        {/* Update Button */}
        <button
          type="submit"
          className="w-full bg-gradient-to-r from-teal-600 to-indigo-600 text-white py-2 rounded-lg hover:from-teal-700 hover:to-indigo-700 transition shadow-md"
        >
          Update Profile
        </button>

        {currentUser.isAdmin && (
          <Link
            to="/create-post"
            className="w-full bg-gradient-to-r from-emerald-500 to-cyan-500 text-white py-2 rounded-lg hover:from-emerald-600 hover:to-cyan-600 transition duration-300 shadow-md hover:shadow-lg text-center block font-medium"
          >
            Create Post
          </Link>
        )}
      </form>

      {/* Bottom Actions */}
      <div className="flex justify-between mt-6 text-sm font-medium">
        <span
          className={`cursor-pointer transition ${
            mode === "dark"
              ? "text-red-500 hover:text-red-600"
              : "text-red-500 hover:text-red-600"
          }`}
          onClick={() => setShowModal(true)}
        >
          Delete Account
        </span>

        <span
          className={`cursor-pointer transition ${
            mode === "dark"
              ? "text-teal-400 hover:text-teal-500"
              : "text-teal-600 hover:text-indigo-600"
          }`}
          onClick={handleSignOut}
        >
          Sign Out
        </span>
      </div>

      <ToastContainer />

      {/* Modal */}
      <Modal
        show={showModal}
        onClose={() => setShowModal(false)}
        size="md"
        popup
      >
        <ModalBody
          className={`border rounded-2xl shadow-xl ${
            mode === "dark"
              ? "bg-gray-900 border-gray-700 text-gray-100"
              : "bg-white border-teal-100 text-gray-900"
          }`}
        >
          <div className="text-center p-6">
            <h3 className="text-2xl font-bold mb-4 bg-gradient-to-r from-teal-600 to-indigo-600 bg-clip-text text-transparent">
              Are you sure?
            </h3>

            <p
              className={`mb-6 ${
                mode === "dark" ? "text-gray-400" : "text-gray-600"
              }`}
            >
              Do you really want to delete your account? This process cannot be
              undone.
            </p>

            <div className="flex gap-4 justify-center">
              <button
                onClick={handleDeleteAccount}
                className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition"
              >
                Delete
              </button>

              <button
                onClick={() => setShowModal(false)}
                className="bg-gray-200 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-300 transition"
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
