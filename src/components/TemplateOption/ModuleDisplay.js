import React from "react";
import Typography from "@material-ui/core/Typography";

import "../../css/TemplateOption.css";

const PALETTE = ["#7400B8", "#6930C3", "#5E60CE", "#5390D9"];

const Plan = ({ plan }) => {
  const rows = getRows(plan);

  return (
    <div className="plan">
      {rows.map((row, rIndex) => (
        <div key={`Y${rIndex + 1}`} className="d-flex year">
          {Object.entries(row).map(([sem, modules]) => (
            <div key={sem} className="semester">
              <Typography variant="h6">{sem.includes("ST") ? "Special Term" : sem}</Typography>
              <div>
                {modules.map(({ code, title }, mIndex) => (
                  <div
                    key={`${mIndex}-${title}`}
                    className="module"
                    style={{ backgroundColor: PALETTE[rIndex] }}
                  >
                    <span className="font-weight-medium">{code}</span> <span>{title}</span>
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

const getRows = (plan) => {
  const rows = [];
  let row = {};
  let prev = "";

  Object.entries(plan).forEach(([sem, modules]) => {
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
