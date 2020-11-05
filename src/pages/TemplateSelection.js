import React, { useState } from "react";
import { connect } from "react-redux";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Form from "react-bootstrap/Form";
import FormCheck from "react-bootstrap/FormCheck";
import Button from "react-bootstrap/Button";
import Typography from "@material-ui/core/Typography";

import Option from "../components/TemplateOption";
import { templates } from "../data/templates";
import { Actions } from "../redux/actions";
import { generatePlanName } from "../utils/generatePlanName";
import { generateSemsFromTemplate } from "../utils/generateSemsFromTemplate";

const TemplateSelection = ({ plans, handleCreate, handleChangePlan }) => {
  const [submitButtonEnabled, setSubmitButtonEnabled] = useState(false);

  const handleSubmit = (value) => {
    const template = templates[value];
    const plan = generateSemsFromTemplate(template);
    const name = generatePlanName(plans);
    handleCreate({ [name]: plan });
    handleChangePlan(name);
  };

  return (
    <Container>
      <Row className="d-flex justify-content-between">
        <Typography variant="h4">Select a template</Typography>
        <Button
          variant="outline-primary"
          size="sm"
          disabled={!submitButtonEnabled}
          onClick={() =>
            handleSubmit(document.querySelector(`input[name="template-selection"]:checked`).value)
          }
          href="dashboard"
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
  plans: state.plans,
});

const mapDispatchToProps = (dispatch) => ({
  handleCreate: (plan) => dispatch(Actions.addPlan(plan)),
  handleChangePlan: (name) => dispatch(Actions.changePlan(name)),
});

export default connect(mapStateToProps, mapDispatchToProps)(TemplateSelection);
