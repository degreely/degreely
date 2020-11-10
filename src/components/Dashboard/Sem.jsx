import React from "react";
import { connect } from "react-redux";
import { Actions } from "../../redux/actions";
import { Droppable } from "react-beautiful-dnd";
import AddSemButton from "./AddSemButton";
import Mod from "./Mod";

import "../../css/dashboard/Sem.css";

function Sem({inEditMode, semData, handleModRightClick, modColor, currentPlan, handleEditPlan}) {
    const missingSemIndicator = semData.name.charAt(0);
    if (missingSemIndicator === "!") {
        // sem doesn't exist; return an option to add it if in edit mode
        const name = semData.name.substring(1);
        return inEditMode ? <AddSemButton semName={name} /> : <></>
    } else if (missingSemIndicator === "-") {
        // return nothing
        return <></>;
    }

    const calculateTotalMcs = () => {
        let total = 0;
        semData.mods.forEach(mod => {
            total += parseInt(mod.mcs);
        });
        return total;
    };

    const handleRemoveMod = (index) => {
        const mods = [...semData.mods];
        mods.splice(index, 1);
        handleEditPlan({
            ...currentPlan,
            sems: {
                ...currentPlan.sems,
                [semData.name]: {
                    ...semData,
                    mods: mods,
                }
            },
        });
    };

    return (
        <div className={inEditMode ? "sem-edit" : "sem"}>
            <h4 className="sem-name"><b>{semData.name}</b></h4>
            <Droppable droppableId={semData.name}>
                {(provided, snapshot) => {
                    return (
                        <div className="sem-droppable" {...provided.droppableProps} ref={provided.innerRef}>
                            <div /*style={{backgroundColor: snapshot.isDraggingOver ? 'lightgray' : 'white'}}*/>
                                {semData.mods.map((modData, index) => {
                                    return (
                                        <Mod
                                            key={index}
                                            index={index}
                                            modData={modData}
                                            modColor={modColor}
                                            inEditMode={inEditMode}
                                            handleModRightClick={handleModRightClick}
                                            handleRemoveMod={(event) => handleRemoveMod(index)}
                                        />
                                    );
                                })}
                                {provided.placeholder}
                            </div>
                        </div>
                    );
                }}
            </Droppable>
            <div className="sem-total text-muted">
                <span className="sem-total-label">Total MCs:</span> <span className="sem-total-num">{calculateTotalMcs()}</span>
            </div>
        </div>
    );
}

const mapStateToProps = (state) => ({
    currentPlan: state.plans[state.currentPlan],
});

const mapDispatchToProps = (dispatch) => ({
    handleEditPlan: (plan) => dispatch(Actions.editPlan(plan)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Sem);