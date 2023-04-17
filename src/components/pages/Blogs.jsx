import React, { useState, useEffect, useMemo } from "react";
import { AgGridReact } from "ag-grid-react";
import IconButton from "@mui/material/IconButton";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import DeleteIcon from "@mui/icons-material/Delete";
import { Button, TextField } from "@mui/material";
import { Link, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getMyBlogs } from "../../services/api/blogsApi";
import { getBlogs } from "../../store/blogs-slice";
import BlogDialog from "../dialog/BlogDialog";
import ConfirmationDialog from "../dialog/ConfirmationDialog";
import styled from "styled-components";

const actionHandler = ({ handleDeleteOpen, handleEditOpen, data }) => {
  const editBlogHandler = () => {
    handleEditOpen(data);
  };

  const deleteBlogHandler = () => {
    let newData = { ...data, key: "deleteBlog" };
    handleDeleteOpen(newData);
  };

  return (
    <>
      <IconButton
        variant="contained"
        size="small"
        color="success"
        sx={{ marginRight: "20px" }}
        onClick={editBlogHandler}
      >
        <BorderColorIcon />
      </IconButton>
      <IconButton
        variant="contained"
        color="error"
        size="small"
        onClick={deleteBlogHandler}
      >
        <DeleteIcon />
      </IconButton>
    </>
  );
};

const titleLinkHandler = ({ data, isLoggedIn }) => {
  return (
    <>
      {isLoggedIn ? (
        <Link to={`/${data?._id}`} className="link-blue">
          {data?.title}
        </Link>
      ) : (
        <>{data?.title}</>
      )}
    </>
  );
};

const idHandler = (e) => {
  return <>{e?.node?.rowIndex + 1}</>;
};

const Blogs = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  let token = JSON.parse(localStorage.getItem("userData"));
  let currentUserId = token?._id;
  let isAdmin = token?.role === "admin";

  const filterKeys = ["title", "author", "description", "category"];

  const blogs = useSelector((state) => state?.blog?.blogs);

  const [blogsData, setBlogsData] = useState(blogs);
  const [blogFormOpen, setBlogFormOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [formData, setFormData] = useState(null);
  const [data, setData] = useState(null);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const getAdminBlog = async () => {
      if (location.pathname === "/myblogs") {
        setBlogsData(await getMyBlogs());
      } else {
        setBlogsData(blogs);
      }
    };
    getAdminBlog();
  }, [blogs, location.pathname]);

  useEffect(() => {
    if (location.pathname !== "/myblogs") {
      dispatch(getBlogs());
    }
  }, [dispatch, location.pathname]);

  const handleEditOpen = (data) => {
    setFormData(data);
    setBlogFormOpen(true);
  };

  const handleBlogFormClose = () => {
    setBlogFormOpen(false);
    setFormData(null);
  };

  const handleAddOpen = () => {
    setBlogFormOpen(true);
  };

  const handleDeleteOpen = (data) => {
    setData(data);
    setDeleteOpen(true);
  };

  const handleDeleteClose = () => {
    setDeleteOpen(false);
    setData(null);
  };

  const [columnDefs, setColumnDefs] = useState([
    {
      field: "Id",
      floatingFilter: false,
      filter: true,
      maxWidth: 70,
      cellRenderer: idHandler,
    },
    {
      field: "title",
      maxWidth: 250,
      cellRenderer: titleLinkHandler,
      cellRendererParams: {
        isLoggedIn: currentUserId,
      },
    },
    { field: "description", minWidth: 300, maxWidth: 350 },
    { field: "author"},
    {
      headerName: "Admin",
      field: "userId.firstName",
    },
    { field: "category" },
    {
      field: "Actions",
      sortable: false,  
      filter: false,
      cellRenderer: actionHandler,
      cellRendererParams: {
        handleEditOpen,
        handleDeleteOpen,
      },
    },
  ]);

  useEffect(() => {
    if (!isAdmin) {
      setColumnDefs([
        {
          field: "Id",
          maxWidth: 70,
          floatingFilter: false,
          filter: true,
          cellRenderer: idHandler,
        },

        {
          field: "title",
          maxWidth: 250,
          cellRenderer: titleLinkHandler,
          cellRendererParams: {
            isLoggedIn: currentUserId,
          },
        },
        { field: "description", minWidth: 300, maxWidth: 350 },
        { field: "author" },
        {
          headerName: "Admin",
          field: "userId.firstName",
        },
        { field: "category" },
      ]);
    }
  }, [isAdmin, currentUserId]);

  const defaultColDef = useMemo(
    () => ({
      floatingFilter: true,
      sortable: true,
      filter: true,
      flex: 1,
      minWidth: 180,
    }),
    []
  );

  const filterHandler = (data) => {
    if (data) {
      return data?.filter((blog) =>
        filterKeys.some((key) =>
          blog[key].toString().toLowerCase().includes(search.toLowerCase())
        )
      );
    }
  };

  return (
    <div style={{ width: "100%", height: "100%" }}>
      <div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
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
            sx={{ width: "50vw" }}
          />
          {isAdmin && (
            <Button
              variant="contained"
              onClick={handleAddOpen}
              className="addbtn"
            >
              Add Blog
            </Button>
          )}
        </div>
        <Wrapper>
          <div
            className="ag-theme-alpine"
            style={{
              margin: "0 auto",
              boxSizing: "border-box",
              height: "67vh",
              width: "83vw",
            }}
          >
            <AgGridReact
              rowData={filterHandler(blogsData)}
              columnDefs={columnDefs}
              defaultColDef={defaultColDef}
              animateRows={true}
              pagination={true}
              paginationAutoPageSize={true}
            />
          </div>
        </Wrapper>
      </div>

      <BlogDialog
        open={blogFormOpen}
        formData={formData}
        handleBlogFormClose={handleBlogFormClose}
      />
      <ConfirmationDialog
        open={deleteOpen}
        handleClose={handleDeleteClose}
        data={data}
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
  .ag-theme-alpine .ag-icon-menu {
    color: #66fcf1;
  }
`;

export default Blogs;
