import axios from "axios";
import { toast } from "react-toastify";
import { APIS } from "../../constants/constants";

const BlogInstance = axios.create({
  baseURL: APIS.BLOGS_API,
});

export const addBlog = async (blog) => {
  const token = JSON.parse(localStorage.getItem("token"))
  try {
    if (token) {
      const response = await BlogInstance.post(`/add`, blog, { headers : { 'Authorization': 'Bearer ' + token } });
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
  const token = JSON.parse(localStorage.getItem("token"))
  try {
    if (token) {
      const response = await BlogInstance.patch(`update/${blog?._id}`, blog, { headers : { 'Authorization': 'Bearer ' + token } });
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
  const token = JSON.parse(localStorage.getItem("token"))
  try {
    if (token) {
      const response = await BlogInstance.delete(`delete/${blog?._id}`, { headers : { 'Authorization': 'Bearer ' + token } });

      if (response.status === 200) {
        toast.success(`${blog.title} Blog Deleted Successfully`);
      }
    }
  } catch (error) {
    toast.error(error?.response?.data?.msg);
  }
};

export const getBlogDetails = async (blogId) => {
  const token = JSON.parse(localStorage.getItem("token"))
  try {
    if (token) {
      const response = await BlogInstance.get(`/${blogId}`, { headers : { 'Authorization': 'Bearer ' + token } });
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
  let token = JSON.parse(localStorage.getItem("token"))
  try {
    if (token) {
      const response = await BlogInstance.get(`/myblogs`, { headers : { 'Authorization': 'Bearer ' + token } });
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
