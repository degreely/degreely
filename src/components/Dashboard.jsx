import React from "react";
import { connect } from "react-redux";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { DragDropContext } from "react-beautiful-dnd";
import Sem from "./Sem";

import { Actions } from "../redux/actions";

function Dashboard({currentPlanName, currentPlan, handleEditPlan}) {
    const sems = currentPlan.sems;

    const updateSems = (updatedSems) => {
        handleEditPlan(currentPlanName, {
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
        <DragDropContext onDragEnd={result => onDragEnd(result)}>
            <Container>
                <Row>
                    {Object.entries(sems).map(([key, semData]) => {
                        return <Col key={key}><Sem semData={semData} /></Col>;
                    })}
                </Row>
            </Container>
        </DragDropContext>
    );
}

const mapStateToProps = (state) => ({
    currentPlanName: state.currentPlan,
    currentPlan: state.plans[state.currentPlan],
});

const mapDispatchToProps = (dispatch) => ({
    handleEditPlan: (name, plan) => dispatch(Actions.editPlan(name, plan)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);