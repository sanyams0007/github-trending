import React, { useEffect, useState } from "react";
import axios from "axios";

import { useAuth } from "../context/AuthContext";

import Header from "./Header";
import RepoCard from "./RepoCard";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";

const Homepage = ({ history }) => {
  const { user } = useAuth();
  const [repos, setRepos] = useState();

  useEffect(() => {
    if (!user) {
      history.push("/login");
      return;
    }

    const getTrending = async () => {
      try {
        const res = await axios.get("/getTrendingRepos");
        const { data } = res.data;
        setRepos(data.slice(0, 10));
      } catch (error) {
        console.log(error);
      }
    };
    getTrending();
  }, [user, history]);

  return (
    <>
      <Header />
      <Typography align="center" variant="h6" gutterBottom>
        Top 10 Trending Repos
      </Typography>
      <Grid
        item
        xs={10}
        container
        alignContent="flex-start"
        spacing={3}
        style={{ margin: "0 auto" }}
      >
        {repos &&
          repos.map((repo) => (
            <Grid key={repo.reponame} item xs={12} sm={6} md={4}>
              <RepoCard repoDetail={repo} />
            </Grid>
          ))}
      </Grid>
    </>
  );
};

export default Homepage;
