import React from 'react';
import { connect } from "react-redux";
import ListGroup from 'react-bootstrap/ListGroup';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import { grades } from "../data/grades";

import "../css/dashboard/ModOptions.css";

import caret from "../img/caret-right.png";
import tick from "../img/tick.png";

function ModOptions({position, modData, semName, currentPlan, updateSems}) {
    const sems = currentPlan.sems;

    const changeProjectedGrade = (eventKey) => {
        const newGrade = eventKey;
        const modsToUpdate = [...sems[semName].mods];
        for (let i = 0; i < modsToUpdate.length; i++) {
            if (modsToUpdate[i].code === modData.code) {
                modsToUpdate[i].projectedGrade = newGrade;
                updateSems({
                    ...sems,
                    [semName]: {
                        ...sems[semName],
                        mods: modsToUpdate,
                    },
                }, false);
                return;
            }
        }
    };

    const displayGrade = (type) => (
        <div className="options-dropdown-label">
            <span className="text-muted">{type} Grade</span><br/>
            {modData[`${type.toLowerCase()}Grade`]}
        </div>
    );

    const moveMod = (eventKey) => {
        const sourceSemName = semName;
        const destSemName = eventKey;
        const sourceMods = [...currentPlan.sems[sourceSemName].mods];
        const destMods = [...currentPlan.sems[destSemName].mods];

        for (let i = 0; i < sourceMods.length; i++) {
            if (sourceMods[i].code === modData.code) {
                const [movedMod] = sourceMods.splice(i, 1);
                destMods.push(movedMod);
                break;
            }
        }

        updateSems({
            ...currentPlan.sems,
            [sourceSemName]: { ...currentPlan.sems[sourceSemName], mods: sourceMods },
            [destSemName]: { ...currentPlan.sems[destSemName], mods: destMods },
        });
    };

    const displaySem = (
        <div className="options-dropdown-label" style={{display: "flex", alignItems: "center", justifyContent: "space-between"}}>
            <span>{semName}</span>
            <img src={caret} alt="caret-right" height="14px" style={{marginBottom: "1px"}} />
        </div>
    );

    const displaySemsDropdown = () =>  {
        const semsNames = Object.keys(sems);
        let semsCount = 0;
        return (
            <DropdownButton className="options-dropdown" drop="right" title={displaySem}>
                {semsNames.map(currSemName => {
                    semsCount++;
                    return (
                        <div key={currSemName}>
                            <Dropdown.Item disabled={currSemName === semName} className="options-dropdown-item" eventKey={currSemName} onSelect={moveMod}
                                style={{display: "flex", alignItems: "center", justifyContent: "space-between"}}
                            >
                                {currSemName}
                                {currSemName === semName && <img src={tick} alt="tick" height="14px"/>}
                            </Dropdown.Item>
                            {semsCount % 2 === 0 && semsCount < semsNames.length && <Dropdown.Divider/>}
                        </div>
                    );
                })}
            </DropdownButton>
        );
    };

    return (
        <div id="mod-options-menu" style={{position: "absolute", top: `${position.y}px`, left: `${position.x}px`}}>
            <ListGroup>
                <ListGroup.Item className="mod-options-menu-item mod-options-menu-title">
                    <b>{modData.code}</b>
                </ListGroup.Item>
                <ListGroup.Item className="mod-options-menu-item">
                    <DropdownButton disabled={modData.taken} className="options-dropdown" drop="right" title={displayGrade("Projected")}>
                        {grades.map(grade => {
                            return (
                                <Dropdown.Item className="options-dropdown-item" key={grade} eventKey={grade} onSelect={changeProjectedGrade}>
                                    {grade}
                                </Dropdown.Item>
                            );
                        })}
                    </DropdownButton>
                </ListGroup.Item>
                <ListGroup.Item className="mod-options-menu-item">
                    <div className="options-actual-grade rounded-1">
                        {displayGrade("Actual")}
                    </div>
                </ListGroup.Item>
                <ListGroup.Item className="mod-options-menu-item">
                    {displaySemsDropdown()}
                </ListGroup.Item>
            </ListGroup>
        </div>
    );
}

const mapStateToProps = (state) => ({
    currentPlan: state.plans[state.currentPlan],
});

export default connect(mapStateToProps)(ModOptions);