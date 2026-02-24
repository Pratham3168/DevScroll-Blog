// import React from "react";
// import { Link, Navigate, useNavigate } from "react-router-dom";
// import { useState } from "react";
// import { handleError, handleSuccess } from "../utils.jsx";
// import { ToastContainer } from "react-toastify";
// import OAuth from "../Components/OAuth.jsx";

// const Signup = () => {
//   const [signupInfo, setSignupInfo] = useState({
//     username: "",
//     email: "",
//     password: "",
//   });

//   const navigate = useNavigate();
//   const [isLoading, setIsLoading] = useState(false);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     const copySignupInfo = { ...signupInfo };
//     copySignupInfo[name] = value;
//     setSignupInfo(copySignupInfo);
//   };

//   const handleSignup = async (e) => {
//     e.preventDefault();
//     if (isLoading) return; // 🚫 prevent double submit

//     const { username, email, password } = signupInfo;

//     if (!username || !email || !password) {
//       return handleError("All fields are required !! ");
//     }

//     try {
//       setIsLoading(true); // ✅ start loading

//       const url = "http://localhost:2068/api/auth/signup";
//       const response = await fetch(url, {
//         method: "POST",
//         headers: {
//           "Content-type": "application/json",
//         },
//         body: JSON.stringify(signupInfo),
//       });
//       const result = await response.json();
//       console.log(result);
//       const { success, message, error } = result;
//       if (success) {
//         handleSuccess(message);
//         setTimeout(() => {
//           navigate("/signin");
//         }, 1000);
//       } else if (error) {
//         const details = error?.details[0].message;
//         handleError(details);
//       } else if (!success) {
//         handleError(message);
//       }
//     } catch (err) {
//       handleError(err);
//     } finally {
//       setIsLoading(false); // ✅ stop loading
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
//       <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">
//         {/* Header */}
//         <div className="text-center mb-6">
//           <h1 className="text-3xl font-bold text-gray-800">Create Account</h1>
//           <p className="text-sm text-gray-500 mt-2">
//             Sign up to start blogging
//           </p>
//         </div>

//         {/* Form */}
//         <form className="space-y-5" onSubmit={handleSignup}>
//           {/* Username */}
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1">
//               Username
//             </label>
//             <input
//               type="text"
//               name="username"
//               value={signupInfo.username}
//               onChange={handleChange}
//               placeholder="Enter your username"
//               className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//             />
//           </div>

//           {/* Email */}
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1">
//               Email
//             </label>
//             <input
//               type="email"
//               name="email"
//               value={signupInfo.email}
//               onChange={handleChange}
//               placeholder="Enter your email"
//               className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//             />
//           </div>

//           {/* Password */}
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1">
//               Password
//             </label>
//             <input
//               type="password"
//               name="password"
//               value={signupInfo.password}
//               onChange={handleChange}
//               placeholder="Create a password"
//               className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//             />
//           </div>

//           {/* Button */}
//           <button
//             type="submit"
//             disabled={isLoading}
//             className={`w-full flex items-center justify-center gap-2 py-2 rounded-lg font-semibold transition
//     ${
//       isLoading
//         ? "bg-blue-400 cursor-not-allowed"
//         : "bg-blue-600 hover:bg-blue-700"
//     } text-white`}
//           >
//             {isLoading ? (
//               <>
//                 <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
//                 Signing up...
//               </>
//             ) : (
//               "Sign Up"
//             )}
//           </button>

//           <OAuth />
//         </form>

//         {/* Footer */}
//         <p className="text-center text-sm text-gray-600 mt-6">
//           Already have an account?{" "}
//           <Link
//             to="/signin"
//             className="text-blue-600 hover:underline cursor-pointer"
//           >
//             Login
//           </Link>
//         </p>
//         <ToastContainer />
//       </div>
//     </div>
//   );
// };

// export default Signup;



import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { handleError, handleSuccess } from "../utils.jsx";
import { ToastContainer } from "react-toastify";
import OAuth from "../Components/OAuth.jsx";
import { useSelector } from "react-redux";

const Signup = () => {
  const [signupInfo, setSignupInfo] = useState({
    username: "",
    email: "",
    password: "",
  });

  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const {mode} = useSelector((state) => state.theme);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSignupInfo((prev) => ({ ...prev, [name]: value }));
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    if (isLoading) return;

    const { username, email, password } = signupInfo;

    if (!username || !email || !password) {
      return handleError("All fields are required !! ");
    }

    try {
      setIsLoading(true);

      const url = "http://localhost:2068/api/auth/signup";
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(signupInfo),
      });

      const result = await response.json();
      const { success, message, error } = result;

      if (success) {
        handleSuccess(message);
        setTimeout(() => navigate("/signin"), 1000);
      } else if (error) {
        const details = error?.details?.[0]?.message;
        handleError(details);
      } else {
        handleError(message);
      }
    } catch (err) {
      handleError("Something went wrong!");
    } finally {
      setIsLoading(false);
    }
  };

  // return (
  //   <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-white to-blue-50 px-4 py-10">
  //     <div className="w-full max-w-md sm:max-w-lg bg-white/90 backdrop-blur-xl border border-gray-100 rounded-3xl shadow-2xl p-6 sm:p-10">

  //       {/* Header */}
  //       <div className="text-center mb-8">
  //         <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">
  //           Create Account
  //         </h1>
  //         <p className="text-sm text-gray-500 mt-2">
  //           Sign up to start blogging
  //         </p>
  //       </div>

  //       {/* Form */}
  //       <form className="space-y-6" onSubmit={handleSignup}>

  //         {/* Username */}
  //         <div className="relative">
  //           <input
  //             type="text"
  //             name="username"
  //             value={signupInfo.username}
  //             onChange={handleChange}
  //             required
  //             className="peer w-full px-4 pt-5 pb-2 rounded-xl border border-gray-300 bg-white
  //                        focus:outline-none focus:ring-2 focus:ring-blue-500
  //                        focus:border-blue-500 transition"
  //             placeholder=" "
  //           />
  //           <label
  //             className="absolute left-4 top-2 text-gray-500 text-sm
  //                        transition-all
  //                        peer-placeholder-shown:top-4
  //                        peer-placeholder-shown:text-base
  //                        peer-placeholder-shown:text-gray-400
  //                        peer-focus:top-2
  //                        peer-focus:text-sm
  //                        peer-focus:text-blue-600"
  //           >
  //             Username
  //           </label>
  //         </div>

  //         {/* Email */}
  //         <div className="relative">
  //           <input
  //             type="email"
  //             name="email"
  //             value={signupInfo.email}
  //             onChange={handleChange}
  //             required
  //             className="peer w-full px-4 pt-5 pb-2 rounded-xl border border-gray-300 bg-white
  //                        focus:outline-none focus:ring-2 focus:ring-blue-500
  //                        focus:border-blue-500 transition"
  //             placeholder=" "
  //           />
  //           <label
  //             className="absolute left-4 top-2 text-gray-500 text-sm
  //                        transition-all
  //                        peer-placeholder-shown:top-4
  //                        peer-placeholder-shown:text-base
  //                        peer-placeholder-shown:text-gray-400
  //                        peer-focus:top-2
  //                        peer-focus:text-sm
  //                        peer-focus:text-blue-600"
  //           >
  //             Email
  //           </label>
  //         </div>

  //         {/* Password */}
  //         <div className="relative">
  //           <input
  //             type="password"
  //             name="password"
  //             value={signupInfo.password}
  //             onChange={handleChange}
  //             required
  //             className="peer w-full px-4 pt-5 pb-2 rounded-xl border border-gray-300 bg-white
  //                        focus:outline-none focus:ring-2 focus:ring-blue-500
  //                        focus:border-blue-500 transition"
  //             placeholder=" "
  //           />
  //           <label
  //             className="absolute left-4 top-2 text-gray-500 text-sm
  //                        transition-all
  //                        peer-placeholder-shown:top-4
  //                        peer-placeholder-shown:text-base
  //                        peer-placeholder-shown:text-gray-400
  //                        peer-focus:top-2
  //                        peer-focus:text-sm
  //                        peer-focus:text-blue-600"
  //           >
  //             Password
  //           </label>
  //         </div>

  //         {/* Button */}
  //         <button
  //           type="submit"
  //           disabled={isLoading}
  //           className={`w-full flex items-center justify-center gap-2 py-3 rounded-xl font-semibold tracking-wide
  //           transition-all duration-300 shadow-md
  //           ${
  //             isLoading
  //               ? "bg-blue-400 cursor-not-allowed"
  //               : "bg-blue-600 hover:bg-blue-700 hover:shadow-lg hover:scale-[1.02]"
  //           } text-white`}
  //         >
  //           {isLoading ? (
  //             <>
  //               <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
  //               Signing up...
  //             </>
  //           ) : (
  //             "Sign Up"
  //           )}
  //         </button>

  //         <div className="pt-2">
  //           <OAuth />
  //         </div>
  //       </form>

  //       {/* Footer */}
  //       <p className="text-center text-sm text-gray-600 mt-8">
  //         Already have an account?{" "}
  //         <Link
  //           to="/signin"
  //           className="text-blue-600 hover:underline font-medium"
  //         >
  //           Login
  //         </Link>
  //       </p>

  //       <ToastContainer />
  //     </div>
  //   </div>
  // );



  return (
  <div
    className={`min-h-screen flex items-center justify-center px-4 py-10
      ${mode === "dark"
        ? "bg-gray-900 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-700"
        : "bg-gradient-to-br from-slate-50 via-white to-blue-50"
      }`}
  >
    <div
      className={`w-full max-w-md sm:max-w-lg rounded-3xl shadow-2xl p-6 sm:p-10 border transition
        ${mode === "dark"
          ? "bg-gray-800/90 backdrop-blur-xl border-gray-700"
          : "bg-white/90 backdrop-blur-xl border-gray-100"
        }`}
    >
      {/* Header */}
      <div className="text-center mb-8">
        <h1
          className={`text-2xl sm:text-3xl font-bold transition
            ${mode === "dark" ? "text-gray-100" : "text-gray-800"}`}
        >
          Create Account
        </h1>
        <p
          className={`text-sm mt-2 transition
            ${mode === "dark" ? "text-gray-400" : "text-gray-500"}`}
        >
          Sign up to start blogging
        </p>
      </div>

      {/* Form */}
      <form className="space-y-6" onSubmit={handleSignup}>
        {/* Username */}
        <div className="relative">
          <input
            type="text"
            name="username"
            value={signupInfo.username}
            onChange={handleChange}
            required
            className={`peer w-full px-4 pt-5 pb-2 rounded-xl border transition
              ${mode === "dark"
                ? "border-gray-600 bg-gray-700 text-gray-100 focus:ring-blue-400 focus:border-blue-400 placeholder-gray-400"
                : "border-gray-300 bg-white text-gray-800 focus:ring-blue-500 focus:border-blue-500 placeholder-gray-400"
              }`}
            placeholder=" "
          />
          <label
            className={`absolute left-4 top-2 text-sm transition-all
              peer-placeholder-shown:top-4 peer-placeholder-shown:text-base
              peer-focus:top-2 peer-focus:text-sm
              ${mode === "dark"
                ? "text-gray-400 peer-focus:text-blue-400"
                : "text-gray-500 peer-focus:text-blue-600"
              }`}
          >
            Username
          </label>
        </div>

        {/* Email */}
        <div className="relative">
          <input
            type="email"
            name="email"
            value={signupInfo.email}
            onChange={handleChange}
            required
            className={`peer w-full px-4 pt-5 pb-2 rounded-xl border transition
              ${mode === "dark"
                ? "border-gray-600 bg-gray-700 text-gray-100 focus:ring-blue-400 focus:border-blue-400 placeholder-gray-400"
                : "border-gray-300 bg-white text-gray-800 focus:ring-blue-500 focus:border-blue-500 placeholder-gray-400"
              }`}
            placeholder=" "
          />
          <label
            className={`absolute left-4 top-2 text-sm transition-all
              peer-placeholder-shown:top-4 peer-placeholder-shown:text-base
              peer-focus:top-2 peer-focus:text-sm
              ${mode === "dark"
                ? "text-gray-400 peer-focus:text-blue-400"
                : "text-gray-500 peer-focus:text-blue-600"
              }`}
          >
            Email
          </label>
        </div>

        {/* Password */}
        <div className="relative">
          <input
            type="password"
            name="password"
            value={signupInfo.password}
            onChange={handleChange}
            required
            className={`peer w-full px-4 pt-5 pb-2 rounded-xl border transition
              ${mode === "dark"
                ? "border-gray-600 bg-gray-700 text-gray-100 focus:ring-blue-400 focus:border-blue-400 placeholder-gray-400"
                : "border-gray-300 bg-white text-gray-800 focus:ring-blue-500 focus:border-blue-500 placeholder-gray-400"
              }`}
            placeholder=" "
          />
          <label
            className={`absolute left-4 top-2 text-sm transition-all
              peer-placeholder-shown:top-4 peer-placeholder-shown:text-base
              peer-focus:top-2 peer-focus:text-sm
              ${mode === "dark"
                ? "text-gray-400 peer-focus:text-blue-400"
                : "text-gray-500 peer-focus:text-blue-600"
              }`}
          >
            Password
          </label>
        </div>

        {/* Button */}
        <button
          type="submit"
          disabled={isLoading}
          className={`w-full flex items-center justify-center gap-2 py-3 rounded-xl font-semibold tracking-wide
            transition-all duration-300 shadow-md text-white
            ${
              isLoading
                ? "bg-blue-400 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700 hover:shadow-lg hover:scale-[1.02]"
            }`}
        >
          {isLoading ? (
            <>
              <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
              Signing up...
            </>
          ) : (
            "Sign Up"
          )}
        </button>

        <div className="pt-2">
          <OAuth />
        </div>
      </form>

      {/* Footer */}
      <p
        className={`text-center text-sm mt-8 transition
          ${mode === "dark" ? "text-gray-400" : "text-gray-600"}`}
      >
        Already have an account?{" "}
        <Link
          to="/signin"
          className="text-blue-600 hover:underline font-medium"
        >
          Login
        </Link>
      </p>

      <ToastContainer />
    </div>
  </div>
);


};

export default Signup;