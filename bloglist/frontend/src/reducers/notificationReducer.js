import { createSlice } from "@reduxjs/toolkit";

const notificationSlice = createSlice({
  name: "notifications",
  initialState: null,
  reducers: {
    setNotification(state, action) {
      const message = action.payload;
      return (state = message);
    },
  },
});

export const { setNotification } = notificationSlice.actions;
export default notificationSlice.reducer;

let timerId = null;

export const changeNotification = (message, time = 5000) => {
  return async (dispatch) => {
    dispatch(setNotification(message));
    if (timerId) {
      clearTimeout(timerId);
    }

    timerId = setTimeout(() => {
      dispatch(setNotification(null));
    }, time);
  };
};
