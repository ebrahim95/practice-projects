import { createSlice } from "@reduxjs/toolkit";
import usersService from "../services/users";

const userInfoSlice = createSlice({
  name: "userInfo",
  initialState: [],
  reducers: {
    setUserInfo(state, action) {
      state = action.payload;
      return state;
    },
  },
});

export const { setUserInfo } = userInfoSlice.actions;
export default userInfoSlice.reducer;

export const initialUserInfo = () => {
  return async (dispatch) => {
    const allUsers = await usersService.users();
    dispatch(setUserInfo(allUsers));
  };
};
