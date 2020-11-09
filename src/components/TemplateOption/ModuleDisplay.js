import React from "react";
import Typography from "@material-ui/core/Typography";

import "../../css/TemplateOption.css";

const Plan = ({ sems }) => {
  const rows = getRows(sems);

  return (
    <div className="sems">
      {rows.map((row, rIndex) => (
        <div key={`Y${rIndex + 1}`} className="d-flex year">
          {Object.entries(row).map(([key, { label, modules }]) => (
            <div key={key} className="semester">
              <Typography variant="h6">{label}</Typography>
              <div>
                {modules.map(({ code, name }, mIndex) => (
                  <div key={`${mIndex}-${name}`} className={`module gradient-color-${rIndex}`}>
                    <span className="font-weight-medium">{code}</span> <span>{name}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

const getRows = (sems) => {
  const rows = [];
  let row = {};
  let prev = "";

  Object.entries(sems).forEach(([sem, modules]) => {
    if (!prev) prev = sem.substring(0, 2);

    if (sem.includes(prev)) {
      row[sem] = modules;
    } else {
      rows.push(row);
      row = { [sem]: modules };
      prev = sem.substring(0, 2);
    }
  });

  rows.push(row);
  return rows;
};

export default Plan;
