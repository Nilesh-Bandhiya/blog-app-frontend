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

const BlogDialog = ({ open, handleBlogFormClose, formData }) => {
  const dispatch = useDispatch();

  const defaultValue = {
    _id: null,
    title: null,
    author: null,
    category: null,
    image: null,
    description: null,
  };

  const validation = yup.object().shape({
    title: yup.string().required("Title is Required"),

    author: yup.string().required("Author is Required"),

    image: yup
      .mixed()
      .test("name", "Image is Required", (value) => {
        return value && value[0]?.name && true;
      })
      .test("fileSize", "Max allowed size is 1MB", (value) => {
        return value && value[0]?.size <= 1024000;
      })
      .test(
        "type",
        "Only the following formats are accepted: .jpeg, .jpg, .png,",
        (value) => {
          return (
            value &&
            (value[0]?.type === "image/jpeg" ||
              value[0]?.type === "image/jpg" ||
              value[0]?.type === "image/png")
          );
        }
      ),

    category: yup.string().required("Category is Required"),

    description: yup
      .string()
      .required("Category is Required")
      .min(10, "description must be at least 10 character"),
  });

  const updateValidation = yup.object().shape({
    title: yup.string().required("Title is Required"),

    author: yup.string().required("Author is Required"),

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
    resolver: yupResolver(formData ? updateValidation : validation),
  });

  useEffect(() => {
    if (formData) {
      reset(formData);
    } else {
      reset(defaultValue);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formData, reset]);

  const addBlogHandler = async (data) => {
    const sendData = new FormData();
    sendData.append("author", data?.author);
    sendData.append("category", data?.category);
    sendData.append("description", data?.description);
    sendData.append("image", data?.image[0]);
    sendData.append("title", data?.title);

    if (formData) {
      sendData.append("_id", data?._id);
      await updateBlog(sendData);
      dispatch(getBlogs());
    } else {
      await addBlog(sendData);
      dispatch(getBlogs());
    }

    handleBlogFormClose();
  };

  return (
    <div>
      <Dialog
        open={open}
        onClose={handleBlogFormClose}
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
                      value={watch("category") || ""}
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
                <Grid item xs={7}>
                  <TextField
                    required
                    fullWidth
                    autoFocus
                    type="file"
                    {...register("image")}
                    error={errors.image ? true : false}
                    helperText={errors.image?.message}
                    id="image"
                    name="image"
                  />
                </Grid>

                <Grid
                  item
                  xs={5}
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    flexDirection: "column",
                  }}
                >
                  {(watch("image")?.length > 0 || formData?.image) && (
                    <div style={{ display: "flex", justifyContent: "center" }}>
                      <img
                        src={
                          watch("image")?.length > 0
                            ? URL.createObjectURL(watch("image")[0])
                            : formData?.image
                        }
                        alt={
                          watch("image")?.length > 0
                            ? watch("image")[0]?.name
                            : formData?.image?.substr(
                                formData?.image?.lastIndexOf("_") + 1
                              )
                        }
                        height={40}
                        width={70}
                      />
                    </div>
                  )}

                  <label
                    style={{
                      fontSize:
                        watch("image")?.length > 0 || formData?.image
                          ? "14px"
                          : "18px",
                      fontWeight: "bold",
                      margin: "0 auto",
                    }}
                  >
                    {watch("image")?.length > 0 || formData?.image
                      ? "For Change Image Choose Again"
                      : "Upload Image"}
                  </label>
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
                  onClick={handleBlogFormClose}
                  sx={{ marginRight: "10px" }}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  variant="contained"
                  color={formData ? "success" : "primary"}
                  autoFocus
                >
                  {formData ? "Update" : "Add"}
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
