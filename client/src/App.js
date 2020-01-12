import React, { useState, useEffect } from "react";
import "./App.css";
import "typeface-roboto";
import { QuotesView, SignInView } from "./Views";
import { Header, Footer } from "./Components/Common";
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";
import { CSSTransition } from "react-transition-group";

const App = () => {
  const getUserFromLocalStorage = () => {
    const user = {
      _id: localStorage.getItem("_id"),
      name: localStorage.getItem("name"),
      token: localStorage.getItem("token"),
      isAdmin: localStorage.getItem("isAdmin") === "true"
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

  const routes = [
    { path: "/", Component: Redirect, Props: { to: "/quotes" } },
    { path: "/signin", Component: SignInView, Props: { setUser } },
    {
      path: "/quotes",
      Component: QuotesView,
      Props: { user: user }
    }
  ];

  return (
    <div className="App">
      <Router>
        <Header user={user} setUser={setUser} />
        {routes.map(({ path, Component, Props }) => (
          <Route key={path} exact path={path}>
            {({ match }) => (
              <CSSTransition
                in={match != null}
                timeout={500}
                classNames="page"
                exit={false}
                unmountOnExit
              >
                <div className="page">
                  <Component {...Props} />
                </div>
              </CSSTransition>
            )}
          </Route>
        ))}
        <Footer />
      </Router>
    </div>
  );
};

export default App;
