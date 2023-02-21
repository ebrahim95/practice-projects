import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { storeUser } from "../reducers/userReducer";

const Navbar = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const logOut = () => {
    window.localStorage.removeItem("loggedIn");
    dispatch(storeUser(null));
  };

  const style = {
    display: "flex",
    flexDirection: "row",
    gap: "10px",
    paddingBottom: "5px",
  };
  return (
    <div style={style}>
      <Link to="/">Blogs</Link>
      <Link to="/users">Users</Link>
      {`${user.name} is logged in `}
      <button onClick={logOut}>Logout</button>
    </div>
  );
};

export default Navbar;
