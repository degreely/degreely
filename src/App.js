import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import ProtectedRoute from "./components/ProtectedRoute";
import AboutPage from "./pages/About";
import SupportPage from "./pages/Support";
import LandingPage from "./pages/Landing";
import SettingsPage from "./pages/Settings";
import Dashboard from "./components/Dashboard";
import CreatePlanPage from "./pages/CreatePlan";
import TemplateSelectionPage from "./pages/TemplateSelection";

import "./scss/App.scss";
import LandingNavbar from "./components/LandingNavbar";
import UserNavbar from "./components/UserNavbar";

const App = () => {
  const isAuthenticated = !!localStorage.token;

  return (
    <Router basename="/degreely" forceRefresh>
      {isAuthenticated ? <UserNavbar /> : <LandingNavbar />}
      <Switch>
        <Route path="/about" component={AboutPage} />
        <Route path="/support" component={SupportPage} />
        <ProtectedRoute path="/dashboard" component={Dashboard} />
        <ProtectedRoute path="/settings" component={SettingsPage} />
        <ProtectedRoute path="/create-plan" component={CreatePlanPage} />
        <ProtectedRoute path="/templates" component={TemplateSelectionPage} />
        <Route path="/" component={LandingPage} />
      </Switch>
    </Router>
  );
};

export default App;
