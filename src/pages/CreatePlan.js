import React from "react";
import { connect } from "react-redux";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Typography from "@material-ui/core/Typography";
import Button from "react-bootstrap/Button";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";
import HelpIcon from "@material-ui/icons/Help";

import { Actions } from "../redux/actions";
import { EMPTY_PLAN } from "../redux/reducers";
import IconButton from "../components/IconButton";
import { generatePlanName } from "../utils/generatePlanName";

const CreatePlan = ({ plans, handleCreate, handleChangePlan }) => {
  const handleCreateEmptyPlan = () => {
    const name = generatePlanName(plans);
    handleCreate(name, EMPTY_PLAN);
    handleChangePlan(name);
  };

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
        <div style={{ marginRight: "16rem" }}>
          <Button size="lg" href="templates">
            Choose a template
          </Button>
          <OverlayTrigger
            placement="top"
            overlay={<Tooltip>Select from our curated list of templates to kickstart your planning!</Tooltip>}
          >
            <IconButton
              icon={<HelpIcon color="disabled" />}
              style={{ marginLeft: "0.5rem", color: "grey" }}
            />
          </OverlayTrigger>
        </div>
        <Button variant="primary" size="lg" onClick={handleCreateEmptyPlan} href="dashboard">
          Start with an empty plan
        </Button>
      </Row>
    </Container>
  );
};

const mapStateToProps = (state) => ({
  plans: state.plans,
});

const mapDispatchToProps = (dispatch) => ({
  handleCreate: (name, plan) => dispatch(Actions.addPlan(name, plan)),
  handleChangePlan: (name) => dispatch(Actions.changePlan(name)),
});

export default connect(mapStateToProps, mapDispatchToProps)(CreatePlan);
