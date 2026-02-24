// import React from "react";
// import { Link, Navigate, useNavigate } from "react-router-dom";
// import { useState } from "react";
// import { handleError, handleSuccess } from "../utils.jsx";
// import { ToastContainer } from "react-toastify";
// import { useDispatch, useSelector } from "react-redux";
// import {
//   signInStart,
//   signInSuccess,
//   signInFailure,
// } from "../redux/user/userSlice";
// import OAuth from "../Components/OAuth.jsx";

// const Signin = () => {
//   const [signinInfo, setSigninInfo] = useState({
//     email: "",
//     password: "",
//   });

//   const navigate = useNavigate();
//   // const [isLoading, setIsLoading] = useState(false);
//   const dispatch = useDispatch();
//   const { loading } = useSelector((state) => state.user);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     const copySigninInfo = { ...signinInfo };
//     copySigninInfo[name] = value;
//     setSigninInfo(copySigninInfo);
//   };

//   const handleSignin = async (e) => {
//     e.preventDefault();

//     const { email, password } = signinInfo;

//     if (!email || !password) {
//       return handleError("All fields are required !! ");
//     }

//     try {
//       dispatch(signInStart());

//       const url = "http://localhost:2068/api/auth/signin";
//       const response = await fetch(url, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         credentials: "include",
//         body: JSON.stringify(signinInfo),
//       });

//       const result = await response.json();
//       const { success, message, error } = result;

//       if (success) {
//         console.log("FULL RESULT:", result);
//         console.log("USER:", result.user);
//         dispatch(signInSuccess(result)); // 🔥 store user in redux

//         handleSuccess(message);
//         navigate("/");
//       } else if (error) {
//         const details = error?.details?.[0]?.message;
//         dispatch(signInFailure(details));
//         handleError(details);
//       } else {
//         dispatch(signInFailure(message));
//         handleError(message);
//       }
//     } catch (err) {
//       dispatch(signInFailure(err.message));
//       handleError(err.message);
//     }
//   };

//   return (
//     <div className="min-h-screen  flex items-center justify-center bg-gray-100 px-4">
//       <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">
//         {/* Header */}
//         <div className="text-center mb-6">
//           <h1 className="text-3xl font-bold text-gray-800">Signin</h1>
//           <p className="text-sm text-gray-500 mt-2">
//             Sign in to continue blogging
//           </p>
//         </div>

//         {/* Form */}
//         <form className="space-y-5" onSubmit={handleSignin}>
//           {/* Email */}
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1">
//               Email
//             </label>
//             <input
//               type="email"
//               name="email"
//               value={signinInfo.email}
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
//               value={signinInfo.password}
//               onChange={handleChange}
//               placeholder="Create a password"
//               className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//             />
//           </div>

//           {/* Button */}
//           <button
//             type="submit"
//             disabled={loading}
//             className={`w-full flex items-center justify-center gap-2 py-2 rounded-lg font-semibold transition
//     ${
//       loading
//         ? "bg-blue-400 cursor-not-allowed"
//         : "bg-blue-600 hover:bg-blue-700"
//     } text-white`}
//           >
//             {loading ? (
//               <>
//                 <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
//                 Signing in...
//               </>
//             ) : (
//               "Sign In"
//             )}
//           </button>

//           <OAuth />
//         </form>

//         {/* Footer */}
//         <p className="text-center text-sm text-gray-600 mt-6">
//           Don't have an account?{" "}
//           <Link
//             to="/signup"
//             className="text-blue-600 hover:underline cursor-pointer"
//           >
//             Signup
//           </Link>
//         </p>
//         <ToastContainer />
//       </div>
//     </div>
//   );
// };

// export default Signin;






import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { handleError, handleSuccess } from "../utils.jsx";
import { ToastContainer } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import {
  signInStart,
  signInSuccess,
  signInFailure,
} from "../redux/user/userSlice";
import OAuth from "../Components/OAuth.jsx";

const Signin = () => {
  const [signinInfo, setSigninInfo] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { mode } = useSelector((state) => state.theme);
  const { loading } = useSelector((state) => state.user);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSigninInfo((prev) => ({ ...prev, [name]: value }));
  };

  const handleSignin = async (e) => {
    e.preventDefault();

    const { email, password } = signinInfo;

    if (!email || !password) {
      return handleError("All fields are required !! ");
    }

    try {
      dispatch(signInStart());

      const response = await fetch(
        "http://localhost:2068/api/auth/signin",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify(signinInfo),
        }
      );

      const result = await response.json();
      const { success, message, error } = result;

      if (success) {
        dispatch(signInSuccess(result));
        handleSuccess(message);
        navigate("/");
      } else if (error) {
        const details = error?.details?.[0]?.message;
        dispatch(signInFailure(details));
        handleError(details);
      } else {
        dispatch(signInFailure(message));
        handleError(message);
      }
    } catch (err) {
      dispatch(signInFailure(err.message));
      handleError(err.message);
    }
  };

 return (
  <div
    className={`min-h-screen flex items-center justify-center px-4 py-10 transition
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
          Welcome Back
        </h1>
        <p
          className={`text-sm mt-2 transition
            ${mode === "dark" ? "text-gray-400" : "text-gray-500"}`}
        >
          Sign in to continue blogging
        </p>
      </div>

      {/* Form */}
      <form className="space-y-6" onSubmit={handleSignin}>
        {/* Email */}
        <div className="relative">
          <input
            type="email"
            name="email"
            value={signinInfo.email}
            onChange={handleChange}
            required
            placeholder=" "
            className={`peer w-full px-4 pt-5 pb-2 rounded-xl border transition
              ${mode === "dark"
                ? "border-gray-600 bg-gray-700 text-gray-100 focus:ring-blue-400 focus:border-blue-400 placeholder-gray-400"
                : "border-gray-300 bg-white text-gray-800 focus:ring-blue-500 focus:border-blue-500 placeholder-gray-400"
              }`}
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
            value={signinInfo.password}
            onChange={handleChange}
            required
            placeholder=" "
            className={`peer w-full px-4 pt-5 pb-2 rounded-xl border transition
              ${mode === "dark"
                ? "border-gray-600 bg-gray-700 text-gray-100 focus:ring-blue-400 focus:border-blue-400 placeholder-gray-400"
                : "border-gray-300 bg-white text-gray-800 focus:ring-blue-500 focus:border-blue-500 placeholder-gray-400"
              }`}
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
          disabled={loading}
          className={`w-full flex items-center justify-center gap-2 py-3 rounded-xl font-semibold tracking-wide
            transition-all duration-300 shadow-md text-white
            ${
              loading
                ? "bg-blue-400 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700 hover:shadow-lg hover:scale-[1.02]"
            }`}
        >
          {loading ? (
            <>
              <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
              Signing in...
            </>
          ) : (
            "Sign In"
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
        Don't have an account?{" "}
        <Link
          to="/signup"
          className="text-blue-600 hover:underline font-medium"
        >
          Signup
        </Link>
      </p>

      <ToastContainer />
    </div>
  </div>
);
};

export default Signin;