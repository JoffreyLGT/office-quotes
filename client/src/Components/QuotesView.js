import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Quote from "./Quote";
import { Grid, Fab } from "@material-ui/core";
import QuoteFormDialog from "./QuoteFormDialog";
import AddIcon from "@material-ui/icons/Add";
import {
  getQuotes,
  getQuote,
  updateQuote,
  deleteQuote,
  addQuote
} from "../Helpers/data";

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
  const [hasError, setHasError] = useState(false);
  const [quotes, setQuotes] = useState([]);
  const [quoteFormContent, setQuoteFormContent] = useState(null);
  const [formEditMode, setFormEditMode] = useState(false);
  const [isFirstRender, setFirstRender] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const quotes = await getQuotes();
      if (typeof quotes.error === "undefined") {
        setQuotes(quotes);
      } else {
        setHasError(true);
      }
    };
    if (isFirstRender) {
      fetchData();
      setFirstRender(false);
    }
  }, [isFirstRender]);

  const addQuoteInDb = async () => {
    const newQuote = {
      ...quoteFormContent,
      date: new Date(Date.now()).toISOString()
    };
    await addQuote(newQuote);
    setQuotes(await getQuotes());
    handleCloseDialog();
  };

  const editQuoteInDb = async () => {
    const result = await updateQuote(quoteFormContent._id, quoteFormContent);
    if (typeof result.error !== "undefined") {
      alert(
        "Impossible to save the quote, please check your connection and try again."
      );
      return;
    }
    setQuotes(await getQuotes());
    handleCloseDialog();
  };

  const removeQuoteInDb = async id => {
    const result = await deleteQuote(id);
    if (typeof result.error !== "undefined") {
      alert(
        "Impossible to save the quote, please check your connection and try again."
      );
      return;
    }
    setQuotes(await getQuotes());
  };

  const setQuoteAsFavoriteInDb = id => {
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
    setQuoteAsFavoriteInDb(id);
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
  const handleEditQuote = async id => {
    setFormEditMode(true);
    setQuoteFormContent(await getQuote(id));
    setIsDialogOpened(true);
  };

  if (hasError)
    return (
      <h1>
        Error: impossible to reach the server, please check your connection and
        try again.
      </h1>
    );

  return (
    <div className={classes.root}>
      <Grid container spacing={2}>
        {quotes &&
          quotes.map((quote, i) => (
            <Grid key={i} item xs>
              <Quote
                {...quote}
                handleEditQuote={handleEditQuote}
                handleDeleteQuote={removeQuoteInDb}
                handleFavoriteQuote={handleFavoriteQuote}
              />
            </Grid>
          ))}
      </Grid>
      {/* <Fab
        color="primary"
        aria-label="add"
        className={classes.fab}
        onClick={handleAddQuote}
      >
        <AddIcon />
      </Fab>
      <QuoteFormDialog
        onValidate={formEditMode ? editQuoteInDb : addQuoteInDb}
        isOpened={isDialogOpened}
        handleCloseDialog={handleCloseDialog}
        handleQuoteFormChange={handleQuoteFormChange}
        {...quoteFormContent}
      /> */}
    </div>
  );
};
