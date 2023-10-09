import { useState } from "react";
import {
  Box,
  Button,
  TextField,
  useMediaQuery,
  Typography,
} from "@mui/material";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ColorRing } from "react-loader-spinner";
// const baseUrl = import.meta.env.BASE_URL;

import { Formik } from "formik";
import * as yup from "yup";

import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setLogin } from "../../state/store";

const registerSchema = yup.object().shape({
  username: yup.string().required("required"),
  email: yup.string().email("invalid email").required("required"),
  password: yup.string().required("required"),
});

const loginSchema = yup.object().shape({
  email: yup.string().email("invalid email").required("required"),
  password: yup.string().required("required"),
});

const initialValuesRegister = {
  username: "",
  email: "",
  password: "",
};

const initialValuesLogin = {
  email: "",
  password: "",
};

const Form = () => {
  const [pageType, setPageType] = useState("login");
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isNonMobile = useMediaQuery("(min-width: 600px)");
  const isLogin = pageType === "login";
  const isRegister = pageType === "register";

  const handleFormSubmit = async (values, onSubmitProps) => {
    setLoading(true); // Start loader
    if (isLogin) await login(values, onSubmitProps);
    if (isRegister) await register(values, onSubmitProps);
    setLoading(false); // Stop loader
  };

  const register = async (values, onSubmitProps) => {
    //this allows us to send form info
    try {
      const { username, email, password } = values;

      const requestBody = {
        username,
        email,
        password,
      };

      const savedUserResponse = await fetch(
        `https://busbackend-muqx.onrender.com/auth/register`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(requestBody),
        }
      );
      const savedUser = await savedUserResponse.json();
      onSubmitProps.resetForm();

      if (savedUser) {
        toast.success("Registration successful!"); // Show success toast
        setPageType("login");
      }
    } catch (e) {
      toast.error("Registration failed. Please try again."); // Show error toast
    }
  };

  const login = async (values, onSubmitProps) => {
    //
    try {
      const loggedInResponse = await fetch("https://busbackend-muqx.onrender.com/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      const loggedIn = await loggedInResponse.json();
      if (loggedIn) {
        toast.success("Login successful!"); // Show success toast
        dispatch(
          setLogin({
            user: loggedIn.user,
            token: loggedIn.token,
          })
        );
        navigate("/browse-tickets");
        onSubmitProps.resetForm();
      }
    } catch (error) {
      toast.error("Login failed. Please check your credentials."); // Show error toast
    }
  };

  return (
    <Formik
      onSubmit={handleFormSubmit}
      initialValues={isLogin ? initialValuesLogin : initialValuesRegister}
      validationSchema={isLogin ? loginSchema : registerSchema}
    >
      {({
        values,
        errors,
        touched,
        handleBlur,
        handleChange,
        handleSubmit,
        resetForm,
      }) => (
        <form onSubmit={handleSubmit}>
          <ToastContainer
            position="top-right"
            autoClose={5000}
            hideProgressBar
          />
          <Box
            display="grid"
            gap="30px"
            gridTemplateColumns="repeat(4, minmax(0, 1fr))"
            sx={{
              "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
            }}
          >
            {isRegister && (
              <>
                <TextField
                  label=" Username"
                  type="text"
                  onBlur={handleBlur}
                  value={values.username || ""}
                  onChange={handleChange}
                  name="username"
                  error={Boolean(touched.username) && Boolean(errors.username)}
                  helperText={touched.username && errors.username}
                  sx={{ gridColumn: "span 4" }}
                />
              </>
            )}

            <TextField
              label="Email"
              type="text"
              onBlur={handleBlur}
              value={values.email || ""}
              onChange={handleChange}
              name="email"
              error={Boolean(touched.email) && Boolean(errors.email)}
              helperText={touched.email && errors.email}
              sx={{ gridColumn: "span 4" }}
            />

            <TextField
              label="Password"
              type="password"
              onBlur={handleBlur}
              value={values.password || ""}
              onChange={handleChange}
              name="password"
              error={Boolean(touched.password) && Boolean(errors.password)}
              helperText={touched.password && errors.password}
              sx={{ gridColumn: "span 4" }}
            />
            {/* BUTTON */}
            <Box>
              <Button
                fullWidth
                type="submit"
                sx={{
                  m: "2rem 0",
                  p: "1rem",
                  backgroundColor: "white",
                  color: "black",
                  "&:hover": { backgroundColor: "#DCDCDC" },
                }}
              >
                {loading ? ( // Conditionally render based on loading state
                  <ColorRing
                    visible={true}
                    height="20"
                    width="20"
                    ariaLabel="blocks-loading"
                    wrapperStyle={{}}
                    wrapperClass="blocks-wrapper"
                    colors={[
                      "#e15b64",
                      "#f47e60",
                      "#f8b26a",
                      "#abbd81",
                      "#849b87",
                    ]}
                  />
                ) : isLogin ? (
                  "Login"
                ) : (
                  "Register"
                )}
              </Button>
              <Typography
                onClick={() => {
                  setPageType(isLogin ? "register" : "login");
                  resetForm();
                }}
                width="300px"
                sx={{
                  "&:hover": {
                    color: "white",
                    cursor: "pointer",
                  },
                }}
              >
                {isLogin
                  ? "Don't have an account? Sign Up here."
                  : "Already have an account? Login here."}
              </Typography>
            </Box>
          </Box>
        </form>
      )}
    </Formik>
  );
};

export default Form;
