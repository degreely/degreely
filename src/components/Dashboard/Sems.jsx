import React from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Sem from "./Sem";

function Sems({sems, handleModRightClick}) {
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
        <div className="sems-container">
            {semPairs.map(semPair => {
                const [first, second] = semPair;
                return (
                    <Row className="sems-row" key={row++}>
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
        </div>
    );
}

export default Sems;