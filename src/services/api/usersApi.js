import axios from "axios";
import { toast } from "react-toastify";
import { APIS } from "../../constants/constants";

let token = JSON.parse(localStorage.getItem("token"))

const UserInstance = axios.create({
  baseURL: APIS.USERS_API,
});

const AuthUserInstance = axios.create({
  baseURL: APIS.USERS_API,
  headers: { 'Authorization': 'Bearer ' + token }
});

export const registerUser = async (user) => {
  try {
    const response = await UserInstance.post(`/register`, user);
    const registeredUser = await response?.data;
    if (registeredUser) {
      toast.success(registeredUser?.msg);
      return true;
    }
  } catch (error) {
    toast.error(error?.response?.data?.msg);
  }
};

export const loginUser = async (user) => {
  try {
    const response = await UserInstance.post(`/login`, user);
    const loggedinUser = await response?.data;
    if (loggedinUser) {
      toast.success("Loggedin Successfully");
      return loggedinUser;
    }
  } catch (error) {
    toast.error(error?.response?.data?.msg);
  }
};


export const changeRole = async (user) => {
  try {
    if (token) {
      const response = await AuthUserInstance.patch(`/change`, user);
      const updatedUser = await response?.data;

      if (updatedUser) {
        toast.success(`Now ${updatedUser?.data?.firstName} is ${updatedUser?.data?.role}`);
        return true;
      }
    }
  } catch (error) {
    toast.error(error?.response?.data?.msg);
  }
};

export const changeStatus = async (user) => {
  try {
    if (token) {
      const response = await AuthUserInstance.patch(`/change`, user);
      const updatedUser = await response?.data;

      if (updatedUser) {
        toast.success(`Now ${updatedUser?.data?.firstName} is ${updatedUser?.data?.active ? "Active" : "Inactive"}`);
        return true;
      }
    }
  } catch (error) {
    toast.error(error?.response?.data?.msg);
  }
};


export const updateUserProfile = async (user) => {
  try {
    if (token) {
      const response = await AuthUserInstance.patch(`/update`, user);
      const updatedUser = await response?.data;

      if (updatedUser) {
        toast.success("Profile Updated Successfully");
        return updatedUser?.data;
      }
    }
  } catch (error) {
    toast.error(error?.response?.data?.msg);
  }
};


export const deleteUser = async (user) => {
  try {
    if (token) {
      const response = await AuthUserInstance.delete(`/delete/${user?._id}`);

      if (response.status === 200) {
        toast.success(`${user?.firstName} Deleted Successfully`);
      }
    }
  } catch (error) {
    toast.error(error?.response?.data?.msg);
  }
};
