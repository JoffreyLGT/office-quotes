import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Quote from "./Quote";
import { Grid } from "@material-ui/core";
import { quoteSamples } from "../Helpers/data";
import AddQuotes from "./AddQuote";

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(3, 2),
    minHeight: "85vh"
  },
  title: {
    marginBottom: 16
  }
}));

export default () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Grid container spacing={2}>
        {quotes &&
          quotes.map(({ author, content }, i) => (
            <Grid key={i} item xs>
              <Quote author={author} content={content} />
            </Grid>
          ))}
      </Grid>
    </div>
  );
};
