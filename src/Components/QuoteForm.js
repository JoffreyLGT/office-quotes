import React, { Fragment } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Fab,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  TextField,
  DialogActions
} from "@material-ui/core/";
import AddIcon from "@material-ui/icons/Add";

const useStyles = makeStyles(theme => ({
  fab: {
    position: "fixed",
    bottom: theme.spacing(4),
    right: theme.spacing(4)
  }
}));
export default ({ onSend }) => {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [author, setAuthor] = React.useState("");
  const [content, setContent] = React.useState("");

  const openDialog = () => {
    setOpen(true);
  };

  const closeDialog = () => {
    setOpen(false);
    setAuthor("");
    setContent("");
  };

  const addNewQuote = () => {
    onSend(author, content);
    closeDialog();
  };

  return (
    <Fragment>
      <Fab
        color="primary"
        aria-label="add"
        className={classes.fab}
        onClick={openDialog}
      >
        <AddIcon />
      </Fab>
      <Dialog
        open={open}
        onClose={closeDialog}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Add a new quote</DialogTitle>
        <DialogContent>
          <DialogContentText>
            You heard something funny at work?
            <br />
            Please tell us.
          </DialogContentText>
          <TextField
            margin="dense"
            id="author"
            label="Author"
            fullWidth
            value={author}
            onChange={evt => setAuthor(evt.target.value)}
          />
          <TextField
            margin="dense"
            id="content"
            label="Quote"
            fullWidth
            multiline
            rows="4"
            value={content}
            onChange={evt => setContent(evt.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={closeDialog} color="primary" aria-label="cancel">
            Cancel
          </Button>
          <Button onClick={addNewQuote} color="primary" aria-label="send">
            Send
          </Button>
        </DialogActions>
      </Dialog>
    </Fragment>
  );
};
