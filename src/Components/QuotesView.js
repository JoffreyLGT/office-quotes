import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Quote from "./Quote";
import { Grid } from "@material-ui/core";
import { quoteSamples } from "../Helpers/data";
import AddQuotes from "./AddQuote";

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(3, 2),
    minHeight: "84vh"
  },
  title: {
    marginBottom: 16
  }
}));

export default () => {
  const classes = useStyles();
  const [quotes, setQuotes] = useState(quoteSamples);

  const addQuote = (author, content) => {
    setQuotes([...quotes, { author, content }]);
  };

  const handleFavoriteQuote = id => {
    console.info(`You want to favorite the quote ${id}.`);
  };

  const handleEditQuote = id => {
    console.info(`You want to edit the quote ${id}.`);
  };

  const handleDeleteQuote = id => {
    console.info(`You want to delete the quote ${id}.`);
  };

  return (
    <div className={classes.root}>
      <Grid container spacing={2}>
        {quotes &&
          quotes.map((quote, i) => (
            <Grid key={i} item xs>
              <Quote
                {...quote}
                handleEditQuote={handleEditQuote}
                handleDeleteQuote={handleDeleteQuote}
                handleFavoriteQuote={handleFavoriteQuote}
              />
            </Grid>
          ))}
      </Grid>
      <AddQuotes onSend={addQuote} />
    </div>
  );
};
