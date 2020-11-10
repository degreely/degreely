import React from "react";
import Dropdown from "react-bootstrap/Dropdown";

import tick from "../img/tick.png";

function SemsDropdown({semsNames, allocatedSemName, moveMod}) {
    if (semsNames.length === 0) return <div><i>No semesters to add to</i></div>

    let year = semsNames[0].charAt(1);
    let semsCount = 0;
    return (
        <>
            {semsNames.map(currSemName => {
                const currYear = currSemName.charAt(1);
                const hasYearChanged = year !== currYear;
                if (hasYearChanged) year = currYear;
                semsCount++;
                return (
                    <div key={currSemName}>
                        {hasYearChanged && semsCount < semsNames.length && <Dropdown.Divider/>}
                        <Dropdown.Item disabled={currSemName === allocatedSemName} className="options-dropdown-item" eventKey={currSemName} onSelect={moveMod}
                            style={{display: "flex", alignItems: "center", justifyContent: "space-between"}}
                        >
                            {currSemName}
                            {currSemName === allocatedSemName && <img src={tick} alt="tick" height="14px"/>}
                        </Dropdown.Item>
                    </div>
                );
            })}
        </>
    );
}

export default SemsDropdown;