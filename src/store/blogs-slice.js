import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";
import { APIS } from "../constants/constants";

export const getBlogs = createAsyncThunk(
    'blog/getBlogs',
    async () => {
        try {
            const response = await axios.get(APIS.BLOGS_API);
            return response.data;
        } catch (error) {
            toast.error(error.message + "Blogs");
        }
    })

const initialState = {
    blogs: [],
    loading: false,
    error: ""
}

const blogSlice = createSlice({
    name: "blog",
    initialState,
    reducers: {},
    extraReducers: {
        [getBlogs.pending]: (state) => {
            state.loading = true
        },
        [getBlogs.fulfilled]: (state, action) => {
            state.loading = false
            state.blogs = action.payload
            state.error = ""
        },
        [getBlogs.rejected]: (state, action) => {
            state.loading = false
            state.blogs = []
            state.error = action.error.message
        },
    },
})


export default blogSlice.reducer;