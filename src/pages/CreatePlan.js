import React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Typography from "@material-ui/core/Typography";
import Button from "react-bootstrap/Button";

const CreatePlan = () => {
  return (
    <Container className="page-root d-flex flex-column justify-content-center align-items-center">
      <Typography variant="h4" style={{ marginBottom: "1.5rem" }}>
        You are pursuing
      </Typography>
      <Typography variant="h4" style={{ fontWeight: "bold", marginBottom: "3.75rem" }}>
        BComp in Computer Science (Hons)
      </Typography>
      <Typography variant="h5" style={{ marginBottom: "5.75rem" }}>
        To get started,
      </Typography>
      <Row>
        <Button size="lg" style={{ marginRight: "15rem" }} href="templates">
          Choose a template
        </Button>
        <Button size="lg" href="dashboard">
          Do it yourself
        </Button>
      </Row>
    </Container>
  );
};

export default CreatePlan;
