import React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Typography from "@material-ui/core/Typography";

import about from "../img/about.svg";

import "../scss/Landing.scss";

const About = () => {
  return (
    <Container fluid>
      <Row>
        <Col className="mt-4 Text-container">
          <Typography variant="h4" align="left">
            degree.ly, is a platform designed for NUS students planning their
            semesters and cumulatively tracking their degree progress.
            <br />
            <br />
            It builds upon the success of the NUSMods platform and brings
            together a more integrated and convenient experience for students to
            keep track of and plan their degree progression.
            <br />
          </Typography>
        </Col>
        <Col className="Art-container">
          <img src={about} className="Landing-art" alt="landing-art" />
        </Col>
      </Row>
    </Container>
  );
};

export default About;
