import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";
import { APIS } from "../constants/constants";
let token = JSON.parse(localStorage.getItem("token"));

export const getUsers = createAsyncThunk("users/getUsers", async () => {
  try {
    if (token) {
      const response = await axios.get(APIS.USERS_API, {
        headers: { Authorization: "Bearer " + token },
      });
      return response?.data?.data;
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
