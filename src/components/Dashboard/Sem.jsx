import React, { useState } from "react";
import { connect } from "react-redux";
import { Actions } from "../../redux/actions";
import { Droppable } from "react-beautiful-dnd";
import ClearIcon from "@material-ui/icons/Clear";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import AddSemButton from "./AddSemButton";
import Mod from "./Mod";

import "../../css/dashboard/Sem.css";

function Sem({
  inEditMode,
  semData,
  handleModRightClick,
  modColor,
  isListView,
  currentPlan,
  handleEditPlan,
}) {
  const [showRemoveSem, setShowRemoveSem] = useState(false);
  const handleShowRemoveSem = () => setShowRemoveSem(true);
  const handleCloseRemoveSem = () => setShowRemoveSem(false);

  const missingSemIndicator = semData.name.charAt(0);
  if (missingSemIndicator === "!") {
    // sem doesn't exist; return an option to add it if in edit mode
    const name = semData.name.substring(1);
    return inEditMode ? <AddSemButton semName={name} /> : <></>;
  } else if (missingSemIndicator === "-") {
    // return nothing
    return <></>;
  }

  const calculateTotalMcs = () => {
    let total = 0;
    semData.mods.forEach((mod) => {
      total += parseInt(mod.mcs);
    });
    return total;
  };

  const handleRemoveSem = () => {
    let updatedSems = { ...currentPlan.sems };
    delete updatedSems[semData.name];
    handleEditPlan({
      ...currentPlan,
      sems: updatedSems,
    });
  };

  const handleRemoveMod = (index) => {
    const mods = [...semData.mods];
    mods.splice(index, 1);
    handleEditPlan({
      ...currentPlan,
      sems: {
        ...currentPlan.sems,
        [semData.name]: {
          ...semData,
          mods: mods,
        },
      },
    });
  };

  return (
    <>
      <div className={inEditMode ? "sem-edit" : "sem"}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <h4 className="sem-name">
            <b>{semData.name}</b>
          </h4>
          {inEditMode && (
            <ClearIcon style={{ color: "grey", cursor: "pointer" }} onClick={handleShowRemoveSem} />
          )}
        </div>

        {semData.mods.length || inEditMode ? (
          <Droppable droppableId={semData.name} direction={isListView ? "horizontal" : "vertical"}>
            {(provided, snapshot) => {
              return (
                <div
                  className="sem-droppable"
                  style={{
                    display: "flex",
                    flexDirection: isListView ? "row" : "column",
                    minHeight: isListView ? "initial" : "15.5rem",
                  }}
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                >
                  {semData.mods.map((modData, index) => {
                    return (
                      <Mod
                        key={index}
                        index={index}
                        modData={modData}
                        modColor={modColor}
                        inEditMode={inEditMode}
                        handleModRightClick={handleModRightClick}
                        handleRemoveMod={(event) => handleRemoveMod(index)}
                      />
                    );
                  })}
                  {provided.placeholder}
                </div>
              );
            }}
          </Droppable>
        ) : (
          <div style={{ margin: "2rem 0.75rem 1.25rem", color: "#ADB2C1" }}>
            <span>No modules allocated for this semester</span>
          </div>
        )}

        {semData.mods.length || inEditMode ? (
          <div className="sem-total text-muted">
            <span className="sem-total-label">Total MCs:</span>{" "}
            <span className="sem-total-num">{calculateTotalMcs()}</span>
          </div>
        ) : null}
      </div>

      <Modal show={showRemoveSem} onHide={handleCloseRemoveSem} dialogClassName="modal-10w" centered>
        <Modal.Header closeButton>
          <Modal.Title>Warning</Modal.Title>
        </Modal.Header>
        <Modal.Body>You are about to delete {semData.name} and all its mods. Are you sure?</Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleRemoveSem}>
            Yes
          </Button>
          <Button variant="secondary" onClick={handleCloseRemoveSem}>
            No
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

const mapStateToProps = (state) => ({
  isListView: state.isListView,
  currentPlan: state.plans[state.currentPlan],
});

const mapDispatchToProps = (dispatch) => ({
  handleEditPlan: (plan) => dispatch(Actions.editPlan(plan)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Sem);
