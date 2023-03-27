import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogTitle from "@mui/material/DialogTitle";
import { useDispatch } from "react-redux";
import { getUsers } from "../../store/users-slice";
import { updateUser } from "../../services/api/usersApi";
import {
  DialogContent,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";

const RoleChangeDialog = ({ handleClose, open, data }) => {
  const dispatch = useDispatch();

  const [role, setRole] = useState("");

  useEffect(() => {
    if (data?.role !== undefined) {
      setRole(data?.role);
    }
  }, [data?.role]);

  const roleChangeHandler = async (e) => {
    e.preventDefault();
    let upadtedData = { ...data, role: role };
    await updateUser(upadtedData, "role");
    dispatch(getUsers());
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
        <DialogTitle id="alert-dialog-title">{`Change Role of ${data?.firstName}`}</DialogTitle>
        <DialogContent sx={{ margin: "0 auto" }}>
          <FormControl sx={{ m: 1, minWidth: 180 }}>
            <InputLabel id="role">Role</InputLabel>
            <Select
              value={role || ""}
              labelId="role"
              id="role"
              onChange={(e) => setRole(e.target.value)}
              label="Role"
            >
              <MenuItem value={"user"}>User</MenuItem>
              <MenuItem value={"admin"}>Admin</MenuItem>
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions sx={{ margin: "0 auto 10px auto" }}>
          <Button
            type="button"
            variant="outlined"
            color="error"
            onClick={handleClose}
            sx={{ marginRight: "5px" }}
          >
            Cancel
          </Button>
          <Button
            onClick={roleChangeHandler}
            variant="contained"
            color="success"
            autoFocus
          >
            Change
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default RoleChangeDialog;
