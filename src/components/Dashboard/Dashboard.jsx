import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { DragDropContext } from "react-beautiful-dnd";
import Metrics from "../Metrics/Metrics";
import ModOptions from "./ModOptions";

import { Actions } from "../../redux/actions";

import "../../css/dashboard/Sem.css";
import Sems from "./Sems";
import ModuleFinder from "../ModuleFinder";

function Dashboard({currentPlan, handleEditPlan}) {
    const sems = currentPlan.sems;

    // mod options menu
    const [modOptionsPos, setModOptionsPos] = useState({x: 0, y: 0});
    const [modOptions, setModOptions] = useState(null);

    // edit mode
    const [inEditMode, setInEditMode] = useState(true);

    const handleEditModeClick = (event) => {
        setInEditMode(!inEditMode);
    };
    
    const handleModRightClick = (clickPos, modData) => {
        setModOptionsPos(clickPos);
        for (const semData of Object.values(sems)) {
            for (const mod of semData.mods) {
                if (mod.code === modData.code) {
                    setModOptions({modData: modData, semName: semData.name});
                    return;
                }
            }
        }
    };

    useEffect(() => {
        // close menu by left-clicking outside it
        const handleLeftClick = (event) => {
            const modOptionsMenuNode = document.querySelector("#mod-options-menu");
            if (modOptionsMenuNode === null || !modOptionsMenuNode.contains(event.target)) {
                setModOptions(null);
            }
        };

        document.addEventListener('click', handleLeftClick);
        return () => document.removeEventListener('click', handleLeftClick);
    }, []);

    const updateSems = (updatedSems, closeModOptions = true) => {
        if (closeModOptions) setModOptions(null);
        handleEditPlan({
            ...currentPlan,
            sems: { ...currentPlan.sems, ...updatedSems, },
        });
    };

    const onDragEnd = (result) => {
        const { source, destination } = result;
        
        if (destination === null) return;
        if (source.droppableId === destination.droppableId) {
            // rearranged mods within a sem
            const sem = sems[source.droppableId];
            const updatedMods = [...sem.mods];
            const [movedMod] = updatedMods.splice(source.index, 1);
            updatedMods.splice(destination.index, 0, movedMod);
            updateSems({
                ...sems,
                [sem.name]: { ...sem, mods: updatedMods, },
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
                [sourceSem.name]: { ...sourceSem, mods: sourceMods, },
                [destSem.name]: { ...destSem, mods: destMods, },
            });
        }
    };

    return (
        <div className="dashboard">
            <DragDropContext onDragEnd={result => onDragEnd(result)}>
                <Container fluid>
                    <Row style={{display: "flex", justifyContent: "center"}}>
                        {inEditMode && <Col sm="auto"><ModuleFinder availableSems={Object.keys(sems)} currentPlan={currentPlan} updateSems={updateSems} /></Col>}
                        <Col>
                            <Sems inEditMode={inEditMode} sems={sems} handleModRightClick={handleModRightClick} handleEditModeClick={handleEditModeClick} />
                        </Col>
                        <Col sm="auto">
                            <Metrics />
                        </Col>
                    </Row>
                </Container>
            </DragDropContext>
            {modOptions !== null && <ModOptions position={modOptionsPos} modData={modOptions.modData} semName={modOptions.semName} updateSems={updateSems} />}
        </div>
    );
}

const mapStateToProps = (state) => ({
    currentPlan: state.plans[state.currentPlan],
});

const mapDispatchToProps = (dispatch) => ({
    handleEditPlan: (name, plan) => dispatch(Actions.editPlan(name, plan)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);