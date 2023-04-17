import React, { useState, useEffect, useMemo } from "react";
import { AgGridReact } from "ag-grid-react";
import { Button, TextField } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { getUsers } from "../../store/users-slice";
import ConfirmationDialog from "../dialog/ConfirmationDialog";
import RoleChangeDialog from "../dialog/RoleChangeDialog";
import StatusChangeDialog from "../dialog/StatusChangeDialog";
import styled from "styled-components";
import { paginationPageSize } from "../../constants/constants";

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
  const [deleteData, setDeleteData] = useState(null);
  const [roleOpen, setRoleOpen] = useState(false);
  const [roleData, setRoleData] = useState(null);
  const [statusOpen, setStatusOpen] = useState(false);
  const [statusData, setStatusData] = useState(null);

  const handleDeleteOpen = (data) => {
    setDeleteData(data);
    setDeleteOpen(true);
  };

  const handleDeleteClose = () => {
    setDeleteOpen(false);
    setDeleteData(null);
  };

  const handleRoleOpen = (data) => {
    setRoleData(data);
    setRoleOpen(true);
  };

  const handleRoleClose = () => {
    setRoleOpen(false);
    setRoleData(null);
  };

  const handleStatusOpen = (data) => {
    setStatusData(data);
    setStatusOpen(true);
  };

  const handleStatusClose = () => {
    setStatusOpen(false);
    setStatusData(null);
  };

  useEffect(() => {
    dispatch(getUsers());
  }, [dispatch]);

  const [columnDefs] = useState([
    {
      field: "Id",
      floatingFilter: false,
      maxWidth: 70,
      cellRenderer: idHandler,
    },
    { field: "firstName", maxWidth: 160 },
    { field: "lastName",maxWidth: 160 },
    { field: "email",maxWidth: 250 },
    { field: "phoneNumber", maxWidth: 150 },
    { field: "role", maxWidth: 120 },
    {
      field: "status",
      sortable: false,
      filter: false,
      maxWidth: 140,
      cellRenderer: statusHandler,
      cellRendererParams: {
        handleStatusOpen,
      },
    },
    {
      field: "Actions",
      sortable: false,
      filter: false,
      minWidth: 250,
      maxWidth: 250,
      cellRenderer: actionHandler,
      cellRendererParams: {
        handleDeleteOpen,
        handleRoleOpen,
      },
    },
  ]);

  const defaultColDef = useMemo(
    () => ({
      floatingFilter: true,
      sortable: true,
      filter: true,
    }),
    []
  );

  const filterHandler = (data) => {
    if (data) {
      return data?.filter((user) =>
        filterKeys.some((key) =>
          user[key].toString().toLowerCase().includes(search.toLowerCase())
        )
      );
    }
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
      <Wrapper>
        <div
          className="ag-theme-alpine"
          style={{
            margin: " 0 auto",
            boxSizing: "border-box",
            height: "67vh",
            width: "83vw",
          }}
        >
          <AgGridReact
            rowData={filterHandler(users)}
            columnDefs={columnDefs}
            defaultColDef={defaultColDef}
            animateRows={true}
            pagination={true}
            paginationPageSize={paginationPageSize}
          />
        </div>
      </Wrapper>
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

const Wrapper = styled.section`
  .ag-theme-alpine {
    --ag-header-foreground-color: #66fcf1;
    --ag-header-background-color: #1f2833;
    --ag-odd-row-background-color: #9ab5b3;
    --ag-foreground-color: #2c3531;
    --ag-background-color: #eaf6f3;
  }
`;

export default Users;
