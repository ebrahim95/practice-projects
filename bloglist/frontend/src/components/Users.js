import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
const Users = () => {
  const users = useSelector((state) => state.userInfo);

  return (
    <div>
      <h2>Users</h2>
      <div>
        {users.map((user) => (
          <div key={user.id}>
            <Link to={`/users/${user.id}`}>{user.name}</Link>
            {"  "}
            {user.blogs.length}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Users;
