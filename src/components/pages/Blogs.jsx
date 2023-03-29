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
        <Link to={`/${data._id}`} className="link-blue">
          {data.title}
        </Link>
      ) : (
        <>{data.title}</>
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
  const [editOpen, setEditOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [formData, setFormData] = useState({});
  const [data, setData] = useState({});
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

  const handleEditOpen = (data) => {
    setFormData(data);
    setEditOpen(true);
  };

  const handleEditClose = () => {
    setEditOpen(false);
  };

  const handleDeleteOpen = (data) => {
    setData(data);
    setDeleteOpen(true);
  };

  const handleDeleteClose = () => {
    setDeleteOpen(false);
  };

  const [columnDefs, setColumnDefs] = useState([
    {
      field: "Id",
      minWidth: 50,
      width: 60,
      maxWidth: 70,
      cellRenderer: idHandler,
    },

    {
      field: "title",
      minWidth: 120,
      width: 120,
      maxWidth: 200,
      cellRenderer: titleLinkHandler,
      cellRendererParams: {
        isLoggedIn: currentUserId,
      },
    },
    { field: "description", minWidth: 200, width: 200, maxWidth: 400 },
    { field: "author", minWidth: 120, width: 120, maxWidth: 200 },
    { field: "category", minWidth: 100, width: 100, maxWidth: 150 },
    {
      field: "Actions",
      sortable: false,
      filter: false,
      minWidth: 100,
      maxWidth: 200,
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
        { field: "id", minWidth: 50, width: 60, maxWidth: 70 },
        {
          field: "title",
          minWidth: 150,
          width: 150,
          maxWidth: 250,
          cellRenderer: titleLinkHandler,
          cellRendererParams: {
            isLoggedIn: currentUserId,
          },
        },
        { field: "description", minWidth: 250, width: 250, maxWidth: 500 },
        { field: "author", minWidth: 130, width: 130, maxWidth: 250 },
        { field: "category", minWidth: 120, width: 120, maxWidth: 200 },
      ]);
    }
  }, [isAdmin, currentUserId]);

  const defaultColDef = useMemo(
    () => ({
      sortable: true,
      flex: 1,
      filter: true,
    }),
    []
  );

  const filterHandler = (data) => {
    if (data !== undefined) {
      return data?.filter((blog) =>
        filterKeys.some((key) =>
          blog[key].toLowerCase().includes(search.toLowerCase())
        )
      );
    }
  };

  useEffect(() => {
    if (location.pathname !== "/myblogs") {
      dispatch(getBlogs());
    }
  }, [dispatch, location.pathname]);

  return (
    <div style={{ width: "100%", height: "100%" }}>
      <div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            height: "4vw",
            width: "80vw",
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
            <Button variant="contained" onClick={handleEditOpen}>
              Add Blog
            </Button>
          )}
        </div>

        <div
          className="ag-theme-alpine"
          style={{
            margin: "0 auto",
            boxSizing: "border-box",
            height: "66vh",
            width: "80vw",
          }}
        >
          <AgGridReact
            rowData={filterHandler(blogsData)}
            columnDefs={columnDefs}
            defaultColDef={defaultColDef}
            animateRows={true}
            pagination={true}
            paginationPageSize={8}
          />
        </div>
      </div>
      <BlogDialog
        open={editOpen}
        formData={formData}
        handleEditClose={handleEditClose}
        currentUserId={currentUserId}
      />
      <ConfirmationDialog
        open={deleteOpen}
        handleClose={handleDeleteClose}
        data={data}
      />
    </div>
  );
};

export default Blogs;
