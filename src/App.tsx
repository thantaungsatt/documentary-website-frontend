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

// Debug component to track routing
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
          <Route path="/posts" element={<PostPage />} />
          <Route
            path="/categories-posts/:categoryName"
            element={<PostByCategoryPage />}
          />
          <Route path="/posts/:name" element={<PostDetails />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}
