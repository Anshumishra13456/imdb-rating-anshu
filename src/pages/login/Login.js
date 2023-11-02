import React from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";

import "./login.css";
import { Button, Container, Grid, TextField, Typography } from "@mui/material";

const Login = () => {
  //initialize the navigation hook
  const navigate = useNavigate();

  //Define a Validation Schema using yup
  const validationSchema = yup.object().shape({
    email: yup.string().required("Enter Your E-Mail ID"),
    password: yup.string().required("Password is mandatory"),
  });

  //Initlaize formik to manage form state,validation and submission of the data
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema,
    onSubmit: (values) => {
      console.log(values);
      navigate("/");
    },
  });

  return (
    <div className="login-page">
      <Container maxWidth="xs">
        <div className="center bgcolor text-light">
          <Typography variant="h4" align="center">
            Login Here
          </Typography>
          <form
            onSubmit={formik.handleSubmit}
            style={{ height: "300px", padding: "10px" }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  id="email"
                  name="email"
                  label="Email"
                  variant="outlined"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  error={formik.touched.email && Boolean(formik.errors.email)}
                  helperText={formik.touched.email && formik.errors.email}
                  autoComplete="off"
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  fullWidth
                  id="password"
                  name="password"
                  label="Password"
                  variant="outlined"
                  value={formik.values.password}
                  onChange={formik.handleChange}
                  error={
                    formik.touched.password && Boolean(formik.errors.password)
                  }
                  helperText={formik.touched.password && formik.errors.password}
                  autoComplete="off"
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              style={{ marginTop: "100px" }}
            >
              Login
            </Button>
          </form>
        </div>
      </Container>
    </div>
  );
};

export default Login;
