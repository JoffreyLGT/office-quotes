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
  const [quotes, setQuotes] = useState([]);
  const [quoteFormContent, setQuoteFormContent] = useState(null);
  const [formEditMode, setFormEditMode] = useState(false);
  const [isFirstRender, setFirstRender] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const quotes = await getQuotes();
      setQuotes(quotes);
    };
    if (isFirstRender) {
      fetchData();
      setFirstRender(false);
    }
  }, [isFirstRender]);

  const addNewQuote = async () => {
    const newQuote = {
      ...quoteFormContent,
      date: new Date(Date.now()).toISOString()
    };
    await addQuote(newQuote);
    setQuotes(await getQuotes());
    handleCloseDialog();
  };

  const editQuote = async () => {
    await updateQuote(quoteFormContent._id, quoteFormContent);
    setQuotes(await getQuotes());
    handleCloseDialog();
  };

  const removeQuote = async id => {
    await deleteQuote(id);
    setQuotes(await getQuotes());
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
  const handleEditQuote = async id => {
    setFormEditMode(true);
    setQuoteFormContent(await getQuote(id));
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
                handleDeleteQuote={removeQuote}
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
        onValidate={formEditMode ? editQuote : addNewQuote}
        isOpened={isDialogOpened}
        handleCloseDialog={handleCloseDialog}
        handleQuoteFormChange={handleQuoteFormChange}
        {...quoteFormContent}
      />
    </div>
  );
};
