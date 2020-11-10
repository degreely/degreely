import React, { useState } from "react";
import { connect } from "react-redux";
import { Actions } from "../../../redux/actions";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { MetricsModColors, MetricsModState } from "../Metrics";

import plus from "../../../img/plus.png";

import "../../../scss/Metrics.scss";

const baseStyle = {
  color: "#FFFFFF",
  padding: "0.25rem 0.5rem",
  margin: "0.25rem 0.5rem 0.25rem 0rem",
};

function ModBtn({title, type, inEditMode, toggleEditMode}) {
  const [show, setShow] = useState(false);
  const handleShowEditTransfer = () => setShow(true);
  const handleHideEditTransfer = () => setShow(false);

  const isStatic = type === MetricsModState.COMPLETED || type === MetricsModState.PLANNED;

  const handleClick = (e) => {
    if (inEditMode) return;
    handleShowEditTransfer();
  };

  const handleEnterEditMode = () => {
    handleHideEditTransfer();
    toggleEditMode(true);
  };

  let style = {
    ...baseStyle,
    backgroundColor: MetricsModColors[type],
    borderColor: MetricsModColors[type],
  };

  if (type === MetricsModState.PLANNED) {
    style.color = "black";
  } else if (type === MetricsModState.UNPLANNED) {
    style.color = "gray";
  }

  return (
    <>
    <Button className={`mod-btn ${isStatic ? "btn-static" : ""}`} style={style} onClick={handleClick}>{title}</Button>

    <Modal className="mod-btn-edit-modal" show={show} onHide={handleHideEditTransfer} dialogClassName="modal-10w" centered>
      <Modal.Body>
        <img src={plus} alt="plus" height="96px"/>
        <h3 className="title">Add {title} to Semester?</h3>
        <p className="subtitle">You will need to enter Edit mode</p>
        <div>
          
        <Button variant="primary" onClick={handleEnterEditMode}>
          Enter Edit mode
        </Button>
        <Button style={{color: "#5E60CE", backgroundColor: "white", borderColor: "#5E60CE"}} variant="secondary" onClick={handleHideEditTransfer}>
          Cancel
        </Button>
        </div>
      </Modal.Body>
    </Modal>
    </>
  );
}

const mapStateToProps = (state) => ({
  inEditMode: state.inEditMode,
});

const mapDispatchToProps = (dispatch) => ({
  toggleEditMode: (toggle) => dispatch(Actions.setInEditMode(toggle)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ModBtn);