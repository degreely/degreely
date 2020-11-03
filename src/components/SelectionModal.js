import React, { useState, useEffect } from "react";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

import SearchBar from "./SearchBar";
import "../css/SelectionModal.css";

const SelectionModal = ({ open, title, options = [], handleSubmit, handleClose }) => {
  const [buttonDisabled, setButtonDisabled] = useState(true);
  const [optionsToShow, setOptionsToShow] = useState(options);

  useEffect(() => {
    setOptionsToShow(options);
  }, [options]);

  const filterOptions = (search) => {
    const keyword = search.toLowerCase();
    setOptionsToShow(options.filter((option) => option.toLowerCase().includes(keyword)));
  };

  return (
    <Modal show={open} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <SearchBar
          id="option-search-bar"
          resultCount={optionsToShow.length}
          resultType="option"
          handleChange={filterOptions}
        />
        <Form id="option-selector" onChange={() => setButtonDisabled(false)}>
          {optionsToShow.map((option) => (
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
