import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

const DisplayUser = () => {
  const id = useParams().id;
  const user = useSelector((state) =>
    state.userInfo.find((user) => user.id === id)
  );
  if (!user) {
    return null;
  }
  return (
    <div>
      <h3 className="text-xl">Added Blogs for {user.name}</h3>
      <ul className="list-decimal">
        {user.blogs.map((blog) => (
          <li key={blog.id}>{blog.title}</li>
        ))}
      </ul>
    </div>
  );
};

export default DisplayUser;
