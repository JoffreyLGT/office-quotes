import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Quote from "./Quote";
import { Grid, Fab } from "@material-ui/core";
import { quoteSamples } from "../Helpers/data";
import QuoteFormDialog from "./QuoteFormDialog";
import AddIcon from "@material-ui/icons/Add";

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(3, 2),
    minHeight: "84vh"
  },
  title: {
    marginBottom: 16
  },
  fab: {
    position: "fixed",
    bottom: theme.spacing(4),
    right: theme.spacing(4)
  }
}));

export default () => {
  const classes = useStyles();
  const [isDialogOpened, setIsDialogOpened] = useState(false);
  const [quotes, setQuotes] = useState(quoteSamples);
  const [quoteFormContent, setQuoteFormContent] = useState(null);
  const [formEditMode, setFormEditMode] = useState(false);

  const addQuote = () => {
    // TODO Move the content of this function in a specific file to not have to change it when we install the API
    const lastId = quotes.reduce(
      (biggestId, { id }) => (biggestId < id ? id : biggestId),
      0
    );
    const newQuotes = [...quotes];
    newQuotes.unshift({
      id: lastId + 1,
      ...quoteFormContent,
      date: new Date(Date.now()).toISOString()
    });
    setQuotes(newQuotes);
    handleCloseDialog();
  };

  const editQuote = () => {
    // TODO Move the content of this function in a specific file to not have to change it when we install the API
    setQuotes(
      quotes.map(quote =>
        quote.id === quoteFormContent.id ? quoteFormContent : quote
      )
    );
    handleCloseDialog();
  };

  const deleteQuote = id => {
    // TODO Move the content of this function in a specific file to not have to change it when we install the API
    setQuotes(quotes.filter(quote => quote.id !== id));
  };

  const setFavoriteQuote = id => {
    // TODO Move the content of this function in a specific file to not have to change it when we install the API
    // TODO
  };
  /**
   * Called when there is a change in the QuoteForm inputs.
   * Updates quoteFormContent with the new value.
   * @param {string} propName name of the prop that changes
   */
  const handleQuoteFormChange = propName => value => {
    switch (propName) {
      case "author":
        setQuoteFormContent({ ...quoteFormContent, author: value });
        break;
      case "content":
        setQuoteFormContent({ ...quoteFormContent, content: value });
        break;
      default:
        break;
    }
  };

  /**
   * Called when the dialog is closed.
   * Closes the dialog and reset the quote form content.
   */
  const handleCloseDialog = () => {
    setIsDialogOpened(false);
    setQuoteFormContent(null);
    setFormEditMode(false);
  };

  const handleFavoriteQuote = id => {
    console.info(`You want to favorite the quote ${id}.`);
    setFavoriteQuote(id);
  };

  /**
   * Called when the user clicks on the add button.
   * Opens the dialog.
   */
  const handleAddQuote = () => {
    setIsDialogOpened(true);
  };

  /**
   * Called when the users clicks on the edit button of a quote.
   * Fill the form with the quote.
   * @param {number} id of the quote to edit
   */
  const handleEditQuote = id => {
    setFormEditMode(true);
    setQuoteFormContent(quotes.find(quote => quote.id === id));
    setIsDialogOpened(true);
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
                handleDeleteQuote={deleteQuote}
                handleFavoriteQuote={handleFavoriteQuote}
              />
            </Grid>
          ))}
      </Grid>
      <Fab
        color="primary"
        aria-label="add"
        className={classes.fab}
        onClick={handleAddQuote}
      >
        <AddIcon />
      </Fab>
      <QuoteFormDialog
        onValidate={formEditMode ? editQuote : addQuote}
        isOpened={isDialogOpened}
        handleCloseDialog={handleCloseDialog}
        handleQuoteFormChange={handleQuoteFormChange}
        {...quoteFormContent}
      />
    </div>
  );
};
