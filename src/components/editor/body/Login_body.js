import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import CloseIcon from "@mui/icons-material/Close";
import MuiAlert from "@mui/material/Alert";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import IconButton from "@mui/material/IconButton";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import jwt_decode from "jwt-decode";
import React, { useContext, useState, useCallback } from "react";
import { useHistory } from "react-router-dom";
import { AlertContext } from "../../../Providers/AlertDialogProvider";
import { url } from "../../../url";
import "../css/login.css";

function Login_body() {
  const history = useHistory();
  const { setMessage, setSeverity, setOpenAlert } = useContext(AlertContext);
  const [login, setLogin] = useState({ username: "", password: "" });

  const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });

  const [open, setOpen] = React.useState(false);
  const [openOTP, setOpenOTP] = React.useState(false);
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
    setOpenOTP(false);
  };

  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));
  const handleClickOpen = () => {
    setOpenOTP(true);
  };

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setLogin({ ...login, [name]: value });
  };

  const handleLogin = useCallback(
    async (e) => {
      e.preventDefault();
      const response = await fetch(url + "User/Login", {
        method: "post",

        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          username: login.username,
          password: login.password,
        }),
      });
      //reporter 1, editor 2, publisher 3, admin 4
      if (response.status >= 200 && response.status <= 299) {
        const data = await response.json();
        if (data.isSuccess == true) {
          if (
            jwt_decode(data.content.token)[
              `http://schemas.microsoft.com/ws/2008/06/identity/claims/role`
            ] === "5"
          ) {
            //editor
            sessionStorage.setItem("token", data.content.token);
            history.push({
              pathname: "/reports",
            });
          } else if (
            jwt_decode(data.content.token)[
              `http://schemas.microsoft.com/ws/2008/06/identity/claims/role`
            ] === "6"
          ) {
            //publisher
            sessionStorage.setItem("token", data.content.token);
            history.push({
              pathname: "/publisher_news",
            });
          } else if (
            jwt_decode(data.content.token)[
              `http://schemas.microsoft.com/ws/2008/06/identity/claims/role`
            ] === "7"
          ) {
            //admin
            sessionStorage.setItem("token", data.content.token);
            history.push({
              pathname: "/publishers",
            });
          } else if (
            jwt_decode(data.content.token)[
              `http://schemas.microsoft.com/ws/2008/06/identity/claims/role`
            ] === "3"
          ) {
            //reporter
            sessionStorage.setItem("token", data.content.token);
            history.push({
              pathname: "/reporter_page",
            });
          }
        } else {
          setOpenAlert(true);
          setMessage(data.message);
          setSeverity("error");
        }
      }
    },
    [
      history,
      login.password,
      login.username,
      setMessage,
      setOpenAlert,
      setSeverity,
    ]
  );

  const handleSubmitForm = useCallback(
    (e) => {
      e.preventDefault();

      if (!login.username) {
        setOpenAlert(true);
        setMessage("The Username field is required");
        setSeverity("warning");
      } else if (!login.password) {
        setOpenAlert(true);
        setMessage("The Password field is required");
        setSeverity("warning");
      } else handleLogin(e);
    },
    [
      handleLogin,
      login.password,
      login.username,
      setMessage,
      setOpenAlert,
      setSeverity,
    ]
  );
  return (
    <div className="main_body_login">
      <div className="login_form_container">
        <h2>CJS</h2>
        <form className="login_form" onSubmit={handleSubmitForm} noValidate>
          <TextField
            id="username"
            label="Username"
            name="username"
            variant="outlined"
            value={login.username}
            onChange={handleChange}
            required
            style={{
              width: "400px",
              marginTop: "20px",
              backgroundColor: "#f3f5f9",
            }}
          />
          <TextField
            id="password"
            label="Password"
            name="password"
            type="password"
            variant="outlined"
            value={login.password}
            onChange={handleChange}
            required
            style={{
              width: "400px",
              marginTop: "10px",
              backgroundColor: "#f3f5f9",
            }}
          />
          {/* <p
            style={{ fontSize: "15px", textAlign: "end", marginTop: "10px" }}
          ></p> */}

          <div className="sign_in_button">
            <Button
              // onClick={handleSubmit}
              type="submit"
              variant="contained"
              color="primary"
              style={{
                backgroundColor: "#2f4050",
                width: "300px",
                marginTop: "10px",
              }}
            >
              LogIn
            </Button>
          </div>
          <div className="forgot_password">
            <p
              style={{ fontWeight: "bold", fontSize: "14px" }}
              onClick={handleClickOpen}
            >
              Forgot Password?
            </p>
          </div>
        </form>
      </div>

      <Dialog
        fullScreen={fullScreen}
        open={openOTP}
        // onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="responsive-dialog-title">
          Enter Verification Code
          <IconButton
            aria-label="close"
            onClick={handleClose}
            sx={{
              position: "absolute",
              right: 8,
              top: 8,
              color: (theme) => theme.palette.grey[500],
            }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent
          style={{ display: "grid", gridTemplateColumns: "auto auto" }}
        >
          <DialogContentText style={{ marginTop: "20px" }}>
            Verification Code
          </DialogContentText>

          <TextField
            id="outlined-basic"
            label=" Verification Code"
            variant="outlined"
            size="small"
            style={{
              backgroundColor: "white",
              marginLeft: "10px",
              marginTop: "10px",
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button autoFocus color="primary">
            Verify
          </Button>
          <Button onClick={handleClose} autoFocus style={{ color: "red" }}>
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default Login_body;
