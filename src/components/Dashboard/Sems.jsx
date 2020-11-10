import React from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Sem from "./Sem";

import "../../scss/Sems.scss";

function Sems({inEditMode, sems, handleModRightClick, handleEditModeClick}) {
    const semsData = Object.values(sems);
    let semPairs = [];
    for (let i = 0; i < semsData.length; i += 2) {
        if (i === semsData.length - 1) {
            semPairs.push([semsData[i]]);
            break;
        }

        semPairs.push([semsData[i], semsData[i + 1]]);
    }

    let row = 0;
    let modColor = 0;
    let gradientIncreasing = false;
    const advanceModColorGradient = () => {
        // warning: modColor is hard-coded to range between 0 and 4
        if (modColor === 0 || modColor === 4) gradientIncreasing = !gradientIncreasing;
        modColor += gradientIncreasing ? 1 : -1;
    }

    return (
        <div id={`sems${inEditMode ? "-edit" : ""}`}>
            <Row className={`add-remove-mods${inEditMode ? "-edit" : ""}`}>
                <Col>
                    {inEditMode && <h4>Add / Remove Modules</h4>}
                    <Button onClick={handleEditModeClick} variant="outline-primary">
                        {inEditMode ? "Save Changes" : "Add / Remove Modules"}
                    </Button>
                </Col>
            </Row>
            <Row id="sems-container">
                <Col>
                    {semPairs.map(semPair => {
                        const [first, second] = semPair;
                        return (
                            <Row className={`sems-row${inEditMode ? "-edit" : ""}`} key={row++}>
                                <Col key={first.name}>
                                    <Sem semData={first} handleModRightClick={handleModRightClick} modColor={`gradient-color-${modColor}`}/>
                                </Col>
                                {advanceModColorGradient()}
                                <Col key={second.name}>
                                    <Sem semData={second} handleModRightClick={handleModRightClick} modColor={`gradient-color-${modColor}`}/>
                                </Col>
                            </Row>
                        );
                    })}
                </Col>
            </Row>
        </div>
    );
}

export default Sems;