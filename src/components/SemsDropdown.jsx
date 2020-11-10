import React from "react";
import Dropdown from "react-bootstrap/Dropdown";

import tick from "../img/tick.png";

function SemsDropdown({semsNames, allocatedSemName, moveMod}) {
    let semsCount = 0;
    return (
        <>
            {semsNames.map(currSemName => {
                semsCount++;
                return (
                    <div key={currSemName}>
                        <Dropdown.Item disabled={currSemName === allocatedSemName} className="options-dropdown-item" eventKey={currSemName} onSelect={moveMod}
                            style={{display: "flex", alignItems: "center", justifyContent: "space-between"}}
                        >
                            {currSemName}
                            {currSemName === allocatedSemName && <img src={tick} alt="tick" height="14px"/>}
                        </Dropdown.Item>
                        {semsCount % 2 === 0 && semsCount < semsNames.length && <Dropdown.Divider/>}
                    </div>
                );
            })}
        </>
    );
}

export default SemsDropdown;