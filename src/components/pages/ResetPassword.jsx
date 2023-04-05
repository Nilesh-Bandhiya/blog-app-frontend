import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { checkTokenExpiry, resetPassword } from "../../services/api/usersApi";
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
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

const ResetPassword = () => {
  const navigate = useNavigate();
  const params = useParams();
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const verifyToken = async () => {
      const data = await checkTokenExpiry(params);
      if (data) {
        setUserId(data);
      }
    };
    verifyToken();
  }, [params, params.tokenId]);

  const validation = yup.object().shape({
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
    setError,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validation),
  });

  const resetPasswordHandler = async (data) => {
    if (data.password !== data.cpassword) {
      return setError(
        "cpassword",
        {
          type: "custom",
          message: "Confirm Password Did not match previous Password",
        },
        { shouldFocus: true }
      );
    }
    const newData = { ...data, userId, tokenId: params?.tokenId };
    const success = await resetPassword(newData);
    if (success) {
      navigate("/signin");
    }
  };

  return (
    <>
      {userId ? (
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
                onSubmit={handleSubmit(resetPasswordHandler)}
                noValidate
                sx={{ mt: 1 }}
              >
                <TextField
                  margin="normal"
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
                <TextField
                  margin="normal"
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
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                >
                  Change Password
                </Button>
              </Box>
            </Box>
          </Paper>
        </Container>
      ) : (
        <h1>User not Verified</h1>
      )}
    </>
  );
};

export default ResetPassword;
