import React, { useState, useEffect } from "react";
import "./App.css";
import "typeface-roboto";
import QuotesView from "./Components/QuotesView";
import SignInView from "./Components/SignInView";
import { Header, Footer } from "./Components/Common";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

const App = () => {
  const getUserFromLocalStorage = () => {
    const user = {
      _id: localStorage.getItem("_id"),
      name: localStorage.getItem("name"),
      token: localStorage.getItem("token"),
      isAdmin: localStorage.getItem("isAdmin") == "true"
    };
    return user._id === null ? undefined : user;
  };

  const [user, setUser] = useState(getUserFromLocalStorage);

  useEffect(() => {
    if (user) {
      localStorage.setItem("_id", user._id);
      localStorage.setItem("name", user.name);
      localStorage.setItem("token", user.token);
      localStorage.setItem("isAdmin", user.isAdmin);
    }
  }, [user]);

  return (
    <div className="App">
      <Router>
        <Header user={user} />
        <Switch>
          <Route path="/signin">
            <SignInView setUser={setUser} />
          </Route>
          <Route>
            <QuotesView user={user} />
          </Route>
        </Switch>
        <Footer />
      </Router>
    </div>
  );
};

export default App;
