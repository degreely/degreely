import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Form from "react-bootstrap/Form";
import FormCheck from "react-bootstrap/FormCheck";
import Button from "react-bootstrap/Button";
import Typography from "@material-ui/core/Typography";

import Option from "../components/TemplateOption";
import { templates } from "../data/templates";
import { EMPTY_PLAN } from "../redux/reducers";
import { Actions } from "../redux/actions";
import { generatePlanName } from "../utils/generatePlanName";
import { generateSemsFromTemplate } from "../utils/generateSemsFromTemplate";

const TemplateSelection = ({ currentPlanName, plans, handleCreate, handleChangePlan, ...props }) => {
  const [submitButtonEnabled, setSubmitButtonEnabled] = useState(false);
  const [newPlanName, setNewPlanName] = useState(null);

  const handleSubmit = (value) => {
    const template = templates[value];
    const sems = Object.assign(EMPTY_PLAN, generateSemsFromTemplate(template));
    const name = generatePlanName(plans);
    setNewPlanName(name);
    handleCreate(name, sems);
    handleChangePlan(name);
  };

  useEffect(() => {
    if (newPlanName === currentPlanName) props.history.push("/dashboard");
  }, [currentPlanName, newPlanName, props.history]);

  return (
    <Container>
      <Row className="d-flex justify-content-between align-items-center">
        <Typography variant="h4">Select a template</Typography>
        <Button
          variant="outline-primary"
          size="sm"
          disabled={newPlanName !== null || !submitButtonEnabled}
          onClick={() =>
            handleSubmit(document.querySelector(`input[name="template-selection"]:checked`).value)
          }
        >
          Continue
        </Button>
      </Row>
      <Form style={{ padding: "2rem 0rem" }} onChange={() => setSubmitButtonEnabled(true)}>
        {Object.entries(templates).map(([key, template]) => (
          <Row key={key} className="d-flex align-items-start" style={{ width: "100%", marginBottom: "1rem" }}>
            <FormCheck.Input
              type="radio"
              name="template-selection"
              value={key}
              style={{ marginTop: "2rem" }}
            />
            <FormCheck.Label style={{ marginLeft: "1.5rem", width: "100%" }}>
              <Option {...template} />
            </FormCheck.Label>
          </Row>
        ))}
      </Form>
    </Container>
  );
};

const mapStateToProps = (state) => ({
  currentPlanName: state.currentPlan,
  plans: state.plans,
});

const mapDispatchToProps = (dispatch) => ({
  handleCreate: (name, plan) => dispatch(Actions.addPlan(name, plan)),
  handleChangePlan: (name) => dispatch(Actions.changePlan(name)),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(TemplateSelection));
