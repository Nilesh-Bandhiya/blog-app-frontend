import React, { useEffect } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import {
  Box,
  FormControl,
  FormHelperText,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import Textarea from "@mui/joy/Textarea";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useDispatch } from "react-redux";
import { getBlogs } from "../../store/blogs-slice";
import { addBlog, updateBlog } from "../../services/api/blogsApi";

const BlogDialog = ({ open, handleEditClose, formData }) => {

  const dispatch = useDispatch();

  const defaultValue = {
    _id: null,
    title: null,
    author: null,
    category: null,
    image: null,
    description: null,
  };

  let { _id } = formData;

  const validation = yup.object().shape({
    title: yup.string().required("Title is Required"),

    author: yup.string().required("Author is Required"),

    image: yup.string().required("Image is Required"),

    category: yup.string().required("Category is Required"),

    description: yup
      .string()
      .required("Category is Required")
      .min(10, "description must be at least 10 character"),
  });

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validation),
  });

  useEffect(() => {
    // debugger;
    if (_id) {
      reset(formData);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [_id ]);

  const addBlogHandler = async (data) => {

    if (_id) {
      const updatedData = { ...data, _id };
      await updateBlog(updatedData);
      dispatch(getBlogs());
    } else {
      await addBlog(data);
      dispatch(getBlogs());
    }

    handleEditClose();
    reset(defaultValue)
  };

  return (
    <div>
      <Dialog
        open={open}
        onClose={handleEditClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Add New Blog"}</DialogTitle>
        <DialogContent>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Box
              component="form"
              noValidate
              onSubmit={handleSubmit(addBlogHandler)}
              sx={{ mt: 3 }}
            >
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    {...register("title")}
                    error={errors.title ? true : false}
                    helperText={errors.title?.message}
                    autoFocus
                    id="title"
                    label="Title"
                    name="title"
                    autoComplete="title"
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    fullWidth
                    {...register("author")}
                    error={errors.author ? true : false}
                    helperText={errors.author?.message}
                    id="author"
                    label="Author"
                    name="author"
                    autoComplete="author"
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormControl sx={{ minWidth: 270 }}>
                    <InputLabel
                      id="category-label"
                      sx={{ color: errors.category ? "red" : "" }}
                    >
                      Category
                    </InputLabel>
                    <Select
                      required
                      labelId="category-label"
                      id="category"
                      {...register("category")}
                      error={errors.category ? true : false}
                      label="Category"
                      name="category"
                      value={watch("category") || "CS-IT"}
                    >
                      <MenuItem value={"CS-IT"}>CS-IT</MenuItem>
                      <MenuItem value={"Travel"}>Travel</MenuItem>
                      <MenuItem value={"Food"}>Food</MenuItem>
                    </Select>
                    <FormHelperText sx={{ color: "red" }}>
                      {errors.category?.message}
                    </FormHelperText>
                  </FormControl>
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    {...register("image")}
                    error={errors.image ? true : false}
                    helperText={errors.image?.message}
                    id="image"
                    label="Image"
                    name="image"
                    autoComplete="image"
                  />
                </Grid>
                <Grid item xs={12}>
                  <Textarea
                    required
                    {...register("description")}
                    error={errors.description ? true : false}
                    name="description"
                    id="description"
                    placeholder="Enter Blog description here ..."
                    minRows={5}
                    variant="outlined"
                  />
                </Grid>
              </Grid>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "end",
                  marginTop: "20px",
                }}
              >
                <Button
                  type="button"
                  variant="outlined"
                  color="error"
                  onClick={handleEditClose}
                  sx={{ marginRight: "10px" }}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  variant="contained"
                  color={_id ? "success" : "primary"}
                  autoFocus
                >
                  {_id ? "Update" : "Add"}
                </Button>
              </Box>
            </Box>
          </Box>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default BlogDialog;
