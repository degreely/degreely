import React, { useState } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { DragDropContext } from "react-beautiful-dnd";
import Sem from "./Sem";

import { sems, mods } from "../data/dashboard-data";

const DEFAULT_SEMS = {
    ...sems,
    Y1S1: {
        ...sems.Y1S1,
        mods: mods,
    },
}

function Dashboard() {
    const [sems, setSems] = useState(DEFAULT_SEMS);

    const onDragEnd = (result) => {
        const { source, destination } = result;
        
        if (destination === null) return;
        if (source.droppableId === destination.droppableId) {
            // rearranged mods within a sem
            const sem = sems[source.droppableId];
            const updatedMods = [...sem.mods];
            const [movedMod] = updatedMods.splice(source.index, 1);
            updatedMods.splice(destination.index, 0, movedMod);
            setSems({
                ...sems,
                [sem.name]: {
                    ...sem,
                    mods: updatedMods,
                },
            });
        } else {
            // moved mod to another sem
            const sourceSem = sems[source.droppableId];
            const sourceMods = [...sourceSem.mods];
            const destSem = sems[destination.droppableId];
            const destMods = [...destSem.mods];
            const [movedMod] = sourceMods.splice(source.index, 1);
            destMods.splice(destination.index, 0, movedMod);
            setSems({
                ...sems,
                [sourceSem.name]: {
                    ...sourceSem,
                    mods: sourceMods,
                },
                [destSem.name]: {
                    ...destSem,
                    mods: destMods,
                },
            });
        }
    }

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

export default Dashboard;