import React from "react";
import Container from "react-bootstrap/Container";
import ProgressBar from 'react-bootstrap/ProgressBar'
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Accordion from "react-bootstrap/Accordion";
import Card from "react-bootstrap/Card";

import Legend from "./Legend";
import ModBtn from "./ModBtn";

import "../scss/Metrics.scss";

function Metrics() {
  return (
    <Container className="Metrics">
      <Row id="header">
        <h4>Degree Progress</h4>
      </Row>
      <ProgressBar className="progress-main">
        <ProgressBar className="Completed" now={50} key={1} />
        <ProgressBar className="Planned" now={20} key={2} />
      </ProgressBar>
      <div id="legend">
        <Legend colorHex="#5E60CE" title="Completed" />
        <Legend colorHex="#BFC0FF" title="Planned" />
        <Legend colorHex="#E5E5E5" title="Unplanned" />
      </div>
      <Row id="header">
        <h4>CAP</h4>
        <Container>
          <Row>
            <Col className="CapHeader">Projected</Col>
            <Col>4.18</Col>
          </Row>
          <Row>
            <Col className="CapHeader">Actual</Col>
            <Col>3.96</Col>
          </Row>
        </Container>
      </Row>
      <Row id="header">
        <h4>Degree Requirements</h4>
      </Row>
      <DegreeRequirements />
    </Container>
  );
}

function DegreeRequirements() {
  return (
    <Accordion>
      <Card className="requirement">
        <Accordion.Toggle as={Card.Header} eventKey="0">
          University Level Requirements
        </Accordion.Toggle>
        <Accordion.Collapse eventKey="0">
          <Card.Body>
            <ModBtn title="ES2660" type="unallocated" />
            <ModBtn title="IS1103" type="allocated" />
            <ModBtn title="CS2101" type="allocated" />
          </Card.Body>
        </Accordion.Collapse>
      </Card>
      <Card className="requirement">
        <Accordion.Toggle as={Card.Header} eventKey="1">
          Computer Science Foundation
        </Accordion.Toggle>
        <Accordion.Collapse eventKey="1">
          <Card.Body>
            <ModBtn title="ES2660" type="unallocated" />
            <ModBtn title="IS1103" type="allocated" />
            <ModBtn title="CS2101" type="allocated" />
          </Card.Body>
        </Accordion.Collapse>
      </Card>
      <Card className="requirement">
        <Accordion.Toggle as={Card.Header} eventKey="2">
          Computer Science Breadth & Depth
        </Accordion.Toggle>
        <Accordion.Collapse eventKey="2">
          <Card.Body>
            <ModBtn title="ES2660" type="unallocated" />
            <ModBtn title="IS1103" type="allocated" />
            <ModBtn title="CS2101" type="allocated" />
          </Card.Body>
        </Accordion.Collapse>
      </Card>
      <Card className="requirement">
        <Accordion.Toggle as={Card.Header} eventKey="3">
          IT Professionalism
        </Accordion.Toggle>
        <Accordion.Collapse eventKey="3">
          <Card.Body>
            <ModBtn title="ES2660" type="unallocated" />
            <ModBtn title="IS1103" type="allocated" />
            <ModBtn title="CS2101" type="allocated" />
          </Card.Body>
        </Accordion.Collapse>
      </Card>
      <Card className="requirement">
        <Accordion.Toggle as={Card.Header} eventKey="4">
          Mathematics & Science
        </Accordion.Toggle>
        <Accordion.Collapse eventKey="4">
          <Card.Body>
            <ModBtn title="ES2660" type="unallocated" />
            <ModBtn title="IS1103" type="allocated" />
            <ModBtn title="CS2101" type="allocated" />
          </Card.Body>
        </Accordion.Collapse>
      </Card>
    </Accordion>
  );
}

export default Metrics;
