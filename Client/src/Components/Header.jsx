// import { Link, useLocation } from "react-router-dom";
// import { AiOutlineSearch, AiOutlineMenu, AiOutlineClose } from "react-icons/ai";
// import { FaMoon, FaSun } from "react-icons/fa";
// import { useState } from "react";

// export default function Header({
//   theme,
//   currentUser,
//   onToggleTheme,
//   onSignOut,
// }) {
//   const { pathname } = useLocation();
//   const [menuOpen, setMenuOpen] = useState(false);

//   return (
//     <nav className="border-b px-4 py-2">
//       {/* TOP BAR */}
//       <div className="flex items-center justify-between">
//         {/* Logo */}
//         <Link to="/" className="text-sm sm:text-xl font-semibold">
//           <span className="px-2 py-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg text-white mr-1">
//             Rajput's
//           </span>
//           Blog
//         </Link>

//         {/* Desktop links */}
//         <div className="hidden md:flex gap-6">
//           <Link to="/" className={pathname === "/" ? "font-semibold" : ""}>
//             Home
//           </Link>
//           <Link
//             to="/about"
//             className={pathname === "/about" ? "font-semibold" : ""}
//           >
//             About
//           </Link>
//           <Link
//             to="/projects"
//             className={pathname === "/projects" ? "font-semibold" : ""}
//           >
//             Projects
//           </Link>
//         </div>

//         {/* RIGHT SIDE */}
//         <div className="flex items-center gap-3">
//           {/* Search icon - MOBILE */}
//           <button className="lg:hidden p-2 rounded-full border">
//             <AiOutlineSearch />
//           </button>

//           {/* Search - DESKTOP */}
//           <div className="hidden lg:flex items-center border rounded-md px-2">
//             <input
//               type="text"
//               placeholder="Search..."
//               className="bg-transparent border-none outline-none text-sm"
//             />
//             <AiOutlineSearch />
//           </div>

//           {/* Theme toggle */}
//           <button onClick={onToggleTheme} className="p-2 rounded-full border">
//             {theme === "light" ? <FaSun /> : <FaMoon />}
//           </button>

//           {/* AUTH - DESKTOP */}
//           {currentUser ? (
//             <div className="hidden md:block relative group">
//               <img
//                 src={currentUser.avatar || "/default-avatar.png"}
//                 alt="user"
//                 className="w-9 h-9 rounded-full cursor-pointer"
//               />
//               <div className="absolute right-0 mt-2 w-48 bg-white border rounded-md shadow-md hidden group-hover:block">
//                 <Link
//                   to="/dashboard"
//                   className="block px-4 py-2 hover:bg-gray-100"
//                 >
//                   Profile
//                 </Link>
//                 <button
//                   onClick={onSignOut}
//                   className="w-full text-left px-4 py-2 hover:bg-gray-100"
//                 >
//                   Sign out
//                 </button>
//               </div>
//             </div>
//           ) : (
//             <Link to="/signin" className="hidden md:block">
//               <button className="px-4 py-2 border rounded-md bg-gradient-to-r from-purple-500 to-blue-500 text-white">
//                 Sign In
//               </button>
//             </Link>
//           )}

//           {/* Hamburger - MOBILE ONLY */}
//           <button
//             className="md:hidden p-2 rounded-full border"
//             onClick={() => setMenuOpen(!menuOpen)}
//           >
//             {menuOpen ? <AiOutlineClose /> : <AiOutlineMenu />}
//           </button>
//         </div>
//       </div>

//       {/* MOBILE MENU */}
//       {/* MOBILE MENU */}
//       {menuOpen && (
//         <div className="md:hidden mt-4 border-t pt-4">
//           <div className="flex flex-col gap-4">
//             <Link
//               to="/"
//               onClick={() => setMenuOpen(false)}
//               className={pathname === "/" ? "font-semibold" : ""}
//             >
//               Home
//             </Link>

//             <Link
//               to="/about"
//               onClick={() => setMenuOpen(false)}
//               className={pathname === "/about" ? "font-semibold" : ""}
//             >
//               About
//             </Link>

//             <Link
//               to="/projects"
//               onClick={() => setMenuOpen(false)}
//               className={pathname === "/projects" ? "font-semibold" : ""}
//             >
//               Projects
//             </Link>

//             <div className="border-t pt-4 flex flex-col gap-3">
//               {currentUser ? (
//                 <>
//                   <Link to="/dashboard" onClick={() => setMenuOpen(false)}>
//                     Profile
//                   </Link>

//                   <button className="text-left">Sign out</button>
//                 </>
//               ) : (
//                 <Link to="/signin" onClick={() => setMenuOpen(false)}>
//                   <button className="w-full py-2 bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded-md">
//                     Sign In
//                   </button>
//                 </Link>
//               )}
//             </div>
//           </div>
//         </div>
//       )}
//     </nav>
//   );
// }

import { Link, useLocation, useNavigate } from "react-router-dom";
import { AiOutlineSearch, AiOutlineMenu, AiOutlineClose } from "react-icons/ai";
import { FaMoon, FaSun } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import { signOut } from "../redux/user/userSlice";
import { toggleTheme } from "../redux/theme/themeSlice";
import { useState, useEffect } from "react";
import { API_BASE } from "../utils";

export default function Header() {
  const { pathname, search } = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const { currentUser } = useSelector((state) => state.user);
  const { mode } = useSelector((state) => state.theme);
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [profileOpen, setProfileOpen] = useState(false);

  useEffect(() => {
    const urlParams = new URLSearchParams(search);
    const searchFromUrl = urlParams.get("searchTerm");
    if (searchFromUrl) {
      setSearchTerm(searchFromUrl);
    }
  }, [search]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const urlParams = new URLSearchParams();
    urlParams.set("searchTerm", searchTerm);
    navigate(`/search?${urlParams.toString()}`);
  };

  const handleSignOut = async () => {
    try {
      const res = await fetch(
        `${API_BASE}/api/user/signout`,
        {
          method: "POST",
          credentials: "include",
        },
      );

      if (res.ok) {
        dispatch(signOut());
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  // return (
  //   <nav className="border-b px-4 py-2">
  //     <div className="flex items-center justify-between">
  //       {/* Logo */}
  //       <Link to="/" className="text-sm sm:text-xl font-semibold">
  //         <span className="px-2 py-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg text-white mr-1">
  //           Rajput's
  //         </span>
  //         Blog
  //       </Link>

  //       {/* Desktop Links */}
  //       <div className="hidden md:flex gap-6">
  //         <Link to="/" className={pathname === "/" ? "font-semibold" : ""}>
  //           Home
  //         </Link>
  //         <Link
  //           to="/about"
  //           className={pathname === "/about" ? "font-semibold" : ""}
  //         >
  //           About
  //         </Link>
  //         <Link
  //           to="/contact"
  //           className={pathname === "/projects" ? "font-semibold" : ""}
  //         >
  //           Contact
  //         </Link>
  //       </div>

  //       {/* RIGHT SIDE */}
  //       <div className="flex items-center gap-6">
  //         {/* Search - Desktop */}
  //         <form
  //           onSubmit={handleSubmit}
  //           className="hidden lg:flex items-center border rounded-md px-2"
  //         >
  //           <input
  //             type="text"
  //             placeholder="Search..."
  //             value={searchTerm}
  //             onChange={(e) => setSearchTerm(e.target.value)}
  //             className="bg-transparent border-none outline-none text-sm"
  //           />
  //           <button type="submit">
  //             <AiOutlineSearch />
  //           </button>
  //         </form>

  //         {/* Search Icon - Mobile */}
  //         <button className="lg:hidden p-2 rounded-full border">
  //           <AiOutlineSearch />
  //         </button>

  //         <div className="flex items-center gap-3">
  //           {/* STATIC Theme Toggle */}
  //           <button
  //             onClick={() =>
  //               setTheme((prev) => (prev === "light" ? "dark" : "light"))
  //             }
  //             className="p-2 rounded-full border"
  //           >
  //             {theme === "light" ? <FaSun /> : <FaMoon />}
  //           </button>

  //           {/* AUTH - Desktop */}
  //           {currentUser ? (
  //             <div className="hidden md:block relative">
  //               <img
  //                 src={currentUser.profilePhotoUrl }
  //                 alt="user"
  //                 onClick={() => setProfileOpen((prev) => !prev)}
  //                 className="w-9 h-9 rounded-full cursor-pointer object-cover"
  //               />

  //               {profileOpen && (
  //                 <div className="absolute right-0 mt-2 w-48 bg-white border rounded-md shadow-md z-2">
  //                   <Link
  //                     to="/dashboard?tab=profile"
  //                     onClick={() => setProfileOpen(false)}
  //                     className="block px-4 py-2 hover:bg-gray-100"
  //                   >
  //                     Profile
  //                   </Link>

  //                   <button
  //                     onClick={() => {
  //                       handleSignOut();
  //                       setProfileOpen(false);
  //                     }}
  //                     className="w-full text-left px-4 py-2 hover:bg-gray-100"
                      
  //                   >
  //                     Sign out
  //                   </button>
  //                 </div>
  //               )}
  //             </div>
  //           ) : (
  //             <Link to="/signin" className="hidden md:block">
  //               <button  className="px-4 py-2 border rounded-md bg-gradient-to-r from-purple-500 to-blue-500 text-white">
  //                 Sign In
  //               </button>
  //             </Link>
  //           )}

  //           {/* Hamburger */}
  //           <button
  //             className="md:hidden p-2 rounded-full border"
  //             onClick={() => setMenuOpen(!menuOpen)}
  //           >
  //             {menuOpen ? <AiOutlineClose /> : <AiOutlineMenu />}
  //           </button>
  //         </div>
  //       </div>
  //     </div>

  //     {/* MOBILE MENU */}
  //     {menuOpen && (
  //       <div className="md:hidden mt-4 border-t pt-4">
  //         <div className="flex flex-col gap-4">
  //           <Link to="/" onClick={() => setMenuOpen(false)}>
  //             Home
  //           </Link>
  //           <Link to="/about" onClick={() => setMenuOpen(false)}>
  //             About
  //           </Link>
  //           <Link to="/contact" onClick={() => setMenuOpen(false)}>
  //             Contact
  //           </Link>

  //           <div className="border-t pt-4 flex flex-col gap-3">
  //             {currentUser ? (
  //               <>
  //                 <Link
  //                   to="/dashboard?tab=profile"
  //                   onClick={() => setMenuOpen(false)}
  //                 >
  //                   Profile
  //                 </Link>
  //                 <button onClick={handleSignOut} className="text-left">
  //                   Sign out
  //                 </button>
  //               </>
  //             ) : (
  //               <Link to="/signin" onClick={() => setMenuOpen(false)}>
  //                 <button className="w-full py-2 bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded-md">
  //                   Sign In
  //                 </button>
  //               </Link>
  //             )}
  //           </div>
  //         </div>
  //       </div>
  //     )}
  //   </nav>
  // );


return (
  <nav
    className={`sticky top-0 z-50 backdrop-blur-lg border-b py-3 transition-colors ${
      mode === "light"
        ? "bg-white border-gray-200"
        : "bg-gray-900/80 border-gray-700"
    }`}
  >
    <div className="max-w-8xl mx-auto flex items-center justify-between">

      {/* Logo */}
      <Link to="/" className="text-lg sm:text-xl font-bold flex items-center">
        <span className="px-3 py-1 bg-gradient-to-r from-teal-500 to-blue-600 rounded-lg text-white mr-2 shadow-md">
          DevScroll
        </span>
        <span className={mode === "light" ? "text-gray-800" : "text-gray-200"}>Blog</span>
      </Link>

      {/* Desktop Links */}
      <div className={`hidden md:flex gap-8 font-medium ${
        mode === "light" ? "text-gray-800" : "text-gray-200"
      }`}>
        <Link
          to="/"
          className={`hover:text-teal-600 transition ${
            pathname === "/" ? "text-teal-600 font-semibold" : ""
          }`}
        >
          Home
        </Link>
        <Link
          to="/about"
          className={`hover:text-teal-600 transition ${
            pathname === "/about" ? "text-teal-600 font-semibold" : ""
          }`}
        >
          About
        </Link>
        <Link
          to="/contact"
          className={`hover:text-teal-600 transition ${
            pathname === "/contact" ? "text-teal-600 font-semibold" : ""
          }`}
        >
          Contact
        </Link>
      </div>

      {/* RIGHT SIDE */}
      <div className="flex items-center gap-4">

        {/* Search - Desktop */}
        <form
          onSubmit={handleSubmit}
          className={`hidden lg:flex items-center rounded-full px-3 py-1 focus-within:ring-2 focus-within:ring-teal-400 transition border ${
            mode === "light" ? "border-gray-300" : "border-gray-700"
          }`}
        >
          <input
            type="text"
            placeholder="Search..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className={`bg-transparent border-none outline-none text-sm px-2 w-40 ${
              mode === "light" ? "text-gray-800 placeholder-gray-400" : "text-gray-200 placeholder-gray-500"
            }`}
          />
          <button
            type="submit"
            className={mode === "light" ? "text-gray-600 hover:text-teal-600" : "text-gray-300 hover:text-teal-400"}
          >
            <AiOutlineSearch />
          </button>
        </form>

        {/* Search Icon - Mobile */}
        <button
          className={`lg:hidden p-2 rounded-full border transition ${
            mode === "light"
              ? "border-gray-300 text-gray-700 hover:bg-gray-100"
              : "border-gray-700 text-gray-300 hover:bg-gray-800"
          }`}
        >
          <AiOutlineSearch />
        </button>

        {/* Theme Toggle */}
        <button
          onClick={() => dispatch(toggleTheme())}
          className={`p-2 rounded-full border transition ${
            mode === "light"
              ? "border-gray-300 text-gray-700 hover:bg-gray-100"
              : "border-gray-700 text-gray-300 hover:bg-gray-800"
          }`}
        >
          {mode === "light" ? <FaSun /> : <FaMoon />}
        </button>

        {/* Auth */}
        {currentUser ? (
          <div className="hidden md:block relative">
            <Link
                  to="/dashboard?tab=profile"
                  onClick={() => setProfileOpen(false)}
                  className={`block px-4 py-2 transition ${
                    mode === "light" ? "hover:bg-gray-100 text-gray-800" : "hover:bg-gray-700 text-gray-200"
                  }`}
                >
            <img
              src={currentUser.profilePhotoUrl}
              alt="user"
              onClick={() => setProfileOpen((prev) => !prev)}
              className="w-9 h-9 rounded-full cursor-pointer object-cover border-2 border-teal-500"
            />

            
              {/* <div
                className={`absolute right-0 mt-3 w-48 rounded-xl shadow-lg overflow-hidden transition-colors border ${
                  mode === "light" ? "bg-white border-gray-200" : "bg-gray-800 border-gray-700"
                }`}
              > */}
                
                  
                </Link>
                {/* <button
                  onClick={() => {
                    handleSignOut();
                    setProfileOpen(false);
                  }}
                  className={`w-full text-left px-4 py-2 transition ${
                    mode === "light" ? "hover:bg-gray-100 text-gray-800" : "hover:bg-gray-700 text-gray-200"
                  }`}
                >
                  Sign out
                </button> */}
              
            
          </div>
        ) : (
          <Link to="/signin" className="hidden md:block">
            <button className="px-5 py-2 rounded-full bg-gradient-to-r from-teal-500 to-blue-600 text-white font-medium shadow-md hover:shadow-lg hover:scale-[1.05] transition-all duration-300">
              Sign In
            </button>
          </Link>
        )}

        {/* Hamburger */}
        <button
          className={`md:hidden p-2 rounded-full border transition ${
            mode === "light"
              ? "border-gray-300 text-gray-700 hover:bg-gray-100"
              : "border-gray-700 text-gray-300 hover:bg-gray-800"
          }`}
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <AiOutlineClose /> : <AiOutlineMenu />}
        </button>
      </div>
    </div>

    {/* Mobile Menu */}
    {menuOpen && (
      <div
        className={`md:hidden mt-4 pt-4 animate-fadeIn border-t transition-colors ${
          mode === "light" ? "border-gray-200 text-gray-800" : "border-gray-700 text-gray-200"
        }`}
      >
        <div className="flex flex-col gap-4 font-medium">
          <Link to="/" onClick={() => setMenuOpen(false)}>
            Home
          </Link>
          <Link to="/about" onClick={() => setMenuOpen(false)}>
            About
          </Link>
          <Link to="/contact" onClick={() => setMenuOpen(false)}>
            Contact
          </Link>
          <div className="border-t pt-4 flex flex-col gap-3 transition-colors"
               style={{
                 borderColor: mode === "light" ? "#E5E7EB" : "#374151",
               }}>
            {currentUser ? (
              <>
                <Link to="/dashboard?tab=profile" onClick={() => setMenuOpen(false)}>
                  Profile
                </Link>
              </>
            ) : (
              <Link to="/signin" onClick={() => setMenuOpen(false)}>
                <button className="w-full py-2 bg-gradient-to-r from-teal-500 to-blue-600 text-white rounded-full shadow-md">
                  Sign In
                </button>
              </Link>
            )}
          </div>
        </div>
      </div>
    )}
  </nav>
);


}
