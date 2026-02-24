import { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useSelector } from "react-redux";
import Home from "./Pages/home";
import Dashboard from "./Pages/dashboard";
import SignIn from "./Pages/signin";
import SignUp from "./Pages/signup";
import Header from "./Components/Header";
import FooterCom from "./Components/Footer";
import PrivateRoute from "./Components/PrivateRoute";
import OnlyAdminPrivateRoute from "./Components/onlyAdminPrivateRoute";
import ScrollToTop from './Components/ScrollToTop';
import CreatePost from "./Pages/createPost";
import UpdatePost from "./Pages/UpdatePost";
import PostPage from "./Pages/PostPage";
import Search from "./Pages/Search";
import About from "./Pages/About";
import Contact from "./Pages/Contact";


function App() {
  const { mode } = useSelector((state) => state.theme);

  return (
    <div className={mode === 'dark' ? 'dark' : ''}>
      <div className={`min-h-screen flex flex-col ${mode === 'dark' ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'}`}>
        <ScrollToTop />
        <Header />



      <Routes>
        <Route path="/" element={<Home />} />

        <Route element={<PrivateRoute />}>
          <Route path="/dashboard" element={<Dashboard />} />
        </Route>

        <Route element={<OnlyAdminPrivateRoute />}>
          <Route path="/create-post" element={<CreatePost />} />
          <Route path="/update-post/:postId" element={<UpdatePost />} />
        </Route>

        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/search" element={<Search />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />

        <Route path='/post/:postSlug' element={<PostPage />} />
      </Routes>
      <FooterCom />
    </div>
    </div>
  );
}

export default App;
