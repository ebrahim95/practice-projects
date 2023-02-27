import { setUser } from "../reducers/userReducer";
import { useDispatch } from "react-redux";
import { changeNotification } from "../reducers/notificationReducer";
import { useField } from "../hooks/index"
import { Link } from "react-router-dom";

const LoginForm = () => {
  const {clearValue: resetUsername, ...username} = useField('text')
  const {clearValue: resetPassword, ...password} = useField('password')
  const dispatch = useDispatch();

  const handleLogin = (event) => {
    event.preventDefault();

    try {
      dispatch(setUser(username.value, password.value));
      resetUsername();
      resetPassword();
    } catch (exception) {
      changeNotification("Wrong Credentials");
    }
  };

  // eslint-disable-next-line no-multi-str
  const input = "block w-full rounded-md border-0 py-2 px-3.5 text-md leading-6 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 \
  placeholder:text-gray-400 focus:ring-2 focus:ring-inset mb-2" 
  return (
    <div>
      <h1 className="text-xl mb-2">Log into Application</h1>
      <form onSubmit={handleLogin}>
        <div>
          <input
            id="username"
            {...username}
            className={input}
            placeholder="username"
          />
        </div>
        <div>
          <input
            id="password"
            {...password}
            className={input}
            placeholder="password"
          />
        </div>
        <button className="border-2 border-black py-1 px-2 rounded-lg bg-green-300 my-2 hover:bg-blue-200 w-full" type="submit">Login</button>
        <Link to="/users/create" ><button className="border-2 border-black py-1 px-2 rounded-lg bg-purple-300 hover:bg-blue-200 w-full">Create User</button></Link>
      </form>
    </div>
  );
};


export default LoginForm;
