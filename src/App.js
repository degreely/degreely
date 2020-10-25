import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import AboutPage from "./pages/About";
import SupportPage from "./pages/Support";
import LandingPage from "./pages/Landing";
import LandingHeader from "./components/LandingHeader";
import SettingsPage from "./pages/Settings";

import "bootstrap/dist/css/bootstrap.min.css";
import "./scss/App.scss";

const App = () => {
  return (
    <Router basename="/degreely">
      <LandingHeader />
      <Switch>
        <Route path="/" component={LandingPage} />
        <Route path="/about" component={AboutPage} />
        <Route path="/support" component={SupportPage} />
        <Route path="/settings" component={SettingsPage} />
      </Switch>
    </Router>
  );
};

export default App;
