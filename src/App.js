import React from 'react';
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";

import "./App.css";
import "fontsource-roboto";
import Typography from "@material-ui/core/Typography";
import landing from "./img/landing.svg";


import LandingHeader from './LandingHeader.js'

import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <div className="App">
      <LandingHeader />
      <Container fluid className="my-2">
        <Row>
          <Col>
            <header className="App-header">
              <Typography variant="h2" align="left">
                Supercharge your degree planning with us today
              </Typography>
            </header>
            <Button variant="primary" size="lg">Sign in with SSO</Button>
          </Col>
          <Col>
            <img src={landing} className="landing-art" alt="landing-art" />
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default App;
