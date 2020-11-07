import React from 'react';
import ListGroup from 'react-bootstrap/ListGroup';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';

import "../css/dashboard/ModOptions.css";

import caret from "../img/caret-right.png";

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

    const grades = ["A+", "A", "A-", "B+", "B", "B-", "C+", "C", "D+", "D", "F", "S", "U"];

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

    const displaySemsDropdown = (
        <DropdownButton className="options-dropdown" drop="right" title={displaySem}>
            {Object.keys(sems).map(semName => {
                return (
                    <Dropdown.Item className="options-dropdown-item" key={semName} eventKey={semName}>{semName}</Dropdown.Item>
                );
            })}
        </DropdownButton>
    );

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
                    {displaySemsDropdown}
                </ListGroup.Item>
            </ListGroup>
        </div>
    );
}

export default ModOptions;