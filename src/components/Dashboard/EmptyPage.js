import React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Typography from "@material-ui/core/Typography";

import art from "../../img/empty-dashboard.svg";

import "../../scss/Landing.scss";

const EmptyPage = () => {
  return (
    <Container fluid>
      <Row>
        <Col className="mt-4 Text-container">
          <Typography variant="h1" align="left">
            Oops!
          </Typography>

          <Typography variant="h4" align="left" style={{ marginTop: "4rem", marginBottom: "2rem" }}>
            It seems like you don’t have a degree plan set up yet.
          </Typography>
          <Typography variant="h4" align="left" style={{ marginBottom: "8rem" }}>
            Click the button below to get started on your degree.ly journey!
          </Typography>

          <Button href="/create-plan" size="lg">
            Get Started!
          </Button>
        </Col>
        <Col className="Art-container">
          <img src={art} className="Landing-art" alt="landing-art" />
        </Col>
      </Row>
    </Container>
  );
};

export default EmptyPage;
