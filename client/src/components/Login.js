import React, { useEffect, useState } from "react";
//import GitHubLogin from "react-github-login";
import axios from "axios";

import { useAuth } from "../context/AuthContext";
import { makeStyles } from "@material-ui/core/styles";

import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import GitHubIcon from "@material-ui/icons/GitHub";
import Box from "@material-ui/core/Box";
import { Link } from "react-router-dom";

const useStyles = makeStyles({
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    fontFamily: "Arial",
  },
  box: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-evenly",
    boxShadow: "0 1px 4px 0 rgba(0, 0, 0, 0.2)",
    width: "400px",
    height: "45%",
  },
  link: {
    padding: "8px 20px",
    borderRadius: "3px",
    backgroundColor: "#000",
    textDecoration: "none",
    color: "#fff",
    textTransform: "uppercase",
    cursor: "default",
    display: "flex",
    alignItems: "center",
    height: "40px",
  },
});

const Login = ({ history }) => {
  const { user, setUser } = useAuth();
  const [error, setError] = useState(null);
  const classes = useStyles();
  const redirect_uri = "http://localhost:3000/login";

  useEffect(() => {
    if (user) {
      history.push("/");
      return;
    }

    // After requesting Github access, Github redirects back to your app with a code parameter
    const url = window.location.href;
    const hasCode = url.includes("?code=");

    // If Github API returns the code parameter
    if (hasCode) {
      const newUrl = url.split("?code=");
      window.history.pushState({}, null, newUrl[0]);

      const code = newUrl[1];

      // Use code parameter and other parameters to make get request to server
      axios
        .get(`/user/signin/callback?code=${code}`)
        .then((response) => response.data)
        .then((userdata) => {
          const { avatar_url, email, id, login, name } = userdata.data;

          setUser({
            avatar: avatar_url,
            email: email,
            id: id,
            username: login,
            name: name,
            isAuthenticated: true,
          });

          localStorage.setItem(
            "user",
            JSON.stringify({ avatar_url, email, id, login, name })
          );
        })
        .catch((error) => {
          console.log(error);
          setError("Sorry! Login failed");
        });
    }
  }, []);

  // ALternative Way
  /* const onSuccessGithub = async ({ code }) => {
    try {
      const gitUser = await axios.get(`/user/signin/callback?code=${code}`);
      const { data } = gitUser.data;
      const { avatar_url, email, id, login, name } = data;

      setUser({
        avatar: avatar_url,
        email: email,
        id: id,
        username: login,
        name: name,
        isAuthenticated: true,
      });

      localStorage.setItem(
        "user",
        JSON.stringify({ avatar_url, email, id, login, name })
      );
    } catch (error) {
      console.log(error);
      setError(error.res.data.message);
    }
  }; 

  const onFailure = (response) => console.error(response);
  */

  return (
    <Container className={classes.container} component="div" maxWidth="xl">
      <Box className={classes.box}>
        <Typography variant="h4" gutterBottom>
          Welcome to App
        </Typography>
        {error && (
          <span style={{ margin: "10px 0 20px", color: "red" }}>{error}</span>
        )}
        <div className="login-container">
          <a
            className={classes.link}
            href={`https://github.com/login/oauth/authorize?scope=user&client_id=${process.env.REACT_APP_CLIENT_ID}&redirect_uri=${redirect_uri}`}
          >
            <GitHubIcon />
            <span style={{ marginLeft: "5px" }}>Login with GitHub</span>
          </a>
        </div>
        {/* <GitHubLogin
          clientId={process.env.REACT_APP_CLIENT_ID}
          onSuccess={onSuccessGithub}
          onFailure={onFailure}
          buttonText="Sign in with Github"
          className="git-login"
          valid={true}
          redirectUri="http://localhost:3000/login"
        /> */}
      </Box>
    </Container>
  );
};

export default Login;
