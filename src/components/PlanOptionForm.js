import React, { useState } from "react";

import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

const PlanOptionForm = ({ show, plans, planName, onSubmit, onClose }) => {
  const [formErrorMessage, setFormErrorMessage] = useState("");

  const getInputValue = (inputName) => document.querySelector(`input[name="${inputName}"]`).value.trim();

  const handleSubmit = () => {
    onSubmit(getInputValue("plan-name"));
    onClose();
  };

  const getFormErrors = () => {
    const newName = getInputValue("plan-name");
    if (!newName) {
      return "This is a required field.";
    }

    if (plans[newName]) {
      return "Please enter a unique plan name.";
    }

    return "";
  };

  return (
    <Modal centered show={show} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>{planName}</Modal.Title>
      </Modal.Header>

      <Modal.Body
        as={Form}
        onSubmit={(e) => e.preventDefault()}
        onChange={() => setFormErrorMessage(getFormErrors())}
      >
        <Form.Group controlId="plan-name-input">
          <Form.Label>Plan Name</Form.Label>
          <Form.Control
            type="input"
            name="plan-name"
            placeholder="Plan name"
            defaultValue={planName}
            isInvalid={!!formErrorMessage}
          />
          <Form.Control.Feedback type="invalid">{formErrorMessage}</Form.Control.Feedback>
        </Form.Group>
      </Modal.Body>

      <Modal.Footer>
        <Button variant="outline-secondary" onClick={onClose}>
          Cancel
        </Button>
        <Button variant="primary" disabled={!!formErrorMessage} onClick={handleSubmit}>
          Save Changes
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default PlanOptionForm;
