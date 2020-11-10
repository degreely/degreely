import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Actions } from "../../redux/actions";
import { DragDropContext } from "react-beautiful-dnd";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Metrics from "../Metrics/Metrics";
import ModOptions from "./ModOptions";
import Sems from "./Sems";
import ModuleFinder from "../ModuleFinder";
import EmptyPage from "./EmptyPage";

import { generateDashboardMod } from "../../utils/generateDashboardMod";

import "../../css/dashboard/Sem.css";

function Dashboard({ plans, selectedPlan, handleEditPlan }) {
  // mod options menu
  const [modOptionsPos, setModOptionsPos] = useState({ x: 0, y: 0 });
  const [modOptions, setModOptions] = useState(null);

  // edit mode
  const [inEditMode, setInEditMode] = useState(false);

  useEffect(() => {
    // close menu by left-clicking outside it
    const handleLeftClick = (event) => {
      const modOptionsMenuNode = document.querySelector("#mod-options-menu");
      if (modOptionsMenuNode === null || !modOptionsMenuNode.contains(event.target)) {
        setModOptions(null);
      }
    };

    document.addEventListener("click", handleLeftClick);
    return () => document.removeEventListener("click", handleLeftClick);
  }, []);

  if (!selectedPlan) {
    return <EmptyPage />;
  }

  const currentPlan = plans[selectedPlan];
  const sems = currentPlan.sems;

  const handleEditModeClick = (event) => {
    setInEditMode(!inEditMode);
  };

  const handleModRightClick = (clickPos, modData) => {
    setModOptionsPos(clickPos);
    for (const semData of Object.values(sems)) {
      for (const mod of semData.mods) {
        if (mod.code === modData.code) {
          setModOptions({ modData: modData, semName: semData.name });
          return;
        }
      }
    }
  };

  const updateSems = (updatedSems, closeModOptions = true) => {
    if (closeModOptions) setModOptions(null);
    handleEditPlan({
      ...currentPlan,
      sems: { ...currentPlan.sems, ...updatedSems },
    });
  };

  const onDragEnd = (result) => {
    const { source, destination, draggableId } = result;

    if (destination === null) return;
    if (source.droppableId === "module-finder") {
      // dragging mod from mod finder
      const destSem = sems[destination.droppableId];
      // draggableId for mods in the finder are of the form "mf-CSXXXX"
      const newMod = generateDashboardMod(draggableId.substring(3), destSem);
      const destMods = [...destSem.mods];
      destMods.splice(destination.index, 0, newMod);
      updateSems({
        ...sems,
        [destSem.name]: { ...destSem, mods: destMods },
      });

      return;
    }

    if (source.droppableId === destination.droppableId) {
      // rearranged mods within a sem
      const sem = sems[source.droppableId];
      const updatedMods = [...sem.mods];
      const [movedMod] = updatedMods.splice(source.index, 1);
      updatedMods.splice(destination.index, 0, movedMod);
      updateSems({
        ...sems,
        [sem.name]: { ...sem, mods: updatedMods },
      });
    } else {
      // moved mod to another sem
      const sourceSem = sems[source.droppableId];
      const sourceMods = [...sourceSem.mods];
      const destSem = sems[destination.droppableId];
      const destMods = [...destSem.mods];
      const [movedMod] = sourceMods.splice(source.index, 1);
      destMods.splice(destination.index, 0, movedMod);
      updateSems({
        ...sems,
        [sourceSem.name]: { ...sourceSem, mods: sourceMods },
        [destSem.name]: { ...destSem, mods: destMods },
      });
    }
  };

  return (
    <div className="dashboard">
      <DragDropContext onDragEnd={(result) => onDragEnd(result)}>
        <Container fluid>
          <Row style={{ display: "flex", justifyContent: "center" }}>
            {inEditMode && (
              <Col sm="auto">
                <ModuleFinder
                  availableSems={Object.keys(sems)}
                  currentPlan={currentPlan}
                  updateSems={updateSems}
                />
              </Col>
            )}
            <Col>
              <Sems
                inEditMode={inEditMode}
                sems={sems}
                handleModRightClick={handleModRightClick}
                handleEditModeClick={handleEditModeClick}
              />
            </Col>
            <Col sm="auto">
              <Metrics />
            </Col>
          </Row>
        </Container>
      </DragDropContext>
      {modOptions !== null && (
        <ModOptions
          position={modOptionsPos}
          modData={modOptions.modData}
          semName={modOptions.semName}
          updateSems={updateSems}
        />
      )}
    </div>
  );
}

const mapStateToProps = (state) => ({
  plans: state.plans,
  selectedPlan: state.currentPlan,
});

const mapDispatchToProps = (dispatch) => ({
  handleEditPlan: (plan) => dispatch(Actions.editPlan(plan)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
