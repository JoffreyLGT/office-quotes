import React, { useState, useEffect } from "react";
import "./App.css";
import "typeface-roboto";
import { QuotesView, SignInView } from "./Views";
import { Header, Footer } from "./Components/Common";
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";
import { CSSTransition } from "react-transition-group";
import { getProfile } from "./Helpers/data";

const App = () => {
  const [firstRender, setFirstRender] = useState(true);
  const [user, setUser] = useState();

  useEffect(() => {
    if (user) {
      localStorage.setItem("token", user.token);
    }
    if (firstRender) {
      const fetchUserInfo = async () => {
        const token = localStorage.getItem("token");
        if (token !== null) {
          const userProfile = await getProfile();
          if (userProfile.status === 401) {
            localStorage.removeItem("token");
            setUser(undefined);
          } else {
            setUser({ ...userProfile, token });
          }
        }
      };
      setFirstRender(false);
      fetchUserInfo();
    }
  }, [user, firstRender]);

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
