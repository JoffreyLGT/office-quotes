import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import { CardContent, Typography } from "@material-ui/core";
import FormatQuoteIcon from "@material-ui/icons/FormatQuote";

const useStyles = makeStyles({
  card: {
    minWidth: 275,
    maxWidth: 500
  },
  alignLeft: {
    textAlign: "left"
  },
  alignRight: {
    textAlign: "right"
  },
  icon: {
    margin: 0
  }
});

export default ({ author, content }) => {
  const classes = useStyles();

  return (
    <Card className={classes.card}>
      <CardContent>
        <div className={classes.alignLeft}>
          <FormatQuoteIcon fontSize="large" />
        </div>
        <Typography variant="body1" component="p" className={classes.alignLeft}>
          {content}
        </Typography>
        <br />
        <Typography
          variant="body2"
          component="p"
          color="textSecondary"
          className={classes.alignRight}
        >
          {author}
        </Typography>
        <div className={classes.alignRight}>
          <FormatQuoteIcon fontSize="large" />
        </div>
      </CardContent>
    </Card>
  );
};
