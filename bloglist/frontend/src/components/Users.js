import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
const Users = () => {
  const users = useSelector((state) => state.userInfo);

  return (
    <div className="border-2 px-2 border-black rounded-lg">
      <div className="grid grid-cols-2 gap-4 py-2">
        <h3 className="text-lg">Users</h3>
        <h3 className="justify-self-end text-lg">Blogs</h3>
      </div>
      {users.map((user) => (
          <div className="flex flex-row gap-4 mb-2" key={user.id}>
            <Link to={`/users/${user.id}`}>{user.name}</Link>
            <span>{user.blogs.length}</span>
          </div>
      ))}
    </div>  
    
    );
};

export default Users;
