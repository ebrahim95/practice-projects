import PropTypes from "prop-types";
import { useState } from "react";
import { setUser } from "../reducers/userReducer";
import { useDispatch } from "react-redux";
import { changeNotification } from "../reducers/notificationReducer";

const LoginForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const handleUsername = ({ target }) => setUsername(target.value);
  const handlePassword = ({ target }) => setPassword(target.value);
  const dispatch = useDispatch();

  const handleLogin = (event) => {
    event.preventDefault();

    try {
      dispatch(setUser(username, password));
      setUsername("");
      setPassword("");
    } catch (exception) {
      changeNotification("Wrong Credentials");
    }
  };

  return (
    <div>
      <h2>Log into Application</h2>
      <form onSubmit={handleLogin}>
        <div>
          username
          <input
            id="username"
            type="text"
            value={username}
            name="Username"
            onChange={handleUsername}
          />
        </div>
        <div>
          password
          <input
            id="password"
            type="password"
            value={password}
            name="Password"
            onChange={handlePassword}
          />
        </div>
        <button type="submit">login</button>
      </form>
    </div>
  );
};

/* LoginForm.propTypes = {
  handleLogin: PropTypes.func.isRequired,
  handleUsername: PropTypes.func.isRequired,
  handlePassword: PropTypes.func.isRequired,
  username: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired,
}; */
export default LoginForm;
