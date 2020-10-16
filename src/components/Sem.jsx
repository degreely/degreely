import React from "react";
import { Droppable } from "react-beautiful-dnd";
import Mod from "./Mod";
import "../css/Sem.css";

function Sem(props) {
    const semData = props.semData;
    return (
        <Droppable droppableId={semData.name}>
            {(provided, snapshot) => {
                return (
                    <div {...provided.droppableProps} ref={provided.innerRef}>
                        <div className="sem" style={{backgroundColor: snapshot.isDraggingOver ? 'lightblue' : 'white'}}>
                            <h2 className="sem-name">{semData.name}</h2>
                            {semData.mods.map((modData, index) => <Mod key={index} index={index} modData={modData} />)}
                            {provided.placeholder}
                        </div>
                    </div>
                );
            }}
        </Droppable>
    );
}

export default Sem;