import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Blog = ({ blog }) => {

  const blogStyle = "py-2 px-2 border-2 border-black mb-2 rounded-lg grid grid-cols-1 justify-items-center"
  return (
    <div className={`defaultDetails ${blogStyle}`}>
      <Link to={`/blogs/${blog.id}`}><h3 className="text-lg">{blog.title}</h3></Link> 
      <span>By {blog.author}</span>
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
