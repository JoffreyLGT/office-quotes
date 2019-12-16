import React from "react";
import { Typography, Link } from "@material-ui/core";

export default () => {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="https://github.com/JoffreyLGT">
        Joffrey LAGUT
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
};
