/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useRef } from "react";
import BlogRender from "./components/Blog";
import Notification from "./components/Notification";
import "./index.css";
import Togglable from "./components/Togglable";
import BlogForm from "./components/BlogForm";
import LoginForm from "./components/LoginForm";
import Users from "./components/Users";
import { useDispatch, useSelector } from "react-redux";
import { initialBlogs } from "./reducers/blogReducer";
import { storeUser } from "./reducers/userReducer";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { initialUserInfo } from "./reducers/userInfoReducer";
import DisplayUser from "./components/DisplayUser";
import BlogDetails from "./components/BlogDetails";
import Navbar from "./components/Navbar";
import blogService from "./services/blogs";
import UserForm from "./components/UserForm"; 

const App = () => {
  const dispatch = useDispatch();
  const notification = useSelector((state) => state.notification);
  const user = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(initialBlogs());
    dispatch(initialUserInfo());
  }, []);

  useEffect(() => {
    const loggedIn = JSON.parse(window.localStorage.getItem("loggedIn"));
    if (loggedIn) {
      dispatch(storeUser(loggedIn));
      blogService.setToken(loggedIn.token);
    }
  }, []);

  const blogFormRef = useRef();

  if (user === null) {
    return (
      <div className="w-[600px] p-2 flex flex-col place-items-center">
        <Router> 
          <Notification message={notification} />
          <Routes>
              <Route path="/users/create" element={<UserForm />} />
              <Route path="/" element={<LoginForm />} />
          </Routes>
        </Router>
      </div>
    );
  }

  return (
        <Router>
          <div className="md:w-[600px] md:w-[310px]  p-2 flex flex-col place-items-center">
            <Navbar />
            <Notification message={notification} />
            <Togglable buttonLabel="Create New" ref={blogFormRef}>
              <BlogForm  toggleRef={blogFormRef} />
            </Togglable>

            <Routes>
              <Route path="/users" element={<Users />} />
              <Route path="/users/:id" element={<DisplayUser />} />
              <Route path="/blogs/:id" element={<BlogDetails />} />
              <Route path="/users/create" element={<UserForm />} />
              <Route path="/" element={<BlogRender />} />
            </Routes>
          </div>
        </Router>
  );
};

export default App;
