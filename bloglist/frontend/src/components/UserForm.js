import { changeNotification } from "../reducers/notificationReducer";
import { Link } from "react-router-dom";
import { useField } from "../hooks/index";
import userService from "../services/users";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

const UserForm = () => {
  const { clearValue: resetName, ...name } = useField("text");
  const { clearValue: resetUsername, ...username } = useField("text");
  const { clearValue: resetPassword, ...password } = useField("password");
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const handleNewUser = (event) => {
    event.preventDefault();
    try {
      userService.createUser({
        name: name.value,
        username: username.value,
        password: password.value,
      });
      resetUsername();
      resetPassword();
      resetName();
      navigate("/");
      dispatch(changeNotification("Successfully Created"));
    } catch (exception) {
      dispatch(changeNotification("Wrong Format"));
    }
  };

  // eslint-disable-next-line no-multi-str
  const input =
    "block w-full rounded-md border-0 py-2 px-3.5 text-md leading-6 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 \
  placeholder:text-gray-400 focus:ring-2 focus:ring-inset mb-2";
  return (
    <div>
      <h1 className="text-xl mb-2">Log into Application</h1>
      <form onSubmit={handleNewUser}>
        <div>
          <input id="name" {...name} className={input} placeholder="name" />
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
        <button
          className="border-2 border-black py-1 px-2 my-2 rounded-lg bg-green-300 hover:bg-blue-200 w-full"
          type="submit"
        >
          Submit
        </button>
        <Link to="/">
          <button className="border-2 border-black py-1 px-2 rounded-lg bg-red-300 hover:bg-blue-200 w-full">
            Cancel
          </button>
        </Link>
      </form>
    </div>
  );
};

export default UserForm;
