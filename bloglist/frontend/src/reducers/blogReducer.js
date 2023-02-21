import { createSlice } from "@reduxjs/toolkit";
import blogService from "../services/blogs";
import { changeNotification } from "./notificationReducer";
import { initialUserInfo } from "./userInfoReducer";

const blogSlice = createSlice({
  name: "blogs",
  initialState: [],
  reducers: {
    getBlogs(state, action) {
      const blogs = action.payload;
      return blogs;
    },
    updateLikes(state, action) {
      const id = action.payload.id;
      const findBlog = state.find((blog) => blog.id === id);
      const updatedBlogLikes = { ...findBlog, likes: action.payload.likes };
      const updateBlogs = state.map((blog) =>
        blog.id === id ? updatedBlogLikes : blog
      );
      return updateBlogs;
    },
    deleteBlog(state, action) {
      const id = action.payload;
      const updateBlogs = state.filter((blog) => blog.id !== id);
      return updateBlogs;
    },
    createBlog(state, action) {
      state = [...state, action.payload];
      return state;
    },
  },
});

export const { getBlogs, updateLikes, deleteBlog, createBlog } =
  blogSlice.actions;

export default blogSlice.reducer;

export const initialBlogs = () => {
  return async (dispatch) => {
    const blogs = await blogService.getAll();
    dispatch(getBlogs(blogs));
  };
};

export const likeBlog = (id, blogObject) => {
  return async (dispatch) => {
    const updateBlog = await blogService.update(id, blogObject);
    dispatch(updateLikes(updateBlog));
    dispatch(changeNotification(`Successfully liked ${updateBlog.title}`));
  };
};

export const addBlog = (blogObject) => {
  return async (dispatch) => {
    const returnBlog = await blogService.create(blogObject);
    dispatch(createBlog(returnBlog));
    dispatch(
      changeNotification(
        `Successfully a new Blog ${blogObject.title} by ${blogObject.author}`
      )
    );
    dispatch(initialBlogs());
    dispatch(initialUserInfo());
  };
};

export const removeBlog = (id) => {
  return async (dispatch) => {
    await blogService.remove(id);
    dispatch(deleteBlog(id));
    dispatch(changeNotification("Successfully Deleted"));
  };
};
