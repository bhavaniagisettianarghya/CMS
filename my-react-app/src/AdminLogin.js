
// import React, { useState } from "react";

// import { Link, useNavigate } from "react-router-dom";
// import axios from "axios";
// import { useForm } from "react-hook-form";

// import "./AdminLogin.css";
// // import "bootstrap-icons/font/bootstrap-icons.css";
// // import "bootstrap/dist/css/bootstrap.css";

// function ErrorAlert({ message }) {
//   return (
//     <div className="alert alert-danger" role="alert">
//       {message}
//     </div>
//   );
// }

// function Loginform() {
//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//   } = useForm();

//   const navigate = useNavigate();
//   const [error, setError] = useState(null);
//   const [showValidationAlert, setShowValidationAlert] = useState(false);
//   const [successMessage, setSuccessMessage] = useState("");

//   const onSubmit = async (data) => {
//     try {
//       const response = await axios.post(`//localhost:8080/api/users/login`, {
//         email: data.email,
//         password: data.password,
//       });

//       if (response.status === 200) {
//         // Set success message
//         setSuccessMessage("Login successful");
//         // Redirect to the User page
//         navigate("/User");
//       } else {
//         // Display failure alert
//         setError("Invalid email or password");
//         // Set state to show additional error message
//         setShowValidationAlert(true);
//       }
//     } catch (error) {
//       console.error("An error occurred during login:", error);
//       // Set state to show additional error message
//       setShowValidationAlert(true);
//       setError("An error occurred during login");
//     }
//   };

//   return (
//     <div className="loginpagecontainer" id="logincss">
//       <div className="loginwrapper">
         


//         <form onSubmit={handleSubmit(onSubmit)}>
//           <h1>LoginForm</h1>
//           <div className="input-box">
//             <input
//               type="email"
//               placeholder="Email"
//               {...register("email", {
//                 required: "Email is required",
//                 pattern: {
//                   value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
//                   message: "Invalid email address",
//                 },
//               })}
//             />
//             <i className="bi bi-person-fill"></i>
//           </div>
//           {errors.email && (
//             <div className="error-message">{errors.email.message}</div>
//           )}
//           <div className="input-box">
//             <input
//               type="password"
//               placeholder="Password"
//               {...register("password", {
//                 required: "Password is required",
//                 minLength: {
//                   value: 6,
//                   message: "Password must be at least 6 characters long",
//                 },
//               })}
//             />
//             <i className="bi bi-lock-fill"></i>
//           </div>
//           {errors.password && (
//             <div className="error-message">{errors.password.message}</div>
//           )}
//           {showValidationAlert && <ErrorAlert message={error} />}
         
//           {successMessage && (
//             <div className="alert alert-success" role="alert">
//               {successMessage}
//             </div>
//           )}
//           <div className="forgot">
//             <Link to="/forgotpassword" style={{marginLeft:"40%"}}>Forgot password?</Link>
//             {/* <Link to="/Dashboard">User</Link>
//             <Link to="/Managementdashboard">Admin</Link> */}
//           </div>
//           <button type="submit">Login</button>
//           <div className="register-link">
           
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// }

// export default Loginform;




// import React, { useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import axios from "axios";
// import { useForm } from "react-hook-form";
// import { TextField, Button, Typography, Alert } from "@mui/material";
// import "./AdminLogin.css";

// function Loginform() {
//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//   } = useForm();

//   const navigate = useNavigate();
//   const [error, setError] = useState(null);
//   const [showValidationAlert, setShowValidationAlert] = useState(false);
//   const [successMessage, setSuccessMessage] = useState("");

//   const onSubmit = async (data) => {
//     try {
//       const response = await axios.post(`//localhost:8080/api/users/login`, {
//         email: data.email,
//         password: data.password,
//       });

//       if (response.status === 200) {
//         // Set success message
//         setSuccessMessage("Login successful");
//         // Redirect to the User page
//         navigate("/User");
//       } else {
//         // Display failure alert
//         setError("Invalid email or password");
//         // Set state to show additional error message
//         setShowValidationAlert(true);
//       }
//     } catch (error) {
//       console.error("An error occurred during login:", error);
//       // Set state to show additional error message
//       setShowValidationAlert(true);
//       setError("An error occurred during login");
//     }
//   };

//   return (
//     <div className="loginpagecontainer" id="logincss">
//       <div className="loginwrapper">
//         <form onSubmit={handleSubmit(onSubmit)}>
//           <Typography variant="h4">LoginForm</Typography>
//           <div className="input-box">
//             <TextField
//               type="email"
//               placeholder="Email"
//               {...register("email", {
//                 required: "Email is required",
//                 pattern: {
//                   value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
//                   message: "Invalid email address",
//                 },
//               })}
//             />
//           </div>
//           {errors.email && (
//             <Alert severity="error">{errors.email.message}</Alert>
//           )}
//           <div className="input-box">
//             <TextField
//               type="password"
//               placeholder="Password"
//               {...register("password", {
//                 required: "Password is required",
//                 minLength: {
//                   value: 6,
//                   message: "Password must be at least 6 characters long",
//                 },
//               })}
//             />
//           </div>
//           {errors.password && (
//             <Alert severity="error">{errors.password.message}</Alert>
//           )}
//           {showValidationAlert && <Alert severity="error">{error}</Alert>}
//           {successMessage && <Alert severity="success">{successMessage}</Alert>}
//           <div className="forgot">
//             <Link to="/forgotpassword" style={{ marginLeft: "40%" }}>
//               Forgot password?
//             </Link>
//           </div>
//           <Button type="submit" variant="contained" color="primary">
//             Login
//           </Button>
//           <div className="register-link"></div>
//         </form>
//       </div>
//     </div>
//   );
// }

// export default Loginform;



import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Container,
  TextField,
  Button,
  Link,
  Typography,
  Box,
  CssBaseline,
} from "@material-ui/core";
import BackgroundImage from "./background.jpg"; // Path to your background image

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundImage: `url(${BackgroundImage})`,
    backgroundSize: "cover",
    height: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  container: {
    backdropFilter: "blur(5px)",
    backgroundColor: "rgba(255, 255, 255, 0.5)",
    padding: theme.spacing(4),
    borderRadius: theme.spacing(2),
  },
  form: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  textField: {
    marginBottom: theme.spacing(2),
  },
}));

const LoginForm = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <CssBaseline />
      <Container maxWidth="xs" className={classes.container}>
        <Box className={classes.form}>
          <Typography variant="h5" gutterBottom>
            Login
          </Typography>
          <TextField
            className={classes.textField}
            label="Username"
            variant="outlined"
            fullWidth
          />
          <TextField
            className={classes.textField}
            label="Email"
            variant="outlined"
            fullWidth
          />
          <Link href="#" variant="body2" style={{ marginBottom: "16px" }}>
            Forgot password?
          </Link>
          <Button variant="contained" color="primary" fullWidth>
            Submit
          </Button>
        </Box>
      </Container>
    </div>
  );
};

export default LoginForm;




