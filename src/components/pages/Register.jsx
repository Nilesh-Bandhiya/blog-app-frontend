import React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { registerUser } from "../../services/api/usersApi";

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link className="footer-link" color="inherit" to="#">
        Blog App
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const Register = () => {
  const navigate =  useNavigate()

  const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/

  const validation = yup.object().shape({
    firstName: yup
      .string()
      .required("First Name is Required")
      .min(3, "First Name must be at least 3 character"),

    lastName: yup
      .string()
      .required("Last Name is Required")
      .min(3, "Last Name must be at least 3 character"),

    phoneNumber: yup.string()
    .required("Phone number is Required")
    .min(6, "Phone number must be at least 6 character")
    .max(10, "Phone number must be max 10 character")
    .matches(phoneRegExp, 'Phone number is not valid'),

    email: yup
      .string()
      .required("Email is Required")
      .email("Plaese Enter Valid Email"),

    password: yup
      .string()
      .required("Password is Required")
      .min(6, "Password must be at least 6 character long"),

    cpassword: yup
      .string()
      .required("Confirm Password is Required")
      .min(6, "Password must be at least 6 character long"),
  });

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validation),
  });

  const signUpHandler = async (data) => {

    if(data.password !== data.cpassword){
      setError("cpassword", { type: "custom", message: "Confirm Password Did not match previous Password" }, { shouldFocus: true });
      return
    }

    let newData = { ...data, role: "user", active: false }

    const registeredUser = await registerUser(newData)

    if (registeredUser) {
      navigate("/signin")
    }

  };

  return (
    <Container component="main" maxWidth="sm" >
      <CssBaseline />
      <Paper
        elevation={5}
        sx={{
          padding: 2,
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center"
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <Box
            component="form"
            noValidate
            sx={{mt: 2}}
            onSubmit={handleSubmit(signUpHandler)}
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
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  {...register("password")}
                  error={errors.password ? true : false}
                  helperText={errors.password?.message}
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  {...register("cpassword")}
                  error={errors.cpassword ? true : false}
                  helperText={errors.cpassword?.message}
                  name="cpassword"
                  label="Confirm Password"
                  type="password"
                  id="cpassword"
                  autoComplete="confirm-password"
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 2, mb: 2 }}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link className="forgot-link" to="/signin" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 2, mb: 1 }} />
      </Paper>
    </Container>
  );
};

export default Register;
