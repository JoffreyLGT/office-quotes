import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { AppBar, Toolbar, Typography, Button } from "@material-ui/core";
import RecordVoiceOverIcon from "@material-ui/icons/RecordVoiceOver";

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
    display: "flex"
  },
  titleText: {
    lineHeight: 2
  }
}));

export default () => {
  const classes = useStyles();
  return (
    <AppBar position="static">
      <Toolbar>
        <div className={classes.titleDiv}>
          <RecordVoiceOverIcon fontSize="large" className={classes.icon} />
          <Typography variant="h6" className={classes.titleText}>
            Office quotes
          </Typography>
        </div>
        <Button color="inherit">Login</Button>
      </Toolbar>
    </AppBar>
  );
};
