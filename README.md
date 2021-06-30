# Github Trending App

Web app built with React, Node.js, and
Express for getting Github Trending repository
data with user authentication using Github OAuth

## Environment Variables Setup:

To run this project, you will need to create .env file in `root directory` and `client directory`
and add the following environment variables to your .env file

.env in root directory

`GITHUB_APP_CLIENT_SECRET = YOUR_GITHUB_APP_CLIENT_SECRET`
`GITHUB_APP_CLIENT_ID = YOUR_GITHUB_APP_CLIENT_ID`

.env in client directory inside root directory

`REACT_APP_CLIENT_ID = YOUR_GITHUB_APP_CLIENT_ID`

## Run Locally

Clone the project

```bash
  git clone https://github.com/sanyams0007/github-trending.git
```

Go to the project directory

```bash
  cd github-trending
```

Install dependencies for both client and server side to start the app

```bash
  npm i && npm start
  cd ./client
  npm i && npm start
```
