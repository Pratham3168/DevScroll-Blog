// import { Link, useLocation } from "react-router-dom";
// import {
//   HiChartPie,
//   HiUser,
//   HiDocumentText,
//   HiOutlineUserGroup,
//   HiAnnotation,
//   HiArrowSmRight,
// } from "react-icons/hi";

// export default function DashboardSidebar({ currentUser, handleSignout }) {

//     const location = useLocation();
//   const urlParams = new URLSearchParams(location.search);
//   const tab = urlParams.get("tab");

//   return (
//     <div className="w-full md:w-56 bg-gray-100 dark:bg-gray-800 md:min-h-screen p-4">
//       <nav className="flex flex-col gap-1">

//         {currentUser?.isAdmin && (
//           <Link to="/dashboard?tab=dash">
//             <div
//               className={`flex items-center gap-2 p-2 rounded-lg cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-700 ${
//                 tab === "dash" || !tab
//                   ? "bg-gray-300 dark:bg-gray-700 font-semibold"
//                   : ""
//               }`}
//             >
//               <HiChartPie />
//               <span>Dashboard</span>
//             </div>
//           </Link>
//         )}

//         <Link to="/dashboard?tab=profile">
//   <div
//     className={`flex items-center gap-2 p-2 rounded-lg cursor-pointer hover:bg-gray-200 hover:text-black ${
//       tab === "profile" ? "bg-gray-300 font-semibold text-black" : "text-white"
//     }`}
//   >
//     <HiUser />
//     <span>Profile</span>
//   </div>
// </Link>


//         <div
//           onClick={handleSignout}
//           className="flex items-center gap-2 p-2 rounded-lg cursor-pointer hover:bg-red-200 hover:text-white dark:hover:bg-red-700 text-red-600 dark:text-red-400 mt-4"
//         >
//           <HiArrowSmRight />
//           <span>Sign Out</span>
//         </div>

//       </nav>
//     </div>
//   );
// }





import {
  HiUser,
  HiArrowSmRight,
  HiDocumentText,
  HiOutlineUserGroup,
  HiAnnotation,
  HiChartPie,
} from 'react-icons/hi';
import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { signOut } from '../redux/user/userSlice';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { API_BASE } from '../utils';

export default function DashSidebar() {
  const location = useLocation();
    const { mode } = useSelector((state) => state.theme);

  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.user);
  const [tab, setTab] = useState('');
  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const tabFromUrl = urlParams.get('tab');
    if (tabFromUrl) {
      setTab(tabFromUrl);
    }
  }, [location.search]);
  const handleSignout = async () => {
    try {
      const res = await fetch(
        `${API_BASE}/api/user/signout`,
        {
          method: 'POST',
          credentials: 'include',
        }
      );
      const data = await res.json();
      if (!res.ok) {
        console.log(data.message);
      } else {
        dispatch(signOut());
      }
    } catch (error) {
      console.log(error.message);
    }
  };
  // return (
  //   <Sidebar className='w-full md:w-56'>
  //     <SidebarItems>
  //       <SidebarItemGroup className='flex flex-col gap-1'>
  //         {currentUser && currentUser.isAdmin && (
  //           <Link to='/dashboard?tab=dash'>
  //             <SidebarItem
  //               active={tab === 'dash' || !tab}
  //               icon={HiChartPie}
  //               as='div'
  //             >
  //               Dashboard
  //             </SidebarItem>
  //           </Link>
  //         )}
  //         <Link to='/dashboard?tab=profile'>
  //           <SidebarItem
  //             active={tab === 'profile'}
  //             icon={HiUser}
  //             label={currentUser.isAdmin ? 'Admin' : 'User'}
  //             labelColor='dark'
  //             as='div'
  //           >
  //             Profile
  //           </SidebarItem>
  //         </Link>
  //         {currentUser.isAdmin && (
  //           <Link to='/dashboard?tab=posts'>
  //             <SidebarItem
  //               active={tab === 'posts'}
  //               icon={HiDocumentText}
  //               as='div'
  //             >
  //               Posts
  //             </SidebarItem>
  //           </Link>
  //         )}
  //         {currentUser.isAdmin && (
  //           <Link to='/dashboard?tab=users'>
  //             <SidebarItem
  //               active={tab === 'users'}
  //               icon={HiOutlineUserGroup}
  //               as='div'
  //             >
  //               Users
  //             </SidebarItem>
  //           </Link>
  //         )}
  //         {currentUser.isAdmin && (
  //           <Link to='/dashboard?tab=comments'>
  //             <SidebarItem
  //               active={tab === 'comments'}
  //               icon={HiAnnotation}
  //               as='div'
  //             >
  //               Comments
  //             </SidebarItem>
  //           </Link>
  //         )}
          
  //         <SidebarItem
  //           icon={HiArrowSmRight}
  //           className='cursor-pointer'
  //           onClick={handleSignout}
  //         >
  //           Sign Out
  //         </SidebarItem>
  //       </SidebarItemGroup>
  //     </SidebarItems>
  //   </Sidebar>
  // );



return (
  <div
    className={`w-full md:w-56 min-h-screen p-4 border-r transition-colors ${
      mode === 'dark' 
        ? 'bg-gray-900 border-gray-800' 
        : 'bg-white border-gray-200'
    }`}
  >
    <nav className="flex flex-col gap-2">
      {currentUser && currentUser.isAdmin && (
        <Link to="/dashboard?tab=dash">
          <div
            className={`flex items-center gap-3 px-4 py-2 rounded-lg transition-all cursor-pointer ${
              tab === 'dash' || !tab
                ? mode === 'dark'
                  ? 'bg-teal-600 text-white'
                  : 'bg-teal-100 text-teal-700 font-semibold'
                : mode === 'dark'
                  ? 'text-gray-300 hover:bg-gray-800'
                  : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            <HiChartPie className="text-lg" />
            <span className="font-medium">Dashboard</span>
          </div>
        </Link>
      )}

      <Link to="/dashboard?tab=profile">
        <div
          className={`flex items-center gap-3 px-4 py-2 rounded-lg transition-all cursor-pointer ${
            tab === 'profile'
              ? mode === 'dark'
                ? 'bg-teal-600 text-white'
                : 'bg-teal-100 text-teal-700 font-semibold'
              : mode === 'dark'
                ? 'text-gray-300 hover:bg-gray-800'
                : 'text-gray-600 hover:bg-gray-100'
          }`}
        >
          <HiUser className="text-lg" />
          <span className="font-medium">Profile</span>
          {currentUser.isAdmin && (
            <span
              className={`ml-auto text-xs px-2 py-1 rounded-full ${
                mode === 'dark'
                  ? 'bg-indigo-600 text-white'
                  : 'bg-indigo-100 text-indigo-700'
              }`}
            >
              Admin
            </span>
          )}
        </div>
      </Link>

      {currentUser.isAdmin && (
        <Link to="/dashboard?tab=posts">
          <div
            className={`flex items-center gap-3 px-4 py-2 rounded-lg transition-all cursor-pointer ${
              tab === 'posts'
                ? mode === 'dark'
                  ? 'bg-teal-600 text-white'
                  : 'bg-teal-100 text-teal-700 font-semibold'
                : mode === 'dark'
                  ? 'text-gray-300 hover:bg-gray-800'
                  : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            <HiDocumentText className="text-lg" />
            <span className="font-medium">Posts</span>
          </div>
        </Link>
      )}

      {currentUser.isAdmin && (
        <Link to="/dashboard?tab=users">
          <div
            className={`flex items-center gap-3 px-4 py-2 rounded-lg transition-all cursor-pointer ${
              tab === 'users'
                ? mode === 'dark'
                  ? 'bg-teal-600 text-white'
                  : 'bg-teal-100 text-teal-700 font-semibold'
                : mode === 'dark'
                  ? 'text-gray-300 hover:bg-gray-800'
                  : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            <HiOutlineUserGroup className="text-lg" />
            <span className="font-medium">Users</span>
          </div>
        </Link>
      )}

      {currentUser.isAdmin && (
        <Link to="/dashboard?tab=comments">
          <div
            className={`flex items-center gap-3 px-4 py-2 rounded-lg transition-all cursor-pointer ${
              tab === 'comments'
                ? mode === 'dark'
                  ? 'bg-teal-600 text-white'
                  : 'bg-teal-100 text-teal-700 font-semibold'
                : mode === 'dark'
                  ? 'text-gray-300 hover:bg-gray-800'
                  : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            <HiAnnotation className="text-lg" />
            <span className="font-medium">Comments</span>
          </div>
        </Link>
      )}

      <div
        onClick={handleSignout}
        className={`flex items-center gap-3 px-4 py-2 rounded-lg transition-all cursor-pointer mt-4 border-t ${
          mode === 'dark'
            ? 'border-gray-800 text-red-400 hover:bg-red-600/10'
            : 'border-gray-200 text-red-600 hover:bg-red-50'
        }`}
      >
        <HiArrowSmRight className="text-lg" />
        <span className="font-medium">Sign Out</span>
      </div>
    </nav>
  </div>
);



}