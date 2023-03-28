import React, { useState, useEffect, useMemo } from "react";
import { AgGridReact } from "ag-grid-react";
import { Button, TextField } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { getUsers } from "../../store/users-slice";
import ConfirmationDialog from "../dialog/ConfirmationDialog";
import RoleChangeDialog from "../dialog/RoleChangeDialog";
import StatusChangeDialog from "../dialog/StatusChangeDialog";

const idHandler = (e) => {
  return <>{e?.node?.rowIndex + 1}</>;
};

const actionHandler = ({ data, handleDeleteOpen, handleRoleOpen }) => {
  const changeRoleHandler = () => {
    handleRoleOpen(data);
  };

  const deleteUserHandler = () => {
    let newData = { ...data, key: "deleteUser" };
    handleDeleteOpen(newData);
  };

  return (
    <>
      <Button
        variant="contained"
        color="warning"
        size="small"
        sx={{ marginRight: "10px" }}
        onClick={changeRoleHandler}
      >
        Change Role
      </Button>
      <Button
        variant="contained"
        color="error"
        size="small"
        onClick={deleteUserHandler}
      >
        Delete
      </Button>
    </>
  );
};

const statusHandler = ({ data, handleStatusOpen }) => {
  const changeStatusHandler = () => {
    handleStatusOpen(data);
  };

  return (
    <>
      <Button
        variant="contained"
        color={`${data?.active ? "success" : "error"}`}
        size="small"
        onClick={changeStatusHandler}
      >
        {data?.active ? "Active" : "In active"}
      </Button>
    </>
  );
};

const Users = () => {
  const dispatch = useDispatch();
  const { users } = useSelector((state) => state?.users);

  const filterKeys = ["firstName", "lastName", "email", "phoneNumber", "role"];

  const [search, setSearch] = useState("");
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [deleteData, setDeleteData] = useState({});
  const [roleOpen, setRoleOpen] = useState(false);
  const [roleData, setRoleData] = useState({});
  const [statusOpen, setStatusOpen] = useState(false);
  const [statusData, setStatusData] = useState({});

  const handleDeleteOpen = (data) => {
    setDeleteData(data);
    setDeleteOpen(true);
  };

  const handleDeleteClose = () => {
    setDeleteOpen(false);
  };

  const handleRoleOpen = (data) => {
    setRoleData(data);
    setRoleOpen(true);
  };

  const handleRoleClose = () => {
    setRoleOpen(false);
  };

  const handleStatusOpen = (data) => {
    setStatusData(data);
    setStatusOpen(true);
  };

  const handleStatusClose = () => {
    setStatusOpen(false);
  };

  useEffect(() => {
    dispatch(getUsers());
  }, [dispatch]);

  const [columnDefs] = useState([
    {
      field: "Id",
      minWidth: 50,
      width: 60,
      maxWidth: 70,
      cellRenderer: idHandler,
    },
    { field: "firstName", minWidth: 100, width: 100, maxWidth: 150 },
    { field: "lastName", minWidth: 100, width: 100, maxWidth: 150 },
    { field: "email", minWidth: 170, width: 180, maxWidth: 230 },
    { field: "phoneNumber", minWidth: 120, width: 130, maxWidth: 150 },
    { field: "role", minWidth: 50, width: 60, maxWidth: 100 },
    {
      field: "status",
      sortable: false,
      filter: false,
      minWidth: 70,
      width: 80,
      maxWidth: 120,
      cellRenderer: statusHandler,
      cellRendererParams: {
        handleStatusOpen,
      },
    },
    {
      field: "Actions",
      sortable: false,
      filter: false,
      minWidth: 200,
      maxWidth: 350,
      cellRenderer: actionHandler,
      cellRendererParams: {
        handleDeleteOpen,
        handleRoleOpen,
      },
    },
  ]);

  const defaultColDef = useMemo(
    () => ({
      sortable: true,
      flex: 1,
      filter: true,
    }),
    []
  );

  const filterHandler = (data) => {
    return data?.filter((user) =>
      filterKeys.some((key) =>
        user[key].toString().toLowerCase().includes(search.toLowerCase())
      )
    );
  };

  return (
    <div style={{ width: "100%", height: "100%" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "flex-start",
          alignItems: "center",
          height: "4vw",
          width: "83vw",
          margin: "0 auto",
        }}
      >
        <TextField
          id="table-search"
          label="Search here for filter table rows"
          size="small"
          variant="outlined"
          onChange={(e) => setSearch(e.target.value)}
          sx={{ width: "35vw" }}
        />
      </div>
      <div
        className="ag-theme-alpine"
        style={{
          margin: " 0 auto",
          boxSizing: "border-box",
          height: "66vh",
          width: "83vw",
        }}
      >
        <AgGridReact
          rowData={filterHandler(users)}
          columnDefs={columnDefs}
          defaultColDef={defaultColDef}
          animateRows={true}
          pagination={true}
          paginationPageSize={8}
        />
      </div>
      <RoleChangeDialog
        open={roleOpen}
        handleClose={handleRoleClose}
        data={roleData}
      />
      <StatusChangeDialog
        open={statusOpen}
        handleClose={handleStatusClose}
        data={statusData}
      />
      <ConfirmationDialog
        open={deleteOpen}
        handleClose={handleDeleteClose}
        data={deleteData}
      />
    </div>
  );
};

export default Users;
