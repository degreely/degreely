import React, { useState } from "react";

import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

const PlanOptionForm = ({ show, plans, planName, onSubmit, onClose }) => {
  const [submissionDisabled, setSubmissionDisabled] = useState(true);

  const handleSubmit = () => {
    onSubmit(document.querySelector('input[name="plan-name"]').value.trim());
    onClose();
  };

  const isValidForm = () => {
    const newName = document.querySelector(`input[name="plan-name"]`).value;
    if (!newName) {
      return false;
    } else if (newName === planName) {
      return undefined;
    } else {
      return !plans[planName];
    }
  };

  return (
    <Modal centered show={show} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>{planName}</Modal.Title>
      </Modal.Header>

      <Modal.Body
        as={Form}
        onChange={() =>
          setSubmissionDisabled(false || !document.querySelector(`input[name="plan-name"]`).value)
        }
        validated={isValidForm}
      >
        <Form.Group controlId="plan-name-input">
          <Form.Label>Plan Name</Form.Label>
          <Form.Control
            required
            type="input"
            name="plan-name"
            placeholder="Plan name"
            defaultValue={planName}
          />
          <Form.Control.Feedback type="invalid">Please enter a unique plan name.</Form.Control.Feedback>
        </Form.Group>
      </Modal.Body>

      <Modal.Footer>
        <Button variant="outline-secondary" onClick={onClose}>
          Cancel
        </Button>
        <Button variant="primary" disabled={submissionDisabled} onClick={handleSubmit}>
          Save changes
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default PlanOptionForm;
