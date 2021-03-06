import React from "react";
import { useHistory, Redirect } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Typography from "@material-ui/core/Typography";

import landing from "../img/landing.svg";
import Btn from "../components/Button";
import { login } from "../utils/login";

import "../scss/Landing.scss";

const Landing = () => {
  const history = useHistory();
  const isAuthenticated = !!localStorage.token;

  if (isAuthenticated) {
    return <Redirect to="dashboard" />;
  }

  return (
    <Container fluid>
      <Row>
        <Col className="mt-4 Text-container">
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
              <Btn title="Sign in with SSO" type="primary" onClick={() => login(history)} />
            </Row>
          </Container>
        </Col>
        <Col className="Art-container">
          <img src={landing} className="Landing-art" alt="landing-art" />
        </Col>
      </Row>
    </Container>
  );
};

export default Landing;
