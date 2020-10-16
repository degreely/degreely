import React from "react";
import Card from "react-bootstrap/Card";
import { Draggable } from "react-beautiful-dnd";
import "../css/Mod.css";

function Mod(props) {
    const modData = props.modData;
    return (
        <Draggable draggableId={modData.code} index={props.index}>
            {(provided, snapshot) => {
                return (
                    <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                        <Card className="mod">
                            <Card.Body>
                                <Card.Title className="mod-code">{modData.code}</Card.Title>
                                <Card.Subtitle className="mod-mcs mb-2 text-muted">{modData.mcs} MCs</Card.Subtitle>
                                <Card.Text className="mod-name">
                                    {modData.name}
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </div>
                );
            }}
        </Draggable>
    );
}

export default Mod;