import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Avatar from "@material-ui/core/Avatar";
import { useAuth } from "../context/AuthContext";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    marginBottom: 20,
  },
  title: {
    flexGrow: 1,
  },
}));

export default function ButtonAppBar() {
  const classes = useStyles();
  const { user, setUser } = useAuth();
  const history = useHistory();

  const logout = () => {
    setUser(null);
    localStorage.clear();
    history.push("/login");
  };

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h4" className={classes.title}>
            Github Trending Repos
          </Typography>
          {
            <Typography variant="h6" className={classes.title}>
              Welcome, {user && user.name}
            </Typography>
          }
          <Avatar
            style={{ margin: "10px" }}
            alt={user && user.name}
            src={user && user?.avatar_url}
          />
          <Button onClick={logout} color="inherit">
            Logout
          </Button>
        </Toolbar>
      </AppBar>
    </div>
  );
}
