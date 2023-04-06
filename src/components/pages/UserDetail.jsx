import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { IconButton } from "@mui/material";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import { updateUserProfile } from "../../services/api/usersApi";

const UserDetail = () => {
  const navigate = useNavigate();

  const [edit, setEdit] = useState(false);
  let user = JSON.parse(localStorage.getItem("userData"));

  const phoneRegExp =
    /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

  const validation = yup.object().shape({
    firstName: yup
      .string()
      .required("First Name is Required")
      .min(3, "First Name must be at least 3 character"),

    lastName: yup
      .string()
      .required("Last Name is Required")
      .min(3, "Last Name must be at least 3 character"),

    phoneNumber: yup
      .string()
      .required("Phone number is Required")
      .min(6, "Phone number must be at least 6 character")
      .max(10, "Phone number must be max 10 character")
      .matches(phoneRegExp, "Phone number is not valid"),

    email: yup
      .string()
      .required("Email is Required")
      .email("Plaese Enter Valid Email"),
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validation),
  });

  const updateUserHandler = async (data) => {
    const updatedUser = await updateUserProfile(data);
    if (updatedUser) {
      localStorage.setItem("userData", JSON.stringify(updatedUser));
      navigate("/users");
    }
  };

  useEffect(() => {
    if (user) {
      reset(user);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Container component="main" maxWidth="sm" style={{height: "80vh"}}>
      <CssBaseline />
      <Paper
        elevation={5}
        sx={{
          marginTop: "24px",
          padding: 2,
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <Typography component="h1" variant="h5">
              Your Details
            </Typography>
            <IconButton
              variant="contained"
              size="small"
              color="success"
              onClick={() => {
                setEdit(true);
              }}
            >
              <BorderColorIcon />
            </IconButton>
          </Box>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit(updateUserHandler)}
            sx={{ mt: 3 }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  {...register("firstName")}
                  error={errors.firstName ? true : false}
                  helperText={errors.firstName?.message}
                  autoFocus
                  disabled={!edit}
                  id="firstName"
                  label="First Name"
                  name="firstName"
                  autoComplete="given-name"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  {...register("lastName")}
                  error={errors.lastName ? true : false}
                  helperText={errors.lastName?.message}
                  disabled={!edit}
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  autoComplete="family-name"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  {...register("phoneNumber")}
                  error={errors.phoneNumber ? true : false}
                  helperText={errors.phoneNumber?.message}
                  id="phoneNumber"
                  disabled={!edit}
                  label="Mobile Number"
                  type="number"
                  name="phoneNumber"
                  autoComplete="phoneNumber"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  {...register("email")}
                  error={errors.email ? true : false}
                  helperText={errors.email?.message}
                  disabled={!edit}
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                />
              </Grid>
              <Grid
                item
                xs={12}
                sx={{ display: "flex", justifyContent: "end" }}
              >
                <Button
                  type="button"
                  onClick={() => navigate("/")}
                  variant="contained"
                  sx={{ mt: 2, mb: 1, mr: 2 }}
                >
                  Go to Home
                </Button>
                <Button
                  type="submit"
                  color="success"
                  disabled={!edit}
                  variant="contained"
                  sx={{ mt: 2, mb: 1 }}
                >
                  Update
                </Button>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Paper>
    </Container>
  );
};

export default UserDetail;
