import React from "react";
import { Draggable } from "react-beautiful-dnd";
import ClearIcon from '@material-ui/icons/Clear';
import "../../css/dashboard/Mod.css";

function Mod({index, modData, modColor, inEditMode, handleModRightClick, handleRemoveMod}) {
    const handleRightClick = (event) => {
        event.preventDefault();
        handleModRightClick({x: event.clientX, y: event.clientY}, modData);
    };

    return (
        <Draggable draggableId={modData.draggableId} index={index} key={modData.code}>
            {(provided, snapshot) => {
                return (
                    <div className={`mod ${modColor}`}
                        onContextMenu={handleRightClick}
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                    >
                        <span className="mod-text">
                            <span className="font-weight-medium">{modData.code}</span> <span>{modData.name}</span>
                        </span>
                        {inEditMode && <ClearIcon className="mod-remove" onClick={handleRemoveMod} />}
                    </div>
                );
            }}
        </Draggable>
    );
}

export default Mod;