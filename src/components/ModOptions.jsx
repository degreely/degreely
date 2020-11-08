import React from 'react';
import ListGroup from 'react-bootstrap/ListGroup';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import { grades } from "../data/grades";

import "../css/dashboard/ModOptions.css";

import caret from "../img/caret-right.png";
import tick from "../img/tick.png";

function ModOptions({position, modData, sem, sems}) {
    const style = {
        position: 'absolute',
        top: `${position.y}px`,
        left: `${position.x}px`,
    };

    const displayGrade = (type) => (
        <div className="options-dropdown-label">
            <span className="text-muted">{type} Grade</span><br/>
            A+
        </div>
    );

    const displayGradeDropdown = (type) => (
        <DropdownButton className="options-dropdown" drop="right" title={displayGrade(type)}>
            {grades.map(grade => {
                return (
                    <Dropdown.Item className="options-dropdown-item" key={grade} eventKey={grade}>{grade}</Dropdown.Item>
                );
            })}
        </DropdownButton>
    );

    const displaySem = (
        <div className="options-dropdown-label" style={{display: "flex", alignItems: "center", justifyContent: "space-between"}}>
            <span>{sem}</span>
            <img src={caret} alt="caret-right" height="14px" style={{marginBottom: "1px"}} />
        </div>
    );

    const displaySemsDropdown = () =>  {
        const semsNames = Object.keys(sems);
        let semsCount = 0;
        return (
            <DropdownButton className="options-dropdown" drop="right" title={displaySem}>
                {semsNames.map(semName => {
                    semsCount++;
                    return (
                        <div key={semName}>
                            <Dropdown.Item className="options-dropdown-item" eventKey={semName}
                                style={{display: "flex", alignItems: "center", justifyContent: "space-between"}}
                            >
                                {semName}
                                {semName === sem && <img src={tick} alt="tick" height="14px"/>}
                            </Dropdown.Item>
                            {semsCount % 2 === 0 && semsCount < semsNames.length && <Dropdown.Divider/>}
                        </div>
                    );
                })}
            </DropdownButton>
        );
    };

    return (
        <div id="mod-options-menu" style={style}>
            <ListGroup>
                <ListGroup.Item className="mod-options-menu-item mod-options-menu-title">
                    <b>{modData.code}</b>
                </ListGroup.Item>
                <ListGroup.Item className="mod-options-menu-item">
                    {displayGradeDropdown("Projected")}
                </ListGroup.Item>
                <ListGroup.Item className="mod-options-menu-item">
                    {displayGradeDropdown("Actual")}
                </ListGroup.Item>
                <ListGroup.Item className="mod-options-menu-item">
                    {displaySemsDropdown()}
                </ListGroup.Item>
            </ListGroup>
        </div>
    );
}

export default ModOptions;