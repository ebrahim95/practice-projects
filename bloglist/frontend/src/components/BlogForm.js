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
 
  // eslint-disable-next-line no-multi-str
  const input = "block w-full rounded-md border-0 py-2 px-3.5 text-md leading-6 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 \
  placeholder:text-gray-400 focus:ring-2 focus:ring-inset mb-2"


  return (
    <div>
      <form onSubmit={blogToBe}>
        <input className={input} {...title} placeholder="Title"/>
        <input className={input} {...author} placeholder="Author"/>
        <input className={input} {...url} placeholder="Url"/>
        <button className="border-2 border-black py-1 px-2 rounded-lg bg-green-300 mb-2 hover:bg-blue-200 w-full" id="blogSubmit" type="submit">
          Submit
        </button>
      </form>
    </div>
  );
};

export default BlogForm;
