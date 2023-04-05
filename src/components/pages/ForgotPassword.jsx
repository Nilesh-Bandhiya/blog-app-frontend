import React from "react";
import {
  Avatar,
  Box,
  Button,
  Container,
  CssBaseline,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import { forgotPassword } from "../../services/api/usersApi";

const ForgotPassword = () => {
  const navigate = useNavigate();

  const validation = yup.object().shape({
    email: yup
      .string()
      .required("Email is Required")
      .email("Plaese Enter Valid Email"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validation),
  });

  const forgotPasswordHandler = async (data) => {
    await forgotPassword(data);
    navigate("/signin");
  };

  return (
    <Container component="main" maxWidth="xs" style={{height: "80vh"}}>
      <CssBaseline />
      <Paper
        elevation={5}
        sx={{
          marginTop: 1,
          padding: 2,
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Forgot Password
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit(forgotPasswordHandler)}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              {...register("email")}
              error={errors.email ? true : false}
              helperText={errors.email?.message}
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Send Mail
            </Button>
          </Box>
        </Box>
      </Paper>
    </Container>
  );
};

export default ForgotPassword;
