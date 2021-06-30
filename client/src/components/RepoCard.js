import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Avatar from "@material-ui/core/Avatar";
import Chip from "@material-ui/core/Chip";
import StarIcon from "@material-ui/icons/Star";
import DoneIcon from "@material-ui/icons/Done";

const useStyles = makeStyles({
  root: {
    minWidth: 275,
    background: "rgb(33,150,243,.1)",
    borderColor: "rgb(33,150,243)",
  },
  title: {
    fontSize: 16,
  },
  stats: {
    display: "flex",
    marginBottom: 12,
  },
  build: {
    display: "flex",
    "& > *": {
      margin: "8px",
    },
  },
});

export default function RepoCard({ repoDetail }) {
  const classes = useStyles();

  return (
    <Card className={classes.root} variant="outlined">
      <CardContent style={{ paddingBottom: "10px" }}>
        <Typography
          variant="h5"
          component="h2"
          color="textPrimary"
          gutterBottom
        >
          {repoDetail.reponame}
        </Typography>
        <div>
          <Typography variant="caption">author : </Typography>
          <Chip
            avatar={<Avatar>{repoDetail.author.slice(0, 1)}</Avatar>}
            label={repoDetail.author}
            deleteIcon={<DoneIcon />}
          />
        </div>
        <Typography variant="body2" component="p" style={{ margin: "7px 0" }}>
          {repoDetail.repodesc}
        </Typography>

        <div className={classes.stats}>
          <StarIcon fontSize="small" color="secondary" />
          <Typography component="legend">{repoDetail.stars}</Typography>
        </div>
        <Typography variant="caption">Built by : </Typography>
        <div className={classes.build}>
          {repoDetail.builtby &&
            repoDetail.builtby.map(({ avatar, username, url }) => (
              <a href={url} rel="noreferrer" target="_blank" key={username}>
                <Avatar alt={username} src={avatar} />
              </a>
            ))}
        </div>
      </CardContent>
      <CardActions>
        <a
          style={{ textDecoration: "none" }}
          href={repoDetail.repourl}
          rel="noreferrer"
          target="_blank"
          key={repoDetail.author}
        >
          <Button size="small">Learn More</Button>
        </a>
      </CardActions>
    </Card>
  );
}
