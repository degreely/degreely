import React, { useState } from "react";
import { Droppable } from "react-beautiful-dnd";

import Pagination from "@material-ui/lab/Pagination";

import SearchBar from "./SearchBar";
import Card from "./ModuleFinderResultCard";

import allModules from "../data/computing-modules";
import "../css/ModuleFinder.css";

const PAGE_LIMIT = 10;

const ModuleFinder = ({
  availableSems = ["Y1S1", "Y1S2", "Y2S1", "Y2S2", "Y3S1", "Y3S2", "Y4S1", "Y4S2"],
  currentPlan,
  updateSems,
}) => {
  const [modules, setModules] = useState(allModules);
  const [offset, setOffset] = useState(0);

  const handleClearSearch = () => {
    const textField = document.getElementById("module-search-box");
    if (!textField.value) return;
    textField.value = "";
    setModules(allModules);
  };

  const filterModules = (search) => {
    const keyword = search.toLowerCase();
    setModules(
      allModules.filter(
        ({ moduleCode, title }) =>
          !search || moduleCode.toLowerCase().includes(keyword) || title.toLowerCase().includes(keyword)
      )
    );
    setOffset(0);
  };

  const handleAddMod = (mod, destSemName) => {
    const destMods = [...currentPlan.sems[destSemName].mods];
    destMods.push(mod);
    updateSems({
      ...currentPlan.sems,
      [destSemName]: { ...currentPlan.sems[destSemName], mods: destMods },
    });
  };

  let moduleToSemMapping = {};
  for (const sem of Object.values(currentPlan.sems)) {
    for (const mod of sem.mods) {
      moduleToSemMapping[mod.code] = sem.name;
    }
  }

  return (
    <div className="module-finder-container">
      <h5 className="text-primary font-weight-medium">Module Search</h5>
      <SearchBar
        clearable
        id="module-search-box"
        resultCount={modules.length}
        resultType="module"
        handleChange={filterModules}
        handleClear={handleClearSearch}
      />
      <Droppable droppableId="module-finder" isDropDisabled={true}>
        {(provided, snapshot) => {
          return (
            <div className="results" {...provided.droppableProps} ref={provided.innerRef}>
              {modules.slice(offset * PAGE_LIMIT, (offset + 1) * PAGE_LIMIT).map((module, index) => (
                <Card
                  key={module.moduleCode}
                  index={index}
                  handleAddMod={handleAddMod}
                  containingSemester={moduleToSemMapping[module.moduleCode]}
                  semesterOptions={availableSems}
                  {...module}
                />
              ))}
              {provided.placeholder}
            </div>
          );
        }}
      </Droppable>
      <Pagination
        showFirstButton
        showLastButton
        size="small"
        onChange={(_, page) => setOffset(page - 1)}
        count={Math.ceil(modules.length / PAGE_LIMIT)}
        page={offset + 1}
      />
    </div>
  );
};

export default ModuleFinder;
