import React, { useState } from "react";
import _ from "lodash";

import SearchBar from "./SearchBar";
import Card from "./ModuleFinderResultCard";

import allModules from "../data/computing-modules";
import "../css/ModuleFinder.css";

const ModuleFinder = ({
  moduleToSemMapping = { CS3230: "YS31" },
  availableSems = ["Y1S1", "Y1S2", "Y2S1", "Y2S2", "Y3S1", "Y3S2", "Y4S1", "Y4S2"],
}) => {
  const [modules, setModules] = useState(allModules);

  const handleClearSearch = () => {
    const textField = document.getElementById("module-search-box");
    if (!textField.value) return;
    textField.value = "";
    setModules(allModules);
  };

  const debouncedFilter = _.debounce((search) => {
    const keyword = search.toLowerCase();
    setModules(
      allModules.filter(
        ({ moduleCode, title }) =>
          !search || moduleCode.toLowerCase().includes(keyword) || title.toLowerCase().includes(keyword)
      )
    );
  }, 350);

  return (
    <div className="module-finder-container">
      <h5 className="text-primary font-weight-medium">Module Search</h5>
      <SearchBar
        clearable
        id="module-search-box"
        resultCount={modules.length}
        resultType="module"
        handleChange={debouncedFilter}
        handleClear={handleClearSearch}
      />
      <div className="results">
        {modules.map((module) => (
          <Card
            key={module.moduleCode}
            containingSemester={moduleToSemMapping[module.moduleCode]}
            semesterOptions={availableSems}
            {...module}
          />
        ))}
      </div>
    </div>
  );
};

export default ModuleFinder;
