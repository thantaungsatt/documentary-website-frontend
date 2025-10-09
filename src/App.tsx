import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import Login from "./components/Login";
import Home from "./components/Home";
import Navbar from "./components/Navbar";
import CategoryPage from "./components/CreateCategory";
import { useEffect } from "react";
import CreatePost from "./components/CreatePost";
import PostPage from "./components/PostPage";
import PostByCategoryPage from "./components/PostByCategoryPage";
import PostDetails from "./components/PostDetails";
import { ToastContainer } from "react-toastify";
import About from "./components/About";
import ContactUs from "./components/ContactUs";

function RouteDebugger() {
  const location = useLocation();

  useEffect(() => {
    console.log("Route changed to:", location.pathname);
  }, [location]);

  return null;
}

export default function App() {
  return (
    <div>
      <BrowserRouter>
        <Navbar />
        <RouteDebugger />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/manage-category" element={<CategoryPage />} />
          <Route path="/create-post" element={<CreatePost />} />
          <Route path="/posts/edit/:id" element={<CreatePost />} />
          <Route path="/posts" element={<PostPage />} />
          <Route
            path="/categories-posts/:categoryName"
            element={<PostByCategoryPage />}
          />
          <Route path="/posts/:id" element={<PostDetails />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<ContactUs />} />
        </Routes>
      </BrowserRouter>
      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
}
