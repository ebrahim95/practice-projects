import { createSlice } from "@reduxjs/toolkit";
import loginService from "../services/login";
import blogService from "../services/blogs"
import { changeNotification } from "./notificationReducer";

const userSlice = createSlice({
  name: "user",
  initialState: null,
  reducers: {
    storeUser(state, action) {
      return action.payload;
    },
  },
});

export const { storeUser } = userSlice.actions;

export default userSlice.reducer;

export const setUser = (username, password) => {
  return async (dispatch) => {
    try {
const user = await loginService.login({ username, password });
    window.localStorage.setItem("loggedIn", JSON.stringify(user));
    dispatch(storeUser(user));
    blogService.setToken(user.token) 
    dispatch(changeNotification(`Successfully logged in ${user.name}`));
    } catch (error) {
      dispatch(changeNotification("Wrong Credentials"))
    }
    
  };
};
