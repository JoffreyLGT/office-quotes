import React, { Fragment } from "react";
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  TextField,
  DialogActions
} from "@material-ui/core/";

export default ({
  author = "",
  content = "",
  onValidate = () => {},
  isOpened,
  handleCloseDialog = () => {},
  handleQuoteFormChange = () => () => {}
}) => {
  return (
    <Fragment>
      <Dialog
        open={isOpened}
        onClose={handleCloseDialog}
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
            onChange={evt => handleQuoteFormChange("author")(evt.target.value)}
          />
          <TextField
            margin="dense"
            id="content"
            label="Quote"
            fullWidth
            multiline
            rows="4"
            value={content}
            onChange={evt => handleQuoteFormChange("content")(evt.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleCloseDialog}
            color="primary"
            aria-label="cancel"
          >
            Cancel
          </Button>
          <Button onClick={onValidate} color="primary" aria-label="send">
            Send
          </Button>
        </DialogActions>
      </Dialog>
    </Fragment>
  );
};
