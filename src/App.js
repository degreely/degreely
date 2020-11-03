import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import AboutPage from "./pages/About";
import SupportPage from "./pages/Support";
import LandingPage from "./pages/Landing";
import LandingNavbar from "./components/LandingNavbar";
import SettingsPage from "./pages/Settings";
import UserDropdown from "./components/UserDropdown";


import "./scss/App.scss";

const App = () => {
  return (
    <Router basename="/degreely">
      <LandingNavbar />
      <UserDropdown />
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
