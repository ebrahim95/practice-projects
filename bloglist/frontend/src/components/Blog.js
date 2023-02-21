import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Blog = ({ blog }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 2,
    marginBottom: 5,
  };
  return (
    <div style={blogStyle} className="defaultDetails">
      <Link to={`/blogs/${blog.id}`}>{blog.title}</Link> {blog.author} {"   "}
    </div>
  );
};

const BlogRender = () => {
  const blogs = useSelector((state) => state.blogs);
  return (
    <div>
      {blogs
        .map((blog) => <Blog key={blog.id} blog={blog} />)
        .sort((a, b) => {
          return b.props.blog.likes - a.props.blog.likes;
        })}
    </div>
  );
};

export default BlogRender;
