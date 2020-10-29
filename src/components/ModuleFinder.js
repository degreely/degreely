import React, { useState } from "react";
import _ from "lodash";

import SearchBox from "./ClearableSearchBar";

import allModules from "../data/computing-modules-detailed";

const ModuleFinder = ({ moduleToSemMapping }) => {
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
    <div>
      <div>
        <SearchBox
          id="module-search-box"
          resultCount={modules.length}
          resultType="module"
          handleChange={debouncedFilter}
          handleClear={handleClearSearch}
        />
      </div>
      <ul>
        {modules.map((module) => {
          return <li key={module.moduleCode}>{`${module.moduleCode} ${module.title}`}</li>;
        })}
      </ul>
    </div>
  );
};

export default ModuleFinder;
