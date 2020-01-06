import React, { useState } from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import {
  Typography,
  Container,
  Avatar,
  Button,
  TextField
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { login } from "../Helpers/data";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles(theme => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1)
  },
  submit: {
    margin: theme.spacing(3, 0, 2)
  }
}));

const SignInView = ({ setUser }) => {
  const classes = useStyles();
  const [formData, setFormData] = useState({ name: "", password: "" });

  let history = useHistory();

  const onSubmit = async evt => {
    evt.preventDefault();
    const result = await login(formData.name, formData.password);
    if (typeof result.error === "undefined") {
      setUser(result);
      history.push("/");
    }
  };

  const onChange = evt => {
    switch (evt.target.name) {
      case "name":
        setFormData({ ...formData, name: evt.target.value });
        break;
      case "password":
        setFormData({ ...formData, password: evt.target.value });
        break;
      default:
        break;
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <form className={classes.form} onSubmit={onSubmit}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="name"
            label="Username"
            name="name"
            autoComplete="username"
            autoFocus
            value={formData.name}
            onChange={onChange}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            value={formData.password}
            onChange={onChange}
          />
          <Button
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            type="submit"
          >
            Sign In
          </Button>
        </form>
      </div>
    </Container>
  );
};

export default SignInView;
