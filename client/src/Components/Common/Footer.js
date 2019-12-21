import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Typography, Link } from "@material-ui/core";

const useStyles = makeStyles(theme => ({
  footerClass: {
    marginBottom: theme.spacing(2)
  }
}));

export default () => {
  const { footerClass } = useStyles();
  return (
    <Typography
      variant="body2"
      color="textSecondary"
      align="center"
      className={footerClass}
    >
      {"Copyright © "}
      <Link color="inherit" href="https://github.com/JoffreyLGT">
        Joffrey LAGUT
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
};
