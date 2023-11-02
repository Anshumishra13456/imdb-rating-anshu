import React from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import "./registeration.css";
import {
  Button,
  Checkbox,
  Container,
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid,
  Radio,
  RadioGroup,
  TextField,
  Typography,
} from "@mui/material";

//define a functional component
const Registeration = () => {
  const navigate = useNavigate();
  //validation Schema that validate the rules for input form

  const validationSchema = yup.object().shape({
    name: yup.string().required("Enter Your Name"),
    checkbox: yup.boolean().oneOf([true], "Check this box"),
    email: yup.string().required("Enter Your E-mail"),
    radio: yup.string().required("Select Your Gender"),
    password: yup
      .string()
      .min(6, "Minimum six characters")
      .required("Password is Required"),
  });

  //create a function to manage forms data suubmission
  const formik = useFormik({
    //initial values for our form fields
    initialValues: {
      name: "",
      checkbox: false,
      email: "",
      radio: "",
      password: "",
    },

    //apply validation schema to form fields
    validationSchema,
    //Function to run the form data is submitted
    onSubmit: (values) => {
      console.log(values);
      //save the form data to localstorage
      localStorage.setItem("name", values.name);
      localStorage.setItem("email", values.email);
      localStorage.setItem("password", values.password);

      //navigate to the login page after registeration
      navigate("/login");
    },
  });

  return (
    <div className="register-page">

    <Container maxWidth="xs" >
      <div className="center bg-color text-light">
        <Typography variant="h4" align="center" >
          Register Here
        </Typography>

        <form onSubmit={formik.handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              {/* Textinput */}

              <TextField
                fullWidth
                id="name"
                label="Name"
                variant="outlined"
                value={formik.values.name}
                onChange={formik.handleChange}
                helperText={formik.touched.name&&formik.errors.name}
                error={formik.touched.name && formik.errors.name}
                className="custom-input"
              />
            </Grid>

            <Grid item xs={12}>
              {/* Textinput */}

              <TextField
                fullWidth
                id="email"
                label="Email"
                variant="outlined"
                value={formik.values.email}
                onChange={formik.handleChange}
                helperText={formik.touched.email&&formik.errors.email}
                error={formik.touched.email && formik.errors.email}
                className="custom-input"
                />
            </Grid>

            <Grid item xs={12}>
              {/* Textinput */}

              <TextField
                fullWidth
                id="password"
                label="password"
                variant="outlined"
                value={formik.values.password}
                onChange={formik.handleChange}
                helperText={formik.touched.password&&formik.errors.password}
                error={formik.touched.password && formik.errors.password}
                className="custom-input"
                />
            </Grid>

            <Grid item xs={12}>
              <FormControl
                component="fieldset"
                error={formik.touched.radio && Boolean(formik.errors.radio)}
                >
                <FormLabel component="legend">Gender</FormLabel>
                <RadioGroup
                  name="radio"
                  values={formik.values.radio}
                  onChange={formik.handleChange}
                  row
                  >
                  <FormControlLabel
                    value="male"
                    control={<Radio />}
                    label="Male"
                    />
                  <FormControlLabel
                    value="female"
                    control={<Radio />}
                    label="Female"
                    />
                  <FormControlLabel
                    value="other"
                    control={<Radio />}
                    label="Other"
                    />
                </RadioGroup>
                <p className="text-danger p-text">
                  {formik.touched.radio && formik.errors.radio}
                </p>
              </FormControl>
            </Grid>

            <Grid item xs={12}>
              <FormControlLabel
                control={
                  <Checkbox
                  name="checkbox"
                  color="primary"
                  checkbox={formik.values.checkbox}
                  onChange={formik.handleChange}
                  />
                }
                label="All information is correct"
                />
              <p className="text-danger p-text">
                {formik.touched.checkbox && formik.errors.checkbox}
              </p>
            </Grid>
          </Grid>

          <Button type="submit" fullWidth variant="contained" color="primary">
            Register
          </Button>
        </form>
      </div>
    </Container>
                </div>
  );
};

export default Registeration;
