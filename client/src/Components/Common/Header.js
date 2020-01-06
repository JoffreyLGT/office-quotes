import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { AppBar, Toolbar, Typography, Button, Avatar } from "@material-ui/core";
import RecordVoiceOverIcon from "@material-ui/icons/RecordVoiceOver";
import { Link } from "react-router-dom";

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  icon: {
    marginRight: theme.spacing(1)
  },
  titleDiv: {
    flexGrow: 1,
    textAlign: "left",
    display: "flex",
    textDecoration: "none",
    color: "inherit"
  },
  titleText: {
    lineHeight: 2
  },
  loginButton: {
    textDecoration: "none",
    color: "inherit"
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main
  },
  user: {
    display: "flex",
    lineHeight: 2
  },
  userName: {
    marginTop: "auto",
    marginBottom: "auto"
  }
}));

const Header = ({ user }) => {
  const classes = useStyles();

  return (
    <AppBar position="static">
      <Toolbar>
        <Link to="/" className={classes.titleDiv}>
          <RecordVoiceOverIcon fontSize="large" className={classes.icon} />
          <Typography variant="h6" className={classes.titleText}>
            Office quotes
          </Typography>
        </Link>
        {typeof user !== "undefined" ? (
          <div className={classes.user}>
            <Avatar className={classes.avatar}>
              {user.name.substring(0, 1).toUpperCase()}
            </Avatar>
            <Typography variant="body1" className={classes.userName}>
              {user.name}
            </Typography>
          </div>
        ) : (
          <Link to="/signin" className={classes.loginButton}>
            <Button color="inherit">Login</Button>
          </Link>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Header;
