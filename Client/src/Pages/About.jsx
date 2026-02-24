// export default function About() {
//   return (
//     <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 dark:from-gray-950 dark:via-gray-900 dark:to-black text-gray-800 dark:text-gray-200 px-6 py-24">
//       <div className="max-w-5xl mx-auto">
//         {/* Card Container */}
//         <div className="bg-white/80 dark:bg-gray-900/70 backdrop-blur-xl border border-slate-200 dark:border-gray-800 rounded-3xl shadow-2xl p-10 md:p-14">
//           {/* Top Section */}
//           <div className="flex flex-col md:flex-row md:items-start gap-12 w-full">

import { useSelector } from "react-redux";

//   {/* Profile Image */}
//   <div className="relative group flex-shrink-0 self-start">
//     <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-600 blur-xl opacity-30 group-hover:opacity-50 transition"></div>

//     <img
//       src="https://res.cloudinary.com/dvujchz0i/image/upload/v1771853831/IMG_20251106_193102_666_elro31.webp"
//       alt="Pratham"
//       className="relative w-44 h-44 rounded-full object-cover border-4 border-white dark:border-gray-900 shadow-xl"
//     />
//   </div>

//   {/* Text Section */}
//   <div className="flex flex-col items-start text-left">

//     <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-indigo-500 to-purple-500 bg-clip-text text-transparent">
//       Pratham
//     </h1>

//     <p className="text-lg md:text-xl text-gray-400 mb-6 leading-relaxed max-w-xl">
//       Full-Stack Developer building scalable web applications and
//       writing about real-world development.
//     </p>

//     <a
//       href="https://prathams.me"
//       target="_blank"
//       rel="noopener noreferrer"
//       className="inline-flex items-center gap-2 px-6 py-3 rounded-full
//                  bg-gradient-to-r from-indigo-600 to-purple-600
//                  text-white font-medium shadow-lg
//                  hover:shadow-xl hover:scale-105
//                  transition-all duration-300"
//     >
//       Visit prathams.me →
//     </a>

//   </div>
// </div>

//           {/* Divider */}
//           <div className="my-14 h-px bg-gradient-to-r from-transparent via-slate-300 dark:via-gray-700 to-transparent"></div>

//           {/* About Content */}
//           <div className="space-y-8 text-lg leading-9 text-gray-700 dark:text-gray-300">
//             <p>
//               I created this blog to document what I build and what I learn
//               while solving real development problems. Most growth doesn’t come
//               from watching tutorials — it comes from debugging, refactoring,
//               and understanding how systems actually work.
//             </p>

//             <p>
//               I focus on clean architecture, maintainable code, backend logic,
//               and thoughtful UI decisions. I care about writing software that
//               scales and code that stays readable months later.
//             </p>

//             <p>
//               This space reflects that journey — practical insights,
//               implementation details, and honest breakdowns of what it takes to
//               build modern web applications properly.
//             </p>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }




export default function About() {
    const { mode } = useSelector((state) => state.theme);

 return (
  <div className={`relative min-h-screen overflow-hidden px-6 py-24 transition-colors ${mode === "light" ? "bg-gradient-to-br from-teal-50 via-white to-indigo-50" : "bg-gray-900"}`}>

    {/* Background Gradients */}
    <div className={`absolute inset-0 -z-10 transition-colors ${mode === "light" ? "bg-gradient-to-br from-teal-50 via-white to-indigo-50" : "bg-gradient-to-br from-gray-800 via-gray-900 to-gray-800"}`}></div>

    <div className={`absolute top-0 left-1/4 w-[500px] h-[500px] rounded-full blur-[120px] opacity-20 -z-10 transition-colors ${mode === "light" ? "bg-teal-200" : "bg-teal-700"}`}></div>
    <div className={`absolute bottom-0 right-1/4 w-[500px] h-[500px] rounded-full blur-[120px] opacity-20 -z-10 transition-colors ${mode === "light" ? "bg-indigo-200" : "bg-indigo-800"}`}></div>

    <div className="max-w-5xl mx-auto">

      {/* Card Container */}
      <div className={`border rounded-3xl shadow-xl p-10 md:p-14 transition-colors ${mode === "light" ? "bg-gradient-to-br from-white to-teal-50 border-teal-100" : "bg-gray-800 border-gray-700"}`}>

        {/* Top Section */}
        <div className="flex flex-col md:flex-row md:items-start gap-12 w-full">

          {/* Profile Image */}
          <div className="relative group flex-shrink-0 self-start">
            <div className={`absolute inset-0 rounded-full blur-2xl opacity-30 group-hover:opacity-40 transition-colors ${mode === "light" ? "bg-gradient-to-tr from-teal-400 to-indigo-500" : "bg-gradient-to-tr from-teal-600 to-indigo-700"}`}></div>

            <img
              src="https://res.cloudinary.com/dvujchz0i/image/upload/v1771853831/IMG_20251106_193102_666_elro31.webp"
              alt="Pratham"
              className="relative w-44 h-44 rounded-full object-cover border-4 border-white shadow-lg"
            />
          </div>

          {/* Text Section */}
          <div className="flex flex-col items-start text-left">

            <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-teal-600 to-indigo-600 bg-clip-text text-transparent">
              Pratham
            </h1>

            <p className={`text-lg md:text-xl mb-6 leading-relaxed max-w-xl transition-colors ${mode === "light" ? "text-gray-600" : "text-gray-300"}`}>
              Full-Stack Developer building scalable web applications and
              writing about real-world development.
            </p>

            <a
              href="https://prathams.me"
              target="_blank"
              rel="noopener noreferrer"
              className={`inline-flex items-center gap-2 px-6 py-3 rounded-full font-medium shadow-md hover:shadow-lg hover:scale-105 transition-all duration-300 ${
                mode === "light" 
                  ? "bg-gradient-to-r from-teal-600 to-indigo-600 text-white hover:from-teal-700 hover:to-indigo-700"
                  : "bg-gradient-to-r from-teal-500 to-indigo-700 text-white hover:from-teal-600 hover:to-indigo-800"
              }`}
            >
              Visit prathams.me →
            </a>

          </div>
        </div>

        {/* Divider */}
        <div className={`my-14 h-px transition-colors ${mode === "light" ? "bg-gradient-to-r from-transparent via-teal-200 to-transparent" : "bg-gradient-to-r from-transparent via-gray-600 to-transparent"}`}></div>

        {/* About Content */}
        <div className={`space-y-8 text-lg leading-9 transition-colors ${mode === "light" ? "text-gray-700" : "text-gray-300"}`}>
          <p>
            I created this blog to document what I build and what I learn
            while solving real development problems. Most growth doesn’t come
            from watching tutorials — it comes from debugging, refactoring,
            and understanding how systems actually work.
          </p>

          <p>
            I focus on clean architecture, maintainable code, backend logic,
            and thoughtful UI decisions. I care about writing software that
            scales and code that stays readable months later.
          </p>

          <p>
            This space reflects that journey — practical insights,
            implementation details, and honest breakdowns of what it takes to
            build modern web applications properly.
          </p>
        </div>

      </div>
    </div>
  </div>
);
}