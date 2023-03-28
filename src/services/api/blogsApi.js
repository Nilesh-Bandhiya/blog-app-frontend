import axios from "axios";
import { toast } from "react-toastify";
import { APIS } from "../../constants/constants";

let token = JSON.parse(localStorage.getItem("token"))

const AuthBlogInstance = axios.create({
  baseURL: APIS.BLOGS_API,
  headers: { 'Authorization': 'Bearer ' + token }
});

export const addBlog = async (blog) => {
  try {
    if (token) {
      const response = await AuthBlogInstance.post(`/add`, blog);
      const addedBlog = await response?.data;

      if (addedBlog) {
        toast.success("Blog Added Successfully");
        return true;
      }
    }
  } catch (error) {
    toast.error(error?.response?.data?.msg);
  }
};

export const updateBlog = async (blog) => {
  try {
    if (token) {
      const response = await AuthBlogInstance.patch(`update/${blog?._id}`, blog);
      const updatedBlog = await response?.data;

      if (updatedBlog) {
        toast.success("Blog Updated Successfully");
        return true;
      }
    }
  } catch (error) {
    toast.error(error?.response?.data?.msg);
  }
};

export const deleteBlog = async (blog) => {
  try {
    if (token) {
      const response = await AuthBlogInstance.delete(`delete/${blog?._id}`);

      if (response.status === 200) {
        toast.success(`${blog.title} Blog Deleted Successfully`);
      }
    }
  } catch (error) {
    toast.error(error?.response?.data?.msg);
  }
};

export const getBlogDetails = async (blogId) => {
  try {
    if (token) {
      const response = await AuthBlogInstance.get(`/${blogId}`);
      const blog = await response?.data;
      if (blog) {
        return blog?.data;
      }
    }
  } catch (error) {
    toast.error(error?.response?.data?.msg);
  }
}

export const getMyBlogs = async () => {
  try {
    if (token) {
      const response = await AuthBlogInstance.get(`/myblogs`);
      const myBlogs = await response?.data?.data;
      if (myBlogs.length > 0) {
        return myBlogs;
      } else {
        toast.error("No Blogs Found");
      }
    }
  } catch (error) {
    toast.error(error?.response?.data?.msg);
  }
};
