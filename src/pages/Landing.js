import React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Typography from "@material-ui/core/Typography";

import landing from "../img/landing.svg";
import Btn from "../components/Button";
import Dashboard from "../components/Dashboard";

const Landing = () => {
  return (
    <Container fluid className="my-2">
      <Row>
        <Col className="ml-4 mt-4">
          <Container>
            <Row>
              <Typography variant="h2" align="left">
                Supercharge your
                <br />
                degree planning
                <br />
                with us today
                <br />
              </Typography>
            </Row>
            <Row className="mt-4">
              <Btn title="Sign in with SSO" type="primary" />
            </Row>
          </Container>
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
