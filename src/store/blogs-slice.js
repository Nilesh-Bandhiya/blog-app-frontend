import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { BlogInstance } from "../services/axiosServices/axiosInterceptors";

export const getBlogs = createAsyncThunk(
    'blog/getBlogs',
    async () => {
        try {
            const response = await BlogInstance.get();
            const blogs = await response?.data?.data;
            if (blogs?.length > 0) {
                return blogs;
            } else {
                toast.error("No Blogs Found");
            }
        } catch (error) {
            toast.error(error?.response?.data?.msg);
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