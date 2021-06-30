const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const axios = require("axios");
const githubTrends = require("github-trends-api");

const PORT = process.env.PORT || 5000;
const app = express();

//Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

//Config
dotenv.config({ path: ".env" });
const corsOptions = {
  origin: "http://localhost:3000",
};

/* app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "http://localhost:3000"); // update to match the domain you will make the request from
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
}); */

//Routes
app.get("/", (req, res) => res.send("Hi there from server"));

// This function runs if the http://localhost:5000/getTrendingRepos endpoint
// is requested with a GET request
app.get("/getTrendingRepos", cors(corsOptions), async (req, res) => {
  try {
    const response = await githubTrends();
    console.log(response.length);
    res.status(200).json({ data: response });
  } catch (error) {
    console.log(error);
  }
});

app.get("/user/signin/callback", cors(corsOptions), async (req, res, next) => {
  const { query } = req;
  const { code } = query;

  if (!code) {
    return res.status(404).json({
      success: false,
      message: "No Code found",
    });
  }

  let requestEndpoint = "https://github.com/login/oauth/access_token";

  /* axios.post(requestEndpoint, {
      data: {
        client_id: process.env.GITHUB_APP_CLIENT_ID,
        client_secret: process.env.GITHUB_APP_CLIENT_SECRET,
        code: code,
        redirect_uri: "http://localhost:3000/login",
      },
    })
    .then((response) => {
      console.log(response.data);
    }).cath */

  const fetchOptions = {
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    data: {
      client_id: process.env.GITHUB_APP_CLIENT_ID,
      client_secret: process.env.GITHUB_APP_CLIENT_SECRET,
      code: code,
    },
  };

  try {
    const token = await axios.post(requestEndpoint, fetchOptions.data, {
      headers: fetchOptions.headers,
    });

    const { access_token } = token.data;

    if (!access_token) {
      return res.status(404).json({
        success: false,
        message: "No Token found",
      });
    }

    const user = await axios.get("https://api.github.com/user", {
      headers: { Authorization: `token ${access_token}` },
    });

    res.status(200).send({
      success: true,
      data: user.data,
    });
  } catch (error) {
    console.log(error);
  }
});

app.listen(PORT, () => {
  console.log(`Server listening at http://localhost:${PORT}`);
});
