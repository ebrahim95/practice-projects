import { useState, forwardRef, useImperativeHandle } from "react";
import PropTypes from "prop-types";
const Togglable = forwardRef((props, refs) => {
  const [visible, setVisible] = useState(false);

  const hideWhenVisible = { display: visible ? "none" : "" };
  const showWhenVisible = { display: visible ? "" : "none" };

  const toggleVisibility = () => setVisible(!visible);

  useImperativeHandle(refs, () => {
    return {
      toggleVisibility,
    };
  });

  return (
    <div>
      <div style={hideWhenVisible}>
        <button
          className="border-2 border-black py-1 px-2 rounded-lg bg-green-300 mb-3 hover:bg-blue-200"
          onClick={toggleVisibility}
        >
          {props.buttonLabel}
        </button>
      </div>
      <div style={showWhenVisible}>
        {props.children}
        <button
          className="border-2 border-black py-1 px-2 rounded-lg bg-red-300 mb-3 w-full hover:bg-blue-200"
          onClick={toggleVisibility}
        >
          cancel
        </button>
      </div>
    </div>
  );
});

Togglable.displayName = "Togglable";

Togglable.propTypes = {
  buttonLabel: PropTypes.string.isRequired,
};
export default Togglable;
