import React from "react";
import { Draggable } from "react-beautiful-dnd";
import "../css/Mod.css";

function Mod({index, modData, modColor}) {
    return (
        <Draggable draggableId={modData.code} index={index} key={modData.code}>
            {(provided, snapshot) => {
                return (
                    <div className={`mod ${modColor}`} ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                        <span className="font-weight-medium">{modData.code}</span> <span>{modData.name}</span>
                    </div>
                );
            }}
        </Draggable>
    );
}

export default Mod;