import React, { Fragment } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Card,
  CardHeader,
  CardContent,
  Typography,
  IconButton,
  Popper,
  Grow,
  Paper,
  ClickAwayListener,
  MenuList,
  MenuItem
} from "@material-ui/core";
import FormatQuoteIcon from "@material-ui/icons/FormatQuote";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import FavoriteIcon from "@material-ui/icons/Favorite";

const useStyles = makeStyles(theme => ({
  card: {
    minWidth: 275,
    maxWidth: 500
  },
  cardHeader: {
    paddingBottom: 0
  },
  cardContent: {
    paddingTop: 0
  },
  quoteContent: {
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(1),
    textAlign: "left"
  },
  alignRight: {
    textAlign: "right"
  },
  icon: {
    margin: 0
  }
}));

export default ({
  _id,
  author,
  content,
  date,
  userId,
  handleEditQuote,
  handleDeleteQuote,
  handleFavoriteQuote,
  user
}) => {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef(null);

  const handleToggle = () => {
    setOpen(prevOpen => !prevOpen);
  };

  return (
    <Card className={classes.card}>
      <CardHeader
        className={classes.cardHeader}
        avatar={<FormatQuoteIcon fontSize="large" />}
        action={
          user &&
          (user.isAdmin === true || user._id === userId) && (
            <div>
              <IconButton
                aria-label="add to favorites"
                onClick={() => {
                  handleFavoriteQuote(_id);
                }}
              >
                <FavoriteIcon />
              </IconButton>
              <IconButton
                data-testid="actions"
                aria-label="actions"
                aria-expanded={open ? "true" : undefined}
                ref={anchorRef}
                aria-haspopup="menu"
                onClick={handleToggle}
              >
                <MoreVertIcon />
              </IconButton>
              <Popper
                open={open}
                anchorEl={anchorRef.current}
                role={undefined}
                transition
                disablePortal
              >
                {({ TransitionProps }) => (
                  <Grow
                    {...TransitionProps}
                    style={{
                      transformOrigin: "center top"
                    }}
                  >
                    <Paper>
                      <ClickAwayListener onClickAway={handleToggle}>
                        <MenuList>
                          <MenuItem
                            onClick={() => {
                              setOpen(false);
                              handleEditQuote(_id);
                            }}
                          >
                            Edit
                          </MenuItem>
                          <MenuItem
                            onClick={() => {
                              setOpen(false);
                              handleDeleteQuote(_id);
                            }}
                          >
                            Delete
                          </MenuItem>
                        </MenuList>
                      </ClickAwayListener>
                    </Paper>
                  </Grow>
                )}
              </Popper>
            </div>
          )
        }
      />
      <CardContent className={classes.cardContent}>
        <Typography
          variant="body1"
          component="p"
          className={classes.quoteContent}
        >
          {typeof content !== "undefined" &&
            content.split("\n").map((line, i) =>
              i > 0 ? (
                <Fragment key={`line-${i}`}>
                  <br />
                  <span>{line}</span>
                </Fragment>
              ) : (
                <span key={`line-${i}`}>{line}</span>
              )
            )}
        </Typography>
        <div className={classes.alignRight}>
          <FormatQuoteIcon fontSize="large" />
        </div>
        <Typography
          variant="body2"
          component="p"
          color="textSecondary"
          className={classes.alignRight}
        >
          {author}
        </Typography>
      </CardContent>
    </Card>
  );
};
