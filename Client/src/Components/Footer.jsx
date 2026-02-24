// import { Link } from "react-router-dom";
// import {
//   BsFacebook,
//   BsInstagram,
//   BsTwitter,
//   BsGithub,
//   BsDribbble,
// } from "react-icons/bs";

// export default function FooterCom() {
//   return (
//     <footer className="bg-gray-100 dark:bg-gray-900 border-t border-gray-300 dark:border-gray-700 ">
//       <div className="max-w-7xl mx-auto px-6 py-10">

//         {/* Top Section */}
//         <div className="grid gap-8 sm:flex sm:justify-between">

//           {/* Logo */}
//           <div>
//             <Link
//               to="/"
//               className="text-xl font-semibold text-gray-800 dark:text-white"
//             >
//               <span className="px-2 py-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg text-white mr-1">
//                 Rajput's
//               </span>
//               Blog
//             </Link>
//           </div>

//           {/* Links */}
//           <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 text-sm text-gray-600 dark:text-gray-400">

//             <div>
//               <h3 className="mb-3 font-semibold uppercase text-gray-800 dark:text-white">
//                 About
//               </h3>
//               <ul className="space-y-2">
//                 <li>
//                   <a
//                     href="https://pratham-s-portfolio-beta.vercel.app/"
//                     target="_blank"
//                     rel="noopener noreferrer"
//                     className="hover:text-gray-900 dark:hover:text-white"
//                   >
//                     Know About me
//                   </a>
//                 </li>
//                 <li>
//                   <Link
//                     to="/about"
//                     className="hover:text-gray-900 dark:hover:text-white"
//                   >
//                     Rajput's Blog
//                   </Link>
//                 </li>
//               </ul>
//             </div>

//             <div>
//               <h3 className="mb-3 font-semibold uppercase text-gray-800 dark:text-white">
//                 Follow
//               </h3>
//               <ul className="space-y-2">
//                 <li>
//                   <a
//                     href="https://github.com/Pratham3168"
//                     target="_blank"
//                     rel="noopener noreferrer"
//                     className="hover:text-gray-900 dark:hover:text-white"
//                   >
//                     GitHub
//                   </a>
//                 </li>
//                 <li>
//                   <a href="#" className="hover:text-gray-900 dark:hover:text-white">
//                     Discord
//                   </a>
//                 </li>
//               </ul>
//             </div>

//             <div>
//               <h3 className="mb-3 font-semibold uppercase text-gray-800 dark:text-white">
//                 Legal
//               </h3>
//               <ul className="space-y-2">
//                 <li>
//                   <a href="#" className="hover:text-gray-900 dark:hover:text-white">
//                     Privacy Policy
//                   </a>
//                 </li>
//                 <li>
//                   <a href="#" className="hover:text-gray-900 dark:hover:text-white">
//                     Terms & Conditions
//                   </a>
//                 </li>
//               </ul>
//             </div>

//           </div>
//         </div>

//         <hr className="my-6 border-gray-300 dark:border-gray-700" />

//         {/* Bottom Section */}
//         <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 text-sm text-gray-600 dark:text-gray-400">

//           <p>
//             © {new Date().getFullYear()} Rajput's Blog. All rights reserved.
//           </p>

//           <div className="flex gap-5">
//             <a href="#" className="hover:text-blue-600">
//               <BsFacebook size={18} />
//             </a>
//             <a href="#" className="hover:text-pink-500">
//               <BsInstagram size={18} />
//             </a>
//             <a href="#" className="hover:text-sky-500">
//               <BsTwitter size={18} />
//             </a>
//             <a
//               href="https://github.com/Pratham3168"
//               target="_blank"
//               rel="noopener noreferrer"
//               className="hover:text-black dark:hover:text-white"
//             >
//               <BsGithub size={18} />
//             </a>
//             <a href="#" className="hover:text-purple-500">
//               <BsDribbble size={18} />
//             </a>
//           </div>
//         </div>

//       </div>
//     </footer>
//   );
// }



import { Link } from "react-router-dom";
import {
  BsFacebook,
  BsInstagram,
  BsTwitter,
  BsGithub,
  BsDribbble,
} from "react-icons/bs";

export default function FooterCom() {
  return (
    <footer className="bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700">
      <div className="max-w-7xl mx-auto px-6 py-10">

        {/* Top Section */}
        <div className="grid gap-8 sm:flex sm:justify-between">

          {/* Logo */}
          <div>
            <Link
              to="/"
              className="text-xl font-semibold text-gray-800 dark:text-white"
            >
              <span className="px-3 py-1 bg-gradient-to-r from-teal-500 to-blue-600 rounded-lg text-white mr-1 shadow-md">
                DevScroll
              </span>
              Blog
            </Link>
          </div>

          {/* Links */}
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 text-sm text-gray-600 dark:text-gray-400">

            {/* About */}
            <div>
              <h3 className="mb-3 font-semibold uppercase text-gray-800 dark:text-white">
                About
              </h3>
              <ul className="space-y-2">
                <li>
                  <a
                    href="https://prathams.me"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-teal-600 transition"
                  >
                    Know About Me
                  </a>
                </li>
                <li>
                  <Link
                    to="/about"
                    className="hover:text-teal-600 transition"
                  >
                    DevScroll Blog
                  </Link>
                </li>
              </ul>
            </div>

            {/* Follow */}
            <div>
              <h3 className="mb-3 font-semibold uppercase text-gray-800 dark:text-white">
                Follow
              </h3>
              <ul className="space-y-2">
                <li>
                  <a
                    href="https://github.com/Pratham3168"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-teal-600 transition"
                  >
                    GitHub
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-teal-600 transition"
                  >
                    Discord
                  </a>
                </li>
              </ul>
            </div>

            {/* Legal */}
            <div>
              <h3 className="mb-3 font-semibold uppercase text-gray-800 dark:text-white">
                Legal
              </h3>
              <ul className="space-y-2">
                <li>
                  <a
                    href="#"
                    className="hover:text-teal-600 transition"
                  >
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-teal-600 transition"
                  >
                    Terms & Conditions
                  </a>
                </li>
              </ul>
            </div>

          </div>
        </div>

        <hr className="my-6 border-gray-200 dark:border-gray-700" />

        {/* Bottom Section */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 text-sm text-gray-600 dark:text-gray-400">

          <p>
            © {new Date().getFullYear()} DevScroll Blog. All rights reserved.
          </p>

          <div className="flex gap-5">

            <a href="#" className="hover:text-teal-600 transition">
              <BsFacebook size={18} />
            </a>

            <a href="https://www.instagram.com/pratham_rajput3168" className="hover:text-teal-600 transition">
              <BsInstagram size={18} />
            </a>

            <a href="#" className="hover:text-teal-600 transition">
              <BsTwitter size={18} />
            </a>

            <a
              href="https://github.com/Pratham3168"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-teal-600 transition"
            >
              <BsGithub size={18} />
            </a>

            <a href="#" className="hover:text-teal-600 transition">
              <BsDribbble size={18} />
            </a>

          </div>
        </div>

      </div>
    </footer>
  );
}