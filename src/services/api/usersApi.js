import axios from "axios";
import { toast } from "react-toastify";
import { APIS } from "../../constants/constants";

let token = JSON.parse(localStorage.getItem("token"))

const UserInstance = axios.create({
  baseURL: APIS.USERS_API,
});

const AuthUserInstance = axios.create({
  baseURL: APIS.USERS_API,
  headers: {'Authorization': 'Bearer '+ token}
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
      console.log(loggedinUser);
      toast.success("Loggedin Successfully");
      return loggedinUser;
    }
  } catch (error) {
    toast.error(error?.response?.data?.msg);
  }
};

export const updateUser = async (user, key) => {
  try {
    const response = await axios.put(`${APIS.USERS_API}/${user.id}`, user);
    const updatedUser = await response?.data;

    if (updatedUser) {
      if (key === "role") {
        toast.success(`Now ${user.firstName} is ${updatedUser.role}`);
        return true;
      } else if (key === "status") {
        toast.success(
          `Now ${user.firstName} is ${
            updatedUser.active ? "Active" : "Inactive"
          }`
        );
        return true;
      } else {
        toast.success("Profile Updated Successfully");
        return true;
      }
    }
  } catch (error) {
    toast.error(error.message);
  }
  // try {
  //   const response = await axios.put(`${APIS.USERS_API}/${user.id}`, user);
  //   const updatedUser = await response?.data;

  //   if (updatedUser) {
  //     if (key === "role") {
  //       toast.success(`Now ${user.firstName} is ${updatedUser.role}`);
  //       return true;
  //     } else if (key === "status") {
  //       toast.success(
  //         `Now ${user.firstName} is ${
  //           updatedUser.active ? "Active" : "Inactive"
  //         }`
  //       );
  //       return true;
  //     } else {
  //       toast.success("Profile Updated Successfully");
  //       return true;
  //     }
  //   }
  // } catch (error) {
  //   toast.error(error.message);
  // }
};

export const deleteUser = async (user) => {
  try {
    const response = await axios.delete(`${APIS.USERS_API}/${user.id}`);

    if (response.status === 200) {
      toast.success(`${user.firstName} Deleted Successfully`);
    }
  } catch (error) {
    toast.error(error.message);
  }
};
