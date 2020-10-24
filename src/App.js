import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import AboutPage from "./pages/About";
import SupportPage from "./pages/Support";
import LandingPage from "./pages/Landing";
import LandingHeader from "./components/LandingHeader";

import "bootstrap/dist/css/bootstrap.min.css";

const App = () => {
  return (
    <Router basename="/degreely">
      <LandingHeader />
      <Switch>
        <Route path="/about" component={AboutPage} />
        <Route path="/support" component={SupportPage} />
        <Route path="/" component={LandingPage} />
      </Switch>
    </Router>
  );
};

export default App;
