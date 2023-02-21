import { changeNotification } from "../reducers/notificationReducer";
import { addBlog } from "../reducers/blogReducer";
import { useDispatch } from "react-redux";
import { useField } from "../hooks";
const BlogForm = ({ toggleRef }) => {
  const { clearValue: resetTitle, ...title } = useField("text");
  const { clearValue: resetAuthor, ...author } = useField("text");
  const { clearValue: resetUrl, ...url } = useField("text");
  const dispatch = useDispatch();

  const handleAddBlog = async (blogObject) => {
    try {
      dispatch(addBlog(blogObject));
      toggleRef.current.toggleVisibility();
    } catch (error) {
      dispatch(changeNotification("Wrong Object"));
    }
  };

  const blogToBe = (event) => {
    event.preventDefault();
    handleAddBlog({
      title: title.value,
      author: author.value,
      url: url.value,
    });
  };

  return (
    <div>
      <form onSubmit={blogToBe}>
        title:{"    "}
        <input {...title} />
        <br />
        author:{"    "}
        <input {...author} />
        <br />
        url:{"    "}
        <input {...url} />
        <br />
        <br />
        <button id="blogSubmit" type="submit">
          Submit Blog
        </button>
      </form>
    </div>
  );
};

export default BlogForm;
