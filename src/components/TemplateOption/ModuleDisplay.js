import React from "react";
import Typography from "@material-ui/core/Typography";

import "../../css/TemplateOption.css";

const Plan = ({ sems }) => {
  const rows = getRows(sems);

  let yearColor = 0;
  let gradientIncreasing = false;
  const advanceModColorGradient = () => {
    // warning: yearColor is hard-coded to range between 0 and 4
    if (yearColor === 0 || yearColor === 4) gradientIncreasing = !gradientIncreasing;
    yearColor += gradientIncreasing ? 1 : -1;
  };
  return (
    <div className="sems">
      {rows.map((row, rIndex) => {
        if (rIndex > 0) advanceModColorGradient();
        return (
          <div key={`Y${rIndex + 1}`} className="d-flex year">
            {Object.entries(row).map(([key, { label, modules }]) => (
              <div key={key} className="semester">
                <Typography variant="h6">{label}</Typography>
                <div>
                  {modules.map(({ code, name }, mIndex) => (
                    <div key={`${mIndex}-${name}`} className={`module gradient-color-${yearColor}`}>
                      <span className="font-weight-medium">{code}</span> <span>{name}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        );
      })}
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
      // break up row such that we have a max of 2 sems per row
      const toAdd = Object.entries(row);
      for (let i = 0; i < toAdd.length; i += 2) {
        if (i + 1 < toAdd.length) {
          rows.push({[toAdd[i][0]]: toAdd[i][1], [toAdd[i + 1][0]]: toAdd[i + 1][1]});
        } else {
          rows.push({[toAdd[i][0]]: toAdd[i][1]});
        }
      }

      row = { [sem]: modules };
      prev = sem.substring(0, 2);
    }
  });

  rows.push(row);
  return rows;
};

export default Plan;
