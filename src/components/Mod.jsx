import React from "react";
import { Draggable } from "react-beautiful-dnd";
import "../css/dashboard/Mod.css";

function Mod({index, modData, handleModRightClick, modColor}) {
    const handleRightClick = (event) => {
        event.preventDefault();
        handleModRightClick({x: event.clientX, y: event.clientY}, modData);
    };

    return (
        <Draggable draggableId={modData.code} index={index} key={modData.code}>
            {(provided, snapshot) => {
                return (
                    <div className={`mod ${modColor}`}
                        onContextMenu={handleRightClick}
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                    >
                        <span className="font-weight-medium">{modData.code}</span> <span>{modData.name}</span>
                    </div>
                );
            }}
        </Draggable>
    );
}

export default Mod;