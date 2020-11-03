import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

const SelectionModal = ({ open, title, options = [], handleSubmit, handleClose }) => {
  const [buttonDisabled, setButtonDisabled] = useState(true);

  return (
    <Modal show={open} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Form id="option-selector" onChange={() => setButtonDisabled(false)}>
          {options.map((option) => (
            <Form.Check type="radio" name={title} label={option} value={option} key={option} />
          ))}
        </Form>
      </Modal.Body>

      <Modal.Footer>
        <Button
          variant="outline-primary"
          onClick={() => handleSubmit(document.querySelector(`input[name="${title}"]:checked`).value)}
          disabled={buttonDisabled}
        >
          Add Selection
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default SelectionModal;
