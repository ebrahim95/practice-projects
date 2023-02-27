import { likeBlog, removeBlog } from "../reducers/blogReducer";
import { changeNotification } from "../reducers/notificationReducer";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import blogService from "../services/blogs";

const BlogDetails = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const id = useParams().id;
  const navigate = useNavigate();
  const blog = useSelector((state) =>
    state.blogs.find((blog) => blog.id === id)
  );
  const [comment, setComment] = useState("");

  if (!blog) {
    return null;
  }

  if (!user) {
    return null;
  }

  const updateBlog = {
    title: blog.title,
    author: blog.author,
    url: blog.url,
    likes: blog.likes + 1,
    user: blog.user.id,
    id: blog.id,
  };

  const handleLikes = async () => {
    try {
      dispatch(likeBlog(blog.id, updateBlog));
    } catch (error) {
      dispatch(changeNotification(error.message));
    }
  };

  const handleDelete = async () => {
    try {
      dispatch(removeBlog(blog.id));
      navigate("/");
    } catch (error) {
      dispatch(changeNotification(error.message));
    }
  };

  const handleComment = async (event) => {
    event.preventDefault();
    await blogService.addComment(blog.id, comment);
    setComment("");
  };

  // tailwind styles
  const input = "block w-full rounded-md border-0 py-2 px-3.5 text-md leading-6 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 \
  placeholder:text-gray-400 focus:ring-2 focus:ring-inset mb-2"

  return (
    <div id="viewDetails">
      <h2 className="text-lg">{blog.title}</h2>
      Blog by <span>{blog.user.name}</span>
      <br />
      <span>{blog.likes} likes</span>
      <br />
      <a href={blog.url}>{blog.url}</a>
      <br />

      <button className="handleLikes border-2 border-black py-1 px-2 rounded-lg bg-purple-300 mb-2 hover:bg-blue-200 w-full mt-3" onClick={handleLikes}>
        Like
      </button>
      {blog.user.username === user.username ? (
        <button className="removeButton border-2 border-black py-1 px-2 rounded-lg bg-red-300 mb-3 hover:bg-blue-200 w-full" onClick={handleDelete}>
          Remove Blog
        </button>
      ) : (
        ""
      )}
      <h2>Comments</h2>
      <ul>
        {blog.comments.map((comment, i) => (
          <li key={i}>{comment}</li>
        ))}
      </ul>
      <form onSubmit={handleComment}>
        <input className={input} onChange={(event) => setComment(event.target.value)} />
        <button className="border-2 border-black py-1 px-2 rounded-lg bg-green-300 mb-3 hover:bg-blue-300 w-full">Submit Comment</button>
      </form>
    </div>
  );
};

export default BlogDetails;
