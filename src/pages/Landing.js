import React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";

import Typography from "@material-ui/core/Typography";
import landing from "../img/landing.svg";

import Dashboard from "../components/Dashboard";

const Landing = () => {
  return (
    <Container fluid className="my-2">
      <Row>
        <Col>
          <Typography variant="h2" align="left">
            Supercharge your degree planning with us today
          </Typography>
          <Button variant="primary" size="lg">
            Sign in with SSO
          </Button>
        </Col>
        <Col>
          <img src={landing} className="landing-art" alt="landing-art" />
        </Col>
      </Row>
      <Row>
        <Dashboard />
      </Row>
    </Container>
  );
};

export default Landing;
