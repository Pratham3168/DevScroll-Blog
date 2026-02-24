// "use client";

// import { DotLottieReact } from "@lottiefiles/dotlottie-react";

// export default function Contact() {
//   return (
//     <div className="relative min-h-screen px-6 py-28 overflow-hidden">

//       {/* Background Glow */}
//       <div className="absolute inset-0 -z-10 bg-gradient-to-br from-teal-50 via-white to-indigo-50"></div>
//       <div className="absolute -top-40 -left-40 w-[500px] h-[500px] bg-teal-300 rounded-full blur-[150px] opacity-30 -z-10"></div>
//       <div className="absolute -bottom-40 -right-40 w-[500px] h-[500px] bg-indigo-300 rounded-full blur-[150px] opacity-30 -z-10"></div>

//       <div className="max-w-6xl mx-auto">

//         <div className="bg-white/90 backdrop-blur-xl border border-teal-100 rounded-3xl shadow-2xl p-12 md:p-16">

//           {/* Header */}
//           <div className="mb-16">
//             <h2 className="text-5xl font-bold mb-6 bg-gradient-to-r from-teal-600 to-indigo-600 bg-clip-text text-transparent">
//               Get in Touch
//             </h2>
//             <p className="text-lg text-gray-600 max-w-3xl leading-relaxed">
//               Have a project idea, collaboration opportunity, or just want to
//               say hello? I’d love to hear from you.
//             </p>
//           </div>

//           {/* Grid */}
//           <div className="grid md:grid-cols-2 gap-16 items-center">

//             {/* LEFT SIDE - Animation */}
//             <div className="flex justify-center items-center">
//               <div className="w-[500px] md:w-[650px] lg:w-[750px]">
//                 <DotLottieReact
//                   src="/TTA Contact Us.lottie"
//                   loop
//                   autoplay
//                   style={{ width: "100%", height: "100%" }}
//                 />
//               </div>
//             </div>

//             {/* RIGHT SIDE - Form */}
//             <form className="space-y-8">

//               {/* Name */}
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-3">
//                   Name
//                 </label>
//                 <input
//                   type="text"
//                   placeholder="Your name"
//                   className="w-full px-5 py-3 rounded-xl border border-teal-200 bg-white
//                              focus:outline-none focus:ring-2 focus:ring-teal-400
//                              focus:border-teal-400 shadow-sm transition"
//                 />
//               </div>

//               {/* Email */}
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-3">
//                   Email
//                 </label>
//                 <input
//                   type="email"
//                   placeholder="your@email.com"
//                   className="w-full px-5 py-3 rounded-xl border border-teal-200 bg-white
//                              focus:outline-none focus:ring-2 focus:ring-teal-400
//                              focus:border-teal-400 shadow-sm transition"
//                 />
//               </div>

//               {/* Message */}
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-3">
//                   Message
//                 </label>
//                 <textarea
//                   rows="5"
//                   placeholder="What do you want to say?"
//                   className="w-full px-5 py-3 rounded-xl border border-teal-200 bg-white
//                              focus:outline-none focus:ring-2 focus:ring-teal-400
//                              focus:border-teal-400 shadow-sm transition resize-none"
//                 ></textarea>
//               </div>

//               {/* Submit Button */}
//               <button
//                 type="submit"
//                 className="w-full py-4 rounded-xl
//                            bg-gradient-to-r from-teal-600 to-indigo-600
//                            text-white font-semibold tracking-wide
//                            shadow-lg hover:shadow-xl
//                            hover:from-teal-700 hover:to-indigo-700
//                            hover:scale-[1.02]
//                            transition-all duration-300"
//               >
//                 Send Message
//               </button>

//             </form>

//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

"use client";

import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import { useSelector } from "react-redux";

export default function Contact() {
  const { mode } = useSelector((state) => state.theme);
  return (
  <div className={`relative min-h-screen px-4 sm:px-6 py-16 sm:py-20 md:py-28 overflow-hidden transition-colors
                   ${mode === "light" ? "bg-gradient-to-br from-teal-50 via-white to-indigo-50" : "bg-gray-900"}`}>

    {/* Background Glow */}
    <div className={`absolute inset-0 -z-10 transition-colors ${mode === "light" ? "bg-gradient-to-br from-teal-50 via-white to-indigo-50" : "bg-gradient-to-br from-gray-800 via-gray-900 to-gray-800"}`}></div>
    <div className={`absolute -top-40 -left-40 w-[300px] sm:w-[400px] md:w-[500px] h-[300px] sm:h-[400px] md:h-[500px] rounded-full blur-[120px] sm:blur-[140px] md:blur-[150px] opacity-30 -z-10 transition-colors
                     ${mode === "light" ? "bg-teal-300" : "bg-teal-700"}`}></div>
    <div className={`absolute -bottom-40 -right-40 w-[300px] sm:w-[400px] md:w-[500px] h-[300px] sm:h-[400px] md:h-[500px] rounded-full blur-[120px] sm:blur-[140px] md:blur-[150px] opacity-30 -z-10 transition-colors
                     ${mode === "light" ? "bg-indigo-300" : "bg-indigo-800"}`}></div>

    <div className="max-w-6xl mx-auto">

      <div className={`border rounded-3xl shadow-2xl p-6 sm:p-10 md:p-16 transition-colors
                       ${mode === "light" 
                          ? "bg-white/90 backdrop-blur-xl border-teal-100" 
                          : "bg-gray-800/90 backdrop-blur-xl border-gray-700"}`}>

        {/* Header */}
        <div className="mb-12 md:mb-16 text-center md:text-left">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-teal-600 to-indigo-600 bg-clip-text text-transparent">
            Get in Touch
          </h2>
          <p className={`text-base sm:text-lg max-w-3xl mx-auto md:mx-0 leading-relaxed transition-colors
                        ${mode === "light" ? "text-gray-600" : "text-gray-300"}`}>
            Have a project idea, collaboration opportunity, or just want to
            say hello? I’d love to hear from you.
          </p>
        </div>

        {/* Grid */}
        <div className="grid md:grid-cols-2 gap-10 md:gap-16 items-center">

          {/* LEFT SIDE - Animation */}
          <div className="flex justify-center items-center order-1 md:order-none">
            <div className="w-[260px] sm:w-[350px] md:w-[450px] lg:w-[550px]">
              <DotLottieReact
                src="/TTA Contact Us.lottie"
                loop
                autoplay
                style={{ width: "100%", height: "100%" }}
              />
            </div>
          </div>

          {/* RIGHT SIDE - Form */}
          <form className="space-y-6 sm:space-y-8">

            {/* Name */}
            <div>
              <label className={`block text-sm font-medium mb-2 sm:mb-3 transition-colors ${mode === "light" ? "text-gray-700" : "text-gray-300"}`}>
                Name
              </label>
              <input
                type="text"
                placeholder="Your name"
                className={`w-full px-4 sm:px-5 py-3 rounded-xl border shadow-sm transition-colors
                            ${mode === "light" 
                              ? "border-teal-200 bg-white focus:ring-2 focus:ring-teal-400 focus:border-teal-400 text-gray-700"
                              : "border-gray-600 bg-gray-700 focus:ring-2 focus:ring-teal-500 focus:border-teal-500 text-gray-200"}`}
              />
            </div>

            {/* Email */}
            <div>
              <label className={`block text-sm font-medium mb-2 sm:mb-3 transition-colors ${mode === "light" ? "text-gray-700" : "text-gray-300"}`}>
                Email
              </label>
              <input
                type="email"
                placeholder="your@email.com"
                className={`w-full px-4 sm:px-5 py-3 rounded-xl border shadow-sm transition-colors
                            ${mode === "light" 
                              ? "border-teal-200 bg-white focus:ring-2 focus:ring-teal-400 focus:border-teal-400 text-gray-700"
                              : "border-gray-600 bg-gray-700 focus:ring-2 focus:ring-teal-500 focus:border-teal-500 text-gray-200"}`}
              />
            </div>

            {/* Message */}
            <div>
              <label className={`block text-sm font-medium mb-2 sm:mb-3 transition-colors ${mode === "light" ? "text-gray-700" : "text-gray-300"}`}>
                Message
              </label>
              <textarea
                rows="5"
                placeholder="What do you want to say?"
                className={`w-full px-4 sm:px-5 py-3 rounded-xl border shadow-sm transition-colors resize-none
                            ${mode === "light" 
                              ? "border-teal-200 bg-white focus:ring-2 focus:ring-teal-400 focus:border-teal-400 text-gray-700"
                              : "border-gray-600 bg-gray-700 focus:ring-2 focus:ring-teal-500 focus:border-teal-500 text-gray-200"}`}
              ></textarea>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className={`w-full py-3 sm:py-4 rounded-xl font-semibold tracking-wide shadow-lg hover:shadow-xl hover:scale-[1.02] transition-all duration-300
                          ${mode === "light"
                            ? "bg-gradient-to-r from-teal-600 to-indigo-600 text-white hover:from-teal-700 hover:to-indigo-700"
                            : "bg-gradient-to-r from-teal-500 to-indigo-700 text-white hover:from-teal-600 hover:to-indigo-800"}`}
            >
              Send Message
            </button>

          </form>

        </div>
      </div>
    </div>
  </div>
);
}