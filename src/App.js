import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import AboutPage from "./pages/About";
import SupportPage from "./pages/Support";
import LandingPage from "./pages/Landing";
import SettingsPage from "./pages/Settings";

import "./scss/App.scss";
import LandingNavbar from "./components/LandingNavbar";

const App = () => {
  return (
    <Router basename="/degreely">
      <LandingNavbar />
      <Switch>
        <Route path="/about" component={AboutPage} />
        <Route path="/support" component={SupportPage} />
        <Route path="/settings" component={SettingsPage} />
        <Route path="/" component={LandingPage} />
      </Switch>
    </Router>
  );
};

export default App;
