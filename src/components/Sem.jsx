import React from "react";
import { Droppable } from "react-beautiful-dnd";
import Mod from "./Mod";
import "../css/Sem.css";

function Sem({semData}) {
    return (
        <div className="sem">
            <h2 className="sem-name">{semData.name}</h2>
            <Droppable droppableId={semData.name}>
                {(provided, snapshot) => {
                    return (
                        <div className="sem-droppable" {...provided.droppableProps} ref={provided.innerRef}>
                            <div style={{backgroundColor: snapshot.isDraggingOver ? 'lightblue' : 'white'}}>
                                {semData.mods.map((modData, index) => <Mod key={index} index={index} modData={modData} />)}
                                {provided.placeholder}
                            </div>
                        </div>
                    );
                }}
            </Droppable>
        </div>
    );
}

export default Sem;