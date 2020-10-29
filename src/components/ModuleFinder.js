import React, { useState } from "react";
import _ from "lodash";

import Container from "react-bootstrap/Container";
import Dropdown from "react-bootstrap/Dropdown";

import SearchBox from "./ClearableSearchBox";

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
      <SearchBox id="module-search-box" handleChange={debouncedFilter} handleClear={handleClearSearch} />
      <ul>
        {modules.map((module) => {
          return <li key={module.moduleCode}>{`${module.moduleCode} ${module.title}`}</li>;
        })}
      </ul>
    </div>
  );
};

export default ModuleFinder;
