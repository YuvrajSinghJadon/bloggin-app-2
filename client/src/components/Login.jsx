import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Container,
  Box,
  Typography,
  TextField,
  Button,
  IconButton,
  InputAdornment,
} from "@mui/material";
import { AccountCircle, Visibility, VisibilityOff } from "@mui/icons-material";
import AlternateEmailIcon from "@mui/icons-material/AlternateEmail";
import { createUser, loginUser } from "../services";

const loginInitialValues = {
  username: "",
  password: "",
};

const signupInitialValues = {
  name: "",
  username: "",
  password: "",
};
const LoginForm = ({ userAuth }) => {
  const [signup, setSignup] = useState(signupInitialValues);
  const [login, setLogin] = useState(loginInitialValues);
  const [showPassword, setShowPassword] = useState(false);
  const [error, showError] = useState("");
  const navigate = useNavigate();
  //toggle between login and signup
  const [account, toggleAccount] = useState("login");
  const toggleSignup = () => {
    account === "signup" ? toggleAccount("login") : toggleAccount("signup");
  };
  //check if user is logged in
  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };
  //show error message
  useEffect(() => {
    showError(false);
  }, [login]);

  //signup User
  const onInputChange = (e) => {
    setSignup({ ...signup, [e.target.name]: e.target.value });
  };
  const handleSignUp = async () => {
    const response = await createUser(signup);
    if (response) {
      setSignup(signupInitialValues);
      toggleSignup();
      showError("");
    } else {
      showError("Something went wrong! please try again later");
    }
  };

  //Login User
  const onValueChange = (e) => {
    setLogin({ ...login, [e.target.name]: e.target.value });
  };
  const handleLogin = async () => {
    const response = await loginUser(login);
    if (response) {
      showError("");
      setLogin(loginInitialValues);
      sessionStorage.setItem(
        "accessToken",
        `Bearer ${response.data.accessToken}`
      );
      sessionStorage.setItem(
        "refreshToken",
        `Bearer ${response.data.refreshToken}`
      );
      userAuth(true);
      navigate("/");
    } else {
      showError("Something went wrong! please try again later");
    }
  };

  return (
    <Container
      sx={{
        height: "100vh", // Half of the screen's height
        width: "90vw", // Half of the screen's width
        display: "flex",
        justifyContent: "center",
        alignItems: "center", // Hide video overflow
        opacity: 0.9, // Set background to be translucent
      }}
    >
      <Container
        maxWidth="xs"
        sx={{
          height: "60vh", // Half of the screen's height
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          position: "relative",
          overflow: "hidden", // Hide video overflow
          borderRadius: "1rem",
          boxShadow:
            "0px 19px 38px rgba(0, 0, 0, 0.3), 0px 15px 12px rgba(2, 2, 0.5, 0.5)", // Box shadow
        }}
      >
        <img
          src="https://images.pexels.com/photos/1209462/pexels-photo-1209462.jpeg?auto=compress&cs=tinysrgb&w=800"
          alt=""
          style={{
            position: "absolute",
            width: "100%",
            height: "100%",
            objectFit: "cover",
            zIndex: -1,
            opacity: 0.9, // Set background to be translucent
          }}
        />
        {/* <video
        autoPlay
        loop
        muted
        style={{
          position: "absolute",
          width: "100%",
          height: "100%",
          objectFit: "cover",
          zIndex: -1,
          opacity: 0.9, // Set background to be translucent
        }}
      >
        <source
          src="https://player.vimeo.com/external/330241014.sd.mp4?s=062c0b46884fc98d7468a1c448568785862cd826&profile_id=164&oauth2_token_id=57447761"
          type="video/mp4"
        />
        {/* Add more video formats for better browser compatibility */}
        {/* </video> */}
        {account === "login" ? (
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              width: "100%",
            }}
          >
            <Box
              component="form"
              sx={{
                width: "100%",
                "& .MuiTextField-root": { marginBottom: "1rem" },
              }}
            >
              <TextField
                fullWidth
                required
                label="Username"
                name="username"
                value={login.username}
                onChange={onValueChange}
                variant="outlined"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <AccountCircle color="primary" />
                    </InputAdornment>
                  ),
                }}
              />

              <TextField
                fullWidth
                required
                label="Password"
                variant="outlined"
                name="password"
                value={login.password}
                onChange={onValueChange}
                type={showPassword ? "text" : "password"}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <IconButton onClick={handleTogglePassword} edge="start">
                        {showPassword ? (
                          <VisibilityOff color="error" />
                        ) : (
                          <Visibility color="primary" />
                        )}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            </Box>

            <Button
              variant="contained"
              color="primary"
              fullWidth
              onClick={handleLogin}
            >
              Login
            </Button>

            <Box sx={{ marginTop: "1rem", textAlign: "center" }}>
              <Typography variant="body2">Don't have an account?</Typography>
              <Button
                variant="outlined"
                color="primary"
                sx={{
                  "&:hover": {
                    "&::before": {
                      content: '""',
                      position: "absolute",
                      top: 0,
                      left: 0,
                      right: 0,
                      bottom: 0,
                      backdropFilter: "blur(10px)", // Apply blur effect to pseudo-element
                      zIndex: -1,
                    },
                  },
                }}
                onClick={toggleSignup}
              >
                Sign Up
              </Button>
            </Box>
            {error && <Typography color="error">{error}</Typography>}
          </Box>
        ) : (
          ///signup
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              width: "100%",
            }}
          >
            <Box
              component="form"
              sx={{
                width: "100%",
                "& .MuiTextField-root": { marginBottom: "1rem" },
              }}
            >
              <TextField
                fullWidth
                required
                label="name"
                name="name"
                value={signup.name}
                variant="outlined"
                onChange={onInputChange}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <AccountCircle color="primary" />
                    </InputAdornment>
                  ),
                }}
              />

              <TextField
                fullWidth
                required
                label="username"
                name="username"
                value={signup.username}
                onChange={onInputChange}
                variant="outlined"
                type="email"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <AlternateEmailIcon color="primary" />
                    </InputAdornment>
                  ),
                }}
              />

              <TextField
                fullWidth
                required
                label="Password"
                name="password"
                value={signup.password}
                onChange={onInputChange}
                variant="outlined"
                type={showPassword ? "text" : "password"}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <IconButton onClick={handleTogglePassword} edge="start">
                        {showPassword ? (
                          <VisibilityOff color="error" />
                        ) : (
                          <Visibility color="primary" />
                        )}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            </Box>

            <Button
              variant="contained"
              color="primary"
              fullWidth
              onClick={handleSignUp}
            >
              Signup
            </Button>

            <Box sx={{ marginTop: "1rem", textAlign: "center" }}>
              <Typography variant="body2">Already have an account?</Typography>
              <Button
                variant="outlined"
                color="primary"
                sx={{
                  "&:hover": {
                    "&::before": {
                      content: '""',
                      position: "absolute",
                      top: 0,
                      left: 0,
                      right: 0,
                      bottom: 0,
                      backdropFilter: "blur(10px)", // Apply blur effect to pseudo-element
                      zIndex: -1,
                    },
                  },
                }}
                onClick={toggleSignup}
              >
                Login
              </Button>
            </Box>
            {error && <Typography color="error">{error}</Typography>}
          </Box>
        )}
      </Container>
    </Container>
  );
};

export default LoginForm;
