import { toast } from "react-toastify";
import { axiosInstance } from "../axiosServices/axiosInterceptors";
import { APIS } from "../../constants/constants";

export const addBlog = async (blog) => {
  try {
    const response = await axiosInstance.post(`${APIS.BLOGS_API}/add`, blog);
    const addedBlog = await response?.data;

    if (addedBlog) {
      toast.success("Blog Added Successfully");
      return true;
    }

  } catch (error) {
    toast.error(error?.response?.data?.msg);
  }
};

export const updateBlog = async (blog) => {
  try {
    const response = await axiosInstance.patch(`${APIS.BLOGS_API}/update/${blog.get("_id")}`, blog);
    const updatedBlog = await response?.data;

    if (updatedBlog) {
      toast.success("Blog Updated Successfully");
      return true;
    }
  } catch (error) {
    toast.error(error?.response?.data?.msg);
  }
};

export const deleteBlog = async (blog) => {
  try {
    const response = await axiosInstance.delete(`${APIS.BLOGS_API}/delete/${blog?._id}`);

    if (response.status === 200) {
      toast.success(`${blog.title} Blog Deleted Successfully`);
    }
  } catch (error) {
    toast.error(error?.response?.data?.msg);
  }
};

export const getBlogDetails = async (blogId) => {
  try {
    const response = await axiosInstance.get(`${APIS.BLOGS_API}/${blogId}`);
    const blog = await response?.data;
    if (blog) {
      return blog?.data;
    }
  } catch (error) {
    toast.error(error?.response?.data?.msg);
  }
}

export const getBlogImage = async (ImageName) => {
  try {
    const response = await axiosInstance.get(`${APIS.BLOGS_API}/getimage/${ImageName}`);
    const blogImage = await response?.data;
    if (blogImage) {
      return blogImage;
    }
  } catch (error) {
    toast.error(error?.response?.data?.msg);
  }
}

export const getMyBlogs = async () => {
  try {
    const response = await axiosInstance.get(`${APIS.BLOGS_API}/myblogs`);
    const myBlogs = await response?.data?.data;
    if (myBlogs.length > 0) {
      return myBlogs;
    } else {
      toast.error("No Blogs Found");
    }
  } catch (error) {
    toast.error(error?.response?.data?.msg);
  }
};
