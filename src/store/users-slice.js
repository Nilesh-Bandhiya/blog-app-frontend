import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { axiosInstance } from "../services/axiosServices/axiosInterceptors";
import { APIS } from "../constants/constants";

export const getUsers = createAsyncThunk("users/getUsers", async () => {
  try {
      const response = await axiosInstance.get(`${APIS.USERS_API}`);
      const users = await response?.data?.data;
      if (users.length > 0) {
        return users;
      } else {
        toast.error("No Blogs Found");
      }
  } catch (error) {
    toast.error(error?.response?.data?.msg);
  }
});

const initialState = {
  users: [],
  loading: false,
  error: "",
};

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
  extraReducers: {
    [getUsers.pending]: (state) => {
      state.loading = true;
    },
    [getUsers.fulfilled]: (state, action) => {
      state.loading = false;
      state.users = action.payload;
      state.error = "";
    },
    [getUsers.rejected]: (state, action) => {
      state.loading = false;
      state.users = [];
      state.error = action.error.message;
    },
  },
});

export default usersSlice.reducer;
