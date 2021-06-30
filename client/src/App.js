import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import Login from "./components/Login";
import Homepage from "./components/Homepage";

function App() {
  return (
    <div className="App">
      <Router>
        <AuthProvider>
          <Switch>
            <Route path="/" exact component={Homepage} />
            <Route path="/login" exact component={Login} />
            <Route
              path="*"
              component={() => (
                <h2 style={{ textAlign: "center" }}>
                  404 Error Page not exist
                </h2>
              )}
            />
          </Switch>
        </AuthProvider>
      </Router>
    </div>
  );
}

export default App;
