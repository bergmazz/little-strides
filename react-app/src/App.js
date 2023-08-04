import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";

import { authenticate } from "./store/session";

import Navigation from "./components/Navigation";
import HomePage from "./components/HomePage";
import SignupFormPage from "./components/SignupFormPage";
import LoginFormPage from "./components/LoginFormPage";
import UserProfile from "./components/UserProfile";
import Community from "./components/Community";

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(authenticate()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && (
        <Switch>
          <Route exact path="/" >
            <HomePage />
          </Route>
          <Route path="/login" >
            <LoginFormPage />
          </Route>
          <Route path="/signup">
            <SignupFormPage />
          </Route>
          <Route path="/user">
            <UserProfile />
          </Route>
          <Route path="/community">
            <Community />
          </Route>
        </Switch>
      )}
    </>
  );
}

export default App;
