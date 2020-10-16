import React from "react";
import Mod from "./Mod";

function Sem(props) {
    const semData = props.semData;
    return (
        <div>
            <h2>{semData.name}</h2>
            {semData.mods.map((modData, index) => <Mod key={index} modData={modData} />)}
        </div>
    );
}

export default Sem;