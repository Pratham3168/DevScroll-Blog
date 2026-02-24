import { Alert, Button, FileInput, Select, TextInput } from "flowbite-react";
import React, { useState } from "react";
import PostEditor from "../Components/PostEditor";
import axios from "axios";
import { handleError, API_BASE } from "../utils";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { useNavigate  } from "react-router-dom";
import { useSelector } from "react-redux";


export default function CreatePost() {
  const [content, setContent] = useState("");
  const [file, setFile] = useState(null);
  const [imageUploadProgress, setImageUploadProgress] = useState(null);
  const [imageUploadError, setImageUploadError] = useState(null);
  const [formData, setFormData] = useState({});
  const {mode} = useSelector((state) => state.theme);
  const [publishError, setPublishError] = useState(null);
  const navigate = useNavigate();

 const handleUploadImage = async () => {
  let progressInterval;

  try {
    if (!file) {
      setImageUploadError("Please select an image");
      return;
    }

    setImageUploadError(null);
    setImageUploadProgress(0);

    // 🔥 Start Fake Progress
    let fakeProgress = 0;

    progressInterval = setInterval(() => {
      fakeProgress += Math.floor(Math.random() * 10) + 1;

      if (fakeProgress >= 95) {
        fakeProgress = 95;
        clearInterval(progressInterval);
      }

      setImageUploadProgress(fakeProgress);
    }, 400);

    const data = new FormData();
    data.append("file", file);

    const preset = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;
    const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
    data.append("upload_preset", preset);

    const cloudUrl = `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`;

    const res = await axios.post(cloudUrl, data);

    // ✅ Upload finished → clear fake progress
    clearInterval(progressInterval);

    // Smooth finish to 100%
    setImageUploadProgress(100);

    setTimeout(() => {
      setImageUploadProgress(null);
    }, 500);

    setFormData({ ...formData, image: res.data.secure_url });

  } catch (error) {
    clearInterval(progressInterval);

    console.error(
      "Upload error:",
      error?.response?.status,
      error?.response?.data || error.message
    );

    setImageUploadError(
      "Image upload failed: " +
        (error?.response?.data?.error?.message || error.message)
    );

    setImageUploadProgress(null);
  }
};


const handleSubmit = async (e) => {

    e.preventDefault();

    // Validate API_BASE is set
    if (!API_BASE || API_BASE === 'undefined') {
      const errorMsg = "API URL is not configured. Please check environment variables.";
      console.error(errorMsg, { API_BASE });
      setPublishError(errorMsg);
      return;
    }

    try{
        const res = await fetch(`${API_BASE}/api/post/create`,{
            method:"POST",
            headers:{
                "Content-Type":"application/json",  
            },
            credentials:"include",
            body:JSON.stringify(formData),
        });
        
        let data;
        try {
          data = await res.json();
        } catch (parseErr) {
          console.error("Failed to parse response:", parseErr, res.status);
          setPublishError("Server returned invalid response");
          return;
        }

        if(!res.ok){
            console.error("API error:", { status: res.status, message: data.message });
            setPublishError(data.message || `Failed to publish post (${res.status})`);
            return;
        }

        // Validate response includes required slug field
        if(!data.slug) {
          console.error("Response missing slug:", data);
          setPublishError("Failed to create post: missing slug in response");
          return;
        }

        setPublishError(null);
        console.log("Post created successfully:", { slug: data.slug });
        
        // Navigate to the new post
        navigate(`/post/${data.slug}`);

    }catch(err){
        const errorMsg = err.message || "An error occurred while publishing";
        console.error("Network/fetch error:", err);
        setPublishError(errorMsg);
        handleError(errorMsg);
    }

}




  // return (
  //   <div className="p-4 w-full max-w-3xl mx-auto !bg-white !text-gray-900 dark:!bg-white dark:!text-gray-900">
  //     <h1 className="text-center text-3xl my-7 font-semibold !text-gray-900">
  //       Create a post
  //     </h1>

  //     <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
  //       <div className="flex flex-col gap-4 sm:flex-row justify-between">
  //         <TextInput
  //           type="text"
  //           placeholder="Title"
  //           required
  //           id="title"
  //           onChange={(e) => setFormData({...formData,title:e.target.value})}
  //           className="flex-1 sm:w-[70%] [&_*]:!bg-white [&_*]:!text-gray-900 [&_*]:dark:!bg-white [&_*]:dark:!text-gray-900"
  //         />

  //         <Select 
  //         onChange={(e) => setFormData({...formData,category:e.target.value})}
  //         className=" sm:w-[25%] [&_*]:!bg-white [&_*]:!text-gray-900 [&_*]:dark:!bg-white [&_*]:dark:!text-gray-900">
  //           <option value="uncategorized">Uncategorized</option>
  //           <option value="javascript">JavaScript</option>
  //           <option value="reactjs">React.js</option>
  //           <option value="nextjs">Next.js</option>
  //         </Select>
  //       </div>

  //       <div className="flex gap-4 items-center justify-between border-4 border-teal-500 border-dotted p-4">
  //         <input
  //           type="file"
  //           accept="image/*"
  //           className="block w-full text-sm text-gray-900 border border-gray-400 rounded-lg cursor-pointer bg-gray-200 focus:outline-none"
  //           onChange={(e) => setFile(e.target.files[0])}
  //         />

  //         <button
  //           type="button"
  //           disabled={imageUploadProgress !== null}
  //           onClick={handleUploadImage}
  //           className="sm:w-[25%] w-[60%] border border-gray-400 rounded-lg flex items-center justify-center p-2 transition"
  //         >
  //           {imageUploadProgress !== null ? (
  //             <div className="w-12 h-12">
  //               <CircularProgressbar
  //                 value={imageUploadProgress}
  //                 text={`${imageUploadProgress}%`}
  //               />
  //             </div>
  //           ) : (
  //             "Upload Image"
  //           )}
  //         </button>
  //       </div>

  //       {imageUploadError && <Alert color="failure">{imageUploadError}</Alert>}
  //       {formData.image && (
  //         <img
  //           src={formData.image}
  //           alt="upload"
  //           className="w-full h-72 object-cover"
  //         />
  //       )}

  //       <div className="!bg-white dark:!bg-white">
  //         <PostEditor content={formData.content || ""}
  // setContent={(value) =>
  //   setFormData({ ...formData, content: value })
  // } />
  //       </div>

  //       <Button
  //         type="submit"
  //         className="!bg-blue-500 dark:!bg-blue-500 text-white font-bold dark:font-bold dark:text-white"
  //       >
  //         Publish
  //       </Button>
  //     </form>
  //   </div>
  // );





return (
  <div
    className={`p-4 w-full max-w-3xl mx-auto transition-colors duration-300
      ${mode === "dark" ? "bg-gray-900 text-gray-100" : "bg-white text-gray-900"}`}
  >
    <h1
      className={`text-center text-3xl my-7 font-semibold transition-colors duration-300
        ${mode === "dark" ? "text-gray-100" : "text-gray-900"}`}
    >
      Create a post
    </h1>

    <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
      <div className="flex flex-col gap-4 sm:flex-row justify-between">
        <TextInput
          type="text"
          placeholder="Title"
          required
          id="title"
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          className={`flex-1 sm:w-[70%] transition-colors duration-300
            ${mode === "dark"
              ? "bg-gray-800 text-gray-100 border-gray-600"
              : "bg-white text-gray-900 border-gray-300"
            }`}
        />

        <Select
          onChange={(e) => setFormData({ ...formData, category: e.target.value })}
          className={`sm:w-[25%] transition-colors duration-300
            ${mode === "dark"
              ? "bg-gray-800 text-gray-100 border-gray-600"
              : "bg-white text-gray-900 border-gray-300"
            }`}
        >
          <option value="uncategorized">Uncategorized</option>
          <option value="javascript">JavaScript</option>
          <option value="reactjs">React.js</option>
          <option value="nextjs">Next.js</option>
        </Select>
      </div>

      <div
        className={`flex gap-4 items-center justify-between border-4 border-teal-500 border-dotted p-4 transition-colors duration-300
          ${mode === "dark" ? "bg-gray-800 text-gray-100" : "bg-gray-200 text-gray-900"}`}
      >
        <input
          type="file"
          accept="image/*"
          className={`block w-full text-sm border rounded-lg cursor-pointer transition-colors duration-300
            ${mode === "dark"
              ? "text-gray-100 border-gray-600 bg-gray-700"
              : "text-gray-900 border-gray-400 bg-gray-200"
            }`}
          onChange={(e) => setFile(e.target.files[0])}
        />

        <button
          type="button"
          disabled={imageUploadProgress !== null}
          onClick={handleUploadImage}
          className={`sm:w-[25%] w-[60%] border rounded-lg flex items-center justify-center p-2 transition-colors duration-300
            ${mode === "dark"
              ? "border-gray-600 bg-gray-700 text-gray-100"
              : "border-gray-400 bg-white text-gray-900"
            }`}
        >
          {imageUploadProgress !== null ? (
            <div className="w-12 h-12">
              <CircularProgressbar
                value={imageUploadProgress}
                text={`${imageUploadProgress}%`}
              />
            </div>
          ) : (
            "Upload Image"
          )}
        </button>
      </div>

      {imageUploadError && <Alert color="failure">{imageUploadError}</Alert>}
      {formData.image && (
        <img
          src={formData.image}
          alt="upload"
          className="w-full h-72 object-cover rounded-lg transition-colors duration-300"
        />
      )}

      <div className={`transition-colors duration-300 ${mode === "dark" ? "bg-gray-900" : "bg-white"}`}>
        <PostEditor
          content={formData.content || ""}
          setContent={(value) => setFormData({ ...formData, content: value })}
        />
      </div>

      <Button
        type="submit"
        className={`text-white font-bold transition-colors duration-300
          ${mode === "dark" ? "bg-blue-600 hover:bg-blue-700" : "bg-blue-500 hover:bg-blue-600"}`}
      >
        Publish
      </Button>
    </form>
  </div>
);



}
