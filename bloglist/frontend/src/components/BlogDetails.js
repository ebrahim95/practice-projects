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

  return (
    <div id="viewDetails">
      <h2>{blog.title}</h2>
      {blog.url}
      <br />
      <span>{blog.likes} likes</span>
      <br />
      Added by <span>{blog.user.name}</span>
      <br />
      <br />
      <button className="handleLikes" onClick={handleLikes}>
        Like
      </button>
      <br />
      {blog.user.username === user.username ? (
        <button className="removeButton" onClick={handleDelete}>
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
        <input onChange={(event) => setComment(event.target.value)} />
        <button>Submit</button>
      </form>
    </div>
  );
};

export default BlogDetails;
