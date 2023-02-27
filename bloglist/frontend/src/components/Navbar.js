import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { storeUser } from "../reducers/userReducer";

const Navbar = () => {
  const dispatch = useDispatch();
  const logOut = () => {
    window.localStorage.removeItem("loggedIn");
    dispatch(storeUser(null));
  };


  return (
    <nav className="flex flex-col gap-3 mb-2 items-center border-2 border-black rounded-lg bg-stone-700 p-2 md:flex-row">
      <Link to="/"><span className="text-stone-200 hover:text-stone-50">Blogs</span></Link>
      <Link to="/users"><span className="text-stone-200 hover:text-stone-50">Users</span></Link>
      <button onClick={logOut} className="text-stone-200 hover:text-red-300">Logout</button>
    </nav>
  );
};

export default Navbar;
