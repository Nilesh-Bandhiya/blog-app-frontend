import React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogTitle from "@mui/material/DialogTitle";
import { useDispatch } from "react-redux";
import { getUsers } from "../../store/users-slice";
import { deleteUser } from "../../services/api/usersApi";
import { deleteBlog } from "../../services/api/blogsApi";
import { getBlogs } from "../../store/blogs-slice";

const ConfirmationDialog = ({ open, handleClose, data }) => {
  const dispatch = useDispatch();

  let firstName = data?.firstName;
  let key = data?.key;
  let title = data?.title;

  const confirmHandler = async () => {
    if (key === "deleteUser") {
      //in that case our data included with key and we don't need key anymore so first we need to delete key in the data
      delete data["key"];
      await deleteUser(data);
      dispatch(getUsers());
    } else if (key === "deleteBlog") {
      //in that case our data included with key and we don't need key anymore so first we need to delete key in the data
      delete data["key"];
      await deleteBlog(data);
      dispatch(getBlogs());
    }
    handleClose();
  };

  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{`Are you sure to delete ${
          firstName ? firstName : title
        }`}</DialogTitle>
        <DialogActions>
          <Button
            type="button"
            variant="outlined"
            onClick={handleClose}
            sx={{ marginRight: "10px" }}
          >
            Cancel
          </Button>
          <Button
            onClick={confirmHandler}
            variant="contained"
            color="error"
            autoFocus
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default ConfirmationDialog;
