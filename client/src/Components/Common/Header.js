import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Avatar,
  Popover
} from "@material-ui/core";
import RecordVoiceOverIcon from "@material-ui/icons/RecordVoiceOver";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import { Link } from "react-router-dom";
import { logout } from "../../Helpers/data";

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
  },
  logoutIcon: {
    marginRight: theme.spacing(1)
  }
}));

const Header = ({ user, setUser }) => {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);

  const openUserDropdown = event => {
    setAnchorEl(event.currentTarget);
  };

  const closeUserDropdown = () => {
    setAnchorEl(null);
  };

  const onLogout = async () => {
    await logout();
    localStorage.removeItem("_id");
    localStorage.removeItem("name");
    localStorage.removeItem("token");
    localStorage.removeItem("isAdmin");
    setAnchorEl(null);
    setUser(undefined);
  };

  const open = Boolean(anchorEl);
  const id = open ? "user-popover" : undefined;

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
          <>
            <div
              aria-describedby={id}
              className={classes.user}
              onClick={openUserDropdown}
            >
              <Avatar className={classes.avatar}>
                {user.name.substring(0, 1).toUpperCase()}
              </Avatar>
              <Typography variant="body1" className={classes.userName}>
                {user.name}
              </Typography>
            </div>
            <Popover
              id={id}
              open={open}
              anchorEl={anchorEl}
              onClose={closeUserDropdown}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "right"
              }}
              transformOrigin={{
                vertical: "top",
                horizontal: "right"
              }}
            >
              <Button onClick={onLogout}>
                <ExitToAppIcon className={classes.logoutIcon} />
                Logout
              </Button>
            </Popover>
          </>
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
